"use client"

import React, { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Cpu, Layers, Brain, FileText, Smartphone, GraduationCap, Check } from "lucide-react"
import { servicesData } from "@/data/siteData"
import { motion } from "framer-motion"

export default function ServicesContent() {
  useEffect(() => {
    const scrollToHash = () => {
      if (window.location.hash) {
        const element = document.getElementById(window.location.hash.substring(1))
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }, 150)
        }
      }
    }

    // Scroll on mount
    scrollToHash()

    // Scroll on hash change (e.g. clicking links while already on this page)
    window.addEventListener("hashchange", scrollToHash)
    return () => {
      window.removeEventListener("hashchange", scrollToHash)
    }
  }, [])

  const iconComponents: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="text-brand-cyan" size={34} />,
    Layers: <Layers className="text-brand-blue" size={34} />,
    Brain: <Brain className="text-brand-indigo" size={34} />,
    FileText: <FileText className="text-purple-500" size={34} />,
    Smartphone: <Smartphone className="text-pink-500" size={34} />,
    GraduationCap: <GraduationCap className="text-emerald-500" size={34} />
  }

  return (
    <div className="space-y-16">
      {servicesData.map((service) => (
        <motion.div 
          key={service.id} 
          id={service.id}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="scroll-mt-24 p-8 sm:p-12 rounded-3xl glass-panel relative overflow-hidden transition-all hover:border-brand-cyan/20 duration-300"
        >
          {/* Backglow overlay */}
          <div className="absolute -right-24 -top-24 w-72 h-72 bg-gradient-to-br from-brand-cyan/10 to-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl w-fit shrink-0">
                  {iconComponents[service.icon]}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display text-slate-900 dark:text-white">
                  {service.title}
                </h2>
              </div>

              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                {service.longDesc}
              </p>
            </div>

            {/* Right Feature list */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200/20 dark:border-slate-800/50 space-y-4 text-left">
              <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Core Modules & Parameters
              </h3>
              <ul className="space-y-3">
                {service.bulletPoints.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm">
                    <Check className="text-brand-cyan shrink-0 mt-0.5" size={16} />
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </motion.div>
      ))}
    </div>
  )
}
