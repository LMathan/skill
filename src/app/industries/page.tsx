import React from "react"
import { Metadata } from "next"
import { getSeoMetadata } from "@/lib/seo"
import IndustriesContent from "./IndustriesContent"

export const metadata: Metadata = getSeoMetadata({
  title: "Target Industries | Software Engineered for Sectors",
  description: "Explore the primary industry verticals we support, including FinTech regulatory systems, HIPAA-compliant Healthcare, and Real Estate creative staging automation.",
  keywords: [
    "FinTech Software Development",
    "HIPAA Compliant Healthcare Apps",
    "Logistics Supply Chain ERP",
    "Real Estate Digital Platforms",
    "Retail E-commerce Engineering"
  ],
  path: "/industries"
})

export default function IndustriesPage() {
  return <IndustriesContent />
}

