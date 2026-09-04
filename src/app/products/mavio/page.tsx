import { Metadata } from "next"
import { Suspense } from "react"
import MavioProductContent from "./MavioProductContent"

export const metadata: Metadata = {
  title: "Mavio — Smart Campus Transit & Fleet Intelligence Platform | SkillForge Technologies",
  description: "Experience Mavio: an enterprise-grade transit safety and fleet intelligence ecosystem. Real-time vector map tracking, dynamic ETAs, offline resilience, and odometer-driven preventive maintenance alerts.",
  keywords: [
    "Mavio",
    "Mavio Transit",
    "Fleet Intelligence Platform",
    "Campus Shuttle Tracking",
    "Real-time GPS Tracking",
    "Haversine Odometer Tracker",
    "School Bus Safety App",
    "Corporate Fleet Management",
    "Driver Offline Buffering",
    "Zero Hardware Fleet GPS",
    "SkillForge Technologies Products"
  ],
  alternates: {
    canonical: "https://skillforgetechnology.app/products/mavio"
  },
  openGraph: {
    title: "Mavio — Smart Campus Transit & Fleet Intelligence Platform",
    description: "Enterprise-grade campus transit tracking and fleet intelligence system with real-time vector maps, dynamic ETAs, offline buffering, and odometer servicing alerts.",
    url: "https://skillforgetechnology.app/products/mavio",
    siteName: "SkillForge Technologies",
    images: [
      {
        url: "https://skillforgetechnology.app/Product/mavio/home.png",
        width: 1200,
        height: 630,
        alt: "Mavio Smart Campus Transit Dashboard"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Mavio — Smart Campus Transit & Fleet Intelligence Platform",
    description: "Real-time vector map tracking, dynamic ETAs, offline resilience, and odometer-driven maintenance schedules.",
    images: ["https://skillforgetechnology.app/Product/mavio/home.png"]
  }
}

// Google JSON-LD Rich Snippet Structured Data for Mavio Platform
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://skillforgetechnology.app/products/mavio#product",
      "name": "Mavio - Campus Transit & Fleet Intelligence Platform",
      "image": "https://skillforgetechnology.app/Product/mavio/home.png",
      "description": "An enterprise-grade, real-time campus shuttle tracking and telemetry software for educational institutions and corporate complexes.",
      "brand": {
        "@type": "Brand",
        "name": "SkillForge Technologies"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.95",
        "reviewCount": "48"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://skillforgetechnology.app/products/mavio#software",
      "name": "Mavio Mobile Tracking System",
      "operatingSystem": "Android, iOS, Web",
      "applicationCategory": "BusinessApplication, MapsApplication",
      "description": "Zero-hardware campus transit manager featuring driver telemetry, offline buffer synchronizer, and commuter proximity alerts.",
      "downloadUrl": "https://play.google.com/store/apps/details?id=app.skillforge.mavio",
      "installUrl": "https://play.google.com/store/apps/details?id=app.skillforge.mavio",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "SkillForge Technologies",
        "url": "https://skillforgetechnology.app"
      }
    }
  ]
}

export default function MavioProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-sans text-sm">
          Loading Mavio Platform...
        </div>
      }>
        <MavioProductContent />
      </Suspense>
    </>
  )
}
