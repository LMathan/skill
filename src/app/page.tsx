"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  Cpu, Layers, Brain, FileText, Smartphone, GraduationCap, 
  CheckCircle, ArrowRight, Star, Plus, Minus, MessageSquare, 
  Code, Zap, DollarSign, Award, ArrowUpRight, ShieldAlert,
  Server, Database, Cloud, Radio
} from "lucide-react"

// Magic UI
import Spotlight from "@/components/magicui/spotlight"
import Particles from "@/components/magicui/particles"
import BorderBeam from "@/components/magicui/border-beam"
import Meteors from "@/components/magicui/meteors"
import Marquee from "@/components/magicui/marquee"
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid"
import ShineBorder from "@/components/magicui/shine-border"
import AnimatedBeam from "@/components/magicui/animated-beam"
import NumberTicker from "@/components/magicui/number-ticker"

// shadcn UI
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

import { projectsData, defaultFeedbacks, servicesData, faqData } from "@/data/siteData"

export default function Home() {
  const [inquirySubmitted, setInquirySubmitted] = useState(false)
  const [feedbacks, setFeedbacks] = useState<any[]>(defaultFeedbacks)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchLiveFeedbacks = async () => {
      try {
        const { collection, getDocs, query, orderBy } = await import("firebase/firestore")
        const { db } = await import("@/lib/firebase")
        const ref = collection(db, "feedbacks")
        const q = query(ref, orderBy("createdAt", "desc"))
        const snapshot = await getDocs(q)
        const list = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            customerName: data.customerName || "Anonymous",
            projectName: data.projectName || "Generic Project",
            message: data.message || "",
            rating: Number(data.rating) || 5
          }
        })
        if (list.length > 0) {
          setFeedbacks(list)
        }
      } catch (error) {
        console.warn("Error fetching live feedbacks for home page marquee", error)
      }
    }
    fetchLiveFeedbacks()
  }, [])

  const [inquiryData, setInquiryData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "IoT Projects",
    message: ""
  })

  // Refs for Animated Beam Diagram
  const containerRef = useRef<HTMLDivElement>(null)
  const sensorRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<HTMLDivElement>(null)
  const cloudRef = useRef<HTMLDivElement>(null)
  const appRef = useRef<HTMLDivElement>(null)

  const handleInquiryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInquiryData(prev => ({ ...prev, [name]: value }))
  }

  const submitInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inquiryData.name.trim() || !inquiryData.email.trim() || !inquiryData.phone.trim() || !inquiryData.message.trim()) {
      alert("Please fill in all required fields.")
      return
    }
    
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: inquiryData.name.trim(),
          email: inquiryData.email.trim(),
          phone: inquiryData.phone.trim(),
          theme: inquiryData.interest,
          message: inquiryData.message.trim(),
        }),
      })

      if (res.ok) {
        setInquirySubmitted(true)
        setInquiryData({ name: "", email: "", phone: "", interest: "IoT Projects", message: "" })
      } else {
        alert("Failed to submit inquiry. Please try again.")
      }
    } catch (err) {
      console.error(err)
      alert("Failed to submit inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Schema Markup (Organization & LocalBusiness JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://skillforgetechnology.app/#organization",
        "name": "SkillForge Technology",
        "url": "https://skillforgetechnology.app/",
        "logo": "https://skillforgetechnology.app/logo.png"
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://skillforgetechnology.app/#localbusiness",
        "name": "SkillForge Technology",
        "telephone": "+919345518760",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Perundurai Road",
          "addressLocality": "Erode",
          "addressRegion": "Tamil Nadu",
          "postalCode": "638052",
          "addressCountry": "IN"
        }
      }
    ]
  }

  // Icons mapper helper
  const iconComponents: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="text-brand-cyan" size={28} />,
    Layers: <Layers className="text-brand-blue" size={28} />,
    Brain: <Brain className="text-brand-indigo" size={28} />,
    FileText: <FileText className="text-purple-500" size={28} />,
    Smartphone: <Smartphone className="text-pink-500" size={28} />,
    GraduationCap: <GraduationCap className="text-emerald-500" size={28} />
  }

  const bentoProjects = projectsData.slice(0, 3)

  return (
    <>
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative overflow-hidden pt-20">
        
        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:py-32">
          {/* Spotlight element */}
          <Spotlight />
          {/* Particles */}
          <Particles quantity={45} className="absolute inset-0 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts */}
            <div className="lg:col-span-7 space-y-6 text-left relative z-10">
              
              {/* Tag reveal */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-cyan/20 bg-brand-cyan/5 text-xs font-bold text-brand-cyan"
              >
                <Zap size={12} className="fill-current" />
                <span>Next-Gen Electronics & Prototyping Lab</span>
              </motion.div>

              {/* Text reveal animation */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-display"
              >
                Forge the Future of <br />
                <span className="text-gradient">Intelligent Systems</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed"
              >
                SkillForge Technology develops high-impact electronics, IoT, and AI-driven systems. Empowering engineering students, researchers, and startups with production-ready hardware development and training.
              </motion.p>

              {/* shadcn CTA buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4 pt-2"
              >
                <Link href="/contact">
                  <Button variant="gradient" size="lg" className="flex items-center gap-2">
                    <span>Start Your Project</span>
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" size="lg" className="rounded-2xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-900/10 hover:bg-slate-100 dark:hover:bg-slate-900/80 flex items-center gap-2">
                    <span>Explore Gallery</span>
                    <ArrowUpRight size={16} />
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Right Visual interactive panel */}
            <div className="lg:col-span-5 relative z-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-panel p-6 sm:p-8 rounded-3xl relative border-white/20 dark:border-white/5 shadow-2xl"
              >
                <Meteors number={12} />
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                  <Code className="text-brand-cyan" size={18} />
                  <span>Lab Prototyping Stacks</span>
                </h3>
                <ul className="space-y-4 relative z-10">
                  {[
                    "Custom PCB Layouts & Schematic Designs",
                    "Advanced IoT Telemetry Dashboards",
                    "TinyML & Computer Vision Edge Inference",
                    "IEEE Project Mentorship & Synopses",
                    "Certified Engineering Internships"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="text-brand-cyan shrink-0 mt-0.5" size={16} />
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-brand-indigo/20 blur-3xl rounded-3xl -z-10 scale-95" />
            </div>

          </div>
        </section>

        {/* Statistics Section (counters) */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl glass-panel text-center">
            {[
              { label: "Projects Completed", value: 54, suffix: "" },
              { label: "Students Guided", value: 103, suffix: "" },
              { label: "Technologies Covered", value: 10, suffix: "+" },
              { label: "Success Rating", value: 99, suffix: "%" }
            ].map((stat, index) => (
              <div key={index} className="space-y-1 border-r last:border-0 border-slate-200 dark:border-slate-800">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-brand-cyan font-display flex justify-center items-center gap-0.5">
                  <NumberTicker value={stat.value} />
                  <span>{stat.suffix}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Our Specializations
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              End-to-end prototyping, hardware programming, and development support for modern intelligence frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-panel glass-panel-hover p-6 rounded-3xl h-full flex flex-col justify-between relative">
                  <BorderBeam size={160} duration={12} colorFrom="#06b6d4" colorTo="#3b82f6" />
                  <div className="space-y-4">
                    <div className="p-3 w-fit rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50">
                      {iconComponents[service.icon]}
                    </div>
                    <CardHeader className="p-0 space-y-1">
                      <CardTitle className="text-xl font-bold text-slate-950 dark:text-white">{service.title}</CardTitle>
                      <CardDescription className="text-xs font-semibold text-brand-cyan tracking-wide uppercase">{service.id} development</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                      {service.shortDesc}
                    </CardContent>
                  </div>
                  <div className="pt-6">
                    <Link 
                      href={`/services#${service.id}`}
                      className="text-xs font-bold text-brand-cyan hover:text-brand-blue flex items-center gap-1 w-fit group"
                    >
                      <span>Learn Modules</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Continuous Tech logo marquee */}
        <section className="relative z-10 py-16 bg-slate-100/30 dark:bg-slate-950/20 border-y border-slate-200/60 dark:border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Supported Technology Stacks</h3>
          </div>
          <Marquee pauseOnHover className="[--duration:24s]">
            {[
              "Arduino Uno / Nano", "Raspberry Pi 4 / 5", "ESP32 DevKit", "ESP8266 NodeMCU",
              "OpenCV Vision", "YOLO Object Models", "Python Programming", "TensorFlow Lite",
              "Flutter Mobile Apps", "React Web Panels", "Blynk IoT Dash", "Firebase Realtime"
            ].map((tech) => (
              <div key={tech} className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 font-semibold text-xs text-slate-600 dark:text-slate-300 shadow-sm shrink-0">
                {tech}
              </div>
            ))}
          </Marquee>
        </section>

        {/* Project Bento Grid */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-950 dark:text-white">Featured Project Designs</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              Innovative embedded and intelligent systems engineered inside our laboratory.
            </p>
          </div>

          <BentoGrid>
            {bentoProjects.map((p, i) => (
              <BentoCard
                key={i}
                name={p.title}
                description={p.description}
                href={`/projects?search=${encodeURIComponent(p.title)}`}
                cta="Read design parameters"
                Icon={Cpu}
                className={i === 0 ? "md:col-span-2" : "md:col-span-1"}
                background={
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-brand-blue/5 dark:from-brand-cyan/2 dark:to-brand-blue/2 pointer-events-none" />
                }
              />
            ))}
          </BentoGrid>
        </section>

        {/* Achievements (SIH 2023 Winner Highlight & Animated Beam) */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Node Connection beam mockup */}
            <div className="lg:col-span-6 relative h-96 flex items-center justify-center p-8 border border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-900/5 dark:bg-slate-950/20" ref={containerRef}>
              
              {/* Nodes layout grid */}
              <div className="flex flex-col justify-between h-full w-full max-w-sm relative z-20">
                <div className="flex justify-between items-center w-full">
                  <div ref={sensorRef} className="p-4 rounded-full border border-cyan-500/20 bg-white dark:bg-slate-900 text-brand-cyan shadow-lg relative z-20 flex flex-col items-center">
                    <Radio size={24} />
                    <span className="text-[10px] font-bold mt-1 uppercase">Sensors</span>
                  </div>
                  <div ref={appRef} className="p-4 rounded-full border border-pink-500/20 bg-white dark:bg-slate-900 text-pink-500 shadow-lg relative z-20 flex flex-col items-center">
                    <Smartphone size={24} />
                    <span className="text-[10px] font-bold mt-1 uppercase">Mobile</span>
                  </div>
                </div>

                <div className="mx-auto my-4 relative">
                  <div ref={controllerRef} className="p-5 rounded-full border border-white/20 bg-gradient-brand text-white shadow-2xl relative z-30 flex flex-col items-center">
                    <Cpu size={28} />
                    <span className="text-[10px] font-bold mt-1 uppercase">Core Node</span>
                  </div>
                </div>

                <div className="flex justify-center w-full">
                  <div ref={cloudRef} className="p-4 rounded-full border border-blue-500/20 bg-white dark:bg-slate-900 text-brand-blue shadow-lg relative z-20 flex flex-col items-center">
                    <Cloud size={24} />
                    <span className="text-[10px] font-bold mt-1 uppercase">Cloud</span>
                  </div>
                </div>
              </div>

              {/* Animated Beams connections */}
              <AnimatedBeam containerRef={containerRef} fromRef={sensorRef} toRef={controllerRef} curvature={40} gradientStartColor="#06b6d4" gradientStopColor="#3b82f6" />
              <AnimatedBeam containerRef={containerRef} fromRef={controllerRef} toRef={appRef} curvature={40} gradientStartColor="#3b82f6" gradientStopColor="#6366f1" />
              <AnimatedBeam containerRef={containerRef} fromRef={controllerRef} toRef={cloudRef} curvature={-40} gradientStartColor="#06b6d4" gradientStopColor="#3b82f6" />
            </div>

            {/* Right achievements summary */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="p-2.5 rounded-xl border border-yellow-500/30 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 font-bold text-xs flex items-center gap-2 w-fit">
                <Award size={16} />
                <span>Smart India Hackathon (SIH) 2023 Winner Highlight</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-950 dark:text-white">
                Award-Winning <br />
                <span className="text-gradient">Engineering Standards</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                SkillForge Technology stands for verified excellence. In 2023, our design team secured the National Winner award at the Smart India Hackathon (SIH) for developing predictive smart IoT nodes, establishing our standards at the highest academic and national tiers.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-2xl font-bold text-brand-cyan">SIH 2023</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase mt-0.5">National Rank 1 Award</p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-brand-cyan">100%</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase mt-0.5">Working Hardware Guarantee</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Testimonials Auto-marquee */}
        <section className="relative z-10 py-20 bg-slate-50/50 dark:bg-transparent border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold font-display text-slate-950 dark:text-white">Student Reviews</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400">
              See what engineering graduates and project partners say about our hardware.
            </p>
          </div>

          <Marquee pauseOnHover className="[--duration:36s]">
            {feedbacks.map((f, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl w-80 flex flex-col justify-between shrink-0 hover:border-brand-cyan/20 transition-colors">
                <div className="space-y-4">
                  <div className="flex text-amber-500 gap-0.5">
                    {[...Array(f.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm italic text-slate-600 dark:text-slate-400 leading-relaxed">
                    "{f.message}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 text-left">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{f.customerName}</h4>
                  <p className="text-xs text-brand-cyan font-semibold">{f.projectName}</p>
                </div>
              </div>
            ))}
          </Marquee>
        </section>

        {/* FAQ Accordion (using shadcn-style accordion) */}
        <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold font-display text-slate-950 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-slate-550 dark:text-slate-400">
              Find answers to queries regarding source code, customization, and hardware guidance.
            </p>
          </div>

          <Accordion>
            {faqData.map((faq, index) => (
              <AccordionItem key={index} id={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact Form Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-16">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border-white/20 dark:border-white/5 bg-gradient-to-br from-white/90 to-white/40 dark:from-slate-900/80 dark:to-slate-950/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Texts */}
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="p-3 w-fit rounded-2xl bg-brand-cyan/10 text-brand-cyan">
                  <MessageSquare size={28} />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white font-display">
                  Discuss Your <br />
                  <span className="text-gradient">Project Parameters</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                  Have a specific hardware prototype or custom PCB design query? Fill in the fields below and our design engineers will contact you to map out solutions.
                </p>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-cyan">
                      <Zap size={16} />
                    </span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Initial review is entirely free</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-brand-cyan">
                      <CheckCircle size={16} />
                    </span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Includes annotated codes & schemas</span>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-7">
                {inquirySubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 text-center space-y-4"
                  >
                    <CheckCircle className="text-emerald-500 mx-auto" size={48} />
                    <h3 className="text-2xl font-bold text-emerald-500">Form Inquiry Logged!</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      Thank you for submitting your project parameters. A design engineer from our Perundurai lab will contact you shortly.
                    </p>
                    <Button onClick={() => setInquirySubmitted(false)} variant="gradient" className="font-semibold text-sm">
                      Submit Another Inquiry
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={submitInquiry} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">Full Name *</label>
                        <Input
                          type="text"
                          name="name"
                          value={inquiryData.name}
                          onChange={handleInquiryChange}
                          className="bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 focus-visible:ring-brand-cyan"
                          placeholder="Arun Kumar"
                          required
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">Email Address *</label>
                        <Input
                          type="email"
                          name="email"
                          value={inquiryData.email}
                          onChange={handleInquiryChange}
                          className="bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 focus-visible:ring-brand-cyan"
                          placeholder="arun@gmail.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">Phone Number *</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={inquiryData.phone}
                          onChange={handleInquiryChange}
                          className="bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 focus-visible:ring-brand-cyan"
                          placeholder="+91 94432 10987"
                          required
                        />
                      </div>
                      <div className="space-y-1.5 text-left">
                        <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">Course Domain</label>
                        <select
                          name="interest"
                          value={inquiryData.interest}
                          onChange={handleInquiryChange}
                          className="flex h-11 w-full rounded-xl border border-input border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 px-4 py-2 text-sm focus-visible:outline-none text-slate-700 dark:text-slate-300"
                        >
                          <option>IoT Projects</option>
                          <option>Embedded Systems</option>
                          <option>AI & Machine Learning</option>
                          <option>IEEE Research Projects</option>
                          <option>Web/Mobile App Dev</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">Project specifications / Message</label>
                      <textarea
                        name="message"
                        value={inquiryData.message}
                        onChange={handleInquiryChange}
                        rows={4}
                        className="flex w-full rounded-xl border border-input border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan text-slate-700 dark:text-slate-300"
                        placeholder="Detail sensors, target microcontrollers (e.g. Arduino, ESP32) or software requirements..."
                      />
                    </div>

                    <Button type="submit" variant="gradient" size="lg" className="w-full font-bold" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Project Parameters"}
                    </Button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  )
}
