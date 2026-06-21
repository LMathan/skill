"use client"

import React, { useState } from "react"
import { motion, Variants } from "framer-motion"
import { Sparkles, ArrowRight, CheckCircle, Cpu, Brain, Award, ShieldAlert, CheckCircle2, Loader2, MessageSquare, Phone, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import Particles from "@/components/magicui/particles"
import BorderBeam from "@/components/magicui/border-beam"
import Spotlight from "@/components/magicui/spotlight"
import { SEOPageData } from "@/data/seoLandingData"
import { projectsData } from "@/data/siteData"

interface LocalLandingClientProps {
  content: SEOPageData
  slug: string
}

export default function LocalLandingClient({ content, slug }: LocalLandingClientProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [college, setCollege] = useState("")
  const [message, setMessage] = useState("")
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setFormStatus("error")
      return
    }

    setFormStatus("submitting")

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          theme: `Landing Page Inquiry (${content.category} - ${content.city})`,
          message: `${message.trim()}${college.trim() ? `\n\n(College: ${college.trim()})` : ""}`,
        }),
      })

      if (res.ok) {
        setFormStatus("success")
        setName("")
        setEmail("")
        setPhone("")
        setCollege("")
        setMessage("")
        setTimeout(() => setFormStatus("idle"), 3000)
      } else {
        setFormStatus("error")
      }
    } catch (err) {
      console.error("Error submitting SEO lead form:", err)
      setFormStatus("error")
    }
  }

  // Filter projects relevant to the current page category
  const relevantProjects = projectsData.filter((p) => {
    if (content.category.includes("IoT")) {
      return p.category === "IoT & Embedded"
    }
    if (content.category.includes("Embedded")) {
      return p.category === "IoT & Embedded"
    }
    if (content.category.includes("AI") || content.category.includes("Machine")) {
      return p.category === "AI & ML"
    }
    // Default fallback or general projects
    return p.category === "IoT & Embedded" || p.category === "AI & ML"
  }).slice(0, 3)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  }

  const whatsappUrl = `https://wa.me/919345518760?text=Hello%20SkillForge%20Technology,%20I%20would%20like%20to%20discuss%20a%20project%20for%20${encodeURIComponent(content.category)}%20in%20${encodeURIComponent(content.city)}.`

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <Particles className="absolute inset-0 z-0 opacity-40 pointer-events-none" quantity={60} staticity={50} />

      {/* Glow shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Spotlight decoration */}
        <Spotlight />

        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto mb-20 space-y-6 pt-10"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2"
          >
            <MapPin size={12} className="text-cyan-400" />
            <span>Verified Lab Center • {content.city}, Tamil Nadu</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-900 dark:text-white leading-[1.1]"
          >
            {content.h1}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-slate-600 dark:text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {content.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Button
              onClick={() => {
                document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
              }}
              variant="gradient"
              size="lg"
              className="flex items-center gap-2"
            >
              <span>Discuss Your Project</span>
              <ArrowRight size={16} />
            </Button>
            <Button
              onClick={() => window.open(whatsappUrl, "_blank")}
              variant="outline"
              size="lg"
              className="rounded-2xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 bg-slate-900/10 hover:bg-slate-100 dark:hover:bg-slate-900/80 flex items-center gap-2"
            >
              <MessageSquare size={16} className="text-emerald-500 fill-emerald-500" />
              <span>WhatsApp Chat</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Benefits Grid */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">{content.h2}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Why engineering students across Tamil Nadu trust SkillForge Technology</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "100% Working Prototype",
                desc: "We deliver fully assembled, tested, and working hardware prototypes (Arduino, ESP32, STM32, AI cameras) with no missing parts.",
                icon: <Cpu className="text-cyan-400" size={24} />
              },
              {
                title: "Full Report & Source Code",
                desc: "Get annotated codes, libraries, circuit schematics, block diagrams, flowcharts, PPT templates, and a complete project thesis document.",
                icon: <Award className="text-indigo-400" size={24} />
              },
              {
                title: "Viva & Review Mentoring",
                desc: "Get video explanations, mock viva interviews, and direct guidance sessions from design coordinators to clear your college panels.",
                icon: <Brain className="text-purple-400" size={24} />
              }
            ].map((benefit, idx) => (
              <Card key={idx} className="bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 backdrop-blur-sm p-6 rounded-2xl relative overflow-hidden">
                <div className="p-3 w-fit rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-950 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Local Colleges Section */}
        <section className="mb-20 bg-slate-100/30 dark:bg-slate-900/10 border border-slate-200 dark:border-white/5 rounded-3xl p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">
                Supporting Colleges in <span className="text-gradient">{content.city}</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                We cater to students, research scholars, and academic panels from all leading technical campuses in the {content.city} and surrounding Tamil Nadu districts. Our prototype parameters match the strict guidelines of their respective departments.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.colleges.map((college, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-white/70 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 rounded-xl shadow-sm"
                  >
                    <CheckCircle className="text-emerald-500 shrink-0" size={16} />
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug">{college}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Technical Roadmap & Core Engineering Guidelines (SEO Long-Form Content) */}
        {content.longContent && (
          <section className="mb-20 glass-panel p-8 sm:p-12 rounded-3xl border-white/20 dark:border-white/5 bg-slate-900/5 dark:bg-slate-950/20 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-950 dark:text-white mb-6">
              Detailed Technical Roadmap & Core Engineering Guidelines
            </h2>
            <div className="prose dark:prose-invert max-w-none text-sm sm:text-base text-slate-600 dark:text-slate-400 space-y-6 leading-relaxed">
              {content.longContent.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("###")) {
                  return (
                    <h3 key={index} className="text-xl font-bold font-display text-slate-900 dark:text-white mt-8 mb-4">
                      {paragraph.replace("###", "").trim()}
                    </h3>
                  )
                }
                if (paragraph.startsWith("####")) {
                  return (
                    <h4 key={index} className="text-lg font-bold font-display text-slate-900 dark:text-white mt-6 mb-3">
                      {paragraph.replace("####", "").trim()}
                    </h4>
                  )
                }
                if (paragraph.startsWith("*")) {
                  return (
                    <ul key={index} className="list-disc pl-5 my-4 space-y-2">
                      {paragraph.split("\n").map((line, lIdx) => {
                        const cleanLine = line.replace(/^\*\s*/, "")
                        const boldMatch = cleanLine.match(/\*\*(.*?)\*\*(.*)/)
                        if (boldMatch) {
                          return (
                            <li key={lIdx}>
                              <strong>{boldMatch[1]}</strong>
                              {boldMatch[2]}
                            </li>
                          )
                        }
                        return <li key={lIdx}>{cleanLine}</li>
                      })}
                    </ul>
                  )
                }
                return (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </section>
        )}

        {/* Selected Project Concepts */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">Relevant {content.category} Modules</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Verified engineering concepts with full source code & reporting documentation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relevantProjects.map((p) => (
              <Card key={p.title} className="bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 backdrop-blur-sm rounded-3xl flex flex-col justify-between overflow-hidden relative">
                <BorderBeam duration={10} size={200} />
                <CardHeader className="p-6">
                  <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2 py-0.5 rounded w-fit mb-3">
                    {p.category}
                  </span>
                  <CardTitle className="text-lg font-bold font-display text-slate-900 dark:text-white leading-tight">
                    {p.title}
                  </CardTitle>
                  <CardDescription className="text-slate-550 dark:text-slate-400 mt-2 text-xs leading-relaxed">
                    {p.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="flex flex-wrap gap-1.5">
                    {p.technologies.map((t) => (
                      <span key={t} className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0 border-t border-slate-200 dark:border-white/5 mt-auto flex items-center justify-between">
                  <span className="text-xs text-slate-500">Ready Prototype</span>
                  <Button
                    onClick={() => {
                      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
                      setMessage(`Inquiry regarding Project Prototype: ${p.title}`)
                    }}
                    className="rounded-lg bg-slate-100 hover:bg-cyan-500 hover:text-white dark:bg-slate-800 dark:hover:bg-cyan-500 text-slate-700 dark:text-white text-xs py-1.5 px-2.5 flex items-center gap-1.5 transition-all"
                  >
                    Inquire
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Local FAQs Section */}
        <section className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-slate-555 dark:text-slate-400 text-sm mt-1">Common queries regarding project development in {content.city}</p>
          </div>

          <Accordion>
            {content.faqs.map((faq, idx) => (
              <AccordionItem key={idx} id={`local-faq-${idx}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Lead Generation Form */}
        <section id="lead-form" className="mb-10 max-w-3xl mx-auto">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-white/95 to-white/40 dark:from-slate-900/80 dark:to-slate-950/20 shadow-2xl relative overflow-hidden">
            <BorderBeam duration={12} size={300} />
            <div className="text-center mb-8 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-950 dark:text-white">Start Your Custom Project</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Submit your project parameters and consult directly with our Erode lab engineers.</p>
            </div>

            {formStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3 animate-pulse">
                <CheckCircle2 className="text-emerald-500 w-16 h-16" />
                <h3 className="text-xl font-bold text-slate-950 dark:text-white">Inquiry Logged Successfully!</h3>
                <p className="text-slate-550 dark:text-slate-400 text-sm max-w-xs">
                  Thank you! An engineer will reach out to you within 24 hours to discuss pricing, wiring schematics, and timeline blocks.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-550 dark:text-slate-400">Full Name *</label>
                    <Input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 focus-visible:ring-cyan-500/50"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-550 dark:text-slate-400">Email Address *</label>
                    <Input
                      type="email"
                      required
                      placeholder="email@college.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 focus-visible:ring-cyan-500/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-550 dark:text-slate-400">Phone Number *</label>
                    <Input
                      type="tel"
                      required
                      placeholder="Mobile / Whatsapp"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 focus-visible:ring-cyan-500/50"
                    />
                  </div>
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-550 dark:text-slate-400">College / University Name</label>
                    <Input
                      type="text"
                      placeholder="e.g. Kongu Engineering"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="bg-white/40 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 focus-visible:ring-cyan-500/50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-extrabold uppercase tracking-widest text-slate-550 dark:text-slate-400">Project requirements / Message</label>
                  <textarea
                    rows={4}
                    placeholder="Describe custom features, microcontroller specifications (Arduino, ESP32, Raspberry Pi) or documentation deadlines..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 px-4 py-2.5 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 text-slate-700 dark:text-slate-300"
                  />
                </div>

                {formStatus === "error" && (
                  <div className="text-red-400 text-xs flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
                    <ShieldAlert size={14} />
                    <span>Please enter valid information in all mandatory fields.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  variant="gradient"
                  size="lg"
                  className="w-full font-bold flex items-center justify-center gap-2"
                >
                  {formStatus === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Submitting details...</span>
                    </>
                  ) : (
                    <span>Submit Project Details</span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
