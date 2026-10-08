import { checkRateLimit, isBot, botOkResponse, readJson, badRequest, success, isValidEmail, str, escapeHtml, storeDocument, sendEmail, canSendToClient, ownerEmail } from "@/lib/api"

export async function POST(request: Request) {
  const limited = checkRateLimit(request, "place-order", 5)
  if (!limited.ok) return limited.response

  const body = await readJson(request)
  if (isBot(body)) return botOkResponse()

  const name = str(body!["name"], 120)
  const email = str(body!["email"], 254)
  const phone = str(body!["phone"], 30)
  const address = str(body!["address"], 2000)
  const quantity = Number(body!["quantity"])

  if (!isValidEmail(email)) {
    return badRequest("A valid email address is required.")
  }
  if (!name || !phone || !address || !Number.isFinite(quantity) || quantity < 1 || quantity > 100) {
    return badRequest("Name, phone, address, and quantity (1-100) are required.")
  }

  const total = quantity * 439 + 50

  // Persist BEFORE sending any email — an order must never be lost, even if
  // RESEND_API_KEY is missing or Resend is down. Unlike before, there is no
  // mock mode here: unconfigured email degrades to a warning, never a fake
  // success.
  const stored = await storeDocument("orders", {
    product: "Active Pulse",
    name,
    email,
    phone,
    address,
    quantity,
    totalInr: total,
  })

  const ownerHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #f8fafc;">
      <h2 style="color: #0d9488; border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-top: 0; font-size: 20px;">New Active Pulse Purchase Order</h2>
      <p style="font-size: 15px; color: #334155; line-height: 1.5;">A new customer order has been placed for the <strong>Active Pulse Device</strong>.</p>
      <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <h3 style="margin-top: 0; font-size: 14px; color: #0d9488; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; text-transform: uppercase;">Order Details</h3>
        <table style="width: 100%; font-size: 14px; color: #475569; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; font-weight: bold; width: 120px;">Customer:</td><td style="padding: 6px 0; color: #0f172a;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${escapeHtml(email)}" style="color: #0d9488; text-decoration: none;">${escapeHtml(email)}</a></td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td style="padding: 6px 0; color: #0f172a;">${escapeHtml(phone)}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Quantity:</td><td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${quantity} unit(s)</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Shipping:</td><td style="padding: 6px 0; color: #0f172a;">Starts from ₹50.00 INR (Varies based on location)</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Order Total:</td><td style="padding: 6px 0; color: #0d9488; font-weight: bold;">₹${total.toFixed(2)} INR (Base Total)</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Address:</td><td style="padding: 6px 0; color: #0f172a; line-height: 1.4;">${address.replace(/\r?\n/g, "<br>")}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Saved in Database:</td><td style="padding: 6px 0; color: ${stored ? "#16a34a" : "#dc2626"}; font-weight: bold;">${stored ? "Yes (Firestore)" : "No — check Firestore config!"}</td></tr>
        </table>
      </div>
      <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
        Sent automatically from SkillForge Technologies Hub
      </div>
    </div>
  `

  const clientHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px;">
        <h1 style="color: #0d9488; margin: 0; font-size: 26px; letter-spacing: -0.025em; font-weight: 900;">ACTIVE PULSE</h1>
        <p style="color: #64748b; margin: 5px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase;">Order Confirmation Receipt</p>
      </div>
      <p style="font-size: 15px; line-height: 1.5; color: #334155;">Hi ${escapeHtml(name)},</p>
      <p style="font-size: 15px; line-height: 1.5; color: #334155;">Thank you for your order! We have successfully received your request for the <strong>Active Pulse Device</strong> and added it to our immediate shipping batch queue.</p>
      <div style="margin: 25px 0; padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; text-transform: uppercase;">Summary of Order</h4>
        <table style="width: 100%; font-size: 13.5px; color: #475569; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; font-weight: bold;">Items:</td><td style="padding: 6px 0; text-align: right; color: #0f172a;">Active Pulse Hardware Key x ${quantity}</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Unit Price:</td><td style="padding: 6px 0; text-align: right; color: #0f172a;">₹439.00 INR</td></tr>
          <tr><td style="padding: 6px 0; font-weight: bold;">Shipping:</td><td style="padding: 6px 0; text-align: right; color: #0f172a;">Starts from ₹50.00 INR (Varies by location)</td></tr>
          <tr style="border-top: 1px solid #e2e8f0;"><td style="padding: 10px 0 0 0; font-weight: bold; font-size: 15px; color: #0f172a;">Total:</td><td style="padding: 10px 0 0 0; text-align: right; font-weight: bold; font-size: 15px; color: #0d9488;">₹${total.toFixed(2)} INR (Base Total)*</td></tr>
        </table>
      </div>
      <div style="margin: 25px 0; padding: 20px; background-color: #f0fdfa; border-left: 4px solid #0d9488; border-radius: 8px;">
        <h4 style="margin: 0 0 8px 0; color: #0f766e; font-size: 14px; font-weight: 700;">Delivery Information</h4>
        <p style="margin: 0 0 8px 0; font-size: 13px; color: #334155;"><strong>Address:</strong><br>${address.replace(/\r?\n/g, "<br>")}</p>
        <p style="margin: 0; font-size: 13px; color: #334155;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      </div>
      <p style="font-size: 13.5px; color: #64748b; line-height: 1.5;">You will receive an automated shipping notification with a tracking number once your physical device has been packaged and dispatched.</p>
      <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
      <div style="text-align: center; color: #94a3b8; font-size: 11px;">
        <p style="margin: 0 0 5px 0; font-weight: bold;">SkillForge Technologies</p>
        <p style="margin: 0;">Hardware Engineering Division</p>
      </div>
    </div>
  `

  const ownerRes = await sendEmail({
    fromName: "Active Pulse Orders",
    to: ownerEmail(),
    subject: `[Active Pulse Order Alert] ${quantity}x Device(s) - ${name}`,
    html: ownerHtml,
  })
  if (!ownerRes.sent && !ownerRes.mock) {
    console.error("[place-order] Owner alert failed:", ownerRes.error)
  }

  if (canSendToClient(email)) {
    const clientRes = await sendEmail({
      fromName: "Active Pulse",
      to: email,
      subject: "Order Confirmation - Active Pulse Receipt",
      html: clientHtml,
    })
    if (!clientRes.sent && !clientRes.mock) {
      console.warn("[place-order] Client receipt failed:", clientRes.error)
    }
  }

  if (!stored) {
    console.error(
      `[place-order] WARNING: order from ${email} could NOT be persisted to Firestore.`
    )
  }

  return success({
    email,
    persisted: stored,
    message: "Order received successfully. We will contact you to confirm shipping.",
  })
}
