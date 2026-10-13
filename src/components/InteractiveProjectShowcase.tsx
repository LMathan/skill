"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cpu, Smartphone, Activity, Brain, Home, ShieldAlert, ArrowRight, ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
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
    mobileImage: "/gallery/web-development/law-firm_mobile.jpeg",
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
  const [isPaused, setIsPaused] = useState(false)

  const filteredProjects = ourWorkProjects.filter(project => {
    if (activeCategory === "all") return true
    return project.category === activeCategory
  })

  // Reset active index/progress when category or pause state changes.
  // Done during render (React's documented "adjusting state on prop change"
  // pattern) instead of in an effect, avoiding cascading renders.
  const [prevCategory, setPrevCategory] = useState(activeCategory)
  const [prevPaused, setPrevPaused] = useState(isPaused)
  if (prevCategory !== activeCategory) {
    setPrevCategory(activeCategory)
    setActiveIndex(0)
    setProgress(0)
  }
  if (prevPaused !== isPaused) {
    setPrevPaused(isPaused)
    setProgress(0)
  }

  // Fluid Auto-cycling timer with smooth progress bar
  useEffect(() => {
    if (isPaused || filteredProjects.length === 0) return

    const intervalTick = 40
    const totalDuration = 4500 // 4.5 seconds per project
    const increment = (intervalTick * 100) / totalDuration

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setActiveIndex(prevIdx => (prevIdx + 1) % filteredProjects.length)
          return 0
        }
        return prev + increment
      })
    }, intervalTick)

    return () => clearInterval(interval)
  }, [activeIndex, filteredProjects.length, isPaused])

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % filteredProjects.length)
    setProgress(0)
  }

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + filteredProjects.length) % filteredProjects.length)
    setProgress(0)
  }

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0]

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full max-w-6xl mx-auto px-4 py-8 font-sans space-y-6"
    >
      {/* Header Controls & Counter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest">
            FEATURED ENGINEERING SHOWCASE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-medium shadow-sm">
            <span>PROJECT {activeIndex + 1} OF {filteredProjects.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-2xs"
              aria-label="Previous project"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-2xs"
              aria-label="Next project"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2.5 justify-center items-center">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                isActive ? "text-white" : "text-slate-500 hover:text-slate-800 bg-white/60 hover:bg-white border border-slate-200/60 shadow-xs"
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

      {/* Horizontal Stepper Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2.5 sm:grid sm:grid-cols-4 lg:grid-cols-8 border-b border-slate-200/60 pb-3">
        {filteredProjects.map((p, idx) => {
          const isActive = activeIndex === idx
          return (
            <button
              key={p.title}
              onClick={() => {
                setActiveIndex(idx)
                setProgress(0)
              }}
              className="text-left group flex flex-col justify-between h-13 shrink-0 min-w-[125px] sm:min-w-0 relative outline-none select-none cursor-pointer"
            >
              <div className="space-y-0.5">
                <span className={`text-[9px] font-extrabold block tracking-wider ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`}>
                  PROJECT {p.number}
                </span>
                <span className={`block text-xs font-bold truncate leading-tight ${isActive ? "text-slate-900" : "text-slate-500 group-hover:text-slate-700"}`}>
                  {p.title}
                </span>
              </div>

              {/* Progress Bar Indicator */}
              <div className="w-full h-[3px] bg-slate-200/60 rounded-full overflow-hidden mt-1.5">
                {isActive ? (
                  <div 
                    className="h-full bg-blue-600 transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                ) : (
                  <div className="h-full bg-transparent group-hover:bg-slate-300 w-0 group-hover:w-full transition-all duration-300" />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Main Frame Viewport */}
      <div className="relative w-full min-h-[440px] flex items-center justify-center py-6 overflow-hidden rounded-[32px] bg-slate-50/50 border border-slate-200/80">
        
        {/* Blueprint Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_80%,transparent_100%)] opacity-70" />
        
        {activeProject && (
          <div className={`absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br ${activeProject.glowColor} rounded-full blur-[100px] opacity-70 transition-all duration-700 -z-10`} />
        )}

        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject.title}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 items-center justify-between text-left px-4 sm:px-6 lg:px-10"
            >
              
              {/* Left Column: Project Details */}
              <div className="w-full lg:w-5/12 space-y-5 sm:space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-mono font-bold tracking-wider uppercase border border-blue-100">
                    SPECIFICATION {activeProject.number}
                  </span>
                  <div className={`w-8 h-8 rounded-xl ${activeProject.iconBg} ${activeProject.iconColor} flex items-center justify-center shadow-xs`}>
                    <activeProject.icon size={16} />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                    {activeProject.title}
                  </h3>
                  <p className="mt-2.5 text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeProject.technologies.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-mono font-semibold shadow-2xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-3">
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{activeProject.metricLabel}</div>
                      <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 mt-0.5">{activeProject.metric}</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>

                  <Link
                    href={activeProject.url}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Right Column: Interactive Browser Frame Mockup */}
              <div className="w-full lg:w-7/12 relative">
                <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden group">
                  
                  {/* Top Browser Bar */}
                  <div className="px-4 py-3 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="px-3 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-500 truncate max-w-[240px]">
                      skillforgetechnology.app/demo
                    </div>
                    <ExternalLink size={12} className="text-slate-400" />
                  </div>

                  {/* Main Image Container with Next.js Image sizes prop fix */}
                  <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  </div>
                </div>

                {/* Overlapping Telemetry Badge - hidden on mobile to avoid overflow */}
                <div className="hidden sm:flex absolute -top-4 right-6 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-lg items-center gap-2 text-[11px] font-mono font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{activeProject.telemetryText}</span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  )
}
