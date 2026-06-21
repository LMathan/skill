import React from "react"
import { Metadata } from "next"
import AboutContent from "./AboutContent"

export const metadata: Metadata = {
  title: "About Us | Lab Mission & Tech Stack",
  description: "Learn about SkillForge Technology, our mission, vision, engineering principles, and why we are the leading project development center in Tamil Nadu."
}

export default function AboutPage() {
  return <AboutContent />
}
