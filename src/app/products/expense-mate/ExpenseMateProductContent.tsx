"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Wallet,
  Users,
  PieChart,
  Bell,
  Lock,
  ArrowRight,
  CheckCircle2,
  Smartphone,
  Shield,
  FileText,
  Sparkles,
  Zap,
  ChevronRight,
  ChevronLeft,
  Bot,
  Calendar,
  Layers,
  Star,
  Play,
  Pause,
  Ban,
  ShieldCheck,
  FileSpreadsheet
} from "lucide-react"

const APP_SCREENS = [
  {
    id: "dashboard",
    title: "Home Dashboard",
    category: "Overview Hub",
    description: "Instant summary of monthly spending, Quick Action shortcuts, group balances, and top spending category metrics.",
    image: "/Product/ExpenseMate/home-dashboard.jpg",
    badge: "Main Hub",
    highlights: ["Quick Action Shortcuts", "Group Debt Cards", "Spending Category Bars"]
  },
  {
    id: "analytics",
    title: "Analytics & Reports",
    category: "Visual Insights",
    description: "Interactive visual financial breakdown with Pie, Line, and Bar charts for monthly income, spending, and net savings.",
    image: "/Product/ExpenseMate/analytics-reports.jpg",
    badge: "Visual Charts",
    highlights: ["Pie & Bar Chart Toggles", "Income vs Spent Metrics", "Monthly Savings Percentage"]
  },
  {
    id: "log-expense",
    title: "Quick Expense Logging",
    category: "Fast Entry",
    description: "Log daily transactions in seconds with smart category pickers (Food, Travel, Shopping), merchant notes, and payment method choices.",
    image: "/Product/ExpenseMate/log-expense.jpg",
    badge: "Fast Entry",
    highlights: ["1-Tap Category Icons", "Merchant & Notes Field", "UPI / Card Payment Options"]
  },
  {
    id: "advisor-ai",
    title: "Advisor AI Financial Guru",
    category: "AI Insights",
    description: "Real-time AI financial advice analyzing your budget and spending history to guide daily purchase decisions.",
    image: "/Product/ExpenseMate/advisor-ai.jpg",
    badge: "AI Powered",
    highlights: ["Budget-Aware Advice", "Real-Time Savings Calculations", "Smart Purchase Guard"]
  },
  {
    id: "create-group",
    title: "Create Expense Group",
    category: "Group Split",
    description: "Create shared expense groups for trips, apartments, or events. Add members and calculate equal or custom net balances.",
    image: "/Product/ExpenseMate/create-group.jpg",
    badge: "Create Group",
    highlights: ["Trip & Roommate Groups", "Member Search", "Custom Group Branding"]
  },
  {
    id: "group-details",
    title: "Inside Group Ledger",
    category: "Group Split",
    description: "View group transactions, member balances, individual shares, and trigger instant settlements.",
    image: "/Product/ExpenseMate/group-details.jpg",
    badge: "Group Ledger",
    highlights: ["Per-Person Share Calculation", "Settled Badges", "Add Group Expense Button"]
  },
  {
    id: "group-settlement",
    title: "Settlement Summary",
    category: "Group Split",
    description: "Automated net balance calculations showing who owes whom with 1-tap settlement actions.",
    image: "/Product/ExpenseMate/group-settlement.jpg",
    badge: "Net Settlement",
    highlights: ["Simplified Debts", "Net Balances Display", "1-Tap Settle All"]
  },
  {
    id: "transaction-history",
    title: "Transaction Ledger",
    category: "Full History",
    description: "Comprehensive transaction history ledger with search filters, date sorting, and category breakdowns.",
    image: "/Product/ExpenseMate/transaction-history.jpg",
    badge: "Full Ledger",
    highlights: ["Merchant & Note Search", "Date Range Sorting", "Edit & Delete Options"]
  },
  {
    id: "planner-calendar",
    title: "Planner & Calendar",
    category: "Due Alerts",
    description: "Interactive calendar view for recurring subscriptions, upcoming bills, and payment due notifications.",
    image: "/Product/ExpenseMate/planner-calendar.jpg",
    badge: "Due Reminders",
    highlights: ["Interactive Calendar View", "Subscription Trackers", "Automated Due Reminders"]
  },
  {
    id: "profile-settings",
    title: "Security & Preferences",
    category: "Biometric Vault",
    description: "Biometric Vault unlock (Fingerprint/FaceID), Dark Theme toggle, currency settings, and savings goals.",
    image: "/Product/ExpenseMate/profile-settings.jpg",
    badge: "Biometric Vault",
    highlights: ["Fingerprint / FaceID Lock", "Dark Mode Toggle", "Multi-Currency Settings"]
  },
]

const GROUP_SLIDES = [
  {
    image: "/Product/ExpenseMate/create-group.jpg",
    title: "1. Create Group",
    desc: "Set up shared groups for trips or roommates"
  },
  {
    image: "/Product/ExpenseMate/group-details.jpg",
    title: "2. Track Group Bills",
    desc: "Log shared transactions & view member shares"
  },
  {
    image: "/Product/ExpenseMate/group-settlement.jpg",
    title: "3. Settle Up",
    desc: "1-tap net balance settlements with 0 math"
  }
]

const DIFFERENTIATORS = [
  {
    icon: Ban,
    title: "100% Ad-Free Experience",
    desc: "No annoying pop-ups, video ads, or banner clutter. Enjoy a peaceful, clean financial workspace focused purely on saving money.",
    badge: "Zero Ads",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    icon: ShieldCheck,
    title: "Biometric Vault Security",
    desc: "Keep your income, personal expenses, and group balances locked behind hardware-encrypted Fingerprint and FaceID biometric authentication.",
    badge: "Bank Grade",
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    icon: Bot,
    title: "Advisor AI Financial Guru",
    desc: "Ask real-world financial questions ('Can I buy shoes today?') and get intelligent answers based on live net budget calculations.",
    badge: "AI Powered",
    color: "bg-purple-50 text-purple-600 border-purple-200"
  },
  {
    icon: Users,
    title: "Unified Wallet & Group Splitter",
    desc: "No need to switch between multiple apps. Track daily coffee runs and split apartment rent or vacation bills seamlessly in one app.",
    badge: "All-In-One",
    color: "bg-teal-50 text-teal-600 border-teal-200"
  },
  {
    icon: Zap,
    title: "Zero Subscription Paywalls",
    desc: "Create unlimited groups, log unlimited transactions, and generate unlimited analytics reports without restrictive feature lockouts.",
    badge: "Unlimited",
    color: "bg-amber-50 text-amber-600 border-amber-200"
  },
  {
    icon: FileSpreadsheet,
    title: "Instant Export & Portability",
    desc: "Export your formatted transaction ledgers into clean PDF or Excel spreadsheets anytime for personal auditing or tax records.",
    badge: "PDF / Excel",
    color: "bg-indigo-50 text-indigo-600 border-indigo-200"
  }
]

export default function ExpenseMateProductContent() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Group spotlight sub-carousel index state
  const [groupSlideIndex, setGroupSlideIndex] = useState(0)

  // Auto-play main carousel timer
  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % APP_SCREENS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isPlaying])

  // Auto-loop timer for Group Split Spotlight (3 screens transition)
  useEffect(() => {
    const groupTimer = setInterval(() => {
      setGroupSlideIndex((prev) => (prev + 1) % GROUP_SLIDES.length)
    }, 3200)
    return () => clearInterval(groupTimer)
  }, [])

  const currentScreen = APP_SCREENS[activeSlide]

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % APP_SCREENS.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + APP_SCREENS.length) % APP_SCREENS.length)
  }

  return (
    <div className="relative bg-slate-50/60 text-slate-800 font-sans overflow-x-hidden bg-dot-pattern pt-28 pb-24">

      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-blue-600 font-bold">ExpenseMate</span>
        </div>

        {/* ── HERO SECTION ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">

          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200/90 bg-blue-50/90 backdrop-blur-md text-xs font-mono font-bold text-blue-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SMART PERSONAL FINANCE APP</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-semibold"></span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-display text-slate-900 leading-[1.1]">
              Master Your Money. <br />
              <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-600 bg-clip-text text-transparent font-black">
                Split Group Bills Effortlessly.
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium max-w-xl">
              ExpenseMate brings personal finance tracking, group bill splitting, and intelligent AI advisor guidance into one beautifully crafted mobile experience.
            </p>

            {/* Key Benefit Pills */}
            <div className="grid grid-cols-2 gap-3 max-w-lg text-xs font-semibold text-slate-700 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>100% Ad-Free &amp; Private</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Zero-Conflict Group Splitter</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Visual Pie &amp; Bar Analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Advisor AI Financial Guru</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Biometric Vault Security</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <span>Instant PDF &amp; Excel Exports</span>
              </div>
            </div>

            {/* Hero CTA */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {/* Official Google Play Store Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-950 text-white shadow-xl border border-slate-800 hover:border-slate-700 transition-all">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.60889 1.77605C3.39343 2.00067 3.2666 2.34863 3.2666 2.78442V21.2154C3.2666 21.6512 3.39343 21.9992 3.60889 22.2238L3.68115 22.2891L13.8821 12.0881V11.9117L3.68115 1.71077L3.60889 1.77605Z" fill="#00A0FF" />
                  <path d="M17.2831 15.4892L13.8821 12.0881V11.9117L17.2831 8.51068L17.3553 8.55246L21.3857 10.8466C22.5361 11.4988 22.5361 12.5606 21.3857 13.2128L17.3553 15.507L17.2831 15.4892Z" fill="#FFCC00" />
                  <path d="M17.3553 15.4892L13.8821 12.0161L3.60889 22.2238C3.98779 22.6247 4.61914 22.6738 5.34033 22.2642L17.3553 15.4892Z" fill="#FF3A44" />
                  <path d="M17.3553 8.51068L5.34033 1.73566C4.61914 1.32611 3.98779 1.37518 3.60889 1.77605L13.8821 11.9838L17.3553 8.51068Z" fill="#00E676" />
                </svg>

                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">GET IT ON</span>
                  <span className="text-sm font-extrabold text-white leading-tight font-display tracking-tight mt-0.5">Google Play</span>
                </div>

                <span className="ml-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                  Launching Soon
                </span>
              </div>
              <a
                href="#app-showcase"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <span>Explore App Features</span>
                <ChevronRight size={16} />
              </a>
            </div>
          </div>

          {/* Hero Visual 3D Mobile Phone Showcase (WITH HOVER FAN-OUT EXPANSION ANIMATION) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative flex justify-center items-center cursor-pointer group"
          >
            <motion.div
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative w-full max-w-[340px] sm:max-w-[380px]"
            >

              {/* Left Phone (Analytics) - Fans Out Left on Hover */}
              <motion.div
                variants={{
                  rest: { x: 0, rotate: -12, scale: 0.95, opacity: 0.85 },
                  hover: { x: -85, rotate: -22, scale: 1, opacity: 1 }
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute -left-12 top-6 w-[240px] sm:w-[260px] pointer-events-none hidden sm:block z-0"
              >
                <div className="rounded-[40px] bg-slate-900 p-2 shadow-2xl border-4 border-slate-800">
                  <div className="rounded-[32px] overflow-hidden bg-white aspect-[9/19.5]">
                    <Image
                      src="/Product/ExpenseMate/analytics-reports.jpg"
                      alt="ExpenseMate Analytics"
                      width={300}
                      height={650}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right Phone (Log Expense) - Fans Out Right on Hover */}
              <motion.div
                variants={{
                  rest: { x: 0, rotate: 12, scale: 0.95, opacity: 0.85 },
                  hover: { x: 85, rotate: 22, scale: 1, opacity: 1 }
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="absolute -right-12 top-10 w-[240px] sm:w-[260px] pointer-events-none hidden sm:block z-0"
              >
                <div className="rounded-[40px] bg-slate-900 p-2 shadow-2xl border-4 border-slate-800">
                  <div className="rounded-[32px] overflow-hidden bg-white aspect-[9/19.5]">
                    <Image
                      src="/Product/ExpenseMate/log-expense.jpg"
                      alt="ExpenseMate Log Expense"
                      width={300}
                      height={650}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Center Main Phone Mockup - Scales Slightly on Hover */}
              <motion.div
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.05 }
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative z-10 rounded-[44px] bg-slate-950 p-2.5 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)] border-[6px] border-slate-900"
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-900" />
                </div>
                <div className="rounded-[36px] overflow-hidden bg-white aspect-[9/19.5] relative">
                  <Image
                    src="/Product/ExpenseMate/home-dashboard.jpg"
                    alt="ExpenseMate Home Dashboard"
                    width={360}
                    height={780}
                    priority
                    className="object-cover w-full h-full"
                  />
                </div>
              </motion.div>

              {/* Ambient Floating Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/25 to-teal-400/25 blur-3xl -z-10 rounded-full" />
            </motion.div>
          </motion.div>

        </div>

        {/* ── WHAT MAKES EXPENSEMATE DIFFERENT ────────────────────── */}
        <div className="mb-28 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono font-bold text-emerald-700">
              <Sparkles size={14} />
              <span>THE EXPENSEMATE ADVANTAGE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900">
              What Makes ExpenseMate Different?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Built from the ground up to solve the frustrations of traditional finance tracking and bill splitting apps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {DIFFERENTIATORS.map((diff, i) => {
              const IconComp = diff.icon
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all space-y-4 group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${diff.color}`}>
                        <IconComp size={24} />
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-bold border border-slate-200">
                        {diff.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 font-display group-hover:text-blue-600 transition-colors">
                        {diff.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed mt-2 font-medium">
                        {diff.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── ANIMATED INTERACTIVE SCREEN CAROUSEL SHOWCASE ────────── */}
        <div id="app-showcase" className="mb-28 space-y-10 scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-mono font-bold text-blue-650">
              <Sparkles size={14} />
              <span>DYNAMIC INTERACTIVE CAROUSEL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display text-slate-900">
              Explore ExpenseMate in Action
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-medium">
              Watch real app interface screens transition smoothly or use the controls below to inspect each feature.
            </p>
          </div>

          {/* Screen Thumbnails Navigation Bar */}
          <div className="flex flex-wrap justify-center gap-2 font-mono text-xs max-w-5xl mx-auto">
            {APP_SCREENS.map((screen, idx) => {
              const isActive = idx === activeSlide
              return (
                <button
                  key={screen.id}
                  onClick={() => {
                    setActiveSlide(idx)
                    setIsPlaying(false)
                  }}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 border border-slate-200/90 hover:bg-slate-50"
                    }`}
                >
                  <span className="text-[10px] opacity-75">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  <span>{screen.title}</span>
                </button>
              )
            })}
          </div>

          {/* MAIN ANIMATED STAGE */}
          <div
            className="p-6 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Left Context Information */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScreen.id + "-info"}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-200">
                      {currentScreen.category}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
                      {currentScreen.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
                    {currentScreen.title}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                    {currentScreen.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Key Highlights</div>
                    <div className="space-y-1.5 font-sans text-xs sm:text-sm font-semibold text-slate-700">
                      {currentScreen.highlights.map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls & Progress Bar */}
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                    aria-label="Previous Screen"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-sm"
                    aria-label="Next Screen"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all flex items-center justify-center cursor-pointer shadow-sm ml-2"
                    aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                </div>

                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                  {activeSlide + 1} / {APP_SCREENS.length}
                </span>
              </div>
            </div>

            {/* Right Animated Mobile Phone Display */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <div className="w-full max-w-[280px] sm:max-w-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreen.id + "-phone"}
                    initial={{ opacity: 0, scale: 0.92, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -15 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-[44px] bg-slate-950 p-2.5 border-[6px] border-slate-900 shadow-2xl overflow-hidden relative"
                  >
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-3.5 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                    </div>

                    <div className="rounded-[36px] overflow-hidden bg-white aspect-[9/19.5] relative">
                      <Image
                        src={currentScreen.image}
                        alt={currentScreen.title}
                        width={320}
                        height={690}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ── DEEP FEATURE POSTER HIGHLIGHT CARDS ─────────────────── */}
        <div className="mb-28 space-y-16 text-left">

          {/* Spotlight 1: Advisor AI */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-xs font-mono font-bold">
                <Bot size={14} />
                <span>INTELLIGENT FINANCIAL ADVISOR</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                Ask Advisor AI: &quot;Can I Buy Shoes Today?&quot;
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                ExpenseMate comes equipped with a real-time AI Financial Guru that analyzes your database transactions and budget limits. Ask real-world financial questions like &quot;Can I go to Goa?&quot; or &quot;Can I eat biryani today?&quot; and get instant, intelligent guidance based on your actual net savings!
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-slate-800 text-slate-200 font-bold">● Budget Aware</span>
                <span className="px-3 py-1 rounded bg-slate-800 text-slate-200 font-bold">● Real-time Savings Analysis</span>
                <span className="px-3 py-1 rounded bg-slate-800 text-slate-200 font-bold">● Smart Decision Guard</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[260px] rounded-[36px] bg-slate-950 p-2 border-4 border-slate-800 shadow-2xl overflow-hidden">
                <Image
                  src="/Product/ExpenseMate/advisor-ai.jpg"
                  alt="ExpenseMate Advisor AI"
                  width={260}
                  height={560}
                  className="object-cover rounded-[28px]"
                />
              </div>
            </div>
          </div>

          {/* Spotlight 2: Group Split Engine (WITH 3-SCREEN ANIMATED AUTO-LOOP CAROUSEL) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 text-white shadow-xl relative overflow-hidden">

            {/* Left/Right Mobile Phone Display (With Smooth 3-Screen Auto Loop) */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center order-2 lg:order-1">
              <div className="relative w-full max-w-[260px]">
                <div className="rounded-[40px] bg-slate-950 p-2 border-4 border-blue-900 shadow-2xl overflow-hidden relative">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-3 bg-slate-950 rounded-full z-30 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-900" />
                  </div>

                  <div className="rounded-[32px] overflow-hidden bg-white aspect-[9/19.5] relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={GROUP_SLIDES[groupSlideIndex].image}
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={GROUP_SLIDES[groupSlideIndex].image}
                          alt={GROUP_SLIDES[groupSlideIndex].title}
                          fill
                          sizes="300px"
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Group Loop Dots Indicator */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  {GROUP_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setGroupSlideIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === groupSlideIndex ? "w-6 bg-cyan-400" : "w-2 bg-slate-600 hover:bg-slate-400"
                        }`}
                      aria-label={`Go to group screen ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Information Section */}
            <div className="lg:col-span-7 space-y-5 text-left order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-400/40 text-blue-200 text-xs font-mono font-bold">
                <Users size={14} />
                <span>GROUP SPLIT ENGINE • 3-SCREEN WORKFLOW</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                Zero-Conflict Group Expenses
              </h2>
              <p className="text-blue-100 text-sm leading-relaxed font-medium">
                Whether sharing apartment rent, splitting restaurant bills, or tracking group vacation costs, ExpenseMate handles the full workflow: group creation, individual transaction shares, and automated net settlements.
              </p>

              {/* Active Step Highlight Box */}
              <div className="p-4 rounded-2xl bg-blue-950/80 border border-blue-800/80 backdrop-blur-md text-xs font-mono space-y-1">
                <div className="text-cyan-300 font-bold uppercase tracking-wider">
                  ACTIVE STEP {groupSlideIndex + 1}: {GROUP_SLIDES[groupSlideIndex].title}
                </div>
                <div className="text-slate-300">
                  {GROUP_SLIDES[groupSlideIndex].desc}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded bg-blue-950/90 text-blue-200 font-bold border border-blue-800/80">● Equal &amp; Custom Splits</span>
                <span className="px-3 py-1 rounded bg-blue-950/90 text-blue-200 font-bold border border-blue-800/80">● Per-Member Shares</span>
                <span className="px-3 py-1 rounded bg-blue-950/90 text-blue-200 font-bold border border-blue-800/80">● 1-Tap Net Settlement</span>
              </div>
            </div>
          </div>

        </div>

        {/* ── APP POSTER BANNER ───────────────────────────────────── */}
        <div className="mb-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-650 via-indigo-600 to-blue-700 text-white text-center shadow-2xl relative overflow-hidden space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black font-display">
              Ready to Simplify Your Financial Life?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base font-medium">
              ExpenseMate is finishing Google Play Store certification. Stay tuned for official download availability!
            </p>
          </div>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-950 text-white shadow-2xl border border-slate-800">
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.60889 1.77605C3.39343 2.00067 3.2666 2.34863 3.2666 2.78442V21.2154C3.2666 21.6512 3.39343 21.9992 3.60889 22.2238L3.68115 22.2891L13.8821 12.0881V11.9117L3.68115 1.71077L3.60889 1.77605Z" fill="#00A0FF" />
                <path d="M17.2831 15.4892L13.8821 12.0881V11.9117L17.2831 8.51068L17.3553 8.55246L21.3857 10.8466C22.5361 11.4988 22.5361 12.5606 21.3857 13.2128L17.3553 15.507L17.2831 15.4892Z" fill="#FFCC00" />
                <path d="M17.3553 15.4892L13.8821 12.0161L3.60889 22.2238C3.98779 22.6247 4.61914 22.6738 5.34033 22.2642L17.3553 15.4892Z" fill="#FF3A44" />
                <path d="M17.3553 8.51068L5.34033 1.73566C4.61914 1.32611 3.98779 1.37518 3.60889 1.77605L13.8821 11.9838L17.3553 8.51068Z" fill="#00E676" />
              </svg>

              <div className="flex flex-col text-left leading-none">
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">GET IT ON</span>
                <span className="text-sm font-extrabold text-white leading-tight font-display tracking-tight mt-0.5">Google Play</span>
              </div>

              <span className="ml-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                Launching Soon
              </span>
            </div>
          </div>
        </div>

        {/* ── FOOTER LEGAL & PRIVACY POLICY SECTION ───────────────── */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 SkillForge Technology. ExpenseMate Mobile App.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy/expense-mate" className="hover:text-blue-600 transition-colors font-bold underline">
              ExpenseMate Privacy Policy
            </Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">
              Global Privacy
            </Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
