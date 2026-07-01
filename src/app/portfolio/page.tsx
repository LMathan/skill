import React from "react"
import { Metadata } from "next"
import PortfolioContent from "./PortfolioContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Case Portfolio | Custom Software & SaaS Product Deployments",
  description: "Browse our portfolio of completed projects. From multi-tenant SaaS dashboards to industrial IoT firmware and React web apps, see our custom software solutions.",
  keywords: [
    "Software Portfolio",
    "Completed SaaS Products",
    "IoT Embedded Systems Projects",
    "Offshore Coding Showcase",
    "React Web App Portfolio"
  ],
  path: "/portfolio"
})

export default function PortfolioPage() {
  return <PortfolioContent />
}
