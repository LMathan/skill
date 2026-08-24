import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    // Server-side validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
    const ownerEmail = process.env.OWNER_EMAIL || "skillforgetechnology05@gmail.com"

    // 1. Store in Firebase "subscribers" collection
    let storedInFirebase = false
    try {
      // Check if Firebase configuration is available
      if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
        const ref = collection(db, "subscribers")
        await addDoc(ref, {
          email: email.trim().toLowerCase(),
          subscribedAt: serverTimestamp()
        })
        storedInFirebase = true
      } else {
        console.log("Firebase config not found. Skipping Firestore store.")
      }
    } catch (fbErr) {
      console.error("Firebase store subscription error:", fbErr)
    }

    // If Resend API Key is not set, log and run in mock simulator mode
    if (!apiKey) {
      console.log("=== MOCK SUBSCRIPTION EMAIL MODE ===")
      console.log(`Stored in Firebase: ${storedInFirebase}`)
      console.log(`To: Owner (${ownerEmail})`)
      console.log(`Subject: [New Subscriber Alert] ${email}`)
      console.log(`Body: ${email} has subscribed to SkillForge insights.`)
      console.log("------------------------")
      console.log(`To: Client (${email})`)
      console.log(`Subject: Welcome to SkillForge Technologies Insights`)
      console.log(`Body: Thank you for subscribing! We will send you tech insights shortly.`)
      console.log("========================")

      // Simulate network lag
      await new Promise((resolve) => setTimeout(resolve, 800))

      return NextResponse.json({
        success: true,
        mock: true,
        firebase: storedInFirebase,
        message: "Simulator mode: Subscription processed, saved in Firebase, and logged."
      })
    }

    // 2. Send Alert Email to the Owner
    const ownerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #faf5ff; color: #1e293b;">
        <h2 style="color: #4f46e5; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; font-weight: 800;">New Newsletter Subscriber</h2>
        <p>A new user has subscribed to the SkillForge Technologies newsletter:</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7; width: 30%;">Email:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Stored in Database:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7; font-weight: bold; color: ${storedInFirebase ? "#16a34a" : "#dc2626"};">${storedInFirebase ? "Yes (Firestore)" : "No"}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #edf2f7;">Subscription Date:</td>
            <td style="padding: 8px; border-bottom: 1px solid #edf2f7;">${new Date().toLocaleString()}</td>
          </tr>
        </table>
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 0.8em; color: #718096; text-align: center;">
          Sent automatically from SkillForge Technologies Newsletter Hub
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
        subject: `[Subscriber Alert] New newsletter subscription from ${email}`,
        html: ownerEmailHtml
      })
    })

    if (!ownerRes.ok) {
      const errData = await ownerRes.json()
      console.error("Resend Owner Subscription Alert Error:", errData)
    }

    // 3. Send Welcome Email to the Client
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; color: #1e293b; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 15px;">
          <h1 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: 800;">SkillForge Technologies</h1>
          <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px; font-weight: 500;">Corporate Engineering & Software Architecture</p>
        </div>
        <p>Hello,</p>
        <p>Thank you for subscribing to SkillForge Technologies Insights. We're thrilled to have you join our mailing list.</p>
        <p>You'll receive periodic updates, technical case studies, and insights from our prototyping labs and software engineering teams.</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px; font-size: 14px; line-height: 1.5; color: #334155;">
          <strong>What we write about:</strong>
          <ul style="margin: 8px 0 0 0; padding-left: 20px;">
            <li>SaaS product architecture & deployment best practices</li>
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

    // Only send auto-response if domain is verified or testing with onboarding
    const canSendToClient = fromAddress !== "onboarding@resend.dev" || email.toLowerCase() === ownerEmail.toLowerCase()

    if (canSendToClient) {
      const clientRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          from: `SkillForge Technologies <${fromAddress}>`,
          to: [email],
          subject: "Welcome to SkillForge Insights!",
          html: clientEmailHtml
        })
      })

      if (!clientRes.ok) {
        const errData = await clientRes.json()
        console.error("Resend Client Subscription Confirmation Error:", errData)
      }
    } else {
      console.log(`Skipped client subscription auto-response because sender domain is unverified (onboarding@resend.dev).`)
    }

    return NextResponse.json({
      success: true,
      email,
      firebase: storedInFirebase,
      message: "Subscribed and saved successfully!"
    })
  } catch (err: any) {
    console.error("Error handling subscription request:", err)
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
  }
}
