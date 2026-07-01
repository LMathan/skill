import React from "react"
import Link from "next/link"
import { Metadata } from "next"

interface SeoOptions {
  title?: string
  description?: string
  path: string
  keywords?: string[]
}

/**
 * Shared Open Graph image used across all pages.
 * Defined once here so that every page carries the full OG image shape.
 *
 * Why: Next.js App Router replaces nested objects (openGraph, twitter) entirely
 * when a page exports metadata — it does NOT deep-merge them with the root
 * layout. Any field absent from the page's object is therefore missing from the
 * final HTML. Baking the image here ensures og:image, og:image:width,
 * og:image:height, og:image:alt, and twitter:image are always emitted.
 */
const OG_IMAGE = {
  url: "https://skillforgetechnology.app/og-image.png",
  width: 1200,
  height: 630,
  alt: "SkillForge Technology",
}

/**
 * Generates page-specific metadata with proper canonical alternates.
 * Works seamlessly with Next.js metadataBase defined in the root layout.
 *
 * @param options Page SEO configuration options.
 * @returns Metadata object for Next.js Page components.
 */
export function getSeoMetadata(options: SeoOptions): Metadata {
  const { title, description, path, keywords } = options

  // Normalize the canonical path (ensuring it starts with /)
  const cleanPath = path.startsWith("/") ? path : `/${path}`

  return {
    title,
    description,
    ...(keywords && { keywords }),
    alternates: {
      canonical: cleanPath,
    },
    /**
     * Why the full shape is required here:
     * Next.js replaces the entire openGraph object from layout.tsx with this
     * object, so every required field must be present. Omitting `images`,
     * `siteName`, `locale`, or `type` means those meta tags will not be
     * rendered — breaking Facebook, LinkedIn, WhatsApp, and Discord previews.
     */
    openGraph: {
      title: title || undefined,
      description: description || undefined,
      url: cleanPath,
      siteName: "SkillForge Technology",
      locale: "en_US",
      type: "website",
      images: [OG_IMAGE],
    },
    /**
     * Why the full shape is required here:
     * Same reason as openGraph — twitter is also replaced entirely.
     * Without `card` and `images`, Twitter/X falls back to a plain link
     * with no preview card and no image.
     */
    twitter: {
      card: "summary_large_image",
      title: title || undefined,
      description: description || undefined,
      images: [OG_IMAGE.url],
    },
  }
}

/**
 * Parses simple markdown links like [Text](/url) and returns React elements.
 */
export function renderTextWithLinks(text: string): React.ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    const [, linkText, linkUrl] = match
    const matchIndex = match.index

    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex))
    }

    parts.push(
      React.createElement(
        Link,
        {
          key: matchIndex,
          href: linkUrl,
          className: "text-brand-cyan hover:text-brand-blue underline transition-colors"
        },
        linkText
      )
    )

    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts.length > 0 ? parts : text
}
