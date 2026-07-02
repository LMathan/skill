import React from "react"
import { Metadata } from "next"
import SecurityContent from "./SecurityContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Security Standards | Cloud Infrastructure & Pipeline Shield | SkillForge Technology",
  description: "Learn about the security standards, encryption policies, access controls, and pipeline checks implemented by SkillForge Technology to protect client projects.",
  keywords: [
    "SkillForge Security Standards",
    "Secure Software Lifecycle",
    "AWS VPC VPC Security",
    "Responsible Disclosure Bug Bounty",
    "SOC 2 HIPAA Compliance"
  ],
  path: "/security"
})

export default function SecurityPage() {
  return <SecurityContent />
}
