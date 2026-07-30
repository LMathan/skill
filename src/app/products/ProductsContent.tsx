"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Cpu,
  Wifi,
  Bluetooth,
  Zap,
  Lock,
  Smartphone,
  Download,
  BookOpen,
  Sliders,
  RefreshCw,
  Info,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Settings,
  Power,
  Maximize2,
  Briefcase,
  HelpCircle,
  AlertTriangle,
  FileText,
  ShoppingBag
} from "lucide-react"

interface ProductsContentProps {
  apkFileName?: string
  apkVersion?: string
}

const productSlides = [
  {
    title: "Always Active, System Never Idle",
    subtitle: "Anti-Idle Workspace Key",
    image: "/Product/slide1.png",
    description: "Actively simulates mouse movement paths and scroll patterns to prevent system idle state triggers, keeping your workspace online."
  },
  {
    title: "Seamless BLE HID Emulation",
    subtitle: "Untraceable Hardware Solution",
    image: "/Product/slide2.png",
    description: "Acts as a standard Bluetooth HID mouse/keyboard at the hardware level. No client software, script, or drivers required on your PC."
  },
  {
    title: "Smart Automation & Real-time Clicks",
    subtitle: "Custom Automation Sequences",
    image: "/Product/slide3.png",
    description: "Simulates realistic human-like clicks, keystrokes, and tab rotations with dynamic randomization patterns."
  },
  {
    title: "Configurable Companion App",
    subtitle: "Full Settings Control in Hand",
    image: "/Product/slide4.png",
    description: "Easily adjust mouse speed, custom device name, scroll rate, and automation profiles using the Android companion app."
  },
  {
    title: "Over-the-Air (OTA) Updates",
    subtitle: "3 Years Lifetime Firmware Support",
    image: "/Product/slide5.png",
    description: "Keep your Active Pulse device up-to-date. Upgrade your firmware wirelessly through local Wi-Fi in less than 30 seconds."
  }
]

export default function ProductsContent({
  apkFileName = "ActivePulse-v1.2.0.apk",
  apkVersion = "v1.2.0"
}: ProductsContentProps) {
  const [activeScreen, setActiveScreen] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false)
  const [isAboutVideoOpen, setIsAboutVideoOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [orderName, setOrderName] = useState("")
  const [orderPhone, setOrderPhone] = useState("")
  const [orderAddress, setOrderAddress] = useState("")
  const [orderQuantity, setOrderQuantity] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPreRegisterLoading, setIsPreRegisterLoading] = useState(false)
  const [preRegisterError, setPreRegisterError] = useState("")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash
      if (hash === "#pre-register-btn" || hash === "#pre-register") {
        setTimeout(() => {
          const el = document.getElementById("pre-register-btn")
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" })
          }
        }, 300)
      }
    }

    handleHashScroll()
    window.addEventListener("hashchange", handleHashScroll, { passive: true })
    return () => {
      window.removeEventListener("hashchange", handleHashScroll)
    }
  }, [])

  const [slideIdx, setSlideIdx] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isSlideHovered, setIsSlideHovered] = useState(false)
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null)

  const resetSlideTimer = useCallback(() => {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current)
    if (isSlideHovered) return
    slideTimerRef.current = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % productSlides.length)
    }, 3500)
  }, [isSlideHovered])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize, { passive: true })
    
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    resetSlideTimer()
    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current)
    }
  }, [resetSlideTimer])

  const handleManualSelect = (idx: number) => {
    setSlideIdx(idx)
    resetSlideTimer()
  }

  const handlePrevSlide = () => {
    setSlideIdx((prev) => (prev - 1 + productSlides.length) % productSlides.length)
    resetSlideTimer()
  }

  const handleNextSlide = () => {
    setSlideIdx((prev) => (prev + 1) % productSlides.length)
    resetSlideTimer()
  }

  const cardSpacing = windowWidth < 640 ? 90 : windowWidth < 768 ? 140 : 180

  // App screens details
  const appScreens = [
    {
      title: "Wi-Fi Connection",
      subtitle: "REST API Sync",
      desc: "Connect dynamically to your device hotspot using auto-routing for safe configuration.",
      image: "/Product/app_wifi_connect.jpeg",
      icon: <Wifi size={18} className="text-teal-600" />
    },
    {
      title: "Dashboard UI",
      subtitle: "Instant Status",
      desc: "Monitor your workspace active features, click rates, scroll toggles and device IP settings.",
      image: "/Product/app_dashboard.jpeg",
      icon: <Smartphone size={18} className="text-teal-600" />
    },
    {
      title: "Device Controls",
      subtitle: "Custom Settings",
      desc: "Adjust click delays, vertical auto scrolls, tab switching, and custom Bluetooth device names.",
      image: "/Product/app_controls.jpeg",
      icon: <Sliders size={18} className="text-teal-600" />
    },
    {
      title: "OTA Flasher",
      subtitle: "Wireless Firmware",
      desc: "Download files over the web and flash upgrades directly onto your ESP32 chip completely offline.",
      image: "/Product/app_ota_update.jpeg",
      icon: <RefreshCw size={18} className="text-teal-600" />
    },
    {
      title: "About Settings",
      subtitle: "Release Data",
      desc: "Review build versions, software capabilities, developer signatures, and diagnostic details.",
      image: "/Product/app_about.jpeg",
      icon: <Info size={18} className="text-teal-600" />
    }
  ]

  const nextScreen = () => {
    setActiveScreen((prev) => (prev + 1) % appScreens.length)
  }

  const prevScreen = () => {
    setActiveScreen((prev) => (prev - 1 + appScreens.length) % appScreens.length)
  }

  const selectScreen = (idx: number) => {
    setActiveScreen(idx)
    setIsAutoScrolling(false) // pause auto scroll on manual select
  }

  // Handle auto-scroll cycling
  useEffect(() => {
    if (isAutoScrolling) {
      timerRef.current = setInterval(() => {
        nextScreen()
      }, 7000)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isAutoScrolling])

  // Resume auto-scroll after user interaction idle time
  const handleInteraction = () => {
    setIsAutoScrolling(false)
    if (timerRef.current) clearInterval(timerRef.current)

    // Restart auto scrolling after 15 seconds of inactivity
    setTimeout(() => {
      setIsAutoScrolling(true)
    }, 15000)
  }

  // Animation variants for screen sliding transition
  const [direction, setDirection] = useState(1)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 280 : -280,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 280 : -280,
      opacity: 0
    })
  }

  const handleNext = () => {
    setDirection(1)
    nextScreen()
    handleInteraction()
  }

  const handlePrev = () => {
    setDirection(-1)
    prevScreen()
    handleInteraction()
  }

  return (
    <main className="ap-light-theme font-sans min-h-screen bg-white overflow-hidden selection:bg-teal-500/25 relative pb-20 pt-24">

      {/* Background Gradients & Glow Blobs */}
      <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none z-0">
        <div className="hidden md:block absolute top-[-100px] left-[15%] w-[600px] h-[600px] rounded-full ap-glow-teal opacity-50 blur-[130px] transform-gpu will-change-transform" />
        <div className="hidden md:block absolute top-[180px] right-[10%] w-[550px] h-[550px] rounded-full ap-glow-indigo opacity-40 blur-[140px] transform-gpu will-change-transform" />
      </div>

      <div className="absolute inset-0 ap-dot-grid opacity-40 pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] py-32 md:py-40 flex flex-col items-center justify-center text-center overflow-hidden bg-slate-950 text-white border-b border-slate-900">
        
        {/* Full-bleed Background Launch Banner */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50 scale-[1.02] transform-gpu transition-transform duration-700"
          >
            <source src="/Product/hero-section.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient overlays to ensure text contrast and bleed edges to slate-950 */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/30 to-slate-950" />
        </div>

        {/* Animated Heartbeat Pulse background SVG */}
        <div className="absolute inset-0 w-full h-full max-h-[500px] overflow-hidden pointer-events-none opacity-[0.07] flex items-center justify-center z-0">
          <svg className="w-full max-w-5xl h-64" viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M0 100 H350 L370 80 L390 120 L410 30 L430 170 L450 90 L470 110 L490 100 H1000"
              stroke="#0D9488"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.15 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-4xl mx-auto px-6 space-y-8 flex flex-col items-center"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-500/15 backdrop-blur-md border border-teal-500/30 text-teal-300 text-[10px] font-extrabold tracking-widest uppercase shadow-sm">
              <span>✨ NOW AVAILABLE</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Sparkles size={12} className="animate-pulse text-teal-400" />
              <span>Premium Hardware Ecosystem</span>
            </div>
          </div>
          
          <div className="space-y-4 max-w-3xl">
            <h1 id="products-hero-title" className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Active Pulse <br />
              <span className="text-2xl md:text-4xl font-semibold text-teal-400 block mt-2">Engineered for the Modern Workspace</span>
            </h1>
            <p className="text-slate-300 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
              Intelligent wireless control. Seamless OTA updates. Zero compromises. Complete physical peripheral mastery.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 pt-2 justify-center">
            <button
              onClick={() => setIsPreRegisterOpen(true)}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-teal-500/20 cursor-pointer text-sm transform hover:scale-[1.02]"
            >
              Buy Now
            </button>
            <button
              onClick={() => setIsAboutVideoOpen(true)}
              className="border border-white/20 hover:border-white/40 hover:bg-white/10 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer text-sm backdrop-blur-md transform hover:scale-[1.02]"
            >
              About
            </button>
          </div>
        </motion.div>
      </section>

      {/* Product 1: Hardware Device */}
      <section id="device-product-section" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Side: Device Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative flex justify-center items-center group"
          >
            <div className="hidden md:block absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-teal-500/10 to-indigo-500/10 blur-3xl opacity-70 group-hover:scale-105 transition-transform duration-700 transform-gpu will-change-transform" />

            <div className="relative aspect-square w-full max-w-[460px] rounded-3xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center backdrop-blur-2xl shadow-xl overflow-hidden">
              <div className="absolute top-6 left-6 z-20 px-3.5 py-1 rounded-full bg-teal-500 border border-teal-500 text-white font-bold text-xs tracking-wider uppercase shadow-sm">
                New
              </div>

              {/* High-fidelity ESP32 prototype hardware image */}
              <img
                src="/Product/product_device_mockup.png"
                alt="Active Pulse Keyfob Wireless Device Mockup"
                className="w-full h-full object-cover rounded-2xl select-none"
              />
            </div>
          </motion.div>

          {/* Right Side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Active Pulse Device
              </h2>
              <p className="text-teal-600 font-semibold text-lg md:text-xl font-display">
                Engineered to keep your workspace active
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                The Active Pulse Device is a premium wireless hardware module that acts as a standard BLE HID mouse and keyboard controller. It simulates human-like mouse movement, scroll wheel page ups/downs, and key actions to keep your workspace active, preventing it from ever showing idle or lock states. Plug and play, completely wireless, and operates with zero drivers on your computer.
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Bluetooth className="text-teal-600" size={18} />, label: "Bluetooth 5.3", desc: "Stable & fast connection to any OS" },
                { icon: <Zap className="text-teal-600" size={18} />, label: "Smart Automation", desc: "Simulates human mouse & key actions" },
                { icon: <Lock className="text-teal-600" size={18} />, label: "Never Shows Idle", desc: "Prevents lockouts and away status" },
                { icon: <Power className="text-teal-600" size={18} />, label: "USB-C Powered", desc: "Constant power, no battery charging needed" },
                { icon: <RefreshCw className="text-teal-600" size={18} />, label: "3 Years Support", desc: "Complimentary wireless OTA updates" },
                { icon: <Maximize2 className="text-teal-600" size={18} />, label: "Compact Size", desc: "Pocket and keychain friendly puck" }
              ].map((spec, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/65 flex gap-3 items-start hover:border-slate-350 transition-colors duration-250">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-teal-50 border border-teal-100">
                    {spec.icon}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 tracking-wide">{spec.label}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">{spec.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setIsPreRegisterOpen(true)}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-teal-500/10 cursor-pointer text-sm"
              >
                Buy Now
              </button>
              <button
                onClick={() => setIsAboutVideoOpen(true)}
                className="border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 font-bold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer text-sm"
              >
                About
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Product 2: Companion App */}
      <section id="app-product-section" className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Side: App Details */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 lg:order-1 space-y-8"
          >
            <div className="space-y-6">
              {/* App Logo and Title side-by-side */}
              <div className="flex items-center gap-4">
                <img
                  src="/Product/app_logo.png"
                  alt="Active Pulse Mobile Companion App Logo"
                  className="w-16 h-16 rounded-2xl border border-slate-200 shadow-md object-cover flex-shrink-0"
                />
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                      Active Pulse App
                    </h2>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 font-extrabold text-[10px] tracking-wider uppercase">
                      Free App
                    </span>
                  </div>
                  <p className="text-teal-600 font-semibold text-sm md:text-base font-display mt-0.5">
                    Your device. Your control. In your pocket.
                  </p>
                </div>
              </div>

              <p className="text-slate-650 leading-relaxed text-sm md:text-base">
                The Active Pulse companion app is your command center for the Active Pulse Device. Scan and connect via Wi-Fi hotspot, fine-tune sensitivity, configure click timing, manage device identity, and push firmware updates wirelessly — all from a beautifully designed Android interface. No cloud. No account. Pure control.
              </p>
            </div>

            {/* Feature List Selector Sidebar */}
            <div className="space-y-3">
              {appScreens.map((feat, idx) => (
                <button
                  key={idx}
                  onClick={() => selectScreen(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-4 cursor-pointer ${activeScreen === idx
                      ? "bg-slate-50 border-teal-500/40 shadow-sm"
                      : "bg-transparent border-transparent hover:bg-slate-50/50"
                    }`}
                >
                  <div className={`p-2 rounded-lg border flex-shrink-0 transition-colors ${activeScreen === idx
                      ? "bg-teal-50 border-teal-100 text-teal-600"
                      : "bg-slate-100 border-slate-200 text-slate-500"
                    }`}>
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold tracking-wide transition-colors ${activeScreen === idx ? "text-teal-700" : "text-slate-800"
                      }`}>
                      {feat.title} — <span className="font-semibold opacity-75">{feat.subtitle}</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{feat.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Platform Requirement */}
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              Platform Requirement: Android 8.0+
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap gap-4">
                <a
                  id="download-apk-link"
                  href={`/Product/${apkFileName}`}
                  download
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-teal-500/10 cursor-pointer"
                >
                  <Download size={18} /> Download APK ({apkVersion})
                </a>
                <button
                  id="view-docs-btn"
                  className="flex items-center gap-2 border border-slate-200 hover:border-slate-350 hover:bg-slate-55 text-slate-700 font-bold px-7 py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  <BookOpen size={18} /> View Documentation
                </button>
              </div>
              <p className="text-xs text-slate-500 italic">
                *iOS version coming soon. Sideload install required — see instructions below.
              </p>
            </div>
          </motion.div>

          {/* Right Side: Samsung Galaxy Mockup Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 lg:order-2 flex flex-col items-center justify-center relative min-h-[640px]"
          >
            {/* Phone Shadow & Background Glow */}
            <div className="absolute w-[280px] h-[580px] rounded-[48px] bg-teal-500/10 blur-3xl -z-10 pointer-events-none transform-gpu will-change-transform" />

            {/* Interactive Carousel Frame Wrapper with Manual Side Scroll Arrows */}
            <div className="relative flex items-center justify-center gap-4">

              {/* Left Arrow Button */}
              <button
                onClick={handlePrev}
                className="hidden md:flex absolute left-[-55px] z-30 p-2.5 rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-55 text-slate-700 transition-colors cursor-pointer"
                aria-label="Previous app screen"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Samsung Mockup Frame */}
              <div className="relative w-[285px] h-[585px] bg-[#0c0f16] rounded-[44px] border-[6px] border-[#1e2330] shadow-2xl p-2.5 flex flex-col items-center justify-between overflow-hidden">

                {/* Outer Volume Button */}
                <div className="absolute top-24 -left-[6px] w-[6px] h-12 bg-[#1e2330] rounded-l-md" />
                <div className="absolute top-40 -left-[6px] w-[6px] h-12 bg-[#1e2330] rounded-l-md" />
                {/* Power Button */}
                <div className="absolute top-32 -right-[6px] w-[6px] h-16 bg-[#1e2330] rounded-r-md" />
                {/* Speaker Bar & Camera Cutout */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-1.5 bg-[#141822] rounded-full z-30" />
                <div className="absolute top-6.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-[#080a0f] border-2 border-[#161a25] z-30" />

                {/* Screenshot Display Screen - Zoomed and Framed perfectly to stretch edge-to-edge */}
                <div className="relative w-full h-full bg-white rounded-[34px] overflow-hidden pt-10 pb-3 z-10">
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                      key={activeScreen}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute inset-0 pt-10 pb-3 bg-white"
                    >
                      {/* 
                        Use object-cover with pt-10 top padding (clears notch/camera) and 
                        no horizontal padding so that the screenshot stretches edge-to-edge.
                      */}
                      <img
                        src={appScreens[activeScreen].image}
                        alt={appScreens[activeScreen].title}
                        className="w-full h-full object-cover select-none"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Simulated Glass Reflection Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-60 pointer-events-none z-20" />
                </div>

                {/* Navigation Bar Strip (Aesthetic Bottom Chin Cutout) */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-800/80 rounded-full z-30" />
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={handleNext}
                className="hidden md:flex absolute right-[-55px] z-30 p-2.5 rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-55 text-slate-700 transition-colors cursor-pointer"
                aria-label="Next app screen"
              >
                <ChevronRight size={20} />
              </button>

            </div>

            {/* Quick Indicator Below Mockup */}
            <div className="mt-6 flex gap-1.5 justify-center">
              {appScreens.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => selectScreen(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeScreen === idx ? "w-5 bg-teal-500" : "w-1.5 bg-slate-300"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Product Feature Showcase Carousel */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-slate-100/80 overflow-hidden">
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100 inline-block font-display">
            Interactive Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 font-display">
            Features & Visual Guidelines
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Discover the premium features, custom configurations, and OTA updates of the Active Pulse system.
          </p>
        </div>

        {/* 3D Interactive Carousel */}
        <div 
          onMouseEnter={() => setIsSlideHovered(true)}
          onMouseLeave={() => setIsSlideHovered(false)}
          className="relative h-[220px] xs:h-[260px] sm:h-[340px] md:h-[450px] flex items-center justify-center w-full select-none"
        >
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            {productSlides.map((slide, idx) => {
              // Calculate relative index from active slide
              let offset = idx - slideIdx
              // Handle wrap-around for circular display
              if (offset < -2) offset += productSlides.length
              if (offset > 2) offset -= productSlides.length

              const isActive = offset === 0
              const isVisible = Math.abs(offset) <= 1 || (Math.abs(offset) === 2 && productSlides.length > 3)

              if (!isVisible) return null

              // Dynamic 3D positioning
              const xValue = offset * cardSpacing
              const scaleValue = isActive ? 1 : 0.8
              const rotateYValue = offset * -25 // 3D perspective angle
              const zIndexValue = 10 - Math.abs(offset)
              const opacityValue = isActive ? 1 : 0.4

              return (
                <motion.div
                  key={idx}
                  style={{
                    perspective: 1200,
                    zIndex: zIndexValue
                  }}
                  animate={{
                    x: xValue,
                    scale: scaleValue,
                    rotateY: rotateYValue,
                    opacity: opacityValue
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 35
                  }}
                  onClick={() => handleManualSelect(idx)}
                  className={`absolute w-[240px] xs:w-[280px] sm:w-[420px] md:w-[600px] aspect-[3/2] bg-white border border-slate-200/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl cursor-pointer ${
                    isActive ? "ring-2 ring-teal-500/20" : ""
                  }`}
                >
                  {/* Card Image */}
                  <div className="relative w-full h-full bg-slate-950">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover select-none pointer-events-none"
                    />

                    {/* Badge showing index */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-slate-900/70 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-0.5 text-white font-mono text-[8px] sm:text-[9px]">
                      0{idx + 1} / 05
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Carousel Indicators & Controls */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Arrow Buttons & Dot Indicators */}
          <div className="flex items-center gap-6">
            <button
              onClick={handlePrevSlide}
              className="p-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-1.5">
              {productSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleManualSelect(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    slideIdx === idx ? "w-5 bg-teal-500" : "w-1.5 bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              className="p-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-55 text-slate-700 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Installation Instructions */}
      <section id="installation-steps-section" className="relative z-10 max-w-5xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            How to Install the Active Pulse App
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Since Active Pulse is hosted privately by SkillForge Technology, sideloading is required on Android. Follow these simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Download", text: "Tap the Download APK button above to save the package." },
            { step: "2", title: "Allow Installation", text: "Go to Settings → Security → Install Unknown Apps and authorize your browser." },
            { step: "3", title: "Install", text: "Open the downloaded APK file and click install in the system prompt." },
            { step: "4", title: "Connect", text: "Open Active Pulse, power on your ESP32 module, and connect to Wi-Fi." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="ap-glass-card p-6 rounded-2xl flex flex-col justify-between group transition-all duration-300"
            >
              <div className="space-y-4">
                <span className="text-4xl font-extrabold text-teal-500/15 group-hover:text-teal-500/30 transition-colors duration-300 font-mono block">
                  0{item.step}
                </span>
                <h3 className="text-base font-bold text-slate-800 tracking-wide">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* "Why Active Pulse?" Section */}
      <section id="why-activepulse-section" className="relative z-10 max-w-7xl mx-auto px-6 py-16 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: <Zap className="text-teal-600" size={26} />,
              title: "Zero Setup",
              body: "Connect and go. No pairing app, no cloud account, no complex drivers needed to get started immediately."
            },
            {
              icon: <Lock className="text-indigo-650" size={26} />,
              title: "Private by Design",
              body: "All configuration stays completely stored on-device. No data ever leaves your secure local network."
            },
            {
              icon: <Settings className="text-purple-600" size={26} />,
              title: "Always Improving",
              body: "OTA firmware updates push premium features directly to your device completely wirelessly."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 rounded-3xl bg-slate-50/50 border border-slate-200/60 hover:border-slate-350 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto border border-slate-200 mb-6 shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 tracking-wide">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Information Accordion Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
            Need More Information?
          </h2>
          <p className="text-slate-500 text-sm md:text-base">
            Everything you need to know about Active Pulse.
          </p>
        </div>

        <div className="space-y-5">
          {[
            {
              id: "features",
              title: "Features",
              icon: <Sliders className="text-teal-600" size={15} />,
              content: (
                <div className="flex flex-wrap gap-2.5 pt-4">
                  {[
                    "Bluetooth HID Connectivity",
                    "Plug & Play",
                    "Human-like Mouse Movement",
                    "Auto Scroll",
                    "Auto Tab Switching",
                    "Left & Right Click",
                    "USB-C Powered",
                    "OTA Firmware Updates",
                    "Companion Mobile App",
                    "Windows Support",
                    "macOS Support",
                    "Android Companion App"
                  ].map((feat, idx) => (
                    <span 
                      key={idx} 
                      className="bg-slate-50 border border-slate-200/60 hover:border-teal-500/20 text-slate-700 px-3.5 py-2.5 rounded-2xl text-xs font-semibold tracking-wide flex items-center gap-2 shadow-sm transition-all duration-200 select-none hover:shadow-md hover:bg-white"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                      {feat}
                    </span>
                  ))}
                </div>
              )
            },
            {
              id: "use-cases",
              title: "Professional Use Cases",
              icon: <Briefcase className="text-indigo-650" size={15} />,
              content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Prevent systems from entering sleep mode during software installations and long-running setup processes.",
                    "Keep workstations active during development, testing, and QA workflows.",
                    "Support long compilation, rendering, and build operations.",
                    "Maintain workstation availability during meetings, phone calls, and short workplace interruptions.",
                    "Ideal for engineers, developers, IT professionals, researchers, and technical teams."
                  ].map((useCase, idx) => (
                    <div 
                      key={idx} 
                      className="p-4.5 rounded-2xl bg-slate-50/40 border border-slate-200/50 flex gap-3 text-slate-600 text-xs md:text-sm leading-relaxed shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="text-teal-500 font-extrabold text-sm flex-shrink-0 mt-0.5">✓</span>
                      <span>{useCase}</span>
                    </div>
                  ))}
                </div>
              )
            },
            {
              id: "faq",
              title: "Frequently Asked Questions",
              icon: <HelpCircle className="text-purple-600" size={15} />,
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {[
                    {
                      q: "What is Active Pulse?",
                      a: "Active Pulse is a premium, drive-free physical hardware module that emulates standard BLE keyboard and mouse activity. It keeps your workstation active during background tasks or short breaks, completely offline and driverless."
                    },
                    {
                      q: "How does it work?",
                      a: "The device emulates human peripheral interactions by transmitting standard, randomized HID keyboard or mouse events at custom intervals. This registers native input to prevent inactivity lockdowns."
                    },
                    {
                      q: "Does it require software?",
                      a: "No driver, software, or agent is required on the host workstation. It connects directly over BLE or USB. Optional settings, timing profiles, and modes can be customized wirelessly via our companion Android app."
                    },
                    {
                      q: "Which operating systems are supported?",
                      a: "It supports all modern operating systems with keyboard and mouse integration, including Windows, macOS, Linux, iPadOS, ChromeOS, and Android."
                    },
                    {
                      q: "Can I customize the actions?",
                      a: "Yes. Using the Companion App, you can configure mouse movement intervals, click speeds, auto-scroll patterns, active times, and OTA updates."
                    },
                    {
                      q: "Does it support OTA updates?",
                      a: "Yes. Firmware revisions, bug fixes, and feature releases are pushed wirelessly over Bluetooth via the mobile companion app."
                    },
                    {
                      q: "Is internet required?",
                      a: "No. Active Pulse operates completely local and offline. The Bluetooth pairing is direct and secures your workstation privacy."
                    }
                  ].map((faq, idx) => (
                    <div 
                      key={idx} 
                      className="p-5 rounded-2xl bg-slate-50/30 border border-slate-200/50 space-y-2.5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                        <span className="text-teal-650 font-mono">Q:</span>
                        {faq.q}
                      </h4>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed pl-5">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              )
            },
            {
              id: "notice",
              title: "Professional Use Notice",
              isNotice: true,
              icon: <AlertTriangle className="text-amber-500" size={15} />,
              content: (
                <div className="p-6 rounded-2xl bg-amber-500/[0.02] border border-amber-500/20 text-slate-600 text-sm leading-relaxed space-y-4 pt-4 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-600 font-extrabold text-xs uppercase tracking-widest">
                    <span>Important Legal Notice</span>
                  </div>
                  <p className="font-semibold text-slate-800">
                    Active Pulse is designed for legitimate professional productivity workflows.
                  </p>
                  <p>
                    Typical use cases include software installation, development, testing, long-running build processes, engineering workflows, meetings, presentations, and other workplace scenarios where maintaining workstation availability improves productivity.
                  </p>
                  <p>
                    Users are solely responsible for ensuring that the product is used in accordance with applicable laws, workplace policies, organizational requirements, and contractual obligations.
                  </p>
                  <p className="border-l-2 border-amber-500 pl-3.5 italic text-slate-500 text-xs">
                    SkillForge Technologies does not authorize, encourage, or endorse the use of Active Pulse for any unauthorized, deceptive, or policy-violating activities. Any use of the product outside its intended professional purpose is the sole responsibility of the user.
                  </p>
                </div>
              )
            },
            {
              id: "terms",
              title: "Terms & Conditions",
              icon: <FileText className="text-slate-500" size={15} />,
              content: (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 text-slate-600 text-sm leading-relaxed">
                  {[
                    {
                      title: "Intended Use",
                      desc: "Designed exclusively as an automated physical hardware peripheral to assist in software testing, compilation, QA environments, and development workflows."
                    },
                    {
                      title: "User Responsibilities",
                      desc: "Users agree to comply with organizational policies, employment agreements, security covenants, and local laws during hardware operations."
                    },
                    {
                      title: "Warranty",
                      desc: "Comes with a 1-year limited warranty covering native component or hardware defects. Does not cover user damages or modified firmware."
                    },
                    {
                      title: "Firmware Updates",
                      desc: "Distributed OTA. Users should not flash or load unauthorized firmware which may render the ESP32 chip unstable."
                    },
                    {
                      title: "Product Specifications",
                      desc: "BLE HID / USB-C HID profile, 5V power, ESP32 custom chip, LED status light, compact enclosure."
                    },
                    {
                      title: "Limitation of Liability",
                      desc: "SkillForge Technologies is not liable for structural workstation issues, policy infractions, or indirect damages of any kind."
                    },
                    {
                      title: "Shipping Policy",
                      desc: "We provide standard shipping to all addresses in India. Standard shipping rates start from ₹50.00 INR (varying based on location). Orders are processed within 24 hours and delivered in 2–5 business days."
                    },
                    {
                      title: "Return Policy",
                      desc: "Enjoy a 10-day return policy. If you're not completely satisfied, return the device in original packaging via mail for a full refund. Return shipping is free."
                    }
                  ].map((term, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl bg-slate-50/50 border border-slate-200/60 space-y-1.5 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">{term.title}</h4>
                      <p className="text-slate-500 text-[11px] leading-relaxed">{term.desc}</p>
                    </div>
                  ))}
                </div>
              )
            }
          ].map((section, idx) => {
            const isActive = expandedSection === section.id;
            return (
              <div
                key={section.id}
                className={`border rounded-[24px] overflow-hidden transition-all duration-300 transform ${
                  isActive 
                    ? "border-teal-500/60 bg-gradient-to-r from-teal-500/[0.02] to-indigo-500/[0.01] shadow-lg shadow-teal-500/[0.02]" 
                    : "border-slate-200/80 bg-white shadow-sm hover:border-slate-350 hover:-translate-y-0.5 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => setExpandedSection(isActive ? null : section.id)}
                  className="w-full px-6 py-5.5 flex items-center justify-between font-bold text-slate-800 hover:text-teal-600 transition-colors text-left group"
                >
                  <div className="flex items-center gap-4.5">
                    {/* Index Number Widget */}
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center text-xs font-black font-mono shadow-inner transition-colors duration-300 ${
                      isActive 
                        ? "bg-teal-50 border-teal-200/60 text-teal-600" 
                        : "bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-teal-500/[0.02] group-hover:border-teal-500/20 group-hover:text-teal-600"
                    }`}>
                      0{idx + 1}
                    </div>

                    {/* Section Icon Badge */}
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors duration-300 ${
                      isActive 
                        ? "bg-teal-50 border-teal-200/60" 
                        : "bg-slate-50 border-slate-200 group-hover:bg-teal-500/[0.02] group-hover:border-teal-500/20"
                    }`}>
                      {section.icon}
                    </div>

                    <span className="font-extrabold tracking-tight text-sm md:text-base text-slate-800 select-none">
                      {section.title}
                    </span>
                  </div>

                  {/* Circular Chevron Button */}
                  <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 shadow-sm ${
                    isActive 
                      ? "bg-teal-600 border-teal-600 text-white shadow-teal-500/20" 
                      : "bg-white border-slate-200 text-slate-400 group-hover:bg-slate-50"
                  }`}>
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/20">
                        {section.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer CTA Banner */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-slate-100 mt-12">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <img
              src="/logo-mark.png"
              alt="SkillForge Technology Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h2 className="text-slate-800 font-bold text-base tracking-wide">
                Built by SkillForge Technology
              </h2>
              <p className="text-slate-500 text-xs mt-0.5">
                Pushing the limits of premium embedded hardware and custom software applications.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="flex items-center gap-2 group text-teal-600 font-semibold hover:text-teal-700 transition-colors text-sm"
          >
            <span>Partner with our Hardware Division</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Pre-Register Modal */}
      <AnimatePresence>
        {isPreRegisterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreRegisterOpen(false)}
              className="absolute inset-0 bg-[#000000]/40 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 p-8 shadow-2xl z-10 space-y-6 text-center select-none"
            >
              <button
                onClick={() => setIsPreRegisterOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="space-y-2">
                <div className="w-12 h-12 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mx-auto mb-2 text-teal-600">
                  <ShoppingBag size={22} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Checkout — Active Pulse Order</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                  Enter your delivery details to reserve and place your hardware order.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 bg-teal-50 border border-teal-100 rounded-3xl space-y-3 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mx-auto text-teal-600">
                    <Sparkles size={20} className="animate-pulse" />
                  </div>
                  <span className="text-sm font-extrabold text-teal-800 block">Order Queue Registered!</span>
                  <span className="text-xs text-slate-500 block leading-relaxed">
                    We have successfully queued your batch order. A confirmation invoice has been sent to <strong>{email}</strong>.
                  </span>
                </motion.div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!email || !orderName || !orderPhone || !orderAddress) return;
                    setIsPreRegisterLoading(true);
                    setPreRegisterError("");
                    try {
                      const res = await fetch("/api/place-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                          name: orderName,
                          email,
                          phone: orderPhone,
                          address: orderAddress,
                          quantity: orderQuantity
                        })
                      });
                      const data = await res.json();
                      if (res.ok && data.success) {
                        setIsSubmitted(true);
                        setTimeout(() => {
                          setIsPreRegisterOpen(false);
                          setIsSubmitted(false);
                          setOrderName("");
                          setEmail("");
                          setOrderPhone("");
                          setOrderAddress("");
                          setOrderQuantity(1);
                        }, 5000);
                      } else {
                        setPreRegisterError(data.error || "Failed to submit order request. Please try again.");
                      }
                    } catch (err) {
                      setPreRegisterError("A connection error occurred. Please try again.");
                    } finally {
                      setIsPreRegisterLoading(false);
                    }
                  }}
                  className="space-y-4 text-left"
                >
                  {preRegisterError && (
                    <p className="text-xs text-rose-600 font-semibold text-center">{preRegisterError}</p>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Full Name</label>
                      <input
                        type="text"
                        required
                        value={orderName}
                        onChange={(e) => setOrderName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-slate-800 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={orderPhone}
                        onChange={(e) => setOrderPhone(e.target.value)}
                        placeholder="e.g. +1 555-0199"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-slate-800 text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-slate-800 text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Shipping Address</label>
                    <textarea
                      required
                      value={orderAddress}
                      onChange={(e) => setOrderAddress(e.target.value)}
                      placeholder="Street, City, State, Zip Code"
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-slate-800 text-xs resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between border border-slate-100 rounded-xl px-4 py-2.5 bg-slate-50/50">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Quantity</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setOrderQuantity(q => Math.max(1, q - 1))}
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 font-extrabold text-sm hover:bg-slate-50 active:scale-95 transition-all select-none cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-extrabold text-slate-800 text-xs w-5 text-center">{orderQuantity}</span>
                      <button
                        type="button"
                        onClick={() => setOrderQuantity(q => Math.min(10, q + 1))}
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-slate-500 font-extrabold text-sm hover:bg-slate-50 active:scale-95 transition-all select-none cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/30 text-xs space-y-2">
                    <div className="flex justify-between text-slate-500">
                      <span>Item price</span>
                      <span>₹439.00 INR</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal</span>
                      <span>₹{(orderQuantity * 439).toFixed(2)} INR</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Shipping</span>
                      <span className="text-slate-500 font-semibold">Starts from ₹50.00 INR</span>
                    </div>
                    <div className="border-t border-slate-200/80 pt-2 flex justify-between font-extrabold text-slate-850 text-xs">
                      <span>Total</span>
                      <span>₹{(orderQuantity * 439 + 50).toFixed(2)} INR (Base Total)</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isPreRegisterLoading}
                    className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 disabled:bg-teal-600/60 text-white font-bold rounded-xl transition-all shadow-md shadow-teal-500/10 text-sm cursor-pointer flex items-center justify-center active:scale-[0.99] mt-2"
                  >
                    {isPreRegisterLoading ? "Processing..." : `Confirm & Place Order — ₹${(orderQuantity * 439 + 50).toFixed(2)}*`}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Video Modal */}
      <AnimatePresence>
        {isAboutVideoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutVideoOpen(false)}
              className="absolute inset-0 bg-[#000000]/70 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative h-[85vh] max-h-[820px] aspect-[9/16] bg-slate-950 rounded-[36px] border border-white/20 p-2 shadow-2xl z-10 overflow-hidden flex items-center justify-center group"
            >
              <button
                onClick={() => setIsAboutVideoOpen(false)}
                className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 backdrop-blur-md p-2 rounded-full border border-white/10 transition-colors z-25 shadow-lg cursor-pointer"
                aria-label="Close video"
              >
                ✕
              </button>

              <video
                src="/Product/about.mp4"
                controls
                autoPlay
                className="w-full h-full object-cover rounded-[28px]"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  )
}
