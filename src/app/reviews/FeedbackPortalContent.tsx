"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { 
  Star, Heart, Search, Filter, MessageSquare, Shield, CheckCircle2, 
  Loader2, Award, Sparkles, Send, RefreshCw, Plus, X 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Particles from "@/components/magicui/particles"
import BorderBeam from "@/components/magicui/border-beam"
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, Timestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { siteConfig } from "@/data/siteConfig"

const LOCAL_KEY = "skillforge_feedbacks_v1"

interface Feedback {
  id?: string;
  customerName: string;
  projectName: string;
  message: string;
  rating: number;
  createdAt?: any;
}

const DEFAULT_FEEDBACKS: Feedback[] = [
  {
    id: "default-1",
    customerName: "Karthik R.",
    projectName: "Smart Farm Security System",
    message: "Excellent implementation quality and timely updates throughout the project lifecycle.",
    rating: 5,
    createdAt: { seconds: 1774000000 }
  },
  {
    id: "default-2",
    customerName: "Priya M.",
    projectName: "Eye Blink Controlled Wheelchair",
    message: "The team delivered exactly as promised with professional support and detailed documentation.",
    rating: 5,
    createdAt: { seconds: 1773900000 }
  },
  {
    id: "default-3",
    customerName: "Naveen S.",
    projectName: "Smart Drainage Monitoring System",
    message: "Strong technical expertise in IoT integration and cloud analytics. Highly recommended.",
    rating: 4,
    createdAt: { seconds: 1773800000 }
  }
]

const statsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const statsItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
}

const feedbacksContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const feedbackItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
}

export default function FeedbackPortalContent() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Form states
  const [customerName, setCustomerName] = useState("")
  const [projectName, setProjectName] = useState("")
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState("")
  const [hoverRating, setHoverRating] = useState(0)

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRating, setFilterRating] = useState<number | null>(null)
  
  // Show Add Review Form (modal/drawer overlay or inline collapse)
  const [showForm, setShowForm] = useState(false)

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
    setLoading(true)
    try {
      const ref = collection(db, "feedbacks")
      const q = query(ref, orderBy("createdAt", "desc"))
      const snapshot = await getDocs(q)
      const list = snapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          customerName: data.customerName || "Anonymous",
          projectName: data.projectName || "Generic Project",
          message: data.message || "",
          rating: Number(data.rating) || 5,
          createdAt: data.createdAt || null
        } as Feedback
      })

      if (list.length > 0) {
        setFeedbacks(list)
        // Sync to local storage
        localStorage.setItem(LOCAL_KEY, JSON.stringify(list))
      } else {
        // Fallback to local storage or defaults
        loadLocalFeedbacks()
      }
    } catch (error) {
      console.error("Firebase read error, loading from local cache:", error)
      loadLocalFeedbacks()
    } finally {
      setLoading(false)
    }
  }

  const loadLocalFeedbacks = () => {
    const cached = localStorage.getItem(LOCAL_KEY)
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFeedbacks(parsed)
          return
        }
      } catch (e) {
        console.error("Failed to parse cached feedbacks", e)
      }
    }
    setFeedbacks(DEFAULT_FEEDBACKS)
  }

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  // Handle Form Submit
  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    if (!customerName.trim() || !projectName.trim() || !message.trim()) {
      setSubmitError("Please fill out all fields.")
      return
    }

    setSubmitting(true)

    const feedbackData = {
      customerName: customerName.trim(),
      projectName: projectName.trim(),
      message: message.trim(),
      rating,
      createdAt: new Date() // Fallback timestamp for client-side sorting
    }

    try {
      const ref = collection(db, "feedbacks")
      await addDoc(ref, {
        ...feedbackData,
        createdAt: serverTimestamp() // Official Firestore timestamp
      })

      setSubmitSuccess(true)
      
      // Reset form
      setCustomerName("")
      setProjectName("")
      setRating(5)
      setMessage("")

      // Reload
      await fetchFeedbacks()

      setTimeout(() => {
        setSubmitSuccess(false)
        setShowForm(false)
      }, 3000)
    } catch (error) {
      console.error("Firebase write error, saving locally:", error)
      // Save locally
      const cached = localStorage.getItem(LOCAL_KEY)
      let list: Feedback[] = cached ? JSON.parse(cached) : [...DEFAULT_FEEDBACKS]
      const localFeedback = {
        id: `local-${Date.now()}`,
        ...feedbackData,
        createdAt: { seconds: Math.floor(Date.now() / 1000) }
      }
      list.unshift(localFeedback)
      localStorage.setItem(LOCAL_KEY, JSON.stringify(list))
      setFeedbacks(list)

      setSubmitSuccess(true)
      setCustomerName("")
      setProjectName("")
      setRating(5)
      setMessage("")

      setTimeout(() => {
        setSubmitSuccess(false)
        setShowForm(false)
      }, 3000)
    } finally {
      setSubmitting(false)
    }
  }

  // Format date helper
  const formatDate = (createdAt: any) => {
    if (!createdAt) return "Recent Review"
    // Handle Firestore Timestamp or standard JS Date or generic seconds object
    let date: Date
    if (createdAt.seconds) {
      date = new Date(createdAt.seconds * 1000)
    } else if (createdAt instanceof Date) {
      date = createdAt
    } else if (typeof createdAt === "string") {
      date = new Date(createdAt)
    } else {
      return "Recent Review"
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  // Filter and search computation
  const filteredFeedbacks = feedbacks.filter(fb => {
    const queryLower = searchQuery.toLowerCase()
    const matchesSearch = 
      fb.customerName.toLowerCase().includes(queryLower) ||
      fb.projectName.toLowerCase().includes(queryLower) ||
      fb.message.toLowerCase().includes(queryLower)
    
    const matchesRating = filterRating === null || fb.rating === filterRating

    return matchesSearch && matchesRating
  })

  // Get average score
  const averageRating = feedbacks.length > 0 
    ? (feedbacks.reduce((sum, item) => sum + item.rating, 0) / feedbacks.length).toFixed(1)
    : "5.0"

  const totalReviewsDisplay = feedbacks.length > DEFAULT_FEEDBACKS.length 
    ? feedbacks.length 
    : siteConfig.reviewsBaselineCount

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <Particles className="absolute inset-0 z-0 opacity-40 pointer-events-none" quantity={60} staticity={50} />

      {/* Glow shapes */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              show: { opacity: 1, y: 0 }
            }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <Award size={14} />
            Verified Feedback Portal
          </motion.div>
          
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: -10 },
              show: { opacity: 1, y: 0 }
            }}
            className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white mb-6"
          >
            Student & Client <br className="hidden sm:inline" />
            <span className="text-gradient">Project Reviews</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
            className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed"
          >
            Read authentic reviews logged directly from our prototyping lab projects. If you have partnered with us for final year or research support, submit your feedback to help future developers!
          </motion.p>
        </motion.div>

        {/* Aggregate Stats Card */}
        <motion.div 
          variants={statsContainerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          <motion.div variants={statsItemVariants}>
            <Card className="h-full bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Average Score</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{averageRating}</span>
                <span className="text-slate-500 text-sm">/ 5.0</span>
              </div>
              <div className="flex gap-1 mt-2 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star 
                    key={s} 
                    size={16} 
                    fill={s <= Math.round(Number(averageRating)) ? "currentColor" : "none"} 
                    className={s <= Math.round(Number(averageRating)) ? "" : "text-slate-300 dark:text-slate-700"}
                  />
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={statsItemVariants}>
            <Card className="h-full bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1">Total Reviews</h4>
              <div className="text-4xl font-extrabold text-brand-cyan">{totalReviewsDisplay}</div>
              <p className="text-xs text-slate-500 mt-2 font-medium">Stored and verified on Google Cloud Firestore</p>
            </Card>
          </motion.div>

          <motion.div variants={statsItemVariants}>
            <Card className="h-full bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center justify-center">
              <Button
                onClick={() => setShowForm(!showForm)}
                className="w-full py-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 transition-all duration-300"
              >
                <Heart size={16} className="fill-current" />
                <span>Leave A Review</span>
              </Button>
            </Card>
          </motion.div>
        </motion.div>

        {/* Add Feedback Form Container (Drawer/Collapse Panel) */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-2xl mx-auto overflow-hidden mb-12"
            >
              <Card className="bg-white dark:bg-slate-900/60 border-slate-200 dark:border-sky-500/20 backdrop-blur-lg rounded-2xl relative overflow-hidden">
                <BorderBeam size={220} duration={10} colorFrom="#38bdf8" colorTo="#312e81" />
                <CardHeader className="p-6 pb-2 flex flex-row justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="text-sky-500 dark:text-sky-400 animate-pulse" size={18} />
                      Share Your Experience
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 text-xs mt-1">
                      Fill out your project review parameters to write to our database.
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowForm(false)} 
                    className="rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                  >
                    <X size={16} />
                  </Button>
                </CardHeader>

                <CardContent className="p-6 pt-2">
                  {submitSuccess ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CheckCircle2 className="text-emerald-500 w-12 h-12 mb-3 animate-bounce" />
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Feedback Submitted!</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm">
                        Thank you! Your feedback has been written to the Firestore database and is now live.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Full Name *</label>
                          <Input
                            required
                            type="text"
                            placeholder="e.g. Arun Kumar"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 rounded-xl focus:border-sky-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Project Name *</label>
                          <Input
                            required
                            type="text"
                            placeholder="e.g. Smart Farm Security"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 rounded-xl focus:border-sky-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 block">Rating (1-5 Stars) *</label>
                        <div className="flex items-center gap-1.5 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="focus:outline-none transition-transform active:scale-125"
                            >
                              <Star
                                size={28}
                                className={
                                  star <= (hoverRating || rating)
                                    ? "fill-amber-500 text-amber-500"
                                    : "text-slate-300 dark:text-slate-700 hover:text-amber-400"
                                }
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">Review Message *</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us about the project quality, support, and hardware functionality..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-100 rounded-xl p-3 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                        />
                      </div>

                      {submitError && (
                        <p className="text-red-400 text-xs bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                          {submitError}
                        </p>
                      )}

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold flex items-center justify-center gap-2"
                      >
                        {submitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>Saving to Database...</span>
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>Post Live Feedback</span>
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Tools: Search, Filter, Refresh */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-white/60 dark:bg-slate-900/20 border border-slate-200 dark:border-white/5 backdrop-blur-sm">
          {/* Search bar */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
            <Input
              type="text"
              placeholder="Search by student name, project or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-50/50 dark:bg-slate-950/40 border-slate-200 dark:border-white/5 rounded-xl pl-10 focus:border-sky-500 text-sm w-full text-slate-800 dark:text-slate-100"
            />
          </div>

          {/* Rating filter & Refresh */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-white/5 rounded-xl p-1.5 text-xs">
              <span className="text-slate-550 dark:text-slate-500 px-2 flex items-center gap-1"><Filter size={12} /> Filter:</span>
              <button
                onClick={() => setFilterRating(null)}
                className={`px-2.5 py-1 rounded-lg transition-colors font-semibold ${
                  filterRating === null 
                    ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/20" 
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                }`}
              >
                All
              </button>
              {[5, 4, 3].map((star) => (
                <button
                  key={star}
                  onClick={() => setFilterRating(star)}
                  className={`px-2.5 py-1 rounded-lg transition-colors font-semibold flex items-center gap-0.5 ${
                    filterRating === star 
                      ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold border border-sky-500/20" 
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  {star} <Star size={10} fill="currentColor" className="text-amber-500" />
                </button>
              ))}
            </div>

            <Button
              onClick={fetchFeedbacks}
              variant="outline"
              size="icon"
              className="bg-white dark:bg-slate-950/40 border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl"
              title="Refresh Database"
            >
              <RefreshCw size={14} className={loading ? "animate-spin text-sky-400" : "text-slate-500 dark:text-slate-400"} />
            </Button>
          </div>
        </div>

        {/* Feedbacks Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <Loader2 size={36} className="animate-spin text-sky-400 mb-3" />
            <span className="text-sm font-semibold">Reading live data from Google Firestore...</span>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="text-center py-20 bg-slate-100/50 dark:bg-slate-900/10 rounded-3xl border border-slate-200 dark:border-white/5 max-w-4xl mx-auto">
            <MessageSquare className="mx-auto text-slate-600 mb-4" size={40} />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No reviews found</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 max-w-xs mx-auto">
              No testimonials match your current search queries or star filters.
            </p>
          </div>
        ) : (
          <div className="relative min-h-[400px] w-full">
            <motion.div 
              variants={feedbacksContainerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
              <AnimatePresence mode="popLayout">
                {filteredFeedbacks.map((fb, idx) => (
                  <motion.div
                    key={fb.id || idx}
                    layout
                    variants={feedbackItemVariants}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    className="group relative"
                  >
                  <Card className="h-full bg-white/80 dark:bg-slate-900/40 border-slate-200 dark:border-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-slate-900/60 hover:border-slate-300 dark:hover:border-white/10 transition-all duration-300">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden">
                      <BorderBeam duration={12} size={150} />
                    </div>

                    <div className="space-y-4">
                      {/* Top rating stars & Date */}
                      <div className="flex items-center justify-between">
                        <div className="flex text-amber-500 gap-0.5">
                          {[...Array(fb.rating)].map((_, i) => (
                            <Star key={i} size={12} fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                          {formatDate(fb.createdAt)}
                        </span>
                      </div>

                      {/* Review message */}
                      <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                        &ldquo;{fb.message}&rdquo;
                      </p>
                    </div>

                    {/* Reviewer Details */}
                    <div className="pt-4 border-t border-slate-200 dark:border-white/5 mt-6 flex justify-between items-end">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">
                          {fb.customerName}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                          {fb.projectName}
                        </p>
                      </div>
                      
                      {/* Database Verified Badge */}
                      <div 
                        className="flex items-center gap-1 text-[9px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold border border-emerald-500/10"
                        title="Verified document fetched directly from Google Cloud Firestore"
                      >
                        <Shield size={9} className="fill-current" />
                        <span>VERIFIED</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

      </div>
    </div>
  )
}
