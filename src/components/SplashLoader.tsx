"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SplashLoader() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if this is the first load of the session
    const hasLoaded = sessionStorage.getItem("skillforge_intro_loaded")
    
    // Ignore splash for crawlers (like Googlebot) to protect SEO
    const isBot = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(
      navigator.userAgent
    )

    if (!hasLoaded && !isBot) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
        sessionStorage.setItem("skillforge_intro_loaded", "true")
      }, 1500) // Fast 1.5s intro
      
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -100,
            scale: 0.98,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 select-none pointer-events-auto"
        >
          {/* Background Grid Accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

          {/* Glowing Ambient Shapes */}
          <div className="absolute w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute w-[200px] h-[200px] bg-indigo-500/10 rounded-full blur-[80px] delay-500 animate-pulse" />

          <div className="relative flex flex-col items-center gap-6 text-center">
            {/* SVG Logo Emblem (Shield with Circuit paths) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-24 h-24 flex items-center justify-center"
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                {/* Shield Outline */}
                <path
                  d="M50 10 L85 20 C85 55 50 85 50 85 C50 85 15 55 15 20 Z"
                  stroke="url(#gradientStroke)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Circuit Inner Lines */}
                <path
                  d="M50 25 L50 65 M35 40 L50 40 M65 40 L50 40 M38 52 L50 46 L62 52"
                  stroke="url(#cyanGlow)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Nodes */}
                <circle cx="50" cy="25" r="3.5" fill="#3b82f6" />
                <circle cx="35" cy="40" r="3.5" fill="#06b6d4" />
                <circle cx="65" cy="40" r="3.5" fill="#06b6d4" />
                <circle cx="38" cy="52" r="2.5" fill="#6366f1" />
                <circle cx="62" cy="52" r="2.5" fill="#6366f1" />

                {/* Gradients */}
                <defs>
                  <linearGradient id="gradientStroke" x1="15" y1="10" x2="85" y2="85" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#06b6d4" />
                    <stop offset="0.5" stopColor="#3b82f6" />
                    <stop offset="1" stopColor="#6366f1" />
                  </linearGradient>
                  <linearGradient id="cyanGlow" x1="35" y1="40" x2="65" y2="40" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#22d3ee" />
                    <stop offset="1" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Scanline Effect */}
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
              />
            </motion.div>

            {/* Brand Title */}
            <div className="space-y-1">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-lg font-extrabold tracking-widest text-slate-100 font-display uppercase"
              >
                SkillForge
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-[10px] tracking-[0.25em] text-cyan-400 font-bold uppercase"
              >
                Technology Lab
              </motion.p>
            </div>

            {/* Glowing Loading Bar */}
            <div className="w-40 h-[3px] bg-slate-900 border border-white/5 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
