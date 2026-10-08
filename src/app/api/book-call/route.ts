import { checkRateLimit, isBot, botOkResponse, readJson, badRequest, success, isValidEmail, str, escapeHtml, storeDocument, sendEmail, ownerEmail } from "@/lib/api"

export async function POST(req: Request) {
  const limited = checkRateLimit(req, "book-call", 5)
  if (!limited.ok) return limited.response

  const body = await readJson(req)
  if (isBot(body)) return botOkResponse()

  const email = str(body!["email"], 254)
  const date = str(body!["date"], 60)

  if (!email || !date) {
    return badRequest("Missing required parameters")
  }
  if (!isValidEmail(email)) {
    return badRequest("Please enter a valid email address.")
  }

  // Persist first so a booking is never lost to an email failure.
  await storeDocument("bookings", { email, date })

  const ownerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #faf5ff; color: #1e293b;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-weight: 800;">New Consultation Booked</h2>
      <p>A new engineering discovery meeting has been scheduled via the calendar booking widget:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 30%;">Client Email:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Selected Date:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #2563eb;">${escapeHtml(date)}</td></tr>
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
      <p>We have successfully registered your corporate engineering consultation for: <strong>${escapeHtml(date)}</strong>.</p>
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
    subject: `[Booking Alert] Consultation on ${date} from ${email}`,
    html: ownerHtml,
  })
  if (!ownerRes.sent && !ownerRes.mock) {
    console.error("[book-call] Owner alert failed:", ownerRes.error)
  }

  const clientRes = await sendEmail({
    fromName: "SkillForge Technologies",
    to: email,
    subject: "Consultation Booked - SkillForge Technologies",
    html: clientHtml,
  })
  if (!clientRes.sent && !clientRes.mock) {
    console.error("[book-call] Client confirmation failed:", clientRes.error)
  }

  return success({ email, date, message: "Consultation scheduled successfully." })
}
