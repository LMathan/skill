import React from "react"
import { Metadata } from "next"
import ServicesContent from "./ServicesContent"

export const metadata: Metadata = {
  title: "Our Services | IoT, AI & Embedded Development",
  description: "Explore the full spectrum of engineering services offered by SkillForge Technology: from hardware prototyping & PCB layouts to TinyML, Flutter IoT apps, and research guides."
}

export default function ServicesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Electronics & Software Engineering Specializations",
    "provider": {
      "@type": "LocalBusiness",
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
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Innovation & Prototyping Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IoT Projects & Development",
            "description": "Cloud-connected smart systems with real-time sensor intelligence and dashboards."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Embedded Systems",
            "description": "Robust firmware programming and custom hardware integration for specialized devices."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI & Machine Learning",
            "description": "Intelligent analytics, computer vision, and automation solutions using modern ML frameworks."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "IEEE Projects Support",
            "description": "Comprehensive research support, simulation, implementation, and thesis guides for engineering scholars."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web & Mobile App Development",
            "description": "Premium cross-platform dashboards and user-centric applications tailored for smart products."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Internship Training & Workshops",
            "description": "Hands-on industrial training on IoT, AI, and Embedded systems with certified achievements."
          }
        }
      ]
    }
  }

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display">
            Our <span className="text-gradient">Engineering Services</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
            We specialize in custom electronic designs, hardware integrations, and edge analytics to build reliable prototypes.
          </p>
        </div>
      </section>

      {/* Services List Content container */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <ServicesContent />
      </section>

    </div>
  )
}
