import React from "react"
import { Metadata } from "next"
import CaseStudiesContent from "./CaseStudiesContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Case Studies | Engineering & Digital Transformation Outcomes",
  description: "Read about how SkillForge Technology has engineered custom AI logistics dispatch systems, high-frequency ERP pipelines, and cross-platform mobile apps for international businesses.",
  keywords: [
    "Outsource Case Studies",
    "Enterprise Software Outcomes",
    "AI Logistics Implementation",
    "SaaS Scaling Case Study",
    "Dedicated Coding Team Results"
  ],
  path: "/case-studies"
})

export default function CaseStudiesPage() {
  return <CaseStudiesContent />
}
