import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Sparkles, ArrowRight, CheckCircle, Cpu, Brain, Award, ShieldAlert, GraduationCap, MapPin } from "lucide-react"
import LocalLandingClient from "@/app/[slug]/LocalLandingClient"
import { projectsData } from "@/data/siteData"
import { seoPagesContent, SEOPageData } from "@/data/seoLandingData"

// Precompile pages at build time
export async function generateStaticParams() {
  return Object.keys(seoPagesContent).map((slug) => ({
    slug: slug
  }))
}

// Dynamic Meta Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const content = seoPagesContent[slug]
  if (!content) return notFound()

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: `/${slug}`
    }
  }
}

export default async function SEOPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const content = seoPagesContent[slug]
  if (!content) return notFound()

  // Generate Schemas (FAQ & Breadcrumb)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://skillforgetechnology.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": content.category || "Service",
        "item": `https://skillforgetechnology.app/${slug}`
      }
    ]
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": content.h1,
    "description": content.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "SkillForge Technology",
      "telephone": "+919345518760",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Perundurai Road",
        "addressLocality": "Erode",
        "addressRegion": "Tamil Nadu",
        "postalCode": "638052",
        "addressCountry": "IN"
      }
    },
    "areaServed": [
      {
        "@type": "City",
        "name": content.city
      }
    ]
  }

  const listSchema = [faqSchema, breadcrumbSchema, serviceSchema]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      <LocalLandingClient content={content} slug={slug} />
    </>
  )
}
