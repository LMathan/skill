import { Metadata } from "next"
import { getSeoMetadata } from "@/lib/seo"
import GalleryContent from "./GalleryContent"
import { galleryData } from "@/data/galleryData"

const BASE_URL = "https://skillforgetechnology.app"

/**
 * Gallery page metadata.
 *
 * WHY REAL IMAGES HELP SEO:
 * - Google Images is a significant traffic source for engineering/project searches.
 * - Real photos build E-E-A-T (Experience, Expertise, Authoritativeness, Trust).
 * - Descriptive filenames + alt text + ImageObject schema make each image
 *   individually indexable in Google Image Search results.
 * - Local photos (with geo-relevant alt text) improve Local Pack signals for
 *   queries like "project center Erode" or "IoT project Erode Tamil Nadu".
 */
export const metadata: Metadata = getSeoMetadata({
  title: "Project Gallery — Real Engineering Hardware Prototypes | SkillForge Technology Erode",
  description:
    "Browse real photos of working engineering hardware prototypes built at SkillForge Technology laboratory in Erode, Tamil Nadu — Eye Blink Car, Smart Irrigation, AI Waste Monitoring, Remote Motor Control. Actual lab-made IoT, Embedded Systems, AI & Robotics final year projects for ECE, EEE, CSE students.",
  keywords: [
    // Gallery discovery queries
    "Engineering Project Gallery Erode",
    "Real Hardware Project Photos Tamil Nadu",
    "IoT Project Prototype Photos Erode",
    "Embedded Systems Project Gallery",
    "AI Project Photos Erode",
    "Robotics Project Gallery Tamil Nadu",
    // Project-specific (each title = a searchable query)
    "Eye Blink Controlled Car Obstacle Avoidance Project",
    "Smart Irrigation System ESP8266 Arduino",
    "AI Smart Waste Monitoring System",
    "Automatic Remote Motor Control System",
    "IoT Water Pipeline Leakage Theft Detection",
    "F450 Quadcopter Drone FlySky RC",
    "IoT Alcohol Detection Vehicle Ignition Locking",
    "IoT Smart Drainage Blockage Monitoring",
    "UAV Drone Outdoor Flight Testing Erode",
    // Local SEO
    "SkillForge Technology Gallery Erode",
    "Final Year Project Photos Erode",
    "IEEE Project Center Gallery Tamil Nadu",
    "Engineering Lab Photos Erode",
    "Project Center Erode Tamil Nadu Photos",
  ],
  path: "/gallery",
})

export default function GalleryPage() {
  /**
   * Structured Data: ImageGallery + one ImageObject per real photo.
   *
   * Google uses ImageObject structured data to:
   * - Show images in rich search results
   * - Index images for Google Image Search with context
   * - Attribute images to the correct creator/publisher (E-E-A-T signal)
   * - Understand what the image depicts without relying solely on alt text
   */
  const imageObjects = galleryData.map((img) => ({
    "@type": "ImageObject",
    "@id": `${BASE_URL}${img.src}`,
    contentUrl: `${BASE_URL}${img.src}`,
    url: `${BASE_URL}/gallery`,
    name: img.projectTitle,
    description: img.alt,
    encodingFormat: img.src.endsWith(".png") ? "image/png" : "image/jpeg",
    // keywords from tech stack improve discoverability in image search
    keywords: img.technologies.join(", "),
    about: {
      "@type": "Thing",
      name: img.projectTitle,
    },
    author: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "SkillForge Technology",
    },
    copyrightHolder: {
      "@type": "Organization",
      name: "SkillForge Technology",
    },
    locationCreated: {
      "@type": "Place",
      name: "SkillForge Technology Laboratory",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Erode",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${BASE_URL}/gallery#imagegallery`,
    name: "SkillForge Technology — Real Engineering Project Gallery, Erode",
    description:
      "Real photographs of lab-built engineering hardware prototypes at SkillForge Technology, Erode, Tamil Nadu — IoT, Embedded Systems, AI/ML, and Robotics final year projects for ECE, EEE, CSE and IT students.",
    url: `${BASE_URL}/gallery`,
    inLanguage: "en-IN",
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "SkillForge Technology",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Erode",
        addressRegion: "Tamil Nadu",
        addressCountry: "IN",
      },
    },
    image: imageObjects,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GalleryContent />
    </>
  )
}
