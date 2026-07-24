"use client"

import React, { useState, useEffect, useRef } from "react"
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
  ArrowRight,
  Sparkles,
  Settings,
  Power,
  Maximize2
} from "lucide-react"

interface ProductsContentProps {
  apkFileName?: string
  apkVersion?: string
}

export default function ProductsContent({
  apkFileName = "ActivePulse-v1.2.0.apk",
  apkVersion = "v1.2.0"
}: ProductsContentProps) {
  const [activeScreen, setActiveScreen] = useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const [isPreRegisterOpen, setIsPreRegisterOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

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
        <div className="absolute top-[-100px] left-[15%] w-[600px] h-[600px] rounded-full ap-glow-teal opacity-50 blur-[130px]" />
        <div className="absolute top-[180px] right-[10%] w-[550px] h-[550px] rounded-full ap-glow-indigo opacity-40 blur-[140px]" />
      </div>

      <div className="absolute inset-0 ap-dot-grid opacity-40 pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 md:py-28 flex flex-col items-center text-center">
        {/* Animated Heartbeat Pulse background SVG */}
        <div className="absolute inset-0 w-full h-full max-h-[500px] overflow-hidden pointer-events-none opacity-20 flex items-center justify-center">
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
          className="space-y-6 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-500/20 text-teal-700 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Sparkles size={12} className="animate-pulse text-teal-600" />
            <span>Premium Hardware Ecosystem</span>
          </div>
          <h1 id="products-hero-title" className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Active Pulse <br />
            <span className="text-2xl md:text-4xl font-semibold text-teal-600 block mt-2">Engineered for the Modern Workspace</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
            Intelligent wireless control. Seamless OTA updates. Zero compromises. Complete physical peripheral mastery.
          </p>
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
            <div className="absolute w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-teal-500/10 to-indigo-500/10 blur-3xl opacity-70 group-hover:scale-105 transition-transform duration-700" />
            
            <div className="relative aspect-square w-full max-w-[450px] rounded-3xl bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center backdrop-blur-2xl shadow-xl overflow-hidden">
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
            <div className="grid grid-cols-2 gap-4">
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

            {/* CTA Button */}
            <div className="pt-2">
              <button 
                id="pre-register-btn" 
                onClick={() => setIsPreRegisterOpen(true)}
                className="relative group px-8 py-3.5 rounded-xl border-2 border-teal-500 text-teal-700 font-bold tracking-wide overflow-hidden transition-all duration-300 hover:bg-teal-600 hover:text-white cursor-pointer"
              >
                <span className="relative flex items-center gap-2">
                  Coming Soon — Pre-register <ChevronRight size={16} />
                </span>
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
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                    activeScreen === idx 
                      ? "bg-slate-50 border-teal-500/40 shadow-sm" 
                      : "bg-transparent border-transparent hover:bg-slate-50/50"
                  }`}
                >
                  <div className={`p-2 rounded-lg border flex-shrink-0 transition-colors ${
                    activeScreen === idx 
                      ? "bg-teal-50 border-teal-100 text-teal-600" 
                      : "bg-slate-100 border-slate-200 text-slate-500"
                  }`}>
                    {feat.icon}
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold tracking-wide transition-colors ${
                      activeScreen === idx ? "text-teal-700" : "text-slate-800"
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
            <div className="absolute w-[280px] h-[580px] rounded-[48px] bg-teal-500/10 blur-3xl -z-10 pointer-events-none" />

            {/* Interactive Carousel Frame Wrapper with Manual Side Scroll Arrows */}
            <div className="relative flex items-center justify-center gap-4">
              
              {/* Left Arrow Button */}
              <button 
                onClick={handlePrev}
                className="absolute left-[-55px] z-30 p-2.5 rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-55 text-slate-700 transition-colors cursor-pointer"
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
                className="absolute right-[-55px] z-30 p-2.5 rounded-full bg-white border border-slate-200 shadow-md hover:bg-slate-55 text-slate-700 transition-colors cursor-pointer"
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
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeScreen === idx ? "w-5 bg-teal-500" : "w-1.5 bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

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
              className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200 p-8 shadow-2xl z-10 space-y-6 text-center select-none"
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
                  <Sparkles size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Active Pulse Pre-registration</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Sign up to receive early prototype release notices, product updates, and developer discounts.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 bg-teal-50 border border-teal-100 rounded-2xl space-y-2 text-center"
                >
                  <span className="text-sm font-bold text-teal-700 block">Registration Complete!</span>
                  <span className="text-xs text-slate-500 block">We've added your email to the Active Pulse queue.</span>
                </motion.div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) {
                      setIsSubmitted(true);
                      setTimeout(() => {
                        setIsPreRegisterOpen(false);
                        setIsSubmitted(false);
                        setEmail("");
                      }, 2500);
                    }
                  }}
                  className="space-y-4"
                >
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/50 text-slate-800 text-sm"
                  />
                  <button 
                    type="submit"
                    className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-colors shadow-md shadow-teal-500/10 text-sm cursor-pointer"
                  >
                    Pre-register Now
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  )
}
