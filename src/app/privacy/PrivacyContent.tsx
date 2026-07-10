"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Shield, Lock, FileText, ArrowRight, CheckCircle2, Server } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function PrivacyContent() {
  const { isRTL } = useLanguage()
  const [activeSection, setActiveSection] = useState("intro")

  const sections = [
    { id: "intro", label: "Introduction" },
    { id: "collect", label: "Data We Collect" },
    { id: "use", label: "Processing & Usage" },
    { id: "gdpr", label: "Global Compliance" },
    { id: "security", label: "Technical Security" },
    { id: "contact", label: "Contact Details" }
  ]

  const handleScroll = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="relative bg-transparent pt-28 pb-24 overflow-x-hidden text-slate-800 bg-dot-pattern" dir={isRTL ? "rtl" : "ltr"}>

      {/* Background Gradients */}
      <div className="absolute top-10 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">
          <Link href="/" className="hover:text-blue-650 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">Legal & Privacy</span>
          <span>/</span>
          <span className="text-blue-650">Privacy Policy</span>
        </div>

        {/* Header Block */}
        <div className="space-y-4 text-left max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/40 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
            <Shield size={11} />
            <span>Information Security Protocols</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            Global Data Privacy & Protection Policy
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium">
            Last Updated: July 2, 2026. This document explains how SkillForge Technology processes, secures, and maintains user data in compliance with international privacy mandates.
          </p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Sticky Section Indicators */}
          <div className="lg:col-span-4 sticky top-28 bg-white/80 border border-slate-200/80 p-5 rounded-2xl shadow-sm backdrop-blur-md hidden lg:block text-left">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <Lock size={15} className="text-blue-600 animate-pulse" />
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider font-display">Document Outline</span>
            </div>

            <nav className="space-y-1">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleScroll(sec.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                        : "text-slate-655 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                  >
                    <span>{sec.label}</span>
                    {isActive && <CheckCircle2 size={12} className="text-white" />}
                  </button>
                )
              })}
            </nav>

            {/* Quick Support Widget */}
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Need Data Help?</div>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                Contact our Data Protection Officer for inquiries related to personal data erasure or audit requirements.
              </p>
              <Link href="/contact">
                <button className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-blue-600 bg-white hover:bg-blue-50/20 text-xs font-bold text-slate-700 hover:text-blue-650 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1">
                  Submit Privacy Ticket
                  <ArrowRight size={12} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Detailed Document Body */}
          <div className="lg:col-span-8 space-y-12 text-left font-sans text-xs sm:text-sm text-slate-655 leading-relaxed">

            {/* 1. Introduction */}
            <section id="intro" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">01.</span>
                Introduction
              </h2>
              <p>
                At SkillForge Technology, we are committed to defending personal privacy and engineering systems that hold data integrity above all else. This privacy policy applies to our operations globally and outlines our practices concerning data collection, transmission, storage, and processing.
              </p>
              <p>
                As a cloud-first software consultancy and custom systems engineering partner, we implement privacy-by-design methodologies. Whether you visit our main portal, request a scope estimate, or partner with us for dedicated engineering resources, your data is handled with rigorous security parameters.
              </p>
            </section>

            {/* 2. Data We Collect */}
            <section id="collect" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">02.</span>
                Data We Collect
              </h2>
              <p>
                We limit collection to the minimal data necessary to fulfill technical consults, process software inquiries, and ensure application security performance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <FileText size={14} className="text-blue-600" />
                    Inquiry Information
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Names, business emails, telephone details, company titles, project scoping scopes, and any documentation uploaded to evaluate client design requirements.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Server size={14} className="text-blue-600" />
                    Technical Telemetry
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Anonymized IP coordinates, browser software parameters, language options, operating systems details, page view timings, and basic marketing referrers.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Processing & Usage */}
            <section id="use" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">03.</span>
                Processing & Usage
              </h2>
              <p>
                We do not sell personal details to marketing networks or third-party agencies. Personal data is utilized exclusively for operational business logic:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Evaluating project scopes, drafting software blueprints, and coordinating technical calls.</li>
                <li>Provisioning cloud hosting parameters and secure staging nodes during custom client builds.</li>
                <li>Distributing technical product alerts, newsletter briefings, and updates regarding operational SLAs.</li>
                <li>Preventing malicious script injections, DDoS attacks, and unauthorized system access.</li>
              </ul>
            </section>

            {/* 4. Global Compliance */}
            <section id="gdpr" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">04.</span>
                Global Compliance (GDPR & CCPA)
              </h2>
              <p>
                SkillForge Technology operates globally, aligning data practices with the European Union General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
              </p>
              <div className="p-4 border border-blue-100 bg-blue-50/20 rounded-xl space-y-2">
                <span className="font-bold text-slate-900 block">Your Rights Under GDPR:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-green-650" />
                    Right to access records at any time.
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-green-650" />
                    Right to rectify inaccurate data parameters.
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-green-650" />
                    Right to request complete data erasure.
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="text-green-650" />
                    Right to object to algorithmic processing.
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Technical Security */}
            <section id="security" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">05.</span>
                Technical Security
              </h2>
              <p>
                Data security is central to our hardware and software architecture:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>In-Transit Encryptions</strong>: All incoming web telemetry and API routes are secured via TLS 1.3 algorithms.</li>
                <li><strong>At-Rest Protection</strong>: System backups and storage tables utilize AES-256 block-cipher encryptions.</li>
                <li><strong>Access Control</strong>: Internal database connections require multi-factor tokens and secure VPN routes.</li>
              </ul>
            </section>

            {/* 6. Contact Details */}
            <section id="contact" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">06.</span>
                Contact Details
              </h2>
              <p>
                For questions regarding data processing policies, personal records retrieval, or to request a data erasure ticket, please contact our Data Protection Officer:
              </p>
              <div className="p-5 bg-slate-50 border border-slate-200/60 rounded-xl space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400 font-bold">Office:</span>
                  <span className="text-slate-800 font-bold">SkillForge Technology, India</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400 font-bold">Designated DPO:</span>
                  <span className="text-slate-800 font-bold">Security Operations Division</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-bold">Direct Email:</span>
                  <span className="text-blue-650 font-bold hover:underline">info@skillforgetechnology.app</span>
                </div>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  )
}
