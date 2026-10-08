import { checkRateLimit, isBot, botOkResponse, readJson, badRequest, success, isValidEmail, str, escapeHtml, storeDocument, sendEmail, canSendToClient, ownerEmail } from "@/lib/api"

export async function POST(request: Request) {
  const limited = checkRateLimit(request, "expense-mate-delete-account", 3)
  if (!limited.ok) return limited.response

  const body = await readJson(request)
  if (isBot(body)) return botOkResponse()

  const email = str(body!["email"], 254)
  const displayName = str(body!["displayName"], 120)
  const reason = str(body!["reason"], 200)
  const details = str(body!["details"], 2000)
  const confirmed = body!["confirmed"] === true

  if (!isValidEmail(email) || !confirmed) {
    return badRequest("A valid registered email address and confirmation are required.")
  }

  // Persist the request first so a deletion request is never lost (compliance).
  await storeDocument("expense-mate-deletion-requests", {
    email,
    displayName: displayName || null,
    reason: reason || null,
    details: details || null,
  })

  const ownerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
      <div style="border-bottom: 2px solid #ef4444; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin: 0; font-size: 20px;">ExpenseMate Account Deletion Request</h2>
        <p style="color: #64748b; font-size: 13px; margin: 4px 0 0 0;">Google Play Developer Compliance Action Required</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #334155; width: 35%;">Registered Email:</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #334155;">Account Name:</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${escapeHtml(displayName || "Not Provided")}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #334155;">Deletion Reason:</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><span style="background-color: #fee2e2; color: #991b1b; padding: 3px 8px; border-radius: 6px; font-weight: 600; font-size: 12px;">${escapeHtml(reason || "Closing Account")}</span></td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #334155;">Additional Details:</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${escapeHtml(details || "None Provided")}</td></tr>
        <tr><td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #334155;">Confirmed Terms:</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #16a34a; font-weight: bold;">Yes (Permanent Purge Authorized)</td></tr>
        <tr><td style="padding: 10px; font-weight: bold; color: #334155;">Timestamp:</td><td style="padding: 10px; color: #64748b; font-size: 13px;">${new Date().toISOString()}</td></tr>
      </table>
      <div style="margin-top: 25px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #ef4444; border-radius: 8px; font-size: 13px; color: #475569;">
        <strong>Action Steps:</strong> Check Firebase Authentication console for UID matching <code>${escapeHtml(email)}</code> and purge associated Firestore ledger documents within 90 days.
      </div>
    </div>
  `

  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 16px;">
        <h1 style="color: #2563eb; margin: 0; font-size: 22px; font-weight: 800;">ExpenseMate</h1>
        <p style="color: #64748b; margin: 4px 0 0 0; font-size: 13px;">SkillForge Technologies Mobile Application</p>
      </div>
      <p style="color: #1e293b; font-size: 15px; line-height: 1.6;">Dear ExpenseMate User,</p>
      <p style="color: #334155; font-size: 14px; line-height: 1.6;">
        We have received your formal request to delete your ExpenseMate account associated with <strong>${escapeHtml(email)}</strong>.
      </p>
      <div style="margin: 20px 0; padding: 16px; background-color: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; color: #991b1b; font-size: 13px; line-height: 1.6;">
        <strong>Account Deletion Timeline &amp; Data Purge Guarantee:</strong><br />
        Your account credentials, expense transaction history, budget goals, and group settlement records will be reviewed and permanently erased from our Firebase servers <strong>within 90 days</strong> in full compliance with Google Play Store Developer Policies.
      </div>
      <p style="color: #475569; font-size: 13px; line-height: 1.6;">
        If you submitted this request by mistake and wish to cancel deletion, please reply directly to this email or contact support at <a href="mailto:support@skillforgetechnology.app">support@skillforgetechnology.app</a> before the 90-day window expires.
      </p>
      <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 28px 0 16px 0;" />
      <div style="text-align: center; color: #94a3b8; font-size: 12px;">
        <p style="margin: 0 0 4px 0;"><strong>SkillForge Technologies</strong></p>
        <p style="margin: 0;">ExpenseMate App Privacy &amp; Data Governance Team</p>
      </div>
    </div>
  `

  const ownerRes = await sendEmail({
    fromName: "ExpenseMate Support",
    to: ownerEmail(),
    subject: `[ExpenseMate Account Deletion] Request from ${email}`,
    html: ownerHtml,
  })
  if (!ownerRes.sent && !ownerRes.mock) {
    console.error("[expense-mate-delete-account] Owner alert failed:", ownerRes.error)
  }

  if (canSendToClient(email)) {
    const userRes = await sendEmail({
      fromName: "ExpenseMate Support",
      to: email,
      subject: "ExpenseMate Account Deletion Request Received (Within 90 Days)",
      html: userHtml,
    })
    if (!userRes.sent && !userRes.mock) {
      console.warn("[expense-mate-delete-account] User confirmation failed:", userRes.error)
    }
  }

  return success({ message: "Account deletion request submitted successfully." })
}
