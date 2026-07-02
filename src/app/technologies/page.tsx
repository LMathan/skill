import React from "react"
import { Metadata } from "next"
import { getSeoMetadata } from "@/lib/seo"
import TechnologiesContent from "./TechnologiesContent"

export const metadata: Metadata = getSeoMetadata({
  title: "Technologies Matrix | Frontend, Cloud & AI Stacks",
  description: "Review SkillForge Technology's engineering command over Next.js, C# .NET, Python ML modeling, AWS infrastructure orchestration, and STM32 embedded C firmware.",
  keywords: [
    "Next.js React Frontend Stack",
    "C# .NET Core Development",
    "Python Machine Learning LLM",
    "AWS Google Cloud DevOps",
    "STM32 ESP32 Embedded firmware",
    "Laravel PHP developers"
  ],
  path: "/technologies"
})

export default function TechnologiesPage() {
  return <TechnologiesContent />
}

