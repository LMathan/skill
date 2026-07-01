import React from "react"
import { Metadata } from "next"
import ServicesContent from "./ServicesContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Our Services | Software Development, AI Stacks & Cloud DevOps",
  description: "Explore the 12 primary software engineering, custom mobile development, cloud migrations, AI integrations, and real estate creative divisions offered by SkillForge Technology.",
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
      "name": "SkillForge Technology",
      "telephone": "+919345518760",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Perundurai Road",
        "addressLocality": "Erode",
        "addressRegion": "Tamil Nadu",
        "postalCode": "638052",
        "addressCountry": "IN"
      },
      "url": "https://skillforgetechnology.app"
    }
  }

  return (
    <div className="relative bg-white pt-24 select-none">
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
