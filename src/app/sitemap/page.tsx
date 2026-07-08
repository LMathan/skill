import React from "react"
import { Metadata } from "next"
import SitemapContent from "./SitemapContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Site Map | SkillForge Technology",
  description: "Browse every page on the SkillForge Technology website including software development services, mobile app development, AI solutions, portfolio, blogs, and company information.",
  keywords: [
    "SkillForge Sitemap",
    "HTML Site Map",
    "SkillForge Pages",
    "Navigation Index",
    "Enterprise Software Services List"
  ],
  path: "/sitemap"
})

export default function SitemapPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://skillforgetechnology.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Site Map",
        "item": "https://skillforgetechnology.app/sitemap"
      }
    ]
  }

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://skillforgetechnology.app/sitemap#webpage",
    "url": "https://skillforgetechnology.app/sitemap",
    "name": "Site Map | SkillForge Technology",
    "description": "Explore every page and service offered by SkillForge Technology. Quickly navigate through our services, solutions, portfolio, resources, and company information.",
    "isPartOf": {
      "@id": "https://skillforgetechnology.app/#website"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <SitemapContent />
    </>
  )
}
