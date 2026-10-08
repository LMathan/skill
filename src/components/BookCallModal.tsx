"use client"

import React, { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, Calendar, Mail, Sparkles, Clock } from "lucide-react"

export default function BookCallModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth()) // 0-indexed
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const [honeypot, setHoneypot] = useState("")

  // Detect open event triggers
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      setSuccess(false)
      setSelectedDay(null)
      setEmail("")
      setErrorMsg("")
      
      const today = new Date()
      setCurrentYear(today.getFullYear())
      setCurrentMonth(today.getMonth())
    }
    window.addEventListener("open-book-call-modal", handleOpen)
    return () => window.removeEventListener("open-book-call-modal", handleOpen)
  }, [])

  if (!isOpen) return null

  // Date constants (calculated dynamically)
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth()
  const todayDay = today.getDate()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay()

  const handlePrevMonth = () => {
    if (currentYear === todayYear && currentMonth === todayMonth) return
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(y => y - 1)
    } else {
      setCurrentMonth(m => m - 1)
    }
    setSelectedDay(null)
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(y => y + 1)
    } else {
      setCurrentMonth(m => m + 1)
    }
    setSelectedDay(null)
  }

  const handleDaySelect = (day: number) => {
    if (isDayDisabled(day)) return
    setSelectedDay(day)
    setErrorMsg("")
  }

  const isDayDisabled = (day: number) => {
    if (currentYear < todayYear) return true
    if (currentYear === todayYear && currentMonth < todayMonth) return true
    if (currentYear === todayYear && currentMonth === todayMonth && day < todayDay) return true
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDay) {
      setErrorMsg("Please select a date from the calendar grid.")
      return
    }
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid corporate email address.")
      return
    }

    setSubmitting(true)
    setErrorMsg("")

    const formattedDate = `${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, date: formattedDate, _gotcha: honeypot })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
      } else {
        setErrorMsg(data.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      setErrorMsg("Network request failed. Please check connection.")
    } finally {
      setSubmitting(false)
    }
  }

  // Generate calendar days grid
  const daysArray = []
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fade-in font-sans select-none text-left">
      <div 
        className="w-full max-w-md bg-white border border-slate-200/80 rounded-[32px] overflow-hidden shadow-2xl p-6 relative flex flex-col justify-between max-h-[90vh] glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-blue-100 bg-blue-50 text-[8px] font-extrabold text-blue-650 uppercase tracking-widest">
              <Sparkles size={9} />
              Architecture Consultation
            </span>
            <h2 className="text-lg font-black font-display text-slate-900 leading-tight">Book Engineering Discovery</h2>
          </div>
          <button 
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 py-4 overflow-y-auto space-y-4">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot — hidden from humans, catches bots */}
              <input
                type="text"
                name="_gotcha"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              
              {/* Calendar Container */}
              <div className="border border-slate-200/60 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                {/* Month Controller Header */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="font-display font-extrabold">{monthNames[currentMonth]} {currentYear}</span>
                  <div className="flex gap-1">
                    <button 
                      type="button"
                      disabled={currentYear === todayYear && currentMonth === todayMonth}
                      onClick={handlePrevMonth}
                      className="p-1 border border-slate-200 rounded-lg hover:bg-white text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button 
                      type="button"
                      onClick={handleNextMonth}
                      className="p-1 border border-slate-200 rounded-lg hover:bg-white text-slate-500 transition-colors cursor-pointer"
                      aria-label="Next month"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Day Names Row */}
                <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                  <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
                  {daysArray.map((day, idx) => {
                    if (day === null) {
                      return <div key={`empty-${idx}`} />
                    }

                    const isDisabled = isDayDisabled(day)
                    const isSelected = selectedDay === day
                    const isToday = currentYear === todayYear && currentMonth === todayMonth && day === todayDay

                    return (
                      <button
                        type="button"
                        key={`day-${day}`}
                        disabled={isDisabled}
                        onClick={() => handleDaySelect(day)}
                        className={`py-2 rounded-lg transition-all cursor-pointer relative ${
                          isSelected 
                            ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-500/20" 
                            : isToday
                              ? "bg-blue-50 border border-blue-300 text-blue-600 font-extrabold"
                              : isDisabled 
                                ? "text-slate-300 cursor-not-allowed hover:bg-transparent" 
                                : "text-slate-700 hover:bg-white hover:border hover:border-slate-200"
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Email Input Field */}
              <div className="space-y-1.5 text-xs">
                <label htmlFor="booking-email-input" className="font-extrabold text-slate-650 uppercase tracking-wider block">Corporate Email Address *</label>
                <div className="relative flex items-center">
                  <Mail size={13} className="text-slate-400 absolute left-3" />
                  <input
                    id="booking-email-input"
                    type="email"
                    required
                    placeholder="e.g. manager@yourcompany.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-650 text-slate-900 font-medium placeholder:text-slate-400"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 rounded-lg p-2.5">
                  {errorMsg}
                </div>
              )}

              {/* Submit Buttons */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all cursor-pointer shadow-sm text-xs flex justify-center items-center gap-1.5"
              >
                {submitting ? "Booking Consult..." : "Confirm Schedule Booking"}
              </button>
            </form>
          ) : (
            /* Booking Success Interface */
            <div className="py-6 text-center space-y-4 animate-scale-up font-sans">
              <div className="w-12 h-12 bg-green-50 border border-green-200 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Calendar size={22} className="animate-bounce" />
              </div>
              <div className="space-y-1">
                <h3 className="font-black text-slate-900 text-base">Discovery Session Scheduled!</h3>
                <p className="text-[11px] text-slate-455 font-medium leading-relaxed px-4">
                  We have mapped your consulting invitation on <strong className="text-slate-900">{monthNames[currentMonth]} {selectedDay}, {currentYear}</strong>.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl flex items-center gap-3 text-left max-w-sm mx-auto">
                <Mail size={16} className="text-blue-500 shrink-0" />
                <div className="space-y-0.5 leading-none">
                  <span className="text-[7px] text-slate-400 font-bold uppercase tracking-wider block">Recipient email</span>
                  <span className="text-xs font-bold text-slate-700 block truncate">{email}</span>
                </div>
              </div>
              <p className="text-[9px] text-slate-400 font-bold leading-normal">
                Check your inbox. Calendar details and wireframe agendas have been logged.
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2 px-6 text-[10px] font-bold text-center cursor-pointer"
              >
                Close Booking Panel
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Info */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[9px] text-slate-400 font-semibold">
          <div className="flex items-center gap-1.5">
            <Clock size={11} className="text-blue-500" />
            <span>Time Zone: GMT +5:30 (IST)</span>
          </div>
          <span>Secure sync verified</span>
        </div>
      </div>
    </div>
  )
}
