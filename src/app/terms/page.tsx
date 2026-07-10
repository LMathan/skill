import React from "react"
import { Metadata } from "next"
import TermsContent from "./TermsContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Terms of Service | Operational & Scoping Policies | SkillForge Technology",
  description: "Review the general terms of service, engagement models, and scoping conditions when collaborating with SkillForge Technology.",
  keywords: [
    "SkillForge Terms of Service",
    "Client Engagement Model",
    "Statement of Work SOW Scopes",
    "Software Development Clauses",
    "Corporate Legal Disputes"
  ],
  path: "/terms"
})

export default function TermsPage() {
  return <TermsContent />
}
