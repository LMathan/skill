import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { agencyCaseStudies } from "@/data/agencyData"
import CaseStudyDetailClient from "./CaseStudyDetailClient"
import { getSeoMetadata } from "@/lib/seo"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return agencyCaseStudies.map((study) => ({
    slug: study.id,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = agencyCaseStudies.find((s) => s.id === slug)
  if (!study) return {}

  return getSeoMetadata({
    title: `${study.title} | Case Study`,
    description: study.summary,
    keywords: [study.industry, ...study.techStack, "Case Study", "Software Engineering"],
    path: `/case-studies/${slug}`
  })
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const study = agencyCaseStudies.find((s) => s.id === slug)
  
  if (!study) {
    notFound()
  }

  // Generate breadcrumb structured schema
  const breadcrumbJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://skillforgetechnology.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Case Studies",
        "item": "https://skillforgetechnology.app/case-studies"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": study.title,
        "item": `https://skillforgetechnology.app/case-studies/${slug}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />
      <CaseStudyDetailClient study={study} />
    </>
  )
}
