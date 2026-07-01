"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { agencyPortfolio } from "@/data/agencyData"
import { useLanguage } from "@/context/LanguageContext"

export default function PortfolioContent() {
  const { t } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const categories = [
    { id: "all", name: t("portfolio.tabAll" as any) },
    { id: "Web Development", name: t("portfolio.tabWeb" as any) },
    { id: "Mobile App Development", name: t("portfolio.tabMobile" as any) },
    { id: "IoT & Embedded Systems", name: t("portfolio.tabIot" as any) }
  ]

  const filteredItems = activeFilter === "all"
    ? agencyPortfolio
    : agencyPortfolio.filter((item) => item.category === activeFilter)

  // Mapping static categories/industries to translations keys
  const categoryKeyMap: Record<string, string> = {
    "Web Development": "services.web-development.title",
    "Mobile App Development": "services.mobile-development.title",
    "IoT & Embedded Systems": "services.iot-embedded.title"
  }

  const industryKeyMap: Record<string, string> = {
    "Healthcare": "industries.1.name",
    "Finance": "industries.0.name",
    "Logistics": "industries.3.name"
  }

  return (
    <div className="relative bg-transparent pt-24 pb-20 select-none text-left bg-dot-pattern">
      
      {/* Background patterns */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">{t("portfolio.badge" as any)}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900">
            {t("portfolio.titlePart1" as any)} <span className="text-gradient">{t("portfolio.titlePart2" as any)}</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            {t("portfolio.subtitle" as any)}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 flex flex-wrap gap-2.5 justify-center border-b border-slate-100 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeFilter === cat.id
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10"
                : "bg-slate-50 text-slate-655 hover:bg-slate-100"
            }`}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </section>

      {/* Grid of Portfolio Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div className="space-y-6">
                  {/* Top categories and tags */}
                  <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    <span>{t(categoryKeyMap[item.category] as any) || item.category}</span>
                    <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{t(industryKeyMap[item.industry] as any) || item.industry}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl text-slate-950">
                    {t(`portfolio.${item.id}.title` as any) || item.title}
                  </h3>

                  {/* Stacks */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded px-2.5 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Problem / Solution / Outcome columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 text-xs">
                    <div className="space-y-1.5">
                      <span className="font-extrabold uppercase tracking-wider text-[10px] text-red-500">{t("portfolio.problemLabel" as any)}</span>
                      <p className="text-slate-500 leading-relaxed">{t(`portfolio.${item.id}.problem` as any) || item.problem}</p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="font-extrabold uppercase tracking-wider text-[10px] text-blue-600">{t("portfolio.solutionLabel" as any)}</span>
                      <p className="text-slate-500 leading-relaxed">{t(`portfolio.${item.id}.solution` as any) || item.solution}</p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="font-extrabold uppercase tracking-wider text-[10px] text-green-600">{t("portfolio.outcomeLabel" as any)}</span>
                      <p className="text-slate-500 leading-relaxed font-semibold">{t(`portfolio.${item.id}.outcome` as any) || item.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                  <span>{t("portfolio.deploymentLabel" as any)}</span>
                  <CheckCircle2 size={14} className="text-green-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

    </div>
  )
}
