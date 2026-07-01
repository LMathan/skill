import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email, date } = await req.json()

    if (!email || !date) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    const ownerEmail = process.env.OWNER_EMAIL || "skillforgetechnology05@gmail.com"

    // If Resend API Key is not set, log and run in mock simulator mode
    if (!apiKey) {
      console.log("=== MOCK BOOKING EMAIL MODE ===")
      console.log(`To: Owner (${ownerEmail})`)
      console.log(`Subject: [Booking Alert] Consultation scheduled on ${date}`)
      console.log(`Body: Client Email: ${email}, Scheduled Date: ${date}`)
      console.log("------------------------")
      console.log(`To: Client (${email})`)
      console.log(`Subject: Consultation Confirmed - SkillForge Technology`)
      console.log(`Body: Your discovery consultation is registered for ${date}.`)
      console.log("========================")

      // Simulate network lag
      await new Promise((resolve) => setTimeout(resolve, 800))

      return NextResponse.json({
        success: true,
        mock: true,
        message: "Simulator mode: Booking processed and logged successfully."
      })
    }

    // 1. Send Alert Email to the Owner
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #faf5ff; color: #1e293b;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-weight: 800;">New Consultation Booked</h2>
        <p>A new engineering discovery meeting has been scheduled via the calendar booking widget:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 30%;">Client Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Selected Date:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7; font-weight: bold; color: #2563eb;">${date}</td>
          </tr>
        </table>
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 0.8em; color: #718096; text-align: center;">
          Sent automatically from SkillForge Technology Scheduler Hub
        </div>
      </div>
    `

    const ownerRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: `SkillForge Bookings <${fromAddress}>`,
        to: [ownerEmail],
        subject: `[Booking Alert] Consultation on ${date} from ${email}`,
        html: ownerEmailHtml
      })
    })

    if (!ownerRes.ok) {
      const errData = await ownerRes.json()
      console.error("Resend Owner Booking Error:", errData)
    }

    // 2. Send Confirmation Email to the Client
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b; background-color: #ffffff;">
        <h2 style="color: #2563eb; font-size: 20px; font-weight: 800; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">Consultation Scheduled</h2>
        <p>Hello,</p>
        <p>We have successfully registered your corporate engineering consultation for: <strong>${date}</strong>.</p>
        <p>Our solutions architects are reviewing your details and will dispatch a Google Meet / calendar invite shortly.</p>
        <p>We look forward to helping you forge your technological milestones.</p>
        <hr style="border: 0; border-top: 1px dashed #e2e8f0; margin: 24px 0;" />
        <p style="font-size: 11px; color: #64748b; text-align: center;">
          This is an auto-response from SkillForge Technology. Erode, Tamil Nadu, India.
        </p>
      </div>
    `

    const clientRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: `SkillForge Technology <${fromAddress}>`,
        to: [email],
        subject: "Consultation Booked - SkillForge Technology",
        html: clientEmailHtml
      })
    })

    if (!clientRes.ok) {
      const errData = await clientRes.json()
      console.error("Resend Client Booking Error:", errData)
    }

    return NextResponse.json({
      success: true,
      email,
      date,
      message: "Consultation scheduled successfully."
    })
  } catch (err: any) {
    console.error("Error handling booking request:", err)
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
  }
}
