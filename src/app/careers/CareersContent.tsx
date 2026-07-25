"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Briefcase, MapPin, Clock, ChevronDown, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { agencyCareers } from "@/data/agencyData"
import { useLanguage } from "@/context/LanguageContext"

export default function CareersContent() {
  const { t } = useLanguage()
  const [activeJob, setActiveJob] = useState<string | null>(null)
  const [applied, setApplied] = useState(false)
  const [resumeName, setResumeName] = useState("")

  const [isApplying, setIsApplying] = useState(false)
  const [applyError, setApplyError] = useState("")

  const toggleJob = (id: string) => {
    setActiveJob(activeJob === id ? null : id)
  }

  const handleApply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsApplying(true)
    setApplyError("")
    try {
      const formData = new FormData(e.currentTarget)
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
        }, 3000)
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
    <div className="relative bg-white pt-24 pb-20 select-none text-left bg-dot-pattern">
      
      {/* Background patterns */}
      <div className="hidden md:block absolute top-0 right-10 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl pointer-events-none -z-10 transform-gpu will-change-transform" />
      <div className="hidden md:block absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none -z-10 transform-gpu will-change-transform" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">{t("careers.badge" as any)}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900">
            {t("careers.titlePart1" as any)} <br />
            <span className="text-gradient">{t("careers.titlePart2" as any)}</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            {t("careers.subtitle" as any)}
          </p>
        </div>
      </section>

      {/* Open Roles list */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200/60 pb-4 mb-8">
          <h2 className="text-xl font-bold font-display text-slate-950">{t("careers.openRoles" as any)}</h2>
        </div>

        {agencyCareers.map((job) => {
          const isExpanded = activeJob === job.id
          
          return (
            <div 
              key={job.id}
              className="bg-white border border-slate-250/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div 
                onClick={() => toggleJob(job.id)}
                className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:bg-slate-50/40 transition-colors"
              >
                <div className="space-y-2 text-left">
                  <h3 className="font-bold text-slate-950 text-base font-display">
                    {t(`careers.${job.id}.title` as any) || job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-slate-400 text-xs font-semibold">
                    <span className="flex items-center gap-1">
                      <Briefcase size={13} />
                      <span>{t(`careers.${job.id}.department` as any) || job.department}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      <span>{t(`careers.${job.id}.location` as any) || job.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      <span>{t(`careers.${job.id}.type` as any) || job.type}</span>
                    </span>
                  </div>
                </div>

                <ChevronDown size={16} className={`text-slate-400 shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
              </div>

              {/* Expander detail view */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-slate-50/30 border-t border-slate-100"
                  >
                    <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
                      <div className="space-y-2 text-left">
                        <span className="font-extrabold uppercase tracking-widest text-[9px] text-slate-400 block font-display">{t("careers.summaryTitle" as any)}</span>
                        <p className="text-slate-500 leading-relaxed">{t(`careers.${job.id}.summary` as any) || job.summary}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="space-y-3">
                          <span className="font-extrabold uppercase tracking-widest text-[9px] text-slate-400 block font-display">{t("careers.requirementsTitle" as any)}</span>
                          <ul className="space-y-2">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-slate-655 font-medium leading-relaxed">
                                <Check size={14} className="text-blue-650 shrink-0 mt-0.5" />
                                <span>{t(`careers.${job.id}.requirements.${idx}` as any) || req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-3">
                          <span className="font-extrabold uppercase tracking-widest text-[9px] text-slate-400 block font-display">{t("careers.benefitsTitle" as any)}</span>
                          <ul className="space-y-2">
                            {job.benefits.map((ben, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-slate-655 font-medium leading-relaxed">
                                <Check size={14} className="text-green-500 shrink-0 mt-0.5" />
                                <span>{t(`careers.${job.id}.benefits.${idx}` as any) || ben}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <form onSubmit={handleApply} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4 text-left mt-6">
                        <span className="font-bold text-slate-900 block font-display text-sm">{t("careers.formTitle" as any)}</span>
                        
                        {/* Hidden inputs to pass job context */}
                        <input type="hidden" name="jobId" value={job.id} />
                        <input type="hidden" name="jobTitle" value={t(`careers.${job.id}.title` as any) || job.title} />

                        {applyError && (
                          <p className="text-xs text-rose-600 font-semibold text-left">{applyError}</p>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input 
                            type="text" 
                            required 
                            name="name"
                            placeholder={t("careers.formNamePlaceholder" as any)}
                            className="bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-650 text-slate-900 placeholder:text-slate-400"
                          />
                          <input 
                            type="email" 
                            required 
                            name="email"
                            placeholder={t("careers.formEmailPlaceholder" as any)}
                            className="bg-slate-50 border border-slate-200/60 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-650 text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold text-slate-400 block">{t("careers.formFileLabel" as any)}</label>
                          <input 
                            type="file" 
                            required 
                            name="resume"
                            accept=".pdf"
                            onChange={(e) => setResumeName(e.target.files?.[0]?.name || "")}
                            className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                          />
                        </div>
                        <div className="flex justify-between items-center pt-2">
                          <Button 
                            type="submit" 
                            variant="gradient" 
                            disabled={isApplying}
                            className="font-bold text-xs py-2 px-5 disabled:opacity-50"
                          >
                            {isApplying ? "Submitting..." : t("careers.formSubmit" as any)}
                          </Button>
                          {applied && (
                            <span className="text-xs text-green-600 font-bold">{t("careers.formSuccess" as any)}</span>
                          )}
                        </div>
                      </form>

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
