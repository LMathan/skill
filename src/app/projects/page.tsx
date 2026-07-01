import { Metadata } from "next"
import ProjectsContent from "./ProjectsContent"
import { projectsData } from "@/data/siteData"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Engineering R&D Prototypes & Systems",
  description: "Explore our collection of 54+ proof-of-concept prototypes across IoT & Embedded Systems, AI & Machine Learning, Robotics, and Scaled Software Stacks.",
  keywords: [
    "IoT R&D Prototypes",
    "Embedded Systems Prototypes",
    "Robotics Systems engineering",
    "AI & ML proof of concepts",
    "Erode IoT engineering",
    "Custom hardware prototype center",
    "SkillForge portfolio"
  ],
  path: "/projects"
})

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "SkillForge Engineering Projects Database",
    "description": "Comprehensive catalog of 54+ verified IoT, Robotics, AI, and Embedded Systems engineering projects.",
    "itemListElement": projectsData.map((project, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "description": project.description,
        "keywords": project.technologies.join(", "),
        "genre": project.category
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsContent />
    </>
  )
}
