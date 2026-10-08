import { checkRateLimit, isBot, botOkResponse, readJson, badRequest, success, isValidEmail, str, escapeHtml, storeDocument, sendEmail, canSendToClient, ownerEmail } from "@/lib/api"

export async function POST(req: Request) {
  const limited = checkRateLimit(req, "subscribe", 5)
  if (!limited.ok) return limited.response

  const body = await readJson(req)
  if (isBot(body)) return botOkResponse()

  const email = str(body!["email"], 254)
  if (!isValidEmail(email)) {
    return badRequest("Please enter a valid email address.")
  }
  const normalizedEmail = email.toLowerCase()

  // 1. Store in Firestore "subscribers" collection
  const stored = await storeDocument("subscribers", { email: normalizedEmail })

  const ownerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #faf5ff; color: #1e293b;">
      <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-weight: 800;">New Newsletter Subscriber</h2>
      <p>A new user has subscribed to the SkillForge Technologies newsletter:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 30%;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${escapeHtml(normalizedEmail)}">${escapeHtml(normalizedEmail)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Stored in Database:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7; font-weight: bold; color: ${stored ? "#16a34a" : "#dc2626"};">${stored ? "Yes (Firestore)" : "No"}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Subscription Date:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${new Date().toLocaleString()}</td></tr>
      </table>
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 0.8em; color: #718096; text-align: center;">
        Sent automatically from SkillForge Technologies Newsletter Hub
      </div>
    </div>
  `

  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;">
        <h1 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: 800;">SkillForge Technologies</h1>
        <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px; font-weight: 500;">Corporate Engineering &amp; Software Architecture</p>
      </div>
      <p>Hello,</p>
      <p>Thank you for subscribing to SkillForge Technologies Insights. We're thrilled to have you join our mailing list.</p>
      <p>You'll receive periodic updates, technical case studies, and insights from our prototyping labs and software engineering teams.</p>
      <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px; font-size: 14px; line-height: 1.5; color: #334155;">
        <strong>What we write about:</strong>
        <ul style="margin: 8px 0 0 0; padding-left: 20px;">
          <li>SaaS product architecture &amp; deployment best practices</li>
          <li>Embedded system developments and physical hardware engineering</li>
          <li>AI integration, ML modeling, and dynamic workflow automations</li>
        </ul>
      </div>
      <p>In the meantime, feel free to check out our latest projects and divisions on our website.</p>
      <hr style="border: 0; border-top: 1px dashed #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 11px; color: #64748b; text-align: center;">
        This is an automatic confirmation. You can unsubscribe at any time. SkillForge Technologies, Perundurai, Tamil Nadu, India.
      </p>
    </div>
  `

  await sendEmail({
    fromName: "SkillForge Alerts",
    to: ownerEmail(),
    subject: `[Subscriber Alert] New newsletter subscription from ${normalizedEmail}`,
    html: ownerHtml,
  })

  if (canSendToClient(normalizedEmail)) {
    const clientRes = await sendEmail({
      fromName: "SkillForge Technologies",
      to: normalizedEmail,
      subject: "Welcome to SkillForge Insights!",
      html: clientHtml,
    })
    if (!clientRes.sent && !clientRes.mock) {
      console.warn("[subscribe] Client welcome email failed:", clientRes.error)
    }
  }

  return success({
    email: normalizedEmail,
    firebase: stored,
    message: "Subscribed and saved successfully!",
  })
}
