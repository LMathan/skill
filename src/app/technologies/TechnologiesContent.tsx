"use client"

import React from "react"
import Link from "next/link"
import { Cpu, Layers, Smartphone, Cloud, Brain, Activity, CheckCircle, ArrowRight, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"

export default function TechnologiesContent() {
  const { t } = useLanguage()

  const stacks = [
    {
      id: "frontend",
      title: t("tech.stacks.0.title" as any) || "Frontend Engineering",
      icon: <Globe size={24} className="text-blue-650" />,
      desc: t("tech.stacks.0.desc" as any) || "Delivering responsive user interfaces using statically optimized frameworks to ensure quick loading times.",
      tools: ["Next.js", "React", "Vue.js", "Blazor", "TypeScript", "Tailwind CSS", "Redux Toolkit", "GraphQL"]
    },
    {
      id: "backend",
      title: t("tech.stacks.1.title" as any) || "Backend Architecting",
      icon: <Layers size={24} className="text-purple-650" />,
      desc: t("tech.stacks.1.desc" as any) || "Architecting microservice backends, relational databases, cache levels, and asynchronous worker queues.",
      tools: ["Node.js", "Go", "Python", "C# (.NET Core)", "Laravel PHP", "gRPC", "REST APIs", "Redis", "RabbitMQ"]
    },
    {
      id: "mobile",
      title: t("tech.stacks.2.title" as any) || "Mobile App Suites",
      icon: <Smartphone size={24} className="text-pink-600" />,
      desc: t("tech.stacks.2.desc" as any) || "Developing native-quality iOS and Android mobile solutions with local databases and device sensors syncing.",
      tools: ["Flutter", "React Native", "Swift (iOS)", "Kotlin (Android)", "Dart", "Realm", "SQLite", "Firebase Streams"]
    },
    {
      id: "cloud",
      title: t("tech.stacks.3.title" as any) || "Cloud & Infrastructure Operations",
      icon: <Cloud size={24} className="text-sky-600" />,
      desc: t("tech.stacks.3.desc" as any) || "Deploying secure server setups, scaling nodes container setups, and automating testing pipelines.",
      tools: ["AWS Cloud", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Ansible"]
    },
    {
      id: "ai",
      title: t("tech.stacks.4.title" as any) || "Artificial Intelligence & Stacks",
      icon: <Brain size={24} className="text-violet-650" />,
      desc: t("tech.stacks.4.desc" as any) || "Fine-tuning language models, document parsing models, and deploying high-performance computer vision.",
      tools: ["Python", "PyTorch", "TensorFlow", "LangChain", "OpenAI APIs", "Hugging Face", "YOLO v8", "OpenCV"]
    },
    {
      id: "iot",
      title: t("tech.stacks.5.title" as any) || "IoT & Embedded Systems",
      icon: <Activity size={24} className="text-red-500" />,
      desc: t("tech.stacks.5.desc" as any) || "Assembling custom multi-layer PCB circuits, writing firmware codes, and connecting devices via LoRa/MQTT.",
      tools: ["Embedded C/C++", "ESP32", "STM32 ARM", "Raspberry Pi", "Zephyr RTOS", "FreeRTOS", "Altium Designer", "MQTT / BLE"]
    }
  ]

  return (
    <div className="relative bg-white pt-24 pb-20 select-none text-left bg-dot-pattern">
      
      {/* Background patterns */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] bg-blue-500/8 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">{t("tech.badge" as any)}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900">
            {t("tech.titlePart1" as any)} <span className="text-gradient">{t("tech.titlePart2" as any)}</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            {t("tech.subtitle" as any)}
          </p>
        </div>
      </section>

      {/* Grid of stacks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stacks.map((stack, idx) => (
          <div 
            key={idx}
            className="bg-white border border-slate-200/80 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="space-y-4 text-left">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl w-fit">
                {stack.icon}
              </div>
              <h2 className="text-base font-bold font-display text-slate-955">{stack.title}</h2>
              <p className="text-xs text-slate-500 leading-relaxed">{stack.desc}</p>
              
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">{t("tech.toolsDeployLabel" as any)}</span>
                <div className="flex flex-wrap gap-1.5">
                  {stack.tools.map((tool) => (
                    <span 
                      key={tool}
                      className="text-[10px] font-bold text-slate-700 bg-slate-50 border border-slate-200/60 rounded px-2.5 py-1"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
              <span>{t("tech.lintedCodeLabel" as any)}</span>
              <CheckCircle size={14} className="text-green-500" />
            </div>
          </div>
        ))}
      </section>

      {/* CTA section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
        <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-10 max-w-4xl mx-auto space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
            {t("tech.ctaTitle" as any)}
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            {t("tech.ctaSubtitle" as any)}
          </p>
          <div className="flex justify-center">
            <Link href="/contact">
              <Button variant="gradient" className="font-bold text-xs py-3 px-6 shadow-sm flex items-center gap-1.5">
                <span>{t("tech.ctaBtn" as any)}</span>
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
