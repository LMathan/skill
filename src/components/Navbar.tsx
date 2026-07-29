"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { agencyServices } from "@/data/agencyData"

export function Navbar() {
  const pathname = usePathname()
  const { locale, setLocale, t, isRTL } = useLanguage()

  const [scrolled, setScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isServicesHovered, setIsServicesHovered] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.services"), path: "/services", hasSubmenu: true },
    { name: t("nav.reviews"), path: "/reviews" },
    { name: t("nav.blog"), path: "/blog" },
    { name: "Products", path: "/products/active-pulse", hasBadge: true },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" }
  ]
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-350 ${scrolled ? "glass-nav py-2 shadow-sm" : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-350 ${scrolled ? "h-14" : "h-20"}`}>

          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="SkillForge Technology"
                width={180}
                height={60}
                className={`transition-all duration-350 w-auto block ${scrolled ? "h-11" : "h-[60px]"}`}
              />
            </Link>
          </div>

          {/* Desktop Nav links */}
          <div className="hidden lg:flex items-center gap-7">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.path || (link.hasSubmenu && pathname.startsWith("/services"))

                if (link.hasSubmenu) {
                  return (
                    <div
                      key={link.name}
                      className="relative py-2"
                      onMouseEnter={() => setIsServicesHovered(true)}
                      onMouseLeave={() => setIsServicesHovered(false)}
                    >
                      <button
                        className={`flex items-center gap-1 text-[13px] font-semibold transition-colors duration-250 hover:text-blue-650 cursor-pointer ${isActive ? "text-blue-600" : "text-slate-600"
                          }`}
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isServicesHovered ? "rotate-180" : ""}`} />
                      </button>

                      {/* Dropdown menu */}
                      <AnimatePresence>
                        {isServicesHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute top-full ${isRTL ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"} mt-2 w-[760px] bg-white border border-slate-200/60 rounded-3xl shadow-xl p-6 grid grid-cols-3 gap-6 z-50`}
                          >
                            {/* Column 1: Software & Cloud */}
                            <div className="space-y-3">
                              <div className="pb-1.5 border-b border-slate-100">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600">
                                  Software & Cloud
                                </span>
                              </div>
                              <div className="space-y-1">
                                {agencyServices
                                  .filter(s => ["software-development", "enterprise-development", "saas-development", "cloud-devops", "dotnet-development", "php-development"].includes(s.slug))
                                  .map((service) => (
                                    <Link
                                      key={service.slug}
                                      href={`/services/${service.slug}`}
                                      className="flex flex-col p-2 rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                      <span className="text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors">
                                        {t(`services.${service.slug}.title` as any) || service.title}
                                      </span>
                                      <span className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                                        {t(`services.${service.slug}.desc` as any) || service.tagline}
                                      </span>
                                    </Link>
                                  ))}
                              </div>
                            </div>

                            {/* Column 2: Web & Mobile */}
                            <div className="space-y-3">
                              <div className="pb-1.5 border-b border-slate-100">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-650">
                                  Web & Mobile
                                </span>
                              </div>
                              <div className="space-y-1">
                                {agencyServices
                                  .filter(s => ["web-development", "react-development", "wordpress-development", "mobile-development", "flutter-development", "ui-ux-design"].includes(s.slug))
                                  .map((service) => (
                                    <Link
                                      key={service.slug}
                                      href={`/services/${service.slug}`}
                                      className="flex flex-col p-2 rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                      <span className="text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors">
                                        {t(`services.${service.slug}.title` as any) || service.title}
                                      </span>
                                      <span className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                                        {t(`services.${service.slug}.desc` as any) || service.tagline}
                                      </span>
                                    </Link>
                                  ))}
                              </div>
                            </div>

                            {/* Column 3: Specialized & Marketing */}
                            <div className="space-y-3">
                              <div className="pb-1.5 border-b border-slate-100">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600">
                                  Specialized & AI
                                </span>
                              </div>
                              <div className="space-y-1">
                                {agencyServices
                                  .filter(s => ["ai-solutions", "iot-embedded", "seo-marketing", "real-estate-creative"].includes(s.slug))
                                  .map((service) => (
                                    <Link
                                      key={service.slug}
                                      href={`/services/${service.slug}`}
                                      className="flex flex-col p-2 rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                      <span className="text-xs font-bold text-slate-900 hover:text-blue-600 transition-colors">
                                        {t(`services.${service.slug}.title` as any) || service.title}
                                      </span>
                                      <span className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                                        {t(`services.${service.slug}.desc` as any) || service.tagline}
                                      </span>
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`relative text-[13px] font-semibold transition-colors duration-250 hover:text-blue-650 flex items-center ${isActive ? "text-blue-600" : "text-slate-650"
                      }`}
                  >
                    <span>{link.name}</span>
                    {link.hasBadge && (
                      <span className="ml-1 px-1 py-0.5 rounded bg-teal-500 text-white text-[8px] font-black tracking-wider uppercase leading-none select-none animate-pulse scale-[0.85] origin-left shadow-sm">
                        New
                      </span>
                    )}
                    {pathname === link.path && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-blue-600 rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Actions: Discuss Button */}
            <div className="flex items-center gap-5 border-l border-slate-200/80 pl-6">
              {/* CTA Discuss Project */}
              <Button 
                onClick={() => window.dispatchEvent(new CustomEvent("open-book-call-modal"))}
                variant="gradient" 
                className="font-semibold text-xs py-2 px-4 shadow-sm cursor-pointer"
              >
                {t("nav.cta")}
              </Button>
            </div>
          </div>

          {/* Mobile Controller Buttons */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b border-slate-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-3 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => {
                if (link.hasSubmenu) {
                  return (
                    <div key={link.name} className="space-y-1">
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className="w-full flex items-center justify-between py-2 text-[15px] font-bold text-slate-800"
                      >
                        <span>{link.name}</span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isMobileServicesOpen && (
                        <div className="pl-4 border-l border-slate-100 grid grid-cols-1 gap-1.5 py-1">
                          {agencyServices.map((service) => (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => setIsMobileOpen(false)}
                              className="py-1 text-xs text-slate-500 font-semibold hover:text-blue-600"
                            >
                              {t(`services.${service.slug}.title` as any) || service.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center gap-1.5 py-2 text-[15px] font-bold text-slate-800 hover:text-blue-600 transition-colors"
                  >
                    <span>{link.name}</span>
                    {link.hasBadge && (
                      <span className="px-1.5 py-0.5 rounded bg-teal-500 text-white text-[9px] font-black tracking-wider uppercase leading-none select-none animate-pulse shadow-sm">
                        New
                      </span>
                    )}
                  </Link>
                )
              })}

              <div className="pt-4 border-t border-slate-100">
                <Button 
                  onClick={() => {
                    setIsMobileOpen(false)
                    window.dispatchEvent(new CustomEvent("open-book-call-modal"))
                  }}
                  variant="gradient" 
                  className="w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{t("nav.cta")}</span>
                  <Send size={12} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
