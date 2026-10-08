"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Building2,
  Cpu,
  Layers,
  Briefcase,
  FileText,
  Mail,
  ChevronRight,
  ArrowRight,
  Globe,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SitemapLink {
  name: string
  href: string
  isExternal?: boolean
  badge?: string
}

interface SitemapSection {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  links: SitemapLink[]
}

export default function SitemapContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Focus search on '/' keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Mouse radial track glow coordinates handler
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const sections: SitemapSection[] = [
    {
      id: "company",
      title: "Company",
      description: "Learn more about our agency mission, core team, operational guidelines, policies, and careers.",
      icon: <Building2 size={20} />,
      color: "from-blue-500/10 to-indigo-500/10 text-blue-600 border-blue-100",
      links: [
        { name: "Home Page", href: "/" },
        { name: "About SkillForge", href: "/about" },
        { name: "Contact & Support", href: "/contact" },
        { name: "Careers Opportunity", href: "/careers", badge: "Hiring" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "SLA Support Contracts", href: "/sla" },
        { name: "Security & Auditing", href: "/security" },
        { name: "Client Reviews & Feedback", href: "/reviews" }
      ]
    },
    {
      id: "services",
      title: "Services & Divisions",
      description: "Explore our 16 core technology divisions delivering custom engineering solutions worldwide.",
      icon: <Cpu size={20} />,
      color: "from-indigo-500/10 to-purple-500/10 text-indigo-600 border-indigo-100",
      links: [
        { name: "Custom Software Development", href: "/services/software-development" },
        { name: "Enterprise Development", href: "/services/enterprise-development" },
        { name: "SaaS Product Engineering", href: "/services/saas-development" },
        { name: "Mobile App Development", href: "/services/mobile-app-development" },
        { name: "Web Development", href: "/services/web-development" },
        { name: "AI Solutions & R&D", href: "/services/ai-solutions", badge: "Trending" },
        { name: "UI/UX Design Studios", href: "/services/ui-ux-design" },
        { name: "Cloud Engineering & DevOps", href: "/services/cloud-solutions" },
        { name: "API Development & Integrations", href: "/services/api-development" },
        { name: "Digital Transformation Consulting", href: "/services/digital-transformation" },
        { name: "Real Estate Photo Editing", href: "/services/real-estate-photo-editing" },
        { name: "SEO & Performance Marketing", href: "/services/seo-performance-marketing" },
        { name: "IoT & Embedded Hardware Systems", href: "/services/iot-embedded-systems" },
        { name: "WordPress Design & Speed Optimization", href: "/services/wordpress-development" },
        { name: "Shopify E-Commerce Stores", href: "/services/shopify-e-commerce" }
      ]
    },
    {
      id: "industries",
      title: "Industries Served",
      description: "Tailored software solutions designed for target sector compliance and operational guidelines.",
      icon: <Layers size={20} />,
      color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-100",
      links: [
        { name: "Industrial Manufacturing", href: "/industries?sector=manufacturing" },
        { name: "Healthcare & HIPAA Compliance", href: "/industries?sector=healthcare" },
        { name: "Construction & Infrastructure", href: "/industries?sector=construction" },
        { name: "Real Estate Portals", href: "/industries?sector=real-estate" },
        { name: "Education & EdTech Solutions", href: "/industries?sector=education" },
        { name: "Finance & Fintech Systems", href: "/industries?sector=finance" },
        { name: "Logistics & Supply Chain", href: "/industries?sector=logistics" },
        { name: "Retail & Multi-Channel commerce", href: "/industries?sector=retail" },
        { name: "Hospitality & Guest Portals", href: "/industries?sector=hospitality" }
      ]
    },
    {
      id: "portfolio",
      title: "Products & Portfolio",
      description: "Discover our consumer software products, technical case studies, and active engineering projects.",
      icon: <Briefcase size={20} />,
      color: "from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-100",
      links: [
        { name: "Mavio Transit & Fleet Platform", href: "/products/mavio", badge: "New Platform" },
        { name: "ExpenseMate App (Personal Finance)", href: "/products/expense-mate", badge: "New App" },
        { name: "ExpenseMate Privacy Policy", href: "/privacy/expense-mate" },
        { name: "Active Pulse Workspace Device", href: "/products/active-pulse" },
        { name: "Products Overview Hub", href: "/products" },
        { name: "Active Engineering Projects", href: "/projects" },
        { name: "Enterprise Case Studies", href: "/case-studies" },
        { name: "Client Testimonials Portal", href: "/reviews" },
        { name: "SkillForge Showcase Portfolio", href: "/portfolio" }
      ]
    },
    {
      id: "resources",
      title: "Resources & Articles",
      description: "Guides, design walkthroughs, custom code repositories, and engineering updates from our team.",
      icon: <FileText size={20} />,
      color: "from-sky-500/10 to-blue-500/10 text-sky-600 border-sky-100",
      links: [
        { name: "Technical Engineering Blog", href: "/blog" },
        { name: "Company FAQs", href: "/contact#faq" },
        { name: "SLA Support Documentation", href: "/sla" },
        { name: "Security Auditing Protocols", href: "/security" }
      ]
    },
    {
      id: "contact",
      title: "Connect & Channels",
      description: "Direct points of communication to get in touch with our offshore solution architects.",
      icon: <Mail size={20} />,
      color: "from-pink-500/10 to-rose-500/10 text-pink-600 border-pink-100",
      links: [
        { name: "Inquiry Contact Form", href: "/contact" },
        { name: "Email: info@skillforgetechnology.app", href: "mailto:info@skillforgetechnology.app" },
        { name: "Support Hotlines: +91 93455 18760", href: "tel:+919345518760" },
        { name: "LinkedIn Company Hub", href: "https://www.linkedin.com/company/skillforgetech/", isExternal: true },
        { name: "GitHub Organization Profile", href: "https://github.com/SkillForgeTechnology", isExternal: true },
        { name: "Google Business Listing", href: "https://share.google/cQUp7lsy9YKmnChWb", isExternal: true }
      ]
    }
  ]

  // Filter sections and links based on search query
  const filteredSections = sections
    .map(section => {
      const filteredLinks = section.links.filter(link =>
        link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.href.toLowerCase().includes(searchQuery.toLowerCase())
      )
      return { ...section, links: filteredLinks }
    })
    .filter(section =>
      section.links.length > 0 ||
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-white pt-28 pb-20 text-left select-none bg-dot-pattern noise-bg overflow-hidden"
    >
      {/* Radial Mouse Track Glow (tracks coordinates) */}
      <div
        className="pointer-events-none absolute -z-10 w-[700px] h-[700px] rounded-full bg-gradient-radial from-blue-500/[0.04] to-transparent blur-3xl transition-all duration-75"
        style={{
          left: `${mousePosition.x - 350}px`,
          top: `${mousePosition.y - 350}px`,
        }}
      />

      {/* Floating Animated Background Blobs */}
      <div className="absolute top-1/4 right-[5%] w-[450px] h-[450px] bg-indigo-500/[0.03] rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/3 left-[5%] w-[380px] h-[380px] bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight size={10} className="text-slate-350" />
          <span className="text-slate-500">Site Map</span>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[9px] font-extrabold text-slate-500 uppercase tracking-widest font-mono">
              <Sparkles size={10} className="text-blue-600 animate-pulse" />
              <span>Navigation Directory</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-slate-900 leading-[1.1]">
              Site Map
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Explore every page and service offered by SkillForge Technologies. Quickly navigate through our software development divisions, client case studies, industries served, technical resources, and organizational profiles.
            </p>
          </div>

          {/* Right Column: Abstract Navigation SVG Visual */}
          <div className="lg:col-span-5 hidden lg:flex justify-center select-none">
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="w-64 h-64 text-blue-500/[0.08]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Nodes and Links Abstract Grid */}
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.3" />
              <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="0.3" />
              <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="currentColor" strokeWidth="0.2" />

              {/* Small Glowing Nodes */}
              <circle cx="50" cy="10" r="2.5" fill="#3b82f6" fillOpacity="0.8" />
              <circle cx="50" cy="90" r="2.5" fill="#6366f1" fillOpacity="0.8" />
              <circle cx="10" cy="50" r="2.5" fill="#3b82f6" fillOpacity="0.8" />
              <circle cx="90" cy="50" r="2.5" fill="#a855f7" fillOpacity="0.8" />
              <circle cx="50" cy="50" r="4" fill="#3b82f6" />
            </motion.svg>
          </div>
        </div>

        {/* Live Search Block */}
        <div className="max-w-2xl mb-16">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-focus-within:opacity-10 blur-xl transition-opacity duration-350 pointer-events-none" />
            <div className="relative bg-white border border-slate-200/90 rounded-2xl p-2 flex items-center shadow-lg shadow-slate-100/5 focus-within:border-blue-500 transition-colors duration-300">
              <Search size={16} className="text-slate-400 ml-3" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sitemap... (Press '/' to focus)"
                className="w-full bg-transparent border-none outline-none focus:ring-0 px-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 py-1.5"
                aria-label="Search site sitemap"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-2.5 py-1 text-[10px] font-bold text-slate-400 hover:text-slate-650 bg-slate-50 border border-slate-150 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sitemap Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredSections.map((section, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                key={section.id}
                className="bg-white/80 backdrop-blur-md border border-slate-200/80 p-6 rounded-3xl hover:shadow-xl transition-all duration-350 flex flex-col justify-between glass-card relative group hover:-translate-y-1 shadow-md shadow-slate-100/10"
              >
                {/* Accent glow on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/[0.01] to-indigo-500/[0.01] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10" />

                <div>
                  {/* Header Row */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`p-2.5 rounded-2xl border bg-gradient-to-br ${section.color} shrink-0`}>
                      {section.icon}
                    </div>
                    <h3 className="text-[15px] font-bold font-display text-slate-900 tracking-tight">
                      {section.title}
                    </h3>
                  </div>

                  <p className="text-slate-500 text-[11px] leading-relaxed mb-6 font-sans">
                    {section.description}
                  </p>

                  {/* Links Loop */}
                  <ul className="space-y-3">
                    {section.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link
                          href={link.href}
                          target={link.isExternal ? "_blank" : undefined}
                          rel={link.isExternal ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-2 group/link text-xs font-semibold text-slate-655 hover:text-blue-600 transition-colors w-full py-0.5 cursor-pointer"
                        >
                          <span className="w-1 h-1 rounded-full bg-slate-300 group-hover/link:bg-blue-500 group-hover/link:scale-125 transition-all shrink-0" />
                          <span className="truncate">{link.name}</span>
                          {link.badge && (
                            <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${link.badge === "Hiring"
                              ? "bg-purple-50 text-purple-600 border border-purple-100"
                              : "bg-blue-50 text-blue-600 border border-blue-100"
                              }`}>
                              {link.badge}
                            </span>
                          )}
                          {link.isExternal ? (
                            <ExternalLink size={10} className="text-slate-400 group-hover/link:text-blue-500 transition-colors shrink-0 ml-auto" />
                          ) : (
                            <ArrowRight size={11} className="text-slate-350 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all shrink-0 ml-auto" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State when search returns nothing */}
        {filteredSections.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200/80 max-w-xl mx-auto"
          >
            <HelpCircle size={32} className="text-slate-400 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-sm font-display">No matching sitemap routes found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn&apos;t find any divisions, resources, or pages matching &quot;{searchQuery}&quot;. Try typing generic terms like &quot;AI&quot; or &quot;Blog&quot;.
            </p>
          </motion.div>
        )}

        {/* Large Premium Bottom CTA */}
        <section className="mt-24 text-center">
          <div className="bg-gradient-brand text-white rounded-3xl p-10 sm:p-14 relative overflow-hidden shadow-xl">
            {/* Background pattern */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 pointer-events-none" />

            <div className="max-w-xl mx-auto space-y-6 relative z-10 font-sans">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
                Didn&apos;t find what you&apos;re looking for?
              </h2>
              <p className="text-slate-100 text-xs sm:text-sm leading-relaxed font-sans">
                Our solutions engineering team is always available to guide you. Book a discovery call or send an inquiry to detail your project specifications.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="w-full bg-white text-blue-650 hover:bg-slate-50 shadow-md font-bold text-xs py-3.5 px-6 rounded-xl cursor-pointer">
                    Contact Us
                  </Button>
                </Link>
                <Button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-book-call-modal"))}
                  className="w-full sm:w-auto bg-transparent border border-white hover:bg-white/10 text-white font-bold text-xs py-3.5 px-6 rounded-xl cursor-pointer"
                >
                  Book Free Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
