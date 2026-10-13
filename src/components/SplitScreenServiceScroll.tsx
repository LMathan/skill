"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  ArrowRight, Globe, Sparkles, Smartphone, Cpu, 
  TrendingUp, Shield, Zap, Activity, CheckCircle2,
  Server, Layers, RefreshCw, BarChart3, Wifi
} from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// ── Domain Architecture Specifications ─────────────────────────────────
interface DomainItem {
  id: string
  number: string
  shortLabel: string
  badgeLabel: string
  title: string
  tagline: string
  statement: string
  href: string
  category: "cloud" | "ai" | "mobile" | "iot" | "seo"
  glowColor: string
  badgeClass: string
  accentGradient: string
  buttonClass: string
  borderGradient: string
  stat1: { value: string; label: string }
  stat2: { value: string; label: string }
}

const DOMAINS: DomainItem[] = [
  {
    id: "cloud",
    number: "01",
    shortLabel: "01 Cloud",
    badgeLabel: "DOMAIN 01 // CLOUD ARCHITECTURE",
    title: "Web Engineering & Cloud Architecture",
    tagline: "Zero Downtime. Infinite Scale.",
    statement: "Ultra-scalable distributed microservices, serverless edge runtimes, and multi-region database clusters engineered for zero-downtime enterprise velocity.",
    href: "/services/software-development",
    category: "cloud",
    glowColor: "rgba(59, 130, 246, 0.45)",
    badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    accentGradient: "from-blue-400 via-cyan-300 to-indigo-300",
    buttonClass: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/30",
    borderGradient: "from-blue-500/50 via-cyan-400/30 to-indigo-500/20",
    stat1: { value: "32ms", label: "Global Edge TTFB" },
    stat2: { value: "99.99%", label: "Uptime SLA" },
  },
  {
    id: "ai",
    number: "02",
    shortLabel: "02 AI",
    badgeLabel: "DOMAIN 02 // NEURAL PIPELINES",
    title: "Autonomous AI Agents & Neural Pipelines",
    tagline: "AI That Executes, Not Just Chats.",
    statement: "Enterprise autonomous multi-agent orchestration, high-dimensional vector search embeddings, and sub-second inference pipelines that automate mission-critical operations.",
    href: "/services/ai-solutions",
    category: "ai",
    glowColor: "rgba(16, 185, 129, 0.45)",
    badgeClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    accentGradient: "from-emerald-400 via-teal-300 to-cyan-300",
    buttonClass: "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30",
    borderGradient: "from-emerald-500/50 via-teal-400/30 to-cyan-500/20",
    stat1: { value: "115ms", label: "Neural Retrieval" },
    stat2: { value: "99.6%", label: "Semantic Accuracy" },
  },
  {
    id: "mobile",
    number: "03",
    shortLabel: "03 Mobile",
    badgeLabel: "DOMAIN 03 // NATIVE FLUIDITY",
    title: "Cross-Platform Mobile Ecosystems",
    tagline: "120 FPS Native Fluidity.",
    statement: "Hardware-accelerated iOS & Android applications with offline-first SQLite synchronization, biometric security bridges, and zero frame stutter on dynamic gestures.",
    href: "/services/mobile-development",
    category: "mobile",
    glowColor: "rgba(168, 85, 247, 0.45)",
    badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    accentGradient: "from-purple-400 via-pink-300 to-rose-300",
    buttonClass: "bg-purple-600 hover:bg-purple-500 shadow-purple-500/30",
    borderGradient: "from-purple-500/50 via-pink-400/30 to-indigo-500/20",
    stat1: { value: "120 FPS", label: "Impeller Cadence" },
    stat2: { value: "0.1s", label: "Touch Latency" },
  },
  {
    id: "iot",
    number: "04",
    shortLabel: "04 IoT",
    badgeLabel: "DOMAIN 04 // EMBEDDED EDGE",
    title: "Industrial IoT & Hardware Firmware",
    tagline: "Sub-Millisecond Edge Telemetry.",
    statement: "Bare-metal C/C++ embedded firmware, real-time MQTT streams, and industrial sensor networks built with local edge fail-safes and remote telemetry instrumentation.",
    href: "/services/iot-embedded",
    category: "iot",
    glowColor: "rgba(245, 158, 11, 0.45)",
    badgeClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    accentGradient: "from-amber-400 via-orange-300 to-red-300",
    buttonClass: "bg-amber-600 hover:bg-amber-500 shadow-amber-500/30",
    borderGradient: "from-amber-500/50 via-orange-400/30 to-red-500/20",
    stat1: { value: "6ms", label: "Telemetry Ping" },
    stat2: { value: "100%", label: "Packet Reliability" },
  },
  {
    id: "seo",
    number: "05",
    shortLabel: "05 SEO",
    badgeLabel: "DOMAIN 05 // SEARCH DOMINANCE",
    title: "Growth Engineering & Technical SEO",
    tagline: "100/100 Core Web Vitals Dominance.",
    statement: "Algorithmic search dominance, programmatic schema automation, and sub-second LCP optimization engineered to systematically capture high-intent commercial traffic.",
    href: "/services/seo-marketing",
    category: "seo",
    glowColor: "rgba(244, 63, 94, 0.45)",
    badgeClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    accentGradient: "from-rose-400 via-pink-300 to-violet-300",
    buttonClass: "bg-rose-600 hover:bg-rose-500 shadow-rose-500/30",
    borderGradient: "from-rose-500/50 via-pink-400/30 to-violet-500/20",
    stat1: { value: "100/100", label: "Lighthouse Score" },
    stat2: { value: "+160%", label: "Organic Velocity" },
  },
]

// ── 3D Visual Centerpieces (No plain text tables - pure visual power) ───

function CloudVisual() {
  return (
    <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#080d1a]/80 border border-blue-500/30 backdrop-blur-2xl">
      {/* Radiant Atmospheric Halo */}
      <div className="absolute w-80 h-80 rounded-full bg-blue-500/30 blur-3xl pointer-events-none" />
      <div className="absolute w-52 h-52 rounded-full bg-cyan-400/25 blur-2xl pointer-events-none" />

      {/* Cybernetic Isometric Mesh Vectors */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full absolute inset-0 object-cover opacity-50 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cloud-mesh-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {/* Generative contour ribbons */}
        <path
          d="M 0,380 C 180,260 340,490 560,360 C 760,240 840,420 900,340 L 900,600 L 0,600 Z"
          fill="url(#cloud-mesh-grad)"
        />
        <path
          d="M 0,280 C 220,160 380,390 600,260 C 780,150 860,320 900,240"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeDasharray="6 8"
          opacity="0.6"
        />
      </svg>

      {/* 3D Global Edge Cluster Sphere & Live Nodes */}
      <div className="relative z-10 w-full max-w-[360px] p-6 rounded-2xl bg-slate-950/90 border border-blue-400/40 shadow-2xl backdrop-blur-3xl space-y-4">
        {/* Rotating Holographic Radar */}
        <div className="flex items-center justify-between pb-3 border-b border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
              <Globe className="w-5 h-5 animate-pulse" />
              <div className="absolute inset-0 rounded-xl border border-blue-400/40 animate-ping opacity-30" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white tracking-wide">Global Edge Mesh</div>
              <div className="text-[10px] font-mono text-cyan-400">Multi-Region Routing Active</div>
            </div>
          </div>
          <span className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            99.99% SLA
          </span>
        </div>

        {/* Live Region Latency Gauges */}
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              US-East (N. Virginia)
            </span>
            <span className="text-cyan-400 font-bold">12ms TTFB</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              EU-Central (Frankfurt)
            </span>
            <span className="text-cyan-400 font-bold">24ms TTFB</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              AP-South (Mumbai)
            </span>
            <span className="text-cyan-400 font-bold">38ms TTFB</span>
          </div>
        </div>

        {/* Real-time Throughput Gauge */}
        <div className="pt-1">
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span>Throughput Volume:</span>
            <span className="text-blue-400 font-bold">4.8 GB/s</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="w-[88%] h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_10px_#38bdf8]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function AiVisual() {
  return (
    <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#04140e]/80 border border-emerald-500/30 backdrop-blur-2xl">
      <div className="absolute w-80 h-80 rounded-full bg-emerald-500/30 blur-3xl pointer-events-none" />
      <div className="absolute w-52 h-52 rounded-full bg-teal-400/25 blur-2xl pointer-events-none" />

      {/* Neural Synapse Vector Connections */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full absolute inset-0 object-cover opacity-50 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,350 C 240,460 360,220 600,340 C 780,440 840,240 900,320 L 900,600 L 0,600 Z"
          fill="#064e3b"
          opacity="0.3"
        />
        <path
          d="M 0,220 C 280,320 380,120 640,230 C 820,320 860,160 900,240"
          fill="none"
          stroke="#34d399"
          strokeWidth="2"
          strokeDasharray="8 6"
          opacity="0.6"
        />
        <circle cx="280" cy="320" r="6" fill="#34d399" filter="drop-shadow(0 0 8px #34d399)" />
        <circle cx="640" cy="230" r="8" fill="#10b981" filter="drop-shadow(0 0 10px #10b981)" />
      </svg>

      {/* 3D Holographic Neural Reasoning Core */}
      <div className="relative z-10 w-full max-w-[360px] p-6 rounded-2xl bg-slate-950/90 border border-emerald-400/40 shadow-2xl backdrop-blur-3xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <Sparkles className="w-5 h-5 animate-spin [animation-duration:12s]" />
              <div className="absolute inset-0 rounded-xl border border-emerald-400/40 animate-ping opacity-30" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white tracking-wide">Neural RAG Engine</div>
              <div className="text-[10px] font-mono text-emerald-400">1,536-dim Embedding Space</div>
            </div>
          </div>
          <span className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            REASONING
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300">Vector Cosine Match</span>
            <span className="text-emerald-400 font-bold">0.984 Score</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300">Semantic Search Speed</span>
            <span className="text-teal-400 font-bold">115ms Sub-second</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300">Autonomous Tool Calls</span>
            <span className="text-emerald-400 font-bold">Verified Zero-Hallucination</span>
          </div>
        </div>

        <div className="pt-1">
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span>Accuracy Confidence:</span>
            <span className="text-emerald-400 font-bold">99.6%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="w-[99.6%] h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_10px_#34d399]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileVisual() {
  return (
    <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#0f071a]/80 border border-purple-500/30 backdrop-blur-2xl">
      <div className="absolute w-80 h-80 rounded-full bg-purple-500/30 blur-3xl pointer-events-none" />
      <div className="absolute w-52 h-52 rounded-full bg-pink-400/25 blur-2xl pointer-events-none" />

      {/* 120Hz Kinetic Motion Ribbons */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full absolute inset-0 object-cover opacity-50 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,330 C 190,210 370,440 580,310 C 760,190 840,380 900,310 L 900,600 L 0,600 Z"
          fill="#3b0764"
          opacity="0.3"
        />
        <path
          d="M 0,240 C 220,130 380,360 600,230 C 780,120 860,300 900,230"
          fill="none"
          stroke="#c084fc"
          strokeWidth="2"
          strokeDasharray="6 6"
          opacity="0.6"
        />
      </svg>

      {/* 3D Glass Smartphone Device Frame Mockup */}
      <div className="relative z-10 w-full max-w-[360px] p-6 rounded-2xl bg-slate-950/90 border border-purple-400/40 shadow-2xl backdrop-blur-3xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]">
              <Smartphone className="w-5 h-5" />
              <div className="absolute inset-0 rounded-xl border border-purple-400/40 animate-ping opacity-30" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white tracking-wide">120 FPS Motion Cadence</div>
              <div className="text-[10px] font-mono text-purple-400">Impeller / Skia Native Bridge</div>
            </div>
          </div>
          <span className="px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-[10px] font-mono font-bold text-purple-400">
            120 FPS
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300">Gesture Response Latency</span>
            <span className="text-pink-400 font-bold">8ms Sub-Frame</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300">Offline SQLite Sync</span>
            <span className="text-purple-400 font-bold">Zero-Lag Caching</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300">Biometric Auth Verification</span>
            <span className="text-purple-400 font-bold">Secure Enclave Bridge</span>
          </div>
        </div>

        <div className="pt-1">
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span>Stutter Metric:</span>
            <span className="text-purple-400 font-bold">0.00% Dropped Frames</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="w-[100%] h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full shadow-[0_0_10px_#c084fc]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function IotVisual() {
  return (
    <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#140b03]/80 border border-amber-500/30 backdrop-blur-2xl">
      <div className="absolute w-80 h-80 rounded-full bg-amber-500/30 blur-3xl pointer-events-none" />
      <div className="absolute w-52 h-52 rounded-full bg-orange-400/25 blur-2xl pointer-events-none" />

      {/* Cybernetic Telemetry Heat Waves */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full absolute inset-0 object-cover opacity-50 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,360 C 210,480 380,240 600,360 C 780,470 850,260 900,340 L 900,600 L 0,600 Z"
          fill="#451a03"
          opacity="0.3"
        />
        <path
          d="M 0,220 L 260,220 L 290,160 L 320,280 L 350,180 L 380,240 L 410,220 L 800,220"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="2.5"
          opacity="0.8"
        />
      </svg>

      {/* 3D Telemetry Terminal & Oscilloscope Grid */}
      <div className="relative z-10 w-full max-w-[360px] p-6 rounded-2xl bg-slate-950/90 border border-amber-400/40 shadow-2xl backdrop-blur-3xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
              <Cpu className="w-5 h-5" />
              <div className="absolute inset-0 rounded-xl border border-amber-400/40 animate-ping opacity-30" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white tracking-wide">Bare-Metal Telemetry</div>
              <div className="text-[10px] font-mono text-amber-400">ESP32 / FreeRTOS RTOS Core</div>
            </div>
          </div>
          <span className="px-2 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            LIVE MQTT
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300">Round-Trip Latency</span>
            <span className="text-amber-400 font-bold">6ms Edge Ping</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300">Protocol Stream</span>
            <span className="text-orange-400 font-bold">MQTT v3.1.1 TLS</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300">Local Fail-Safe State</span>
            <span className="text-amber-400 font-bold">Redundant Watchdog</span>
          </div>
        </div>

        <div className="pt-1">
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span>Packet Integrity:</span>
            <span className="text-amber-400 font-bold">100.0% No Loss</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="w-[100%] h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full shadow-[0_0_10px_#fbbf24]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SeoVisual() {
  return (
    <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] flex items-center justify-center overflow-hidden rounded-2xl bg-[#140409]/80 border border-rose-500/30 backdrop-blur-2xl">
      <div className="absolute w-80 h-80 rounded-full bg-rose-500/30 blur-3xl pointer-events-none" />
      <div className="absolute w-52 h-52 rounded-full bg-violet-400/25 blur-2xl pointer-events-none" />

      {/* Upward Search Velocity Curves */}
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full absolute inset-0 object-cover opacity-50 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 0,360 C 220,250 360,460 580,340 C 760,220 840,400 900,320 L 900,600 L 0,600 Z"
          fill="#4c0519"
          opacity="0.3"
        />
        <path
          d="M 0,300 Q 400,280 600,190 T 800,80"
          fill="none"
          stroke="#fb7185"
          strokeWidth="3"
          strokeDasharray="8 6"
          opacity="0.8"
        />
      </svg>

      {/* 3D Lighthouse 100/100 Vitals Gauge */}
      <div className="relative z-10 w-full max-w-[360px] p-6 rounded-2xl bg-slate-950/90 border border-rose-400/40 shadow-2xl backdrop-blur-3xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-400/50 flex items-center justify-center text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.5)]">
              <TrendingUp className="w-5 h-5" />
              <div className="absolute inset-0 rounded-xl border border-rose-400/40 animate-ping opacity-30" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white tracking-wide">Google Lighthouse Vitals</div>
              <div className="text-[10px] font-mono text-rose-400">Algorithmic Dominance Engine</div>
            </div>
          </div>
          <span className="px-2 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-[10px] font-mono font-bold text-rose-400">
            100 / 100
          </span>
        </div>

        {/* 4 Score Pills */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "Perf", val: "100" },
            { label: "A11y", val: "100" },
            { label: "B.Pract", val: "100" },
            { label: "SEO", val: "100" },
          ].map((item, idx) => (
            <div key={idx} className="p-2 rounded-xl bg-white/[0.04] border border-white/5 text-center">
              <div className="text-xs font-mono font-black text-emerald-400">{item.val}</div>
              <div className="text-[9px] font-mono text-slate-400 truncate mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono">
            <span className="text-slate-300">Largest Contentful Paint</span>
            <span className="text-emerald-400 font-bold">0.68s Sub-Second</span>
          </div>
        </div>

        <div className="pt-1">
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span>Organic Traffic Velocity:</span>
            <span className="text-rose-400 font-bold">+160% High-Intent</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="w-[100%] h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full shadow-[0_0_10px_#fb7185]" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Sticky Stacking Capabilities Showcase ─────────────────────────
export default function SplitScreenServiceScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activePill, setActivePill] = useState<number>(0)

  // ── GSAP ScrollTrigger Sticky Stacking Depth ──
  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

      cards.forEach((card, index) => {
        // Track active domain pill as cards scroll into the viewport
        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActivePill(index),
          onEnterBack: () => setActivePill(index),
        })

        // Stacking 3D Depth Physics:
        // As the next card scrolls up and stacks on top of this card,
        // this card smoothly scales down to 0.92, dims, and blurs.
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1]
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.35,
            filter: "blur(6px)",
            ease: "none",
            scrollTrigger: {
              trigger: nextCard,
              start: "top bottom-=100",
              end: "top top+=140",
              scrub: true,
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── Jump Directly to Any Card ──
  const scrollToCard = (index: number) => {
    setActivePill(index)
    const targetEl = cardRefs.current[index]
    if (!targetEl) return

    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.scrollTo(targetEl, { offset: -120, duration: 1.1 })
    } else {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-slate-950 text-white pt-24 sm:pt-32 pb-24 overflow-hidden select-none"
    >
      {/* Background Subtle Cyber Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      {/* ── SECTION HEADER ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-widest">
                GSAP SCROLLTRIGGER • CORE CAPABILITIES
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-none">
              What We Build
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl font-normal">
              Scroll down to watch our architectures stack in real time, or click a domain to jump directly.
            </p>
          </div>

          {/* Sticky Quick-Jump Pill Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl self-start md:self-end overflow-x-auto no-scrollbar shadow-2xl">
            {DOMAINS.map((domain, idx) => {
              const isActive = idx === activePill
              return (
                <button
                  key={domain.id}
                  onClick={() => scrollToCard(idx)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-white text-slate-950 shadow-lg scale-105"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {domain.shortLabel}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── CONTINUOUS SCROLLTRIGGER STACKING CARDS ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20">
        {DOMAINS.map((domain, index) => {
          return (
            <div
              key={domain.id}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              style={{
                zIndex: index + 1,
              }}
              className="sticky top-24 sm:top-28 will-change-transform"
            >
              {/* Outer Card Glass Container */}
              <div
                style={{
                  boxShadow: `0 35px 90px -25px ${domain.glowColor}`,
                }}
                className={`relative rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 bg-slate-950/95 border border-white/10 backdrop-blur-3xl overflow-hidden transition-all duration-300`}
              >
                {/* Luminous Ambient Color Backlight */}
                <div
                  className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-40"
                  style={{ background: domain.glowColor }}
                />

                {/* Big Ghost Watermark Domain Number */}
                <div className="absolute top-2 right-8 text-8xl sm:text-9xl lg:text-[13rem] font-display font-black text-white/[0.03] select-none pointer-events-none leading-none">
                  {domain.number}
                </div>

                {/* Card Content Grid */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Specs & Big Typography */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Domain Number Badge */}
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-md text-xs font-mono font-bold uppercase tracking-wider border ${domain.badgeClass}`}>
                        {domain.badgeLabel}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        PROD VERIFIED
                      </span>
                    </div>

                    {/* Massive Bold Headline */}
                    <div>
                      <h3 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-[1.05]">
                        {domain.title}
                      </h3>
                      
                      {/* Punchy Tagline */}
                      <p className={`mt-2.5 text-lg sm:text-2xl font-bold bg-gradient-to-r ${domain.accentGradient} bg-clip-text text-transparent`}>
                        {domain.tagline}
                      </p>
                      
                      {/* Short Main Statement */}
                      <p className="mt-3 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-xl">
                        {domain.statement}
                      </p>
                    </div>

                    {/* 2 Luxury Hero Metric Instruments */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 pt-1">
                      <div className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md min-w-[130px]">
                        <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                          {domain.stat1.value}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                          {domain.stat1.label}
                        </div>
                      </div>

                      <div className="px-5 py-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md min-w-[130px]">
                        <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                          {domain.stat2.value}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono uppercase tracking-wider mt-0.5">
                          {domain.stat2.label}
                        </div>
                      </div>
                    </div>

                    {/* Single Sleek CTA */}
                    <div className="pt-2">
                      <Link
                        href={domain.href}
                        className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-lg ${domain.buttonClass}`}
                      >
                        <span>Explore Domain Architecture</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>

                  </div>

                  {/* Right 3D Visual Centerpiece */}
                  <div className="lg:col-span-5 relative w-full flex items-center justify-center">
                    {domain.category === "cloud" && <CloudVisual />}
                    {domain.category === "ai" && <AiVisual />}
                    {domain.category === "mobile" && <MobileVisual />}
                    {domain.category === "iot" && <IotVisual />}
                    {domain.category === "seo" && <SeoVisual />}
                  </div>

                </div>

                {/* Card Sub-Footer */}
                <div className="relative z-10 pt-5 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Architecture 0{index + 1} of 05</span>
                  <span className="text-slate-300">Continuous Scroll Stacking Active</span>
                </div>

              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}
