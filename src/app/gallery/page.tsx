import { Metadata } from "next"
import { getSeoMetadata } from "@/lib/seo"
import GalleryContent from "./GalleryContent"
import { agencyCaseStudies } from "@/data/agencyData"

const BASE_URL = "https://skillforgetechnology.app"

export const metadata: Metadata = getSeoMetadata({
  title: "Engineering Showcase & Product Demos | SkillForge Technologies",
  description:
    "Explore our engineering showcases, technical prototypes, and custom UI/UX layouts developed at SkillForge Technologies. Review our solutions in web apps, mobile systems, and IoT.",
  keywords: [
    "Enterprise Software Showcase",
    "IoT Embedded Systems Prototypes",
    "AI Agent Platform Demos",
    "UI/UX Design Concepts",
    "SkillForge Technologies Case Studies"
  ],
  path: "/gallery",
})

export default function GalleryPage() {
  const imageObjects = agencyCaseStudies.map((item) => ({
    "@type": "ImageObject",
    "@id": `${BASE_URL}${item.gallery[0]}`,
    contentUrl: `${BASE_URL}${item.gallery[0]}`,
    url: `${BASE_URL}/gallery`,
    name: item.title,
    description: item.summary,
    encodingFormat: "image/png",
    keywords: item.techStack.join(", "),
    about: {
      "@type": "Thing",
      name: item.title,
    },
    author: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "SkillForge Technologies",
    },
    copyrightHolder: {
      "@type": "Organization",
      name: "SkillForge Technologies",
    }
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${BASE_URL}/gallery#imagegallery`,
    name: "SkillForge Technologies — Engineering Case Showcase Gallery",
    description:
      "Photographic and visual renders of custom enterprise dashboards, cross-platform mobile apps, and IoT boards built by our R&D squads.",
    url: `${BASE_URL}/gallery`,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "SkillForge Technologies",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      }
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
