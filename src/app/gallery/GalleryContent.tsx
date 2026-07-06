
"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Brain, Layers, CheckCircle2, ArrowRight, Laptop } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { agencyCaseStudies } from "@/data/agencyData"
import { useLanguage } from "@/context/LanguageContext"
import Particles from "@/components/magicui/particles"
import { Button } from "@/components/ui/button"

export default function GalleryContent() {
  const { t, isRTL } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>("All")

  const categories = [
    { id: "All", label: t("portfolio.tabAll" as any), Icon: Layers },
    { id: "Web Platforms", label: t("portfolio.tabWeb" as any), Icon: Laptop },
    { id: "Mobile Applications", label: t("portfolio.tabMobile" as any), Icon: Brain },
    { id: "IoT Hardware", label: t("portfolio.tabIot" as any), Icon: Cpu }
  ]

  // Filter items based on category mapping
  const filtered = useMemo(() => {
    return agencyCaseStudies.filter((item) => {
      if (activeCategory === "All") return true
      if (activeCategory === "Web Platforms") {
        return item.tags.some(tag => tag.includes("Web") || tag.includes("Design") || tag.includes("Creative"))
      }
      if (activeCategory === "Mobile Applications") {
        return item.tags.some(tag => tag.includes("Mobile"))
      }
      if (activeCategory === "IoT Hardware") {
        return item.tags.some(tag => tag.includes("IoT") || tag.includes("Embedded"))
      }
      return true
    })
  }, [activeCategory])

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
    <div className="relative min-h-screen bg-white text-slate-900 overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-dot-pattern" dir={isRTL ? "rtl" : "ltr"}>

      {/* Background patterns */}
      <Particles className="absolute inset-0 z-0 opacity-40 pointer-events-none" quantity={60} staticity={50} />

      {/* Glow shapes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10 text-left">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
            {t("portfolio.badge" as any)}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
            {t("portfolio.titlePart1" as any)} <span className="text-gradient">{t("portfolio.titlePart2" as any)}</span>
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Explore our engineering showcases, technical prototypes, and layout wireframes designed for global digital operations.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap gap-3 justify-center mb-16 border-b border-slate-100 pb-8">
          {categories.map((cat) => {
            const Icon = cat.Icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${activeCategory === cat.id
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Behance-Style Staggered Portfolio Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
                  className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                >
                  {/* Photo Container */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                    <Image
                      src={item.gallery[0] || "/gallery/software-development/saas_dashboard_mockup.png"}
                      alt={item.title}
                      fill
                      sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />

                    {/* Floating Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-900 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-100/50 shadow-sm flex items-center gap-1">
                        {getProjectTypeIcon(item.projectType)}
                        <span>{item.projectType}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-7 flex flex-col justify-between flex-grow space-y-6">
                    <div className="space-y-4">
                      {/* Client details */}
                      <div className="flex justify-between items-center text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                        <span>{item.client}</span>
                        <span className="text-blue-600 bg-blue-50/70 px-2 py-0.5 rounded">
                          {item.industry}
                        </span>
                      </div>

                      <h3 className="font-display font-extrabold text-lg text-slate-950 leading-snug group-hover:text-blue-650 transition-colors duration-200">
                        {item.title}
                      </h3>

                      <p className="text-slate-500 text-xs leading-relaxed font-sans line-clamp-3">
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

                      {/* Problem & Solution block */}
                      <div className="pt-4 border-t border-slate-100 space-y-3">
                        <div className="space-y-1">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-red-500 block">
                            Challenge
                          </span>
                          <p className="text-slate-550 text-[11px] leading-relaxed font-sans line-clamp-2">
                            {item.challenge}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600 block">
                            Solution
                          </span>
                          <p className="text-slate-550 text-[11px] leading-relaxed font-sans line-clamp-2">
                            {item.development.split(".")[0]}.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-4">
                      {/* Metric achieved */}
                      <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl">
                        <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                          {item.metricLabel}
                        </span>
                        <span className="text-base font-extrabold text-emerald-600 font-display">
                          {item.metric}
                        </span>
                      </div>

                      {/* View Button */}
                      <Link href={`/case-studies/${item.id}`} className="block">
                        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                          <span>View Case Study</span>
                          <ArrowRight size={13} />
                        </Button>
                      </Link>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </div>
  )
}
