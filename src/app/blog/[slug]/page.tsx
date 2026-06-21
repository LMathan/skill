import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Calendar, Clock } from "lucide-react"
import { blogData } from "@/data/siteData"
import { Button } from "@/components/ui/button"
import Particles from "@/components/magicui/particles"
import BorderBeam from "@/components/magicui/border-beam"

// Precompile pages at build time
export async function generateStaticParams() {
  return blogData.map((blog) => ({
    slug: blog.id
  }))
}

// Dynamic Meta Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const blog = blogData.find((b) => b.id === slug)
  if (!blog) return notFound()

  return {
    title: `${blog.title} | SkillForge Technology Blog`,
    description: blog.summary,
    keywords: blog.tags,
    alternates: {
      canonical: `/blog/${slug}`
    }
  }
}

function renderContentWithFormatting(content: string) {
  return content.split("\n\n").map((paragraph, index) => {
    if (paragraph.startsWith("###")) {
      return (
        <h3 key={index} className="text-2xl font-bold font-display text-slate-900 dark:text-white mt-8 mb-4">
          {paragraph.replace("###", "").trim()}
        </h3>
      )
    }
    if (paragraph.startsWith("####")) {
      return (
        <h4 key={index} className="text-lg font-bold font-display text-slate-900 dark:text-white mt-6 mb-3">
          {paragraph.replace("####", "").trim()}
        </h4>
      )
    }
    
    // Check if it's a code block
    if (paragraph.startsWith("```")) {
      const codeLines = paragraph.split("\n");
      const codeString = codeLines.slice(1, -1).join("\n");
      return (
        <pre key={index} className="bg-slate-900 dark:bg-slate-950/85 border border-slate-200 dark:border-white/5 p-4 rounded-xl my-6 overflow-x-auto text-xs sm:text-sm font-mono text-cyan-400">
          <code>{codeString}</code>
        </pre>
      )
    }

    if (paragraph.startsWith("* **") || paragraph.startsWith("*")) {
      return (
        <ul key={index} className="list-disc pl-6 my-4 text-slate-700 dark:text-slate-300 space-y-2">
          {paragraph.split("\n").map((line, lIdx) => {
            const cleanLine = line.replace(/^\*\s*/, "") // remove leading asterisk
            const boldMatch = cleanLine.match(/\*\*(.*?)\*\*(.*)/)
            if (boldMatch) {
              return (
                <li key={lIdx}>
                  <strong>{boldMatch[1]}</strong>
                  {boldMatch[2]}
                </li>
              )
            }
            return <li key={lIdx}>{cleanLine}</li>
          })}
        </ul>
      )
    }
    return (
      <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-base">
        {paragraph}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = blogData.find((b) => b.id === slug)
  if (!blog) return notFound()

  // Generate Schema markup (BlogPosting)
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.summary,
    "author": {
      "@type": "Person",
      "name": blog.author
    },
    "datePublished": blog.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://skillforgetechnology.app/blog/${slug}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "SkillForge Technology",
      "logo": {
        "@type": "ImageObject",
        "url": "https://skillforgetechnology.app/logo.png"
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <Particles className="absolute inset-0 z-0 opacity-40 pointer-events-none" quantity={60} staticity={50} />

      {/* Glow shapes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 sm:p-10 backdrop-blur-md relative shadow-xl">
          {/* Border Beam decorative effect */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
            <BorderBeam duration={12} size={300} colorFrom="#06b6d4" colorTo="#3b82f6" />
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors text-sm mb-8"
          >
            <ArrowLeft size={16} />
            Back to Knowledge Hub
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold text-sky-400 tracking-wider uppercase px-2.5 py-1 bg-sky-500/10 border border-sky-500/20 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Metadata strip */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 border-y border-slate-200 dark:border-white/5 py-4 mb-8">
            <span className="flex items-center gap-1.5">
              <User size={15} />
              <span>{blog.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              <span>{blog.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={15} />
              <span>{blog.readTime}</span>
            </span>
          </div>

          {/* Formatted Content */}
          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
            {renderContentWithFormatting(blog.content)}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">Have questions about this article?</h4>
              <p className="text-slate-550 dark:text-slate-400 text-xs mt-1">Our engineers can help implement this in your project.</p>
            </div>
            <Link href={`/contact?inquiry=Article Query: ${encodeURIComponent(blog.title)}`}>
              <Button
                className="rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-xs px-4 py-2"
              >
                Consult an Engineer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
