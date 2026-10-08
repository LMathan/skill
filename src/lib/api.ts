import { NextResponse } from "next/server"
import { Resend } from "resend"
import { db } from "@/lib/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

/**
 * Shared helpers for all public API routes:
 * - input validation & sanitization (escapeHtml, isValidEmail)
 * - abuse protection (rateLimit, honeypot detection)
 * - email delivery via the Resend SDK (sendEmail)
 * - durable persistence in Firestore (storeDocument)
 */

export const FALLBACK_OWNER_EMAIL = "skillforgetechnology05@gmail.com"
export const UNVERIFIED_SENDER = "onboarding@resend.dev"

// ---------------------------------------------------------------------------
// Validation & sanitization
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.length <= 254 && EMAIL_RE.test(email.trim())
}

/** Escape a value for safe interpolation into HTML email templates. */
export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Multi-line text (e.g. addresses) escaped and converted to <br> for email HTML. */
export function escapeMultiline(value: unknown): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>")
}

/** Coerce to a trimmed string, defaulting to "". */
export function str(value: unknown, maxLength = 5000): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, maxLength)
}

// ---------------------------------------------------------------------------
// Abuse protection
// ---------------------------------------------------------------------------

const rateBuckets = new Map<string, { count: number; resetAt: number }>()

/**
 * Fixed-window in-memory rate limiter. Suitable for a single server instance;
 * for multi-instance deployments swap in a shared store (Upstash Redis, etc.).
 */
export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now()

  // Opportunistic cleanup so the map cannot grow unbounded.
  if (rateBuckets.size > 10_000) {
    for (const [k, v] of rateBuckets) {
      if (v.resetAt < now) rateBuckets.delete(k)
    }
  }

  const bucket = rateBuckets.get(key)
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfterSec: 0 }
  }

  bucket.count += 1
  if (bucket.count > limit) {
    return { ok: false, retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) }
  }
  return { ok: true, retryAfterSec: 0 }
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return req.headers.get("x-real-ip") ?? "unknown"
}

/** Standard per-IP rate limit check used by every public POST route. */
export function checkRateLimit(
  req: Request,
  scope: string,
  limit = 5,
  windowMs = 60_000
): { ok: true } | { ok: false; response: NextResponse } {
  const { ok, retryAfterSec } = rateLimit(`${scope}:${getClientIp(req)}`, limit, windowMs)
  if (ok) return { ok: true }
  return {
    ok: false,
    response: NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    ),
  }
}

/**
 * Honeypot check. Public forms render hidden fields named `_gotcha` / `website`
 * that humans never fill in. Bots that do are silently accepted (to avoid
 * tipping them off) but nothing is stored or sent.
 */
export function isBot(payload: Record<string, unknown> | null): boolean {
  if (!payload) return true
  const gotcha = payload["_gotcha"] ?? payload["website"]
  return typeof gotcha === "string" ? gotcha.trim().length > 0 : Boolean(gotcha)
}

/** Uniform "looks like success, did nothing" reply for detected bots. */
export function botOkResponse(): NextResponse {
  return NextResponse.json({ success: true })
}

// ---------------------------------------------------------------------------
// Request body parsing
// ---------------------------------------------------------------------------

export async function readJson(req: Request): Promise<Record<string, unknown> | null> {
  try {
    const body: unknown = await req.json()
    if (typeof body === "object" && body !== null && !Array.isArray(body)) {
      return body as Record<string, unknown>
    }
    return null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Responses
// ---------------------------------------------------------------------------

export function badRequest(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 400 })
}

export function serverError(message = "An unexpected internal server error occurred."): NextResponse {
  return NextResponse.json({ error: message }, { status: 500 })
}

export function success(data: Record<string, unknown> = {}): NextResponse {
  return NextResponse.json({ success: true, ...data })
}

// ---------------------------------------------------------------------------
// Firestore persistence
// ---------------------------------------------------------------------------

/**
 * Store a document in Firestore. Returns false when Firebase is not
 * configured or the write fails — routes decide how to degrade.
 */
export async function storeDocument(
  collectionName: string,
  data: Record<string, unknown>
): Promise<boolean> {
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    console.warn(`[storeDocument] Firebase not configured; skipped saving to "${collectionName}".`)
    return false
  }
  try {
    await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    })
    return true
  } catch (err) {
    console.error(`[storeDocument] Failed to save to "${collectionName}":`, err)
    return false
  }
}

// ---------------------------------------------------------------------------
// Email delivery (Resend SDK)
// ---------------------------------------------------------------------------

let cachedResend: Resend | null | undefined

function getResend(): Resend | null {
  if (cachedResend === undefined) {
    const apiKey = process.env.RESEND_API_KEY
    cachedResend = apiKey ? new Resend(apiKey) : null
  }
  return cachedResend
}

export function isEmailConfigured(): boolean {
  return getResend() !== null
}

export interface SendEmailOptions {
  /** Display name for the From header, e.g. "SkillForge Alerts". */
  fromName: string
  to: string
  subject: string
  html: string
  attachments?: { content: string; filename: string }[]
}

export interface EmailResult {
  sent: boolean
  /** True when RESEND_API_KEY is absent (dev/mock mode) — nothing was sent. */
  mock: boolean
  error?: string
}

/**
 * Send one email through Resend. Never throws; inspect the result instead.
 * With no API key configured this runs in mock mode and only logs.
 */
export async function sendEmail(opts: SendEmailOptions): Promise<EmailResult> {
  const client = getResend()
  if (!client) {
    console.log(
      `[email:mock] Would send from "${opts.fromName}" to ${opts.to}: ${opts.subject}`
    )
    return { sent: false, mock: true }
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || UNVERIFIED_SENDER

  try {
    const { error } = await client.emails.send({
      from: `${opts.fromName} <${fromAddress}>`,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      ...(opts.attachments ? { attachments: opts.attachments } : {}),
    })

    if (error) {
      console.error(`[email] Resend error sending to ${opts.to}:`, error)
      return { sent: false, mock: false, error: error.message }
    }
    return { sent: true, mock: false }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[email] Failed sending to ${opts.to}:`, err)
    return { sent: false, mock: false, error: message }
  }
}

/**
 * With the unverified onboarding@resend.dev sender, Resend only allows
 * delivery to the account owner's own address. Client-facing auto-responses
 * must be skipped in that case.
 */
export function canSendToClient(clientEmail: string): boolean {
  const fromAddress = process.env.RESEND_FROM_EMAIL || UNVERIFIED_SENDER
  if (fromAddress !== UNVERIFIED_SENDER) return true
  return clientEmail.toLowerCase() === ownerEmail().toLowerCase()
}

export function ownerEmail(): string {
  return process.env.OWNER_EMAIL || FALLBACK_OWNER_EMAIL
}
