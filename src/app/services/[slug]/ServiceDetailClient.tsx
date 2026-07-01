"use client"

import React, { useState } from "react"
import Link from "next/link"
import { 
  Check, ArrowRight, ArrowLeft, Cpu, Globe, Smartphone, Brain, 
  Cloud, TrendingUp, Code, Layers, ShieldAlert, Layout, Activity, Home,
  Clock, ZoomIn, X, Terminal, Database, Server, Settings, CheckCircle2,
  Lock, RefreshCw, Send, Sparkles, Filter, Sliders, Play, Trash2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"

interface ServiceDetailClientProps {
  service: any
  localImages: string[]
}

const serviceKeywords: Record<string, string[]> = {
  "software-development": [
    "custom software development",
    "enterprise software engineering",
    "offshore software development",
    "outsourced product development",
    "custom ERP CRM developers",
    "API microservices development",
    "Next.js Go developers",
    "hire software developers"
  ],
  "enterprise-development": [
    "enterprise software development",
    "legacy platform migration",
    "high-throughput transaction engines",
    "corporate software engineering",
    "SSO AD active directory integration",
    "ISO 27001 data security compliance",
    "custom middleware development"
  ],
  "saas-development": [
    "SaaS product engineering",
    "multi tenant software architecture",
    "Stripe subscription integration",
    "SaaS app developers",
    "analytical dashboard design",
    "usage based billing development"
  ],
  "web-development": [
    "custom web development company",
    "Next.js react web applications",
    "headless CMS architecture",
    "Vercel enterprise deployments",
    "responsive web app design",
    "secure corporate portal development"
  ],
  "mobile-development": [
    "cross platform mobile development",
    "Flutter app developers",
    "React Native app development",
    "iOS Android application design",
    "enterprise mobile apps",
    "hybrid mobile app development"
  ],
  "flutter-development": [
    "Flutter application development",
    "cross platform mobile engineers",
    "hire Flutter developers",
    "Flutter tablet mobile apps",
    "Flutter UI UX design",
    "Flutter web app integration"
  ],
  "react-development": [
    "ReactJS development services",
    "Next.js React web developer",
    "React component library design",
    "single page application SPA",
    "hire React developer",
    "custom React frontend"
  ],
  "wordpress-development": [
    "custom WordPress developer",
    "WooCommerce store engineering",
    "headless WordPress Next.js",
    "WordPress performance speed audit",
    "corporate WordPress theme"
  ],
  "php-development": [
    "custom PHP development",
    "Laravel backend development",
    "Laravel API microservices",
    "PHP database developer",
    "legacy PHP code migration"
  ],
  "dotnet-development": [
    "ASP.NET Core development",
    "C# enterprise applications",
    "Azure cloud solutions C#",
    "WCF to gRPC migration",
    "C# REST API microservices"
  ],
  "ui-ux-design": [
    "premium UI UX design",
    "SaaS dashboard product design",
    "wireframing figma mockup agency",
    "user experience optimization",
    "mobile app interface design"
  ],
  "ai-solutions": [
    "custom AI agent development",
    "LLM model orchestration",
    "LangChain Python developer",
    "OpenAI API cloud integration",
    "automated chatbot deployment"
  ],
  "cloud-devops": [
    "cloud migration services",
    "Kubernetes Docker setup",
    "CI CD pipeline automated deploy",
    "AWS Google Cloud Azure architect",
    "database cluster migration"
  ],
  "seo-marketing": [
    "technical SEO optimization",
    "SEO audit for SaaS software",
    "international search marketing",
    "Google ranking optimization",
    "organic search visibility growth"
  ],
  "iot-embedded": [
    "industrial IoT hardware",
    "custom firmware developer",
    "ESP32 STM32 circuit board design",
    "MQTT LoRa protocol engineering",
    "PCB design prototype manufacturing",
    "real time embedded C C++ code"
  ],
  "real-estate-creative": [
    "real estate digital platform",
    "3D property render showcase",
    "real estate portal development",
    "custom property listing CRM",
    "real estate website designs"
  ]
}

export default function ServiceDetailClient({ service, localImages }: ServiceDetailClientProps) {
  const { t, locale, isRTL } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  // Real Estate staging sliders
  const [sliderPosition, setSliderPosition] = useState(50)
  const [activeCreativeTab, setActiveCreativeTab] = useState<"staging" | "sky">("staging")

  // Mockup view mode selector: "image" (pixel-perfect graphic screenshot) vs "sandbox" (interactive simulator code widget)
  const [activeMockupMode, setActiveMockupMode] = useState<"image" | "sandbox">("image")

  // Interactive phone preview tab for Mobile App / Flutter Development
  const [activeMobileScreen, setActiveMobileScreen] = useState<"login" | "chart" | "map">("login")

  // Interactive DB selector tab for Software / Enterprise
  const [activeDbTable, setActiveDbTable] = useState<"users" | "logs" | "orders">("users")

  // AI Chat simulation messages
  const [aiPrompt, setAiPrompt] = useState("")
  const [aiChat, setAiChat] = useState([
    { role: "user", text: "Process Q2 invoice PDFs and check tax values." },
    { role: "assistant", text: "Initiating OCR scan over 14 documents... Extracted $28,450.00 total. Cross-referenced with Ledger: Status OK." }
  ])
  const [isAiLoading, setIsAiLoading] = useState(false)

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!aiPrompt.trim()) return
    const userMsg = { role: "user", text: aiPrompt }
    setAiChat(prev => [...prev, userMsg])
    setAiPrompt("")
    setIsAiLoading(true)
    setTimeout(() => {
      setAiChat(prev => [...prev, {
        role: "assistant",
        text: `Command understood. Executing predictive analysis model. Processing RAG database lookup... Yielded 99.4% confidence score matching "${userMsg.text}".`
      }])
      setIsAiLoading(false)
    }, 1500)
  }

  const slug = service.slug
  const isRealEstate = slug === "real-estate-creative"

  const beforeAfterExamples = {
    staging: {
      before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop",
      title: "Virtual Staging",
      desc: "Digitally placing trend-aligned furniture inside an empty residential listing."
    },
    sky: {
      before: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop",
      after: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
      title: "Sky Replacement",
      desc: "Converting a dull, overcast gray sky into a vibrant, warm sunset backdrop."
    }
  }

  // Map slugs to generated high-fidelity screenshot assets
  const categoryScreenshotMap: Record<string, string> = {
    "software-development": "/gallery/software-development/saas_dashboard_mockup.png",
    "enterprise-development": "/gallery/software-development/saas_dashboard_mockup.png",
    "saas-development": "/gallery/software-development/saas_dashboard_mockup.png",
    "web-development": "/gallery/software-development/saas_dashboard_mockup.png",
    "mobile-development": "/gallery/mobile-development/mobile_app_mockup.png",
    "flutter-development": "/gallery/mobile-development/mobile_app_mockup.png",
    "react-development": "/gallery/software-development/saas_dashboard_mockup.png",
    "wordpress-development": "/gallery/software-development/saas_dashboard_mockup.png",
    "php-development": "/gallery/software-development/saas_dashboard_mockup.png",
    "dotnet-development": "/gallery/software-development/saas_dashboard_mockup.png",
    "ai-solutions": "/gallery/ai-solutions/ai_agent_mockup.png",
    "cloud-devops": "/gallery/cloud-devops/cloud_monitoring_mockup.png",
    "seo-marketing": "/gallery/seo-marketing/seo_metrics_mockup.png",
    "iot-embedded": "/gallery/iot/iot_board_mockup.png"
  }

  // Generate customized illustration widgets matching the exact requirements
  const getMockupWidget = (slug: string) => {
    switch (slug) {
      case "software-development":
      case "enterprise-development":
      case "dotnet-development":
      case "php-development":
        return (
          <div className="border border-slate-200 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl relative overflow-hidden text-left font-mono text-[10px] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex gap-1.5">
                <button type="button" onClick={() => setActiveDbTable("users")} className={`px-2 py-1 rounded cursor-pointer ${activeDbTable === "users" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>users.sql</button>
                <button type="button" onClick={() => setActiveDbTable("logs")} className={`px-2 py-1 rounded cursor-pointer ${activeDbTable === "logs" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>sys_logs.sql</button>
                <button type="button" onClick={() => setActiveDbTable("orders")} className={`px-2 py-1 rounded cursor-pointer ${activeDbTable === "orders" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"}`}>orders.sql</button>
              </div>
              <span className="text-slate-450 uppercase tracking-widest text-[8px] font-extrabold">DB CLI Core</span>
            </div>

            {activeDbTable === "users" && (
              <div className="space-y-1 text-slate-655">
                <p className="text-blue-600">&gt; SELECT id, name, compliance_level FROM users LIMIT 3;</p>
                <div className="border border-slate-100 bg-slate-50 rounded p-2 text-[9px] space-y-1">
                  <p className="font-bold text-slate-800">1 | John Miller | GDPR Verified</p>
                  <p className="font-bold text-slate-800">2 | Sarah Jenkins | HIPAA Compliant</p>
                  <p className="font-bold text-slate-800">3 | David Koji | ISO Security Pass</p>
                </div>
              </div>
            )}
            {activeDbTable === "logs" && (
              <div className="space-y-1 text-slate-655">
                <p className="text-blue-600">&gt; TAIL -N 3 /var/log/sys.log;</p>
                <div className="border border-slate-100 bg-slate-50 rounded p-2 text-[9px] space-y-1 text-slate-500 font-bold">
                  <p className="text-emerald-600">[2026-07-01 16:55] INFO: Cron sync success. 0 leaks found.</p>
                  <p className="text-blue-600">[2026-07-01 16:55] API: Gateway routing synced in 14ms.</p>
                  <p className="text-emerald-600">[2026-07-01 16:56] SYSTEM: Ledger database replication OK.</p>
                </div>
              </div>
            )}
            {activeDbTable === "orders" && (
              <div className="space-y-1 text-slate-655">
                <p className="text-blue-600">&gt; SELECT count(*), sum(price) FROM transactions;</p>
                <div className="border border-slate-100 bg-slate-50 rounded p-2 text-[9px] text-slate-800 font-bold">
                  COUNT: 8,425 | SUM: $1,245,690.00 | STATUS: SYNCED
                </div>
              </div>
            )}

            <div className="text-[9px] text-slate-400 border-t border-slate-100 pt-3 flex items-center justify-between">
              <span>SQL Port: 5432</span>
              <span className="text-emerald-600 font-bold">● Active Cluster</span>
            </div>
          </div>
        )

      case "saas-development":
        return (
          <div className="border border-slate-200 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl text-left relative overflow-hidden space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">SaaS Billing Console</span>
              <span className="text-emerald-600 bg-emerald-50 text-[9px] font-extrabold px-2 py-0.5 rounded">Active MRR</span>
            </div>
            
            <div className="space-y-2">
              <span className="text-2xl font-extrabold text-slate-900 font-display">$84,250.00</span>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[78%]" />
              </div>
              <div className="flex justify-between items-center text-[9px] font-extrabold text-slate-455 uppercase">
                <span>Active Seats: 14,800</span>
                <span>Renewal Rate: 98.4%</span>
              </div>
            </div>

            <div className="border border-slate-100 bg-slate-50/50 p-4 rounded-xl space-y-2">
              <span className="text-[9px] font-extrabold text-slate-455 uppercase block">Tenant Subscriptions</span>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Enterprise Tier</span>
                <span className="text-blue-600">$1,499.00/mo</span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Growth Startup Tier</span>
                <span className="text-blue-600">$299.00/mo</span>
              </div>
            </div>
          </div>
        )

      case "web-development":
      case "react-development":
      case "wordpress-development":
        return (
          <div className="border border-slate-200 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden text-left relative">
            <div className="bg-slate-50 border-b border-slate-150 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest font-mono">responsive_browser_sim</span>
              <div className="w-6" />
            </div>

            <div className="p-5 grid grid-cols-12 gap-4 font-sans text-xs">
              <div className="col-span-4 border border-slate-200 bg-slate-50/50 p-3 rounded-xl space-y-2 font-bold">
                <div className="w-full bg-slate-350 h-3 rounded" />
                <div className="w-3/4 bg-slate-200 h-2 rounded" />
                <div className="w-1/2 bg-slate-200 h-2 rounded" />
              </div>
              <div className="col-span-8 border border-slate-200 p-3 rounded-xl space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-100" />
                  <div className="space-y-1 w-full">
                    <div className="w-1/3 bg-slate-350 h-2.5 rounded" />
                    <div className="w-1/2 bg-slate-200 h-1.5 rounded" />
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-16 rounded-lg flex items-center justify-center text-[10px] text-slate-400 font-bold uppercase">
                  Landing Showcase View
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-150 p-3 text-[9px] font-mono text-slate-455 flex justify-between">
              <span>LCP: 0.8s</span>
              <span className="text-green-600 font-bold">100 Mobile Speed score</span>
            </div>
          </div>
        )

      case "mobile-development":
      case "flutter-development":
        return (
          <div className="flex justify-center items-center">
            <div className="w-64 border-[6px] border-slate-800 bg-slate-900 rounded-[32px] overflow-hidden shadow-2xl relative text-left">
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-full z-20" />
              
              <div className="bg-white min-h-[360px] p-5 relative pt-8 font-sans">
                <div className="flex justify-between items-center text-[10px] font-extrabold text-slate-400 pb-4 border-b border-slate-100">
                  <span>9:41 AM</span>
                  <span className="text-blue-600">Active SDK</span>
                </div>

                <div className="flex gap-1.5 py-3">
                  {["login", "chart", "map"].map((tab) => (
                    <button 
                      type="button"
                      key={tab}
                      onClick={() => setActiveMobileScreen(tab as any)}
                      className={`px-2.5 py-1 rounded-full text-[8px] font-extrabold uppercase transition-all cursor-pointer ${
                        activeMobileScreen === tab ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="pt-3 min-h-[200px] flex flex-col justify-between">
                  {activeMobileScreen === "login" && (
                    <div className="space-y-4">
                      <span className="font-display font-extrabold text-sm text-slate-900 block leading-tight">Secure Customer biometric login</span>
                      <div className="border border-slate-200 p-2.5 rounded-xl text-[9px] text-slate-400 font-semibold bg-slate-50/50">
                        Scan FaceID...
                      </div>
                      <button type="button" className="w-full bg-blue-600 text-white rounded-xl py-2 text-[10px] font-bold text-center">Continue</button>
                    </div>
                  )}
                  {activeMobileScreen === "chart" && (
                    <div className="space-y-3">
                      <span className="text-[9px] font-extrabold uppercase text-slate-400">Total Balance</span>
                      <span className="text-xl font-extrabold text-slate-900 block font-display">$4,850.00</span>
                      <div className="h-16 flex items-end gap-1 border-b border-slate-200">
                        {[20, 50, 30, 80, 40, 95].map((h, i) => (
                          <div key={i} className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  )}
                  {activeMobileScreen === "map" && (
                    <div className="space-y-2">
                      <span className="font-bold text-xs text-slate-900 block">Express geo courier</span>
                      <div className="h-24 bg-slate-100 rounded-xl flex items-center justify-center text-[9px] text-slate-400 font-bold uppercase tracking-wider relative overflow-hidden border border-slate-200">
                        Map Grid Vector
                        <div className="absolute top-8 left-12 w-3 h-3 rounded-full bg-blue-600 border-2 border-white animate-pulse" />
                      </div>
                    </div>
                  )}

                  <div className="text-[9px] text-slate-400 border-t border-slate-100 pt-2.5 mt-4 text-center">
                    Rendered 60 FPS widget engine
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "ai-solutions":
        return (
          <div className="border border-slate-200 bg-white/70 backdrop-blur-md rounded-2xl p-5 shadow-xl text-left font-sans space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                <Brain size={11} className="text-blue-600 animate-pulse" />
                <span>Cognitive Chatbot Core</span>
              </span>
              <span className="text-green-600 text-[8px] font-extrabold uppercase">OpenAI API synced</span>
            </div>

            <div className="h-44 overflow-y-auto space-y-3 p-3 bg-slate-50 rounded-xl border border-slate-150 text-[10px]">
              {aiChat.map((msg, idx) => (
                <div key={idx} className={`max-w-[85%] p-2.5 rounded-xl ${msg.role === "user" ? "bg-blue-600 text-white ml-auto" : "bg-white border border-slate-200 text-slate-700"}`}>
                  {msg.text}
                </div>
              ))}
              {isAiLoading && (
                <div className="text-slate-400 text-[9px] animate-pulse font-semibold">Assistant typing response...</div>
              )}
            </div>

            <form onSubmit={handleAiSend} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Enter prompts (e.g. Run OCR scan)..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs placeholder:text-slate-400 text-slate-800"
              />
              <button type="submit" className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors cursor-pointer">
                <Send size={14} />
              </button>
            </form>
          </div>
        )

      case "cloud-devops":
        return (
          <div className="border border-slate-200 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl text-left font-mono text-[10px] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-150">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-450">DevOps Infrastructure Pipeline</span>
              <span className="text-green-600 font-extrabold">● STABLE DEPLOY</span>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server size={14} className="text-blue-600 animate-pulse" />
                  <span className="font-bold text-slate-800">CloudFront Load Balancer</span>
                </div>
                <span className="text-slate-400 text-[8px]">SSL: ACTIVE</span>
              </div>

              <div className="pl-6 border-l-2 border-dashed border-slate-200/80 space-y-4">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database size={14} className="text-indigo-650" />
                    <span className="font-bold text-slate-800">K8s Replica Set (3 pods)</span>
                  </div>
                  <span className="text-emerald-600 font-bold">100% HEALTH</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database size={14} className="text-cyan-600" />
                    <span className="font-bold text-slate-800">PostgreSQL Cloud DB cluster</span>
                  </div>
                  <span className="text-slate-400">AWS Aurora</span>
                </div>
              </div>
            </div>

            <div className="text-[9px] text-slate-400 border-t border-slate-150 pt-3">
              $ cat terraform.tfstate | grep -i status_code &rarr; 200 OK
            </div>
          </div>
        )

      case "seo-marketing":
        return (
          <div className="border border-slate-200 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl text-left font-sans space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">Search Console Analytics</span>
              <span className="text-emerald-600 font-extrabold text-[9px]">+145% Clicks</span>
            </div>

            <div className="grid grid-cols-2 gap-4 font-bold">
              <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                <span className="block text-[8px] font-extrabold uppercase text-slate-400">Total Clicks</span>
                <span className="text-lg font-extrabold text-slate-900 font-display">124.8K</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl">
                <span className="block text-[8px] font-extrabold uppercase text-slate-400">Average Position</span>
                <span className="text-lg font-extrabold text-blue-600 font-display">#1.4</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
              <span className="text-[9px] font-extrabold text-slate-400 uppercase">Organic Search Trend</span>
              <div className="h-16 flex items-end gap-1.5 pt-2 border-b border-l border-slate-200">
                {[30, 45, 60, 40, 80, 95].map((h, i) => (
                  <div key={i} className="w-full bg-emerald-500" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        )

      case "iot-embedded":
        return (
          <div className="border border-slate-900 bg-slate-950 rounded-2xl p-5 shadow-2xl text-left font-mono text-[9px] text-slate-400 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-[8px] uppercase tracking-widest text-slate-500 font-extrabold">ESP32 Core Board Blueprint</span>
              <span className="text-green-500 font-bold animate-pulse">● TX/RX Active</span>
            </div>

            <div className="p-4 border border-slate-800 bg-slate-900 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">PIN 22 (I2C SDA):</span>
                <span className="text-green-400">HIGH (3.3V)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">PIN 21 (I2C SCL):</span>
                <span className="text-green-400">CLOCK SYNC</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">UART Baudrate:</span>
                <span className="text-slate-300">115200 bps</span>
              </div>
            </div>

            <div className="border border-slate-800 bg-slate-900/50 p-2.5 rounded text-[8px] space-y-1 text-slate-500">
              <p>&gt; Starting Zephyr kernel OS core...</p>
              <p>&gt; Initializing DHT22 sensors... Done.</p>
              <p className="text-blue-400">&gt; Client payload packet: &quot;temp: 24.8, humidity: 45.2&quot; sent via MQTT.</p>
            </div>
          </div>
        )

      default:
        return (
          <div className="border border-slate-200 bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl text-center space-y-4 text-slate-500 text-xs">
            <Cpu size={32} className="mx-auto text-blue-600 animate-spin" />
            <span>Interactive sandbox configurations completed successfully</span>
          </div>
        )
    }
  }

  // Icons map
  const iconComponents: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="text-blue-650" size={32} />,
    Globe: <Globe className="text-blue-600" size={32} />,
    Smartphone: <Smartphone className="text-blue-600" size={32} />,
    Brain: <Brain className="text-blue-600" size={32} />,
    Cloud: <Cloud className="text-blue-600" size={32} />,
    TrendingUp: <TrendingUp className="text-blue-600" size={32} />,
    Code: <Code className="text-blue-600" size={32} />,
    Layers: <Layers className="text-blue-600" size={32} />,
    ShieldAlert: <ShieldAlert className="text-blue-600" size={32} />,
    Layout: <Layout className="text-blue-600" size={32} />,
    Activity: <Activity className="text-blue-600" size={32} />,
    Home: <Home className="text-blue-600" size={32} />
  }

  const getCategoryProjects = (slug: string) => {
    const config = getServiceConfig(slug)
    return config?.projects || []
  }

  const getServiceConfig = (slug: string) => {
    switch (slug) {
      case "software-development":
        return {
          problems: [
            "Legacy monolithic architecture causing server bottlenecks and database queries latency.",
            "Inability to integrate third-party billing engines and corporate ERP platforms.",
            "High maintenance overhead and fragile code leading to regular deployment outages."
          ],
          solutions: [
            "Refactoring workflow structures into stateless, clean microservice APIs utilizing Go and Node.js.",
            "Seamless unified migrations to relational databases (PostgreSQL) and caching layers (Redis).",
            "Continuous automated code verification pipelines (CI/CD) and rigid TypeScript integration."
          ],
          projects: [
            { name: "Custom ERP Logistics Hub", desc: "Enterprise operations tracking and automated routing system.", tech: "Node.js • PostgreSQL • Redis" },
            { name: "SaaS Billing Dispatcher", desc: "Automated POS billing software with dynamic tax APIs.", tech: "TypeScript • GraphQL • Stripe" },
            { name: "Manufacturing Workflow System", desc: "Desktop application tracking factory floor production.", tech: "Tauri • Rust • PostgreSQL" }
          ],
          faqs: [
            { q: "Do we get full access to the source repositories?", a: "Yes. Once deployment milestones are reached, all IP, source codes, and files are 100% legally signed over to your team." },
            { q: "Can you modernize older codebases?", a: "Absolutely. We specialize in legacy system auditing, modular refactoring, and zero-downtime production migrations." }
          ]
        }

      case "enterprise-development":
      case "dotnet-development":
      case "php-development":
        return {
          problems: [
            "Corporate database silos and fragmented department workflows.",
            "Sub-standard compliance checks failing GDPR/HIPAA audits.",
            "Frequent concurrency issues during peak transaction loads."
          ],
          solutions: [
            "Unifying enterprise departments with custom secure ERP interfaces.",
            "Strict implementation of RBAC security protocols and compliance audits.",
            "High-availability architecture running on Kubernetes with SQL server clustering."
          ],
          projects: [
            { name: "Enterprise POS Billing Engine", desc: "High-volume transactional system for global retail.", tech: "C# • SQL Server • Kubernetes" },
            { name: "Healthcare Client Portal", desc: "HIPAA-compliant document and tracking pipeline.", tech: "Java Spring • Azure • PostgreSQL" },
            { name: "Corporate HRMS System", desc: "Unified staff roster and automated payroll ledger.", tech: "ASP.NET Core • Docker • PostgreSQL" }
          ],
          faqs: [
            { q: "How do you ensure data security during migration?", a: "We apply industry-standard AES-256 encryption at rest, secure VPN tunnels, and execute migrations during low-traffic windows." },
            { q: "Do you support Single Sign-On (SSO)?", a: "Yes, we integrate with Azure Active Directory, Okta, and OAuth systems for seamless identity management." }
          ]
        }

      case "saas-development":
        return {
          problems: [
            "Difficult subscription billing implementations and customer portal churn.",
            "Insecure multi-tenant logic causing cross-account data leaks.",
            "Slow analytical dashboard loads affecting user engagement."
          ],
          solutions: [
            "Standardized integrations with Stripe customer portals and billing APIs.",
            "Rigid row-level database isolations and tenant authentication scopes.",
            "Headless Next.js dashboards powered by server-side static paths."
          ],
          projects: [
            { name: "Analytics Insights Dashboard", desc: "Interactive charts and user behavior maps.", tech: "Next.js • Tailwind • GraphQL" },
            { name: "Multi-Tenant CRM Suite", desc: "Secure isolated SaaS client portal management.", tech: "React • Node.js • PostgreSQL" },
            { name: "Usage-Based Metering API", desc: "Billing pipeline measuring hourly compute runs.", tech: "TypeScript • Redis • Stripe" }
          ],
          faqs: [
            { q: "Can you configure complex subscription tiers?", a: "Yes, we implement usage-based, seat-based, flat-rate, and hybrid billing pipelines using Stripe and Adyen." },
            { q: "How do you secure tenant datasets?", a: "We utilize separate database schemas or strict Row-Level Security (RLS) policies at the database layer." }
          ]
        }

      case "web-development":
      case "react-development":
      case "wordpress-development":
        return {
          problems: [
            "Slow-loading corporate sites causing high bounce rates.",
            "Non-responsive layouts layout elements breaking on mobile sizes.",
            "Weak search discoverability and lack of technical schema."
          ],
          solutions: [
            "Building ultra-fast headless Next.js platforms that compile statically.",
            "Rigid responsive grid architectures mapped for mobile breakpoints.",
            "Advanced JSON-LD metadata schema implementation built in."
          ],
          projects: [
            { name: "Velo Corporate Web Platform", desc: "Premium responsive business marketing engine.", tech: "Next.js • Tailwind CSS • Sanity CMS" },
            { name: "Headless E-Commerce Portal", desc: "Speed-optimized shopping platform with stripe.", tech: "Next.js • Headless CMS • Stripe" },
            { name: "Luxury Hotel Booking Web", desc: "Interactive reservation engine with maps.", tech: "React • TypeScript • Tailwind" }
          ],
          faqs: [
            { q: "Do you integrate with Content Management Systems (CMS)?", a: "Yes, we build with headless setups like Sanity, Contentful, and Strapi for simple marketing team updates." },
            { q: "How do you guarantee site speed?", a: "We optimize all image assets, leverage static generation, minify scripts, and enforce strict Core Web Vitals checks." }
          ]
        }

      case "mobile-development":
      case "flutter-development":
        return {
          problems: [
            "Different codebases for iOS and Android doubling maintenance costs.",
            "Sub-standard performance rendering causing interface lag.",
            "Inability to synchronise records without internet gateways."
          ],
          solutions: [
            "Single codebase deployments using Google's Flutter framework.",
            "Highly optimized Dart widgets compiling to native binaries.",
            "Robust offline storage caching utilizing SQLite and Realm."
          ],
          projects: [
            { name: "MedVitals BLE Suite", desc: "Cross-platform mobile health tracking monitor.", tech: "Flutter • BLE Sensors • SQLite" },
            { name: "Express Taxi Dispatch App", desc: "Geo-tracking taxi booking client and driver maps.", tech: "Flutter • Dart • Firebase Streams" },
            { name: "FinTech Expense Tracker", desc: "Secure budgeting tool with biometrics.", tech: "React Native • TypeScript • Realm" }
          ],
          faqs: [
            { q: "Do you publish our apps to the App Store?", a: "Yes. We manage the entire store deployment process, including metadata guidelines and compliance reviews." },
            { q: "Can you access specific device sensors?", a: "Yes, we write custom native channels to hook into GPS, Bluetooth BLE, cameras, and local biometrics." }
          ]
        }

      case "ui-ux-design":
        return {
          problems: [
            "Cluttered SaaS product dashboards causing client user drop-offs.",
            "Inconsistent UI elements breaking brand identity across platforms.",
            "Lack of WCAG accessibility considerations failing legal compliance audits."
          ],
          solutions: [
            "Conducting research workshops to map out clean user journeys.",
            "Engineering detailed Figma component systems with rigid spacing specs.",
            "Designing layouts that comply with WCAG accessibility guidelines."
          ],
          projects: [
            { name: "Enterprise SaaS Dashboard UX", desc: "Pixel-perfect workspace layout redesign.", tech: "Figma • Interactive Prototypes • User Research" },
            { name: "FinTech Mobile App UI", desc: "High-fidelity mockups for transactional tools.", tech: "Figma • Design Systems • Micro-interactions" },
            { name: "Brand Identity Layout Guides", desc: "Unified logo sets and color matrix specs.", tech: "Adobe CC • Prototyping • Design Systems" }
          ],
          faqs: [
            { q: "What design assets do we receive?", a: "You get full ownership of the Figma source design file containing components, style guides, responsive layouts, and animations." },
            { q: "Do you run usability testing sessions?", a: "Yes, we evaluate layouts with target user cohorts to verify flow efficiency and layout comprehension." }
          ]
        }

      case "ai-solutions":
        return {
          problems: [
            "Inundated administrative departments processing paper layouts manually.",
            "High customer support response times and scaling costs.",
            "Valuable databases remaining siloed without predictive tools."
          ],
          solutions: [
            "Automating layouts data extracting using custom OCR pipelines.",
            "Deploying custom conversational chatbots and intelligent AI copilots.",
            "Integrating custom LLM and RAG models over secure corporate files."
          ],
          projects: [
            { name: "AI Support Agent Pipeline", desc: "Automated ticketing responder with zero human lag.", tech: "LangChain • Python • OpenAI API" },
            { name: "Document Parser OCR system", desc: "High-speed invoice text extractor tool.", tech: "Python • YOLO v8 • OpenCV" },
            { name: "Market Predictive Optimizer", desc: "Telemetry forecasting trend tracker model.", tech: "PyTorch • TensorFlow • scikit-learn" }
          ],
          faqs: [
            { q: "Is our private data safe with AI systems?", a: "Yes. We set up isolated, enterprise-grade cloud servers or run open-source models locally so no data leaks out." },
            { q: "How accurate are your document parsing models?", a: "Our custom fine-tuned OCR systems achieve up to 99.2% accuracy rates on standard printed invoices." }
          ]
        }

      case "cloud-devops":
        return {
          problems: [
            "Fragmented infrastructure leading to unexpected server downtime.",
            "Manual release checks slowing down software updates.",
            "High, unmonitored cloud spending with excessive resource waste."
          ],
          solutions: [
            "Architecting reliable cloud parameters via Terraform configurations.",
            "Enforcing automated CI/CD checks using GitHub Actions.",
            "Conducting comprehensive cost audits to optimize instance sizing."
          ],
          projects: [
            { name: "Kubernetes Cloud Migration", desc: "Stateless container setup for global portals.", tech: "AWS • Kubernetes • Terraform" },
            { name: "CI/CD Pipeline Automation", desc: "Automated testing deployment check suite.", tech: "Docker • GitHub Actions • Prometheus" },
            { name: "24/7 Security Operations Core", desc: "Enterprise cloud backup and alerts monitoring.", tech: "Azure • Grafana • CloudWatch" }
          ],
          faqs: [
            { q: "Which cloud providers do you support?", a: "We have deep expertise across Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP)." },
            { q: "Do you offer post-deployment maintenance?", a: "Yes, we provide 24/7 monitoring service level agreements (SLAs) with proactive incident resolution." }
          ]
        }

      case "seo-marketing":
        return {
          problems: [
            "Valuable websites missing corporate search discoverability.",
            "Sub-standard page load metrics dropping conversion rates.",
            "High, inefficient ad spending without direct lead tracking."
          ],
          solutions: [
            "Structuring technical schemas and keyword content hubs.",
            "Tuning server assets to meet Google Core Web Vitals targets.",
            "Establishing conversion audit scripts and clear attribution models."
          ],
          projects: [
            { name: "Technical SEO Audit", desc: "Corporate website performance ranking optimization.", tech: "SEMrush • Schema Markup • Search Console" },
            { name: "International SEO Campaign", desc: "Multi-language ranking campaign in Western markets.", tech: "Multilingual Schemas • Ahrefs" },
            { name: "Ad Attribution Pipeline", desc: "Google Ads campaign setup with lead tracking.", tech: "GTM • Google Analytics 4 • Google Ads" }
          ],
          faqs: [
            { q: "How long does it take to see organic growth?", a: "SEO is a progressive strategy; technical audit gains appear within weeks, while organic rankings grow over 3 to 6 months." },
            { q: "Do you handle multilingual SEO?", a: "Yes, we configure proper hreflang tags and localized search metadata for all global markets." }
          ]
        }

      case "iot-embedded":
        return {
          problems: [
            "Fragmented hardware wiring schematics causing system shorts.",
            "Inefficient firmware leading to high battery drain rates.",
            "Weak wireless connectivity across large warehouse installations."
          ],
          solutions: [
            "Routing multi-layer printed circuit boards (PCBs) in Altium Designer.",
            "Programming responsive firmware code blocks in Zephyr RTOS.",
            "Deploying low-power wireless configurations (LoRaWAN, MQTT)."
          ],
          projects: [
            { name: "Warehouse Asset Tracker Node", desc: "Low-power tracking sensor PCB design.", tech: "ESP32 • Altium • LoRaWAN" },
            { name: "Industrial Telemetry System", desc: "Real-time engine health data monitoring.", tech: "STM32 • Embedded C++ • MQTT" },
            { name: "Smart Agriculture Edge Gateway", desc: "Environmental sensor network gateway.", tech: "Raspberry Pi • FreeRTOS • BLE" }
          ],
          faqs: [
            { q: "Do you build physical PCB prototypes?", a: "Yes, we design schematics, route layouts, construct test boards, and flash firmware in our Erode hardware lab." },
            { q: "Can you optimize firmware for battery-powered use?", a: "Yes, we implement deep sleep states and clock tuning to maximize device battery lifespans." }
          ]
        }

      case "real-estate-creative":
        return {
          problems: [
            "Vacant real estate listings struggling with low buyer engagement rates.",
            "High budgets and long setup times required for physical staging.",
            "Dull, overcast property photos underperforming on digital search feeds."
          ],
          solutions: [
            "Electronically placing modern 3D furniture into vacant rooms.",
            "Fast 24-hour digital staging turnaround at a fraction of physical costs.",
            "Replacing cloudy skies with warm, high-contrast sunset backdrops."
          ],
          projects: [
            { name: "Apex Property Staging Suite", desc: "Digital home staging templates for luxury properties.", tech: "3ds Max • V-Ray • Adobe CC" },
            { name: "Day to Dusk Sky Enhancements", desc: "Atmospheric sunset blending on real estate listings.", tech: "Adobe Photoshop • Lightroom" },
            { name: "2D/3D Vector Floor Plans", desc: "Accurate redrawn architectural layouts.", tech: "AutoCAD • Adobe Illustrator" }
          ],
          faqs: [
            { q: "What is the turnaround time for staging photos?", a: "We guarantee delivery of complete staging edits within 24 hours of photo uploads." },
            { q: "Do you remove existing clutter from photos?", a: "Yes, we offer complete virtual remodeling, wall cleanup, and object removal services." }
          ]
        }

      default:
        return {
          problems: ["Technical bottlenecks", "Data compliance leaks", "Maintenance gaps"],
          solutions: ["Stateless migrations", "Compliance audits", "Active pipelines"],
          projects: [],
          faqs: []
        }
    }
  }

  const config = getServiceConfig(slug)
  const categoryProjects = getCategoryProjects(slug)
  const screenshotPath = categoryScreenshotMap[slug]

  return (
    <div className="relative bg-white pt-24 pb-20 select-none text-slate-800 text-left font-sans bg-dot-pattern" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Background colorful blurred blobs */}
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 left-10 w-[300px] h-[300px] bg-purple-500/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link href="/services" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-blue-650 transition-colors">
          <ArrowLeft size={14} />
          <span>Back to All Divisions</span>
        </Link>
      </div>

      {/* RENDER FOR CREATIVE REAL ESTATE DIVISION */}
      {isRealEstate ? (
        <div className="space-y-16">
          
          {/* Creative Staging Hero */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-orange-500 px-3 py-1 rounded-full border border-orange-100 bg-orange-50/40 w-fit block font-display">
                Creative Media Division
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
                Premium Real Estate <br />
                <span className="text-gradient">Creative & Staging Services</span>
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                Empower your listings with photorealistic architectural editing. We blend high-end HDR captures, virtually stage empty rooms with high-fidelity furniture models, and convert overcast skies to gorgeous sunset backdrops.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="gradient" className="w-full font-bold text-xs py-3 px-6 shadow-sm cursor-pointer">
                    Submit Property Photos
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <Clock size={16} className="text-orange-500 animate-pulse" />
                  <span>24-Hour Turnaround Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Before / After Interactive Slider Widget */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex gap-2">
                {(Object.keys(beforeAfterExamples) as Array<keyof typeof beforeAfterExamples>).map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setActiveCreativeTab(tab)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeCreativeTab === tab 
                        ? "bg-slate-900 text-white shadow-sm" 
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {beforeAfterExamples[tab].title}
                  </button>
                ))}
              </div>

              {/* Slider Showcase Box */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-slate-200/80">
                <img 
                  src={beforeAfterExamples[activeCreativeTab].after} 
                  alt="Staged After" 
                  className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                />
                <span className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md z-20">
                  Staged After
                </span>

                <div 
                  className="absolute inset-y-0 left-0 overflow-hidden z-10"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img 
                    src={beforeAfterExamples[activeCreativeTab].before} 
                    alt="Empty Before" 
                    className="absolute inset-y-0 left-0 w-full h-full object-cover max-w-none select-none pointer-events-none"
                    style={{ width: "100%" }}
                  />
                  <span className="absolute bottom-4 left-4 bg-orange-600/90 backdrop-blur-md text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md z-20">
                    Empty Before
                  </span>
                </div>

                <div 
                  className="absolute inset-y-0 z-20 w-1 bg-white cursor-ew-resize flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 bg-white border border-slate-200 shadow-lg rounded-full flex items-center justify-center text-[10px] font-bold text-slate-500 select-none">
                    ↔
                  </div>
                </div>

                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  aria-label="Before after slider"
                />
              </div>

              <p className="text-[10px] text-slate-400 font-semibold text-center italic mt-1 font-sans">
                Drag the divider left or right to inspect the quality. {beforeAfterExamples[activeCreativeTab].desc}
              </p>
            </div>
          </section>

          {/* Staging Services Subdivisions Grid */}
          <section className="bg-slate-50/50 border-y border-slate-200/60 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Creative Services Matrix</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">Specialized Image Retouching</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
                {service.subServices.map((sub: string, idx: number) => (
                  <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-3 glass-card glass-card-hover">
                    <div className="p-2 bg-orange-50 text-orange-500 rounded-lg w-fit">
                      <Home size={18} />
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 font-display">{sub}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Professional enhancements structured to maximize engagement rates on Zillow, Realtor, and commercial portals.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Structures */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Simple Pricing</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">Transparent Rates Matrix</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
              <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm space-y-6 relative flex flex-col justify-between glass-card">
                <div className="space-y-4">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Single Blends</span>
                  <h3 className="text-lg font-bold font-display text-slate-900">HDR Image Editing</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-slate-950 font-display">$1.50</span>
                    <span className="text-xs text-slate-400 ml-1">/ image</span>
                  </div>
                  <ul className="space-y-2 border-t border-slate-100 pt-4">
                    {["16-step exposure blending", "Window view alignment", "Color cast corrections", "Output within 24 hours"].map((bullet, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Check size={13} className="text-green-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="w-full">
                  <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 font-bold text-xs py-3.5 rounded-xl mt-6 cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              </div>

              <div className="bg-white border-2 border-orange-500 rounded-3xl p-8 shadow-md space-y-6 relative flex flex-col justify-between">
                <span className="absolute -top-3 right-6 bg-orange-500 text-white text-[8px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </span>
                <div className="space-y-4">
                  <span className="text-[9px] font-extrabold text-orange-500 uppercase tracking-widest">3D Modeling</span>
                  <h3 className="text-lg font-bold font-display text-slate-900">Virtual Room Staging</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-slate-950 font-display">$15.00</span>
                    <span className="text-xs text-slate-400 ml-1">/ room</span>
                  </div>
                  <ul className="space-y-2 border-t border-slate-100 pt-4">
                    {["Premium 3D furniture models", "Scandinavian or Modern themes", "Unlimited adjustments", "High-res print outcomes"].map((bullet, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Check size={13} className="text-green-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="w-full">
                  <Button variant="gradient" className="w-full font-bold text-xs py-3.5 rounded-xl mt-6 cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              </div>

              <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm space-y-6 relative flex flex-col justify-between glass-card">
                <div className="space-y-4">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Sky Replace</span>
                  <h3 className="text-lg font-bold font-display text-slate-900">Day to Dusk Conversion</h3>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-extrabold text-slate-950 font-display">$4.00</span>
                    <span className="text-xs text-slate-400 ml-1">/ image</span>
                  </div>
                  <ul className="space-y-2 border-t border-slate-100 pt-4">
                    {["Dusk sky replacement", "Interior lighting glowing effects", "Powerline & powerbox removal", "Zillow-optimized outcomes"].map((bullet, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Check size={13} className="text-green-500" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="w-full">
                  <Button variant="outline" className="w-full border-slate-200 hover:bg-slate-50 font-bold text-xs py-3.5 rounded-xl mt-6 cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </section>

        </div>
      ) : (
        /* RENDER FOR STANDARD SERVICES (SaaS Product Layout - UNIQUE visual styling per slug) */
        <div className="space-y-16">
          
          {/* Custom Landing Page Hero */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50/50 border border-slate-100 rounded-2xl w-fit">
                  {iconComponents[service.icon] || <Cpu size={32} className="text-blue-600" />}
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-455 block font-display">
                  Corporate Solutions Division
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
                {t(`services.${slug}.title` as any) || service.title} <br />
                <span className="text-gradient">Solutions Architecting</span>
              </h1>
              
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                {t(`services.${slug}.longDesc` as any) || service.longDesc}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="gradient" className="w-full font-bold text-xs py-3 px-6 shadow-sm cursor-pointer">
                    Book Technical Consult
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full font-bold text-xs py-3 px-6 border-slate-200/80 text-slate-700 hover:bg-slate-50 cursor-pointer bg-white">
                    Request Scope Estimate
                  </Button>
                </Link>
              </div>
            </div>

            {/* Custom Interactive Mockup Widget with Image vs Sandbox Switcher */}
            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-3xl blur-xl" />
              
              {/* Switcher Header */}
              <div className="relative border border-slate-200 bg-white/95 rounded-2xl shadow-xl overflow-hidden glass-card">
                <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <button 
                      type="button"
                      onClick={() => setActiveMockupMode("image")}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                        activeMockupMode === "image" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      UI Concept Visual
                    </button>
                    <button 
                      type="button"
                      onClick={() => setActiveMockupMode("sandbox")}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                        activeMockupMode === "sandbox" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      Interactive Sandbox
                    </button>
                  </div>
                  <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest font-mono">
                    skillforge_demo_panel
                  </span>
                </div>

                <div className="p-4 bg-white">
                  {activeMockupMode === "image" && screenshotPath ? (
                    <div className="space-y-4">
                      {/* Browser mockup wrap */}
                      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                        <img 
                          src={screenshotPath} 
                          alt={`${service.title} Product Mockup Concept`} 
                          className="w-full h-full object-cover select-none pointer-events-none"
                        />
                      </div>
                      <span className="block text-[9px] text-slate-400 font-extrabold text-center uppercase tracking-widest">
                        Original SkillForge UX design concept render
                      </span>
                    </div>
                  ) : (
                    <div>
                      {getMockupWidget(slug)}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* Business Overview & Problems We Solve Section */}
          <section className="bg-slate-50/50 border-y border-slate-200/60 py-20 text-left font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-100 bg-red-50/40 text-[9px] font-bold text-red-650 uppercase tracking-wider">
                  <span>Operational Risks</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                  Problems Businesses Commonly Face
                </h2>
                <div className="space-y-4">
                  {config.problems.map((prob: string, idx: number) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <span className="w-5 h-5 rounded-full bg-red-50 text-red-650 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-sans">!</span>
                      <p className="text-slate-550 text-xs sm:text-sm leading-relaxed">{prob}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/40 text-[9px] font-bold text-blue-655 uppercase tracking-wider">
                  <span>Technical Resolve</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-display">
                  How We Engineer the Solutions
                </h2>
                <div className="space-y-4">
                  {config.solutions.map((sol: string, idx: number) => (
                    <div key={idx} className="flex gap-3 items-start bg-white border border-slate-200/50 p-4 rounded-xl shadow-sm glass-card">
                      <Check size={16} className="text-blue-655 shrink-0 mt-0.5" />
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{sol}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Subdivisions Grid Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left font-sans">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Divisional Capabilities</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">Specialized Capabilities Focus</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.subServices.map((sub: string, idx: number) => (
                <div key={idx} className="bg-white border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-3 hover:border-blue-600 transition-colors group glass-card glass-card-hover">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 font-display block group-hover:text-blue-655 transition-colors">
                    {t(`services.${slug}.subServices.${idx}` as any) || sub}
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Custom modular capability configured for enterprise workloads, security parameters, and robust API endpoints.
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Global Target Capabilities & SEO Section */}
          {serviceKeywords[slug] && (
            <section className="bg-white py-16 border-b border-slate-200/60 text-left font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="max-w-3xl space-y-3">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display animate-pulse">
                    Global Integration & Verification Matrix
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                    Target Capabilities & Technical Architectures
                  </h2>
                  <p className="text-slate-500 text-xs leading-relaxed max-w-2xl font-medium">
                    We engineer high-performance systems for startups, SMEs, and enterprise scale-ups across the United States, United Kingdom, Europe, Canada, and Australia. Our teams align engineering processes to meet standard specifications across the following target parameters:
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {(serviceKeywords[slug] || []).map((keyword: string, idx: number) => (
                    <span 
                      key={idx} 
                      className="text-xs font-semibold text-blue-650 bg-blue-50/40 border border-blue-100 rounded-2xl px-4 py-2 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-default select-none shadow-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Technology stack & Process section */}
          <section className="bg-slate-50/50 border-y border-slate-200/60 py-20 text-left font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">Engineering Stack</span>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display">Primary Development Toolsets</h2>
                <div className="flex flex-wrap gap-2 pt-2">
                  {service.techStack.map((tech: string, idx: number) => (
                    <span key={idx} className="text-xs font-bold text-slate-700 bg-white border border-slate-250/50 rounded-xl px-3 py-1.5 shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">Collaboration Flow</span>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display">Three-Step Development Lifecycle</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                  {[
                    { nr: "01", t: "Analysis & Wireframes", d: "Auditing requirements, building data flows, and routing components." },
                    { nr: "02", t: "Sprint Implementation", d: "Writing clean type-safe script code, database structures, and styling guides." },
                    { nr: "03", t: "QA Handover & IP", d: "Continuous code testing, cloud docker setups, and IP transfer checks." }
                  ].map((step, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-sm space-y-2 glass-card">
                      <span className="text-xs font-extrabold text-blue-650 block">{step.nr}</span>
                      <span className="font-bold text-xs text-slate-900 block font-display">{step.t}</span>
                      <span className="text-[10px] text-slate-555 leading-relaxed block">{step.d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* RELATED PORTFOLIO ITEM SHOWCASE */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left font-sans">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Related Demonstrations</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">Related Project Prototypes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryProjects.map((proj: any, idx: number) => (
                <div key={idx} className="bg-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow glass-card glass-card-hover">
                  <div className="space-y-3">
                    <span className="text-[8px] font-extrabold text-blue-655 bg-blue-50 px-2 py-0.5 rounded uppercase tracking-wider">{proj.tech}</span>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 font-display">{proj.name}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{proj.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4 text-[10px] font-extrabold text-slate-400">
                    Enterprise Prototype Ready
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      )}

      {/* DYNAMIC LABORATORY GALLERY */}
      {localImages.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left border-t border-slate-200/60 font-sans">
          <div className="text-center space-y-3 mb-12">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600 block">Laboratory Gallery</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Prototyping & Assembly Showcase
            </h2>
            <p className="text-slate-500 text-xs max-w-xl mx-auto">
              Inspect physical assemblies, dashboards, and hardware wiring logs engineered in our Perundurai lab.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {localImages.map((imgSrc, idx) => {
              const filename = imgSrc.split("/").pop() || ""
              const cleanTitle = filename
                .replace(/\.[^/.]+$/, "")
                .replace(/[-_]/g, " ")
                .replace(/\b\w/g, c => c.toUpperCase())

              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelectedImage(imgSrc)}
                  className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={cleanTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-800">
                        <ZoomIn size={15} />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 font-display line-clamp-1">
                      {cleanTitle}
                    </h4>
                    <span className="text-[8px] text-slate-400 font-extrabold block mt-1 uppercase tracking-wider">
                      {service.title} Labor Build
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {config.faqs && config.faqs.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-left border-t border-slate-200/60 font-sans">
          <div className="text-center space-y-3 mb-12">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">FAQ Matrix</span>
            <h2 className="text-2xl font-extrabold text-slate-900 font-display">Related Service Questions</h2>
          </div>
          <div className="space-y-6">
            {config.faqs.map((faq: any, index: number) => (
              <div key={index} className="bg-slate-50/50 border border-slate-200/60 p-5 rounded-2xl space-y-2 glass-card">
                <span className="font-bold text-xs sm:text-sm text-slate-900 block font-display">{faq.q}</span>
                <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Segment */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 text-center font-sans">
        <div className="bg-gradient-brand text-white rounded-3xl p-10 sm:p-12 space-y-6 relative overflow-hidden shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
            Need a Custom Scope Estimate for {service.title}?
          </h2>
          <p className="text-slate-100 text-xs leading-relaxed max-w-2xl mx-auto font-sans">
            Discuss options directly with our software architects. We will provide a transparent outline of stack recommendations and timeline budgets.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-slate-50 shadow-md font-bold text-xs py-3.5 px-6 rounded-xl cursor-pointer">
                Request Scope Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX FOR IMAGES */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[80vh] w-full flex flex-col justify-center items-center rounded-2xl overflow-hidden bg-black"
            >
              <img
                src={selectedImage}
                alt="Selected build"
                className="max-w-full max-h-[75vh] object-contain"
              />
              <div className="w-full bg-slate-900 py-3 px-4 text-center">
                <span className="text-xs text-white font-bold font-display">
                  {(selectedImage.split("/").pop() || "")
                    .replace(/\.[^/.]+$/, "")
                    .replace(/[-_]/g, " ")
                    .replace(/\b\w/g, c => c.toUpperCase())}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
