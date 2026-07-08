"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight, CheckCircle2, Globe, Cpu, Brain,
  Smartphone, Cloud, Code, Layers, ShieldAlert,
  TrendingUp, Layout, Activity, Home, Sparkles, Terminal, Database, Server,
  HelpCircle, ChevronDown, MessageSquare, Briefcase, HeartHandshake, Users, Award
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { Button } from "@/components/ui/button"
import { agencyServices, agencyCaseStudies, agencyIndustries } from "@/data/agencyData"
import InteractiveProjectShowcase from "@/components/InteractiveProjectShowcase"
import PrototypeLabsShowroom from "@/components/PrototypeLabsShowroom"
import AnimatedBackground from "@/components/AnimatedBackground"

export function HomeContent() {
  const { t, locale, isRTL } = useLanguage()
  const [activeStackTab, setActiveStackTab] = useState<string>("frontend")
  const [homeSliderPos, setHomeSliderPos] = useState(50)
  const homeSliderRef = React.useRef<HTMLDivElement>(null)

  const handleHomeMouseMove = (e: React.MouseEvent) => {
    if (!homeSliderRef.current) return
    const rect = homeSliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setHomeSliderPos(position)
  }

  const handleHomeTouchMove = (e: React.TouchEvent) => {
    if (!homeSliderRef.current) return
    const rect = homeSliderRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setHomeSliderPos(position)
  }


  // Interactive capabilities simulator states
  const [activeServiceTab, setActiveServiceTab] = useState<string>("software-development")

  const [showDock, setShowDock] = useState(false)
  const [readProgress, setReadProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setShowDock(window.scrollY > 400)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setReadProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDockNavigation = (tabId: string) => {
    setActiveServiceTab(tabId)
    const element = document.getElementById("capabilities-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  const [activeMobileAppScreen, setActiveMobileAppScreen] = useState<"fintech" | "healthcare" | "logistics">("fintech")
  const [activeEnterpriseTable, setActiveEnterpriseTable] = useState<"users" | "orders" | "logs">("users")
  const [aiPromptsList, setAiPromptsList] = useState<string[]>([
    "Process Q2 invoice PDFs and check tax values.",
    "Initiating OCR scan over 14 documents... Extracted $28,450.00 total. Cross-referenced with Ledger: Status OK."
  ])
  const [aiTyping, setAiTyping] = useState<boolean>(false)
  const [cloudNodeStatus, setCloudNodeStatus] = useState<"idle" | "building" | "testing" | "deployed">("idle")
  const [cloudDeployProgress, setCloudDeployProgress] = useState<number>(0)
  const [iotRelayOn, setIotRelayOn] = useState<boolean>(true)
  const [iotFanOn, setIotFanOn] = useState<boolean>(false)

  const aiSimResponses: Record<string, string> = {
    "Cross-reference ledger with invoice PDF values.": "Executing RAG matching... Found mismatch on Invoice #8409. Ledger: $1,250.00. PDF Tax total: $1,350.00 (Variance: +$100.00). Alert flag emitted.",
    "Extract table nodes from standard text block.": "Parsing JSON blocks... Found columns: ['customer_id', 'renew_date', 'plan']. Records output: 1. ID: 894, Plan: 'Enterprise Enterprise', Renew: '2026-11-20'.",
    "Identify outliers in billing telemetry logs.": "Running anomaly detection model... Identified spike of 450% normal throughput on Node-04 at 02:14:05 UTC. Correlates with bulk sync task. Safe status.",
    "Initiate database performance cluster check.": "Cluster health: OK. Primary latency: 4ms. Replicas synchronization: 100%. Cache hit ratio: 94.2%. Autoclean task completed successfully."
  }

  const addAiPromptMessage = (prompt: string) => {
    if (aiTyping) return
    setAiPromptsList(prev => [...prev, prompt])
    setAiTyping(true)
    setTimeout(() => {
      const response = aiSimResponses[prompt] || "Request received. Processing telemetry nodes... Execution succeeded."
      setAiPromptsList(prev => [...prev, response])
      setAiTyping(false)
    }, 1000)
  }

  const startCloudDeployment = () => {
    if (cloudNodeStatus !== "idle") return
    setCloudNodeStatus("building")
    setCloudDeployProgress(15)

    setTimeout(() => {
      setCloudDeployProgress(55)
      setCloudNodeStatus("testing")
    }, 1000)

    setTimeout(() => {
      setCloudDeployProgress(85)
    }, 2000)

    setTimeout(() => {
      setCloudDeployProgress(100)
      setCloudNodeStatus("deployed")
    }, 3000)
  }

  const resetCloudDeployment = () => {
    setCloudNodeStatus("idle")
    setCloudDeployProgress(0)
  }

  // Tech stack definition
  const techStacks: Record<string, { name: string; tools: string[] }[]> = {
    frontend: [
      { name: "Frameworks & Library Core", tools: ["Next.js 16", "React 19", "Vue.js", "Blazor"] },
      { name: "Styling & Data Logic", tools: ["TypeScript", "Tailwind CSS v4", "Redux Toolkit", "GraphQL"] }
    ],
    backend: [
      { name: "Server Runtimes & Engines", tools: ["Node.js", "Go (Golang)", "Python", "C# (.NET Core 9)", "Laravel PHP"] },
      { name: "APIs, Streams & Queues", tools: ["GraphQL", "gRPC Protocol", "Redis Cache", "RabbitMQ", "REST APIs"] }
    ],
    mobile: [
      { name: "Cross-Platform Frameworks", tools: ["Flutter", "React Native", "SwiftUI", "Kotlin Compose"] },
      { name: "Storage & State Channels", tools: ["SQLite", "Realm DB", "Firebase Streams", "GraphQL Client"] }
    ],
    cloud: [
      { name: "Global Cloud Ecosystems", tools: ["Amazon Web Services", "Microsoft Azure", "Google Cloud Platform"] },
      { name: "Infrastructure as Code (IaC)", tools: ["Docker", "Kubernetes (K8s)", "Terraform", "GitHub Actions CI"] }
    ],
    ai: [
      { name: "AI Model Frameworks", tools: ["Python", "PyTorch", "TensorFlow", "scikit-learn"] },
      { name: "Orchestration & Tooling", tools: ["LangChain", "OpenAI API", "Hugging Face Models", "OpenCV", "YOLO v8"] }
    ],
    embedded: [
      { name: "Edge Microcontrollers", tools: ["ESP32 DevKit", "STM32 ARM Core", "Raspberry Pi 5", "PIC Microchips"] },
      { name: "Real-Time Firmware", tools: ["Embedded C/C++", "MicroPython", "Zephyr RTOS", "FreeRTOS Layers"] }
    ]
  }


  // Technology Stack Logotypes for scrolling marquee
  const techStackLogos = [
    {
      name: "React",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    {
      name: "Next.js",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
    },
    {
      name: "TypeScript",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    },
    {
      name: "Node.js",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    {
      name: "Flutter",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"
    },
    {
      name: "Python",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
    },
    {
      name: "Amazon Web Services",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
    },
    {
      name: "Docker",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
    },
    {
      name: "PostgreSQL",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
    },
    {
      name: "Figma",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"
    },
    {
      name: "Tailwind CSS",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
    }
  ]

  const serviceIconMap: Record<string, any> = {
    "software-development": Cpu,
    "enterprise-development": Layers,
    "saas-development": Cpu,
    "web-development": Globe,
    "mobile-development": Smartphone,
    "flutter-development": Smartphone,
    "react-development": Code,
    "wordpress-development": Code,
    "php-development": Layers,
    "dotnet-development": ShieldAlert,
    "ui-ux-design": Layout,
    "ai-solutions": Brain,
    "cloud-devops": Cloud,
    "seo-marketing": TrendingUp,
    "iot-embedded": Activity,
    "real-estate-creative": Home
  }

  return (
    <div className="relative bg-transparent pt-24 overflow-x-clip selection:bg-blue-500/20 text-slate-800 bg-dot-pattern noise-bg" dir={isRTL ? "rtl" : "ltr"}>

      {/* Animated Floating Gradient Blobs (Mesh overlay) */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10 ambient-blob-slow" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-[140px] pointer-events-none -z-10 ambient-blob-medium" />
      <div className="absolute bottom-1/3 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10 ambient-blob-slow" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text details */}
          <div className="lg:col-span-6 space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-slate-50 text-[9px] font-extrabold text-slate-650 uppercase tracking-widest"
            >
              <Sparkles size={11} className="text-blue-600 animate-pulse" />
              <span>{t("hero.badge")}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-slate-900 leading-[1.08] pb-1"
            >
              {locale === "en" ? (
                <>
                  We engineer premium <br />
                  <span className="text-gradient">digital products for global enterprises.</span>
                </>
              ) : t("hero.title")}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-xl font-sans"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="gradient" size="lg" className="w-full sm:w-auto font-bold flex items-center justify-center gap-2 text-xs cursor-pointer shadow-sm shadow-blue-500/10">
                  <span>{t("hero.ctaPrimary")}</span>
                  <ArrowRight size={14} />
                </Button>
              </Link>
              <Link href="/case-studies" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold border-slate-200/80 hover:bg-slate-50 text-slate-700 text-xs cursor-pointer bg-white">
                  {t("hero.ctaSecondary")}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right Floating Cinematic Digital Ecosystem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative min-h-[460px] flex justify-center items-center py-10"
          >
            {/* Ambient background meshes and grid patterns */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-tr from-cyan-400/20 to-blue-500/20 rounded-full blur-2xl pointer-events-none -z-10 animate-pulse" />

            {/* Simulated Vector Grid Blueprint */}
            <svg className="absolute w-[120%] h-[120%] text-blue-600/[0.03] pointer-events-none -z-10 animate-spin-slow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="0.05" />
              <path d="M50 5 L50 95 M5 50 L95 50 M15 15 L85 85 M85 15 L15 85" stroke="currentColor" strokeWidth="0.05" />
            </svg>

            {/* Base Element: Browser frame (Telemetry dashboard) */}
            <div className="relative border border-slate-200/80 bg-white/95 shadow-2xl rounded-2xl overflow-hidden glass-card-premium float-ecosystem-1 w-full max-w-[420px] z-10 noise-bg select-none">
              {/* Browser bar */}
              <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                  analytics_telemetry_v1.app
                </div>
                <div className="w-6" />
              </div>

              {/* Dashboard Content */}
              <div className="p-5 space-y-5 text-left font-sans">
                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl shadow-inner space-y-0.5">
                    <span className="text-[7px] font-extrabold text-slate-400 uppercase tracking-wider block">Deploys</span>
                    <span className="block text-xs font-extrabold text-slate-900 font-display">61/61</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl shadow-inner space-y-0.5">
                    <span className="text-[7px] font-extrabold text-slate-400 uppercase tracking-wider block">Uptime</span>
                    <span className="block text-xs font-extrabold text-emerald-600 font-display">99.98%</span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl shadow-inner space-y-0.5">
                    <span className="text-[7px] font-extrabold text-slate-400 uppercase tracking-wider block">Latency</span>
                    <span className="block text-xs font-extrabold text-blue-600 font-display">14ms</span>
                  </div>
                </div>

                {/* Line graph mockup */}
                <div className="p-3 bg-slate-50 border border-slate-200/40 rounded-xl shadow-inner space-y-2">
                  <div className="flex justify-between items-center text-[7px] font-extrabold text-slate-400 uppercase tracking-wider">
                    <span>Performance Metrics</span>
                    <span className="text-blue-650 bg-blue-50 px-2 py-0.5 rounded">Telemetry Active</span>
                  </div>
                  <div className="h-20 flex items-end gap-1.5 border-b border-l border-slate-200/80 p-1.5">
                    {[35, 65, 45, 80, 55, 95, 75, 90, 60, 85].map((h, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.05 + 0.4, ease: "easeOut" }}
                        className="w-full bg-gradient-to-t from-blue-600 to-indigo-500 rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>

                {/* System status logs */}
                <div className="flex items-center justify-between text-[8px] text-slate-400 font-bold border-t border-slate-200/60 pt-3">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span>All compilations static verified</span>
                  </div>
                  <span className="font-mono text-[7px]">SkillForge Cloud Node</span>
                </div>
              </div>
            </div>

            {/* Overlap Element 1: Dark Mode Code Terminal (Bottom Right) */}
            <div className="absolute -bottom-8 -right-4 w-56 bg-slate-950/95 border border-slate-800 rounded-2xl p-4 shadow-2xl float-ecosystem-3 hidden md:block text-[8px] font-mono text-cyan-400 select-none z-20">
              <div className="flex justify-between items-center pb-2 border-b border-slate-900 mb-2">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
                <span className="text-[7px] text-slate-500 uppercase tracking-widest">Terminal compiler</span>
              </div>
              <div className="space-y-1 text-left">
                <div>$ npm run compile-static</div>
                <div className="text-emerald-400">✓ 61 routes compiled in 2.3s</div>
                <div>$ tail -n 1 telemetry.log</div>
                <div className="text-slate-500">API: GET /v1/telemetry 200 OK</div>
              </div>
            </div>

            {/* Overlap Element 2: Database CPU Cluster Card (Top Right) */}
            <div className="absolute -top-6 -right-6 w-36 bg-white border border-slate-200/80 rounded-2xl p-3.5 shadow-xl float-ecosystem-2 hidden sm:block text-[9px] select-none z-20 noise-bg">
              <div className="flex justify-between items-center text-[7px] text-slate-400 font-extrabold uppercase tracking-wider mb-1.5">
                <span>Cluster Latency</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded">Active</span>
              </div>
              <div className="text-sm font-extrabold text-blue-600 font-display">8ms avg</div>
              <div className="h-6 flex items-end gap-1 border-b border-l border-slate-100 p-0.5 mt-2">
                {[10, 30, 20, 45, 15, 35].map((h, i) => (
                  <div key={i} className="w-full bg-blue-500 rounded-t-xs" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            {/* Overlap Element 3: Smartphone App Frame (Bottom Left) */}
            <div className="absolute -bottom-8 -left-8 w-36 h-60 bg-slate-950 rounded-[28px] p-2 border-4 border-slate-800 shadow-2xl float-ecosystem-2 hidden md:block select-none overflow-hidden z-20">
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-slate-950 rounded-full flex items-center justify-center gap-0.5 z-10">
                <div className="w-6 h-0.5 bg-slate-850 rounded-full" />
              </div>
              <div className="bg-white rounded-[20px] p-2.5 h-full flex flex-col justify-between text-left text-[8px] font-sans">
                <div className="space-y-2 pt-1.5">
                  <span className="font-bold text-slate-400 block text-[6px] uppercase tracking-wider">Telemetry Node</span>
                  <div className="bg-blue-50 border border-blue-100 rounded p-1 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Heart Rate</span>
                    <span className="font-bold text-blue-600 text-[6px]">72 bpm</span>
                  </div>
                </div>
                <div className="h-16 flex items-end gap-1 border-b border-l border-slate-100 p-0.5">
                  {[20, 40, 15, 30, 45, 25, 50, 35].map((h, i) => (
                    <div key={i} className="w-full bg-blue-500 rounded-t-xs" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Metrics Section (Premium glass cards with border gradients) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/[0.01] rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-sans">
          {[
            { metric: "Global", label: t("hero.statsClients"), desc: "Trusted by startups and global enterprises.", color: "from-blue-500 to-indigo-500" },
            { metric: "Quality", label: t("hero.statsRating"), desc: "Rigorous standards and robust architecture.", color: "from-emerald-500 to-teal-500" },
            { metric: "Expertise", label: t("hero.statsDivisions"), desc: "Multi-disciplinary engineering expertise.", color: "from-purple-500 to-fuchsia-500" },
            { metric: "Responsive", label: t("hero.statsOperations"), desc: "Clear updates throughout the development lifecycle.", color: "from-amber-500 to-orange-500" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="p-6 text-center border border-slate-200 bg-white/50 rounded-2xl glass-card-premium relative overflow-hidden group"
            >
              {/* Highlight top bar matching color scheme */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color} opacity-80`} />

              {/* Soft background grid hover reveal */}
              <div className="absolute inset-0 bg-grid-pattern opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

              <span className="block text-4xl font-extrabold text-slate-900 font-display tracking-tight">
                {stat.metric}
              </span>
              <span className="text-[10px] text-slate-450 font-extrabold uppercase tracking-wider block mt-2.5 leading-tight">
                {stat.label}
              </span>
              <span className="text-[9px] text-slate-400 font-medium block mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-350">
                {stat.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Chapter 3: Business Problems we solve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative select-none text-left border-t border-slate-100/50">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-red-500/[0.01] rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Chapter 2: Scaling Bottlenecks</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            Critical Operational Obstacles We Defuse
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Generic templates fail under transactional stress. We engineer custom middleware solutions to prevent common operational failures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
          {[
            {
              title: "The Latency Wall",
              issue: "API timeouts stalling customer checkout pipelines.",
              metric: "4.2s delay",
              metricLabel: "Average unchecked api delay",
              color: "from-red-500 to-orange-500",
              icon: <Activity className="text-red-500" size={20} />
            },
            {
              title: "Legacy Database Locks",
              issue: "Unoptimized database index lockups freezing server pods.",
              metric: "100% CPU",
              metricLabel: "Thread pools exhaust capacity",
              color: "from-amber-500 to-yellow-500",
              icon: <Layers className="text-amber-500" size={20} />
            },
            {
              title: "API Endpoint Leakage",
              issue: "Vulnerable token headers inviting malicious access attempts.",
              metric: "0% Encrypt",
              metricLabel: "Raw logs expose active tokens",
              color: "from-rose-500 to-pink-500",
              icon: <ShieldAlert className="text-rose-500" size={20} />
            },
            {
              title: "Monolithic Scaling limits",
              issue: "Clunky legacy codebases slowing down feature releases.",
              metric: "6-Week",
              metricLabel: "Average deploy delay bounds",
              color: "from-red-600 to-orange-600",
              icon: <Cpu className="text-red-600" size={20} />
            }
          ].map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="p-6 bg-white border border-slate-200 rounded-3xl glass-card-premium relative overflow-hidden group noise-bg flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="p-3 bg-red-50/50 border border-red-100/50 rounded-2xl w-fit">
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-955 font-display">{card.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed font-sans">{card.issue}</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-100/50">
                <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block max-w-[90px]">{card.metricLabel}</span>
                <span className="text-xs font-extrabold text-red-500 font-mono">{card.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Chapter 4: Design-to-Deployment Journey */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative select-none text-left border-t border-slate-100/50">
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-500/[0.01] rounded-full blur-[120px] pointer-events-none -z-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Chapter 3: Engineering Flow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              Our Design-to-Deployment Sprint Journey
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
              We bridge the gap between aesthetic wireframes and strict compiled code structures. Every sprint step is mapped and monitored.
            </p>

            <div className="space-y-4 pt-2 font-sans">
              {[
                { step: "01", title: "UX Tokens & Figma Design Systems", desc: "Constructing accessibility-compliant UI spacing and styling tokens." },
                { step: "02", title: "Relational Schemas & API Blueprints", desc: "Modeling high-throughput PostgreSQL schemas and backend gateways." },
                { step: "03", title: "Automated Linting & Code Verification", desc: "Executing Jest, Cypress, and TypeScript compiler validation loops." },
                { step: "04", title: "Edge CD Deployments & SLA Auditing", desc: "Pushing production assets to global CDN nodes with sub-400ms latency budgets." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  className="flex gap-4 items-start p-4 bg-slate-50/50 border border-slate-100 rounded-2xl hover:border-slate-350 hover:shadow-sm transition-all"
                >
                  <span className="text-xs font-extrabold text-blue-600 font-mono">{item.step}</span>
                  <div className="space-y-0.5">
                    <h4 className="font-extrabold text-xs text-slate-900 leading-tight">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual interactive diagram column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 relative flex justify-center py-6"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 rounded-3xl blur-xl" />
            <div className="relative border border-slate-200/80 bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-lg w-full glass-card-premium noise-bg text-[10px] font-mono leading-relaxed space-y-5">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <span className="text-[8px] font-bold text-slate-450 uppercase tracking-widest font-mono">Compiler Pipeline v1</span>
                <span className="text-emerald-500 font-bold uppercase text-[7px] bg-emerald-50 px-2 py-0.5 rounded animate-pulse">Running</span>
              </div>

              {/* Steps visual representation */}
              <div className="space-y-3.5 text-left">
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200/50 p-2.5 rounded-lg">
                  <span>Step 1: Figma Token Sync</span>
                  <span className="text-blue-600 font-bold">SUCCESS (0.8s)</span>
                </div>
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200/50 p-2.5 rounded-lg">
                  <span>Step 2: Database Schema Migrate</span>
                  <span className="text-blue-600 font-bold">SUCCESS (1.2s)</span>
                </div>
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200/50 p-2.5 rounded-lg">
                  <span>Step 3: Jest QA Test Coverage (92%)</span>
                  <span className="text-blue-600 font-bold">SUCCESS (3.4s)</span>
                </div>
                <div className="flex items-center justify-between bg-slate-50 border border-slate-200/50 p-2.5 rounded-lg border-blue-200 bg-blue-50/20">
                  <span>Step 4: Next.js Compile Static</span>
                  <span className="text-indigo-600 font-bold animate-pulse">ACTIVE (2.1s...)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Client Logos Horizontal Auto-Marquee */}
      <section className="bg-gradient-to-r from-blue-50/10 via-purple-50/10 to-blue-50/10 border-y border-slate-200/50 py-10 my-12 relative overflow-hidden noise-bg">
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest text-center mb-8">
            Core Technology Stack & Frameworks We Employ
          </p>
            <div className="marquee-container">
              <div className="marquee-content">
                {techStackLogos.concat(techStackLogos).concat(techStackLogos).map((item, idx) => (
                  <div
                    key={idx}
                    className="w-16 h-16 border border-slate-200/60 bg-white/80 shadow-sm rounded-2xl flex items-center justify-center shrink-0 select-none glass-card-premium hover:border-blue-500/40 hover:scale-105 transition-all cursor-default p-3.5"
                    title={item.name}
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
        </div>
      </section>

      {/* Global Presence Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/40 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
              <Globe size={11} />
              <span>International Delivery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              Serving Clients Across Global Hubs
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
              We design digital transformation paths for companies in highly competitive markets. From Silicon Valley startups looking for rapid MVP software prototypes, to European enterprises demanding strict compliance SLA agreements, we deploy cross-functional software teams.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-blue-650" />
                <span className="text-[11px] font-bold text-slate-700">North America (USA & CA)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-blue-655" />
                <span className="text-[11px] font-bold text-slate-700">United Kingdom & Europe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-blue-655" />
                <span className="text-[11px] font-bold text-slate-700">Middle East (UAE & GCC)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-blue-655" />
                <span className="text-[11px] font-bold text-slate-700">Asia Pacific & Singapore</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50 border border-slate-200/60 rounded-3xl p-8 relative overflow-hidden h-[340px] flex flex-col justify-between text-left">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100/20 rounded-full blur-3xl pointer-events-none" />
            <div className="space-y-2">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Global Offices</span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">{t("home.officesTitle")}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 font-sans">
              <div className="p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm space-y-1">
                <span className="font-bold text-xs text-slate-900 block">{t("home.officeSoftware")}</span>
                <span className="text-[10px] text-slate-500 block">Perundurai, Erode, India</span>
                <span className="text-[9px] text-slate-450 block pt-1">Custom SaaS product engineering & development</span>
              </div>
              <div className="p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm space-y-1">
                <span className="font-bold text-xs text-slate-900 block">{t("home.officeIot")}</span>
                <span className="text-[10px] text-slate-500 block">Perundurai, Erode, India</span>
                <span className="text-[9px] text-slate-450 block pt-1">Embedded hardware calibration & physical assembly</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Capabilities & Visual Proof Showcase */}
      <section id="capabilities-section" className="bg-slate-50/40 border-y border-slate-200/50 py-24 select-none relative">
        <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none" />

        {/* Floating background gradient circles for visual depth */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/[0.02] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-purple-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Specialized Capabilities Showcase</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              Interactive Division & Visual Proof Console
            </h2>
            <p className="text-slate-550 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
              Select an engineering division below to preview actual layouts, interactive simulators, live schemas, and developer terminal blueprints.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 justify-center mb-12 border-b border-slate-200/60 pb-6 max-w-5xl mx-auto">
            {[
              { id: "software-development", name: "SaaS & Web Engineering", icon: Cpu },
              { id: "mobile-development", name: "Mobile App Development", icon: Smartphone },
              { id: "ai-solutions", name: "AI Stacks & Agents", icon: Brain },
              { id: "cloud-devops", name: "Cloud & DevOps Platforms", icon: Cloud },
              { id: "iot-embedded", name: "IoT & Embedded Hardware", icon: Activity }
            ].map((tab) => {
              const TabIcon = tab.icon
              const isSelected = activeServiceTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveServiceTab(tab.id)}
                  className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 border ${isSelected
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/10"
                    : "bg-white border-slate-200 text-slate-655 hover:bg-slate-50 hover:border-slate-350"
                    }`}
                >
                  <TabIcon size={14} className={isSelected ? "text-white animate-pulse" : "text-slate-400"} />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </div>

          {/* Showcase Panel Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Details & Technical Capability specs */}
            <div className="lg:col-span-5 space-y-6 text-left">
              {(() => {
                const selectedService = agencyServices.find(s => s.slug === activeServiceTab) || agencyServices[0]
                return (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-50 border border-blue-100 text-blue-655 rounded-2xl w-fit">
                        {React.createElement(serviceIconMap[selectedService.slug] || Cpu, { size: 22 })}
                      </div>
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">
                        Division: {selectedService.title}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-extrabold font-display text-slate-900 tracking-tight leading-snug">
                        {selectedService.tagline}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans font-medium">
                        {(() => {
                          const transVal = t(`services.${selectedService.slug}.longDesc` as any)
                          return transVal === `services.${selectedService.slug}.longDesc` ? selectedService.longDesc : transVal
                        })()}
                      </p>
                    </div>

                    {/* Sub-services bullet list */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Sub-Specialties</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                        {selectedService.subServices.slice(0, 4).map((sub: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-1.5 bg-white border border-slate-200/50 p-2.5 rounded-xl">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                            <span>
                              {(() => {
                                const transKey = `services.${selectedService.slug}.subServices.${idx}`
                                const transVal = t(transKey as any)
                                return transVal === transKey ? sub : transVal
                              })()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Stack tags */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Engineering Stack</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedService.techStack.map((tech: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200/80 rounded-lg px-2.5 py-1"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Link href={`/services/${selectedService.slug}`}>
                        <Button variant="gradient" className="font-bold text-xs py-3 px-6 shadow-sm shadow-blue-500/10 cursor-pointer">
                          <span>Explore Full Details</span>
                          <ArrowRight size={13} className="ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </>
                )
              })()}
            </div>

            {/* Right Column: Dynamic Interactive Simulator & Visual Proof Console */}
            <div className="lg:col-span-7 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-3xl blur-xl" />

              {/* Render dynamic simulator mockups depending on the tab */}
              <div className="relative border border-slate-200 bg-white shadow-2xl rounded-3xl overflow-hidden glass-card-premium min-h-[420px] flex flex-col">

                {/* 1. SAAS & WEB DEVELOPMENT SIMULATOR */}
                {activeServiceTab === "software-development" && (
                  <div className="text-left font-sans flex flex-col flex-1">
                    {/* Simulated Browser Header */}
                    <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      </div>
                      <div className="text-[10px] text-slate-450 font-semibold select-none font-mono">
                        https://console.skillforge.app/telemetry
                      </div>
                      <div className="w-8" />
                    </div>

                    <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                      {/* Telemetry Metrics Row */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl shadow-inner space-y-1">
                          <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">API Load</span>
                          <span className="text-sm font-extrabold text-slate-900 font-display">1.42 M/hr</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl shadow-inner space-y-1">
                          <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">Cache Hit</span>
                          <span className="text-sm font-extrabold text-emerald-600 font-display">94.8%</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl shadow-inner space-y-1">
                          <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">DB Queries</span>
                          <span className="text-sm font-extrabold text-blue-600 font-display">8ms avg</span>
                        </div>
                      </div>

                      {/* Interactive table simulation */}
                      <div className="bg-slate-50 border border-slate-200/50 rounded-2xl shadow-inner overflow-hidden">
                        <div className="bg-slate-100/60 px-4 py-2 border-b border-slate-200/80 flex items-center justify-between text-[8px] font-extrabold text-slate-450 uppercase tracking-widest select-none">
                          <span>Live Database Nodes</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setActiveEnterpriseTable("users")}
                              className={`px-2 py-0.5 rounded cursor-pointer ${activeEnterpriseTable === "users" ? "bg-white text-slate-800 border border-slate-200" : ""}`}
                            >
                              users
                            </button>
                            <button
                              onClick={() => setActiveEnterpriseTable("orders")}
                              className={`px-2 py-0.5 rounded cursor-pointer ${activeEnterpriseTable === "orders" ? "bg-white text-slate-800 border border-slate-200" : ""}`}
                            >
                              orders
                            </button>
                            <button
                              onClick={() => setActiveEnterpriseTable("logs")}
                              className={`px-2 py-0.5 rounded cursor-pointer ${activeEnterpriseTable === "logs" ? "bg-white text-slate-800 border border-slate-200" : ""}`}
                            >
                              logs
                            </button>
                          </div>
                        </div>

                        {/* Database table view */}
                        <div className="p-3 text-[10px] font-mono space-y-1.5 leading-normal max-h-36 overflow-y-auto">
                          {activeEnterpriseTable === "users" && (
                            <>
                              <div className="text-slate-655 flex justify-between p-1 hover:bg-white rounded transition-colors"><span className="text-blue-650">SELECT * FROM users LIMIT 3;</span></div>
                              <div className="flex justify-between border-b border-slate-100 pb-1 font-bold text-slate-500"><span>id</span><span>email</span><span>plan</span></div>
                              <div className="flex justify-between py-1 text-slate-800"><span>usr_892</span><span>client@stripe.com</span><span>Enterprise</span></div>
                              <div className="flex justify-between py-1 text-slate-800"><span>usr_501</span><span>startup@ycombinator.com</span><span>Growth</span></div>
                              <div className="flex justify-between py-1 text-slate-800"><span>usr_114</span><span>tech@linear.app</span><span>Enterprise</span></div>
                            </>
                          )}
                          {activeEnterpriseTable === "orders" && (
                            <>
                              <div className="text-slate-655 flex justify-between p-1 hover:bg-white rounded transition-colors"><span className="text-blue-650">SELECT * FROM orders LIMIT 3;</span></div>
                              <div className="flex justify-between border-b border-slate-100 pb-1 font-bold text-slate-500"><span>id</span><span>amount</span><span>status</span></div>
                              <div className="flex justify-between py-1 text-slate-800"><span>ord_90</span><span>$14,500.00</span><span className="text-green-600 font-bold">SUCCEEDED</span></div>
                              <div className="flex justify-between py-1 text-slate-800"><span>ord_72</span><span>$2,800.00</span><span className="text-green-600 font-bold">SUCCEEDED</span></div>
                              <div className="flex justify-between py-1 text-slate-800"><span>ord_41</span><span>$850.00</span><span className="text-yellow-600 font-bold">PROCESSING</span></div>
                            </>
                          )}
                          {activeEnterpriseTable === "logs" && (
                            <>
                              <div className="text-slate-655 flex justify-between p-1 hover:bg-white rounded transition-colors"><span className="text-blue-650">TAIL -N 3 system.log;</span></div>
                              <div className="text-emerald-600 flex items-center gap-1.5"><span>[06:14:02 UTC]</span><span>API: GET /v1/telemetry 200 OK (8ms)</span></div>
                              <div className="text-emerald-600 flex items-center gap-1.5"><span>[06:14:03 UTC]</span><span>DB: Auto-clean sync vacuum node task completed.</span></div>
                              <div className="text-blue-600 flex items-center gap-1.5"><span>[06:14:05 UTC]</span><span>JOB: Queued email welcome dispatcher task.</span></div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Live Chart Visualizer */}
                      <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-2xl shadow-inner space-y-3">
                        <div className="flex items-center justify-between text-[9px] font-extrabold text-slate-455 uppercase tracking-widest">
                          <span>Live Database Sync Latency</span>
                          <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Active Cache Monitoring</span>
                        </div>
                        <div className="h-16 flex items-end gap-1.5 border-b border-l border-slate-200/80 p-1.5">
                          {[30, 45, 25, 60, 35, 75, 55, 65, 40, 50].map((h, idx) => (
                            <div key={idx} className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. MOBILE APP DEVELOPMENT SIMULATOR */}
                {activeServiceTab === "mobile-development" && (
                  <div className="p-6 flex justify-center items-center font-sans bg-slate-50/40 flex-1 min-h-[400px]">
                    {/* Simulated iPhone Frame */}
                    <div className="w-64 h-[370px] bg-slate-950 rounded-[36px] p-2.5 shadow-2xl border-4 border-slate-800 relative flex flex-col justify-between overflow-hidden">
                      {/* Speaker Notch */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-1 z-25">
                        <div className="w-10 h-1 bg-slate-850 rounded-full" />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-650/40" />
                      </div>

                      {/* iPhone Screen viewport */}
                      <div className="w-full h-full bg-white rounded-[26px] overflow-hidden flex flex-col justify-between p-3.5 pt-7 text-left select-none text-[10px]">

                        {/* Screen Content Wrapper */}
                        <div className="flex-1 space-y-3 overflow-hidden">
                          {activeMobileAppScreen === "fintech" && (
                            <div className="space-y-3">
                              {/* Header User Balance */}
                              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                <div className="space-y-0.5">
                                  <span className="text-[7px] text-slate-400 uppercase tracking-widest block font-bold">Total Assets</span>
                                  <span className="text-xs font-extrabold text-slate-900 font-display">$84,250.00</span>
                                </div>
                                <span className="bg-emerald-50 text-emerald-600 font-bold px-1.5 py-0.5 rounded text-[8px]">+14.2%</span>
                              </div>

                              {/* Credit Card mockup */}
                              <div className="p-3 bg-gradient-to-br from-indigo-500 via-purple-650 to-pink-500 rounded-xl text-white shadow-md relative overflow-hidden flex flex-col justify-between h-[68px] leading-tight select-none">
                                <div className="flex justify-between items-start">
                                  <span className="text-[6px] font-extrabold uppercase tracking-widest opacity-80">Enterprise Premium</span>
                                  <span className="text-[8px] font-bold">VISA</span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-[9px] font-mono tracking-widest block">•••• •••• •••• 4028</span>
                                  <div className="flex justify-between text-[6px] font-medium opacity-80 pt-0.5">
                                    <span>MERCER ALEX</span>
                                    <span>12/29</span>
                                  </div>
                                </div>
                              </div>

                              {/* Transaction list */}
                              <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">Recent Expenses</span>
                              <div className="space-y-1">
                                <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-2 rounded-xl">
                                  <span className="font-semibold text-slate-700">AWS Cloud Hosting</span>
                                  <span className="font-bold text-slate-900">-$250.00</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-2 rounded-xl">
                                  <span className="font-semibold text-slate-700">Stripe Invoicing Fee</span>
                                  <span className="font-bold text-slate-900">-$42.00</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeMobileAppScreen === "healthcare" && (
                            <div className="space-y-3">
                              {/* Healthcare Patient details */}
                              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                <div className="space-y-0.5">
                                  <span className="text-[7px] text-slate-400 uppercase tracking-widest block font-bold">Heart Rate</span>
                                  <span className="text-xs font-extrabold text-red-500 font-display">72 BPM</span>
                                </div>
                                <span className="bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded text-[7px]">NORMAL</span>
                              </div>

                              {/* Cardiovascular pulse indicator */}
                              <div className="p-2.5 bg-red-50/40 border border-red-100 rounded-xl flex items-center justify-between gap-3 shadow-sm">
                                <div className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                                  <span className="text-[9px] font-bold text-slate-800">Cardio Activity</span>
                                </div>
                                <span className="text-[9px] text-red-600 font-bold">Stable Rhythms</span>
                              </div>

                              {/* Fitness rings telemetry Grid */}
                              <div className="grid grid-cols-2 gap-2">
                                <div className="p-2 bg-slate-50 border border-slate-200/50 rounded-xl space-y-1">
                                  <span className="text-[6px] font-bold text-slate-400 uppercase block">Steps Today</span>
                                  <span className="text-[8px] font-extrabold text-slate-800 block">8,450 / 10k</span>
                                  <div className="w-full bg-slate-200 rounded-full h-1 relative overflow-hidden">
                                    <div className="bg-blue-600 h-1 rounded-full" style={{ width: "84%" }} />
                                  </div>
                                </div>
                                <div className="p-2 bg-slate-50 border border-slate-200/50 rounded-xl space-y-1">
                                  <span className="text-[6px] font-bold text-slate-400 uppercase block">Hydration</span>
                                  <span className="text-[8px] font-extrabold text-slate-800 block">1.8L / 2.5L</span>
                                  <div className="w-full bg-slate-200 rounded-full h-1 relative overflow-hidden">
                                    <div className="bg-cyan-500 h-1 rounded-full" style={{ width: "72%" }} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeMobileAppScreen === "logistics" && (
                            <div className="space-y-3">
                              {/* Dispatcher status */}
                              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                <div className="space-y-0.5">
                                  <span className="text-[7px] text-slate-400 uppercase tracking-widest block font-bold">Delivery Status</span>
                                  <span className="text-xs font-extrabold text-blue-650 font-display">En Route (8.2 km)</span>
                                </div>
                                <span className="bg-blue-50 text-blue-650 font-bold px-1.5 py-0.5 rounded text-[7px]">ETA 12 MIN</span>
                              </div>

                              {/* Custom Map with visual SVG routes */}
                              <div className="bg-slate-100 border border-slate-200 rounded-xl h-20 relative overflow-hidden flex flex-col justify-end p-2 text-[7px] font-bold text-slate-600">
                                <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

                                <svg className="absolute inset-0 w-full h-full text-slate-400" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M 20 20 L 50 60 L 80 40" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                                  <circle cx="50" cy="60" r="4" fill="#3b82f6" className="animate-pulse" />
                                </svg>

                                <div className="absolute top-2 left-4 w-2 h-2 bg-red-500 rounded-full border border-white" />
                                <div className="absolute top-10 right-4 w-2 h-2 bg-green-500 rounded-full border border-white" />

                                <span className="bg-white/95 px-1.5 py-0.5 border border-slate-200 rounded shadow-sm w-fit leading-none relative z-10 font-mono text-[6px]">
                                  {"Erode Hub → Perundurai Node"}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Dynamic selector buttons on iPhone screen footer */}
                        <div className="border-t border-slate-100 pt-2 flex items-center justify-between gap-1 select-none">
                          <button
                            onClick={() => setActiveMobileAppScreen("fintech")}
                            className={`flex-1 text-[7px] py-1 rounded font-bold cursor-pointer text-center ${activeMobileAppScreen === "fintech" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"}`}
                          >
                            Fintech
                          </button>
                          <button
                            onClick={() => setActiveMobileAppScreen("healthcare")}
                            className={`flex-1 text-[7px] py-1 rounded font-bold cursor-pointer text-center ${activeMobileAppScreen === "healthcare" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"}`}
                          >
                            Health
                          </button>
                          <button
                            onClick={() => setActiveMobileAppScreen("logistics")}
                            className={`flex-1 text-[7px] py-1 rounded font-bold cursor-pointer text-center ${activeMobileAppScreen === "logistics" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"}`}
                          >
                            Dispatch
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. AI SOLUTIONS CHAT SIMULATOR */}
                {activeServiceTab === "ai-solutions" && (
                  <div className="text-left font-sans flex flex-col flex-1">
                    {/* Chat console header */}
                    <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] text-slate-655 font-extrabold uppercase tracking-widest font-display">SkillForge AI LLM Core v2</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">RAG: ENABLED</span>
                    </div>

                    {/* Chat logs screen */}
                    <div className="flex-1 p-5 space-y-3 text-xs max-h-56 overflow-y-auto">
                      {aiPromptsList.map((msg, idx) => {
                        const isAssistant = idx % 2 === 1;
                        return (
                          <div
                            key={idx}
                            className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${isAssistant
                              ? "bg-blue-50/50 border border-blue-100 text-slate-700 font-medium mr-auto"
                              : "bg-slate-900 text-white font-semibold ml-auto"
                              }`}
                          >
                            {msg}
                          </div>
                        )
                      })}
                      {aiTyping && (
                        <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-2xl w-fit mr-auto text-slate-450 italic flex items-center gap-1.5 select-none">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                          <span>AI Core thinking...</span>
                        </div>
                      )}
                    </div>

                    {/* Clickable user prompt cues */}
                    <div className="border-t border-slate-150 p-4 bg-slate-50 flex flex-wrap gap-2 text-[9px] font-bold text-slate-655 mt-auto">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400 block w-full mb-1">Click a query to trigger model analysis:</span>
                      <button
                        onClick={() => addAiPromptMessage("Cross-reference ledger with invoice PDF values.")}
                        disabled={aiTyping}
                        className="bg-white border border-slate-200 hover:border-blue-300 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                      >
                        Ledger Audit RAG
                      </button>
                      <button
                        onClick={() => addAiPromptMessage("Extract table nodes from standard text block.")}
                        disabled={aiTyping}
                        className="bg-white border border-slate-200 hover:border-blue-300 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                      >
                        JSON Entity Extraction
                      </button>
                      <button
                        onClick={() => addAiPromptMessage("Identify outliers in billing telemetry logs.")}
                        disabled={aiTyping}
                        className="bg-white border border-slate-200 hover:border-blue-300 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                      >
                        Anomaly Detection
                      </button>
                      <button
                        onClick={() => addAiPromptMessage("Initiate database performance cluster check.")}
                        disabled={aiTyping}
                        className="bg-white border border-slate-200 hover:border-blue-300 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors"
                      >
                        Latency Health Diagnostic
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. CLOUD & DEVOPS PIPELINE SIMULATOR */}
                {activeServiceTab === "cloud-devops" && (
                  <div className="text-left font-sans p-6 flex flex-col flex-1 justify-between">

                    {/* Node status indicator grid */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] text-slate-450 font-extrabold uppercase tracking-widest">
                        <span>Cluster Nodes Deployment (Kubernetes K8s)</span>
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-emerald-600 font-bold uppercase">Active monitoring</span>
                        </div>
                      </div>

                      {/* Dynamic grid of K8s services */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center justify-between text-[9px] font-bold text-slate-800">
                          <span>ingress-proxy-01</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </div>
                        <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center justify-between text-[9px] font-bold text-slate-800">
                          <span>auth-service-pod</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </div>
                        <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center justify-between text-[9px] font-bold text-slate-800">
                          <span>postgres-db-primary</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </div>
                        <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center justify-between text-[9px] font-bold text-slate-800">
                          <span>redis-cache-layer</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </div>
                        <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center justify-between text-[9px] font-bold text-slate-800">
                          <span>ai-inference-engine</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${cloudNodeStatus === "idle" ? "bg-green-500" : cloudNodeStatus === "deployed" ? "bg-green-500" : "bg-yellow-500 animate-pulse"}`} />
                        </div>
                        <div className="bg-slate-50 border border-slate-200/60 p-2.5 rounded-xl flex items-center justify-between text-[9px] font-bold text-slate-800">
                          <span>static-assets-cdn</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </div>
                      </div>
                    </div>

                    {/* Progress tracking & compiler */}
                    <div className="p-4 bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[9px] rounded-2xl shadow-inner space-y-3 my-4 leading-normal flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-center text-slate-550 border-b border-slate-800 pb-2">
                        <span>Pipeline: gitlab-ci.yml</span>
                        <span>Build: #14092</span>
                      </div>

                      <div className="flex-1 py-2">
                        {cloudNodeStatus === "idle" && (
                          <div className="text-slate-450 italic">// Cluster deployment pipeline is ready. Click trigger button to launch sync.</div>
                        )}

                        {cloudNodeStatus === "building" && (
                          <div className="space-y-1">
                            <div className="text-yellow-500 font-bold animate-pulse">⚙️ RUNNING STEP: compiling static page packages...</div>
                            <div className="text-slate-400">{"-> Done in 2.8s. Creating production bundle..."}</div>
                          </div>
                        )}
                        {cloudNodeStatus === "testing" && (
                          <div className="space-y-1">
                            <div className="text-slate-450">{"-> Production bundle compiled."}</div>
                            <div className="text-blue-400 font-bold animate-pulse">⚙️ RUNNING STEP: running unit test layers...</div>
                            <div className="text-emerald-500 font-bold">✓ TEST SUCCESSFUL: 45/45 tests passed cleanly.</div>
                          </div>
                        )}
                        {cloudNodeStatus === "deployed" && (
                          <div className="space-y-1">
                            <div className="text-slate-450">{"-> Bundle compiled and tested successfully."}</div>
                            <div className="text-emerald-500 font-bold">✓ PIPELINE COMPLETED: Assets synchronized to Vercel and AWS.</div>
                            <div className="text-emerald-500 font-bold">✓ UPTIME: Node statuses updated to ACTIVE.</div>
                          </div>
                        )}
                      </div>

                      {/* Actual visual progress bar */}
                      <div className="w-full bg-slate-800 rounded-full h-1 relative overflow-hidden mt-2">
                        <div className="bg-blue-500 h-1 rounded-full transition-all duration-300" style={{ width: `${cloudDeployProgress}%` }} />
                      </div>
                    </div>

                    {/* Simulation buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={startCloudDeployment}
                        disabled={cloudNodeStatus !== "idle"}
                        className={`flex-1 text-[10px] font-bold py-3 px-5 rounded-xl text-center cursor-pointer transition-colors shadow-sm ${cloudNodeStatus === "idle"
                          ? "bg-blue-650 text-white hover:bg-blue-700"
                          : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                          }`}
                      >
                        {cloudNodeStatus === "idle" ? "Trigger DevOps Deployment Pipeline" : "Deployment In Progress..."}
                      </button>
                      <button
                        onClick={resetCloudDeployment}
                        disabled={cloudNodeStatus !== "deployed"}
                        className={`text-[10px] font-bold py-3 px-4 border rounded-xl text-center cursor-pointer transition-colors ${cloudNodeStatus === "deployed"
                          ? "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                          : "bg-slate-50 border-slate-200 text-slate-350 cursor-not-allowed"
                          }`}
                      >
                        Reset Node
                      </button>
                    </div>
                  </div>
                )}

                {/* 5. IOT & EMBEDDED HARDWARE SIMULATOR */}
                {activeServiceTab === "iot-embedded" && (
                  <div className="text-left font-sans p-6 flex flex-col flex-1 justify-between">

                    {/* Embedded MCU statistics */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] text-slate-450 font-extrabold uppercase tracking-widest">
                        <span>Edge Controller (ESP32-S3 Board Simulator)</span>
                        <span className="text-blue-600 bg-blue-55 px-2 py-0.5 rounded font-bold text-[9px]">WIFI: CONNECTED</span>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-xl shadow-inner space-y-1 text-center">
                          <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">Core Temp</span>
                          <span className={`text-sm font-extrabold font-display ${iotFanOn ? "text-blue-500" : "text-amber-500 animate-pulse"}`}>
                            {iotFanOn ? "36 °C" : "42 °C"}
                          </span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-xl shadow-inner space-y-1 text-center">
                          <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">MCU Voltage</span>
                          <span className="text-sm font-extrabold text-slate-800 font-display">3.32 V</span>
                        </div>
                        <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-xl shadow-inner space-y-1 text-center">
                          <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-wider block">Edge Relay</span>
                          <span className={`text-sm font-extrabold font-display ${iotRelayOn ? "text-green-600" : "text-slate-400"}`}>
                            {iotRelayOn ? "ACTIVE" : "CLOSED"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Sensor telemetries & live progress bars */}
                    <div className="bg-slate-50 border border-slate-200/50 p-5 rounded-2xl shadow-inner space-y-4 my-4 flex-1 flex flex-col justify-center">
                      <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block border-b border-slate-200/80 pb-2">Hardware Telemetry Bus</span>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[9px] font-bold text-slate-655">
                            <span>ADC Pin 34 Sensor Input</span>
                            <span>{iotRelayOn ? "1.82V (540 units)" : "0.00V (0 units)"}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1 relative overflow-hidden">
                            <div className="bg-blue-600 h-1 rounded-full transition-all duration-300" style={{ width: iotRelayOn ? "54%" : "0%" }} />
                          </div>
                        </div>
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[9px] font-bold text-slate-655">
                            <span>Relay Coil Temperature</span>
                            <span>{iotRelayOn ? "24 °C" : "18 °C"}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1 relative overflow-hidden">
                            <div className="bg-cyan-500 h-1 rounded-full transition-all duration-300" style={{ width: iotRelayOn ? "32%" : "20%" }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Interactive sensor toggle switch controls */}
                    <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-between gap-6">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIotRelayOn(!iotRelayOn)}
                            className={`w-10 h-6 rounded-full relative transition-colors duration-250 cursor-pointer ${iotRelayOn ? "bg-green-500" : "bg-slate-200"
                              }`}
                          >
                            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-250 ${iotRelayOn ? "left-5" : "left-1"
                              }`} />
                          </button>
                          <span className="text-[9px] font-bold text-slate-800">Relay Power</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setIotFanOn(!iotFanOn)}
                            className={`w-10 h-6 rounded-full relative transition-colors duration-250 cursor-pointer ${iotFanOn ? "bg-blue-600" : "bg-slate-200"
                              }`}
                          >
                            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all duration-250 ${iotFanOn ? "left-5" : "left-1"
                              }`} />
                          </button>
                          <span className="text-[9px] font-bold text-slate-800">Cooling Fan</span>
                        </div>
                      </div>

                      <div className="text-[9px] text-slate-400 font-mono font-bold flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${iotFanOn ? "bg-blue-500 animate-spin" : "bg-slate-300"}`} />
                        <span>{iotFanOn ? "FAN SPINNING" : "FAN IDLE"}</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Real Estate Creative Highlight Section */}
      <section className="bg-slate-50/50 border-y border-slate-200/50 py-24 select-none relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Context & Link */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/40 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                <Home size={11} />
                <span>Real Estate Media Division</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
                High-Volume Property Media Post-Production
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                We act as the specialized back-office editing squad for real estate photographers, floor planners, and media companies in the USA, Canada, UK, and Australia. We process high-resolution assets within a 24-hour turnaround window.
              </p>

              <div className="space-y-3 font-sans">
                {[
                  { title: "Day-to-Dusk Twilight", desc: "Transform daytime listing photos into glowing twilight shots with warm interior lights." },
                  { title: "HDR Bracket Blending", desc: "Crisp manual exposure alignment preserving window views and neutral color tones." },
                  { title: "3D Virtual Staging", desc: "Digitally furnish empty rooms with realistic, contemporary furniture sets." },
                  { title: "Object & Cable Removal", desc: "Clean property lawns by cloning out clutter, trash bins, and wires." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-655 mt-1.5 shrink-0" />
                    <div className="space-y-0.5">
                      <span className="block text-xs font-bold text-slate-800">{item.title}</span>
                      <span className="block text-[11px] text-slate-500 font-medium">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/services/real-estate-creative"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-650 text-white font-bold text-xs hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Explore Real Estate Services
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Before/After Visual Slider */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-center items-center"
            >
              <div className="w-full max-w-xl bg-white border border-slate-200 p-3 rounded-3xl shadow-xl relative group">
                <div
                  ref={homeSliderRef}
                  onMouseMove={handleHomeMouseMove}
                  onTouchMove={handleHomeTouchMove}
                  className="relative h-[250px] sm:h-[350px] w-full rounded-2xl overflow-hidden bg-slate-100 select-none cursor-ew-resize"
                >
                  {/* After (Twilight Dusk Sunset) */}
                  <div className="absolute inset-0">
                    <img
                      src="/gallery/real-estate-creative/twilight_after.jpg"
                      alt="Twilight Dusk Edited"
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute bottom-3 right-3 bg-slate-900/80 text-white font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded">
                      Twilight Dusk
                    </div>
                  </div>

                  {/* Before (Daylight) */}
                  <div
                    className="absolute inset-0"
                    style={{ clipPath: `polygon(0 0, ${homeSliderPos}% 0, ${homeSliderPos}% 100%, 0 100%)` }}
                  >
                    <img
                      src="/gallery/real-estate-creative/twilight_before.jpg"
                      alt="Daylight Camera Raw"
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={400}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    <div className="absolute bottom-3 left-3 bg-red-600/80 text-white font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 rounded">
                      Daytime Original
                    </div>
                  </div>

                  {/* Slider Divider Bar */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize"
                    style={{ left: `${homeSliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-xl flex items-center justify-center text-slate-700">
                      <div className="flex gap-0.5 items-center justify-center rotate-90">
                        <span className="w-1.5 h-1.5 border-t border-r border-slate-600 rotate-45 transform" />
                        <span className="w-1.5 h-1.5 border-b border-l border-slate-600 rotate-45 transform" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Drag slider horizontally to see daytime-to-twilight transformation quality
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Tech Stack Interactive Matrix (Styled as dark developer IDE editor) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-4 space-y-6 text-left">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Engineering Excellence</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              {t("home.stacksTitle")}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
              {t("home.stacksSubtitle")}
            </p>

            {/* Tabs selectors */}
            <div className="flex flex-col gap-2 pt-2">
              {Object.keys(techStacks).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveStackTab(tab)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeStackTab === tab
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "bg-slate-50 text-slate-655 hover:bg-slate-100"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Stack
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-6 min-h-[380px] flex flex-col justify-between text-left relative overflow-hidden shadow-2xl border border-slate-800">
            {/* Ambient purple/blue code background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* IDE header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-[10px] text-slate-500 font-mono">skillforge_stack_matrix.json</span>
              <div className="w-8" />
            </div>

            {/* Matrix grid cells */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 pt-6 font-mono">
              {techStacks[activeStackTab]?.map((group, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-inner space-y-3">
                  <span className="text-[9px] font-extrabold text-blue-500 uppercase tracking-wider block">
                    &quot;{group.name}&quot;
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1.5">
                    {group.tools.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-bold text-slate-300 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[9px] text-slate-500 font-mono border-t border-slate-800 pt-4 mt-6 flex justify-between">
              <span>// Standardized testing and lint integrations compiled successfully</span>
              <span>LINT: OK</span>
            </div>
          </div>

        </div>
      </section>

      {/* Industries Target Verticals */}
      <section className="bg-slate-50/50 border-y border-slate-200/60 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Vertical Markets</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              {t("home.verticalsTitle")}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
              {t("home.verticalsSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {agencyIndustries.map((ind, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm text-left flex flex-col justify-between glass-card"
                >
                  <div className="space-y-3">
                    <span className="font-display font-extrabold text-sm text-slate-900 block">
                      {ind.name}
                    </span>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-450 font-semibold">
                    <span>SLA Guaranteed Deployments</span>
                    <CheckCircle2 size={12} className="text-green-500" />
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* Development Agile Process (With connector lines) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-10 w-80 h-80 bg-purple-500/[0.01] rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">How We Operate</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            {t("home.lifecycleTitle")}
          </h2>
          <p className="text-slate-505 text-xs sm:text-sm leading-relaxed font-sans">
            {t("home.lifecycleSubtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left font-sans relative">
          {/* Decorative connector line on desktop */}
          <div className="hidden md:block absolute top-7 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-slate-200/80 -z-10" />

          {[
            { step: "01", title: "Discovery & Architecture", desc: "We conduct initial workshop calls to capture technical user requirements, draft system block diagrams, and specify API parameters." },
            { step: "02", title: "Sprint Prototyping & Figma", desc: "We design Figma wireframe blueprints, setup local testing databases, compile circuit layouts, and build the initial application components." },
            { step: "03", title: "QA, CI/CD & Handover", desc: "We run automated unit test blocks, deploy Docker clusters onto cloud environments, issue clean logs, and transfer IP rights." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="space-y-4 relative bg-white/60 border border-slate-200/60 p-6 rounded-2xl shadow-sm glass-card-premium"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-extrabold flex items-center justify-center font-display text-sm border border-blue-100 shadow-inner">
                {item.step}
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Work / Case Studies Showcase */}
      <section className="bg-transparent py-24 text-left relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-purple-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-mono">
              OUR PROJECT GALLERY
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              Our Work. Your <span className="text-gradient">Next Advantage.</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Explore a selection of our latest digital products, enterprise solutions, and AI-powered platforms crafted for startups, growing businesses, and global brands.
            </p>
          </div>

          {/* Interactive showcase grid */}
          <InteractiveProjectShowcase />

          {/* Work Sample Redirection CTA Card */}
          <div className="mt-16 flex justify-center">
            <Link href="/gallery" className="group block w-full max-w-2xl cursor-pointer">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 backdrop-blur-md p-6 sm:p-8 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 text-left flex flex-col sm:flex-row gap-6 items-center justify-between noise-bg">
                {/* Left content details */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/40 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                    <Sparkles size={11} className="text-blue-600 animate-pulse" />
                    <span>Design System Portfolio</span>
                  </div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                    Explore 20+ Additional Layout Prototypes
                  </h3>
                  <p className="text-slate-500 text-[11px] font-medium leading-relaxed font-sans max-w-sm">
                    View our full visual deck of custom SaaS templates, medical vital logs, law firm portals, and dental wireframes.
                  </p>
                </div>

                {/* Right: Small overlapping mockup cards representing work samples */}
                <div className="flex -space-x-4 items-center shrink-0">
                  {[
                    "/gallery/web-development/dentist-clinic-prototype.png",
                    "/gallery/web-development/aura-wellness-sanctuary.png",
                    "/gallery/web-development/luxe-skincare-cosmetics-store.png"
                  ].map((img, idx) => (
                    <div 
                      key={idx} 
                      className="w-16 h-16 rounded-xl border border-slate-200/60 bg-white shadow-md overflow-hidden relative transition-transform duration-500"
                      style={{ transform: `rotate(${(idx - 1) * 8}deg) translateY(${idx * 2}px)` }}
                    >
                      <Image
                        src={img}
                        alt="Work sample preview"
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                  
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg group-hover:bg-blue-600 transition-colors z-10 shrink-0 ml-4">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* R&D Labs & Telemetry Simulator Showroom */}
      <section className="bg-transparent py-16 text-left relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-mono">
              R&D EXPERIMENTAL LABS
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              Interactive <span className="text-gradient">Hardware Showroom.</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-2xl mx-auto">
              Test and control our engineering prototypes in real-time. Arm drone engines, cycle AI object scanners, trigger eye-blink signals, or simulate fluid flow rate leaks.
            </p>
          </div>

          <PrototypeLabsShowroom />
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-center">
        <div className="bg-gradient-brand text-white rounded-3xl p-12 sm:p-16 relative overflow-hidden shadow-xl">
          {/* Subtle backgrounds */}
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10 font-sans">
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
              Ready to Accelerate Your Digital Transformation?
            </h2>
            <p className="text-slate-100 text-xs sm:text-sm leading-relaxed font-sans">
              Schedule a free 30-minute discovery call with our solutions design engineering architects. We will clarify your project parameters, outline code stack alternatives, and deliver a transparent scope proposal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/contact">
                <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-slate-50 shadow-md font-bold text-xs py-3.5 px-6 rounded-xl cursor-pointer">
                  {t("common.bookCall")}
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="w-full sm:w-auto bg-transparent border border-white hover:bg-white/10 text-white font-bold text-xs py-3.5 px-6 rounded-xl cursor-pointer">
                  {t("common.requestQuote")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Glassmorphism Sub-Navigation Dock */}
      <AnimatePresence>
        {showDock && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl overflow-hidden px-4 py-3.5 flex items-center justify-between"
          >
            {/* Scroll reading progress bar */}
            <div 
              className="absolute top-0 left-0 h-[2.5px] bg-blue-600 transition-all duration-75"
              style={{ width: `${readProgress}%` }}
            />

            {/* Anchors List */}
            <div className="flex gap-4 items-center">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest hidden sm:inline select-none">Quick Jump:</span>
              <div className="flex gap-2 sm:gap-3 text-[10px] font-bold text-slate-600">
                <button onClick={() => handleDockNavigation("software-development")} className="hover:text-blue-600 transition-colors uppercase tracking-wider cursor-pointer font-bold bg-transparent border-none p-0">SaaS</button>
                <button onClick={() => handleDockNavigation("mobile-development")} className="hover:text-blue-600 transition-colors uppercase tracking-wider cursor-pointer font-bold bg-transparent border-none p-0">Mobile</button>
                <button onClick={() => handleDockNavigation("ai-solutions")} className="hover:text-blue-600 transition-colors uppercase tracking-wider cursor-pointer font-bold bg-transparent border-none p-0">AI</button>
                <button onClick={() => handleDockNavigation("iot-embedded")} className="hover:text-blue-600 transition-colors uppercase tracking-wider cursor-pointer font-bold bg-transparent border-none p-0">IoT</button>
                <span className="text-slate-200 select-none">|</span>
                <Link href="/gallery" className="hover:text-blue-600 transition-colors uppercase tracking-wider cursor-pointer font-bold">Gallery</Link>
              </div>
            </div>

            {/* CTA Book Call */}
            <Link href="/contact">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[9px] py-1.5 px-3 rounded-lg shadow-sm cursor-pointer uppercase tracking-wider">
                Book Call
              </Button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default HomeContent
