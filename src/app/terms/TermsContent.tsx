"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Scale, Lock, FileText, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function TermsContent() {
  const { isRTL } = useLanguage()
  const [activeSection, setActiveSection] = useState("acceptance")

  const sections = [
    { id: "acceptance", label: "Acceptance of Terms" },
    { id: "scoping", label: "Scoping & Estimates" },
    { id: "ip", label: "Intellectual Property" },
    { id: "warranties", label: "Warranty Disclaimers" },
    { id: "liability", label: "Liability Limitations" },
    { id: "governing", label: "Governing Law" }
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
      <div className="absolute top-10 left-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">
          <Link href="/" className="hover:text-blue-650 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-500">Legal & Privacy</span>
          <span>/</span>
          <span className="text-blue-650">Terms of Service</span>
        </div>

        {/* Header Block */}
        <div className="space-y-4 text-left max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/40 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
            <Scale size={11} />
            <span>Operational Policies</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            Terms of Service & Engagement
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium">
            Last Updated: July 2, 2026. These terms govern your access to the SkillForge Technologies portals, custom estimates, and software consulting services.
          </p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sticky Section Indicators */}
          <div className="lg:col-span-4 sticky top-28 bg-white/80 border border-slate-200/80 p-5 rounded-2xl shadow-sm backdrop-blur-md hidden lg:block text-left">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <Scale size={15} className="text-blue-600 animate-pulse" />
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider font-display">Terms Outline</span>
            </div>
            
            <nav className="space-y-1">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleScroll(sec.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      isActive 
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

            {/* Support Call-out */}
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contract Scopes?</div>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                If you have a dedicated software service agreement (SLA), please refer to your custom client statement of work (SOW) which overrides these general web terms.
              </p>
              <Link href="/contact">
                <button className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-blue-600 bg-white hover:bg-blue-50/20 text-xs font-bold text-slate-700 hover:text-blue-655 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1">
                  Contact Billing Team
                  <ArrowRight size={12} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Detailed Document Body */}
          <div className="lg:col-span-8 space-y-12 text-left font-sans text-xs sm:text-sm text-slate-655 leading-relaxed">
            
            {/* 1. Acceptance of Terms */}
            <section id="acceptance" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">01.</span>
                Acceptance of Terms
              </h2>
              <p>
                By navigating the SkillForge Technologies web applications, requesting a custom scope quote estimate, or registering for automated pipeline notifications, you explicitly agree to compile and abide by these general Terms of Service. If you do not accept these policies in full, you must exit our digital platforms immediately.
              </p>
              <p>
                We reserve the right to modify these parameters at any time. Operational updates are immediately applicable upon being published on this page, and your continued usage represents consent to modified covenants.
              </p>
            </section>

            {/* 2. Scoping & Estimates */}
            <section id="scoping" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">02.</span>
                Scoping & Estimates
              </h2>
              <p>
                Estimates, custom proposal slide decks, and blueprints issued through our calendar consultation tool represent preliminary planning scopes. They do not constitute a binding operational contract to engineer software or allocate developers.
              </p>
              <p>
                Formal engineering works commence exclusively after a legal Statement of Work (SOW) is co-signed by authorized corporate delegates and initial mobilization retainers are fully processed by our finance division.
              </p>
            </section>

            {/* 3. Intellectual Property */}
            <section id="ip" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">03.</span>
                Intellectual Property
              </h2>
              <p>
                All web layout models, graphic mockups, animated vectors, copy documents, and custom simulator scripts displayed on this website are the exclusive property of SkillForge Technologies and are protected by international trademark and copyright treaties.
              </p>
              <div className="p-4 border border-blue-100 bg-blue-50/20 rounded-xl space-y-2">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <AlertCircle size={14} className="text-blue-600" />
                  Client IP Sovereignty
                </div>
                <p className="text-[11px] text-slate-500">
                  During client engagements, intellectual property rights, database schemas, and codebase files transfer fully to the client upon the settlement of final payment milestones, as explicitly detailed in individual software engineering contracts.
                </p>
              </div>
            </section>

            {/* 4. Warranty Disclaimers */}
            <section id="warranties" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">04.</span>
                Warranty Disclaimers
              </h2>
              <p>
                Our public websites, case study metrics, and simulator panels are provided &quot;as is&quot; without warranties of any kind, whether verbal, implied, or statutory.
              </p>
              <p>
                We do not warrant that our servers are entirely free from script latency fluctuations, cloud node failures, or temporary offline downtime, though we maintain high security standards to optimize uptime benchmarks.
              </p>
            </section>

            {/* 5. Liability Limitations */}
            <section id="liability" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">05.</span>
                Liability Limitations
              </h2>
              <p>
                To the maximum extent permitted by applicable jurisdiction, SkillForge Technologies, its engineering directors, and offshore developers shall not be liable for any indirect, consequential, special, or incidental damages arising from web downtime, data loss during audits, or business interruptions.
              </p>
            </section>

            {/* 6. Governing Law */}
            <section id="governing" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">06.</span>
                Governing Law
              </h2>
              <p>
                These general terms are governed by and construed in accordance with the laws of India, without giving effect to conflict of laws principles. Any legal disputes arising out of these web terms shall reside exclusively under the jurisdiction of competent courts located in Erode, Tamil Nadu, India.
              </p>
            </section>

          </div>

        </div>

      </div>
    </div>
  )
}
