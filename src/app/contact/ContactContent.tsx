"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Star, CheckCircle2, Loader2, Sparkles, Clock, MessageSquare, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useLanguage } from "@/context/LanguageContext"

function ContactContentInner() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("inquiry")

  // Inquiry Form State
  const [inqName, setInqName] = useState("")
  const [inqEmail, setInqEmail] = useState("")
  const [inqPhone, setInqPhone] = useState("")
  const [inqSubject, setInqSubject] = useState("Software Development")
  const [inqMessage, setInqMessage] = useState("")
  const [inqStatus, setInqStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  // Testimonial Form State
  const [testName, setTestName] = useState("")
  const [testProject, setTestProject] = useState("")
  const [testRating, setTestRating] = useState(5)
  const [testFeedback, setTestFeedback] = useState("")
  const [testStatus, setTestStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  // Pre-fill query message from query parameters if present (e.g. from article page)
  useEffect(() => {
    const queryInq = searchParams.get("inquiry")
    if (queryInq) {
      setInqMessage(queryInq)
      setInqSubject("Software Development")
    }
  }, [searchParams])

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inqName.trim() || !inqEmail.trim() || !inqPhone.trim() || !inqMessage.trim()) {
      setInqStatus("error")
      return
    }

    setInqStatus("submitting")

    // Simulate backend logging
    setTimeout(() => {
      setInqStatus("success")
      setTimeout(() => {
        setInqName("")
        setInqEmail("")
        setInqPhone("")
        setInqMessage("")
        setInqStatus("idle")
      }, 2500)
    }, 1200)
  }

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!testName.trim() || !testProject.trim() || !testFeedback.trim()) {
      setTestStatus("error")
      return
    }

    setTestStatus("submitting")

    // Cache locally for demonstration
    try {
      const cached = localStorage.getItem("skillforge_feedbacks_v1")
      const list = cached ? JSON.parse(cached) : []
      list.unshift({
        id: `local-${Date.now()}`,
        customerName: testName.trim(),
        projectName: testProject.trim(),
        rating: testRating,
        message: testFeedback.trim(),
        createdAt: { seconds: Math.floor(Date.now() / 1000) }
      })
      localStorage.setItem("skillforge_feedbacks_v1", JSON.stringify(list))
      setTestStatus("success")
    } catch (err) {
      console.error(err)
      setTestStatus("error")
    }

    setTimeout(() => {
      setTestName("")
      setTestProject("")
      setTestFeedback("")
      setTestRating(5)
      setTestStatus("idle")
    }, 2500)
  }

  return (
    <div className="relative min-h-screen bg-white text-slate-900 py-24 px-4 sm:px-6 lg:px-8 text-left select-none bg-dot-pattern">
      
      {/* Glow shapes */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-100 bg-blue-50/40 text-blue-600 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles size={12} />
            {t("contact.badge" as any)}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-slate-900 mb-6">
            {t("contact.titlePart1" as any)} <span className="text-gradient">{t("contact.titlePart2" as any)}</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
            {t("contact.subtitle" as any)}
          </p>
        </motion.div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <h2 className="text-xl font-bold font-display text-slate-900 mb-4">{t("contact.detailsTitle" as any)}</h2>

            {/* Quick Cards */}
            <div className="space-y-4">
              <div className="flex gap-4 p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm transition-all duration-300">
                <div className="p-3 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl shrink-0 h-fit">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display text-slate-900">{t("contact.details.0.title" as any)}</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Perundurai Road, Perundurai, <br />
                    Erode, Tamil Nadu - 638052, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm transition-all duration-300">
                <div className="p-3 bg-purple-50 border border-purple-100 text-purple-600 rounded-xl shrink-0 h-fit">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display text-slate-900">{t("contact.details.1.title" as any)}</h4>
                  <a href="tel:+919345518760" className="text-slate-600 text-xs mt-1 hover:text-blue-600 transition-colors block font-semibold">
                    +91 93455 18760
                  </a>
                  <p className="text-[10px] text-slate-400 mt-0.5">{t("contact.details.1.desc" as any)}</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm transition-all duration-300">
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl shrink-0 h-fit">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display text-slate-900">{t("contact.details.2.title" as any)}</h4>
                  <a href="mailto:info@skillforgetechnology.app" className="text-slate-600 text-xs mt-1 hover:text-blue-600 transition-colors block break-all font-semibold">
                    info@skillforgetechnology.app
                  </a>
                </div>
              </div>
            </div>

            {/* General hours */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-2">
              <span className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Clock size={14} className="text-blue-600" />
                <span>{t("contact.details.3.title" as any)}</span>
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {t("contact.details.3.desc" as any)}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Tabbed Forms */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <Card className="bg-white border border-slate-200 rounded-3xl overflow-hidden relative shadow-sm">
              <CardHeader className="p-6 sm:p-8 border-b border-slate-100">
                <CardTitle className="text-xl font-bold font-display text-slate-900">{t("contact.formTitle" as any)}</CardTitle>
                <CardDescription className="text-slate-500 text-xs mt-1">
                  {t("contact.formSubtitle" as any)}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 sm:p-8">
                <Tabs defaultValue="inquiry" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-slate-50 border border-slate-200 rounded-xl p-1 w-full mb-6 grid grid-cols-2">
                    <TabsTrigger value="inquiry" className="flex items-center justify-center gap-2 rounded-lg py-2 text-xs text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 cursor-pointer">
                      <MessageSquare size={14} />
                      <span>{t("contact.tabs.inquiry" as any)}</span>
                    </TabsTrigger>
                    <TabsTrigger value="feedback" className="flex items-center justify-center gap-2 rounded-lg py-2 text-xs text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-900 cursor-pointer">
                      <Heart size={14} />
                      <span>{t("contact.tabs.review" as any)}</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Inquiry Tab Content */}
                  <TabsContent value="inquiry">
                    {inqStatus === "success" ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <CheckCircle2 className="text-emerald-500 w-12 h-12 mb-4 animate-pulse" />
                        <h3 className="text-base font-bold font-display text-slate-900 mb-2">{t("contact.successTitle" as any)}</h3>
                        <p className="text-slate-500 text-xs max-w-sm">
                          {t("contact.successMsg" as any)}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t("contact.formName" as any)}</label>
                          <Input
                            required
                            type="text"
                            placeholder={t("contact.formNamePlaceholder" as any)}
                            value={inqName}
                            onChange={(e) => setInqName(e.target.value)}
                            className="bg-white border-slate-200 text-slate-900 rounded-xl focus:border-blue-650 text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t("contact.formEmail" as any)}</label>
                            <Input
                              required
                              type="email"
                              placeholder={t("contact.formEmailPlaceholder" as any)}
                              value={inqEmail}
                              onChange={(e) => setInqEmail(e.target.value)}
                              className="bg-white border-slate-200 text-slate-900 rounded-xl focus:border-blue-650 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t("contact.formPhone" as any)}</label>
                            <Input
                              required
                              type="tel"
                              placeholder={t("contact.formPhonePlaceholder" as any)}
                              value={inqPhone}
                              onChange={(e) => setInqPhone(e.target.value)}
                              className="bg-white border-slate-200 text-slate-900 rounded-xl focus:border-blue-650 text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t("contact.formScope" as any)}</label>
                          <select
                            value={inqSubject}
                            onChange={(e) => setInqSubject(e.target.value)}
                            className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl p-2.5 text-xs focus:outline-none focus:border-blue-650 transition-colors"
                          >
                            <option value="Software Development">{t("services.software-development.title" as any)}</option>
                            <option value="Web Development">{t("services.web-development.title" as any)}</option>
                            <option value="Mobile App Development">{t("services.mobile-development.title" as any)}</option>
                            <option value="AI Solutions">{t("services.ai-solutions.title" as any)}</option>
                            <option value="Cloud & DevOps">{t("services.cloud-devops.title" as any)}</option>
                            <option value="Real Estate Creative">{t("services.real-estate-creative.title" as any)}</option>
                            <option value="Other">{t("contact.formScopeOther" as any)}</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t("contact.formMessage" as any)}</label>
                          <textarea
                            required
                            rows={4}
                            placeholder={t("contact.formMessagePlaceholder" as any)}
                            value={inqMessage}
                            onChange={(e) => setInqMessage(e.target.value)}
                            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-650 transition-colors"
                          />
                        </div>

                        {inqStatus === "error" && (
                          <div className="text-red-500 text-xs">
                            {t("contact.formError" as any)}
                          </div>
                        )}

                        <Button
                          type="submit"
                          disabled={inqStatus === "submitting"}
                          className="w-full py-6 rounded-xl bg-gradient-brand text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {inqStatus === "submitting" ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              <span>{t("contact.sending" as any)}</span>
                            </>
                          ) : (
                            <>
                              <Send size={14} />
                              <span>{t("contact.submit" as any)}</span>
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </TabsContent>

                  {/* Feedback Tab Content */}
                  <TabsContent value="feedback">
                    {testStatus === "success" ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <CheckCircle2 className="text-emerald-500 w-12 h-12 mb-4 animate-pulse" />
                        <h3 className="text-base font-bold font-display text-slate-900 mb-2">{t("contact.feedbackSuccessTitle" as any)}</h3>
                        <p className="text-slate-500 text-xs max-w-sm">
                          {t("contact.feedbackSuccessMsg" as any)}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t("reviews.formName" as any)}</label>
                          <Input
                            required
                            type="text"
                            placeholder={t("reviews.formName" as any)}
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                            className="bg-white border-slate-200 text-slate-900 rounded-xl focus:border-blue-650 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t("reviews.formProject" as any)}</label>
                          <Input
                            required
                            type="text"
                            placeholder={t("reviews.formProjectPlaceholder" as any)}
                            value={testProject}
                            onChange={(e) => setTestProject(e.target.value)}
                            className="bg-white border-slate-200 text-slate-900 rounded-xl focus:border-blue-650 text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t("reviews.formRating" as any)}</label>
                          <div className="flex items-center gap-1.5 mt-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setTestRating(star)}
                                className="focus:outline-none cursor-pointer"
                              >
                                <Star
                                  size={22}
                                  className={
                                    star <= testRating
                                      ? "fill-amber-500 text-amber-500"
                                      : "text-slate-200 hover:text-amber-400"
                                  }
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{t("reviews.formMessage" as any)}</label>
                          <textarea
                            required
                            rows={4}
                            placeholder={t("reviews.formMessagePlaceholder" as any)}
                            value={testFeedback}
                            onChange={(e) => setTestFeedback(e.target.value)}
                            className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-650 transition-colors"
                          />
                        </div>

                        {testStatus === "error" && (
                          <div className="text-red-500 text-xs">
                            {t("reviews.formError" as any)}
                          </div>
                        )}

                        <Button
                          type="submit"
                          disabled={testStatus === "submitting"}
                          className="w-full py-6 rounded-xl bg-gradient-brand text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {testStatus === "submitting" ? (
                            <>
                              <Loader2 size={14} className="animate-spin" />
                              <span>{t("reviews.sending" as any)}</span>
                            </>
                          ) : (
                            <>
                              <Heart size={14} />
                              <span>{t("reviews.submitBtn" as any)}</span>
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default function ContactContent() {
  const { t } = useLanguage()
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center text-slate-500">
        <Loader2 size={24} className="animate-spin text-blue-600 mr-2" />
        <span>{t("contact.loading" as any)}</span>
      </div>
    }>
      <ContactContentInner />
    </Suspense>
  )
}
