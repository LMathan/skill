import { Metadata } from "next"
import BlogContent from "./BlogContent"
import { blogData } from "@/data/siteData"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Tech Tutorials & Engineering Guides",
  description: "Read technical guides on microcontrollers (ESP32, STM32), Edge AI, TinyML, and IoT sensor networks written by SkillForge design engineers.",
  keywords: [
    "IoT tutorials",
    "Embedded systems guide",
    "TinyML tutorials",
    "Edge AI guide",
    "ESP32 projects guide",
    "Engineering research blog"
  ],
  path: "/blog"
})

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SkillForge Technology Engineering Hub",
    "description": "Technical tutorials, microcontroller checklists, and Edge AI blueprints written by SkillForge design coordinators.",
    "blogPost": blogData.map((blog) => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.summary,
      "datePublished": blog.date === "June 18, 2026" ? "2026-06-18" : "2026-05-24",
      "author": {
        "@type": "Person",
        "name": blog.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "SkillForge Technology",
        "logo": "https://skillforgetechnology.app/logo.png"
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogContent />
    </>
  )
}
