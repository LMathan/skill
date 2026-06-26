import React from "react"
import { Metadata } from "next"
import AboutContent from "./AboutContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "About Us | Lab Mission & Tech Stack",
  description: "Learn about SkillForge Technology, our mission, vision, engineering principles, and why we are the leading project development center in Tamil Nadu.",
  path: "/about"
})

export default function AboutPage() {
  return <AboutContent />
}
