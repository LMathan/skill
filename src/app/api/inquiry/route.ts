import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, phone, theme, message } = await request.json()

    // Server-side validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, and message are required fields." },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY

    // If Resend API Key is not set, log and run in mock simulator mode
    if (!apiKey) {
      console.log("=== MOCK EMAIL MODE ===")
      console.log(`To: Owner (skillforgetechnology05@gmail.com)`)
      console.log(`Subject: [Inquiry Alert] ${theme || "General Inquiry"} - from ${name}`)
      console.log(`Body: Name: ${name}, Email: ${email}, Phone: ${phone}, Message: ${message}`)
      console.log("------------------------")
      console.log(`To: Client (${email})`)
      console.log(`Subject: Inquiry Received - SkillForge Technology`)
      console.log(`Body: Thank you ${name}! We have received your inquiry.`)
      console.log("========================")

      // Simulate a small delay for realistic response behavior
      await new Promise((resolve) => setTimeout(resolve, 800))

      return NextResponse.json({
        success: true,
        mock: true,
        message: "Simulator mode: Inquiry processed and logged successfully."
      })
    }

    // 1. Send Alert Email to the Owner
    // Fallback to onboarding@resend.dev if a custom domain is not yet verified
    const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    const ownerEmail = process.env.OWNER_EMAIL || "skillforgetechnology05@gmail.com"

    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px; background-color: #faf5ff;">
        <h2 style="color: #6366f1; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">New Lab Inquiry Alert</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 30%;">Full Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Phone:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="tel:${phone}">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Interest Theme:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><span style="background-color: #e0e7ff; color: #4338ca; padding: 2px 8px; border-radius: 4px; font-size: 0.85em;">${theme || "General Contact"}</span></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td>
            <td style="padding: 8px; line-height: 1.5; white-space: pre-wrap;">${message}</td>
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
        from: `SkillForge Alerts <${fromAddress}>`,
        to: [ownerEmail],
        subject: `[Inquiry Alert] ${theme || "General"} - from ${name}`,
        html: ownerEmailHtml
      })
    })

    const ownerData = await ownerRes.json()

    if (!ownerRes.ok) {
      console.error("Resend Owner Alert Error:", ownerData)
      return NextResponse.json(
        { error: ownerData.message || "Failed to dispatch alert email to the owner." },
        { status: 500 }
      )
    }

    // 2. Send Auto-Response Confirmation Email to the Client
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h1 style="color: #06b6d4; margin: 0; font-size: 24px;">SkillForge Technology</h1>
          <p style="color: #718096; margin: 5px 0 0 0; font-size: 14px;">Electronics & IoT Prototyping Laboratory</p>
        </div>
        <p>Dear <strong>${name}</strong>,</p>
        <p>Thank you for contacting SkillForge Technology. We have successfully received your inquiry regarding <strong>"${theme || "Custom Projects"}"</strong>.</p>
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
          <p style="margin: 0 0 5px 0;"><strong>SkillForge Technology Center</strong></p>
          <p style="margin: 0;">Perundurai, Erode, Tamil Nadu, India</p>
        </div>
      </div>
    `

    // Only send auto-response if domain is verified or testing with onboarding
    // (If using onboarding@resend.dev, Resend ONLY allows sending to your own verified login email)
    const canSendToClient = fromAddress !== "onboarding@resend.dev" || email.toLowerCase() === ownerEmail.toLowerCase()

    if (canSendToClient) {
      const clientRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: `SkillForge Technology <${fromAddress}>`,
          to: [email],
          subject: "We received your inquiry - SkillForge Technology",
          html: clientEmailHtml
        })
      })

      const clientData = await clientRes.json()
      if (!clientRes.ok) {
        // Log error but do not fail the request completely since the owner already got notified
        console.warn("Resend Client Auto-Response Warn:", clientData)
      }
    } else {
      console.log(`Skipped client auto-response because sender domain is unverified (onboarding@resend.dev).`)
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry emails dispatched successfully."
    })
  } catch (error: any) {
    console.error("API Inquiry Route Error:", error)
    return NextResponse.json(
      { error: error.message || "An unexpected internal server error occurred." },
      { status: 500 }
    )
  }
}
