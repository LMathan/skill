"use client"

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, Search, User, Calendar, Clock, ArrowLeft, ArrowRight, Tag, MessageSquare, ChevronRight } from "lucide-react"
import { blogData, Blog } from "@/data/siteData"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Particles from "@/components/magicui/particles"
import BorderBeam from "@/components/magicui/border-beam"

export default function BlogContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null)

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogData.forEach(blog => {
      blog.tags.forEach(t => tags.add(t))
    })
    return Array.from(tags)
  }, [])

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogData.filter(blog => {
      const matchesSearch = 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesTag = !selectedTag || blog.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [searchQuery, selectedTag])

  const renderContentWithFormatting = (content: string) => {
    // Basic formatting for titles, points, etc.
    return content.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("###")) {
        return (
        <h3 key={index} className="text-xl font-bold font-display text-slate-900 dark:text-white mt-6 mb-3">
          {paragraph.replace("###", "").trim()}
        </h3>
        )
      }
      if (paragraph.startsWith("* **")) {
        // Bullet list item
        return (
        <ul key={index} className="list-disc pl-5 my-3 text-slate-655 dark:text-slate-350 space-y-1">
          {paragraph.split("\n").map((line, lIdx) => {
            const cleanLine = line.replace(/^\*\s*/, "") // remove leading asterisk
            // Replace **text** with bold tags
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
    if (paragraph.startsWith("*")) {
      return (
        <ul key={index} className="list-disc pl-5 my-3 text-slate-655 dark:text-slate-350 space-y-1">
          {paragraph.split("\n").map((line, lIdx) => (
            <li key={lIdx}>{line.replace(/^\*\s*/, "")}</li>
          ))}
        </ul>
      )
    }
    return (
      <p key={index} className="text-slate-655 dark:text-slate-350 leading-relaxed mb-4 text-base">
        {paragraph}
      </p>
    )
    })
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <Particles className="absolute inset-0 z-0 opacity-40 pointer-events-none" quantity={60} staticity={50} />

      {/* Glow shapes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {activeBlog ? (
            /* Full Blog Read View */
            <motion.div
              key="blog-read"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl p-6 sm:p-10 backdrop-blur-md relative"
            >
              {/* Border Beam decorative effect */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                <BorderBeam duration={12} size={300} />
              </div>

              <button
                onClick={() => setActiveBlog(null)}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors text-sm mb-8"
              >
                <ArrowLeft size={16} />
                Back to Knowledge Hub
              </button>

              <div className="flex flex-wrap gap-2 mb-6">
                {activeBlog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold text-sky-400 tracking-wider uppercase px-2.5 py-1 bg-sky-500/10 border border-sky-500/20 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white mb-6 leading-tight">
                {activeBlog.title}
              </h1>

              {/* Metadata strip */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 border-y border-slate-200 dark:border-white/5 py-4 mb-8">
                <span className="flex items-center gap-1.5">
                  <User size={15} />
                  <span>{activeBlog.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={15} />
                  <span>{activeBlog.date}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={15} />
                  <span>{activeBlog.readTime}</span>
                </span>
              </div>

              {/* Formatted Content */}
              <div className="prose dark:prose-invert max-w-none text-slate-655 dark:text-slate-300">
                {renderContentWithFormatting(activeBlog.content)}
              </div>

              <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-sm font-bold font-display text-slate-900 dark:text-white">Have questions about this article?</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">Our engineers can help implement this in your project.</p>
                </div>
                <Button
                  onClick={() => {
                    // Navigate or scroll to contact
                    window.location.href = `/contact?inquiry=Article Query: ${activeBlog.title}`
                  }}
                  className="rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-xs px-4 py-2"
                >
                  Consult an Engineer
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Blogs List View */
            <motion.div
              key="blog-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6">
                  <BookOpen size={12} />
                  Knowledge Hub
                </div>
                <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white mb-6">
                  Insights & <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-500">Tutorial Log</span>
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl mx-auto">
                  Step-by-step comparisons, hardware choosing checklists, and machine learning blueprints crafted by our engineering lab design coordinators.
                </p>
              </div>

              {/* Toolbar */}
              <div className="space-y-6 mb-12">
                <div className="max-w-xl mx-auto relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                    <Search size={18} />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search technical guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-5 bg-white/80 dark:bg-slate-900/60 backdrop-blur border-slate-200 dark:border-white/10 rounded-2xl w-full text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-550 focus-visible:ring-sky-500/50"
                  />
                </div>

                {/* Tags filters */}
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      selectedTag === null
                        ? "bg-sky-500 border-sky-400 text-white"
                        : "bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    All Tags
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                        selectedTag === tag
                          ? "bg-sky-500 border-sky-400 text-white"
                          : "bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogs.map((blog) => (
                  <motion.div
                    key={blog.id}
                    layout
                    className="group relative"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 backdrop-blur-md rounded-3xl flex flex-col justify-between overflow-hidden hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300">
                      <CardHeader className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                            <Clock size={11} />
                            {blog.readTime}
                          </span>
                          <span className="text-[10px] font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                            {blog.date}
                          </span>
                        </div>
                        <CardTitle className="text-xl font-bold font-display text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors duration-300">
                          {blog.title}
                        </CardTitle>
                        <CardDescription className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                          {blog.summary}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="p-6 pt-0">
                        <div className="flex flex-wrap gap-1.5">
                          {blog.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>

                      <CardFooter className="p-6 pt-0 border-t border-slate-200 dark:border-white/5 mt-auto flex items-center justify-between">
                        <span className="text-xs text-slate-550 dark:text-slate-500 font-medium">By {blog.author}</span>
                        <Button
                          onClick={() => setActiveBlog(blog)}
                          className="rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-700 dark:text-white text-xs py-2 px-3 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                        >
                          <span>Read Article</span>
                          <ArrowRight size={12} />
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredBlogs.length === 0 && (
                <div className="text-center py-20 bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200 dark:border-white/5 rounded-3xl max-w-md mx-auto">
                  <BookOpen className="mx-auto text-slate-500 mb-4" size={40} />
                  <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">No Articles Found</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    No tutorials match your search query &quot;{searchQuery}&quot;.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
