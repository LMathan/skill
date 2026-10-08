import { NextResponse } from "next/server"
import { checkRateLimit, badRequest, serverError, success, isValidEmail, str, escapeHtml, storeDocument, sendEmail, canSendToClient, ownerEmail } from "@/lib/api"

const MAX_RESUME_BYTES = 5 * 1024 * 1024 // 5 MB

export async function POST(request: Request) {
  const limited = checkRateLimit(request, "careers-apply", 5)
  if (!limited.ok) return limited.response

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return badRequest("Expected multipart form data.")
  }

  const name = str(formData.get("name"), 120)
  const email = str(formData.get("email"), 254)
  const jobId = str(formData.get("jobId"), 80)
  const jobTitle = str(formData.get("jobTitle"), 160)

  // Honeypot field is also read from form data for this route.
  const gotcha = formData.get("_gotcha")
  if (typeof gotcha === "string" && gotcha.trim()) {
    return success({ message: "Application submitted successfully." })
  }

  const resumeFile = formData.get("resume")
  if (!name || !isValidEmail(email) || !jobId || !jobTitle) {
    return badRequest("Name, a valid email, and job details are required.")
  }
  if (!(resumeFile instanceof File) || resumeFile.size === 0) {
    return badRequest("A resume PDF file is required.")
  }
  if (resumeFile.size > MAX_RESUME_BYTES) {
    return badRequest("Resume file exceeds the 5 MB size limit.")
  }
  if (resumeFile.type && resumeFile.type !== "application/pdf") {
    return badRequest("Resume must be a PDF file.")
  }

  const base64Content = Buffer.from(await resumeFile.arrayBuffer()).toString("base64")
  const safeFileName = escapeHtml(resumeFile.name || "resume.pdf").slice(0, 200)

  // Persist the application metadata first so nothing is lost to an email failure.
  const stored = await storeDocument("job-applications", {
    name,
    email,
    jobId,
    jobTitle,
    resumeFileName: safeFileName,
    resumeSizeBytes: resumeFile.size,
  })

  const ownerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #faf5ff;">
      <h2 style="color: #8b5cf6; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Job Application Alert</h2>
      <p style="font-size: 15px; color: #1f2937;">A candidate has submitted a new career application for <strong>${escapeHtml(jobTitle)}</strong>.</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 30%;">Full Name:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${escapeHtml(email)}" style="color: #8b5cf6; text-decoration: none;">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Target Position:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><span style="background-color: #f3e8ff; color: #6b21a8; padding: 2px 8px; border-radius: 4px; font-size: 0.85em; font-weight: bold;">${escapeHtml(jobTitle)} (ID: ${escapeHtml(jobId)})</span></td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Resume File:</td><td style="padding: 8px; border-bottom: 1px solid #edf2f7; font-family: monospace; font-size: 0.9em;">${safeFileName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold;">Saved in Database:</td><td style="padding: 8px; font-weight: bold; color: ${stored ? "#16a34a" : "#dc2626"};">${stored ? "Yes (Firestore)" : "No — check Firestore config!"}</td></tr>
      </table>
      <p style="font-size: 13px; color: #6b7280; margin-top: 20px;">*The applicant's PDF resume is attached directly to this email notification.</p>
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #9ca3af; text-align: center;">
        Sent automatically from SkillForge Technologies Careers Hub
      </div>
    </div>
  `

  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #edf2f7; padding-bottom: 20px;">
        <h1 style="color: #6366f1; margin: 0; font-size: 24px;">SkillForge Technologies</h1>
        <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Electronics &amp; Software Systems Engineering Laboratory</p>
      </div>
      <p style="font-size: 15px; line-height: 1.5; color: #374151;">Hello <strong>${escapeHtml(name)}</strong>,</p>
      <p style="font-size: 15px; line-height: 1.5; color: #374151;">Thank you for applying for the position of <strong>${escapeHtml(jobTitle)}</strong> at SkillForge Technologies. We have successfully received your details and attached resume.</p>
      <div style="margin: 25px 0; padding: 18px; background-color: #f5f3ff; border-left: 4px solid #8b5cf6; border-radius: 6px;">
        <h4 style="margin: 0 0 8px 0; color: #5b21b6; font-size: 14.5px;">What's next?</h4>
        <ul style="margin: 0; padding-left: 20px; color: #4b5563; line-height: 1.6; font-size: 13.5px;">
          <li><strong>Resume Review</strong>: Our engineering division leads will review your work history and project experience portfolio.</li>
          <li><strong>Technical Evaluation</strong>: If your background maps to our requirements, we will schedule a brief technical intro session.</li>
          <li><strong>Timeline</strong>: The review process typically takes 3-5 business days.</li>
        </ul>
      </div>
      <p style="font-size: 14px; color: #6b7280; line-height: 1.5;">Thank you for your interest in joining our engineering team and expanding the boundaries of custom hardware and embedded development.</p>
      <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 30px 0;" />
      <div style="text-align: center; color: #9ca3af; font-size: 12px;">
        <p style="margin: 0 0 5px 0;"><strong>SkillForge Technologies</strong></p>
        <p style="margin: 0;">Perundurai, Tamil Nadu, India</p>
      </div>
    </div>
  `

  const ownerRes = await sendEmail({
    fromName: "SkillForge Careers",
    to: ownerEmail(),
    subject: `[Job Application] ${jobTitle} - from ${name}`,
    html: ownerHtml,
    attachments: [{ content: base64Content, filename: resumeFile.name || "resume.pdf" }],
  })
  if (!ownerRes.sent && !ownerRes.mock) {
    return serverError("Failed to dispatch application to the hiring board.")
  }

  if (canSendToClient(email)) {
    const clientRes = await sendEmail({
      fromName: "SkillForge Careers",
      to: email,
      subject: `Application Received: ${jobTitle} - SkillForge Technologies`,
      html: clientHtml,
    })
    if (!clientRes.sent && !clientRes.mock) {
      console.warn("[careers-apply] Applicant confirmation failed:", clientRes.error)
    }
  }

  return NextResponse.json({
    success: true,
    message: "Job application submitted successfully.",
  })
}
