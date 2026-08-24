"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Shield, Clock, FileText, ArrowRight, CheckCircle2, Award, Zap } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function SlaContent() {
  const { isRTL } = useLanguage()
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", label: "SLA Overview" },
    { id: "uptime", label: "Uptime Commitments" },
    { id: "response", label: "Incident Response Times" },
    { id: "maintenance", label: "Maintenance Windows" },
    { id: "credits", label: "Service Uptime Credits" },
    { id: "exclusions", label: "General Exclusions" }
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
          <span className="text-blue-650">SLA Agreements</span>
        </div>

        {/* Header Block */}
        <div className="space-y-4 text-left max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/40 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
            <Zap size={11} />
            <span>Operational Commitments</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            Service Level Agreements (SLA)
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium">
            Last Updated: July 2, 2026. General operational benchmarks, cloud uptime guarantees, and incident recovery timelines.
          </p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Sticky Section Indicators */}
          <div className="lg:col-span-4 sticky top-28 bg-white/80 border border-slate-200/80 p-5 rounded-2xl shadow-sm backdrop-blur-md hidden lg:block text-left">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <Clock size={15} className="text-blue-600 animate-pulse" />
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider font-display">SLA Outline</span>
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

            {/* SLA Support call-out */}
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dedicated Support?</div>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                SkillForge Technologies offers custom SLA additions (e.g. 24/7 dedicated Slack channels or hot-standby nodes) for enterprise-tier plans.
              </p>
              <Link href="/contact">
                <button className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-blue-600 bg-white hover:bg-blue-50/20 text-xs font-bold text-slate-700 hover:text-blue-655 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1">
                  Request Custom SLA
                  <ArrowRight size={12} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Detailed Document Body */}
          <div className="lg:col-span-8 space-y-12 text-left font-sans text-xs sm:text-sm text-slate-655 leading-relaxed">

            {/* 1. SLA Overview */}
            <section id="overview" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">01.</span>
                SLA Overview
              </h2>
              <p>
                This Service Level Agreement (SLA) outlines the standard operational targets and uptime commitments provided by SkillForge Technologies. We construct cloud-native software and support databases with high availability parameters to ensure smooth performance.
              </p>
              <p>
                Our standard commitments apply to active client portals, API nodes under maintenance retainers, and staging pipelines managed by our teams.
              </p>
            </section>

            {/* 2. Uptime Commitments */}
            <section id="uptime" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">02.</span>
                Uptime Commitments
              </h2>
              <p>
                We target a monthly service availability benchmark of 99.9% (excluding scheduled maintenance windows and standard exclusions detailed below):
              </p>
              <div className="p-4 border border-blue-100 bg-blue-50/20 rounded-xl space-y-2">
                <span className="font-bold text-slate-900 block flex items-center gap-1.5">
                  <Award size={14} className="text-blue-600" />
                  Availability Metrics Schedule:
                </span>
                <ul className="text-[11px] text-slate-600 font-medium space-y-1.5">
                  <li><strong>99.9% - 100%</strong>: Target status (fully compliant, no service credits).</li>
                  <li><strong>99.0% - 99.9%</strong>: Mild disruption alert (audited by support).</li>
                  <li><strong>Below 99.0%</strong>: Severe incident status (eligible for service credits).</li>
                </ul>
              </div>
            </section>

            {/* 3. Incident Response Times */}
            <section id="response" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">03.</span>
                Incident Response Times
              </h2>
              <p>
                Our DevOps operations monitor incoming alert channels and classify incidents by severity:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-red-600">
                    Severity 1 (Critical Uptime Block)
                  </div>
                  <p className="text-[11px] text-slate-500">
                    <strong>Response Target: &lt; 2 Hours.</strong> Core client databases or production APIs are completely offline with no viable workaround.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-amber-600">
                    Severity 2 (Moderate Degradation)
                  </div>
                  <p className="text-[11px] text-slate-500">
                    <strong>Response Target: &lt; 8 Hours.</strong> Non-critical workflows or staging pipelines are failing, but core platforms remain operational.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Maintenance Windows */}
            <section id="maintenance" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">04.</span>
                Maintenance Windows
              </h2>
              <p>
                To apply security patches and optimize static database query latency:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Scheduled Maintenance</strong>: Typically conducted between 02:00 AM and 05:00 AM IST (Indian Standard Time) on weekends.</li>
                <li><strong>Advance Warning</strong>: Clients receive email alerts at least 48 hours in advance for scheduled work.</li>
                <li><strong>Emergency Windows</strong>: Reserved for critical zero-day security patches; advance notice may not be feasible but downtime is minimized.</li>
              </ul>
            </section>

            {/* 5. Service Uptime Credits */}
            <section id="credits" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">05.</span>
                Service Uptime Credits
              </h2>
              <p>
                If we fail to meet our 99.9% monthly uptime target due to factors within our control, clients under active hosting and maintenance retainers are eligible to request service credits. Credits are calculated as a percentage of the monthly maintenance fee and applied to the next billing cycle.
              </p>
            </section>

            {/* 6. General Exclusions */}
            <section id="exclusions" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">06.</span>
                General Exclusions
              </h2>
              <p>
                Downtime calculations exclude disruptions caused by:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Force Majeure events (natural disasters, regional network outages, state-level routing restrictions).</li>
                <li>Client-administered script failures or custom database schema locks applied outside our pipelines.</li>
                <li>API outages of third-party networks (e.g. Stripe, AWS outages, OpenAI API latency).</li>
              </ul>
            </section>

          </div>

        </div>

      </div>
    </div>
  )
}
