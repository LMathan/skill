"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { BookOpen, Search, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { blogSummaryData } from "@/data/siteData"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"

export default function BlogContent() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as any }
    }
  }

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogSummaryData.forEach(blog => {
      blog.tags.forEach(t => tags.add(t))
    })
    return Array.from(tags)
  }, [])

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogSummaryData.filter(blog => {
      const matchesSearch = 
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesTag = !selectedTag || blog.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })
  }, [searchQuery, selectedTag])

  return (
    <div className="relative min-h-screen bg-white text-slate-900 py-24 px-4 sm:px-6 lg:px-8 select-none text-left">
      
      {/* Glow shapes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-50/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div>
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/40 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-6">
              <BookOpen size={12} />
              {t("blog.badge" as any)}
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 mb-6">
              {t("blog.titlePart1" as any)} <span className="text-gradient">{t("blog.titlePart2" as any)}</span>
            </h1>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
              {t("blog.subtitle" as any)}
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
                placeholder={t("blog.searchPlaceholder" as any)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-5 bg-white border border-slate-200 rounded-2xl w-full text-slate-900 placeholder:text-slate-400 focus-visible:ring-blue-500/50 text-xs"
              />
            </div>

            {/* Tags filters */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`text-[10px] px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                  selectedTag === null
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t("blog.allTags" as any)}
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-[10px] px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                    selectedTag === tag
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
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
                <Card className="h-full bg-white border border-slate-200 rounded-3xl flex flex-col justify-between overflow-hidden transition-all duration-300">
                  <CardHeader className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center gap-1 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        <Clock size={11} />
                        {blog.readTime}
                      </span>
                      <span className="text-[10px] font-semibold tracking-wider text-slate-400">
                        {blog.date}
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold font-display text-slate-900 group-hover:text-blue-650 transition-colors duration-300">
                      {t(`blogArticles.${blog.id}.title` as any) || blog.title}
                    </CardTitle>
                    <CardDescription className="text-slate-500 mt-2 text-xs leading-relaxed">
                      {t(`blogArticles.${blog.id}.summary` as any) || blog.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-6 pt-0">
                    <div className="flex flex-wrap gap-1.5">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] bg-slate-50 border border-slate-200/60 text-slate-500 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 border-t border-slate-100 mt-auto flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-semibold">{t("blog.authorBy" as any)} {blog.author}</span>
                    <Link href={`/blog/${blog.id}`}>
                      <Button
                        className="rounded-xl bg-slate-50 hover:bg-blue-600 hover:text-white border border-slate-100 text-slate-700 text-xs py-2 px-3.5 flex items-center gap-1 group-hover:translate-x-0.5 transition-all cursor-pointer"
                      >
                        <span>{t("blog.readBtn" as any)}</span>
                        <ArrowRight size={12} />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredBlogs.length === 0 && (
            <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-3xl max-w-md mx-auto">
              <BookOpen className="mx-auto text-slate-400 mb-4" size={40} />
              <h3 className="text-lg font-bold font-display text-slate-900 mb-2">{t("blog.noArticlesTitle" as any)}</h3>
              <p className="text-slate-500 text-xs">
                {t("blog.noArticlesDesc" as any)} &quot;{searchQuery}&quot;.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
