import { Metadata } from "next"
import ProjectsContent from "./ProjectsContent"
import { projectsData } from "@/data/siteData"

export const metadata: Metadata = {
  title: "Engineering Projects & Embedded Systems",
  description: "Explore our collection of 54+ projects across IoT & Embedded Systems, AI & Machine Learning, Robotics, and Software Stacks. Filter and find your next project idea with source code, report documents, and viva support.",
  keywords: [
    "IoT Projects Database",
    "Embedded Systems Projects",
    "Robotics Projects",
    "AI & ML engineering projects",
    "IEEE Project topics Erode",
    "Final year engineering projects",
    "SkillForge projects list"
  ],
  alternates: {
    canonical: "/projects"
  }
}

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
