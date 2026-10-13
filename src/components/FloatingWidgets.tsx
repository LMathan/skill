"use client"

import React, { useState, useEffect } from "react"
import { Mail, ArrowUp, Send, MessageSquare, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

const BookCallModal = dynamic(() => import("@/components/BookCallModal"), { ssr: false })

export function FloatingWidgets() {
  const [showScroll, setShowScroll] = useState(false)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowScroll(window.scrollY > 300)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Observe footer visibility cleanly with IntersectionObserver
  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      { 
        rootMargin: "0px 0px 80px 0px",
        threshold: 0.05 
      }
    )

    observer.observe(footer)
    return () => {
      observer.disconnect()
    }
  }, [pathname])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const whatsappUrl = "https://wa.me/919345518760?text=Hello%20SkillForge%20Technology,%20I%20would%20like%20to%20discuss%20a%20project."

  const items = [
    { 
      id: "schedule", 
      icon: Calendar, 
      color: "text-blue-600 hover:bg-blue-50", 
      action: () => window.dispatchEvent(new CustomEvent("open-book-call-modal")), 
      label: "Book Call" 
    },
    { 
      id: "mail", 
      icon: Mail, 
      color: "text-purple-600 hover:bg-purple-50", 
      action: () => window.open("mailto:info@skillforgetechnology.app"), 
      label: "Email Support" 
    },
    { 
      id: "whatsapp", 
      icon: MessageSquare, 
      color: "text-emerald-600 hover:bg-emerald-50", 
      action: () => window.open(whatsappUrl, "_blank"), 
      label: "WhatsApp Chat" 
    },
    { 
      id: "inquiry", 
      icon: Send, 
      color: "text-blue-500 hover:bg-blue-50", 
      action: () => window.location.href = "/contact", 
      label: "Request Proposal" 
    }
  ]

  const isContactPage = pathname === "/contact"
  const shouldHideAll = isFooterVisible || isContactPage

  return (
    <>
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none pointer-events-none flex flex-col gap-2.5 items-end">
        {/* Desktop: Floating Vertical Quick Menu */}
        <AnimatePresence>
          {!shouldHideAll && (
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto hidden md:flex flex-col gap-2 p-2 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xl"
            >
              {items.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`p-2.5 rounded-xl transition-all duration-200 ${item.color} focus:outline-none flex items-center justify-center cursor-pointer`}
                    title={item.label}
                    aria-label={item.label}
                  >
                    <Icon size={18} />
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile: Compact Single Quick-Contact Pill (Unobtrusive) */}
        <AnimatePresence>
          {!shouldHideAll && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto md:hidden flex items-center gap-1.5 p-1.5 rounded-full border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-lg"
            >
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("open-book-call-modal"))}
                className="p-2.5 rounded-full bg-blue-600 text-white shadow-sm flex items-center justify-center"
                title="Book Call"
                aria-label="Book Call"
              >
                <Calendar size={16} />
              </button>
              <button
                onClick={() => window.open(whatsappUrl, "_blank")}
                className="p-2.5 rounded-full bg-emerald-500 text-white shadow-sm flex items-center justify-center"
                title="WhatsApp Chat"
                aria-label="WhatsApp Chat"
              >
                <MessageSquare size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to Top button */}
        <AnimatePresence>
          {showScroll && !shouldHideAll && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="pointer-events-auto p-2.5 sm:p-3 rounded-xl border border-slate-200/80 bg-white/95 text-slate-500 hover:text-blue-600 hover:border-blue-200/80 backdrop-blur-md shadow-md transition-colors focus:outline-none cursor-pointer"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <BookCallModal />
    </>
  )
}

export default FloatingWidgets
