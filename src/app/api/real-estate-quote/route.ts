import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, service, files } = await request.json()

    // Server-side validation
    if (!email || !service) {
      return NextResponse.json(
        { error: "Email and service selection are required." },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const filesList = Array.isArray(files) ? files : []

    // If Resend API Key is not set, log to console in mock simulator mode
    if (!apiKey) {
      console.log("=== MOCK REAL ESTATE QUOTE EMAIL ===")
      console.log(`To: Owner (skillforgetechnology05@gmail.com)`)
      console.log(`Subject: [Real Estate Quote] New Sample Request - ${service}`)
      console.log(`Body: Client Email: ${email}, Service: ${service}, Files: ${filesList.join(", ") || "None"}`)
      console.log("-------------------------------------")
      console.log(`To: Client (${email})`)
      console.log(`Subject: Free Sample Request Received - SkillForge Technology`)
      console.log(`Body: Thank you! We are processing your sample images.`)
      console.log("=====================================")

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      return NextResponse.json({
        success: true,
        mock: true,
        message: "Simulator mode: Real Estate quote request logged successfully."
      })
    }

    const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    const ownerEmail = process.env.OWNER_EMAIL || "skillforgetechnology05@gmail.com"

    // 1. Send Alert Email to Owner
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #faf5ff;">
        <h2 style="color: #6366f1; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Real Estate Sample Edit Alert</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 35%;">Client Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Requested Service:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><span style="background-color: #e0e7ff; color: #4338ca; padding: 2px 8px; border-radius: 4px; font-size: 0.85em;">${service}</span></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Uploaded Files:</td>
            <td style="padding: 8px; line-height: 1.5; color: #4a5568;">
              ${filesList.length > 0 ? `<ul style="margin: 0; padding-left: 20px;">${filesList.map(f => `<li>${f}</li>`).join("")}</ul>` : "No files uploaded"}
            </td>
          </tr>
        </table>
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 0.8em; color: #718096; text-align: center;">
          Sent automatically from SkillForge Technology Hub
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
        from: `SkillForge Real Estate <${fromAddress}>`,
        to: [ownerEmail],
        subject: `[Real Estate Quote] New Sample Request - ${service}`,
        html: ownerEmailHtml
      })
    })

    const ownerData = await ownerRes.json()

    if (!ownerRes.ok) {
      console.error("Resend Owner Real Estate Quote Error:", ownerData)
      return NextResponse.json(
        { error: ownerData.message || "Failed to dispatch alert email to the owner." },
        { status: 500 }
      )
    }

    // 2. Send Auto-Response Confirmation Email to the Client (if domain verified)
    const canSendToClient = fromAddress !== "onboarding@resend.dev" || email.toLowerCase() === ownerEmail.toLowerCase()

    if (canSendToClient) {
      const clientEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f0fdf4;">
          <h2 style="color: #16a34a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Free Sample Request Logged</h2>
          <p>Thank you for requesting a free sample edit from SkillForge Technology!</p>
          <p>Our professional editing team has received your files and is preparing the sample. We will return the edited high-resolution files to this email address within 24 hours.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 0.9em; color: #4b5563;">
            <strong>Requested Service:</strong> ${service}<br />
            <strong>Files Queued:</strong> ${filesList.length}
          </p>
          <p>If you have any questions or require custom specifications, feel free to reply to this email.</p>
          <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 0.8em; color: #718096; text-align: center;">
            SkillForge Technology &bull; India
          </div>
        </div>
      `

      const clientRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: `SkillForge Real Estate <${fromAddress}>`,
          to: [email],
          subject: `Free Sample Request Received - SkillForge Technology`,
          html: clientEmailHtml
        })
      })

      const clientData = await clientRes.json()
      if (!clientRes.ok) {
        console.warn("Resend Client Auto-Response Warn:", clientData)
      }
    }

    return NextResponse.json({
      success: true,
      message: "Real Estate quote inquiry processed successfully."
    })
  } catch (error: any) {
    console.error("Real Estate Quote Processing Error:", error)
    return NextResponse.json(
      { error: "Internal server error occurred while processing the quote request." },
      { status: 500 }
    )
  }
}
