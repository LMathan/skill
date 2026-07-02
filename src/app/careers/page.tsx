import React from "react"
import { Metadata } from "next"
import CareersContent from "./CareersContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Careers | Join Our Team of Developers & Solutions Architects",
  description: "Explore career opportunities at SkillForge Technology. We are looking for talented React frontend engineers, Flutter developers, and IoT firmware experts.",
  keywords: [
    "Software Engineering Jobs",
    "Join SkillForge Technology",
    "Offshore Developer Vacancies",
    "React Native Careers",
    "Node.js Backend Developer Jobs",
    "IT Career Opportunities"
  ],
  path: "/careers"
})

export default function CareersPage() {
  return <CareersContent />
}
