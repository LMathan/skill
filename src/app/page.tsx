import { Metadata } from "next"
import HomeContent from "./HomeContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Premium Enterprise Software & AI Solutions | SkillForge Technology",
  description: "SkillForge Technology is an international software development and digital transformation agency. We engineer custom enterprise software, AI agents, cloud architectures, and IoT hardware prototypes for global markets.",
  keywords: [
    "Enterprise Software Development",
    "Digital Transformation Agency",
    "AI Agent Integrations",
    "Custom IoT Prototyping",
    "SaaS Product Engineering",
    "Global Cloud Solutions",
    "USA UK Europe Software Partner"
  ],
  path: "/"
})

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://skillforgetechnology.app/#website",
      "url": "https://skillforgetechnology.app/",
      "name": "SkillForge Technology",
      "description": "Premium Enterprise Software, AI Agents, Cloud & Industrial IoT Consultancy.",
      "publisher": {
        "@id": "https://skillforgetechnology.app/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://skillforgetechnology.app/#organization",
      "name": "SkillForge Technology",
      "url": "https://skillforgetechnology.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://skillforgetechnology.app/logo.png",
        "caption": "SkillForge Technology Logo"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+919345518760",
        "contactType": "sales",
        "areaServed": ["IN", "US", "GB", "CA", "AU", "EU", "AE", "SG"],
        "availableLanguage": ["en", "de", "fr", "es", "it", "nl", "ja", "ta", "hi"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://skillforgetechnology.app/#corporateservice",
      "name": "SkillForge Technology",
      "image": "https://skillforgetechnology.app/og-image.png",
      "telephone": "+919345518760",
      "email": "info@skillforgetechnology.app",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Perundurai Road",
        "addressLocality": "Erode",
        "addressRegion": "Tamil Nadu",
        "postalCode": "638052",
        "addressCountry": "IN"
      }
    }
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <HomeContent />
    </>
  )
}
