"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Star, CheckCircle2, Loader2, Sparkles, Clock, MessageSquare, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Particles from "@/components/magicui/particles"
import GridPattern from "@/components/magicui/grid-pattern"
import BorderBeam from "@/components/magicui/border-beam"

function ContactContentInner() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("inquiry")

  // Inquiry Form State
  const [inqName, setInqName] = useState("")
  const [inqEmail, setInqEmail] = useState("")
  const [inqPhone, setInqPhone] = useState("")
  const [inqSubject, setInqSubject] = useState("General Project Inquiry")
  const [inqMessage, setInqMessage] = useState("")
  const [inqStatus, setInqStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  // Testimonial Form State
  const [testName, setTestName] = useState("")
  const [testProject, setTestProject] = useState("")
  const [testRating, setTestRating] = useState(5)
  const [testFeedback, setTestFeedback] = useState("")
  const [testStatus, setTestStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  // Pre-fill query message from query parameters if present
  useEffect(() => {
    const queryInq = searchParams.get("inquiry")
    if (queryInq) {
      setInqMessage(queryInq)
      setInqSubject("Technical Blog Inquiry")
    }
  }, [searchParams])

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inqName || !inqEmail || !inqPhone || !inqMessage) {
      setInqStatus("error")
      return
    }

    setInqStatus("submitting")

    setTimeout(() => {
      setInqStatus("success")
      setTimeout(() => {
        setInqName("")
        setInqEmail("")
        setInqPhone("")
        setInqMessage("")
        setInqStatus("idle")
      }, 2500)
    }, 1500)
  }

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!testName || !testProject || !testFeedback) {
      setTestStatus("error")
      return
    }

    setTestStatus("submitting")

    setTimeout(() => {
      setTestStatus("success")
      setTimeout(() => {
        setTestName("")
        setTestProject("")
        setTestFeedback("")
        setTestRating(5)
        setTestStatus("idle")
      }, 2500)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <Particles className="absolute inset-0 z-0 opacity-40 pointer-events-none" quantity={60} staticity={50} />
      <GridPattern className="absolute inset-0 z-0 opacity-30 pointer-events-none" width={40} height={40} />

      {/* Glow shapes */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles size={12} />
            Connect With Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-6">
            Let&apos;s Build Something <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 animate-pulse">Extraordinary</span>
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Have questions about custom schematics, thesis reviews, or batch intakes? Fill out our form or visit our laboratory in Erode.
          </p>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl font-bold font-display text-white mb-4">Contact Details</h2>

            {/* Quick Cards */}
            <div className="space-y-4">
              <div className="flex gap-4 p-5 bg-slate-900/40 border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-xl shrink-0 h-fit">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display text-white">Innovation Lab Center</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Perundurai Road, Erode, <br />
                    Tamil Nadu - 638052
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-slate-900/40 border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl shrink-0 h-fit">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display text-white">Direct Hotline / WhatsApp</h4>
                  <a href="tel:+919345518760" className="text-slate-400 text-xs mt-1 hover:text-sky-400 transition-colors block">
                    +91 93455 18760
                  </a>
                  <p className="text-[10px] text-slate-500 mt-0.5">Mon - Sat: 9:00 AM - 7:30 PM</p>
                </div>
              </div>

              <div className="flex gap-4 p-5 bg-slate-900/40 border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl shrink-0 h-fit">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-display text-white">Email Inbox</h4>
                  <a href="mailto:skillforgetechnology05@gmail.com" className="text-slate-400 text-xs mt-1 hover:text-sky-400 transition-colors block break-all">
                    skillforgetechnology05@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-900/20 aspect-[4/3] w-full">
              <iframe
                title="SkillForge Technology Laboratory Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125218.28318281358!2d77.5342416390625!3d11.2789115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f491c136365%3A0xc34b7f87bf0b093d!2sPerundurai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1718873000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0 opacity-80"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Tabbed Forms */}
          <div className="lg:col-span-7">
            <Card className="bg-slate-900/40 border-white/5 backdrop-blur-md rounded-3xl overflow-hidden relative">
              <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                <BorderBeam duration={12} size={300} />
              </div>

              <CardHeader className="p-6 sm:p-8">
                <CardTitle className="text-2xl font-bold font-display text-white">Let&apos;s Get In Touch</CardTitle>
                <CardDescription className="text-slate-400 text-sm mt-1">
                  Send us a project inquiry or submit details about your experience.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 pt-0">
                <Tabs defaultValue="inquiry" value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="bg-slate-950 border border-white/10 rounded-xl p-1 w-full mb-6 grid grid-cols-2">
                    <TabsTrigger value="inquiry" className="flex items-center justify-center gap-2 rounded-lg py-2 text-xs">
                      <MessageSquare size={14} />
                      <span>Send Inquiry</span>
                    </TabsTrigger>
                    <TabsTrigger value="feedback" className="flex items-center justify-center gap-2 rounded-lg py-2 text-xs">
                      <Heart size={14} />
                      <span>Leave Feedback</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Inquiry Tab Content */}
                  <TabsContent value="inquiry">
                    {inqStatus === "success" ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <CheckCircle2 className="text-emerald-500 w-16 h-16 animate-bounce mb-4" />
                        <h3 className="text-lg font-bold font-display text-white mb-2">Message Dispatched!</h3>
                        <p className="text-slate-400 text-xs max-w-sm">
                          Thank you for reaching out. We have logged your request. Our research engineers will call or email you within 24 business hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name *</label>
                          <Input
                            required
                            type="text"
                            placeholder="Enter your name"
                            value={inqName}
                            onChange={(e) => setInqName(e.target.value)}
                            className="bg-slate-950 border-white/10 text-slate-100 rounded-xl focus:border-sky-500"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address *</label>
                            <Input
                              required
                              type="email"
                              placeholder="name@example.com"
                              value={inqEmail}
                              onChange={(e) => setInqEmail(e.target.value)}
                              className="bg-slate-950 border-white/10 text-slate-100 rounded-xl focus:border-sky-500 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number *</label>
                            <Input
                              required
                              type="tel"
                              placeholder="Mobile or WhatsApp"
                              value={inqPhone}
                              onChange={(e) => setInqPhone(e.target.value)}
                              className="bg-slate-950 border-white/10 text-slate-100 rounded-xl focus:border-sky-500 text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Inquiry Theme *</label>
                          <select
                            value={inqSubject}
                            onChange={(e) => setInqSubject(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 text-slate-100 rounded-xl p-2.5 text-sm focus:outline-none focus:border-sky-500"
                          >
                            <option value="General Project Inquiry">General Project Inquiry</option>
                            <option value="IEEE Research Paper Support">IEEE Research Paper Support</option>
                            <option value="Custom Electronic Prototyping">Custom Electronic Prototyping</option>
                            <option value="Technical Internship Training">Technical Internship Training</option>
                            <option value="Other Assistance">Other Assistance</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Message *</label>
                          <textarea
                            required
                            rows={4}
                            placeholder="Detail your requirements, project theme, deadline, or microcontrollers needed..."
                            value={inqMessage}
                            onChange={(e) => setInqMessage(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 text-slate-100 rounded-xl p-3 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                          />
                        </div>

                        {inqStatus === "error" && (
                          <div className="text-red-400 text-xs">
                            * Please fill out all required fields correctly.
                          </div>
                        )}

                        <Button
                          type="submit"
                          disabled={inqStatus === "submitting"}
                          className="w-full py-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
                        >
                          {inqStatus === "submitting" ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              <span>Sending Inquiry...</span>
                            </>
                          ) : (
                            <>
                              <Send size={14} />
                              <span>Submit Message</span>
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
                        <CheckCircle2 className="text-emerald-500 w-16 h-16 animate-bounce mb-4" />
                        <h3 className="text-lg font-bold font-display text-white mb-2">Feedback Received!</h3>
                        <p className="text-slate-400 text-xs max-w-sm">
                          Thank you for sharing your experience! Feedback like yours helps us inspire future batches of engineering scholars.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Name *</label>
                          <Input
                            required
                            type="text"
                            placeholder="Enter your name"
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                            className="bg-slate-950 border-white/10 text-slate-100 rounded-xl focus:border-sky-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Project Name *</label>
                          <Input
                            required
                            type="text"
                            placeholder="e.g. Smart Irrigation System"
                            value={testProject}
                            onChange={(e) => setTestProject(e.target.value)}
                            className="bg-slate-950 border-white/10 text-slate-100 rounded-xl focus:border-sky-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Rating *</label>
                          <div className="flex items-center gap-2 mt-1.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setTestRating(star)}
                                className="focus:outline-none transition-transform active:scale-125"
                              >
                                <Star
                                  size={24}
                                  className={
                                    star <= testRating
                                      ? "fill-amber-500 text-amber-500"
                                      : "text-slate-600 hover:text-amber-400"
                                  }
                                />
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Review Comments *</label>
                          <textarea
                            required
                            rows={4}
                            placeholder="Write about the hardware working condition, panel presentation score, code quality, and support details..."
                            value={testFeedback}
                            onChange={(e) => setTestFeedback(e.target.value)}
                            className="w-full bg-slate-950 border border-white/10 text-slate-100 rounded-xl p-3 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                          />
                        </div>

                        {testStatus === "error" && (
                          <div className="text-red-400 text-xs">
                            * Please complete all required feedback fields.
                          </div>
                        )}

                        <Button
                          type="submit"
                          disabled={testStatus === "submitting"}
                          className="w-full py-6 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
                        >
                          {testStatus === "submitting" ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              <span>Sending Feedback...</span>
                            </>
                          ) : (
                            <>
                              <Heart size={14} />
                              <span>Submit Testimonial</span>
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}

export default function ContactContent() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <Loader2 size={24} className="animate-spin text-sky-400 mr-2" />
        <span>Loading Contact Form...</span>
      </div>
    }>
      <ContactContentInner />
    </Suspense>
  )
}
