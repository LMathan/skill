import { Metadata } from "next"
import HomeContent from "./HomeContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Global Software Engineering & Digital Transformation | SkillForge Technology",
  description: "SkillForge Technology is a global software engineering and digital transformation partner delivering premium websites, custom web applications, enterprise software, AI-powered solutions, and digital automation platforms.",
  keywords: [
    "Software Engineering",
    "Digital Transformation",
    "Custom Web Applications",
    "Enterprise Software Development",
    "AI-Powered Solutions",
    "Business Automation Platforms",
    "SaaS Development",
    "SkillForge Technology"
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
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://skillforgetechnology.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "sameAs": [
        "https://www.linkedin.com/company/skillforgetech/",
        "https://x.com/skillforge_tech",
        "https://facebook.com/skillforgetechnology",
        "https://youtube.com/@skillforgetechnology",
        "https://www.instagram.com/skillforge_technology?igsh=MTN2MWd2Y2t0ZmpzMw=="
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://skillforgetechnology.app/#organization",
      "name": "SkillForge Technology",
      "description": "Premium Enterprise Software, AI Agents, Cloud & Industrial IoT Consultancy.",
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
      },
      "sameAs": [
        "https://www.linkedin.com/company/skillforgetech/",
        "https://x.com/skillforge_tech",
        "https://facebook.com/skillforgetechnology",
        "https://youtube.com/@skillforgetechnology",
        "https://www.instagram.com/skillforge_technology?igsh=MTN2MWd2Y2t0ZmpzMw=="
      ]
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
