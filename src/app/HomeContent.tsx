"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight, CheckCircle2, Globe, Cpu, Brain,
  Smartphone, Cloud, Code, Layers, ShieldAlert,
  TrendingUp, Layout, Activity, Home, Sparkles, Terminal, Database, Server,
  HelpCircle, ChevronDown, ChevronLeft, ChevronRight, MessageSquare, Briefcase, HeartHandshake, Users, Award,
  Play, Check, Zap, Maximize2, RefreshCw, Sliders, Star, ArrowUpRight, Lock
} from "lucide-react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import { gsap } from "gsap"
import { useLanguage } from "@/context/LanguageContext"
import { Button } from "@/components/ui/button"
import { agencyServices, agencyCaseStudies, agencyIndustries } from "@/data/agencyData"
import { defaultFeedbacks, projectsData } from "@/data/siteData"

// Firebase imports for live client reviews
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import InteractiveProjectShowcase from "@/components/InteractiveProjectShowcase"
import PrototypeLabsShowroom from "@/components/PrototypeLabsShowroom"
import SplitScreenServiceScroll from "@/components/SplitScreenServiceScroll"
import SmoothScroll from "@/components/SmoothScroll"
import { ScrollReveal, TextReveal, StaggerContainer, StaggerItem } from "@/components/ScrollReveal"

export default function HomeContent() {
  const { t, locale, isRTL } = useLanguage()

  // Stack explorer active tab
  const [activeStackTab, setActiveStackTab] = useState<string>("frontend")

  // Read progress bar
  const [readProgress, setReadProgress] = useState(0)

  // Firebase Live Client Reviews State & Auto-Loop (4 at a time)
  interface HomeFeedback {
    id?: string;
    customerName: string;
    projectName: string;
    message: string;
    rating: number;
  }

  const [firebaseFeedbacks, setFirebaseFeedbacks] = useState<HomeFeedback[]>([])
  const [reviewsPageIndex, setReviewsPageIndex] = useState(0)

  useEffect(() => {
    async function fetchFirebaseReviews() {
      try {
        const ref = collection(db, "feedbacks")
        const q = query(ref, orderBy("createdAt", "desc"))
        const snapshot = await getDocs(q)
        const list = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            customerName: data.customerName || "Anonymous",
            projectName: data.projectName || "Verified Project",
            message: data.message || "",
            rating: Number(data.rating) || 5
          } as HomeFeedback
        })

        if (list.length > 0) {
          setFirebaseFeedbacks(list)
        } else {
          setFirebaseFeedbacks(defaultFeedbacks)
        }
      } catch (err) {
        console.warn("Failed to fetch Firestore reviews:", err)
        setFirebaseFeedbacks(defaultFeedbacks)
      }
    }

    fetchFirebaseReviews()
  }, [])

  const activeReviewsList = firebaseFeedbacks.length > 0 ? firebaseFeedbacks : defaultFeedbacks
  const reviewsPerPage = 4
  const totalReviewPages = Math.ceil(activeReviewsList.length / reviewsPerPage)

  useEffect(() => {
    if (totalReviewPages <= 1) return
    const interval = setInterval(() => {
      setReviewsPageIndex(prev => (prev + 1) % totalReviewPages)
    }, 5000)
    return () => clearInterval(interval)
  }, [totalReviewPages])

  const visible4Reviews = activeReviewsList.slice(
    reviewsPageIndex * reviewsPerPage,
    (reviewsPageIndex + 1) * reviewsPerPage
  )

  // Mouse Parallax coordinates for Hero floating elements
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = true
      heroVideoRef.current.play().catch((err) => {
        console.warn("Video playback autoplay handled:", err)
      })
    }
  }, [])

  const animFrameRef = useRef<number | null>(null)
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    if (animFrameRef.current !== null) return
    animFrameRef.current = requestAnimationFrame(() => {
      setMousePos({ x, y })
      animFrameRef.current = null
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setReadProgress((window.scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const triggerBookModal = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-book-call-modal"))
    }
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

  // Scrolling Technology & Company Logos data for marquee
  const techLogos = [
    {
      name: "SkillForge Technologies",
      badge: "ENGINEERING LABS",
      logo: (
        <Image
          src="/logo-mark.png"
          alt="SkillForge"
          width={22}
          height={22}
          className="w-5 h-5 object-contain"
        />
      ),
    },
    {
      name: "Next.js 16",
      badge: "WEB FRAMEWORK",
      logo: (
        <svg viewBox="0 0 180 180" className="w-5 h-5 fill-slate-900">
          <circle cx="90" cy="90" r="90" fill="#000" />
          <path fill="#fff" d="M149.99 157.067L74.887 50H60v79.99h14.502V75.602l64.208 91.07a75.056 75.056 0 0011.28-9.605z" />
          <path fill="#fff" d="M120 50h15v80h-15z" />
        </svg>
      ),
    },
    {
      name: "React 19",
      badge: "UI CORE",
      logo: (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-5 h-5">
          <circle cx="0" cy="0" r="2.05" fill="#0891b2" />
          <g stroke="#0891b2" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      ),
    },
    {
      name: "TypeScript",
      badge: "LANGUAGE",
      logo: (
        <svg viewBox="0 0 128 128" className="w-5 h-5">
          <path fill="#3178c6" d="M0 0h128v128H0z" />
          <path fill="#fff" d="M72.9 105.8c2.6 3.6 7.4 6 13.8 6 7 0 11.2-3.4 11.2-8.4 0-5.4-4-7.6-11.8-11-13.4-5.6-20.2-12-20.2-22.4 0-12.8 10.4-22.4 27-22.4 11.4 0 19.6 4.2 24.8 11.4l-11.2 8.6c-3-4.2-6.8-6.2-13.6-6.2-6 0-9.8 3-9.8 7.2 0 4.8 3.8 6.6 12.8 10.6 14.4 6.2 19.4 12.8 19.4 23 0 14.6-11.4 23.6-29.2 23.6-14.2 0-23.8-5.6-29.2-14.4l11.2-8.6zM24 49.8h46.2v12.8H54v62.4H37.8V62.6H24V49.8z" />
        </svg>
      ),
    },
    {
      name: "Python AI",
      badge: "ML ENGINE",
      logo: (
        <svg viewBox="0 0 110 110" className="w-5 h-5">
          <path fill="#3776ab" d="M53.6 1C27.6 1 29 12.3 29 12.3v12.7h25.4v3.6H18s-17 1.9-17 25c0 23.1 14.8 23.9 14.8 23.9h8.9V64.8s-.5-15.1 14.8-15.1h25.4s14.3-.2 14.3-14.3V15.2S93 1 53.6 1zM39.8 8.8c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5z" />
          <path fill="#ffd343" d="M55.8 108.4c26 0 24.6-11.3 24.6-11.3V84.4H55v-3.6h36.4s17-1.9 17-25c0-23.1-14.8-23.9-14.8-23.9h-8.9v12.7s.5 15.1-14.8 15.1H44.5s-14.3.2-14.3 14.3v19.2s-2.6 14.2 36.8 14.2zM69.6 100.6c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" />
        </svg>
      ),
    },
    {
      name: "Golang",
      badge: "RUNTIME",
      logo: (
        <svg viewBox="0 0 200 100" className="w-7 h-5">
          <path fill="#00add8" d="M22.8 38.6c-1.8-1.5-4.1-2.3-6.9-2.3-5.8 0-9.8 4.2-9.8 10 0 5.7 3.9 9.8 9.5 9.8 4.1 0 7.2-2.1 8.4-5.3h-8.6v-5.2h14.7v2c0 8.8-6.1 14.5-14.8 14.5-9.6 0-15.9-6.8-15.9-15.8 0-9.1 6.4-15.9 16.1-15.9 4.8 0 8.7 1.6 11.6 4.3l-4.3 3.9zm30.7.3c-8.9 0-14.9 6.8-14.9 15.7 0 9 6 15.8 14.9 15.8 8.9 0 14.9-6.8 14.9-15.8.1-8.9-5.9-15.7-14.9-15.7zm0 25.8c-5.5 0-9.2-4.3-9.2-10.1 0-5.8 3.7-10.1 9.2-10.1 5.5 0 9.2 4.3 9.2 10.1 0 5.8-3.7 10.1-9.2 10.1z" />
        </svg>
      ),
    },
    {
      name: "Docker",
      badge: "CONTAINER",
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#2496ed]">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954-5.43h2.118a.185.185 0 00.186-.186V3.574a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .103.082.186.185.186zm-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm0 2.714h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.186.186 0 00-.185.186v1.887c0 .102.083.185.185.185zm-2.954 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.145a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.714h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zm-2.93 2.714h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.185-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-2.714h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .103.083.186.185.186zM.165 11.85a.94.94 0 00.088.423c1.173 2.508 3.518 4.29 6.275 4.795 3.327.61 6.84-.047 9.873-1.815 1.554-.908 2.92-2.15 3.966-3.642a.185.185 0 00-.097-.272 7.747 7.747 0 01-2.457-.962.186.186 0 00-.236.035 8.1 8.1 0 01-3.673 2.127 10.638 10.638 0 01-3.568.324c-2.427-.22-4.661-1.282-6.246-2.983a.185.185 0 00-.272.003A4.57 4.57 0 01.165 11.85z" />
        </svg>
      ),
    },
    {
      name: "Kubernetes",
      badge: "ORCHESTRATION",
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#326ce5]">
          <path d="M12 .397L2.17 6.072v11.353L12 23.103l9.83-5.678V6.072L12 .397zm-.437 2.102l7.74 4.468-2.616 1.51-5.124-2.958v-3.02zm-1.126 0v3.02L5.313 8.477l-2.616-1.51 7.74-4.468zM3.23 8.016l2.616 1.51v5.918l-2.616 1.51V8.016zm9.77 13.382l-7.74-4.468 2.616-1.51 5.124 2.958v3.02zm1.126 0v-3.02l5.124-2.958 2.616 1.51-7.74 4.468zm6.644-6.446l-2.616-1.51V9.526l2.616-1.51v5.918z" />
        </svg>
      ),
    },
    {
      name: "Flutter",
      badge: "MOBILE PLATFORM",
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#02569b]">
          <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37zM6 24h7.37L21.7 15.67l-3.69-3.69L6 24z" />
        </svg>
      ),
    },
    {
      name: "ESP32 MCU",
      badge: "EDGE HARDWARE",
      logo: <Cpu className="w-5 h-5 text-indigo-600" />,
    },
    {
      name: "PyTorch",
      badge: "DEEP LEARNING",
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#ee4c2c]">
          <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm0 2.18a9.82 9.82 0 110 19.64 9.82 9.82 0 010-19.64zm0 3.27a6.55 6.55 0 100 13.1 6.55 6.55 0 000-13.1z" />
        </svg>
      ),
    },
    {
      name: "GraphQL",
      badge: "API DATA",
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#e10098]">
          <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.24l7.6 3.8v7.6L12 19.44l-7.6-3.8v-7.6L12 4.24z" />
        </svg>
      ),
    },
    {
      name: "Tailwind CSS v4",
      badge: "DESIGN SYSTEM",
      logo: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#06b6d4]">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      ),
    },
  ]

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-white text-slate-900 overflow-hidden font-sans selection:bg-blue-500/20">

        {/* ========================================================================= */}
        {/* SECTION 1: HERO CONTROL CENTER (AWWWARDS / LINEAR / APPLE QUALITY)       */}
        {/* ========================================================================= */}
        <section
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          className="relative w-full pt-28 pb-16 sm:pt-32 sm:pb-24 md:pt-40 md:pb-40 flex flex-col justify-center items-center overflow-hidden bg-white"
        >
          {/* Layer 1: High-Resolution Background Image Layout */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Generated Schematic Image (Covering full screen, fully visible) */}
            <img
              src="/hero-background-image.png"
              alt="Hero Background Schematic"
              className="w-full h-full object-cover object-center opacity-95"
              style={{ transform: "translateZ(0)", willChange: "transform" }}
            />

            {/* Seamless Edge Blending Overlays (Only fades the very top and bottom edges) */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>

          {/* Layer 3: Foreground Main Headline & CTAs (100% Opacity, Top Z-Index 30) */}
          <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Top Engineering Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] sm:text-xs font-semibold tracking-wider uppercase shadow-md max-w-full truncate">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="truncate">SKILLFORGE ENGINEERING LABS</span>
                <span className="text-slate-500 hidden xs:inline">•</span>
                <span className="text-blue-400 font-mono hidden xs:inline">PRODUCT ARCHITECTURE</span>
              </div>
            </motion.div>

            {/* Main Editorial Headline (100% Crisp, High-Contrast Readability) */}
            <div className="text-center max-w-5xl mx-auto mb-10 sm:mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight text-slate-950 leading-[1.08] sm:leading-[1.05]"
              >
                We Engineer <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
                  High-Performance
                </span>{" "}
                Digital Products.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 sm:mt-8 max-w-3xl mx-auto"
              >
                <p className="text-sm sm:text-base md:text-xl text-slate-900 font-medium leading-relaxed bg-white/85 backdrop-blur-md px-4 sm:px-8 py-3 sm:py-4 rounded-2xl border border-white/90 shadow-lg shadow-slate-900/5">
                  From cloud-native SaaS platforms and enterprise AI agents to edge
                  IoT firmware and real-time mobile apps — we build mission-critical
                  digital architecture for forward-thinking enterprises.
                </p>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#capabilities-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900 text-white font-medium text-base hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-blue-600/25 hover:-translate-y-0.5"
              >
                <span>Explore Engineering Work</span>
                <ArrowRight size={18} />
              </a>

              <button
                onClick={triggerBookModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white text-slate-800 font-medium text-base border border-slate-300 hover:border-blue-500 hover:bg-slate-50 transition-all duration-300 shadow-sm hover:-translate-y-0.5"
              >
                <Sparkles size={18} className="text-blue-600" />
                <span>Schedule Architecture Audit</span>
              </button>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: EDITORIAL PHILOSOPHY & CONTINUOUS MARQUEE                      */}
        {/* ========================================================================= */}
        <section className="py-20 border-y border-slate-100 bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Large Typography Statement */}
            <ScrollReveal direction="up">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
                <div className="lg:col-span-8">
                  <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-semibold">THE ENGINEERING METHODOLOGY</span>
                  <TextReveal
                    text="Websites get built. Products get engineered."
                    className="mt-3 text-3xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight"
                  />
                </div>
                <div className="lg:col-span-4 text-slate-600 text-base leading-relaxed font-normal">
                  We bridge high-level system architecture, user experience design, and cloud scalability. We build robust systems engineered to withstand real-world enterprise demand.
                </div>
              </div>
            </ScrollReveal>

            {/* 4 Pillars of Product Engineering with Stagger Reveal */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: "01", title: "Architecture First", desc: "Clean microservices, decoupled schemas, and modular codebases designed for maintenance.", icon: Code },
                { number: "02", title: "Precision Motion", desc: "60fps micro-interactions, hardware acceleration, and fluid layout physics.", icon: Sparkles },
                { number: "03", title: "Sub-Second Speed", desc: "Edge caching, optimized API payloads, and Lighthouse 95+ performance default.", icon: Zap },
                { number: "04", title: "Enterprise Grade", desc: "End-to-end security compliance, real-time logging, and fail-safe redundancy.", icon: ShieldAlert },
              ].map((pillar, idx) => (
                <StaggerItem key={idx}>
                  <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">{pillar.number}</span>
                      <pillar.icon className="text-slate-400" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-display">{pillar.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

          </div>

          {/* Continuous Technology Logo Marquee */}
          <div className="mt-16 pt-8 border-t border-slate-200/60 marquee-container">
            <div className="marquee-content gap-6">
              {techLogos.concat(techLogos).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-400 transition-all duration-300 whitespace-nowrap group shrink-0"
                >
                  <div className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                    {item.logo}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900 font-display tracking-tight group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-semibold tracking-wider">
                      {item.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: SPLIT-SCREEN SCROLL SERVICES SHOWCASE                         */}
        {/* ========================================================================= */}
        <section
          id="capabilities-section"
          className="relative bg-slate-950 text-white scroll-mt-20 border-y border-slate-800"
        >
          <SplitScreenServiceScroll />
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: INTERACTIVE PROJECT SHOWCASE                                   */}
        {/* ========================================================================= */}
        <section className="py-20 bg-slate-50/70 border-y border-slate-100">
          <ScrollReveal direction="up">
            <InteractiveProjectShowcase />
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: PROTOTYPE & R&D LABS SHOWROOM                                  */}
        {/* ========================================================================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <PrototypeLabsShowroom />
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: FULL TECH STACK ARCHITECTURE EXPLORER                         */}
        {/* ========================================================================= */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold">TECHNOLOGY ECOSYSTEM</span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
                  Modern Engineering Stack
                </h2>
                <p className="mt-4 text-lg text-slate-400">
                  We craft performant digital products using modern languages, frameworks, edge runtimes, and cloud ecosystems.
                </p>
              </div>

              {/* Stack Category Selector */}
              <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
                {Object.keys(techStacks).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveStackTab(key)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${activeStackTab === key
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white"
                      }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Stack Grid Display with Stagger Reveal */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {techStacks[activeStackTab]?.map((group, idx) => (
                <StaggerItem key={idx}>
                  <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/80 backdrop-blur-md h-full">
                    <h3 className="text-base font-bold font-display text-white mb-6 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      {group.name}
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {group.tools.map((tool, tIdx) => (
                        <span key={tIdx} className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 text-sm font-mono hover:border-blue-500 hover:text-blue-300 transition-colors">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: VERIFIED CLIENT FEEDBACK & TESTIMONIALS (LIVE FIREBASE FIRESTORE DATA) */}
        {/* ========================================================================= */}
        <section className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-mono text-blue-600 uppercase tracking-widest font-semibold">VERIFIED ENGINEERING FEEDBACK</span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-display font-extrabold text-slate-900 tracking-tight">
                Trusted by Innovators
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Direct reviews from engineering stakeholders and project partners.
              </p>
            </div>
          </ScrollReveal>

          {/* 4-at-a-time Animated Batch Grid */}
          <div className="relative min-h-[460px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewsPageIndex}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {visible4Reviews.map((fb, idx) => (
                  <div key={idx} className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: fb.rating || 5 }).map((_, rIdx) => (
                            <Star key={rIdx} size={16} fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md font-semibold">
                          {fb.projectName}
                        </span>
                      </div>
                      <p className="text-slate-700 text-base leading-relaxed italic">
                        &quot;{fb.message}&quot;
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-bold text-slate-900 font-display text-sm">{fb.customerName}</span>
                      <span className="text-xs text-slate-400 font-mono">VERIFIED CLIENT</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls (if more than 4 reviews exist) */}
            {totalReviewPages > 1 && (
              <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalReviewPages }).map((_, pageIdx) => (
                    <button
                      key={pageIdx}
                      onClick={() => setReviewsPageIndex(pageIdx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${pageIdx === reviewsPageIndex ? "w-8 bg-blue-600" : "w-2.5 bg-slate-200 hover:bg-slate-400"
                        }`}
                      aria-label={`Go to review batch page ${pageIdx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setReviewsPageIndex((prev) => (prev - 1 + totalReviewPages) % totalReviewPages)}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-xs"
                    aria-label="Previous Review Batch"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setReviewsPageIndex((prev) => (prev + 1) % totalReviewPages)}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-xs"
                    aria-label="Next Review Batch"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 8: ARCHITECTURE AUDIT & CONSULTATION CTA                          */}
        {/* ========================================================================= */}
        <section className="py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollReveal direction="up">
              <div className="p-10 sm:p-16 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold">START YOUR PRODUCT ARCHITECTURE</span>
                <h2 className="mt-4 text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                  Ready to Engineer Your Next <br className="hidden sm:block" /> Digital Breakthrough?
                </h2>
                <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
                  Schedule a direct technical consultation with our principal software architects and explore custom platform options.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={triggerBookModal}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 text-white font-medium text-base hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-600/25 hover:-translate-y-0.5"
                  >
                    <span>Schedule Technical Consultation</span>
                    <ArrowRight size={18} />
                  </button>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-800 text-slate-200 font-medium text-base hover:bg-slate-700 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span>Contact Engineering Team</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>



      </div>
    </SmoothScroll>
  )
}
