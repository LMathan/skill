"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ShieldAlert, Lock, CheckCircle2, Shield, Eye, Cpu, ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

export default function SecurityContent() {
  const { isRTL } = useLanguage()
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", label: "Security Overview" },
    { id: "infrastructure", label: "Cloud & Infrastructure" },
    { id: "pipeline", label: "Pipeline & Code Auditing" },
    { id: "access", label: "Access Controls & MFA" },
    { id: "audits", label: "Compliance & Audits" },
    { id: "disclosure", label: "Responsible Disclosure" }
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
          <span className="text-blue-650">Security Standards</span>
        </div>

        {/* Header Block */}
        <div className="space-y-4 text-left max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/40 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
            <ShieldAlert size={11} />
            <span>Infrastructure Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            Enterprise Security & Systems Standards
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium">
            Last Updated: July 2, 2026. How SkillForge Technology builds secure software, hardens cloud pipelines, and shields client source code directories.
          </p>
        </div>

        {/* Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Sticky Section Indicators */}
          <div className="lg:col-span-4 sticky top-28 bg-white/80 border border-slate-200/80 p-5 rounded-2xl shadow-sm backdrop-blur-md hidden lg:block text-left">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <Lock size={15} className="text-blue-600 animate-pulse" />
              <span className="text-xs font-black text-slate-900 uppercase tracking-wider font-display">Security Outline</span>
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

            {/* Quick Threat Support Widget */}
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Report Vulnerability?</div>
              <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                If you detect a vulnerability, please do not disclose it publicly. Review our responsible disclosure guidelines on the right.
              </p>
              <Link href="/contact">
                <button className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-blue-600 bg-white hover:bg-blue-50/20 text-xs font-bold text-slate-700 hover:text-blue-655 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-1">
                  Report Threat Node
                  <ArrowRight size={12} />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Detailed Document Body */}
          <div className="lg:col-span-8 space-y-12 text-left font-sans text-xs sm:text-sm text-slate-655 leading-relaxed">
            
            {/* 1. Security Overview */}
            <section id="overview" className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">01.</span>
                Security Overview
              </h2>
              <p>
                At SkillForge Technology, information security is built into our core workflows rather than added as an afterthought. We implement industry-proven security paradigms to protect our internal services, build staging pipelines, and final client source code directories.
              </p>
              <p>
                Our defense-in-depth model spans network topologies, secure code packaging compilation, container vulnerability check routines, and absolute database access control parameters.
              </p>
            </section>

            {/* 2. Cloud & Infrastructure */}
            <section id="infrastructure" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">02.</span>
                Cloud & Infrastructure Security
              </h2>
              <p>
                We host our systems and customer development environments inside premium public cloud clusters (primarily AWS and Vercel) utilizing secure network rules:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Network Isolation</strong>: Staging staging servers and database clusters are hosted inside private Virtual Private Clouds (VPCs) hidden from the public internet.</li>
                <li><strong>Firewalls & Shields</strong>: We utilize Cloudflare Web Application Firewalls (WAFs) and AWS Shield protocols to inspect routing requests and block potential DDoS threats.</li>
                <li><strong>Secure Transport</strong>: All visual pipelines, WebSockets routes, and database communication calls enforce TLS 1.3 encryption.</li>
              </ul>
            </section>

            {/* 3. Pipeline & Code Auditing */}
            <section id="pipeline" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">03.</span>
                Pipeline & Code Auditing
              </h2>
              <p>
                To maintain codebase safety and guarantee bugs are resolved before static page packaging:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Cpu size={14} className="text-blue-600" />
                    Static Dependency Checking (SAST)
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Automated GitHub Actions workflow scripts scan third-party npm packages and compile warnings when libraries contain deprecated security parameters.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Shield size={14} className="text-blue-600" />
                    Container Security
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Our Docker base containers undergo automated static scans on build to identify and patch system-level package vulnerabilities before cluster deployment.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Access Controls & MFA */}
            <section id="access" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">04.</span>
                Access Controls & MFA
              </h2>
              <p>
                We enforce a strict Principle of Least Privilege (PoLP) regarding system authorization:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>No Plaintext Credentials</strong>: All server connections and database credentials are injected dynamically at runtime via secure environment managers (such as AWS Secrets Manager).</li>
                <li><strong>Multi-Factor Authentication</strong>: All developer GitHub profiles, server terminals, and database tools require mandatory MFA verification.</li>
                <li><strong>Activity Logging</strong>: Access attempts to git pipelines or AWS databases are audited and compiled inside secure Datadog dashboards.</li>
              </ul>
            </section>

            {/* 5. Compliance & Audits */}
            <section id="audits" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">05.</span>
                Compliance & Audits
              </h2>
              <p>
                SkillForge Technology regularly reviews internal processes. Our custom engineering works are designed to help clients satisfy SOC 2, HIPAA (for clinical health records), and PCI-DSS (for secure payment checkouts) compliance.
              </p>
            </section>

            {/* 6. Responsible Disclosure */}
            <section id="disclosure" className="space-y-4 border-t border-slate-200/60 pt-10">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display flex items-center gap-2">
                <span className="text-blue-600 font-mono text-base font-extrabold">06.</span>
                Responsible Disclosure
              </h2>
              <p>
                We welcome reports from security researchers to keep our digital platforms protected. If you identify a potential security threat or system vulnerability:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Email your findings directly to <span className="font-semibold text-blue-650 hover:underline">security@skillforge.tech</span>.</li>
                <li>Provide a step-by-step description of the proof of concept (PoC) to reproduce the vulnerability.</li>
                <li>Allow our engineering division a reasonable timeframe (typically 7-14 business days) to build and deploy a patch before public disclosure.</li>
              </ul>
            </section>

          </div>

        </div>

      </div>
    </div>
  )
}
