"use client"

import React, { useState } from "react"
import { ChevronDown, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { agencyCaseStudies } from "@/data/agencyData"
import { useLanguage } from "@/context/LanguageContext"

export default function CaseStudiesContent() {
  const { t } = useLanguage()
  const [expandedStudy, setExpandedStudy] = useState<string | null>("ai-logistics")

  const toggleStudy = (id: string) => {
    setExpandedStudy(expandedStudy === id ? null : id)
  }

  const getTranslation = (key: string, fallback: string) => {
    const value = t(key as any)
    return (!value || value === key) ? fallback : value
  }

  return (
    <div className="relative bg-white pt-24 pb-20 select-none text-left bg-dot-pattern">
      
      {/* Background patterns */}
      <div className="hidden md:block absolute top-0 right-10 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl pointer-events-none -z-10 transform-gpu will-change-transform" />
      <div className="hidden md:block absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none -z-10 transform-gpu will-change-transform" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">{t("caseStudies.badge" as any)}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900">
            {t("caseStudies.titlePart1" as any)} <span className="text-gradient">{t("caseStudies.titlePart2" as any)}</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            {t("caseStudies.subtitle" as any)}
          </p>
        </div>
      </section>

      {/* Case studies list */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {agencyCaseStudies.map((study) => {
          const isExpanded = expandedStudy === study.id
          
          return (
            <div 
              key={study.id}
              className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              
              {/* Header card preview */}
              <div 
                onClick={() => toggleStudy(study.id)}
                className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer select-none hover:bg-slate-55 transition-colors"
              >
                <div className="space-y-3 text-left flex-grow w-full md:w-auto">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <span>{getTranslation(`caseStudies.${study.id}.client`, study.client)}</span>
                    <span className="text-blue-655 bg-blue-50 px-2 py-0.5 rounded-md whitespace-normal break-words">{getTranslation(`caseStudies.${study.id}.industry`, study.industry)}</span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold font-display text-slate-955 leading-tight">
                    {getTranslation(`caseStudies.${study.id}.title`, study.title)}
                  </h2>
                  <p className="text-xs text-slate-500 max-w-2xl line-clamp-1 leading-relaxed">
                    {getTranslation(`caseStudies.${study.id}.summary`, study.summary)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 shrink-0 pt-4 md:pt-0 border-t border-slate-100 md:border-t-0 w-full md:w-48 text-left">
                  <div className="text-left">
                    <span className="block text-xl sm:text-2xl font-extrabold text-blue-655 font-display leading-none">
                      {getTranslation(`caseStudies.${study.id}.metric`, study.metric)}
                    </span>
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mt-1 block leading-tight">
                      {getTranslation(`caseStudies.${study.id}.metricLabel`, study.metricLabel)}
                    </span>
                  </div>
                  <ChevronDown size={18} className={`text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                </div>
              </div>

              {/* Collapsed breakdown sections */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden bg-slate-50/40 border-t border-slate-100"
                  >
                    <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
                      
                      <div className="space-y-6 text-left">
                        <div className="space-y-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">
                            01. {t("caseStudies.step1" as any)}
                          </span>
                          <p className="text-slate-500 leading-relaxed text-xs">
                            {getTranslation(`caseStudies.${study.id}.challenge`, study.challenge)}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">
                            02. {t("caseStudies.step2" as any)}
                          </span>
                          <p className="text-slate-500 leading-relaxed text-xs">
                            {getTranslation(`caseStudies.${study.id}.research`, study.research)}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">
                            03. {t("caseStudies.step3" as any)}
                          </span>
                          <p className="text-slate-500 leading-relaxed text-xs">
                            {getTranslation(`caseStudies.${study.id}.design`, study.design)}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6 text-left border-t md:border-t-0 md:border-l border-slate-200/80 pt-6 md:pt-0 md:pl-8">
                        <div className="space-y-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">
                            04. {t("caseStudies.step4" as any)}
                          </span>
                          <p className="text-slate-500 leading-relaxed text-xs">
                            {getTranslation(`caseStudies.${study.id}.development`, study.development)}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">
                            05. {t("caseStudies.step5" as any)}
                          </span>
                          <p className="text-slate-500 leading-relaxed text-xs">
                            {getTranslation(`caseStudies.${study.id}.deployment`, study.deployment)}
                          </p>
                        </div>

                        <div className="space-y-2 bg-white p-4 border border-slate-100 rounded-2xl shadow-sm">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-green-655 block font-display flex items-center gap-1">
                            <CheckCircle2 size={12} className="text-green-500" />
                            <span>06. {t("caseStudies.step6" as any)}</span>
                          </span>
                          <p className="text-slate-700 font-semibold leading-relaxed text-xs">
                            {getTranslation(`caseStudies.${study.id}.result`, study.result)}
                          </p>
                        </div>
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
