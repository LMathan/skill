import fs from "fs"
import path from "path"
import { notFound } from "next/navigation"
import ServiceDetailClient from "./ServiceDetailClient"
import { agencyServices } from "@/data/agencyData"
import { galleryData } from "@/data/galleryData"
import { Metadata } from "next"
import { getSeoMetadata } from "@/lib/seo"

// Targeted SEO keywords for offshore & enterprise search queries
const serviceKeywords: Record<string, string[]> = {
  "software-development": [
    "custom software development",
    "enterprise software engineering",
    "offshore software development",
    "outsourced product development",
    "custom ERP CRM developers",
    "API microservices development",
    "Next.js Go developers",
    "hire software developers"
  ],
  "enterprise-development": [
    "enterprise software development",
    "legacy platform migration",
    "high-throughput transaction engines",
    "corporate software engineering",
    "SSO AD active directory integration",
    "ISO 27001 data security compliance",
    "custom middleware development"
  ],
  "saas-development": [
    "SaaS product engineering",
    "multi tenant software architecture",
    "Stripe subscription integration",
    "SaaS app developers",
    "analytical dashboard design",
    "usage based billing development"
  ],
  "web-development": [
    "custom web development company",
    "Next.js react web applications",
    "headless CMS architecture",
    "Vercel enterprise deployments",
    "responsive web app design",
    "secure corporate portal development"
  ],
  "mobile-development": [
    "cross platform mobile development",
    "Flutter app developers",
    "React Native app development",
    "iOS Android application design",
    "enterprise mobile apps",
    "hybrid mobile app development"
  ],
  "flutter-development": [
    "Flutter application development",
    "cross platform mobile engineers",
    "hire Flutter developers",
    "Flutter tablet mobile apps",
    "Flutter UI UX design",
    "Flutter web app integration"
  ],
  "react-development": [
    "ReactJS development services",
    "Next.js React web developer",
    "React component library design",
    "single page application SPA",
    "hire React developer",
    "custom React frontend"
  ],
  "wordpress-development": [
    "custom WordPress developer",
    "WooCommerce store engineering",
    "headless WordPress Next.js",
    "WordPress performance speed audit",
    "corporate WordPress theme"
  ],
  "php-development": [
    "custom PHP development",
    "Laravel backend development",
    "Laravel API microservices",
    "PHP database developer",
    "legacy PHP code migration"
  ],
  "dotnet-development": [
    "ASP.NET Core development",
    "C# enterprise applications",
    "Azure cloud solutions C#",
    "WCF to gRPC migration",
    "C# REST API microservices"
  ],
  "ui-ux-design": [
    "premium UI UX design",
    "SaaS dashboard product design",
    "wireframing figma mockup agency",
    "user experience optimization",
    "mobile app interface design"
  ],
  "ai-solutions": [
    "custom AI agent development",
    "LLM model orchestration",
    "LangChain Python developer",
    "OpenAI API cloud integration",
    "automated chatbot deployment"
  ],
  "cloud-devops": [
    "cloud migration services",
    "Kubernetes Docker setup",
    "CI CD pipeline automated deploy",
    "AWS Google Cloud Azure architect",
    "database cluster migration"
  ],
  "seo-marketing": [
    "technical SEO optimization",
    "SEO audit for SaaS software",
    "international search marketing",
    "Google ranking optimization",
    "organic search visibility growth"
  ],
  "iot-embedded": [
    "industrial IoT hardware",
    "custom firmware developer",
    "ESP32 STM32 circuit board design",
    "MQTT LoRa protocol engineering",
    "PCB design prototype manufacturing",
    "real time embedded C C++ code"
  ],
  "real-estate-creative": [
    "real estate digital platform",
    "3D property render showcase",
    "real estate portal development",
    "custom property listing CRM",
    "real estate website designs"
  ]
}

// Precompile pages at build time
export async function generateStaticParams() {
  return agencyServices.map((service) => ({
    slug: service.slug
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = agencyServices.find((s) => s.slug === slug)
  if (!service) return notFound()

  if (slug === "real-estate-creative") {
    return getSeoMetadata({
      title: "Professional Real Estate Photo Editing Services | HDR, Virtual Staging & Image Retouching",
      description: "Professional Real Estate Photo Editing Services with HDR blending, sky replacement, virtual staging, object removal, color correction, and fast turnaround. Get your free sample today.",
      keywords: [
        "Real Estate Photo Editing Services",
        "Real Estate Image Editing",
        "HDR Real Estate Photo Editing",
        "Property Photo Editing",
        "Real Estate Photoshop Editing",
        "Real Estate Photo Retouching",
        "Professional Real Estate Editing",
        "Real Estate Editing Company",
        "Real Estate Photo Enhancement",
        "Real Estate Photography Editing",
        "Sky Replacement",
        "Virtual Staging",
        "Virtual Twilight",
        "Object Removal",
        "Lawn Enhancement",
        "Window Masking",
        "Perspective Correction",
        "Color Correction",
        "HDR Blending",
        "Real Estate Floor Plan",
        "Furniture Removal",
        "TV Screen Replacement",
        "Image Retouching",
        "Property Image Enhancement",
        "Best Real Estate Photo Editing Company",
        "Affordable Real Estate Photo Editing",
        "Outsource Real Estate Photo Editing",
        "24 Hour Real Estate Editing Service",
        "Professional HDR Photo Editing",
        "Real Estate Photo Editing for Photographers",
        "Photo Editing for Realtors",
        "Real Estate Image Enhancement Service",
        "Virtual Staging Company",
        "Real Estate Editing Outsourcing"
      ],
      path: `/services/${slug}`
    })
  }

  return getSeoMetadata({
    title: `${service.title} Solutions | SkillForge Technology`,
    description: service.longDesc,
    keywords: serviceKeywords[slug] || [],
    path: `/services/${slug}`
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = agencyServices.find((s) => s.slug === slug)
  if (!service) return notFound()

  // Map the service slug to its matching folder in public/gallery/
  const folderName = slug === "iot-embedded" ? "iot" : slug
  const galleryDir = path.join(process.cwd(), "public", "gallery", folderName)
  let localImages: string[] = []
  
  try {
    if (fs.existsSync(galleryDir)) {
      localImages = fs.readdirSync(galleryDir)
        .filter(file => /\.(png|jpe?g|gif|webp|svg)$/i.test(file) && !file.startsWith("."))
        .map(file => `/gallery/${folderName}/${file}`)
    }
  } catch (err) {
    console.error("Error reading service gallery dir:", err)
  }

  // Fallback to static gallery data matching this service if no local folder images exist
  const servicePath = `/services/${slug}`
  const fallbackImages = galleryData
    .filter(item => item.relatedService === servicePath)
    .map(item => item.src)

  const allImages = localImages.length > 0 ? localImages : fallbackImages

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.title} Solutions`,
    "description": service.longDesc,
    "provider": {
      "@type": "Organization",
      "name": "SkillForge Technology",
      "url": "https://skillforgetechnology.app",
      "logo": "https://skillforgetechnology.app/logo.png"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Worldwide"
    },
    "serviceType": "Software Engineering & Digital Transformation"
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <ServiceDetailClient service={service} localImages={allImages} />
    </>
  )
}
