import { NextResponse } from "next/server"
import { checkRateLimit, isBot, botOkResponse, readJson, badRequest, success, isValidEmail, str, escapeHtml, storeDocument, sendEmail, ownerEmail } from "@/lib/api"
import { db } from "@/lib/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

export const ALLOWED_TIME_SLOTS = [
  "10:00 AM - 11:00 AM",
  "2:00 PM - 3:00 PM",
  "6:00 PM - 7:00 PM",
  "9:00 PM - 10:00 PM",
] as const

interface StoredBooking {
  email: string
  date: string
  dateKey?: string
  timeSlot: string
  createdAt: string
}

// In-memory persistence fallback across server requests
const memoryBookings: StoredBooking[] = []

function normalizeSlot(slot: string): string | null {
  const clean = slot.replace(/–/g, "-").replace(/\s+/g, " ").trim().toLowerCase()
  const matched = ALLOWED_TIME_SLOTS.find(
    (s) => s.replace(/–/g, "-").replace(/\s+/g, " ").trim().toLowerCase() === clean
  )
  return matched || null
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const filterDate = searchParams.get("date")

  const bookedSlots: Record<string, string[]> = {}

  const addSlot = (d: string, slot: string) => {
    if (!d || !slot) return
    if (!bookedSlots[d]) bookedSlots[d] = []
    if (!bookedSlots[d].includes(slot)) {
      bookedSlots[d].push(slot)
    }
  }

  // 1. From in-memory store
  for (const b of memoryBookings) {
    if (!filterDate || b.date === filterDate || b.dateKey === filterDate) {
      addSlot(b.date, b.timeSlot)
      if (b.dateKey) addSlot(b.dateKey, b.timeSlot)
    }
  }

  // 2. From Firestore if configured
  if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    try {
      let q
      if (filterDate) {
        q = query(collection(db, "bookings"), where("date", "==", filterDate))
      } else {
        q = query(collection(db, "bookings"))
      }
      const snapshot = await getDocs(q)
      snapshot.forEach((doc) => {
        const data = doc.data()
        const d = data.date ? String(data.date) : ""
        const dk = data.dateKey ? String(data.dateKey) : ""
        const slot = data.timeSlot ? String(data.timeSlot) : ""
        if (d && slot) addSlot(d, slot)
        if (dk && slot) addSlot(dk, slot)
      })
    } catch (err) {
      console.warn("[book-call:GET] Firestore fetch fallback:", err)
    }
  }

  return NextResponse.json({
    success: true,
    bookedSlots,
  })
}

export async function POST(req: Request) {
  const limited = checkRateLimit(req, "book-call", 10)
  if (!limited.ok) return limited.response

  const body = await readJson(req)
  if (isBot(body)) return botOkResponse()

  const email = str(body!["email"], 254)
  const date = str(body!["date"], 60)
  const dateKey = str(body!["dateKey"], 30)
  const rawSlot = str(body!["timeSlot"], 60)

  if (!email || !date || !rawSlot) {
    return badRequest("Missing required parameters (email, date, and time slot are required).")
  }
  if (!isValidEmail(email)) {
    return badRequest("Please enter a valid email address.")
  }

  const timeSlot = normalizeSlot(rawSlot)
  if (!timeSlot) {
    return badRequest("Invalid time slot. Please choose an available consultation slot.")
  }

  // Check collision in memory
  const isInMemoryCollision = memoryBookings.some(
    (b) =>
      ((b.date && b.date === date) || (dateKey && b.dateKey === dateKey)) &&
      b.timeSlot === timeSlot
  )
  if (isInMemoryCollision) {
    return badRequest("This time slot has already been booked. Please choose another available slot.")
  }

  // Check collision in Firestore if configured
  if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    try {
      const q = query(
        collection(db, "bookings"),
        where("date", "==", date),
        where("timeSlot", "==", timeSlot)
      )
      const snap = await getDocs(q)
      if (!snap.empty) {
        return badRequest("This time slot has already been booked. Please choose another available slot.")
      }
    } catch (err) {
      console.warn("[book-call:POST] Firestore check collision warning:", err)
    }
  }

  // Store in memory
  memoryBookings.push({
    email,
    date,
    dateKey: dateKey || undefined,
    timeSlot,
    createdAt: new Date().toISOString(),
  })

  // Persist to Firestore
  await storeDocument("bookings", { email, date, dateKey, timeSlot })

  const ownerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #faf5ff; color: #1e293b;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-weight: 800;">New Consultation Booked</h2>
      <p>A new engineering discovery meeting has been scheduled via the calendar booking widget:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 30%;">Client Email:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Selected Date:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #2563eb;">${escapeHtml(date)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Time Slot:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #059669;">${escapeHtml(timeSlot)} (IST)</td></tr>
      </table>
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 0.8em; color: #718096; text-align: center;">
        Sent automatically from SkillForge Technologies Scheduler Hub
      </div>
    </div>
  `

  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b; background-color: #ffffff;">
      <h2 style="color: #2563eb; font-size: 20px; font-weight: 800; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Consultation Scheduled</h2>
      <p>Hello,</p>
      <p>We have successfully registered your corporate engineering consultation for: <strong>${escapeHtml(date)}</strong> at <strong>${escapeHtml(timeSlot)} (IST)</strong>.</p>
      <p>Our solutions architects are reviewing your details and will dispatch a Google Meet / calendar invite shortly.</p>
      <p>We look forward to helping you forge your technological milestones.</p>
      <hr style="border: 0; border-top: 1px dashed #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 11px; color: #64748b; text-align: center;">
        This is an auto-response from SkillForge Technologies. Tamil Nadu, India.
      </p>
    </div>
  `

  const ownerRes = await sendEmail({
    fromName: "SkillForge Bookings",
    to: ownerEmail(),
    subject: `[Booking Alert] Consultation on ${date} (${timeSlot}) from ${email}`,
    html: ownerHtml,
  })
  if (!ownerRes.sent && !ownerRes.mock) {
    console.error("[book-call] Owner alert failed:", ownerRes.error)
  }

  const clientRes = await sendEmail({
    fromName: "SkillForge Technologies",
    to: email,
    subject: `Consultation Booked: ${date} at ${timeSlot} - SkillForge Technologies`,
    html: clientHtml,
  })
  if (!clientRes.sent && !clientRes.mock) {
    console.error("[book-call] Client confirmation failed:", clientRes.error)
  }

  return success({
    email,
    date,
    dateKey,
    timeSlot,
    message: "Consultation scheduled successfully.",
  })
}
