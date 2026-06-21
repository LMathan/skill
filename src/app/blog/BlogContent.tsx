"use client"

import React, { useState, useMemo } from "react"
import { motion, Variants } from "framer-motion"
import { BookOpen, Search, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { blogData } from "@/data/siteData"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Particles from "@/components/magicui/particles"

export default function BlogContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

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

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <Particles className="absolute inset-0 z-0 opacity-40 pointer-events-none" quantity={60} staticity={50} />

      {/* Glow shapes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Blogs List View */}
        <div>
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6">
              <BookOpen size={12} />
              Knowledge Hub
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white mb-6">
              Insights & <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-500">Tutorial Log</span>
            </h1>
            <p className="text-slate-550 dark:text-slate-400 text-base max-w-2xl mx-auto">
              Step-by-step comparisons, hardware choosing checklists, and machine learning blueprints crafted by our engineering lab design coordinators.
            </p>
          </motion.div>

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
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                layout
                variants={cardVariants}
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
                    <CardDescription className="text-slate-550 dark:text-slate-400 mt-2 text-sm leading-relaxed">
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
                    <Link href={`/blog/${blog.id}`}>
                      <Button
                        className="rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-700 dark:text-white text-xs py-2 px-3 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                      >
                        <span>Read Article</span>
                        <ArrowRight size={12} />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-20 bg-slate-100/50 dark:bg-slate-900/20 border border-slate-200 dark:border-white/5 rounded-3xl max-w-md mx-auto">
              <BookOpen className="mx-auto text-slate-500 mb-4" size={40} />
              <h3 className="text-lg font-bold font-display text-slate-900 dark:text-white mb-2">No Articles Found</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No tutorials match your search query &quot;{searchQuery}&quot;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
