"use client"

import React from "react"
import { Target, Eye, Award, CheckCircle, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"

export default function AboutContent() {
  const { t } = useLanguage()

  const values = [
    {
      title: t("about.values.0.title" as any),
      desc: t("about.values.0.desc" as any),
      icon: <Globe className="text-blue-650" size={26} />
    },
    {
      title: t("about.values.1.title" as any),
      desc: t("about.values.1.desc" as any),
      icon: <Target className="text-purple-650" size={26} />
    },
    {
      title: t("about.values.2.title" as any),
      desc: t("about.values.2.desc" as any),
      icon: <Eye className="text-blue-600" size={26} />
    }
  ]

  const metrics = [
    { value: "Global", label: t("about.metrics.0.label" as any) },
    { value: "Agile", label: t("about.metrics.1.label" as any) },
    { value: "Collaborative", label: t("about.metrics.2.label" as any) },
    { value: "Reliable", label: t("about.metrics.3.label" as any) }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-transparent pt-24 text-left select-none bg-dot-pattern noise-bg"
    >
      
      {/* Background colorful blurred blobs */}
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 3D-style wireframe isometric tech sphere SVG */}
      <svg className="absolute top-20 right-[15%] w-72 h-72 text-indigo-500/10 pointer-events-none -z-10 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.2" />
        <ellipse cx="50" cy="50" rx="40" ry="15" stroke="currentColor" strokeWidth="0.25" />
        <ellipse cx="50" cy="50" rx="15" ry="40" stroke="currentColor" strokeWidth="0.25" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.2" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="3" fill="currentColor" className="text-blue-500 animate-ping" />
      </svg>

      {/* Hero Header */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">{t("about.storyBadge" as any)}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            {t("about.titlePart1" as any)} <br />
            <span className="text-gradient">{t("about.titlePart2" as any)}</span>
          </h1>
          <p className="text-slate-555 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            {t("about.subtitle" as any)}
          </p>
        </div>
      </section>

      {/* Stats Board */}
      <section className="bg-slate-50/50 border-y border-slate-200/50 py-10 my-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {metrics.map((m, idx) => (
              <div key={idx} className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-blue-650 font-display">
                  {m.value}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200/85 p-8 rounded-3xl space-y-4 hover:shadow-md transition-shadow duration-300 glass-card glass-card-hover"
            >
              <div className="p-3 bg-blue-50/40 border border-slate-100 w-fit rounded-2xl">
                {item.icon}
              </div>
              <h2 className="text-lg font-bold font-display text-slate-950">{item.title}</h2>
              <p className="text-xs text-slate-550 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Philosophy */}
      <section className="bg-slate-50/50 border-y border-slate-200/40 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">{t("about.techBadge" as any)}</span>
              <h2 className="text-3xl font-bold tracking-tight font-display text-slate-900">
                {t("about.techTitlePart1" as any)} <span className="text-gradient">{t("about.techTitlePart2" as any)}</span>
              </h2>
              <p className="text-slate-555 text-xs sm:text-sm leading-relaxed">
                {t("about.techDesc" as any)}
              </p>

              <div className="space-y-3">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle className="text-blue-650 shrink-0" size={16} />
                    <span className="text-xs font-semibold text-slate-700">{t(`about.techBullets.${idx}` as any)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm glass-card-premium relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
                <span className="font-extrabold text-sm text-slate-900 block font-display">{t("about.cards.0.title" as any)}</span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
                  {t("about.cards.0.desc" as any)}
                </p>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors" />
              </div>
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm glass-card-premium relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 to-purple-600" />
                <span className="font-extrabold text-sm text-slate-900 block font-display">{t("about.cards.1.title" as any)}</span>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-sans">
                  {t("about.cards.1.desc" as any)}
                </p>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-colors" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mb-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">{t("about.badgesBadge" as any)}</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">{t("about.badgesTitle" as any)}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-3 hover:shadow-md transition-shadow glass-card glass-card-hover"
            >
              <div className="p-3 bg-blue-50/40 text-blue-655 rounded-xl w-fit mx-auto">
                <Award size={22} />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 font-display">{t(`about.badges.${index}.title` as any)}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">{t(`about.badges.${index}.desc` as any)}</p>
            </div>
          ))}
        </div>
      </section>

    </motion.div>
  )
}
