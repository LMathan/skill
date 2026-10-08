import { checkRateLimit, isBot, botOkResponse, readJson, badRequest, serverError, success, isValidEmail, str, escapeHtml, storeDocument, sendEmail, canSendToClient, ownerEmail } from "@/lib/api"

export async function POST(request: Request) {
  const limited = checkRateLimit(request, "inquiry", 5)
  if (!limited.ok) return limited.response

  const body = await readJson(request)
  if (isBot(body)) return botOkResponse()

  const name = str(body!["name"], 120)
  const email = str(body!["email"], 254)
  const phone = str(body!["phone"], 30)
  const theme = str(body!["theme"], 120)
  const message = str(body!["message"], 5000)

  if (!name || !email || !phone || !message) {
    return badRequest("Name, email, phone, and message are required fields.")
  }
  if (!isValidEmail(email)) {
    return badRequest("Please enter a valid email address.")
  }

  // Persist the inquiry first so no lead can be lost to an email failure.
  await storeDocument("inquiries", { name, email, phone, theme: theme || "General", message })

  const ownerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #faf5ff;">
      <h2 style="color: #6366f1; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Lab Inquiry Alert</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 30%;">Full Name:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Interest Theme:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><span style="background-color: #e0e7ff; color: #4338ca; padding: 2px 8px; border-radius: 4px; font-size: 0.85em;">${escapeHtml(theme || "General Contact")}</span></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td><td style="padding: 8px; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(message)}</td></tr>
      </table>
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 0.8em; color: #718096; text-align: center;">
        Sent automatically from SkillForge Technologies Hub
      </div>
    </div>
  `

  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 25px;">
        <h1 style="color: #06b6d4; margin: 0; font-size: 24px;">SkillForge Technologies</h1>
        <p style="color: #718096; margin: 5px 0 0 0; font-size: 14px;">Electronics &amp; IoT Prototyping Laboratory</p>
      </div>
      <p>Dear <strong>${escapeHtml(name)}</strong>,</p>
      <p>Thank you for contacting SkillForge Technologies. We have successfully received your inquiry regarding <strong>"${escapeHtml(theme || "Custom Projects")}"</strong>.</p>
      <p>Our engineering laboratory coordinators and project designers will review your parameters and get in touch with you via email or phone within the next 24 business hours.</p>
      <div style="margin: 20px 0; padding: 15px; background-color: #f7fafc; border-left: 4px solid #06b6d4; border-radius: 4px;">
        <h4 style="margin: 0 0 8px 0; color: #2d3748;">What's Next?</h4>
        <ul style="margin: 0; padding-left: 20px; color: #4a5568; line-height: 1.5; font-size: 14px;">
          <li>We will outline a tentative hardware diagram or system architecture code roadmap.</li>
          <li>We will prepare a customized quotation or synopses for your review.</li>
        </ul>
      </div>
      <p style="margin-top: 25px;">If you have any urgent details to append, feel free to reply directly to this email or reach us on WhatsApp at <strong>+91 93455 18760</strong>.</p>
      <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 30px 0;" />
      <div style="text-align: center; color: #a0aec0; font-size: 12px;">
        <p style="margin: 0 0 5px 0;"><strong>SkillForge Technologies</strong></p>
        <p style="margin: 0;">Perundurai, Tamil Nadu, India</p>
      </div>
    </div>
  `

  const ownerRes = await sendEmail({
    fromName: "SkillForge Alerts",
    to: ownerEmail(),
    subject: `[Inquiry Alert] ${theme || "General"} - from ${name}`,
    html: ownerHtml,
  })
  if (!ownerRes.sent && !ownerRes.mock) {
    return serverError("Failed to dispatch alert email to the owner.")
  }

  if (canSendToClient(email)) {
    const clientRes = await sendEmail({
      fromName: "SkillForge Technologies",
      to: email,
      subject: "We received your inquiry - SkillForge Technologies",
      html: clientHtml,
    })
    if (!clientRes.sent && !clientRes.mock) {
      console.warn("[inquiry] Client auto-response failed:", clientRes.error)
    }
  }

  return success({ message: "Inquiry received successfully." })
}
