"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Send, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"
import { agencyServices } from "@/data/agencyData"

export function Footer() {
  const { t, isRTL } = useLanguage()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const companyLinks = [
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.portfolio"), path: "/portfolio" },
    { name: t("nav.caseStudies"), path: "/case-studies" },
    { name: t("nav.careers"), path: "/careers" },
    { name: t("nav.blog"), path: "/blog" },
    { name: t("nav.contact"), path: "/contact" }
  ]

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Security Standards", path: "/security" },
    { name: "SLA Agreements", path: "/sla" }
  ]

  return (
    <footer className="bg-slate-50 border-t border-slate-200/60 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-200/60">

          {/* Info Block */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <Link href="/" className="flex items-center gap-2.5">
              <img 
                src="/logo-mark.png" 
                alt="SkillForge" 
                className="h-10 w-auto block" 
              />
              <div className="flex flex-col text-left leading-none font-display">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  SkillForge
                </span>
                <span className="text-[9px] font-black uppercase tracking-[0.25em] mt-0.5 text-blue-650">
                  Technology
                </span>
              </div>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              {t("footer.desc")} Positioning startups, SMEs, and global enterprises to dominate markets via robust software engineering and digital transformational intelligence.
            </p>

            {/* Contact details */}
            <div className="space-y-2.5 pt-2">
              <a href="mailto:info@skillforgetechnology.app" className="flex items-center gap-2 text-xs text-slate-650 hover:text-blue-600 transition-colors">
                <Mail size={14} className="text-slate-400" />
                <span>info@skillforgetechnology.app</span>
              </a>
              <a href="tel:+919345518760" className="flex items-center gap-2 text-xs text-slate-650 hover:text-blue-600 transition-colors">
                <Phone size={14} className="text-slate-400" />
                <span>+91 93455 18760</span>
              </a>
              <div className="flex items-start gap-2 text-xs text-slate-650">
                <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                <span className="leading-tight">Perundurai, Erode, Tamil Nadu, India</span>
              </div>
            </div>
          </div>

          {/* Service Links Column */}
          <div className="lg:col-span-3 text-left">
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-4">
              {t("footer.services")}
            </h3>
            <ul className="space-y-2.5">
              {agencyServices.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-xs text-slate-650 hover:text-blue-600 transition-colors font-medium">
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center gap-0.5">
                  <span>View All 16 Divisions →</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div className="lg:col-span-2 text-left">
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-4">
              {t("footer.company")}
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-xs text-slate-655 hover:text-blue-600 transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal and Newsletter Column */}
          <div className="lg:col-span-3 text-left">
            <h3 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-4">
              Legal & Newsletter
            </h3>
            <ul className="space-y-2.5 mb-5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-xs text-slate-655 hover:text-blue-600 transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter input */}
            <form onSubmit={handleSubscribe} className="space-y-2">
              <span className="text-[10px] font-semibold text-slate-500 block">Subscribe to our Insights</span>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-650 w-full"
                />
                <button
                  type="submit"
                  className="bg-gradient-brand text-white p-2 rounded-xl hover:shadow-md transition-shadow shrink-0 cursor-pointer flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Send size={14} />
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-green-600 font-semibold">Subscribed successfully!</p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Socials & Rights */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4">
          <p className="text-xs text-slate-400">
            {t("footer.rights")}
          </p>

          <div className="flex items-center gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-slate-400 hover:text-blue-650 hover:bg-slate-100 transition-all flex items-center justify-center" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-slate-400 hover:text-blue-400 hover:bg-slate-100 transition-all flex items-center justify-center" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/skillforge_technology?igsh=MTN2MWd2Y2t0ZmpzMw==" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-slate-400 hover:text-pink-600 hover:bg-slate-100 transition-all flex items-center justify-center" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
