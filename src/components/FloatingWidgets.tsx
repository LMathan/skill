"use client"

import React, { useState, useEffect } from "react"
import { Phone, Mail, ArrowUp, Send, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FloatingWidgets() {
  const [showScroll, setShowScroll] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 250)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const whatsappUrl = "https://wa.me/919345518760?text=Hello%20SkillForge%20Technology,%20I%20would%20like%20to%20discuss%20a%20project."

  const items = [
    { id: "call", icon: Phone, color: "text-blue-500 hover:bg-blue-500/10 hover:text-blue-400", action: () => window.open("tel:+919345518760"), label: "Call Us" },
    { id: "mail", icon: Mail, color: "text-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-400", action: () => window.open("mailto:skillforgetechnology05@gmail.com"), label: "Email Us" },
    { id: "whatsapp", icon: MessageSquare, color: "text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-400", action: () => window.open(whatsappUrl, "_blank"), label: "WhatsApp Chat" },
    { id: "inquiry", icon: Send, color: "text-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-400", action: () => window.open("https://docs.google.com/forms/d/e/1FAIpQLSeswcU7Z1ynIuZTMwI543sefH2-biIa35B5WL0DAaJUMD3_vQ/viewform", "_blank"), label: "Inquiry Form" }
  ]

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none pointer-events-none flex flex-col gap-3 items-center">
      {/* Floating Vertical Menu */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="pointer-events-auto flex flex-col gap-2.5 p-2 rounded-2xl border border-slate-200/50 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 backdrop-blur-md shadow-2xl"
      >
        {items.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`p-3 rounded-xl transition-all duration-300 ${item.color} focus:outline-none flex items-center justify-center`}
              title={item.label}
            >
              <Icon size={18} />
            </button>
          )
        })}
      </motion.div>

      {/* Scroll to Top button */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="pointer-events-auto p-3 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 text-slate-500 hover:text-brand-cyan dark:text-slate-400 dark:hover:text-brand-cyan backdrop-blur-md shadow-lg transition-colors focus:outline-none"
            title="Scroll to Top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingWidgets
