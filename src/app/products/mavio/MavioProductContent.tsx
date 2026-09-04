"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Navigation,
  MapPin,
  Map,
  Truck,
  Cpu,
  CheckCircle2,
  Zap,
  Clock,
  Settings,
  AlertTriangle,
  Lock,
  Unlock,
  Wifi,
  WifiOff,
  TrendingUp,
  Gauge,
  Play,
  Pause,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Smartphone,
  ShieldAlert,
  ShieldCheck,
  RotateCcw
} from "lucide-react"

// Product screenshots in /public/Product/mavio
const MAVIO_SCREENS = [
  {
    id: "home",
    title: "Platform Console Dashboard",
    category: "Admin Portal",
    description: "Enterprise management panel displaying active vehicles, live average speeds, geofence compliance, and warning logs.",
    image: "/Product/mavio/home.png",
    badge: "Fleet Controller",
    highlights: ["Live Shuttle Tracking Grid", "Driver Telemetry Summary", "Odometer & Fuel Estimates"]
  },
  {
    id: "driver",
    title: "Driver Companion Application",
    category: "Mobile Telemetry",
    description: "Zero-hardware telemetry system using the driver's phone. Features turn-by-turn route compliance and offline coordinate buffering.",
    image: "/Product/mavio/driver.png",
    badge: "Driver App",
    highlights: ["1-Tap Trip Activation", "Offline Signal Buffer HUD", "Automated Speed Compliance"]
  },
  {
    id: "screen3",
    title: "Commuter Route Stop Guide",
    category: "Rider Hub",
    description: "Interactive visual campus map for students and staff. Shows high-refresh shuttle positions and arrival times.",
    image: "/Product/mavio/3.png",
    badge: "Commuter Portal",
    highlights: ["Interactive Campus Stops", "Dynamic Transit Grids", "Real-Time Bus Location"]
  },
  {
    id: "screen4",
    title: "Alert Radius & Custom Geofencing",
    category: "Smart Alerts",
    description: "Custom proximity notifications alerting riders when a vehicle is within their defined distance or boarding window.",
    image: "/Product/mavio/4.png",
    badge: "Proximity Alerts",
    highlights: ["Slider-Controlled Alert Radius", "1-Tap Stop Subscriptions", "Push / SMS Notifications"]
  },
  {
    id: "screen5",
    title: "Preventive Maintenance Ledger",
    category: "Operations Control",
    description: "Dynamic control panel detailing auto-incremented mileage logs, maintenance countdowns, and oil/brake warnings.",
    image: "/Product/mavio/5.png",
    badge: "Maintenance Center",
    highlights: ["Odometer Servicing HUD", "One-Click Service Clear", "Compliance Log History"]
  }
]

export default function MavioProductContent() {
  // Screens Carousel
  const [activeScreenIndex, setActiveScreenIndex] = useState(0)
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true)

  // Auto-play main carousel
  useEffect(() => {
    if (!isCarouselPlaying) return
    const timer = setInterval(() => {
      setActiveScreenIndex((prev) => (prev + 1) % MAVIO_SCREENS.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isCarouselPlaying])

  return (
    <div className="relative bg-slate-50/60 text-slate-800 font-sans overflow-x-hidden bg-dot-pattern pt-28 pb-24">
      {/* Clean Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-indigo-500/10 via-blue-400/5 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-indigo-650 font-bold">Mavio</span>
        </div>

        {/* ── HERO SECTION ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28 pt-4">
          
          {/* Left Column: Bold Typography & Clean CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 space-y-7 text-left"
          >
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-indigo-150 bg-white/90 backdrop-blur-md shadow-xs text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono font-bold text-indigo-700 tracking-wider text-xs uppercase">MAVIO TRANSIT</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-semibold text-xs">Smart Fleet Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-[62px] font-black tracking-tight font-display text-slate-900 leading-[1.08]">
              Campus Transit, <br />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 bg-clip-text text-transparent">
                Re-engineered.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-xl">
              Enterprise fleet tracking, dynamic ETA alerts, and preventive maintenance designed for universities and corporate campuses — powered entirely by drivers' smartphones without expensive GPS hardware.
            </p>

            {/* Clean, Neat Hero CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              {/* Official Google Play Store Button */}
              <a
                href="https://play.google.com/store/apps/details?id=app.skillforge.mavio"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-white shadow-xl border border-slate-800 hover:border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.60889 1.77605C3.39343 2.00067 3.2666 2.34863 3.2666 2.78442V21.2154C3.2666 21.6512 3.39343 21.9992 3.60889 22.2238L3.68115 22.2891L13.8821 12.0881V11.9117L3.68115 1.71077L3.60889 1.77605Z" fill="#00A0FF" />
                  <path d="M17.2831 15.4892L13.8821 12.0881V11.9117L17.2831 8.51068L17.3553 8.55246L21.3857 10.8466C22.5361 11.4988 22.5361 12.5606 21.3857 13.2128L17.3553 15.507L17.2831 15.4892Z" fill="#FFCC00" />
                  <path d="M17.3553 15.4892L13.8821 12.0161L3.60889 22.2238C3.98779 22.6247 4.61914 22.6738 5.34033 22.2642L17.3553 15.4892Z" fill="#FF3A44" />
                  <path d="M17.3553 8.51068L5.34033 1.73566C4.61914 1.32611 3.98779 1.37518 3.60889 1.77605L13.8821 11.9838L17.3553 8.51068Z" fill="#00E676" />
                </svg>

                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">GET IT ON</span>
                  <span className="text-sm font-extrabold text-white leading-tight font-display tracking-tight mt-0.5">Google Play</span>
                </div>
              </a>

              {/* Primary Book a Tour Button */}
              <a
                href="https://mavio.skillforgetechnology.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_10px_25px_-5px_rgba(79,70,229,0.35)] hover:shadow-[0_14px_28px_-5px_rgba(79,70,229,0.45)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Book a Platform Tour</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Clean Premium Video Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-6 relative flex justify-center items-center"
          >
            {/* Ambient Multi-Layer Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] bg-gradient-to-tr from-indigo-500/15 via-blue-500/10 to-violet-500/15 rounded-full blur-[80px] pointer-events-none -z-10" />

            {/* Showcase Device Card */}
            <div className="relative w-full max-w-[600px] rounded-3xl p-3 bg-white/90 border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(79,70,229,0.18)] backdrop-blur-xl">
              <div className="rounded-2xl overflow-hidden bg-slate-950 aspect-[16/9] relative shadow-inner border border-slate-100">
                <video
                  className="object-cover w-full h-full"
                  src="/Product/mavio/hero-sec-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── BENTO GRID FEATURE SHOWCASE ───────────────────────────── */}
        <div id="features" className="mb-28 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700">
              <Sparkles size={14} />
              <span>PLATFORM FEATURES SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900">
              Complete Campus Fleet Command
            </h2>
            <p className="text-slate-650 text-sm sm:text-base font-medium">
              Explore Mavio’s feature modules built specifically to optimize safety, tracking, and operational maintenance.
            </p>
          </div>

          {/* Bento Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            
            {/* Card 1: Dispatcher Platform Console (Landscape, spans 2 columns) */}
            <div className="lg:col-span-2 p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
              
              <div className="space-y-3 max-w-xl text-left">
                <span className="text-[10px] font-mono font-black text-indigo-400 uppercase tracking-widest">CENTRAL COMMAND</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-white">Platform Dispatcher Console</h3>
                <p className="text-slate-350 text-xs sm:text-sm font-medium leading-relaxed">
                  A comprehensive control panel offering fleet administrators live GPS vehicle tracks, speed telemetry, driver compliance flags, and active schedule timelines in a single vector dashboard.
                </p>
              </div>

              {/* Sleek Browser Mockup */}
              <div className="w-full mt-8 bg-slate-950 rounded-2xl border border-slate-855/80 shadow-2xl overflow-hidden group-hover:scale-[1.01] transition-transform duration-300">
                {/* Browser Title Bar */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-900 border-b border-slate-800/60">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 max-w-xs mx-auto bg-slate-955/40 rounded-md py-1 text-[9px] text-slate-400 font-mono text-center border border-white/5 truncate">
                    https://mavio.skillforgetechnology.app/console
                  </div>
                </div>
                {/* Browser Content */}
                <div className="aspect-[1647/860] relative w-full bg-slate-950">
                  <Image
                    src="/Product/mavio/Aug 19, 2026, 05_34_24 PM.png"
                    alt="Mavio Admin Control Console"
                    fill
                    sizes="(max-w-1024px) 100vw, 700px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Driver Companion App (Vertical) */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-indigo-300 transition-all duration-300 group overflow-hidden relative">
              <div className="space-y-3 text-left">
                <span className="text-[10px] font-mono font-black text-indigo-650 uppercase tracking-widest">DRIVER MOBILE HUD</span>
                <h3 className="text-xl font-extrabold font-display text-slate-900">Driver Companion App</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">
                  Transform drivers' smartphones into telemetry boxes. Buffers GPS coordinates locally in low-signal zones and tunnels, uploading and syncing automatically.
                </p>
                <div className="pt-1">
                  <a
                    href="https://play.google.com/store/apps/details?id=app.skillforge.mavio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-[11px] font-mono font-bold transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.60889 1.77605C3.39343 2.00067 3.2666 2.34863 3.2666 2.78442V21.2154C3.2666 21.6512 3.39343 21.9992 3.60889 22.2238L3.68115 22.2891L13.8821 12.0881V11.9117L3.68115 1.71077L3.60889 1.77605Z" fill="#00A0FF" />
                      <path d="M17.2831 15.4892L13.8821 12.0881V11.9117L17.2831 8.51068L17.3553 8.55246L21.3857 10.8466C22.5361 11.4988 22.5361 12.5606 21.3857 13.2128L17.3553 15.507L17.2831 15.4892Z" fill="#FFCC00" />
                      <path d="M17.3553 15.4892L13.8821 12.0161L3.60889 22.2238C3.98779 22.6247 4.61914 22.6738 5.34033 22.2642L17.3553 15.4892Z" fill="#FF3A44" />
                      <path d="M17.3553 8.51068L5.34033 1.73566C4.61914 1.32611 3.98779 1.37518 3.60889 1.77605L13.8821 11.9838L17.3553 8.51068Z" fill="#00E676" />
                    </svg>
                    <span>Get on Google Play</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>

              {/* Device Mockup */}
              <div className="relative w-full max-w-[170px] bg-[#1e2022] p-2 rounded-[32px] border-[6px] border-slate-900 shadow-lg aspect-[941/1672] overflow-hidden mx-auto mt-6 group-hover:scale-103 transition-transform duration-300">
                <div className="rounded-[22px] overflow-hidden w-full h-full relative">
                  <Image
                    src="/Product/mavio/driver.png"
                    alt="Mavio Driver Console Screen"
                    fill
                    sizes="170px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Alert Radius (Vertical) */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-amber-300 transition-all duration-300 group overflow-hidden relative">
              <div className="space-y-3 text-left">
                <span className="text-[10px] font-mono font-black text-amber-700 uppercase tracking-widest">PROXIMITY ALERTS</span>
                <h3 className="text-xl font-extrabold font-display text-slate-900">Proximity Radial Alerts</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">
                  Commuters choose their stop and adjust alert radius (e.g. 1 km). Instantly notifies riders via geofencing as the vehicle enters their zone.
                </p>
              </div>

              {/* Device Mockup */}
              <div className="relative w-full max-w-[170px] bg-[#1e2022] p-2 rounded-[32px] border-[6px] border-slate-900 shadow-lg aspect-[941/1672] overflow-hidden mx-auto mt-6 group-hover:scale-103 transition-transform duration-300">
                <div className="rounded-[22px] overflow-hidden w-full h-full relative">
                  <Image
                    src="/Product/mavio/4.png"
                    alt="Mavio Alert Radius Screen"
                    fill
                    sizes="170px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Card 4: Odometer & Maintenance (Vertical) */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-violet-300 transition-all duration-300 group overflow-hidden relative">
              <div className="space-y-3 text-left">
                <span className="text-[10px] font-mono font-black text-violet-750 uppercase tracking-widest">FLEET COMPLIANCE</span>
                <h3 className="text-xl font-extrabold font-display text-slate-900">Odometer Maintenance</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">
                  Dynamic Haversine distance calculations track exact fleet mileage. Automatically alerts managers for upcoming oil, brake pad, or tire services.
                </p>
              </div>

              {/* Device Mockup */}
              <div className="relative w-full max-w-[170px] bg-[#1e2022] p-2 rounded-[32px] border-[6px] border-slate-900 shadow-lg aspect-[941/1672] overflow-hidden mx-auto mt-6 group-hover:scale-103 transition-transform duration-300">
                <div className="rounded-[22px] overflow-hidden w-full h-full relative">
                  <Image
                    src="/Product/mavio/5.png"
                    alt="Mavio Fleet Maintenance Screen"
                    fill
                    sizes="170px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Card 5: Commuter Schedules (Vertical) */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group overflow-hidden relative">
              <div className="space-y-3 text-left">
                <span className="text-[10px] font-mono font-black text-emerald-750 uppercase tracking-widest">RIDER CONSOLE</span>
                <h3 className="text-xl font-extrabold font-display text-slate-900">Live Stop Schedules</h3>
                <p className="text-slate-600 text-xs leading-relaxed font-medium">
                  Dynamic vector maps detail exact vehicle coordinates and arrival countdown timers. Helps commuters save transit wait time during weather.
                </p>
              </div>

              {/* Device Mockup */}
              <div className="relative w-full max-w-[170px] bg-[#1e2022] p-2 rounded-[32px] border-[6px] border-slate-900 shadow-lg aspect-[941/1672] overflow-hidden mx-auto mt-6 group-hover:scale-103 transition-transform duration-300">
                <div className="rounded-[22px] overflow-hidden w-full h-full relative">
                  <Image
                    src="/Product/mavio/3.png"
                    alt="Mavio Rider Schedule Screen"
                    fill
                    sizes="170px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── APPLICATION SCREEN SHOWCASE ───────────────────────────── */}
        <div id="app-showcase" className="mb-28 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-700">
              <Smartphone size={14} />
              <span>HIGH-FIDELITY SCREENSHOTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900">
              Inside Mavio’s Applications
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Explore how we bridge administrators, transit coordinators, commuters, and drivers.
            </p>
          </div>

          {/* Interactive Screen Explorer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Screen Info Selector Column */}
            <div className="lg:col-span-5 space-y-4 text-left order-2 lg:order-1">
              <div className="space-y-2">
                {MAVIO_SCREENS.map((screen, idx) => (
                  <button
                    key={screen.id}
                    onClick={() => {
                      setActiveScreenIndex(idx)
                      setIsCarouselPlaying(false) // pause auto-play on click
                    }}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                      activeScreenIndex === idx
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-lg"
                        : "bg-white border-slate-200/90 hover:bg-slate-50 hover:border-indigo-300"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          activeScreenIndex === idx ? "bg-indigo-700 text-indigo-100" : "bg-slate-100 text-slate-500"
                        }`}>
                          {screen.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-extrabold font-display mt-1">{screen.title}</h4>
                    </div>
                    <ChevronRight size={16} className={`transition-transform duration-200 ${
                      activeScreenIndex === idx ? "translate-x-1" : "text-slate-400 group-hover:translate-x-0.5"
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Screen Mockup Showcase Frame */}
            <div className="lg:col-span-7 flex justify-center items-center order-1 lg:order-2 w-full px-4 sm:px-0">
              <div className="flex flex-col items-center gap-4 w-full">
                {/* Concentric 3D Beveled smartphone frame matching the 941x1672 images */}
                <div className="relative w-full max-w-[300px] xs:max-w-[330px] sm:max-w-[345px] bg-[#1e2022] p-[10px] rounded-[50px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.55),_0_0_0_1px_rgba(255,255,255,0.08),_inset_0_2px_4px_rgba(255,255,255,0.12),_inset_0_-2px_4px_rgba(0,0,0,0.45)] flex items-center justify-center aspect-[941/1672]">
                  
                  {/* Physical Side Buttons on the graphite chassis */}
                  {/* Left Side: Volume Buttons */}
                  <div className="absolute -left-[3px] top-28 w-[3px] h-10 bg-[#2b2d30] rounded-l border border-black/60 shadow-sm" />
                  <div className="absolute -left-[3px] top-42 w-[3px] h-10 bg-[#2b2d30] rounded-l border border-black/60 shadow-sm" />
                  {/* Right Side: Power Button */}
                  <div className="absolute -right-[3px] top-32 w-[3px] h-14 bg-[#2b2d30] rounded-r border border-black/60 shadow-sm" />

                  {/* Speaker Ear Piece Grill (placed on the bezel to not cover the screen) */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-14 h-1 bg-[#0b0c0d] rounded-full z-30 border-t border-white/5 shadow-inner" />
                  
                  {/* Render Screen Content */}
                  <div className="rounded-[40px] overflow-hidden bg-slate-950 w-full h-full relative border border-black/80 shadow-[inset_0_0_12px_rgba(0,0,0,0.35)]">
                    <Image
                      src={MAVIO_SCREENS[activeScreenIndex].image}
                      alt={MAVIO_SCREENS[activeScreenIndex].title}
                      fill
                      sizes="(max-w-770px) 100vw, 345px"
                      priority
                      className="object-cover w-full h-full"
                    />
                    {/* Glass screen reflection & glare sheen overlays */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/3 to-white/8 pointer-events-none z-20" />
                    <div className="absolute -inset-y-24 -left-32 w-48 bg-gradient-to-r from-white/0 to-white/8 blur-xl rotate-[35deg] pointer-events-none z-20" />
                  </div>
                </div>

                {/* Caption Card below the mobile mockup */}
                <div className="w-full max-w-[310px] xs:max-w-[340px] sm:max-w-[350px] p-5 bg-white border border-slate-200/90 rounded-3xl shadow-md text-left space-y-2 hover:shadow-lg hover:border-indigo-200 transition-all">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-400">
                    <span className="text-indigo-600 uppercase tracking-wider">
                      {MAVIO_SCREENS[activeScreenIndex].category} • {MAVIO_SCREENS[activeScreenIndex].badge}
                    </span>
                    <span>
                      {activeScreenIndex + 1} / {MAVIO_SCREENS.length}
                    </span>
                  </div>
                  <h4 className="font-extrabold font-display text-slate-900 text-base leading-tight">
                    {MAVIO_SCREENS[activeScreenIndex].title}
                  </h4>
                  <p className="text-slate-650 text-xs font-medium leading-relaxed">
                    {MAVIO_SCREENS[activeScreenIndex].description}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── STRATEGIC ADVANTAGES ─────────────────────────────────── */}
        <div className="mb-28 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-200 text-xs font-mono font-bold text-violet-700">
              <TrendingUp size={14} />
              <span>BUSINESS & OPERATIONAL METRICS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900">
              Mavio’s Strategic Advantages
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Bridging transit metrics and passenger safety, saving institutions substantial monthly overheads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            
            {/* Card 1: Safety & Peace of Mind */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-150 text-indigo-650 flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  🛡️ Commuter Safety &amp; Parents' Peace of Mind
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Parents see exactly when the school bus will arrive at the stop. Eliminates school children standing outside during inclement weather, freezing mornings, or heavy rains. Route compliance alerts keep administrators in control.
                </p>
              </div>
            </div>

            {/* Card 2: Cost Savings */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-50 border border-violet-150 text-violet-650 flex items-center justify-center">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  💰 Predictive Odometer Maintenance Savings
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Neglecting oil changes, tire rotations, or brake pad wearing leads to severe mechanical breakdowns. Mavio’s automated odometer dashboard tracks mileage thresholds, scheduling maintenance beforehand to save thousands in heavy engine repair costs.
                </p>
              </div>
            </div>

            {/* Card 3: Zero Dedicated Hardware GPS */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-150 text-emerald-650 flex items-center justify-center">
                  <Cpu size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  ⚡ Zero Hardware Purchase &amp; Setup Cost
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Traditional bus tracking solutions mandate buying expensive dedicated GPS hardware boxes for every vehicle, accompanied by professional hardwiring installation. With Mavio, drivers simply use their existing smartphones—saving enormous initial expenses.
                </p>
              </div>
            </div>

            {/* Card 4: Zero SIM Data Recharges */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-150 text-blue-650 flex items-center justify-center">
                  <Smartphone size={24} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  📶 Zero SIM Cards Maintenance
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Eliminates the monthly admin hassle and recurring bills of purchasing, tracking, and recharging separate data SIM cards for 15+ tracking devices. Drivers run tracking directly through the companion app over their standard cell data plans.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM BANNER ────────────────────────────────────────── */}
        <div className="bg-gradient-to-tr from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black font-display leading-tight">
              Optimize Your Campus Transit Operations Today
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
              Equip fleet managers, commuters, and parents with Mavio's high-fidelity telemetry tracking. Launch in days with zero hardware investment.
            </p>
            <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=app.skillforge.mavio"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-900 text-white shadow-xl border border-slate-700/80 hover:border-slate-600 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.60889 1.77605C3.39343 2.00067 3.2666 2.34863 3.2666 2.78442V21.2154C3.2666 21.6512 3.39343 21.9992 3.60889 22.2238L3.68115 22.2891L13.8821 12.0881V11.9117L3.68115 1.71077L3.60889 1.77605Z" fill="#00A0FF" />
                  <path d="M17.2831 15.4892L13.8821 12.0881V11.9117L17.2831 8.51068L17.3553 8.55246L21.3857 10.8466C22.5361 11.4988 22.5361 12.5606 21.3857 13.2128L17.3553 15.507L17.2831 15.4892Z" fill="#FFCC00" />
                  <path d="M17.3553 15.4892L13.8821 12.0161L3.60889 22.2238C3.98779 22.6247 4.61914 22.6738 5.34033 22.2642L17.3553 15.4892Z" fill="#FF3A44" />
                  <path d="M17.3553 8.51068L5.34033 1.73566C4.61914 1.32611 3.98779 1.37518 3.60889 1.77605L13.8821 11.9838L17.3553 8.51068Z" fill="#00E676" />
                </svg>

                <div className="flex flex-col text-left leading-none">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-slate-400 font-bold">GET IT ON</span>
                  <span className="text-xs font-extrabold text-white leading-tight font-display tracking-tight mt-0.5">Google Play</span>
                </div>
              </a>

              <a
                href="https://mavio.skillforgetechnology.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-indigo-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                Book a Platform Tour
              </a>
              <Link
                href="/products"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors"
              >
                Back to Products Catalog
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
