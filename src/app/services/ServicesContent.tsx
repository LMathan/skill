"use client"

import React from "react"
import Link from "next/link"
import { 
  Cpu, Globe, Smartphone, Brain, Cloud, TrendingUp, 
  Code, Layers, ShieldAlert, Layout, Activity, Home, Check, ArrowRight
} from "lucide-react"
import { agencyServices } from "@/data/agencyData"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"

export default function ServicesContent() {
  const { t } = useLanguage()
  
  const iconComponents: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="text-blue-650" size={32} />,
    Globe: <Globe className="text-blue-600" size={32} />,
    Smartphone: <Smartphone className="text-purple-650" size={32} />,
    Brain: <Brain className="text-pink-600" size={32} />,
    Cloud: <Cloud className="text-sky-600" size={32} />,
    TrendingUp: <TrendingUp className="text-emerald-600" size={32} />,
    Code: <Code className="text-indigo-600" size={32} />,
    Layers: <Layers className="text-blue-500" size={32} />,
    ShieldAlert: <ShieldAlert className="text-blue-600" size={32} />,
    Layout: <Layout className="text-violet-600" size={32} />,
    Activity: <Activity className="text-red-500" size={32} />,
    Home: <Home className="text-orange-500" size={32} />
  }

  return (
    <div className="space-y-12">
      {agencyServices.map((service) => (
        <motion.div 
          key={service.slug} 
          id={service.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-10 rounded-3xl border border-slate-200/80 bg-white relative overflow-hidden shadow-sm hover:shadow-md transition-shadow group text-left"
        >
          {/* Subtle backglow */}
          <div className="absolute -right-24 -top-24 w-72 h-72 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl w-fit shrink-0">
                  {iconComponents[service.icon] || <Cpu size={32} />}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-display text-slate-900">
                    {t(`services.${service.slug}.title` as any) || service.title}
                  </h2>
                  <span className="text-xs font-semibold text-slate-400 block mt-0.5">{service.tagline}</span>
                </div>
              </div>

              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                {t(`services.${service.slug}.desc` as any) || service.longDesc}
              </p>

              <div className="pt-2">
                <Link href={`/services/${service.slug}`}>
                  <button className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-650 hover:underline cursor-pointer">
                    <span>{t("common.learnMore")} &rarr;</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Feature list */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">
                Sub-Services & Focus Stacks
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.subServices.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-700 font-semibold leading-tight">
                    <Check className="text-blue-600 shrink-0 mt-0.5" size={13} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-slate-200/60 flex flex-wrap gap-1.5 items-center">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mr-1">Stacks:</span>
                {service.techStack.map((tech) => (
                  <span key={tech} className="text-[9px] font-extrabold text-blue-600 bg-blue-50/50 rounded px-2 py-0.5">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      ))}
    </div>
  )
}
