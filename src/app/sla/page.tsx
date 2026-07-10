import React from "react"
import { Metadata } from "next"
import SlaContent from "./SlaContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Service Level Agreements (SLA) | Uptime Commitments | SkillForge Technology",
  description: "Review SkillForge Technology's operational uptime targets, incident response levels, and hosting SLA policies.",
  keywords: [
    "SkillForge SLA Agreements",
    "Uptime Commitments Global",
    "Incident Response Levels",
    "Cloud Staging Maintenance",
    "Severity Recovery Targets"
  ],
  path: "/sla"
})

export default function SlaPage() {
  return <SlaContent />
}
