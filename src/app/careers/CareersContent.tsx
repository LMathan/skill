"use client"

import React, { useState } from "react"
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Check, 
  GraduationCap, 
  Sparkles, 
  UploadCloud, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { agencyCareers } from "@/data/agencyData"
import { useLanguage } from "@/context/LanguageContext"

export default function CareersContent() {
  const { t } = useLanguage()
  const [activeJob, setActiveJob] = useState<string | null>("junior-bde")
  const [applied, setApplied] = useState(false)
  const [resumeName, setResumeName] = useState("")

  const [isApplying, setIsApplying] = useState(false)
  const [applyError, setApplyError] = useState("")
  const [honeypot, setHoneypot] = useState("")

  const toggleJob = (id: string) => {
    setActiveJob(activeJob === id ? null : id)
  }

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsApplying(true)
    setApplyError("")
    try {
      const formData = new FormData(e.currentTarget)
      // Honeypot — server silently accepts when filled (bot detected).
      formData.append("_gotcha", honeypot)
      const res = await fetch("/api/careers-apply", {
        method: "POST",
        body: formData
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setApplied(true)
        setTimeout(() => {
          setApplied(false)
          setResumeName("")
          setActiveJob(null)
        }, 3500)
      } else {
        setApplyError(data.error || "Failed to submit application. Please try again.")
      }
    } catch (err) {
      setApplyError("A connection error occurred. Please try again.")
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-slate-50/60 pt-32 sm:pt-36 md:pt-40 pb-24 text-left bg-dot-pattern overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="hidden md:block absolute top-10 right-10 w-[480px] h-[480px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="hidden md:block absolute top-1/3 left-5 w-[420px] h-[420px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="hidden md:block absolute bottom-20 right-1/4 w-[360px] h-[360px] bg-indigo-500/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 sm:pb-16 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-semibold text-blue-700 tracking-wide uppercase font-display">
              {t("careers.badge") || "R&D & Growth Careers"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display text-slate-900 leading-[1.15]">
            {t("careers.titlePart1") || "Shape the Future of"} <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {t("careers.titlePart2") || "Enterprise Engineering"}
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-normal">
            {t("careers.subtitle") || "Join our team in Perundurai and globally. We build scalable software architectures, design world-class digital products, and drive strategic client growth."}
          </p>
        </div>
      </section>

      {/* Open Roles list */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-200/80 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-950 tracking-tight">
              {t("careers.openRoles") || "Active Opportunities"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Explore open positions and join our passionate team.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold self-start sm:self-auto shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{agencyCareers.length} Open Positions</span>
          </div>
        </div>

        {agencyCareers.map((job) => {
          const isExpanded = activeJob === job.id
          
          return (
            <div 
              key={job.id}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                isExpanded 
                  ? "border-blue-500/60 shadow-md ring-2 ring-blue-500/10" 
                  : "border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-sm"
              }`}
            >
              {/* Header clickable card */}
              <div 
                onClick={() => toggleJob(job.id)}
                className="p-5 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
              >
                <div className="space-y-2.5 text-left w-full md:w-auto">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-bold text-slate-950 text-base sm:text-lg font-display">
                      {job.title}
                    </h3>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {job.department}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 text-slate-500 text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-slate-400 shrink-0" />
                      <span>{job.location}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-slate-400 shrink-0" />
                      <span>{job.type}</span>
                    </span>
                    {job.experience && (
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/60 font-semibold text-[11px]">
                        <GraduationCap size={13} className="text-amber-600 shrink-0" />
                        <span>{job.experience}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center pt-2 md:pt-0">
                  <span className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    {isExpanded ? "Hide Details" : "View & Apply"}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    isExpanded ? "bg-blue-600 text-white rotate-180" : "bg-slate-100 text-slate-500"
                  }`}>
                    <ChevronDown size={15} />
                  </div>
                </div>
              </div>

              {/* Expander detail view */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeInOut" }}
                    className="overflow-hidden bg-gradient-to-b from-slate-50/40 via-white to-slate-50/20 border-t border-slate-100"
                  >
                    <div className="p-6 sm:p-8 space-y-7 text-xs sm:text-sm">
                      
                      {/* Role Summary */}
                      <div className="space-y-2 text-left bg-white p-4 sm:p-5 rounded-xl border border-slate-200/70 shadow-xs">
                        <span className="font-extrabold uppercase tracking-widest text-[10px] text-blue-600 block font-display">
                          {t("careers.summaryTitle") || "Role Summary"}
                        </span>
                        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                          {job.summary}
                        </p>
                      </div>

                      {/* Key Responsibilities */}
                      {job.responsibilities && job.responsibilities.length > 0 && (
                        <div className="space-y-3 text-left">
                          <span className="font-extrabold uppercase tracking-widest text-[10px] text-slate-400 block font-display">
                            {t("careers.responsibilitiesTitle") || "Key Responsibilities"}
                          </span>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {job.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-slate-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                                <Check size={14} className="text-blue-600 shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-[13px]">{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Requirements and Benefits */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        
                        {/* Requirements */}
                        <div className="space-y-3">
                          <span className="font-extrabold uppercase tracking-widest text-[10px] text-slate-400 block font-display">
                            {t("careers.requirementsTitle") || "Requirements"}
                          </span>
                          <ul className="space-y-2.5">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-slate-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                                <Check size={14} className="text-blue-600 shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-[13px]">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* What We Offer / Benefits */}
                        <div className="space-y-3">
                          <span className="font-extrabold uppercase tracking-widest text-[10px] text-slate-400 block font-display">
                            {t("careers.benefitsTitle") || "What We Offer"}
                          </span>
                          <ul className="space-y-2.5">
                            {job.benefits.map((ben, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-slate-700 font-medium leading-relaxed bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                                <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                                <span className="text-xs sm:text-[13px]">{ben}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Application Form */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5 text-left mt-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                          <div>
                            <span className="font-bold text-slate-900 block font-display text-sm sm:text-base">
                              Apply for {job.title}
                            </span>
                            <span className="text-slate-500 text-xs">
                              Submit your details and CV. Our hiring team responds within 3–5 business days.
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/60 self-start sm:self-auto">
                            <ShieldCheck size={12} className="text-blue-600" />
                            Direct Hiring Team
                          </span>
                        </div>

                        <form onSubmit={handleApply} className="space-y-4 text-left">
                          {/* Honeypot — hidden from humans, catches bots */}
                          <input
                            type="text"
                            name="_gotcha"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                            aria-hidden="true"
                            className="hidden"
                          />
                          
                          {/* Hidden inputs to pass job context */}
                          <input type="hidden" name="jobId" value={job.id} />
                          <input type="hidden" name="jobTitle" value={job.title} />

                          {applyError && (
                            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold text-left">
                              {applyError}
                            </div>
                          )}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Full Name <span className="text-rose-500">*</span>
                              </label>
                              <input 
                                type="text" 
                                required 
                                name="name"
                                placeholder={t("careers.formNamePlaceholder") || "e.g. John Doe"}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 text-slate-900 placeholder:text-slate-400 transition-all"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                                Email Address <span className="text-rose-500">*</span>
                              </label>
                              <input 
                                type="email" 
                                required 
                                name="email"
                                placeholder={t("careers.formEmailPlaceholder") || "e.g. name@example.com"}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 text-slate-900 placeholder:text-slate-400 transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-700 block">
                              {t("careers.formFileLabel") || "Upload CV / Resume (PDF format, max 5 MB)"} <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-4 bg-slate-50/60 transition-colors">
                              <input 
                                type="file" 
                                required 
                                name="resume"
                                accept=".pdf"
                                onChange={(e) => setResumeName(e.target.files?.[0]?.name || "")}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                                  <UploadCloud size={18} />
                                </div>
                                <div className="text-left">
                                  <p className="text-xs font-semibold text-slate-800">
                                    {resumeName || "Click or drag your PDF resume here"}
                                  </p>
                                  <p className="text-[11px] text-slate-400">
                                    Only PDF format accepted • Maximum size 5 MB
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3">
                            <Button 
                              type="submit" 
                              variant="gradient" 
                              disabled={isApplying}
                              className="font-bold text-xs sm:text-sm py-2.5 px-6 disabled:opacity-50 flex items-center gap-2 rounded-xl shadow-xs"
                            >
                              {isApplying ? "Submitting Application..." : (t("careers.formSubmit") || "Submit Application")}
                              <ArrowRight size={14} />
                            </Button>

                            {applied && (
                              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                                <CheckCircle2 size={14} className="text-emerald-600" />
                                <span>{t("careers.formSuccess") || "Application received! We'll be in touch."}</span>
                              </div>
                            )}
                          </div>
                        </form>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )
        })}
      </section>

    </div>
  )
}
