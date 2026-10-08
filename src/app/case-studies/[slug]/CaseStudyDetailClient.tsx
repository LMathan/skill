"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  ArrowLeft, CheckCircle2, ChevronRight, HelpCircle, 
  Search, BookOpen, Layers, Settings, Send,
  Cpu, Activity, Check, Heart, Shield, Compass
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CaseStudy } from "@/data/agencyData"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/context/LanguageContext"
import Particles from "@/components/magicui/particles"

interface Props {
  study: CaseStudy
}

export default function CaseStudyDetailClient({ study }: Props) {
  const { t, isRTL } = useLanguage()
  const [activeImageIdx, setActiveImageIdx] = useState(0)

  const steps = [
    { id: "problem", label: "Business Problem", icon: <HelpCircle size={16} />, content: study.challenge },
    { id: "research", label: "Research & Analysis", icon: <Search size={16} />, content: study.research },
    { id: "planning", label: "Planning & Architecture", icon: <Compass size={16} />, content: study.planning, sub: study.architecture },
    { id: "design", label: "UX/UI Design", icon: <BookOpen size={16} />, content: study.design },
    { id: "development", label: "Development & Testing", icon: <Settings size={16} />, content: study.development, sub: study.testing },
    { id: "deployment", label: "Deployment & CI/CD", icon: <Layers size={16} />, content: study.deployment }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
  }

  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-dot-pattern" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Background elements */}
      <Particles className="absolute inset-0 z-0 opacity-40 pointer-events-none" quantity={60} staticity={50} />
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10 text-left">
        
        {/* Back navigation */}
        <div className="mb-10">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={14} />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        {/* Case Study Overview Hero */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16"
        >
          {/* Hero Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
                {study.projectType}
              </span>
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {study.industry}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 leading-tight">
              {study.title}
            </h1>
            
            <p className="text-slate-550 text-sm leading-relaxed max-w-xl font-sans">
              {study.summary}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {study.techStack.map((tech) => (
                <span key={tech} className="text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Right Metrics Card */}
          <div className="lg:col-span-5">
            <Card className="bg-slate-900 text-white rounded-3xl p-8 border-none shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              <CardHeader className="p-0 pb-6 border-b border-white/10">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                  Target Outcome Metric
                </span>
                <CardTitle className="text-4xl font-extrabold text-blue-400 font-display mt-2">
                  {study.metric}
                </CardTitle>
                <p className="text-xs text-slate-350 font-bold uppercase tracking-wider mt-1">
                  {study.metricLabel}
                </p>
              </CardHeader>
              <CardContent className="p-0 pt-6 space-y-4">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">
                  Project Client Log
                </span>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-300">Client Partner</span>
                  <span className="text-white font-bold">{study.client}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold pt-1">
                  <span className="text-slate-300">Status</span>
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Production Ready
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Phase Breakdown */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Left Details Panel */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-2xl font-extrabold font-display text-slate-900 border-b border-slate-100 pb-4">
              Execution Walkthrough
            </h2>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              {steps.map((step) => (
                <motion.div 
                  key={step.id} 
                  variants={itemVariants}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 text-blue-650 rounded-xl">
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 font-display">
                      {step.label}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                    {step.content}
                  </p>

                  {step.sub && (
                    <div className="p-4 bg-slate-50 rounded-xl mt-3 text-xs text-slate-550 border border-slate-100 leading-relaxed font-sans">
                      <span className="font-extrabold uppercase text-[9px] text-slate-400 block mb-1">Architecture & Validation:</span>
                      {step.sub}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Sidebar: Outcomes & Gallery */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Business Outcomes & Client Benefits */}
            <Card className="bg-slate-50/50 border border-slate-200/80 rounded-3xl p-6 shadow-sm">
              <h3 className="text-base font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-emerald-500" size={18} />
                Client Benefits
              </h3>
              <ul className="space-y-3">
                {study.clientBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-655 font-semibold leading-relaxed">
                    <Check className="text-emerald-500 shrink-0 mt-0.5" size={14} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Screenshots Showcase Carousel */}
            <Card className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold font-display text-slate-900">
                Interface Gallery
              </h3>
              <div className="relative h-44 w-full overflow-hidden bg-slate-50 border border-slate-100 rounded-2xl">
                <Image
                  src={study.gallery[activeImageIdx] || "/gallery/software-development/saas_dashboard_mockup.png"}
                  alt={`${study.title} screen`}
                  fill
                  sizes="(max-w-320px) 100vw, 320px"
                  className="object-cover object-top"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {study.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative h-16 rounded-xl overflow-hidden border cursor-pointer transition-all ${
                      activeImageIdx === idx ? "border-blue-600 ring-2 ring-blue-500/25" : "border-slate-200"
                    }`}
                  >
                    <Image
                      src={img}
                      alt="Thumbnail"
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </Card>

          </div>

        </section>

        {/* Bottom Conversion Call To Action */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center bg-slate-50/50 border border-slate-200/80 rounded-3xl p-10 max-w-4xl mx-auto mb-10"
        >
          <div className="space-y-4 max-w-xl mx-auto">
            <h3 className="text-xl font-bold font-display text-slate-950">
              Need a customized engineering architecture?
            </h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Consult with our solution design architects to outline schemas, check data pipelines, or audit hardware integrations.
            </p>
            <div className="pt-4 flex flex-wrap gap-3 justify-center">
              <Link href="/contact">
                <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 px-6 rounded-xl cursor-pointer">
                  Request Solution Consult
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button variant="outline" className="font-bold border-slate-200 hover:bg-slate-100 text-slate-700 text-xs py-3 px-6 rounded-xl cursor-pointer">
                  Back to Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  )
}
