"use client"

import React from "react"
import Link from "next/link"
import { 
  Cpu, Globe, Smartphone, Brain, Cloud, TrendingUp, 
  Code, Layers, ShieldAlert, Layout, Activity, Home, Check, ArrowRight, Laptop
} from "lucide-react"
import { agencyServices } from "@/data/agencyData"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { Button } from "@/components/ui/button"

export default function ServicesContent() {
  const { t } = useLanguage()
  
  const iconComponents: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="text-blue-600" size={26} />,
    Globe: <Globe className="text-blue-600" size={26} />,
    Smartphone: <Smartphone className="text-purple-600" size={26} />,
    Brain: <Brain className="text-pink-600" size={26} />,
    Cloud: <Cloud className="text-sky-600" size={26} />,
    TrendingUp: <TrendingUp className="text-emerald-600" size={26} />,
    Code: <Code className="text-indigo-600" size={26} />,
    Layers: <Layers className="text-blue-500" size={26} />,
    ShieldAlert: <ShieldAlert className="text-blue-600" size={26} />,
    Layout: <Layout className="text-violet-600" size={26} />,
    Activity: <Activity className="text-red-500" size={26} />,
    Home: <Home className="text-orange-500" size={26} />
  }

  // Interactive mockup simulator helper for services page
  const renderServiceMockup = (slug: string) => {
    switch (slug) {
      case "software-development":
      case "enterprise-development":
      case "saas-development":
        return (
          <div className="border border-slate-200 bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[380px] mx-auto text-[9px] font-mono leading-relaxed select-none">
            <div className="bg-slate-50 border-b border-slate-100 px-3.5 py-2 flex items-center justify-between">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[8px]">console.sys</span>
            </div>
            <div className="p-4 space-y-3 text-left">
              <div className="bg-slate-900 text-cyan-400 p-2.5 rounded-lg text-[8px] space-y-1">
                <div>$ npm run compile-static</div>
                <div className="text-emerald-450">✓ 61 pages compiled successfully in 2.3s</div>
                <div>$ tail -n 2 ledger.log</div>
                <div className="text-slate-450">API: GET /v1/telemetry 200 OK (8ms)</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[7px] text-slate-400 block uppercase">DB Nodes</span>
                  <span className="font-bold text-slate-900 block">4 Active</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-[7px] text-slate-400 block uppercase">Load Avg</span>
                  <span className="font-bold text-emerald-600 block">99.98% OK</span>
                </div>
              </div>
            </div>
          </div>
        )
      case "web-development":
      case "wordpress-development":
      case "php-development":
      case "react-development":
        return (
          <div className="border border-slate-200 bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[380px] mx-auto select-none">
            <div className="bg-slate-50 border-b border-slate-100 px-3.5 py-2 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="bg-white border border-slate-150 rounded px-2 py-0.5 text-[7px] text-slate-450 w-full truncate text-center ml-2">
                https://skillforge.app/corporate-portal
              </div>
            </div>
            <div className="p-4 space-y-3 text-left font-sans bg-dot-pattern bg-white">
              <div className="h-2.5 w-16 bg-blue-600 rounded-full" />
              <div className="space-y-1">
                <div className="h-4 w-28 bg-slate-900 rounded-full" />
                <div className="h-4 w-20 bg-slate-400 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="h-10 bg-slate-100 rounded-lg border border-slate-200/50" />
                <div className="h-10 bg-slate-100 rounded-lg border border-slate-200/50" />
                <div className="h-10 bg-slate-100 rounded-lg border border-slate-200/50" />
              </div>
            </div>
          </div>
        )
      case "mobile-development":
      case "flutter-development":
        return (
          <div className="w-36 h-60 bg-slate-950 rounded-[24px] p-1.5 shadow-lg border-2 border-slate-800 relative mx-auto flex flex-col justify-between overflow-hidden select-none">
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-950 rounded-full flex items-center justify-center gap-0.5 z-10">
              <div className="w-6 h-0.5 bg-slate-800 rounded-full" />
            </div>
            <div className="bg-white rounded-[18px] p-2 flex-grow flex flex-col justify-between text-left text-[8px] font-sans">
              <div className="space-y-1.5 pt-1.5">
                <span className="font-bold text-slate-400 block text-[6px]">Vitals Feed</span>
                <div className="bg-blue-50 border border-blue-100 rounded p-1 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Heart Rate</span>
                  <span className="font-bold text-blue-600 text-[6px]">72 bpm</span>
                </div>
              </div>
              <div className="h-16 flex items-end gap-1 border-b border-l border-slate-100 p-0.5">
                {[20, 40, 15, 30, 45, 25, 50].map((h, i) => (
                  <div key={i} className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        )
      case "ai-solutions":
        return (
          <div className="border border-slate-200 bg-white rounded-2xl shadow-lg p-4 w-full max-w-[380px] mx-auto text-[8px] font-sans text-left space-y-3 select-none">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <span className="font-extrabold uppercase text-slate-400 block text-[7px]">LLM Dispatcher Core</span>
              <span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded text-[6px] font-bold">RAG ACTIVE</span>
            </div>
            <div className="space-y-2">
              <div className="bg-slate-900 text-white p-2 rounded-lg max-w-[80%] ml-auto">
                Ledger reconciliation audit check
              </div>
              <div className="bg-blue-50 border border-blue-100 text-slate-700 p-2 rounded-lg max-w-[80%]">
                Analyzing transactions... Found 2 tax mismatches in node usr_90. Status FAIL.
              </div>
            </div>
          </div>
        )
      case "cloud-devops":
        return (
          <div className="border border-slate-200 bg-white rounded-2xl shadow-lg p-4 w-full max-w-[380px] mx-auto text-[8px] font-sans text-left space-y-3 select-none">
            <div className="flex justify-between items-center text-[7px] text-slate-400 font-bold uppercase pb-1.5 border-b border-slate-100">
              <span>Cluster pipelines (Kubernetes)</span>
              <span className="text-emerald-500 animate-pulse">● Active</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[7px] font-mono">
              <div className="bg-slate-50 border border-slate-200/50 p-2 rounded-lg flex items-center justify-between">
                <span>auth-api-pod</span>
                <span className="text-emerald-600 font-bold">✓ RUNNING</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/50 p-2 rounded-lg flex items-center justify-between">
                <span>billing-db-pod</span>
                <span className="text-emerald-600 font-bold">✓ RUNNING</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/50 p-2 rounded-lg flex items-center justify-between">
                <span>gateway-svc</span>
                <span className="text-emerald-600 font-bold">✓ RUNNING</span>
              </div>
              <div className="bg-slate-50 border border-slate-200/50 p-2 rounded-lg flex items-center justify-between">
                <span>redis-cache-pod</span>
                <span className="text-emerald-600 font-bold">✓ RUNNING</span>
              </div>
            </div>
          </div>
        )
      case "iot-embedded":
        return (
          <div className="border border-slate-200 bg-emerald-950 rounded-2xl shadow-lg p-4 w-full max-w-[380px] mx-auto text-[8px] font-mono text-emerald-400 relative overflow-hidden h-40 flex flex-col justify-between select-none">
            <div className="absolute inset-0 opacity-10 bg-grid-pattern pointer-events-none" />
            <div className="flex justify-between items-start z-10 text-[7px]">
              <span className="text-emerald-400 font-bold">ESP32_PCBA_CORE_V1</span>
              <span className="text-emerald-500 font-bold uppercase animate-pulse">● Sync On</span>
            </div>
            <div className="border-2 border-emerald-800/80 rounded-xl p-3 z-10 bg-emerald-900/60 max-w-[200px] space-y-1">
              <div className="flex justify-between"><span>TEMP:</span><span className="text-white">28.4°C</span></div>
              <div className="flex justify-between"><span>HUMID:</span><span className="text-white">62.1%</span></div>
              <div className="flex justify-between"><span>RELAY:</span><span className="text-emerald-400 font-bold">CLOSED</span></div>
            </div>
          </div>
        )
      default:
        return (
          <div className="border border-slate-200 bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-[380px] mx-auto text-[8px] font-mono text-left select-none">
            <div className="bg-slate-50 border-b border-slate-100 px-3.5 py-1.5 flex items-center justify-between">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              </div>
              <span className="text-[7px] text-slate-400">index.tsx</span>
            </div>
            <div className="p-3 bg-slate-900 text-blue-300 space-y-1 leading-normal">
              <div><span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;react&apos;</span>;</div>
              <div><span className="text-purple-400">const</span> <span className="text-blue-400">App</span> = () =&gt; &#123;</div>
              <div className="pl-3"><span className="text-purple-400">return</span> &lt;<span className="text-blue-400">div</span>&gt;Enterprise Ready&lt;/<span className="text-blue-400">div</span>&gt;;</div>
              <div>&#125;;</div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-12 select-none">
      {agencyServices.map((service, idx) => {
        const isOdd = idx % 2 === 1
        return (
          <motion.div 
            key={service.slug} 
            id={service.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="p-8 sm:p-10 rounded-3xl border border-slate-200/80 bg-white/60 backdrop-blur-md glass-card-premium relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group text-left noise-bg"
          >
            {/* Subtle backglow */}
            <div className="absolute -right-24 -top-24 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              
              {/* Left/Right Stagger Content */}
              <div className={`lg:col-span-7 space-y-5 ${isOdd ? "lg:order-2" : "lg:order-1"}`}>
                <div className="flex items-center gap-4">
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl w-fit shrink-0">
                    {iconComponents[service.icon] || <Cpu size={26} />}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-display text-slate-900 leading-tight">
                      {t(`services.${service.slug}.title` as any) || service.title}
                    </h2>
                    <span className="text-xs font-semibold text-slate-400 block mt-0.5">{service.tagline}</span>
                  </div>
                </div>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans">
                  {t(`services.${service.slug}.desc` as any) || service.longDesc}
                </p>

                {/* Sub-Services Bullets & Stacks Sub-Console */}
                <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">
                    Focus Parameters & Stacks
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                    {service.subServices.map((bullet, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 text-[11px] text-slate-700 font-semibold leading-tight">
                        <Check className="text-blue-600 shrink-0 mt-0.5" size={13} />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-slate-200/60 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wide mr-1 font-display">Stack Matrix:</span>
                    {service.techStack.map((tech) => (
                      <span key={tech} className="text-[9px] font-extrabold text-blue-600 bg-blue-50/50 rounded px-2 py-0.5">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link href={`/services/${service.slug}`}>
                    <Button variant="outline" size="sm" className="font-bold flex items-center gap-1.5 text-[10px] cursor-pointer hover:bg-slate-50 border-slate-200 bg-white">
                      <span>{t("common.learnMore")}</span>
                      <ArrowRight size={12} />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Staggered Visual Mockup Frame */}
              <div className={`lg:col-span-5 relative flex justify-center items-center ${isOdd ? "lg:order-1" : "lg:order-2"}`}>
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-3xl blur-2xl -z-10" />
                <div className="w-full relative z-10 flex justify-center py-4">
                  {renderServiceMockup(service.slug)}
                </div>
              </div>

            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
