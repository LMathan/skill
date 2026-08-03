"use client"

import React, { useState, useEffect } from "react"
import { Mail, ArrowUp, Send, MessageSquare, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

const BookCallModal = dynamic(() => import("@/components/BookCallModal"), { ssr: false })
const PremiumBackground3D = dynamic(() => import("@/components/PremiumBackground3D"), { ssr: false })

export function FloatingWidgets() {
  const [showScroll, setShowScroll] = useState(false)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const [hideForLocalElement, setHideForLocalElement] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 250)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check for local floating CTA or dock
  useEffect(() => {
    const checkFloatingElements = () => {
      const hasLocalCta = !!document.querySelector(".local-floating-cta")
      const hasLocalDock = !!document.querySelector(".local-floating-dock")
      setHideForLocalElement(hasLocalCta || hasLocalDock)
    }

    checkFloatingElements()
    
    // Set up a small interval or scroll/resize listeners to check for dynamically added items
    const interval = setInterval(checkFloatingElements, 500)
    window.addEventListener("scroll", checkFloatingElements)
    window.addEventListener("resize", checkFloatingElements)

    return () => {
      clearInterval(interval)
      window.removeEventListener("scroll", checkFloatingElements)
      window.removeEventListener("resize", checkFloatingElements)
    }
  }, [pathname])

  // Observe the footer visibility
  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      { 
        rootMargin: "0px 0px 50px 0px",
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
      color: "text-blue-600 hover:bg-blue-50 text-blue-500", 
      action: () => window.dispatchEvent(new CustomEvent("open-book-call-modal")), 
      label: "Book Call" 
    },
    { 
      id: "mail", 
      icon: Mail, 
      color: "text-purple-650 hover:bg-purple-50 text-purple-500", 
      action: () => window.open("mailto:info@skillforgetechnology.app"), 
      label: "Email Support" 
    },
    { 
      id: "whatsapp", 
      icon: MessageSquare, 
      color: "text-emerald-600 hover:bg-emerald-50 text-emerald-500", 
      action: () => window.open(whatsappUrl, "_blank"), 
      label: "WhatsApp Chat" 
    },
    { 
      id: "inquiry", 
      icon: Send, 
      color: "text-blue-500 hover:bg-blue-50 text-blue-400", 
      action: () => window.location.href = "/contact", 
      label: "Request Proposal" 
    }
  ]

  const isContactPage = pathname === "/contact"
  const shouldHideAll = isFooterVisible || hideForLocalElement || isContactPage

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 select-none pointer-events-none flex flex-col gap-3 items-center">
        {/* Floating Vertical Menu */}
        <AnimatePresence>
          {!shouldHideAll && (
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto flex flex-col gap-2.5 p-2 rounded-2xl border border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xl"
            >
              {items.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className={`p-3 rounded-xl transition-all duration-300 ${item.color} focus:outline-none flex items-center justify-center cursor-pointer`}
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

        {/* Scroll to Top button */}
        <AnimatePresence>
          {showScroll && !shouldHideAll && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={scrollToTop}
              className="pointer-events-auto p-3 rounded-xl border border-slate-200/80 bg-white/95 text-slate-500 hover:text-blue-650 hover:border-blue-200/80 backdrop-blur-md shadow-md transition-colors focus:outline-none cursor-pointer"
              title="Scroll to Top"
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <BookCallModal />
      <PremiumBackground3D />
    </>
  )
}

export default FloatingWidgets
