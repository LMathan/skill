import React from "react"
import { Metadata } from "next"
import AboutContent from "./AboutContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "About Us | Enterprise Software Engineers & Tech Consultancy",
  description: "Learn about SkillForge Technologies, our mission, vision, engineering principles, and how we deliver high-performance software and AI solutions to clients worldwide.",
  keywords: [
    "About SkillForge Technologies",
    "Offshore Engineering Principles",
    "International Software Agency",
    "SaaS Founders Tech Partner",
    "Outsource Dedicated Developers",
    "Startups Scale Consulting"
  ],
  path: "/about"
})

export default function AboutPage() {
  return <AboutContent />
}
