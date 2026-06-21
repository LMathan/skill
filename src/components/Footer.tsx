import React from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Rocket } from "lucide-react"

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
)

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="SkillForge Technology" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              SkillForge Technology is an electronics and IoT innovation lab specializing in engineering project mentoring, custom electronic prototyping, and intelligent software systems.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-100 hover:bg-brand-cyan hover:text-white dark:bg-slate-900 dark:hover:bg-brand-cyan text-slate-500 dark:text-slate-400 transition-colors" aria-label="LinkedIn">
                <LinkedinIcon className="w-[18px] h-[18px]" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 hover:bg-brand-cyan hover:text-white dark:bg-slate-900 dark:hover:bg-brand-cyan text-slate-500 dark:text-slate-400 transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-[18px] h-[18px]" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 hover:bg-brand-cyan hover:text-white dark:bg-slate-900 dark:hover:bg-brand-cyan text-slate-500 dark:text-slate-400 transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-[18px] h-[18px]" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 hover:bg-brand-cyan hover:text-white dark:bg-slate-900 dark:hover:bg-brand-cyan text-slate-500 dark:text-slate-400 transition-colors" aria-label="YouTube">
                <YoutubeIcon className="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { name: "Home", path: "/" },
                { name: "Projects Portfolio", path: "/projects" },
                { name: "Our Services", path: "/services" },
                { name: "Internship Training", path: "/internship" },
                { name: "Resource Blog", path: "/blog" },
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-sm text-slate-500 dark:text-slate-450 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {[
                "IoT Systems Development",
                "Embedded Systems Hardware",
                "AI & Machine Learning Systems",
                "Custom PCB Design & Prototyping",
                "IEEE Research Support",
                "Web & Mobile App Development",
                "Technical Workshops & Internships"
              ].map((service) => (
                <li key={service}>
                  <Link href="/services" className="text-sm text-slate-500 dark:text-slate-450 hover:text-brand-cyan dark:hover:text-brand-cyan transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-cyan shrink-0 mt-0.5" />
                <span className="text-sm text-slate-550 dark:text-slate-450 leading-relaxed">
                  Perundurai Road, Erode,<br />Tamil Nadu - 638052
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-cyan shrink-0" />
                <a href="tel:+919345518760" className="text-sm text-slate-500 dark:text-slate-450 hover:text-brand-cyan transition-colors">
                  +91 93455 18760
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-cyan shrink-0" />
                <a href="mailto:skillforgetechnology05@gmail.com" className="text-sm text-slate-500 dark:text-slate-450 hover:text-brand-cyan transition-colors break-all">
                  skillforgetechnology05@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-200 dark:border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            &copy; {currentYear} SkillForge Technology. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
            Designed for engineering excellence & digital innovation.
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
