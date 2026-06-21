import { Metadata } from "next"
import FeedbackPortalContent from "./FeedbackPortalContent"

export const metadata: Metadata = {
  title: "Student Reviews & Project Feedback | SkillForge Technology",
  description: "Read verified student reviews and client testimonials for electronics, IoT, and AI prototypes built inside our laboratory. Share your project feedback.",
  keywords: [
    "SkillForge Technology reviews",
    "IoT project testimonials Erode",
    "Student engineering project feedback",
    "Electronics project reviews Tamil Nadu",
    "Embedded systems project ratings"
  ],
  alternates: {
    canonical: "/reviews"
  }
}

export default function ReviewsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://skillforgetechnology.app/reviews/#webpage",
        "url": "https://skillforgetechnology.app/reviews",
        "name": "Student Reviews & Project Feedback | SkillForge Technology"
      },
      {
        "@type": "LocalBusiness",
        "name": "SkillForge Technology",
        "url": "https://skillforgetechnology.app",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "103"
        }
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

