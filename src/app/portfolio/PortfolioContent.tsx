"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, ArrowRight, Layers, Cpu, Brain, Laptop } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { agencyCaseStudies } from "@/data/agencyData"
import { useLanguage } from "@/context/LanguageContext"
import { Button } from "@/components/ui/button"

export default function PortfolioContent() {
  const { t, isRTL } = useLanguage()
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const categories = [
    { id: "all", name: t("portfolio.tabAll" as any) },
    { id: "web", name: t("portfolio.tabWeb" as any) },
    { id: "mobile", name: t("portfolio.tabMobile" as any) },
    { id: "iot", name: t("portfolio.tabIot" as any) }
  ]

  const filteredItems = agencyCaseStudies.filter((item) => {
    if (activeFilter === "all") return true
    if (activeFilter === "web") {
      return item.tags.some(tag => tag.includes("Web") || tag.includes("Design") || tag.includes("Creative"))
    }
    if (activeFilter === "mobile") {
      return item.tags.some(tag => tag.includes("Mobile"))
    }
    if (activeFilter === "iot") {
      return item.tags.some(tag => tag.includes("IoT") || tag.includes("Embedded"))
    }
    return true
  })

  // Map category/icon for visual richness
  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case "Technology Showcase":
        return <Layers size={14} className="text-blue-500" />
      case "Engineering Demonstration":
        return <Cpu size={14} className="text-emerald-500" />
      case "UI/UX Concept":
        return <Laptop size={14} className="text-purple-500" />
      case "Product Prototype":
        return <Brain size={14} className="text-sky-500" />
      default:
        return <CheckCircle2 size={14} className="text-slate-400" />
    }
  }

  return (
    <div className="relative bg-transparent pt-24 pb-20 select-none text-left bg-dot-pattern" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Background patterns */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">
            {t("portfolio.badge" as any)}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900">
            {t("portfolio.titlePart1" as any)} <span className="text-gradient">{t("portfolio.titlePart2" as any)}</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
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
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span>{cat.name}</span>
          </button>
        ))}
      </section>

      {/* Grid of Portfolio Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 relative group"
              >
                <div>
                  {/* Card Cover Image with aspect ratio and hover scaling */}
                  <div className="relative h-60 w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                    <Image
                      src={item.gallery[0] || "/gallery/software-development/saas_dashboard_mockup.png"}
                      alt={item.title}
                      fill
                      sizes="(max-w-756px) 100vw, 50vw"
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                    {/* Floating tags */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-100/50 shadow-sm flex items-center gap-1">
                        {getProjectTypeIcon(item.projectType)}
                        <span>{item.projectType}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    {/* Client & Industry Row */}
                    <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      <span>{item.client}</span>
                      <span className="text-blue-600 bg-blue-50/70 px-2 py-0.5 rounded">
                        {item.industry}
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-xl text-slate-950 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-slate-500 text-xs leading-relaxed font-sans">
                      {item.summary}
                    </p>

                    {/* Stacks */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.techStack.map((tech) => (
                        <span key={tech} className="text-[9px] font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded px-2 py-0.5">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Challenge & Solution Snip */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
                      <div className="space-y-1">
                        <span className="font-extrabold uppercase tracking-wider text-[9px] text-red-500">
                          {t("portfolio.problemLabel" as any)}
                        </span>
                        <p className="text-slate-500 leading-relaxed text-[11px] font-sans">
                          {item.challenge}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-extrabold uppercase tracking-wider text-[9px] text-blue-600">
                          {t("portfolio.solutionLabel" as any)}
                        </span>
                        <p className="text-slate-500 leading-relaxed text-[11px] font-sans">
                          {item.development.split(".")[0]}.
                        </p>
                      </div>
                    </div>

                    {/* Key Outcome Metrics */}
                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        {item.metricLabel}
                      </span>
                      <span className="text-lg font-extrabold text-emerald-600 font-display">
                        {item.metric}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-8 pb-8 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Verified Showcase
                  </span>
                  <Link href={`/case-studies/${item.id}`}>
                    <Button variant="outline" size="sm" className="font-bold flex items-center gap-1.5 text-[10px] cursor-pointer hover:bg-slate-50 border-slate-200">
                      <span>View Case Study</span>
                      <ArrowRight size={12} />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

    </div>
  )
}
