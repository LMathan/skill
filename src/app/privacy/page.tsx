import React from "react"
import { Metadata } from "next"
import PrivacyContent from "./PrivacyContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Privacy Policy | Global Data Security & Compliance | SkillForge Technology",
  description: "Learn how SkillForge Technology processes, secures, and safeguards user and client records in compliance with global standards such as GDPR and CCPA.",
  keywords: [
    "SkillForge Privacy Policy",
    "Data Protection Officer",
    "GDPR CCPA Compliance Erode",
    "Secure Software Engineering",
    "Consultancy Data Processing"
  ],
  path: "/privacy"
})

export default function PrivacyPage() {
  return <PrivacyContent />
}
