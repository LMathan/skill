import { Metadata } from "next"
import FeedbackPortalContent from "./FeedbackPortalContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Quality & Delivery Standards | SkillForge Technologies",
  description: "Read about SkillForge Technologies's core engineering principles, type-safe development practices, security audits, and our transparent trust policy.",
  keywords: [
    "Software Quality Standards",
    "Secure Coding Practices",
    "Type Safe Web Development",
    "Enterprise Software Engineering",
    "SkillForge Technologies Quality"
  ],
  path: "/reviews"
})

export default function ReviewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://skillforgetechnology.app/reviews/#webpage",
        "url": "https://skillforgetechnology.app/reviews",
        "name": "Quality & Delivery Standards | SkillForge Technologies"
      },
      {
        "@type": "Organization",
        "@id": "https://skillforgetechnology.app/#organization",
        "name": "SkillForge Technologies",
        "url": "https://skillforgetechnology.app"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FeedbackPortalContent />
    </>
  )
}

