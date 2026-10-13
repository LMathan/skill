"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Search, Cpu, Brain, Laptop, Terminal, Sparkles, AlertCircle, CheckCircle2, Loader2, ArrowRight } from "lucide-react"
import { projectsData, Project } from "@/data/siteData"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import BorderBeam from "@/components/magicui/border-beam"

const categories = [
  { id: "All", label: "All Projects", icon: Sparkles },
  { id: "IoT & Embedded", label: "IoT & Embedded", icon: Cpu },
  { id: "AI & ML", label: "AI & ML", icon: Brain },
  { id: "Robotics", label: "Robotics", icon: Terminal },
  { id: "Software Stacks", label: "Software Stacks", icon: Laptop },
] as const

type CategoryType = "All" | "IoT & Embedded" | "AI & ML" | "Robotics" | "Software Stacks"

export default function ProjectsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All")
  const [inquiryProject, setInquiryProject] = useState<Project | null>(null)
  
  // Inquiry form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [college, setCollege] = useState("")
  const [message, setMessage] = useState("")
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [honeypot, setHoneypot] = useState("")

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      "All": projectsData.length,
      "IoT & Embedded": 0,
      "AI & ML": 0,
      "Robotics": 0,
      "Software Stacks": 0,
    }
    projectsData.forEach(p => {
      if (p.category in counts) {
        counts[p.category]++
      }
    })
    return counts
  }, [])

  const handleInquirySubmit = async (e: React.FormEvent) => {
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
          theme: `Project Inquiry: ${inquiryProject?.title || "General"}`,
          message: `${message.trim()}${college.trim() ? `\n\n(Organization: ${college.trim()})` : ""}`,
          _gotcha: honeypot,
        }),
      })

      if (res.ok) {
        setFormStatus("success")
        setTimeout(() => {
          // Reset form
          setName("")
          setEmail("")
          setPhone("")
          setCollege("")
          setMessage("")
          setFormStatus("idle")
          setInquiryProject(null)
        }, 2000)
      } else {
        setFormStatus("error")
      }
    } catch (err) {
      console.error("Error submitting project inquiry:", err)
      setFormStatus("error")
    }
  }

  // Animation constants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden py-24 px-4 sm:px-6 lg:px-8">

      {/* Glow shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              show: { opacity: 1, y: 0 }
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Sparkles size={12} />
            SkillForge Repository
          </motion.div>
          
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: -10 },
              show: { opacity: 1, y: 0 }
            }}
            className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Explore Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">Innovation Catalog</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
            className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed"
          >
            Discover over 54+ custom engineering projects engineered with full source code, high-quality hardware schematics, and industry-grade testing parameters.
          </motion.p>
        </motion.div>

        {/* Search & Filter Toolbar */}
        <div className="space-y-6 mb-12">
          {/* Search bar */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <Input
              type="text"
              placeholder="Search by title, technology, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 bg-white/80 dark:bg-slate-900/60 backdrop-blur border-slate-200 dark:border-white/10 rounded-2xl w-full text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-sky-500/50"
            />
          </motion.div>

          {/* Categories Grid */}
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                  delayChildren: 0.35
                }
              }
            }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => {
              const Icon = cat.icon
              const isSelected = selectedCategory === cat.id
              return (
                <motion.button
                  key={cat.id}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 10 },
                    show: { opacity: 1, scale: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium ${
                    isSelected
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 border-sky-400 text-white shadow-lg shadow-sky-500/20"
                      : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-950 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-900/80"
                  }`}
                >
                  <Icon size={15} />
                  <span>{cat.label}</span>
                  <span className={`text-xs ml-1 px-1.5 py-0.5 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                  }`}>
                    {categoryCounts[cat.id]}
                  </span>
                </motion.button>
              )
            })}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="relative min-h-[400px]">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  variants={itemVariants}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  transition={{ duration: 0.3 }}
                  className="group relative"
                >
                <Card className="h-full bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 backdrop-blur-md rounded-3xl flex flex-col justify-between overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300">
                  {/* Decorative Border Beam on Hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <BorderBeam duration={8} size={250} />
                  </div>

                  <CardHeader className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-semibold tracking-wider text-sky-600 dark:text-sky-400 px-2 py-0.5 bg-sky-500/5 dark:bg-sky-500/10 border border-sky-500/20 rounded-md">
                        {project.category}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 pt-0 flex-grow">
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 border-t border-slate-200 dark:border-white/5 mt-auto flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Ready Implementation</span>
                    <Button
                      onClick={() => setInquiryProject(project)}
                      className="rounded-xl bg-slate-100 hover:bg-sky-500 hover:text-white dark:bg-slate-800 dark:hover:bg-sky-500 text-slate-700 dark:text-white text-xs py-2 px-3 flex items-center gap-1.5 group-hover:translate-x-0.5 transition-all"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight size={12} className="opacity-75" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200 dark:border-white/5 rounded-3xl backdrop-blur-sm max-w-xl mx-auto"
          >
            <AlertCircle className="mx-auto text-slate-500 mb-4" size={48} />
            <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">No Projects Found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              We couldn&apos;t find any project matching &quot;{searchQuery}&quot;. Please try a different query or switch categories.
            </p>
          </motion.div>
        )}
      </div>

      {/* Inquiry Dialog Modal */}
      <Dialog open={inquiryProject !== null} onOpenChange={(open) => !open && setInquiryProject(null)}>
        <DialogContent className="max-w-md bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl relative text-slate-900 dark:text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold font-display text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="text-sky-500 dark:text-sky-400" size={20} />
              Inquire Project
            </DialogTitle>
            <DialogDescription className="text-slate-600 dark:text-slate-400 text-sm">
              Get details, pricing, and documentation structure for: <br />
              <strong className="text-sky-600 dark:text-sky-300 font-bold mt-1 inline-block">{inquiryProject?.title}</strong>
            </DialogDescription>
          </DialogHeader>

          {formStatus === "success" ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle2 className="text-emerald-500 w-16 h-16 animate-bounce mb-4" />
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">Inquiry Submitted!</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs">
                Thank you! Our engineering team will contact you shortly with full documentation details and demo videos.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4 mt-2">
              {/* Honeypot — hidden from humans, catches bots */}
              <input
                type="text"
                name="_gotcha"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">Full Name *</label>
                <Input
                  required
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 rounded-xl focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wider mb-1">Email Address *</label>
                  <Input
                    required
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 rounded-xl focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wider mb-1">Phone Number *</label>
                  <Input
                    required
                    type="tel"
                    placeholder="Mobile / Whatsapp"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 rounded-xl focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wider mb-1">Company / Organization Name</label>
                <Input
                  type="text"
                  placeholder="Enter organization / company name"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 rounded-xl focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wider mb-1">Custom Requirements / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Mention if you need custom integrations, specific microcontroller components, or direct review dates..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 rounded-xl p-3 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              {formStatus === "error" && (
                <div className="text-red-400 text-xs flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 p-2 rounded-lg">
                  <AlertCircle size={14} />
                  <span>Please fill out all mandatory fields correctly.</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full py-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium flex items-center justify-center gap-2"
              >
                {formStatus === "submitting" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <span>Submit Inquiry Request</span>
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
