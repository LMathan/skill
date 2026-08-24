import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, User, Calendar, Clock } from "lucide-react"
import { blogData } from "@/data/siteData"
import { Button } from "@/components/ui/button"
import { getSeoMetadata } from "@/lib/seo"

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

  return getSeoMetadata({
    title: `${blog.title} | SkillForge Technologies Insights`,
    description: blog.summary,
    keywords: blog.tags,
    path: `/blog/${slug}`
  })
}

function renderContentWithFormatting(content: string) {
  return content.split("\n\n").map((paragraph, index) => {
    if (paragraph.startsWith("###")) {
      return (
        <h3 key={index} className="text-xl font-bold font-display text-slate-950 mt-8 mb-4">
          {paragraph.replace("###", "").trim()}
        </h3>
      )
    }
    if (paragraph.startsWith("####")) {
      return (
        <h4 key={index} className="text-base font-bold font-display text-slate-955 mt-6 mb-3">
          {paragraph.replace("####", "").trim()}
        </h4>
      )
    }
    
    // Check if it's a code block
    if (paragraph.startsWith("```")) {
      const codeLines = paragraph.split("\n");
      const codeString = codeLines.slice(1, -1).join("\n");
      return (
        <pre key={index} className="bg-slate-950 border border-slate-800 p-4 rounded-xl my-6 overflow-x-auto text-xs sm:text-sm font-mono text-cyan-400">
          <code>{codeString}</code>
        </pre>
      )
    }

    if (paragraph.startsWith("* **") || paragraph.startsWith("*")) {
      return (
        <ul key={index} className="list-disc pl-6 my-4 text-slate-650 space-y-2 text-xs sm:text-sm">
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
      <p key={index} className="text-slate-650 leading-relaxed mb-4 text-xs sm:text-sm">
        {paragraph}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const blog = blogData.find((b) => b.id === slug)
  if (!blog) return notFound()

  // Find related articles (excluding the current one)
  const relatedBlogs = blogData.filter((b) => b.id !== slug).slice(0, 2)

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
      "name": "SkillForge Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://skillforgetechnology.app/logo.png"
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-white text-slate-900 py-24 px-4 sm:px-6 lg:px-8 text-left select-none">
      
      {/* Glow shapes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-50/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Structured Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 relative shadow-xl">
          
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-xs mb-8 font-semibold"
          >
            <ArrowLeft size={14} />
            Back to Insights
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-extrabold text-blue-650 tracking-wider uppercase px-2.5 py-1 bg-blue-50/40 border border-blue-100 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold font-display text-slate-950 mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Metadata strip */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-450 border-y border-slate-100 py-4 mb-8 font-semibold">
            <span className="flex items-center gap-1.5">
              <User size={13} className="text-slate-450" />
              <span>{blog.author}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-slate-450" />
              <span>{blog.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-slate-450" />
              <span>{blog.readTime}</span>
            </span>
          </div>

          {/* Formatted Content */}
          <div className="prose max-w-none text-slate-700">
            {renderContentWithFormatting(blog.content)}
          </div>

          {/* Related Articles & Services Links */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="text-sm font-bold font-display text-slate-900 mb-4">Related Technical Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedBlogs.map((rBlog) => (
                <Link
                  key={rBlog.id}
                  href={`/blog/${rBlog.id}`}
                  className="p-4 rounded-xl border border-slate-205 bg-slate-50/30 hover:bg-slate-50 transition-all text-left block"
                >
                  <h4 className="text-xs font-bold font-display text-slate-900 line-clamp-1 mb-1">{rBlog.title}</h4>
                  <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{rBlog.summary}</p>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 p-4 rounded-xl bg-blue-50/30 border border-blue-100 text-left">
              <span className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                Looking to build an enterprise platform or implement custom AI systems? Explore our specialized <Link href="/services" className="font-bold text-blue-650 hover:underline transition-colors">Engineering Services</Link> or browse our complete <Link href="/portfolio" className="font-bold text-blue-650 hover:underline transition-colors">Case Portfolio</Link>.
              </span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-xs font-bold font-display text-slate-900">Have questions about this article?</h4>
              <p className="text-slate-450 text-[10px] mt-1 font-semibold">Our solutions architects can help design implementations.</p>
            </div>
            <Link href={`/contact?inquiry=Article Query: ${encodeURIComponent(blog.title)}`}>
              <Button
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 cursor-pointer"
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
