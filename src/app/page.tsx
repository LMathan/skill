import { Metadata } from "next"
import HomeContent from "./HomeContent"

export const metadata: Metadata = {
  title: "Best Project Center in Erode | SkillForge Technology",
  description: "SkillForge Technology is Erode's leading engineering project center for IEEE, IoT, Embedded Systems, AI & ML prototypes. Enquire today for hands-on training!",
  keywords: [
    "Best Project Center in Erode",
    "Final Year Project Center in Erode",
    "IEEE Project Center in Erode",
    "IoT Project Center in Erode",
    "Embedded Systems Project Center in Erode",
    "AI Project Center in Erode",
    "Internship Training in Erode",
    "Final Year Projects Tamil Nadu",
    "Engineering Project Center Tamil Nadu",
    "SkillForge Technology Erode"
  ],
  alternates: {
    canonical: "/"
  }
}

export default function Page() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://skillforgetechnology.app/#website",
      "url": "https://skillforgetechnology.app/",
      "name": "SkillForge Technology",
      "description": "Premium Engineering Projects & Hardware Prototyping Laboratory in Erode, Tamil Nadu.",
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
        "contactType": "customer support",
        "areaServed": "IN",
        "availableLanguage": ["en", "ta"]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://skillforgetechnology.app/#localbusiness",
      "name": "SkillForge Technology",
      "image": "https://skillforgetechnology.app/og-image.png",
      "telephone": "+919345518760",
      "email": "skillforgetechnology05@gmail.com",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Perundurai Road, Near Kongu Engineering College",
        "addressLocality": "Perundurai, Erode",
        "addressRegion": "Tamil Nadu",
        "postalCode": "638052",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "11.2778",
        "longitude": "77.5878"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Erode"
        },
        {
          "@type": "City",
          "name": "Salem"
        },
        {
          "@type": "City",
          "name": "Coimbatore"
        },
        {
          "@type": "City",
          "name": "Tiruppur"
        },
        {
          "@type": "City",
          "name": "Namakkal"
        },
        {
          "@type": "City",
          "name": "Karur"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "103"
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
