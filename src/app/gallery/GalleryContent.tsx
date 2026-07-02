"use client"

import React, { useState, useMemo, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Cpu,
  Brain,
  Terminal,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  Images,
  ZoomIn,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  FlaskConical,
  GraduationCap,
} from "lucide-react"
import { galleryData, GalleryCategory } from "@/data/galleryData"
import { Button } from "@/components/ui/button"
import Particles from "@/components/magicui/particles"

// ─── Category filter definitions ──────────────────────────────────────────────

const categories: {
  id: "All" | GalleryCategory
  label: string
  Icon: React.ElementType
}[] = [
    { id: "All", label: "All Projects", Icon: Sparkles },
    { id: "IoT & Embedded", label: "IoT & Embedded", Icon: Cpu },
    { id: "AI & ML", label: "AI & ML", Icon: Brain },
    { id: "Robotics", label: "Robotics", Icon: Terminal },
  ]

// ─── Stats (real numbers from siteConfig) ─────────────────────────────────────
const stats = [
  { value: "54+", label: "Prototypes Engineered" },
  { value: "40+", label: "Enterprise Partners" },
  { value: "10+", label: "Countries Served" },
  { value: "4+", label: "Years of R&D" },
]

// ─── Main Component ────────────────────────────────────────────────────────────

export default function GalleryContent() {
  const [activeCategory, setActiveCategory] = useState<"All" | GalleryCategory>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({})

  // Filtered list
  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? galleryData
        : galleryData.filter((img) => img.category === activeCategory),
    [activeCategory]
  )

  // Count per category
  const counts = useMemo(() => {
    const map: Record<string, number> = { All: galleryData.length }
    galleryData.forEach((img) => {
      map[img.category] = (map[img.category] ?? 0) + 1
    })
    return map
  }, [])

  // ── Lightbox ────────────────────────────────────────────────────────────────

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const prevImage = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length
    )
  }, [filtered.length])

  const nextImage = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % filtered.length
    )
  }, [filtered.length])

  // Keyboard navigation (Esc / Arrow keys)
  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [lightboxIndex, prevImage, nextImage])

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [lightboxIndex])

  const activeImage = lightboxIndex !== null ? filtered[lightboxIndex] : null

  // Masonry columns (3 desktop / 2 tablet / 1 mobile)
  const columns = useMemo(() => {
    const cols: typeof galleryData[] = [[], [], []]
    filtered.forEach((img, i) => cols[i % 3].push(img))
    return cols
  }, [filtered])

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">

      {/* ── Ambient Background ── */}
      <Particles className="absolute inset-0 z-0 opacity-30 pointer-events-none" quantity={50} staticity={55} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sky-500/8 rounded-full blur-[140px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/8 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      {/* ════════════════════════════════════════════════════════════════════════
          1. TRUST SECTION — "Projects Built at SkillForge Technology"
         ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="gallery-trust-heading"
        className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <Images size={12} aria-hidden="true" />
              Real Lab-Built Projects
            </div>

            <h1
              id="gallery-trust-heading"
              className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white mb-5"
            >
              Projects Built at{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500">
                SkillForge Technology
              </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
              These are actual engineering projects developed at our{" "}
              <strong className="text-slate-800 dark:text-slate-200">laboratory in Erode, Tamil Nadu</strong>{" "}
              for final year students, startups, and research prototypes across ECE, EEE, CSE, and IT departments.
              Every prototype shown here was hardware-wired, firmware-programmed, and verified by our engineers.
            </p>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: CheckCircle2, text: "100% Working Hardware" },
              { icon: FlaskConical, text: "Lab-Verified Prototypes" },
              { icon: GraduationCap, text: "Final Year & IEEE Projects" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 text-sm font-medium backdrop-blur-sm"
              >
                <Icon size={14} className="text-sky-500" aria-hidden="true" />
                {text}
              </div>
            ))}
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
            aria-label="Gallery statistics"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="text-center p-4 rounded-2xl border border-slate-200 dark:border-white/5 bg-white/60 dark:bg-slate-900/40 backdrop-blur-sm"
              >
                <p className="text-2xl font-extrabold text-sky-500 font-display">{s.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          2. GALLERY SECTION
         ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="gallery-grid-heading"
        className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 id="gallery-grid-heading" className="sr-only">Project Gallery Images</h2>

          {/* ── Category Filter Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
            role="group"
            aria-label="Filter gallery by category"
          >
            {categories.map(({ id, label, Icon }) => {
              const isActive = activeCategory === id
              return (
                <motion.button
                  key={id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCategory(id)}
                  aria-pressed={isActive}
                  aria-label={`Filter by ${label}`}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${isActive
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 border-sky-400 text-white shadow-lg shadow-sky-500/25"
                      : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-900/80"
                    }`}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{label}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    aria-label={`${counts[id] ?? 0} photos`}
                  >
                    {counts[id] ?? 0}
                  </span>
                </motion.button>
              )
            })}
          </motion.div>

          {/* ── Masonry Grid ── */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <Images className="mx-auto text-slate-400 dark:text-slate-600 mb-4" size={52} aria-hidden="true" />
                <p className="text-slate-500 dark:text-slate-400">No photos in this category yet.</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
              >
                {columns.map((col, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-6">
                    {col.map((img) => {
                      const globalIdx = filtered.indexOf(img)
                      const hasError = imgErrors[img.src]
                      const isFirst = globalIdx === 0

                      return (
                        <motion.article
                          key={img.src}
                          initial={{ opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.35, delay: globalIdx * 0.04 }}
                          className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900/40 shadow-sm hover:shadow-xl hover:border-sky-500/30 transition-all duration-300"
                        >
                          {/* ── Image ── */}
                          <div
                            className="relative w-full aspect-[4/3] cursor-zoom-in overflow-hidden"
                            onClick={() => openLightbox(globalIdx)}
                            role="button"
                            tabIndex={0}
                            aria-label={`View ${img.projectTitle} in full screen`}
                            onKeyDown={(e) => e.key === "Enter" && openLightbox(globalIdx)}
                          >
                            {hasError ? (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900/60 text-slate-400 dark:text-slate-600 gap-3 p-6">
                                <Cpu size={36} className="opacity-40" aria-hidden="true" />
                                <span className="text-xs font-medium text-center opacity-60">{img.projectTitle}</span>
                              </div>
                            ) : (
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                priority={isFirst}
                                loading={isFirst ? "eager" : "lazy"}
                                onError={() =>
                                  setImgErrors((prev) => ({ ...prev, [img.src]: true }))
                                }
                              />
                            )}

                            {/* Hover overlay */}
                            <div
                              className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none"
                              aria-hidden="true"
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="text-white text-xs font-semibold drop-shadow max-w-[80%]">
                                  {img.projectTitle}
                                </span>
                                <ZoomIn size={16} className="text-sky-400 shrink-0" />
                              </div>
                            </div>

                            {/* Category chip */}
                            <div className="absolute top-3 left-3" aria-hidden="true">
                              <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded-md bg-slate-950/60 backdrop-blur-sm text-sky-300 border border-sky-500/20">
                                {img.category}
                              </span>
                            </div>
                          </div>

                          {/* ── Caption ── */}
                          <figcaption className="p-4 space-y-2">
                            {/* Project title */}
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug group-hover:text-sky-500 transition-colors">
                              {img.projectTitle}
                            </h3>

                            {/* Department */}
                            <p className="text-[10px] font-semibold text-sky-500 uppercase tracking-wider">
                              {img.department}
                            </p>

                            {/* Short description */}
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                              {img.shortDesc}
                            </p>

                            {/* Tech chips */}
                            <div className="flex flex-wrap gap-1 pt-1">
                              {img.technologies.slice(0, 3).map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                              {img.technologies.length > 3 && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-500 font-medium">
                                  +{img.technologies.length - 3} more
                                </span>
                              )}
                            </div>

                            {/* Internal link to related service */}
                            {img.relatedService && (
                              <div className="pt-1">
                                <Link
                                  href={img.relatedService}
                                  className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-500 hover:text-sky-400 transition-colors focus-visible:outline-none focus-visible:underline"
                                  aria-label={`Learn more about the service related to ${img.projectTitle}`}
                                >
                                  <span>View Related Service</span>
                                  <ArrowRight size={10} aria-hidden="true" />
                                </Link>
                              </div>
                            )}
                          </figcaption>
                        </motion.article>
                      )
                    })}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Photo count */}
          {filtered.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-slate-400 dark:text-slate-600 text-xs mt-10"
              aria-live="polite"
            >
              Showing {filtered.length} project photo{filtered.length !== 1 ? "s" : ""} — Erode, Tamil Nadu
            </motion.p>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          3. CALL TO ACTION
         ════════════════════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="gallery-cta-heading"
        className="relative z-10 pb-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl border border-sky-500/20 bg-gradient-to-br from-sky-500/5 via-blue-500/5 to-indigo-500/5 dark:from-sky-500/10 dark:via-blue-500/5 dark:to-indigo-500/10 p-8 sm:p-12 text-center overflow-hidden"
          >
            {/* Decorative glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-indigo-500/5 pointer-events-none" aria-hidden="true" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 mb-6 mx-auto">
                <MessageSquare size={22} aria-hidden="true" />
              </div>

              <h2
                id="gallery-cta-heading"
                className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white mb-3"
              >
                Looking for a Customised Engineering Project?
              </h2>

              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed max-w-xl mx-auto mb-8">
                Contact <strong>SkillForge Technology</strong> in Erode to discuss your final year project requirements —
                IoT, Embedded Systems, AI/ML, Robotics, or IEEE-based projects for any engineering department.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/projects" aria-label="Browse all engineering projects">
                  <Button
                    variant="outline"
                    className="rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-sky-500/50 flex items-center gap-2"
                  >
                    <span>View All Projects</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Button>
                </Link>

                <Link href="/contact" aria-label="Contact SkillForge Technology about a project">
                  <Button
                    variant="gradient"
                    className="rounded-xl flex items-center gap-2"
                  >
                    <span>Contact Us</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Button>
                </Link>

                <Link href="/contact?inquiry=quote" aria-label="Get a project quote from SkillForge Technology">
                  <Button
                    className="rounded-xl bg-slate-105 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-2"
                  >
                    <span>Get Quote</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          LIGHTBOX
         ════════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && activeImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={`Lightbox: ${activeImage.projectTitle}`}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" aria-hidden="true" />

            {/* Content panel */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 rounded-[32px] overflow-hidden bg-white border border-slate-200/80 shadow-2xl text-left cursor-default"
            >
              {/* Left Side: Image container */}
              <div className="md:col-span-7 bg-slate-50 flex items-center justify-center relative min-h-[300px] md:min-h-[500px] border-b md:border-b-0 md:border-r border-slate-100">
                {imgErrors[activeImage.src] ? (
                  <div className="w-full aspect-video flex flex-col items-center justify-center bg-slate-900 text-slate-500 gap-3">
                    <Cpu size={48} className="opacity-30" aria-hidden="true" />
                    <span className="text-sm opacity-50">Image not available</span>
                  </div>
                ) : (
                  <div className="relative w-full aspect-[4/3] max-h-[70vh] flex items-center justify-center p-2">
                    <Image
                      src={activeImage.src}
                      alt={activeImage.alt}
                      fill
                      sizes="(max-width: 1200px) 100vw, 900px"
                      className="object-contain p-2"
                      priority
                      onError={() =>
                        setImgErrors((prev) => ({ ...prev, [activeImage.src]: true }))
                      }
                    />
                  </div>
                )}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 text-[10px] font-extrabold text-blue-650 uppercase tracking-widest">
                  <Sparkles size={10} />
                  <span>Lab Prototype</span>
                </div>
              </div>

              {/* Right Side: Rich details sidebar */}
              <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-white via-white to-slate-50/50">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-600 block">
                      {activeImage.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-black font-display text-slate-900 leading-tight">
                      {activeImage.projectTitle}
                    </h2>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-[9px] font-extrabold text-slate-550 uppercase tracking-wide">
                    <Terminal size={11} className="text-indigo-650" />
                    <span>{activeImage.department}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium">
                    {activeImage.shortDesc}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Laboratory Specifications
                    </span>
                    <ul className="text-xs text-slate-700 font-semibold space-y-1.5 list-disc pl-4 leading-relaxed font-sans">
                      <li>Designed & compiled at Erode engineering headquarters.</li>
                      <li>Standard validation with hardware circuit components.</li>
                      <li>Fully tested & deployed logic codes.</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Technologies & Chips
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeImage.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[9px] font-extrabold px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-550 font-bold pt-2">
                    <span>Active Index: {lightboxIndex + 1} / {filtered.length}</span>
                  </div>

                  <div className="flex gap-2">
                    {activeImage.relatedService && (
                      <Link
                        href={activeImage.relatedService}
                        onClick={closeLightbox}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-center text-xs border border-slate-200 transition-colors"
                      >
                        View Service
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        closeLightbox()
                        window.dispatchEvent(new CustomEvent("open-book-call-modal"))
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-center text-xs transition-colors cursor-pointer"
                    >
                      Book Consult
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/10 hover:bg-slate-950/20 text-slate-750 transition-colors backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 cursor-pointer"
            >
              <X size={20} aria-hidden="true" />
            </button>

            {/* Prev / Next */}
            {filtered.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage() }}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-sky-500/80 text-white transition-colors backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <ChevronLeft size={24} aria-hidden="true" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage() }}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-sky-500/80 text-white transition-colors backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <ChevronRight size={24} aria-hidden="true" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
