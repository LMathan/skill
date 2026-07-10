import { Metadata } from "next"
import ProjectsContent from "./ProjectsContent"
import { projectsData } from "@/data/siteData"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Engineering R&D Prototypes & Systems | SkillForge Technology",
  description: "Explore our collection of proof-of-concept software architectures and R&D prototypes across IoT, Embedded Systems, AI, and Scaled Software Stacks.",
  keywords: [
    "IoT R&D Prototypes",
    "Embedded Systems Prototypes",
    "Robotics Systems Engineering",
    "AI & ML Proof of Concepts",
    "Custom Hardware Prototyping",
    "SkillForge Engineering Portfolio"
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
