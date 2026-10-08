import { checkRateLimit, isBot, botOkResponse, readJson, badRequest, serverError, success, isValidEmail, str, escapeHtml, storeDocument, sendEmail, canSendToClient, ownerEmail } from "@/lib/api"

export async function POST(request: Request) {
  const limited = checkRateLimit(request, "real-estate-quote", 5)
  if (!limited.ok) return limited.response

  const body = await readJson(request)
  if (isBot(body)) return botOkResponse()

  const email = str(body!["email"], 254)
  const service = str(body!["service"], 160)
  const filesList = Array.isArray(body!["files"])
    ? body!["files"].filter((f): f is string => typeof f === "string").slice(0, 20).map((f) => f.slice(0, 200))
    : []

  if (!isValidEmail(email) || !service) {
    return badRequest("A valid email and service selection are required.")
  }

  // Persist the request first so no lead is lost to an email failure.
  await storeDocument("real-estate-quotes", { email, service, files: filesList })

  const ownerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #faf5ff;">
      <h2 style="color: #6366f1; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Real Estate Sample Edit Alert</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 35%;">Client Email:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Requested Service:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><span style="background-color: #e0e7ff; color: #4338ca; padding: 2px 8px; border-radius: 4px; font-size: 0.85em;">${escapeHtml(service)}</span></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Uploaded Files:</td><td style="padding: 8px; line-height: 1.5; color: #4a5568;">
          ${filesList.length > 0 ? `<ul style="margin: 0; padding-left: 20px;">${filesList.map((f) => `<li>${escapeHtml(f)}</li>`).join("")}</ul>` : "No files uploaded"}
        </td></tr>
      </table>
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 0.8em; color: #718096; text-align: center;">
        Sent automatically from SkillForge Technologies Hub
      </div>
    </div>
  `

  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f0fdf4;">
      <h2 style="color: #16a34a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Free Sample Request Logged</h2>
      <p>Thank you for requesting a free sample edit from SkillForge Technologies!</p>
      <p>Our professional editing team has received your files and is preparing the sample. We will return the edited high-resolution files to this email address within 24 hours.</p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
      <p style="font-size: 0.9em; color: #4b5563;">
        <strong>Requested Service:</strong> ${escapeHtml(service)}<br />
        <strong>Files Queued:</strong> ${filesList.length}
      </p>
      <p>If you have any questions or require custom specifications, feel free to reply to this email.</p>
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 0.8em; color: #718096; text-align: center;">
        SkillForge Technologies &bull; India
      </div>
    </div>
  `

  const ownerRes = await sendEmail({
    fromName: "SkillForge Real Estate",
    to: ownerEmail(),
    subject: `[Real Estate Quote] New Sample Request - ${service}`,
    html: ownerHtml,
  })
  if (!ownerRes.sent && !ownerRes.mock) {
    return serverError("Failed to dispatch alert email to the owner.")
  }

  if (canSendToClient(email)) {
    const clientRes = await sendEmail({
      fromName: "SkillForge Real Estate",
      to: email,
      subject: "Free Sample Request Received - SkillForge Technologies",
      html: clientHtml,
    })
    if (!clientRes.sent && !clientRes.mock) {
      console.warn("[real-estate-quote] Client confirmation failed:", clientRes.error)
    }
  }

  return success({ message: "Real Estate quote inquiry processed successfully." })
}
