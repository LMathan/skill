import { Metadata } from "next"
import BlogContent from "./BlogContent"
import { blogData } from "@/data/siteData"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Insights & Technical Engineering Articles | SkillForge",
  description: "Read technical guides on custom software development architectures, AI agents fine-tuning, industrial cloud migrations, and IoT hardware engineering.",
  keywords: [
    "Software Engineering Blog",
    "Enterprise Tech Articles",
    "AI Agent fine-tuning",
    "Cloud Architecture Migration",
    "Industrial IoT Firmware"
  ],
  path: "/blog"
})

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "SkillForge Technologies Insights Hub",
    "description": "Technical tutorials, SaaS design patterns, and AI integration blueprints written by SkillForge architects.",
    "blogPost": blogData.map((blog) => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.summary,
      "datePublished": "2026-06-18",
      "author": {
        "@type": "Person",
        "name": blog.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "SkillForge Technologies",
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
