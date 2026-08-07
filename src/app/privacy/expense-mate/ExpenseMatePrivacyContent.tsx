"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Lock, FileText, CheckCircle2, Server, Smartphone, Trash2, Mail } from "lucide-react"

export default function ExpenseMatePrivacyContent() {
  const [activeSection, setActiveSection] = useState("intro")

  const sections = [
    { id: "intro", label: "Overview & Scope" },
    { id: "data-collection", label: "Data We Collect" },
    { id: "data-usage", label: "Data Usage & Storage" },
    { id: "permissions", label: "Device Permissions" },
    { id: "deletion", label: "Account & Data Deletion" },
    { id: "contact", label: "Contact Developer" }
  ]

  useEffect(() => {
    const handleScrollObserver = () => {
      const sectionIds = ["intro", "data-collection", "data-usage", "permissions", "deletion", "contact"]
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
            Effective Date: August 7, 2026. This Privacy Policy governs the ExpenseMate mobile application (&quot;ExpenseMate&quot;), developed and operated by SkillForge Technology.
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
                In compliance with Google Play Account Deletion requirements, users have full ownership of their data. You can delete your account and all associated transaction data at any time:
              </p>
              <div className="p-4 rounded-xl bg-red-50/50 border border-red-200 text-slate-700 text-sm space-y-2">
                <div className="font-bold text-red-900">How to request data deletion:</div>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>In App: Navigate to <strong>Settings &gt; Account &gt; Delete Account &amp; Data</strong>.</li>
                  <li>Via Email: Send a deletion request to <strong className="text-slate-900">support@skillforgetechnology.app</strong> with your registered account email. All user cloud records will be permanently erased within 14 days.</li>
                </ol>
              </div>
            </section>

            {/* Section 6: Contact */}
            <section id="contact" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Mail size={20} className="text-blue-600" />
                <span>6. Developer Contact</span>
              </h2>
              <div className="text-slate-600 text-sm space-y-1 font-mono">
                <div><strong>Developer:</strong> SkillForge Technology</div>
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
