"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Lock, FileText, CheckCircle2, Server, Smartphone, Trash2, Mail, AlertTriangle, Loader2 } from "lucide-react"

export default function ExpenseMatePrivacyContent() {
  const [activeSection, setActiveSection] = useState("intro")

  // Form states for Account Deletion Request
  const [deleteEmail, setDeleteEmail] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [deleteReason, setDeleteReason] = useState("Closing Account")
  const [customReasonDetails, setCustomReasonDetails] = useState("")
  const [confirmed, setConfirmed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const sections = [
    { id: "intro", label: "Overview & Scope" },
    { id: "data-collection", label: "Data We Collect" },
    { id: "data-usage", label: "Data Usage & Storage" },
    { id: "permissions", label: "Device Permissions" },
    { id: "deletion", label: "Account & Data Deletion Rights" },
    { id: "delete-account", label: "Account Deletion Form" },
    { id: "contact", label: "Contact Developer" }
  ]

  useEffect(() => {
    const handleScrollObserver = () => {
      const sectionIds = ["intro", "data-collection", "data-usage", "permissions", "deletion", "delete-account", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScrollObserver, { passive: true })
    handleScrollObserver()
    return () => window.removeEventListener("scroll", handleScrollObserver)
  }, [])

  const handleScroll = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -120
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    if (!deleteEmail.trim()) {
      setSubmitError("Please enter your registered Firebase account email address.")
      return
    }

    if (!confirmed) {
      setSubmitError("Please accept the confirmation checkbox to authorize data deletion.")
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch("/api/expense-mate-delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: deleteEmail.trim(),
          displayName: displayName.trim(),
          reason: deleteReason,
          details: customReasonDetails.trim(),
          confirmed: true
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit account deletion request.")
      }

      setSubmitSuccess(true)
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative bg-slate-50/50 pt-28 pb-24 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
          <span>/</span>
          <span className="text-blue-600 font-bold">ExpenseMate App</span>
        </div>

        {/* Header Block */}
        <div className="space-y-4 text-left max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-bold text-blue-700 font-mono">
            <Smartphone size={14} />
            <span>Google Play Store Compliance Policy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            ExpenseMate Privacy Policy
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            Effective Date: August 7, 2026. This Privacy Policy governs the ExpenseMate mobile application (&quot;ExpenseMate&quot;), developed and operated by SkillForge Technologies.
          </p>
        </div>

        {/* Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Navigation Outline */}
          <div className="lg:col-span-4 sticky top-28 bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm hidden lg:block text-left">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <Shield size={16} className="text-blue-600 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">Document Outline</span>
            </div>

            <nav className="space-y-1 font-mono text-xs">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleScroll(sec.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span>{sec.label}</span>
                    {isActive && <CheckCircle2 size={14} />}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Right Main Policy Content */}
          <div className="lg:col-span-8 bg-white border border-slate-200/90 p-6 sm:p-10 rounded-2xl shadow-sm text-left space-y-10">

            {/* Section 1: Intro */}
            <section id="intro" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                <span>1. Overview & Scope</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                ExpenseMate is a personal finance management and group bill-splitting application designed to help individuals and teams record transactions, organize budgets, and track shared balances securely. We prioritize user privacy and adhere to Google Play Developer Policies and global data privacy standards.
              </p>
            </section>

            {/* Section 2: Data We Collect */}
            <section id="data-collection" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Lock size={20} className="text-blue-600" />
                <span>2. Data We Collect</span>
              </h2>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900">A. Personal & Account Information:</span>
                  <p className="mt-1">Name, email address, and profile details provided during Google Sign-In or manual authentication (powered by Firebase Authentication).</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900">B. Financial & Transactional Data:</span>
                  <p className="mt-1">Expense amounts, income logs, category tags, payment methods, budget limits, subscription records, and group bill split balances. All financial data is encrypted in transit and at rest.</p>
                </div>
              </div>
            </section>

            {/* Section 3: Data Usage & Storage */}
            <section id="data-usage" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Server size={20} className="text-blue-600" />
                <span>3. How We Process & Protect Your Data</span>
              </h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm leading-relaxed">
                <li>Data is used strictly to deliver app functionality (charts, balances, budget alerts, and group settlements).</li>
                <li>All cloud synchronization occurs over encrypted <strong>TLS/HTTPS connections</strong> via Google Cloud & Firebase.</li>
                <li>Local data caching uses Hive encrypted storage on device.</li>
                <li><strong>We do not sell, rent, or trade your personal or financial data to third-party ad networks.</strong></li>
              </ul>
            </section>

            {/* Section 4: Device Permissions */}
            <section id="permissions" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Smartphone size={20} className="text-blue-600" />
                <span>4. Required Device Permissions</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-900">BIOMETRIC AUTH</div>
                  <div className="text-slate-500 mt-0.5">Fingerprint/FaceID for secure app unlocking.</div>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="font-bold text-slate-900">NOTIFICATIONS</div>
                  <div className="text-slate-500 mt-0.5">Bill payment due date reminders and budget alerts.</div>
                </div>
              </div>
            </section>

            {/* Section 5: Account & Data Deletion */}
            <section id="deletion" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Trash2 size={20} className="text-red-600" />
                <span>5. Account & Data Deletion Rights</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                In compliance with Google Play Account Deletion requirements, users have full ownership of their data. You can delete your account and all associated transaction data at any time via the form below or inside the app under <strong>Settings &gt; Account &gt; Delete Account</strong>.
              </p>
            </section>

            {/* Section 6: Request Account Deletion Form (Anchor ID: #delete-account) */}
            <section id="delete-account" className="space-y-6 border-2 border-red-200 p-6 sm:p-8 rounded-3xl bg-red-50/30 scroll-mt-32">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-mono font-bold">
                  <Trash2 size={14} />
                  <span>GOOGLE PLAY DELETION COMPLIANCE FORM</span>
                </div>
                <h3 className="text-2xl font-black font-display text-slate-900">
                  ExpenseMate Account Deletion Request
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Submit this form to request permanent erasure of your ExpenseMate account, authentication credentials, personal transaction ledgers, budget limits, and group split entries from our Firebase cloud servers.
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3">
                  <div className="flex items-center gap-2 font-bold text-lg text-emerald-700 font-display">
                    <CheckCircle2 size={24} />
                    <span>Deletion Request Submitted Successfully!</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed font-medium text-emerald-800">
                    A confirmation email has been dispatched to <strong>{deleteEmail}</strong> and our operations team has been notified. Your account and associated cloud data will be reviewed and permanently deleted <strong>within 90 days</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false)
                      setDeleteEmail("")
                      setDisplayName("")
                      setConfirmed(false)
                    }}
                    className="mt-2 text-xs font-mono font-bold text-emerald-700 underline cursor-pointer hover:text-emerald-900"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDeleteSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-100 border border-red-300 text-red-900 text-xs font-medium flex items-center gap-2">
                      <AlertTriangle size={16} className="shrink-0 text-red-600" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Registered Email (Mandatory) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                      Registered Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={deleteEmail}
                      onChange={(e) => setDeleteEmail(e.target.value)}
                      placeholder="e.g. user@example.com (Firebase Account Email)"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-sm text-slate-900 bg-white"
                    />
                    <p className="text-[11px] text-slate-500 font-sans">
                      Used to identify your specific Firebase Authentication UID and Firestore database documents.
                    </p>
                  </div>

                  {/* Display Name (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                      Account Name / Display Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-sm text-slate-900 bg-white"
                    />
                  </div>

                  {/* Reason for Deletion Dropdown */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                      Reason for Deletion
                    </label>
                    <select
                      value={deleteReason}
                      onChange={(e) => setDeleteReason(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-sm text-slate-900 bg-white cursor-pointer"
                    >
                      <option value="Closing Account">Closing Account</option>
                      <option value="Privacy Concern">Privacy Concern</option>
                      <option value="No longer need app">No longer need app</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Additional Reason Details Textarea Box */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                      Additional Details / Feedback <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={customReasonDetails}
                      onChange={(e) => setCustomReasonDetails(e.target.value)}
                      placeholder="Please share any specific feedback or reasons for deleting your account..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none text-sm text-slate-900 bg-white font-sans resize-y"
                    />
                  </div>

                  {/* Confirmation Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(e) => setConfirmed(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500 cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900 leading-relaxed">
                        I understand that all my expense history, budget goals, and group balances will be permanently deleted within 90 days.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-extrabold text-sm font-display tracking-tight transition-all shadow-lg shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 size={18} />
                          <span>Submit Account Deletion Request</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </section>

            {/* Section 7: Contact */}
            <section id="contact" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Mail size={20} className="text-blue-600" />
                <span>7. Developer Contact</span>
              </h2>
              <div className="text-slate-600 text-sm space-y-1 font-mono">
                <div><strong>Developer:</strong> SkillForge Technologies</div>
                <div><strong>Email:</strong> support@skillforgetechnology.app</div>
                <div><strong>Website:</strong> https://skillforgetechnology.app</div>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  )
}
