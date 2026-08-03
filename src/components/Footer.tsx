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
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setErrorMsg("")
    setSubscribed(false)

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubscribed(true)
        setEmail("")
        setTimeout(() => setSubscribed(false), 5000)
      } else {
        setErrorMsg(data.error || "Subscription failed. Please try again.")
      }
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred. Please try again.")
      console.error("Subscription submission error:", err)
    } finally {
      setLoading(false)
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
                width={40}
                height={40}
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
                <span className="leading-tight">Perundurai, Tamil Nadu, India</span>
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
                  disabled={loading}
                  placeholder="Enter email..."
                  aria-label="Email address for newsletter subscription"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-650 w-full disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-brand text-white p-2 rounded-xl hover:shadow-md transition-shadow shrink-0 cursor-pointer flex items-center justify-center disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  {loading ? (
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-green-600 font-semibold">Subscribed successfully!</p>
              )}
              {errorMsg && (
                <p className="text-[10px] text-red-500 font-semibold">{errorMsg}</p>
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
            <a href="https://www.linkedin.com/company/skillforgetech/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-slate-400 hover:text-blue-650 hover:bg-slate-100 transition-all flex items-center justify-center" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            {/* <a href="https://x.com/skillforge_tech" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-slate-400 hover:text-blue-400 hover:bg-slate-100 transition-all flex items-center justify-center" aria-label="Twitter/X">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a> */}
            <a href="https://www.instagram.com/skillforge_technology?igsh=MTN2MWd2Y2t0ZmpzMw==" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-slate-400 hover:text-pink-600 hover:bg-slate-100 transition-all flex items-center justify-center" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/share/1BWkyZ2pYd/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-slate-100 transition-all flex items-center justify-center" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
              </svg>
            </a>
            {/* <a href="https://youtube.com/@skillforgetechnology" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-all flex items-center justify-center" aria-label="YouTube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.025 0 12 0 12s0 3.975.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.863.508 9.388.508 9.388.508s7.525 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.975 24 12 24 12s0-3.975-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a> */}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
