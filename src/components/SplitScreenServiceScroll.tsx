"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, Globe, Smartphone, Cpu, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { agencyServices } from "@/data/agencyData"

// ── The 5 Requested Core Services Only ─────────────────────────────
const KEY_SLUGS = [
  "web-development",
  "mobile-development",
  "mobile-app-development",
  "ai-solutions",
  "iot-embedded",
  "iot-embedded-systems",
  "seo-marketing",
]

const SERVICE_CONFIG: Record<string, { icon: React.ReactNode; bgImage: string; accentColor: string; glowClass: string }> = {
  "web-development": {
    icon: <Globe size={22} />,
    bgImage: "/webdev-card.png",
    accentColor: "from-blue-600 to-cyan-500",
    glowClass: "bg-cyan-500/20",
  },
  "mobile-development": {
    icon: <Smartphone size={22} />,
    bgImage: "/mobile-app-dev-card.png",
    accentColor: "from-purple-600 to-pink-500",
    glowClass: "bg-purple-600/20",
  },
  "mobile-app-development": {
    icon: <Smartphone size={22} />,
    bgImage: "/mobile-app-dev-card.png",
    accentColor: "from-purple-600 to-pink-500",
    glowClass: "bg-purple-600/20",
  },
  "ai-solutions": {
    icon: <TrendingUp size={22} />,
    bgImage: "/ai-card.png",
    accentColor: "from-emerald-500 to-teal-400",
    glowClass: "bg-emerald-500/20",
  },
  "iot-embedded": {
    icon: <Cpu size={22} />,
    bgImage: "/iot-card.png",
    accentColor: "from-amber-500 to-orange-500",
    glowClass: "bg-amber-500/20",
  },
  "iot-embedded-systems": {
    icon: <Cpu size={22} />,
    bgImage: "/iot-card.png",
    accentColor: "from-amber-500 to-orange-500",
    glowClass: "bg-amber-500/20",
  },
  "seo-marketing": {
    icon: <Sparkles size={22} />,
    bgImage: "/degital-marketing-card.png",
    accentColor: "from-rose-500 to-pink-500",
    glowClass: "bg-rose-500/20",
  },
}

const ALL_CARD_IMAGES = [
  "/webdev-card.png",
  "/mobile-app-dev-card.png",
  "/ai-card.png",
  "/iot-card.png",
  "/degital-marketing-card.png",
]

// Motion variants for staggered text reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function SplitScreenServiceScroll() {
  const services = (() => {
    const matched = agencyServices.filter((s) => KEY_SLUGS.includes(s.slug))
    const uniqueSlugs = new Set<string>()
    return matched.filter((s) => {
      const canonicalKey = s.slug.includes("mobile") ? "mobile" : s.slug.includes("iot") ? "iot" : s.slug
      if (uniqueSlugs.has(canonicalKey)) return false
      uniqueSlugs.add(canonicalKey)
      return true
    }).slice(0, 5)
  })()

  const total = services.length
  const [activeIndex, setActiveIndex] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(0)
  const isLockedRef = useRef(false)
  const cooldownRef = useRef(false)
  const unlockedAtEndRef = useRef(false)

  // Preload all 5 card background images into memory immediately on component mount
  useEffect(() => {
    ALL_CARD_IMAGES.forEach((src) => {
      const img = new window.Image()
      img.src = src
    })
  }, [])

  useEffect(() => { activeIndexRef.current = activeIndex }, [activeIndex])

  const goNext = useCallback(() => {
    const cur = activeIndexRef.current
    if (cur < total - 1) {
      setActiveIndex(cur + 1)
      return true
    }
    return false
  }, [total])

  const goPrev = useCallback(() => {
    const cur = activeIndexRef.current
    if (cur > 0) {
      setActiveIndex(cur - 1)
      return true
    }
    return false
  }, [])

  const lock = useCallback(() => {
    if (isLockedRef.current) return
    isLockedRef.current = true
    window.__lenis?.stop()
  }, [])

  const unlock = useCallback(() => {
    if (!isLockedRef.current) return
    isLockedRef.current = false
    window.__lenis?.start()
  }, [])

  const unlockAtEnd = useCallback(() => {
    unlockedAtEndRef.current = true
    unlock()
    setTimeout(() => {
      unlockedAtEndRef.current = false
    }, 1200)
  }, [unlock])

  const touchStartYRef = useRef(0)

  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isLockedRef.current) return
    e.preventDefault()
    e.stopPropagation()

    // Ignore tiny trackpad residual momentum ticks
    if (Math.abs(e.deltaY) < 14) return

    if (cooldownRef.current) return
    cooldownRef.current = true
    setTimeout(() => { cooldownRef.current = false }, 700)

    if (e.deltaY > 0) {
      const stepped = goNext()
      if (!stepped) {
        unlockAtEnd()
        const el = sectionRef.current
        if (el) {
          const rect = el.getBoundingClientRect()
          const currentScroll = window.scrollY || window.pageYOffset
          const targetTop = currentScroll + rect.bottom + 20
          if (window.__lenis) {
            window.__lenis.scrollTo(targetTop)
          } else {
            window.scrollTo({ top: targetTop, behavior: "smooth" })
          }
        }
      }
    } else if (e.deltaY < 0) {
      const stepped = goPrev()
      if (!stepped) {
        unlockAtEnd()
        const el = sectionRef.current
        if (el) {
          const rect = el.getBoundingClientRect()
          const currentScroll = window.scrollY || window.pageYOffset
          const targetTop = Math.max(0, currentScroll + rect.top - window.innerHeight + 100)
          if (window.__lenis) {
            window.__lenis.scrollTo(targetTop)
          } else {
            window.scrollTo({ top: targetTop, behavior: "smooth" })
          }
        }
      }
    }
  }, [goNext, goPrev, unlockAtEnd])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartYRef.current = e.touches[0].clientY
    }
  }, [])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!isLockedRef.current) return
    if (cooldownRef.current) return

    const touchEndY = e.changedTouches[0]?.clientY || 0
    const diff = touchStartYRef.current - touchEndY

    if (Math.abs(diff) > 40) {
      cooldownRef.current = true
      setTimeout(() => { cooldownRef.current = false }, 700)

      if (diff > 0) {
        const stepped = goNext()
        if (!stepped) unlockAtEnd()
      } else {
        const stepped = goPrev()
        if (!stepped) unlockAtEnd()
      }
    }
  }, [goNext, goPrev, unlockAtEnd])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!isLockedRef.current) return
    const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "]
    if (!keys.includes(e.key)) return
    e.preventDefault()

    if (cooldownRef.current) return
    cooldownRef.current = true
    setTimeout(() => { cooldownRef.current = false }, 500)

    if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
      const stepped = goNext()
      if (!stepped) {
        unlockAtEnd()
        const el = sectionRef.current
        if (el) {
          const rect = el.getBoundingClientRect()
          const currentScroll = window.scrollY || window.pageYOffset
          const targetTop = currentScroll + rect.bottom + 20
          if (window.__lenis) {
            window.__lenis.scrollTo(targetTop)
          } else {
            window.scrollTo({ top: targetTop, behavior: "smooth" })
          }
        }
      }
    } else {
      const stepped = goPrev()
      if (!stepped) {
        unlockAtEnd()
        const el = sectionRef.current
        if (el) {
          const rect = el.getBoundingClientRect()
          const currentScroll = window.scrollY || window.pageYOffset
          const targetTop = Math.max(0, currentScroll + rect.top - window.innerHeight + 100)
          if (window.__lenis) {
            window.__lenis.scrollTo(targetTop)
          } else {
            window.scrollTo({ top: targetTop, behavior: "smooth" })
          }
        }
      }
    }
  }, [goNext, goPrev, unlockAtEnd])

  useEffect(() => {
    const checkPositionAndLock = () => {
      const section = sectionRef.current
      if (!section) return
      if (unlockedAtEndRef.current) return

      const rect = section.getBoundingClientRect()
      if (rect.top <= 120 && rect.top >= 20) {
        lock()
      } else if (rect.top > 160 || rect.top < -rect.height + 100) {
        unlock()
      }
    }

    window.addEventListener("scroll", checkPositionAndLock, { passive: true })
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKey)
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("scroll", checkPositionAndLock)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKey)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      unlock()
    }
  }, [handleWheel, handleKey, handleTouchStart, handleTouchEnd, lock, unlock])

  const active = services[activeIndex] || services[0]
  const config = SERVICE_CONFIG[active.slug] || SERVICE_CONFIG["web-development"]

  return (
    <div
      ref={sectionRef}
      className="w-full font-sans max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sticky top-20 z-10 select-none"
    >
      {/* Top Header & Step Progress Bar */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse inline-block shadow-md shadow-blue-500/50" />
            <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-widest">
              SCROLL TO EXPLORE CORE CAPABILITIES
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            What We Build
          </h2>
        </div>

        {/* Interactive Step Dots & Counter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "w-8 h-2.5 bg-blue-600 shadow-sm shadow-blue-500/50" : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-xs font-mono font-bold text-slate-700 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            {activeIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* 
        Single Clean Stage Window Frame (Zero Inner Box Rectangles)
      */}
      <div className="w-full rounded-3xl bg-slate-950 text-white p-6 sm:p-10 lg:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border border-slate-800/90 relative overflow-hidden h-[480px] sm:h-[500px] flex items-center justify-between">

        {/* 
          1. FULL-WIDTH BACKGROUND IMAGE WITH PRE-RENDERED DOM LAYERS
        */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {services.map((s, idx) => {
            const conf = SERVICE_CONFIG[s.slug] || SERVICE_CONFIG["web-development"]
            const isActive = idx === activeIndex
            return (
              <motion.div
                key={s.slug}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 1.04,
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={conf.bgImage}
                  alt={s.title}
                  fill
                  priority={true}
                  sizes="100vw"
                  className="object-cover object-center contrast-[1.08] brightness-100"
                />
              </motion.div>
            )
          })}
          {/* Smooth left-to-right gradient scrim for 100% white text contrast without inner box */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-transparent" />
        </div>

        {/* Ambient Color Glow Tailored Per Service */}
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] blur-[140px] rounded-full pointer-events-none transition-all duration-700 ${config.glowClass}`} />

        {/* 
          2. LEFT COLUMN: TEXT ELEMENTS UNIFIED DIRECTLY ON STAGE (NO BOXES)
        */}
        <div className="relative z-10 w-full max-w-lg lg:max-w-xl h-full flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug + "-spec"}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col justify-between h-full space-y-4"
            >
              <div className="space-y-4">
                {/* Step 1: Icon & Domain Badge */}
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${config.accentColor} text-white flex items-center justify-center shadow-lg shadow-blue-500/25`}>
                    {config.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-950/90 px-3 py-1 rounded-md border border-blue-800/80 uppercase tracking-wide">
                      DOMAIN 0{activeIndex + 1}
                    </span>
                    <span className="ml-2.5 text-[11px] font-mono text-emerald-400 font-semibold">● VERIFIED</span>
                  </div>
                </motion.div>

                {/* Step 2: Title & Description */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight drop-shadow-md">
                    {active.title}
                  </h3>
                  <p className="mt-2 text-slate-200 text-sm leading-relaxed drop-shadow-sm font-medium line-clamp-2">
                    {active.shortDesc || active.longDesc.slice(0, 120) + "..."}
                  </p>
                </motion.div>

                {/* Step 3: Core Modules */}
                <motion.div variants={itemVariants}>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Core Modules
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {active.subServices.slice(0, 4).map((sub, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-100 text-xs font-medium border border-slate-700/80 backdrop-blur-md shadow-sm">
                        {sub}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Step 4: Tech Stack */}
                <motion.div variants={itemVariants}>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Primary Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {active.techStack.slice(0, 5).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-blue-950/90 text-blue-300 text-xs font-mono font-semibold border border-blue-800/80 backdrop-blur-md shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Step 5: Explore CTA Button */}
              <motion.div variants={itemVariants} className="pt-2">
                <Link
                  href={`/services/${active.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 self-start"
                >
                  <span>Explore {active.title}</span>
                  <ArrowUpRight size={16} />
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Footer Navigation Nudge */}
      <div className="mt-3 flex items-center justify-center gap-2 text-slate-400 text-xs font-mono">
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        >↓</motion.span>
        <span>
          {activeIndex < total - 1
            ? `Scroll down for ${services[activeIndex + 1]?.title}`
            : "Scroll down to continue"}
        </span>
      </div>
    </div>
  )
}
