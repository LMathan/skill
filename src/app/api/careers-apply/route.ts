import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const jobId = formData.get("jobId") as string
    const jobTitle = formData.get("jobTitle") as string
    const resumeFile = formData.get("resume") as File | null

    if (!name || !email || !jobId || !jobTitle || !resumeFile) {
      return NextResponse.json(
        { error: "Name, email, job details, and resume PDF file are required." },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const fromAddress = process.env.RESEND_FROM_EMAIL || ""
    const ownerEmail = process.env.OWNER_EMAIL || ""

    // If Resend API Key is not set, run in mock simulator mode
    if (!apiKey) {
      console.log("=== MOCK EMAIL MODE: CAREERS APPLICATION ===")
      console.log(`To: Owner (${ownerEmail})`)
      console.log(`Subject: [Job Application Alert] ${jobTitle} - from ${name}`)
      console.log(`Body: Name: ${name}, Email: ${email}, Job ID: ${jobId}, Resume File: ${resumeFile.name}`)
      console.log("------------------------")
      console.log(`To: Applicant (${email})`)
      console.log(`Subject: Application Received - ${jobTitle}`)
      console.log("========================")

      await new Promise((resolve) => setTimeout(resolve, 800))

      return NextResponse.json({
        success: true,
        mock: true,
        message: "Simulator mode: Application processed and logged successfully."
      })
    }

    // Convert PDF file to base64
    const arrayBuffer = await resumeFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Content = buffer.toString("base64")

    // 1. Send Alert Email to the Owner with the Resume Attachment
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #faf5ff;">
        <h2 style="color: #8b5cf6; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Job Application Alert</h2>
        <p style="font-size: 15px; color: #1f2937;">A candidate has submitted a new career application for <strong>${jobTitle}</strong>.</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 30%;">Full Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Target Position:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><span style="background-color: #f3e8ff; color: #6b21a8; padding: 2px 8px; border-radius: 4px; font-size: 0.85em; font-weight: bold;">${jobTitle} (ID: ${jobId})</span></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Resume File:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7; font-family: monospace; font-size: 0.9em;">${resumeFile.name}</td>
          </tr>
        </table>
        <p style="font-size: 13px; color: #6b7280; margin-top: 20px;">*The applicant's PDF resume is attached directly to this email notification.</p>
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #9ca3af; text-align: center;">
          Sent automatically from SkillForge Technology Careers Hub
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
        from: `SkillForge Careers <${fromAddress}>`,
        to: [ownerEmail],
        subject: `[Job Application] ${jobTitle} - from ${name}`,
        html: ownerEmailHtml,
        attachments: [
          {
            content: base64Content,
            filename: resumeFile.name || "resume.pdf"
          }
        ]
      })
    })

    const ownerData = await ownerRes.json()

    if (!ownerRes.ok) {
      console.error("Resend Careers Application Owner Alert Error:", ownerData)
      return NextResponse.json(
        { error: ownerData.message || "Failed to dispatch application to the hiring board." },
        { status: 500 }
      )
    }

    // 2. Send confirmation auto-response to the Applicant
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #edf2f7; padding-bottom: 20px;">
          <h1 style="color: #6366f1; margin: 0; font-size: 24px; tracking-tight: -0.025em;">SkillForge Technology</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px;">Electronics & Software Systems Engineering Laboratory</p>
        </div>
        
        <p style="font-size: 15px; line-height: 1.5; color: #374151;">Hello <strong>${name}</strong>,</p>
        
        <p style="font-size: 15px; line-height: 1.5; color: #374151;">Thank you for applying for the position of <strong>${jobTitle}</strong> at SkillForge Technology. We have successfully received your details and attached resume.</p>
        
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
          <p style="margin: 0 0 5px 0;"><strong>SkillForge Technology</strong></p>
          <p style="margin: 0;">Perundurai, Tamil Nadu, India</p>
        </div>
      </div>
    `

    const canSendToClient = fromAddress !== "onboarding@resend.dev" || email.toLowerCase() === ownerEmail.toLowerCase()

    if (canSendToClient) {
      const clientRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: `SkillForge Careers <${fromAddress}>`,
          to: [email],
          subject: `Application Received: ${jobTitle} - SkillForge Technology`,
          html: clientEmailHtml
        })
      })

      const clientData = await clientRes.json()
      if (!clientRes.ok) {
        console.warn("Resend Client Careers Confirmation Warning:", clientData)
      }
    } else {
      console.log("Skipped client career application email because sender domain is unverified (onboarding@resend.dev).")
    }

    return NextResponse.json({
      success: true,
      message: "Job application submitted successfully."
    })
  } catch (error: any) {
    console.error("API Careers Apply Route Error:", error)
    return NextResponse.json(
      { error: error.message || "An unexpected internal server error occurred." },
      { status: 500 }
    )
  }
}
