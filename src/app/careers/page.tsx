import React from "react"
import { Metadata } from "next"
import CareersContent from "./CareersContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Careers | Join Our Team of Developers & Solutions Architects",
  description: "Explore career opportunities at SkillForge Technologies. We are hiring for Junior Business Development Executive, Senior Backend Engineers, and Lead UI/UX Designers.",
  keywords: [
    "Software Engineering Jobs",
    "Junior Business Development Executive",
    "Business Development Executive Jobs",
    "Join SkillForge Technologies",
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
