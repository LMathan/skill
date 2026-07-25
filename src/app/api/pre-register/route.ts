import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const fromAddress = process.env.RESEND_FROM_EMAIL || ""
    const ownerEmail = process.env.OWNER_EMAIL || ""

    // If Resend API Key is not set, run in mock simulator mode
    if (!apiKey) {
      console.log("=== MOCK EMAIL MODE: PRE-REGISTRATION ===")
      console.log(`To: Owner (${ownerEmail})`)
      console.log(`Subject: [Active Pulse Pre-registration] New Subscriber - ${email}`)
      console.log("------------------------")
      console.log(`To: Client (${email})`)
      console.log(`Subject: Pre-registration Confirmed - Active Pulse`)
      console.log("========================")

      await new Promise((resolve) => setTimeout(resolve, 800))

      return NextResponse.json({
        success: true,
        mock: true,
        message: "Simulator mode: Pre-registration processed successfully."
      })
    }

    // 1. Send notification email to the owner
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f0fdfa;">
        <h2 style="color: #0d9488; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">Active Pulse Pre-registration Alert</h2>
        <p style="font-size: 16px; color: #1f2937;">You have received a new pre-registration subscriber for the <strong>Active Pulse Device</strong>!</p>
        <div style="padding: 15px; background-color: #ffffff; border: 1px solid #ccfbf1; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 0; font-size: 14px; color: #6b7280; font-weight: bold;">Subscriber Email:</p>
          <p style="margin: 5px 0 0 0; font-size: 18px; color: #0f172a; font-weight: bold;"><a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a></p>
        </div>
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #9ca3af; text-align: center;">
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
        from: `Active Pulse Alerts <${fromAddress}>`,
        to: [ownerEmail],
        subject: `[Active Pulse Pre-registration] New Subscriber - ${email}`,
        html: ownerEmailHtml
      })
    })

    const ownerData = await ownerRes.json()

    if (!ownerRes.ok) {
      console.error("Resend Owner Pre-registration Error:", ownerData)
      return NextResponse.json(
        { error: ownerData.message || "Failed to dispatch email to the owner." },
        { status: 500 }
      )
    }

    // 2. Send confirmation auto-response to the subscriber
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #edf2f7; padding-bottom: 20px;">
          <h1 style="color: #0d9488; margin: 0; font-size: 26px; tracking-tight: -0.025em;">ACTIVE PULSE</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0; font-size: 14px; font-weight: 550;">Workspace Activity Emulation Key</p>
        </div>
        
        <p style="font-size: 15px; line-height: 1.5; color: #374151;">Dear Creator,</p>
        
        <p style="font-size: 15px; line-height: 1.5; color: #374151;">Thank you for pre-registering for the <strong>Active Pulse Device</strong>! We have added your email queue address (<strong>${email}</strong>) to our early prototype release track.</p>
        
        <div style="margin: 25px 0; padding: 20px; background-color: #f0fdfa; border-left: 4px solid #0d9488; border-radius: 6px;">
          <h4 style="margin: 0 0 8px 0; color: #0f766e; font-size: 15px;">What happens next?</h4>
          <ul style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.6; font-size: 13.5px;">
            <li><strong>Prototype Release</strong>: You'll be the first to receive notifications when our final physical assembly models are completed.</li>
            <li><strong>Exclusive Discounts</strong>: Pre-registered developers receive a 15% discount code when batch order opens.</li>
            <li><strong>Firmware & Updates</strong>: Receive instructions on how to download updates over-the-air (OTA) and configure your own custom names.</li>
          </ul>
        </div>

        <p style="font-size: 14px; color: #6b7280; line-height: 1.5;">Active Pulse is completely private and plug-and-play, running entirely offline to prevent system idle monitors from locking out your device.</p>
        
        <hr style="border: 0; border-top: 1px solid #edf2f7; margin: 30px 0;" />
        <div style="text-align: center; color: #9ca3af; font-size: 12px;">
          <p style="margin: 0 0 5px 0;"><strong>SkillForge Technology</strong></p>
          <p style="margin: 0;">Hardware Engineering Division</p>
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
          from: `Active Pulse <${fromAddress}>`,
          to: [email],
          subject: "Pre-registration Confirmed - Active Pulse",
          html: clientEmailHtml
        })
      })

      const clientData = await clientRes.json()
      if (!clientRes.ok) {
        console.warn("Resend Client Pre-registration Warning:", clientData)
      }
    } else {
      console.log("Skipped client confirmation email because sender domain is unverified (onboarding@resend.dev).")
    }

    return NextResponse.json({
      success: true,
      message: "Pre-registration processed successfully."
    })
  } catch (error: any) {
    console.error("API Pre-register Route Error:", error)
    return NextResponse.json(
      { error: error.message || "An unexpected internal server error occurred." },
      { status: 500 }
    )
  }
}
