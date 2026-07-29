import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { name, email, phone, address, quantity } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      )
    }

    if (!name || !phone || !address || !quantity) {
      return NextResponse.json(
        { error: "Name, phone, address, and quantity are required." },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const fromAddress = process.env.RESEND_FROM_EMAIL || ""
    const ownerEmail = process.env.OWNER_EMAIL || ""

    // If Resend API Key is not set, run in mock simulator mode
    if (!apiKey) {
      console.log("=== MOCK EMAIL MODE: ACTIVE PULSE PURCHASE ORDER ===")
      console.log(`To: Owner (${ownerEmail})`)
      console.log(`Subject: [Active Pulse Order Alert] ${quantity}x Device(s) - ${name}`)
      console.log(`Details:\n  Customer: ${name}\n  Phone: ${phone}\n  Address: ${address}\n  Total: ₹${(quantity * 439).toFixed(2)} INR`)
      console.log("------------------------")
      console.log(`To: Client (${email})`)
      console.log(`Subject: Order Confirmation - Active Pulse Receipt`)
      console.log("========================")

      await new Promise((resolve) => setTimeout(resolve, 800))

      return NextResponse.json({
        success: true,
        mock: true,
        message: "Simulator mode: Order processed successfully."
      })
    }

    // 1. Send notification email to the owner
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc;">
        <h2 style="color: #0d9488; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 0; font-size: 20px;">New Active Pulse Purchase Order</h2>
        <p style="font-size: 15px; color: #334155; line-height: 1.5;">A new customer order has been placed for the <strong>Active Pulse Device</strong>.</p>
        
        <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <h3 style="margin-top: 0; font-size: 14px; color: #0d9488; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; text-transform: uppercase;">Order Details</h3>
          <table style="width: 100%; font-size: 14px; color: #475569; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 120px;">Customer:</td>
              <td style="padding: 6px 0; color: #0f172a;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #0d9488; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 6px 0; color: #0f172a;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Quantity:</td>
              <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${quantity} unit(s)</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Order Total:</td>
              <td style="padding: 6px 0; color: #0d9488; font-weight: bold;">₹${(quantity * 439).toFixed(2)} INR (Free Shipping)</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Address:</td>
              <td style="padding: 6px 0; color: #0f172a; line-height: 1.4;">${address.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>
        </div>

        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
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
        from: `Active Pulse Orders <${fromAddress}>`,
        to: [ownerEmail],
        subject: `[Active Pulse Order Alert] ${quantity}x Device(s) - ${name}`,
        html: ownerEmailHtml
      })
    })

    const ownerData = await ownerRes.json()

    if (!ownerRes.ok) {
      console.error("Resend Owner Order Alert Error:", ownerData)
      return NextResponse.json(
        { error: ownerData.message || "Failed to dispatch order notification email to the owner." },
        { status: 500 }
      )
    }

    // 2. Send confirmation auto-response to the subscriber
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px;">
          <h1 style="color: #0d9488; margin: 0; font-size: 26px; letter-spacing: -0.025em; font-weight: 900;">ACTIVE PULSE</h1>
          <p style="color: #64748b; margin: 5px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase;">Order Confirmation Receipt</p>
        </div>
        
        <p style="font-size: 15px; line-height: 1.5; color: #334155;">Hi ${name},</p>
        
        <p style="font-size: 15px; line-height: 1.5; color: #334155;">Thank you for your order! We have successfully received your request for the <strong>Active Pulse Device</strong> and added it to our immediate shipping batch queue.</p>
        
        <div style="margin: 25px 0; padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; text-transform: uppercase;">Summary of Order</h4>
          <table style="width: 100%; font-size: 13.5px; color: #475569; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Items:</td>
              <td style="padding: 6px 0; text-align: right; color: #0f172a;">Active Pulse Hardware Key x ${quantity}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Unit Price:</td>
              <td style="padding: 6px 0; text-align: right; color: #0f172a;">₹439.00 INR</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Shipping:</td>
              <td style="padding: 6px 0; text-align: right; color: #0d9488; font-weight: bold;">FREE</td>
            </tr>
            <tr style="border-top: 1px solid #e2e8f0;">
              <td style="padding: 10px 0 0 0; font-weight: bold; font-size: 15px; color: #0f172a;">Total:</td>
              <td style="padding: 10px 0 0 0; text-align: right; font-weight: bold; font-size: 15px; color: #0d9488;">₹${(quantity * 439).toFixed(2)} INR</td>
            </tr>
          </table>
        </div>

        <div style="margin: 25px 0; padding: 20px; background-color: #f0fdfa; border-left: 4px solid #0d9488; border-radius: 8px;">
          <h4 style="margin: 0 0 8px 0; color: #0f766e; font-size: 14px; font-weight: 700;">Delivery Information</h4>
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #334155;"><strong>Address:</strong><br>${address.replace(/\n/g, "<br>")}</p>
          <p style="margin: 0; font-size: 13px; color: #334155;"><strong>Phone:</strong> ${phone}</p>
        </div>

        <p style="font-size: 13.5px; color: #64748b; line-height: 1.5;">You will receive an automated shipping notification with a tracking number once your physical device has been packaged and dispatched.</p>
        
        <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
        <div style="text-align: center; color: #94a3b8; font-size: 11px;">
          <p style="margin: 0 0 5px 0; font-weight: bold;">SkillForge Technology</p>
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
          subject: "Order Confirmation - Active Pulse Receipt",
          html: clientEmailHtml
        })
      })

      const clientData = await clientRes.json()
      if (!clientRes.ok) {
        console.warn("Resend Client Order Receipt Warning:", clientData)
      }
    } else {
      console.log("Skipped client confirmation email because sender domain is unverified (onboarding@resend.dev).")
    }

    return NextResponse.json({
      success: true,
      message: "Order processed successfully."
    })
  } catch (error: any) {
    console.error("API Order Placement Route Error:", error)
    return NextResponse.json(
      { error: error.message || "An unexpected internal server error occurred." },
      { status: 500 }
    )
  }
}
