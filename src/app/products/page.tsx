import { Metadata } from "next"
import Link from "next/link"
import { Cpu, Wallet, Navigation, ArrowRight, Sparkles, Shield, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Flagship Products | SkillForge Technologies",
  description: "Discover flagship consumer products developed by SkillForge Technologies, including Active Pulse workspace companion and ExpenseMate financial manager.",
}

export default function ProductsHubPage() {
  return (
    <div className="relative bg-slate-50/50 pt-28 pb-24 text-slate-800 font-sans min-h-screen bg-dot-pattern">

      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Block */}
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-mono font-bold text-blue-700">
            <Sparkles size={14} />
            <span>COMPANY PRODUCTS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-display text-slate-900 leading-tight">
            Flagship Products &amp; Solutions
          </h1>
          <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
            Explore our proprietary digital products engineered to deliver seamless personal productivity and group financial management.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">

          {/* Product 1: Active Pulse */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-blue-300 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                  <Cpu size={28} />
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-mono font-bold border border-blue-200">
                  Workspace Device
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold font-display text-slate-900 group-hover:text-blue-650 transition-colors">
                  Active Pulse
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-2 font-medium">
                  Smart workspace anti-idle device and companion mobile app for automated presence simulation and workflow execution.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs font-mono text-slate-600">
                <span className="px-2.5 py-1 rounded bg-slate-100 font-semibold">Anti-Idle Automation</span>
                <span className="px-2.5 py-1 rounded bg-slate-100 font-semibold">Bluetooth Wireless</span>
                <span className="px-2.5 py-1 rounded bg-slate-100 font-semibold">Mobile Companion</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/products/active-pulse"
                className="inline-flex items-center gap-2 text-xs font-extrabold text-blue-600 uppercase tracking-wider group-hover:gap-3 transition-all"
              >
                <span>Explore Active Pulse</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Product 2: ExpenseMate */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-emerald-300 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Wallet size={28} />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-mono font-bold border border-emerald-200">
                  Personal Finance App
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold font-display text-slate-900 group-hover:text-emerald-700 transition-colors">
                  ExpenseMate
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-2 font-medium">
                  Smart personal budget manager and group bill splitter. Track daily income/expenses, monitor budgets, and settle group balances in real-time.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs font-mono text-slate-600">
                <span className="px-2.5 py-1 rounded bg-slate-100 font-semibold">1-Tap Expense Tracker</span>
                <span className="px-2.5 py-1 rounded bg-slate-100 font-semibold">Advisor AI Insights</span>
                <span className="px-2.5 py-1 rounded bg-slate-100 font-semibold">Group Bill Splitter</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/products/expense-mate"
                className="inline-flex items-center gap-2 text-xs font-extrabold text-emerald-600 uppercase tracking-wider group-hover:gap-3 transition-all"
              >
                <span>Explore ExpenseMate</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Product 3: Mavio */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col justify-between space-y-6 hover:shadow-xl hover:border-indigo-300 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Navigation size={28} className="rotate-45" />
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-mono font-bold border border-indigo-200">
                  Campus Transit Platform
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-extrabold font-display text-slate-900 group-hover:text-indigo-650 transition-colors">
                  Mavio
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mt-2 font-medium">
                  Smart campus transit &amp; fleet intelligence platform. Real-time GPS vehicle tracking, dynamic ETAs, offline resilience, and odometer-based maintenance.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs font-mono text-slate-600">
                <span className="px-2.5 py-1 rounded bg-slate-100 font-semibold">Real-Time Telemetry</span>
                <span className="px-2.5 py-1 rounded bg-slate-100 font-semibold">Dynamic ETA HUD</span>
                <span className="px-2.5 py-1 rounded bg-slate-100 font-semibold">Fleet Caps Control</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/products/mavio"
                className="inline-flex items-center gap-2 text-xs font-extrabold text-indigo-600 uppercase tracking-wider group-hover:gap-3 transition-all"
              >
                <span>Explore Mavio</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
