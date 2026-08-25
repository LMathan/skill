import React from "react"
import { Metadata } from "next"
import ServicesContent from "./ServicesContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Our Services | Software Development, AI Stacks & Cloud DevOps",
  description: "Explore the 12 primary software engineering, custom mobile development, cloud migrations, AI integrations, and real estate creative divisions offered by SkillForge Technologies.",
  keywords: [
    "Enterprise Software Solutions",
    "Offshore Custom Development",
    "AI Orchestration Consultancy",
    "Cloud Architecture DevOps",
    "Outsourced Development Team",
    "Flutter iOS Android Developers",
    "Next.js React Agency"
  ],
  path: "/services"
})

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Enterprise Software Engineering & Digital Transformation Solutions",
    "provider": {
      "@type": "Organization",
      "name": "SkillForge Technologies",
      "telephone": "+919345518760",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Erode",
        "addressRegion": "Tamil Nadu",
        "postalCode": "638052",
        "addressCountry": "IN"
      },
      "url": "https://skillforgetechnology.app"
    }
  }

  return (
    <div className="relative bg-transparent pt-24 select-none bg-dot-pattern overflow-hidden">
      {/* Background glowing circles and 3D shapes */}
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 left-10 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      
      {/* 3D-style gear isometric tech shape */}
      <svg className="absolute top-24 left-[10%] w-64 h-64 text-blue-500/10 pointer-events-none -z-10 animate-spin-slow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.4" strokeDasharray="4 4" />
        <path d="M50 15 L50 85 M15 50 L85 50 M25 25 L75 75 M75 25 L25 75" stroke="currentColor" strokeWidth="0.2" />
        <circle cx="50" cy="50" r="12" stroke="currentColor" strokeWidth="0.8" fill="white" />
        <circle cx="50" cy="50" r="6" stroke="currentColor" strokeWidth="0.4" />
      </svg>
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block">Capabilities Matrix</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900">
            Our <span className="text-gradient">Engineering Services</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            We operate across 12 dedicated divisions, assembling specialized teams to build software assets that optimize operational efficiency and drive scale.
          </p>
        </div>
      </section>

      {/* Services List Content container */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-left">
        <ServicesContent />
      </section>

    </div>
  )
}
