"use client"

import React, { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Home, Camera, Sparkles, Image as ImageIcon, Sliders, Layers, 
  Paintbrush, RefreshCw, Send, CheckCircle2, ChevronDown, Trash2, 
  Shield, Users, Clock, DollarSign, CloudUpload, Award, Check, X,
  Maximize2, Zap, Palette, Brush, Eye, CheckCircle, HelpCircle
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface RealEstateLandingPageProps {
  service: any
  localImages: string[]
}

export default function RealEstateLandingPage({ service, localImages }: RealEstateLandingPageProps) {
  // State for Before/After comparison slider active tab
  const [activeSliderTab, setActiveSliderTab] = useState<"hdr" | "sky" | "twilight" | "staging" | "removal">("hdr")
  
  // State for drag handle position (0 to 100 percentage)
  const [sliderPosition, setSliderPosition] = useState(50)
  const sliderRef = useRef<HTMLDivElement>(null)

  // State for FAQs accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // State for Drag & Drop Scoper quote form
  const [quoteEmail, setQuoteEmail] = useState("")
  const [quoteService, setQuoteService] = useState("HDR Photo Editing")
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Before / After images data
  const comparisonData = {
    hdr: {
      title: "HDR Blending",
      before: "/gallery/real-estate-creative/hdr_before.jpg",
      after: "/gallery/real-estate-creative/hdr_after.jpg",
      desc: "Balanced high dynamic range blending, eliminating overexposed windows and brightening deep shadows."
    },
    sky: {
      title: "Sky Replacement",
      before: "/gallery/real-estate-creative/sky_before.jpg",
      after: "/gallery/real-estate-creative/sky_after.jpg",
      desc: "Replacing grey, overcast skies with vibrant, sunny blue backdrops to make properties look inviting."
    },
    twilight: {
      title: "Virtual Twilight",
      before: "/gallery/real-estate-creative/twilight_before.jpg",
      after: "/gallery/real-estate-creative/twilight_after.jpg",
      desc: "Converting daytime property exteriors into premium dusk listings with warm interior lights and glowing skies."
    },
    staging: {
      title: "Virtual Staging",
      before: "/gallery/real-estate-creative/staging_before.jpg",
      after: "/gallery/real-estate-creative/staging_after.jpg",
      desc: "Digitally inserting realistic modern sofas, rugs, plants, and tables into empty, vacant rooms."
    },
    removal: {
      title: "Object Removal",
      before: "/gallery/real-estate-creative/removal_before.jpg",
      after: "/gallery/real-estate-creative/removal_after.jpg",
      desc: "Removing unsightly clutter, trash bins, pool leaves, and debris for a flawless property presentation."
    }
  }

  // Handle Before/After slider dragging
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(position)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(position)
  }

  // Scoper quote file upload simulation
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const fileNames = Array.from(e.dataTransfer.files).map(file => file.name)
      setUploadedFiles(prev => [...prev, ...fileNames])
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileNames = Array.from(e.target.files).map(file => file.name)
      setUploadedFiles(prev => [...prev, ...fileNames])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quoteEmail) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/real-estate-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: quoteEmail,
          service: quoteService,
          files: uploadedFiles
        })
      })

      if (response.ok) {
        setFormSubmitted(true)
        setUploadedFiles([])
        setQuoteEmail("")
        setTimeout(() => {
          setFormSubmitted(false)
        }, 5000)
      } else {
        const errorData = await response.json()
        alert(errorData.error || "Failed to submit quote request.")
      }
    } catch (err) {
      console.error("Quote Submission Error:", err)
      alert("An unexpected network error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative bg-transparent pt-24 overflow-x-hidden selection:bg-blue-500/20 text-slate-800 bg-dot-pattern">
      
      {/* Dynamic Schema Structured Data Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Real Estate Photo Editing Services",
              "provider": {
                "@type": "Organization",
                "name": "SkillForge Technology",
                "url": "https://skillforge.tech",
                "logo": "https://skillforge.tech/logo.png"
              },
              "areaServed": [
                { "@type": "Country", "name": "USA" },
                { "@type": "Country", "name": "Canada" },
                { "@type": "Country", "name": "UK" },
                { "@type": "Country", "name": "Australia" }
              ],
              "description": "Professional real estate image editing services specializing in HDR blending, sky replacement, virtual twilight, and virtual staging.",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Real Estate Photography Retouching Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "HDR Photo Editing" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Virtual Twilight Day to Dusk Conversion" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Virtual Staging" } }
                ]
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How long does real estate photo editing take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our standard turnaround time is 24 hours. For urgent listings, we offer same-day express delivery within 12 hours."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you offer a free sample edit?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we offer up to 3 free sample edits for new real estate photographers and agencies to test our quality before placing bulk orders."
                  }
                }
              ]
            }
          ])
        }}
      />

      {/* Floating Sticky CTA Strip */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <Link href="#quote-form" className="bg-gradient-to-r from-blue-650 to-indigo-650 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-5 rounded-full shadow-xl flex items-center gap-2 text-xs transition-all hover:scale-105">
          <Zap size={14} className="animate-bounce" />
          <span>Get Free Sample</span>
        </Link>
      </div>

      {/* Ambient background decoration */}
      <div className="absolute top-10 left-1/4 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/40 text-[9px] font-bold text-blue-600 uppercase tracking-wider">
              <Camera size={11} />
              <span>Real Estate Post-Processing Division</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              Professional Real Estate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-650 to-indigo-650">Photo Editing Services</span> for Realtors & Photographers
            </h1>
            
            <p className="text-slate-500 text-xs sm:text-base leading-relaxed font-sans font-medium">
              Deliver stunning property photos with HDR editing, sky replacement, virtual staging, object removal, twilight conversion, and premium retouching. Fast turnaround. Affordable pricing. Trusted by professionals worldwide.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="#quote-form" className="bg-gradient-to-r from-blue-650 to-indigo-650 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] text-xs">
                Request Free Quote
              </Link>
              <Link href="#quote-form" className="border border-slate-200 bg-white/70 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl transition-all cursor-pointer text-xs">
                Free Sample Edit
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-blue-650" />
                <span>24-Hour Standard Turnaround</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-blue-650" />
                <span>Unlimited Revisions</span>
              </div>
            </div>
          </div>

          {/* Right Image/Workspace Mockup */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-3xl blur-xl" />
            
            <div className="relative border border-slate-200 bg-white/80 p-3.5 shadow-2xl rounded-3xl overflow-hidden glass-card-premium">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                  alt="High-end real estate image editing showcasing bright interiors and vibrant windows"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Embedded Editing Workflow Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-3.5 text-white text-left font-mono text-[9px] flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-blue-400 font-bold">// EDITING WORKFLOW ACTIVE</div>
                    <div className="text-slate-400">Step: Ambient-Flash HDR Blending</div>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-bold px-2 py-0.5 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Lawn Enhanced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS STRIP ================= */}
      <section className="bg-slate-50/40 border-y border-slate-200/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center font-display">
            {[
              { val: "2.4M+", label: "Images Edited", desc: "For photographers & agencies" },
              { val: "45,000+", label: "Projects Completed", desc: "Residential & commercial" },
              { val: "24 Hrs", label: "Average Turnaround", desc: "Express delivery available" },
              { val: "12+", label: "Countries Served", desc: "USA, Canada, UK, Australia, etc." },
              { val: "99.7%", label: "Client Satisfaction", desc: "5-star rating benchmarks" }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-650 to-indigo-650 leading-none">
                  {stat.val}
                </span>
                <span className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider">{stat.label}</span>
                <span className="block text-[9px] text-slate-400 font-sans">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BEFORE/AFTER COMPARISON SLIDER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Interactive Sandbox</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            Compare Our Professional Editing Quality
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium">
            Click tabs below to test different retouching streams. Drag the middle slider bar horizontally to see the original camera raw vs the final enhanced result.
          </p>

          {/* Slider Tab Selectors */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {Object.entries(comparisonData).map(([key, item]) => {
              const isActive = activeSliderTab === key
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveSliderTab(key as any)
                    setSliderPosition(50) // reset position
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    isActive 
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10" 
                      : "bg-white border-slate-200 text-slate-655 hover:bg-slate-50"
                  }`}
                >
                  {item.title}
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Comparison Canvas */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-[36px] blur-xl" />
          
          <div 
            ref={sliderRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[250px] sm:h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 select-none cursor-ew-resize"
          >
            {/* After Image (Full Base) */}
            <div className="absolute inset-0">
              <img 
                src={comparisonData[activeSliderTab].after} 
                alt={`${comparisonData[activeSliderTab].title} After`}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded">
                Enhanced After
              </div>
            </div>

            {/* Before Image (Clipped Overlay) */}
            <div 
              className="absolute inset-0"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              <img 
                src={comparisonData[activeSliderTab].before} 
                alt={`${comparisonData[activeSliderTab].title} Before`}
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-4 left-4 bg-red-600/80 text-white font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded">
                Original Camera Raw
              </div>
            </div>

            {/* Drag Handle Bar */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-xl cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xl flex items-center justify-center text-slate-700">
                <Sliders size={12} className="rotate-90" />
              </div>
            </div>
          </div>

          {/* Description below Comparison */}
          <p className="mt-4 text-xs font-medium text-slate-500 italic">
            &ldquo;{comparisonData[activeSliderTab].desc}&rdquo;
          </p>
        </div>
      </section>

      {/* ================= SERVICES GRID ================= */}
      <section className="bg-slate-50/30 border-y border-slate-200/50 py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Capabilities Matrix</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              Premium Property Media Scopes
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium">
              We employ professional graphic retouchers utilizing state-of-the-art software tools to deliver pixel-perfect listing media.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              { title: "HDR Photo Blending", icon: Layers, tech: "Adobe Photoshop / Lightroom", desc: "Expert manual exposure alignment combining dark and bright brackets for crisp details, rich dynamic range, and accurate window pull mapping." },
              { title: "Sky Replacement", icon: Sparkles, tech: "Photoshop CC", desc: "Removing grey overcast skies and replacing them with premium bright blue skies or stunning sunset dusk backgrounds." },
              { title: "Virtual Twilight", icon: Clock, tech: "Virtual Day-to-Dusk", desc: "Converting standard daylight exterior photos into warm twilight pictures with glowing indoor windows and elegant sunset gradients." },
              { title: "Virtual Staging", icon: Home, tech: "3ds Max / V-Ray", desc: "Digitally placing photorealistic, contemporary high-end sofas, tables, rugs, and accessories into vacant, empty property listings." },
              { title: "Object & Cable Removal", icon: Trash2, tech: "Content-Aware / Clone Stamp", desc: "Cleaning property visuals by removing distracting power lines, telephone cables, trash bins, cars, and pool leaves." },
              { title: "Lawn & Foliage Enhancement", icon: Brush, tech: "Color Grading Engine", desc: "Color grading patchy brown grass or dead patches into healthy green lawns that look fresh and highly attractive." },
              { title: "Perspective & Alignment", icon: Sliders, tech: "Lens Profile Correction", desc: "Correcting barrel distortions, leaning walls, and vertical angles so that building structures look perfectly straight." },
              { title: "Window Pulldown", icon: Eye, tech: "Ambient-Flash Blending", desc: "Masking and blending flash exposures over ambient window frames to preserve beautiful outdoor vistas and garden views." },
              { title: "TV Screen Replacement", icon: Palette, tech: "Smart Objects", desc: "Replacing black blank television screens or monitor panels with professional, appealing design layouts or lifestyle scenes." },
              { title: "Furniture Removal", icon: Trash2, tech: "Heuristic Inpainting", desc: "Deleting old, cluttered, or dated furniture from rooms to present clean, vacant spaces for virtual redesigns." },
              { title: "Color Correction", icon: Paintbrush, tech: "ICC Profile Calibration", desc: "Balancing color temperatures and removing yellow light casts from indoor lightbulbs to output natural, neutral walls." },
              { title: "Floor Plan Redraw", icon: Maximize2, tech: "AutoCAD / Illustrator", desc: "Redrawing old sketch blueprints into high-resolution 2D and 3D vector floor plans showing furniture dimensions." },
              { title: "AI Image Upscaling", icon: Zap, tech: "Super Resolution Models", desc: "Utilizing deep learning models to upscale lower-resolution agent photographs into print-ready media files." }
            ].map((serv, idx) => {
              const IconComponent = serv.icon
              return (
                <div key={idx} className="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-all hover:border-blue-300/40 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-650 to-indigo-650 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-blue-600">
                      <IconComponent size={18} />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display">{serv.title}</h3>
                      <span className="block text-[8px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">{serv.tech}</span>
                    </div>
                    
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{serv.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Outsourcing Benefits</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            Designed for Real Estate Media Companies
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium">
            Our post-processing division serves high-volume real estate photographers and digital marketing agencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 text-left font-sans">
          {[
            { val: "24-Hour turnarounds", label: "24 Hour Delivery", icon: Clock, desc: "Never miss listing launch deadlines; we deliver retouched proofs in 24 hours." },
            { val: "Affordable Pricing", label: "Affordable Rates", icon: DollarSign, desc: "Highly competitive per-image costing model matching agency budgets." },
            { val: "Unlimited Adjusts", label: "Unlimited Revisions", icon: RefreshCw, desc: "We refine details until the photos exactly match your branding style." },
            { val: "Expert Retouchers", label: "Professional Editors", icon: Users, desc: "Skilled specialists trained in architectural geometries and lighting." },
            { val: "Secure File Transfer", label: "Secure Data Pipelines", icon: Shield, desc: "Full protection for listing folders with secure cloud storage routes." },
            { val: "Bulk Image Processing", label: "Bulk Infrastructure", icon: Layers, desc: "Batch editing capacity handling hundreds of properties simultaneously." },
            { val: "Manual Retouching", label: "Manual Photoshop Control", icon: Brush, desc: "No lazy filters; fine-tuned manual brushing, clipping path, and masking." },
            { val: "Dedicated Teams", label: "Dedicated Account Managers", icon: Award, desc: "Direct communications for fast scoping feedback and updates." },
            { val: "AI-Powered Models", label: "AI Assisted Efficiency", icon: Zap, desc: "AI-assisted segmentation coupled with professional human QA." },
            { val: "International Clients", label: "Global Operations", icon: Home, desc: "Scoping schedules aligned with USA, Canada, UK, and Australia timezones." }
          ].map((why, idx) => {
            const IconComponent = why.icon
            return (
              <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50/50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <IconComponent size={14} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm font-display leading-tight">{why.label}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans">{why.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ================= WORKFLOW TIMELINE ================= */}
      <section className="bg-slate-50/30 border-y border-slate-200/50 py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Seamless Onboarding</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              Our Step-By-Step Scoping Workflow
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium">
              Outsourcing your real estate post-production is simple, transparent, and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            
            {/* Connecting line on desktop */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200/80 -translate-y-12 hidden md:block -z-10" />

            {[
              { step: "01", title: "Upload RAW Brackets", desc: "Drag and drop your exposure brackets or Lightroom catalogs using our upload form." },
              { step: "02", title: "Free Sample Edit", desc: "Our team processes 1-3 sample images to establish your brand editing guidelines." },
              { step: "03", title: "Expert Post-Processing", desc: "Dedicated retouchers blend exposures, align verticals, and enhance sky details." },
              { step: "04", title: "Quality Assurance Check", desc: "A senior editor inspects vertical geometries, colors, and shadows under strict QA." },
              { step: "05", title: "Final Files Delivered", desc: "Receive print and web-ready high-resolution properties files within 24 hours." }
            ].map((flow, idx) => (
              <div key={idx} className="space-y-4 bg-white p-6 border border-slate-200 rounded-2xl shadow-sm z-10 text-left relative">
                <span className="text-2xl font-black font-mono text-blue-600 block leading-none">{flow.step}</span>
                <h3 className="font-bold text-slate-900 text-sm font-display leading-tight">{flow.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">{flow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES WE SERVE ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Sectors & Verticals</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            Tailored for Property Professionals
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium">
            We adapt parameters to support specific real estate marketing structures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
          {[
            { title: "Real Estate Photographers", desc: "Outsource editing burdens, scale up shoot volume, and reclaim hours of keyboard time." },
            { title: "Real Estate Media Companies", desc: "Expand production margins with dedicated overnight editors handling bulk volumes." },
            { title: "Property Development Groups", desc: "High-end vector drawings and twilight renderings showcasing pre-sale architecture." },
            { title: "Luxury Realtors & Agencies", desc: "Dazzle buyers with virtual furniture staging, sky conversions, and premium listings." },
            { title: "Airbnb Hosts & Rentals", desc: "Max guest bookings with welcoming, clean, and brightly-lit interior layouts." },
            { title: "Vacation & Short-Term Rentals", desc: "Vibrant lawn enhancements and sunny pool edits showing perfect holiday spots." },
            { title: "Architectural & Interior Design", desc: "True color fidelity matching custom wood stains, textures, and wall shades." },
            { title: "Commercial Real Estate Portals", desc: "Advanced perspective correction mapping massive office grids and high-rises." }
          ].map((ind, idx) => (
            <div key={idx} className="p-6 bg-slate-50 border border-slate-200/60 rounded-xl space-y-3 hover:bg-white hover:border-blue-300/40 hover:shadow-lg transition-all">
              <div className="font-bold text-slate-900 text-sm sm:text-base font-display">{ind.title}</div>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">{ind.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-slate-50/40 border-y border-slate-200/50 py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Photographers Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              Trusted by Real Estate Media Leaders
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium">
              Here is what high-volume real estate content creators say about our post-production division.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left font-sans">
            {[
              {
                name: "Marcus Vance",
                role: "Director of Vance Real Estate Media (Austin, USA)",
                quote: "Outsourcing our HDR photo blending to SkillForge was the best operational pivot we ever made. They consistently deliver 24-hour proofs. Our window pulls look incredibly natural, and virtual twilights are jaw-dropping.",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
              },
              {
                name: "Sarah Lindqvist",
                role: "Founder of Lindqvist Properties & Architecture (London, UK)",
                quote: "We use their virtual staging services for all vacant listings. The furniture selections match current mid-century modern design trends. It looks 100% photorealistic and saves us thousands on physical staging.",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
              },
              {
                name: "Liam O'Connor",
                role: "Lead Commercial Photographer (Melbourne, Australia)",
                quote: "I shooting commercial structures that require meticulous perspective correction. The editors at SkillForge align building lines with absolute precision. Their object removal cleanups are completely invisible.",
                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
              }
            ].map((test, idx) => (
              <div key={idx} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4 relative flex flex-col justify-between">
                <p className="text-xs text-slate-500 leading-relaxed italic">&ldquo;{test.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <img 
                    src={test.img} 
                    alt={test.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">{test.name}</span>
                    <span className="text-[9px] text-slate-400 font-bold block">{test.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Frequently Asked Questions</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              Real Estate Editing FAQ
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium leading-relaxed">
              If you have specific post-processing requirements, please contact our support team. Here are standard questions answered:
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3 font-sans">
            {[
              { q: "How long does editing take?", a: "Our standard turnaround time is 24 hours. For urgent real estate listings, we offer express same-day delivery options within 12 hours." },
              { q: "Do you offer bulk pricing?", a: "Yes, we provide bulk pricing schedules for real estate photography media companies shooting high-volume packages. Contact our sales operations for customized price lists." },
              { q: "Can I request revisions?", a: "Absolutely. We offer unlimited revisions on all folders. Simply flag the images in your client dashboard and request alignment corrections." },
              { q: "Which file formats are supported?", a: "We accept RAW brackets (.CR2, .NEF, .ARW, .DNG), standard .JPG formats, and Lightroom catalog files." },
              { q: "Do you edit HDR brackets?", a: "Yes, we specialize in HDR ambient-flash blending. We manually align exposures to draw high dynamic range highlights and clear vertical geometries." },
              { q: "Do you offer same day delivery?", a: "Yes. Express same-day deliveries can be scheduled for a small surge percentage. Staging files typically take 24-48 hours depending on furniture complexity." },
              { q: "Can you remove unwanted objects?", a: "Yes. We manually isolate and clone out trash bins, cars, electrical cables, power line networks, safety signs, and yard debris." },
              { q: "How secure are uploaded photos?", a: "Your files are stored on secure cloud database staging systems and are protected under non-disclosure agreements. We never utilize client property photos for commercial purposes without explicit permissions." }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white/60">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={14} className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </section>

      {/* ================= INSTANT QUOTE / UPLOAD FORM ================= */}
      <section id="quote-form" className="bg-slate-50/50 border-t border-slate-200/50 py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          <div className="max-w-2xl mx-auto space-y-4 mb-12">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Instant Pricing Console</span>
            <h2 className="text-3xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
              Request Your Free Sample Edit
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm font-sans font-medium">
              Upload up to 3 RAW property bracket files to test our professional HDR blending, staging, or sky replacements absolutely free.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-xl text-left max-w-2xl mx-auto font-sans relative">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit} 
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Business Email</label>
                      <input 
                        type="email" 
                        required
                        value={quoteEmail}
                        onChange={(e) => setQuoteEmail(e.target.value)}
                        placeholder="e.g. contact@yourmedia.com"
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-3 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Required Edit Service</label>
                      <select
                        value={quoteService}
                        onChange={(e) => setQuoteService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-blue-600 rounded-xl px-4 py-3 text-xs focus:outline-none cursor-pointer"
                      >
                        <option value="HDR Photo Editing">HDR Exposure Blending</option>
                        <option value="Sky Replacement">Sky Replacement Only</option>
                        <option value="Virtual Twilight">Virtual Twilight Conversion</option>
                        <option value="Virtual Staging">Virtual Staging (Furnish Vacant Room)</option>
                        <option value="Object Removal">Object & Cable Removal</option>
                      </select>
                    </div>

                    {/* Drag & Drop Upload Zone */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Upload Files</label>
                      
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer flex flex-col items-center justify-center gap-3 ${
                          isDragging 
                            ? "border-blue-650 bg-blue-50/20" 
                            : "border-slate-200 bg-slate-50 hover:bg-slate-100/50"
                        }`}
                        onClick={triggerFileInput}
                      >
                        <CloudUpload size={28} className="text-slate-400" />
                        <div className="space-y-1">
                          <span className="block text-xs font-bold text-slate-700">Drag & drop files here, or click to upload</span>
                          <span className="block text-[10px] text-slate-400 font-medium">Supports RAW brackets, .DNG, .JPG (Max 3 files, up to 100MB)</span>
                        </div>
                      </div>

                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        multiple
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.cr2,.nef,.arw,.dng"
                      />

                      {/* Uploaded File List */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 font-mono text-[10px]">
                          <span className="block font-bold text-slate-400 uppercase tracking-wide text-[9px] mb-1">Queue to Scoping Server ({uploadedFiles.length})</span>
                          {uploadedFiles.map((fn, idx) => (
                            <div key={idx} className="flex justify-between items-center text-slate-600 border-b border-slate-200/50 pb-1 last:border-b-0 last:pb-0">
                              <span className="truncate max-w-[85%]">{fn}</span>
                              <button 
                                type="button" 
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setUploadedFiles(prev => prev.filter((_, i) => i !== idx))
                                }}
                                className="text-red-500 hover:text-red-700 font-bold"
                              >
                                remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-3.5 rounded-xl transition-all cursor-pointer shadow-sm text-xs flex justify-center items-center gap-1.5"
                  >
                    {isSubmitting ? "Sending Request..." : "Submit Free Sample Ticket"}
                    <Send size={12} className={isSubmitting ? "animate-spin" : ""} />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-600 mx-auto">
                    <CheckCircle size={32} className="animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl font-display">Scoping Ticket Logged</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                      We have queued your files on our secure processing nodes. A senior editor will send the retouched proofs to <span className="font-bold text-slate-800">{quoteEmail}</span> within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

    </div>
  )
}
