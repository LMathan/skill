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
    openGraph: {
      title: title || undefined,
      description: description || undefined,
      url: cleanPath,
    },
    twitter: {
      title: title || undefined,
      description: description || undefined,
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
    const [_, linkText, linkUrl] = match
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
