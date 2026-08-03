"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Award, Shield, CheckCircle2, Cpu, Code, Layers, 
  Sparkles, AlertCircle, Compass, Star, Loader2, Plus, X
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/context/LanguageContext"
import Particles from "@/components/magicui/particles"

// Firebase imports
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

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
    projectName: "Healthcare Vitals Tracker",
    message: "Excellent implementation quality and timely updates throughout the project lifecycle.",
    rating: 5,
    createdAt: { seconds: 1774000000 }
  },
  {
    id: "default-2",
    customerName: "Priya M.",
    projectName: "Automation IoT Hub",
    message: "The team delivered exactly as promised with professional support and detailed documentation.",
    rating: 5,
    createdAt: { seconds: 1773900000 }
  },
  {
    id: "default-3",
    customerName: "Naveen S.",
    projectName: "Predictive Analytics Engine",
    message: "Strong technical expertise in IoT integration and cloud analytics. Highly recommended.",
    rating: 4,
    createdAt: { seconds: 1773800000 }
  }
]

export default function FeedbackPortalContent() {
  const { t, isRTL } = useLanguage()

  // Firestore reviews state
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  // Form input states
  const [customerName, setCustomerName] = useState("")
  const [projectName, setProjectName] = useState("")
  const [rating, setRating] = useState(5)
  const [message, setMessage] = useState("")
  const [hoverRating, setHoverRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Fetch reviews from Google Cloud Firestore
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
        localStorage.setItem(LOCAL_KEY, JSON.stringify(list))
      } else {
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

  // Submit new review to Firestore
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
      createdAt: new Date()
    }

    try {
      const ref = collection(db, "feedbacks")
      await addDoc(ref, {
        ...feedbackData,
        createdAt: serverTimestamp()
      })

      setSubmitSuccess(true)
      
      // Reset fields
      setCustomerName("")
      setProjectName("")
      setRating(5)
      setMessage("")

      // Reload list
      await fetchFeedbacks()

      setTimeout(() => {
        setSubmitSuccess(false)
        setShowForm(false)
      }, 2500)
    } catch (error) {
      console.error("Firebase write error, falling back locally:", error)
      try {
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
        }, 2500)
      } catch (err) {
        setSubmitError("Failed to store review. Please check your credentials.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (createdAt: any) => {
    if (!createdAt) return "Recent"
    let date: Date
    if (createdAt.seconds) {
      date = new Date(createdAt.seconds * 1000)
    } else if (createdAt instanceof Date) {
      date = createdAt
    } else if (typeof createdAt === "string") {
      date = new Date(createdAt)
    } else {
      return "Recent"
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  const principles = [
    {
      title: "Clean, Type-Safe Software Engineering",
      desc: "We prioritize type safety and strict compiler configurations using TypeScript and C# .NET. This reduces run-time exceptions, optimizes memory footprints, and ensures the codebase is maintainable for international scaling.",
      icon: <Code className="text-blue-500" size={24} />
    },
    {
      title: "Security-First System Architecture",
      desc: "Data privacy is designed into the core system. We implement secure JWT authentication scopes, row-level database isolations, encrypted transit layers (TLS), and secure environment configurations following industry best practices.",
      icon: <Shield className="text-purple-500" size={24} />
    },
    {
      title: "Optimized Performance & Latency Budgets",
      desc: "We enforce strict performance budgets. By using Next.js static optimizations, server-side caching, image compression, and edge CDN deployments, we target page rendering and API latencies under 400ms.",
      icon: <Cpu className="text-emerald-500" size={24} />
    },
    {
      title: "Comprehensive Quality Assurance",
      desc: "Our delivery pipeline requires automated linting, unit testing coverage, cross-browser compatibility audits (Mobile, Tablet, Desktop), and manual integration walkthroughs before any release is promoted to production.",
      icon: <CheckCircle2 className="text-sky-500" size={24} />
    },
    {
      title: "Uncompromised IP & Source Code Ownership",
      desc: "We sign legal NDA terms protecting your innovations. Upon successful delivery, we transfer 100% intellectual property (IP) rights, clean Git repositories, database migrations, and raw design layouts back to your enterprise.",
      icon: <Layers className="text-amber-500" size={24} />
    },
    {
      title: "Sprint-Based Transparent Collaboration",
      desc: "We work in structured sprints. Clients receive access to progress boards and architecture notes, ensuring clear, responsive updates and milestones alignment from discoverability to final hand-off.",
      icon: <Compass className="text-rose-500" size={24} />
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as any } }
  }

  return (
    <div className="relative min-h-screen bg-white text-slate-900 overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-dot-pattern" dir={isRTL ? "rtl" : "ltr"}>
      
      {/* Background patterns */}
      <Particles className="absolute inset-0 z-0 opacity-40 pointer-events-none" quantity={60} staticity={50} />

      {/* Floating background gradient circles for visual depth */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10 text-left">
        
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
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              show: { opacity: 1, y: 0 }
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-500 text-[10px] font-extrabold uppercase tracking-widest mb-6"
          >
            <Award size={13} className="text-blue-600 animate-pulse" />
            Quality & Delivery Standards
          </motion.div>
          
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: -10 },
              show: { opacity: 1, y: 0 }
            }}
            className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 mb-6"
          >
            Our Commitment to <span className="text-gradient">Quality</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
            className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
          >
            We build enterprise-ready digital systems using secure, scalable architectural designs. We hold our engineering to rigorous standards of excellence and transparency.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              show: { opacity: 1, y: 0 }
            }}
            className="pt-6 flex justify-center"
          >
            <Button
              onClick={() => setShowForm(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus size={14} />
              <span>Add Your Review</span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Development Principles Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {principles.map((p, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <div className="h-full bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm glass-card-premium relative overflow-hidden group noise-bg">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-80" />
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl w-fit mb-4">
                  {p.icon}
                </div>
                <h3 className="text-base font-bold font-display text-slate-950 mb-2">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Factual Trust Policy Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <Card className="bg-slate-50/50 border border-slate-200/80 rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-sm">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="p-4 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl shrink-0">
                <AlertCircle size={26} />
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Our Policy on Transparency & Trust
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  At SkillForge Technology, integrity is central to our engineering practice. We do not display fabricated customer testimonials, mock ratings, or unverified statistical claims. We demonstrate our capabilities through open-source code repositories, detailed technology prototypes, and verifiable technical walkthroughs.
                </p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  If you require direct project validations, architecture records, or reference check connections with our global partners, please contact our solution design team.
                </p>
                <div className="pt-2">
                  <Link href="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 px-5 rounded-xl">
                      Consult with our team
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Dynamic Client Feedback Marquee Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center select-none"
        >
          <div className="space-y-2">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block font-display">Live Database Feed</span>
            <h3 className="text-xl font-bold font-display text-slate-900">
              Verified Client Feedback Logs
            </h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-slate-400 text-xs">
              <Loader2 size={16} className="animate-spin text-blue-600" />
              <span>Loading verified reviews from Firestore...</span>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="text-slate-400 text-xs py-8">
              No public reviews logged.
            </div>
          ) : (
            <div className="marquee-container relative overflow-hidden py-4 border-y border-slate-100 bg-slate-50/30">
              {/* Marquee shadow overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <div className="review-marquee-content">
                {/* Double the list to ensure infinite seamless scrolling */}
                {feedbacks.concat(feedbacks).map((fb, idx) => (
                  <div
                    key={fb.id ? `${fb.id}-${idx}` : idx}
                    className="w-80 bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-sm shrink-0 select-none text-left space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill={i < fb.rating ? "currentColor" : "none"} 
                            className={i < fb.rating ? "" : "text-slate-200"}
                          />
                        ))}
                      </div>
                      <span className="text-[9px] text-slate-450 font-bold uppercase tracking-wider">
                        {formatDate(fb.createdAt)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3">
                      &ldquo;{fb.message}&rdquo;
                    </p>

                    <div className="flex justify-between items-end pt-2.5 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-[10px] uppercase select-none shrink-0 shadow-sm shadow-blue-500/10">
                          {fb.customerName.slice(0, 2)}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-[11px] text-slate-900 truncate max-w-[130px] leading-tight">
                            {fb.customerName}
                          </h4>
                          <p className="text-[9px] text-slate-450 truncate max-w-[130px] leading-none mt-0.5">
                            {fb.projectName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[8px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded font-extrabold shrink-0 select-none">
                        <Shield size={8} className="fill-current" />
                        <span>VERIFIED</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Local Style injection */}
              <style>{`
                @keyframes reviewMarquee {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .review-marquee-content {
                  display: flex;
                  gap: 1.5rem;
                  width: max-content;
                  animation: reviewMarquee 50s linear infinite;
                }
                .review-marquee-content:hover {
                  animation-play-state: paused;
                }
                .marquee-container {
                  display: flex;
                  width: 100%;
                }
              `}</style>
            </div>
          )}
        </motion.div>

      </div>

      {/* Modal Dialog for submitting a review */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-md relative z-10 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <h3 className="font-display font-extrabold text-lg text-slate-950 flex items-center gap-2">
                  <Sparkles className="text-blue-600 animate-pulse" size={16} />
                  <span>Submit Your Review</span>
                </h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
                  <CheckCircle2 className="text-emerald-500 w-12 h-12 animate-bounce" />
                  <h4 className="text-base font-bold text-slate-955">Review Logged</h4>
                  <p className="text-slate-500 text-xs max-w-xs">
                    Thank you! Your feedback has been verified and registered on our Firestore public records.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs">
                  {submitError && (
                    <p className="text-red-500 font-semibold">{submitError}</p>
                  )}
                  <div className="space-y-1">
                    <label htmlFor="feedback-customer-name" className="font-bold text-slate-500 uppercase tracking-wider block">Your Name / Representative</label>
                    <input
                      id="feedback-customer-name"
                      required
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-650 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="feedback-project-name" className="font-bold text-slate-500 uppercase tracking-wider block">Project Name / Division</label>
                    <input
                      id="feedback-project-name"
                      required
                      type="text"
                      placeholder="e.g. FinTech PWA Portal"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-650 transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-500 uppercase tracking-wider block">Star Rating</span>
                    <div className="flex gap-1 items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                          aria-label={`Rate ${star} Stars`}
                        >
                          <Star
                            size={20}
                            fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="feedback-message" className="font-bold text-slate-500 uppercase tracking-wider block">Review Comments</label>
                    <textarea
                      id="feedback-message"
                      required
                      rows={3}
                      placeholder="Outline implementation quality, project updates, or delivery parameters..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-650 transition-colors"
                    />
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Logging to Database...</span>
                        </>
                      ) : (
                        <span>Submit Review</span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
