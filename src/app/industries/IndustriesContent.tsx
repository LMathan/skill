"use client"

import React from "react"
import Link from "next/link"
import { ShieldCheck, Activity, Globe, TrendingUp, Home, Layout, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { agencyIndustries } from "@/data/agencyData"
import { useLanguage } from "@/context/LanguageContext"

export default function IndustriesContent() {
  const { t } = useLanguage()

  const iconComponents: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="text-blue-650" size={32} />,
    Activity: <Activity className="text-purple-650" size={32} />,
    Globe: <Globe className="text-emerald-600" size={32} />,
    TrendingUp: <TrendingUp className="text-sky-600" size={32} />,
    Home: <Home className="text-orange-500" size={32} />,
    Layout: <Layout className="text-violet-650" size={32} />
  }

  return (
    <div className="relative bg-transparent pt-24 pb-20 select-none text-left bg-dot-pattern">
      
      {/* Background blobs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* 3D-style isometric cube block columns representing industries verticals */}
      <svg className="absolute top-24 right-[10%] w-56 h-56 text-purple-500/10 pointer-events-none -z-10 animate-bounce-slow" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M60 20 L95 38 L95 72 L60 90 L25 72 L25 38 Z" stroke="currentColor" strokeWidth="0.3" />
        <path d="M60 20 L60 90 M25 38 L60 56 L95 38" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="60" cy="56" r="3" fill="currentColor" className="text-purple-600 animate-pulse" />
      </svg>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">{t("industries.badge" as any)}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900">
            {t("industries.titlePart1" as any)} <span className="text-gradient">{t("industries.titlePart2" as any)}</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            {t("industries.subtitle" as any)}
          </p>
        </div>
      </section>

      {/* Detailed Industry Cards List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {agencyIndustries.map((ind, idx) => {
          const Icon = iconComponents[ind.icon] || <ShieldCheck size={32} />
          return (
            <div 
              key={idx}
              className="p-8 sm:p-10 border border-slate-200/80 rounded-3xl glass-card-premium relative overflow-hidden flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center"
            >
              <div className="flex gap-4 items-start max-w-2xl">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl shrink-0 mt-1">
                  {Icon}
                </div>
                <div className="space-y-2 text-left">
                  <h2 className="text-xl font-bold font-display text-slate-950">
                    {t(`industries.${idx}.name` as any) || ind.name}
                  </h2>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {t(`industries.${idx}.desc` as any) || ind.desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 items-stretch lg:items-end w-full lg:w-auto pt-4 lg:pt-0 shrink-0 border-t border-slate-100 lg:border-t-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-655 justify-center">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <span>{t("industries.protectLabel" as any)}</span>
                </div>
                <Link href="/contact">
                  <Button variant="outline" className="text-xs font-bold border-slate-200 hover:bg-slate-50 py-2.5 px-4 w-full">
                    <span>{t("industries.discussBtn" as any)}</span>
                    <ArrowRight size={13} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </section>

    </div>
  )
}
