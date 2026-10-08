import { checkRateLimit, isBot, botOkResponse, readJson, badRequest, success, str, storeDocument, sendEmail, ownerEmail } from "@/lib/api"

/**
 * Public review submission. Reviews are moderated (approved=false by default)
 * so nothing shows on the site until an owner flips the flag in Firestore —
 * this prevents spam/self-review abuse on the public testimonials wall.
 */
export async function POST(request: Request) {
  const limited = checkRateLimit(request, "feedback", 3)
  if (!limited.ok) return limited.response

  const body = await readJson(request)
  if (isBot(body)) return botOkResponse()

  const customerName = str(body!["customerName"], 120)
  const projectName = str(body!["projectName"], 160)
  const message = str(body!["message"], 3000)
  const rating = Number(body!["rating"])

  if (!customerName || !projectName || !message) {
    return badRequest("Please fill out all fields.")
  }
  if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
    return badRequest("Rating must be between 1 and 5.")
  }

  const stored = await storeDocument("feedbacks", {
    customerName,
    projectName,
    message,
    rating,
    source: "site",
    approved: false, // moderation flag — set true in Firestore console to publish
  })

  // Notify the owner about the new review for quick moderation.
  await sendEmail({
    fromName: "SkillForge Reviews",
    to: ownerEmail(),
    subject: `[New Review] ${rating}★ from ${customerName} (pending approval)`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #fefce8;">
        <h2 style="color: #a16207; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Review Pending Approval</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 30%;">Customer:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${customerName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Project:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${projectName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Rating:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${rating} / 5</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; vertical-align: top;">Review:</td><td style="padding: 8px; line-height: 1.5; white-space: pre-wrap;">${message}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold;">Stored:</td><td style="padding: 8px; font-weight: bold; color: ${stored ? "#16a34a" : "#dc2626"};">${stored ? "Yes (unapproved)" : "No — check Firestore config!"}</td></tr>
        </table>
      </div>
    `,
  })

  return success({
    persisted: stored,
    message: "Thank you! Your review has been submitted for moderation.",
  })
}
