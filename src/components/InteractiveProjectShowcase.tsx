"use client"

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Smartphone, Globe, Activity, Brain, Home, ShieldAlert, ArrowRight, Sparkles, ExternalLink, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Project {
  title: string
  description: string
  technologies: string[]
  image: string
  mobileImage: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  iconBg: string
  iconColor: string
  category: string
  metric: string
  metricLabel: string
  url: string
  accentColor: string
  glowColor: string
  number: string
  telemetryText: string
}

const ourWorkProjects: Project[] = [
  {
    number: "01",
    title: "SaaS Analytics Platform",
    description: "A comprehensive analytics dashboard for tracking business performance in real-time, designed to optimize data workflows and scale transactions.",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    image: "/gallery/software-development/saas_dashboard_mockup.png",
    mobileImage: "/gallery/software-development/saas_analytics_mobile.png",
    icon: Cpu,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    category: "saas",
    metric: "+140%",
    metricLabel: "Load Speed Boost",
    url: "/services/saas-development",
    accentColor: "from-blue-500/10 to-indigo-500/10",
    glowColor: "from-blue-500/20 to-indigo-500/20",
    telemetryText: "Database clusters running 99.98% uptime"
  },
  {
    number: "02",
    title: "Mobile Banking App",
    description: "Secure, fast, and modern banking experience designed for iOS and Android, featuring biometric authentication and sub-second payment transfers.",
    technologies: ["Flutter", "Firebase", "Stripe SDK"],
    image: "/gallery/mobile-development/mobile_app_mockup.png",
    mobileImage: "/gallery/mobile-development/mobile_app_mockup.png",
    icon: Smartphone,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    category: "mobile",
    metric: "99.9%",
    metricLabel: "Sync Success Rate",
    url: "/services/mobile-app-development",
    accentColor: "from-purple-500/10 to-pink-500/10",
    glowColor: "from-purple-500/20 to-pink-500/20",
    telemetryText: "Secure ISO-27001 token gateways online"
  },
  {
    number: "03",
    title: "Apex Law Firm Portal",
    description: "Prestigious legal service website showcasing lawyer directories, online case consultation planners, and dynamic client intake document managers.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/gallery/web-development/law-firm-prototype.png",
    mobileImage: "/gallery/web-development/law-firm_mobile.png",
    icon: ShieldAlert,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    category: "web",
    metric: "+60%",
    metricLabel: "Consultation Bookings",
    url: "/services/web-development",
    accentColor: "from-indigo-500/10 to-blue-500/10",
    glowColor: "from-indigo-500/20 to-blue-500/20",
    telemetryText: "RAG search parsing 1.4k legal documents"
  },
  {
    number: "04",
    title: "Healthcare Management ERP",
    description: "A smart healthcare platform to manage patients, medical files, appointment shifts, and clinical laboratory records inside a unified portal.",
    technologies: ["React", "Laravel", "MySQL"],
    image: "/gallery/enterprise-development/enterprise_erp_mockup.png",
    mobileImage: "/gallery/enterprise-development/healthcare_erp_mobile.png",
    icon: Activity,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    category: "saas",
    metric: "98.7%",
    metricLabel: "On-time Dispatch",
    url: "/services/enterprise-development",
    accentColor: "from-emerald-500/10 to-teal-500/10",
    glowColor: "from-emerald-500/20 to-teal-500/20",
    telemetryText: "HIPAA Compliant node arrays active"
  },
  {
    number: "05",
    title: "AI Chat Assistant Studio",
    description: "Intelligent AI support assistant with natural conversational flows, semantic search vector stores, and custom PDF knowledge file parsing.",
    technologies: ["Python", "OpenAI", "LangChain"],
    image: "/gallery/ai-solutions/ai_agent_mockup.jpeg",
    mobileImage: "/gallery/ai-solutions/ai_agent_mobile.png",
    icon: Brain,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
    category: "ai",
    metric: "99.4%",
    metricLabel: "Query Accuracy",
    url: "/services/ai-solutions",
    accentColor: "from-pink-500/10 to-rose-500/10",
    glowColor: "from-pink-500/20 to-rose-500/20",
    telemetryText: "RAG agent response latency 240ms"
  },
  {
    number: "06",
    title: "Vertex Roofing Estimate Hub",
    description: "High-converting contractor showcase landing page integrating a custom automated instant estimation calculations engine.",
    technologies: ["Next.js", "React Form", "Tailwind CSS"],
    image: "/gallery/web-development/roofing-contractor-prototype.png",
    mobileImage: "/gallery/web-development/roofing_mobile.png",
    icon: Home,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    category: "web",
    metric: "3x",
    metricLabel: "Leads Increase",
    url: "/services/web-development",
    accentColor: "from-amber-500/10 to-yellow-500/10",
    glowColor: "from-amber-500/20 to-yellow-500/20",
    telemetryText: "Estimation engine API load speed 45ms"
  },
  {
    number: "07",
    title: "IoT Drone Telemetry Hub",
    description: "Real-time tracking and monitoring dashboard for hardware devices, quadcopter flight sensors, and telemetry data relays.",
    technologies: ["Vue.js", "Node.js", "InfluxDB"],
    image: "/gallery/iot/quadcopter-drone-uav-outdoor-flight-test.jpeg",
    mobileImage: "/gallery/iot/telemetry_mobile.png",
    icon: Cpu,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    category: "iot",
    metric: "12ms",
    metricLabel: "Telemetry Latency",
    url: "/services/iot-embedded-systems",
    accentColor: "from-cyan-500/10 to-teal-500/10",
    glowColor: "from-cyan-500/20 to-teal-500/20",
    telemetryText: "F450 throttle sensor latency 4ms"
  },
  {
    number: "08",
    title: "AquaFlow Plumbing Dispatcher",
    description: "Sleek plumbing service dispatcher and scheduling system, featuring live technician job assignments and SMS alert relays.",
    technologies: ["React", "Tailwind CSS", "Real-Time DB"],
    image: "/gallery/web-development/plumbing-services-prototype.png",
    mobileImage: "/gallery/web-development/plumbing_mobile.png",
    icon: Activity,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    category: "web",
    metric: "24m",
    metricLabel: "Emergency Response",
    url: "/services/web-development",
    accentColor: "from-blue-500/10 to-sky-500/10",
    glowColor: "from-blue-500/20 to-sky-500/20",
    telemetryText: "Technician SMS dispatch payload sent"
  }
]

const categories = [
  { id: "all", label: "All Projects" },
  { id: "saas", label: "SaaS & Enterprise" },
  { id: "ai", label: "Artificial Intelligence" },
  { id: "mobile", label: "Mobile Apps" },
  { id: "web", label: "Web Prototypes" },
  { id: "iot", label: "IoT & R&D" }
]

export default function InteractiveProjectShowcase() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [cycleTime, setCycleTime] = useState(3000) // Default 3 seconds

  const filteredProjects = ourWorkProjects.filter(project => {
    if (activeCategory === "all") return true
    return project.category === activeCategory
  })

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(0)
    setProgress(0)
    setCycleTime(3000)
  }, [activeCategory])

  // Progress timer for auto-cycling
  useEffect(() => {
    setProgress(0)
    const intervalTick = 50
    const increment = (intervalTick * 100) / cycleTime

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setActiveIndex(prevIndex => {
            // Revert back to fast 3s cycle after an automatic slide movement
            setCycleTime(3000)
            return (prevIndex + 1) % filteredProjects.length
          })
          return 0
        }
        return prev + increment
      })
    }, intervalTick)

    return () => clearInterval(interval)
  }, [activeIndex, filteredProjects.length, cycleTime])

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0]

  return (
    <div className="space-y-12 max-w-6xl mx-auto font-sans">
      
      {/* Category Pills with glowing animations */}
      <div className="flex flex-wrap gap-2.5 justify-center items-center">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                isActive ? "text-white" : "text-slate-500 hover:text-slate-800 bg-white/40 hover:bg-white/80 border border-slate-200/50 shadow-sm"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-blue-600 rounded-xl -z-10 shadow-lg shadow-blue-500/20"
                />
              )}
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* 
        Horizontal Stepper Timeline:
        Lists all the projects inside the current category with expanding progress bar metrics.
      */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 border-b border-slate-200/40 pb-6">
        {filteredProjects.map((p, idx) => {
          const isActive = activeIndex === idx
          return (
            <button
              key={p.title}
              onClick={() => {
                setActiveIndex(idx)
                setProgress(0)
                setCycleTime(7000) // 7s delay on manual selection click
              }}
              className="text-left group flex flex-col justify-between h-14 relative outline-none select-none cursor-pointer"
            >
              <div className="space-y-1">
                <span className={`text-[9px] font-extrabold block tracking-wider ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                  PROJECT {p.number}
                </span>
                <span className={`block text-xs font-bold truncate leading-tight ${isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"}`}>
                  {p.title}
                </span>
              </div>

              {/* Progress Bar Indicator */}
              <div className="w-full h-[2.5px] bg-slate-200/50 rounded-full overflow-hidden mt-3">
                {isActive ? (
                  <div 
                    className="h-full bg-blue-600 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                ) : (
                  <div className="h-full bg-transparent group-hover:bg-slate-300 w-0 group-hover:w-full transition-all duration-350" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* 
        Main Frame Viewport:
        Frameless architecture containing a technical blueprint grid background, glowing color meshes, 
        and overlapping 3D perspective browser/mobile mockups floating freely.
      */}
      <div className="relative w-full min-h-[500px] flex items-center justify-center py-8 overflow-hidden rounded-[40px]">
        
        {/* Technical Blueprint Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] opacity-80" />
        
        {/* Dynamic color glow overlay */}
        {activeProject && (
          <div className={`absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br ${activeProject.glowColor} rounded-full blur-[100px] opacity-70 transition-all duration-700 -z-10`} />
        )}

        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col lg:flex-row gap-12 items-center justify-between text-left px-4 lg:px-6"
            >
              
              {/* Left Side: Editorial Typography & Tech Specs */}
              <div className="w-full lg:w-[45%] space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-extrabold text-blue-600 font-mono tracking-wider bg-blue-50/70 border border-blue-100 px-3 py-1 rounded-lg">
                      SPECIFICATION 0{activeProject.number}
                    </span>
                    <div className={`p-1.5 rounded-lg ${activeProject.iconBg} ${activeProject.iconColor} border border-slate-200/40 shadow-sm`}>
                      {React.createElement(activeProject.icon, { size: 14 })}
                    </div>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-none">
                    {activeProject.title}
                  </h3>
                </div>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium font-sans">
                  {activeProject.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeProject.technologies.map(tech => (
                    <span
                      key={tech}
                      className="text-[9px] bg-white border border-slate-200/80 text-slate-500 px-2.5 py-1 rounded-lg font-mono font-bold shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics highlights and dynamic details */}
                <div className="flex items-center gap-6 pt-6 border-t border-slate-200/40 mt-8 justify-between lg:justify-start">
                  <div className="bg-white/90 border border-slate-200/80 p-3.5 rounded-2xl flex items-center gap-4 shadow-sm w-fit">
                    <div>
                      <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block leading-none">{activeProject.metricLabel}</span>
                      <span className="block text-sm font-extrabold text-slate-900 font-display mt-1">{activeProject.metric}</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  <Link href={activeProject.url}>
                    <button className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all hover:scale-[1.03] shadow-md shadow-slate-900/10 cursor-pointer">
                      <span>View Case Study</span>
                      <ArrowUpRight size={14} />
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right Side: Mockups Floating in 3D Perspective Space */}
              <div className="w-full lg:w-[50%] flex items-center justify-center relative min-h-[300px] sm:min-h-[380px]">
                
                {/* Floating active status board */}
                <div className="absolute -top-4 left-0 bg-white/95 border border-slate-200/80 p-4 rounded-2xl shadow-xl flex flex-col gap-1.5 z-20">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Active Operations</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[9px] font-extrabold text-slate-900 font-mono">{activeProject.telemetryText}</span>
                  </div>
                </div>

                {/* Primary Browser Mockup (With custom rotation) */}
                <div className="relative w-[90%] aspect-[16/10] bg-white border border-slate-250/90 shadow-[0_24px_50px_rgba(0,0,0,0.06)] rounded-2xl overflow-hidden z-10 -rotate-1 hover:rotate-0 transition-transform duration-500">
                  {/* Browser top-bar */}
                  <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between shrink-0">
                    <div className="flex gap-1.5 shrink-0">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    <div className="bg-slate-100 border border-slate-200/50 px-5 py-0.5 rounded-md text-[8px] text-slate-400 font-bold uppercase tracking-widest font-mono truncate max-w-[65%]">
                      skillforgetechnology.app/demo
                    </div>
                    <ExternalLink size={8} className="text-slate-350 shrink-0" />
                  </div>

                  {/* Browser content */}
                  <div className="relative w-full h-[calc(100%-32px)] bg-slate-50 overflow-hidden">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      sizes="40vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Secondary Smartphone Mockup (Overlaps Browser Frame) */}
                {activeProject.category !== "iot" && (
                  <div className="absolute bottom-[-36px] right-[-16px] w-[35%] aspect-[3/4] z-20 hidden sm:block rounded-[24px] border border-slate-200/70 bg-white p-1.5 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.18)] overflow-hidden hover:scale-[1.03] transition-all duration-500">
                    <div className="relative w-full h-full rounded-[18px] overflow-hidden bg-slate-50">
                      <Image
                        src={activeProject.mobileImage}
                        alt={`${activeProject.title} mobile view`}
                        fill
                        sizes="20vw"
                        className="object-cover object-center"
                        priority
                      />
                    </div>
                  </div>
                )}

                {/* Interactive tele-widget */}
                <div className="absolute bottom-4 left-4 z-20 bg-white border border-slate-200/80 p-3 rounded-2xl shadow-xl flex items-center gap-3">
                  <Sparkles size={14} className="text-blue-600 animate-pulse" />
                  <span className="text-[9px] font-extrabold text-slate-900 font-display uppercase tracking-widest">
                    Interactive Showcase Active
                  </span>
                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
