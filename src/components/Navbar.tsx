"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { agencyServices } from "@/data/agencyData"

export function Navbar() {
  const pathname = usePathname()
  const { t, isRTL } = useLanguage()

  const [scrolled, setScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isServicesHovered, setIsServicesHovered] = useState(false)
  const [isProductsHovered, setIsProductsHovered] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false)

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
    { name: "Products", path: "/products", hasProductsSubmenu: true, hasBadge: true },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.contact"), path: "/contact" }
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-350 ${
        scrolled ? "glass-nav py-1.5 sm:py-2 shadow-sm" : "bg-transparent py-2.5 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-350 ${scrolled ? "h-12 sm:h-14" : "h-14 sm:h-20"}`}>

          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="SkillForge Technologies"
                width={180}
                height={60}
                className={`transition-all duration-350 w-auto block ${scrolled ? "h-8 sm:h-11" : "h-10 sm:h-[60px]"}`}
              />
            </Link>
          </div>

          {/* Desktop Nav links */}
          <div className="hidden lg:flex items-center gap-7">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.path || (link.hasSubmenu && pathname.startsWith("/services")) || (link.hasProductsSubmenu && pathname.startsWith("/products"))

                // Services Dropdown
                if (link.hasSubmenu) {
                  return (
                    <div
                      key={link.name}
                      className="relative py-2"
                      onMouseEnter={() => setIsServicesHovered(true)}
                      onMouseLeave={() => setIsServicesHovered(false)}
                    >
                      <button
                        className={`flex items-center gap-1 text-[13px] font-semibold transition-colors duration-250 hover:text-blue-650 cursor-pointer ${
                          isActive ? "text-blue-600" : "text-slate-600"
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
                            className={`absolute top-full ${isRTL ? "right-1/2 translate-x-1/2" : "left-1/2 -translate-x-1/2"} mt-2 w-[760px] bg-white border border-slate-200/60 rounded-3xl shadow-xl p-6 grid grid-cols-3 gap-6 z-50 text-left`}
                          >
                            {/* Column 1: Software & Cloud */}
                            <div className="space-y-3">
                              <div className="pb-1.5 border-b border-slate-100">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600">
                                  Software &amp; Cloud
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
                                        {t(`services.${service.slug}.title`) || service.title}
                                      </span>
                                      <span className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                                        {t(`services.${service.slug}.desc`) || service.tagline}
                                      </span>
                                    </Link>
                                  ))}
                              </div>
                            </div>

                            {/* Column 2: Web & Mobile */}
                            <div className="space-y-3">
                              <div className="pb-1.5 border-b border-slate-100">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest text-indigo-650">
                                  Web &amp; Mobile
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
                                        {t(`services.${service.slug}.title`) || service.title}
                                      </span>
                                      <span className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                                        {t(`services.${service.slug}.desc`) || service.tagline}
                                      </span>
                                    </Link>
                                  ))}
                              </div>
                            </div>

                            {/* Column 3: Specialized & Marketing */}
                            <div className="space-y-3">
                              <div className="pb-1.5 border-b border-slate-100">
                                <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600">
                                  Specialized &amp; AI
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
                                        {t(`services.${service.slug}.title`) || service.title}
                                      </span>
                                      <span className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">
                                        {t(`services.${service.slug}.desc`) || service.tagline}
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

                // Products Dropdown
                if (link.hasProductsSubmenu) {
                  return (
                    <div
                      key={link.name}
                      className="relative py-2"
                      onMouseEnter={() => setIsProductsHovered(true)}
                      onMouseLeave={() => setIsProductsHovered(false)}
                    >
                      <button
                        className={`flex items-center gap-1 text-[13px] font-semibold transition-colors duration-250 hover:text-blue-650 cursor-pointer ${
                          isActive ? "text-blue-600" : "text-slate-600"
                        }`}
                      >
                        <span>{link.name}</span>
                        {link.hasBadge && (
                          <span className="ml-0.5 px-1 py-0.5 rounded bg-teal-500 text-white text-[8px] font-black tracking-wider uppercase leading-none select-none animate-pulse scale-[0.85] origin-left shadow-sm">
                            New
                          </span>
                        )}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isProductsHovered ? "rotate-180" : ""}`} />
                      </button>

                      {/* Products Dropdown menu */}
                      <AnimatePresence>
                        {isProductsHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] bg-white border border-slate-200/80 rounded-2xl shadow-xl p-3 grid grid-cols-1 gap-1 z-50 text-left"
                          >
                            <Link
                              href="/products/active-pulse"
                              className="flex flex-col p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                              onClick={() => setIsProductsHovered(false)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Active Pulse</span>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100 font-bold">Workspace Device</span>
                              </div>
                              <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                Smart workspace anti-idle device &amp; companion app.
                              </span>
                            </Link>

                            <Link
                              href="/products/expense-mate"
                              className="flex flex-col p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                              onClick={() => setIsProductsHovered(false)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">ExpenseMate</span>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 font-bold">Personal Finance App</span>
                              </div>
                              <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                Personal budget manager &amp; group bill splitter.
                              </span>
                            </Link>

                            <Link
                              href="/products/mavio"
                              className="flex flex-col p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                              onClick={() => setIsProductsHovered(false)}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Mavio</span>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-650 border border-indigo-100 font-bold">Transit &amp; Fleet Tech</span>
                              </div>
                              <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                Smart campus transit &amp; fleet telemetry platform.
                              </span>
                            </Link>
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
                    className={`relative text-[13px] font-semibold transition-colors duration-250 hover:text-blue-650 flex items-center ${
                      isActive ? "text-blue-600" : "text-slate-650"
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
                              {t(`services.${service.slug}.title`) || service.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                }

                if (link.hasProductsSubmenu) {
                  return (
                    <div key={link.name} className="space-y-1">
                      <button
                        onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                        className="w-full flex items-center justify-between py-2 text-[15px] font-bold text-slate-800"
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{link.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-teal-500 text-white text-[9px] font-black tracking-wider uppercase leading-none select-none shadow-sm">
                            New
                          </span>
                        </span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${isMobileProductsOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isMobileProductsOpen && (
                        <div className="pl-4 border-l border-slate-100 grid grid-cols-1 gap-1.5 py-1 text-left">
                          <Link
                            href="/products/active-pulse"
                            onClick={() => setIsMobileOpen(false)}
                            className="py-1 text-xs text-slate-700 font-bold hover:text-blue-600 block"
                          >
                            Active Pulse (BLE Hardware)
                          </Link>
                          <Link
                            href="/products/expense-mate"
                            onClick={() => setIsMobileOpen(false)}
                            className="py-1 text-xs text-slate-700 font-bold hover:text-blue-600 block"
                          >
                            ExpenseMate (Flutter &amp; Firebase)
                          </Link>
                          <Link
                            href="/products/mavio"
                            onClick={() => setIsMobileOpen(false)}
                            className="py-1 text-xs text-slate-700 font-bold hover:text-blue-600 block"
                          >
                            Mavio (Transit &amp; Fleet Telemetry)
                          </Link>
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
