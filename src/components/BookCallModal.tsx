"use client"

import React, { useState, useEffect, useCallback } from "react"
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Mail, 
  Sparkles, 
  Clock, 
  Globe, 
  Check, 
  Ban, 
  CheckCircle2 
} from "lucide-react"

export interface TimeSlotConfig {
  id: string
  label: string
  timeDisplay: string
  period: "Morning" | "Afternoon" | "Evening" | "Night"
  startHour: number
  startMinute: number
}

export const CONSULTATION_TIME_SLOTS: TimeSlotConfig[] = [
  {
    id: "morning",
    label: "10:00 AM - 11:00 AM",
    timeDisplay: "10:00 AM – 11:00 AM",
    period: "Morning",
    startHour: 10,
    startMinute: 0,
  },
  {
    id: "afternoon",
    label: "2:00 PM - 3:00 PM",
    timeDisplay: "2:00 PM – 3:00 PM",
    period: "Afternoon",
    startHour: 14,
    startMinute: 0,
  },
  {
    id: "evening",
    label: "6:00 PM - 7:00 PM",
    timeDisplay: "6:00 PM – 7:00 PM",
    period: "Evening",
    startHour: 18,
    startMinute: 0,
  },
  {
    id: "night",
    label: "9:00 PM - 10:00 PM",
    timeDisplay: "9:00 PM – 10:00 PM",
    period: "Night",
    startHour: 21,
    startMinute: 0,
  },
]

const LOCAL_STORAGE_KEY = "sf_consultation_booked_slots_v1"

export default function BookCallModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentYear, setCurrentYear] = useState(() => new Date().getFullYear())
  const [currentMonth, setCurrentMonth] = useState(() => new Date().getMonth()) // 0-indexed
  const [selectedDay, setSelectedDay] = useState<number | null>(() => new Date().getDate())
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [confirmedDetails, setConfirmedDetails] = useState<{ date: string; timeSlot: string; email: string } | null>(null)
  const [errorMsg, setErrorMsg] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [bookedSlotsMap, setBookedSlotsMap] = useState<Record<string, string[]>>({})
  const [loadingSlots, setLoadingSlots] = useState(false)

  // Fetch booked slots from backend and merge with local cache
  const fetchBookedSlots = useCallback(async () => {
    setLoadingSlots(true)
    let localCache: Record<string, string[]> = {}
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (stored) {
        localCache = JSON.parse(stored)
      }
    } catch {
      // ignore JSON parse error
    }

    try {
      const res = await fetch("/api/book-call", { method: "GET" })
      if (res.ok) {
        const data = await res.json()
        if (data.bookedSlots) {
          const merged: Record<string, string[]> = { ...localCache }
          for (const [key, slots] of Object.entries(data.bookedSlots as Record<string, string[]>)) {
            const current = merged[key] || []
            merged[key] = Array.from(new Set([...current, ...slots]))
          }
          setBookedSlotsMap(merged)
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged))
          } catch {}
          return
        }
      }
    } catch {
      // fallback to local cache
    } finally {
      setLoadingSlots(false)
    }

    setBookedSlotsMap(localCache)
  }, [])

  // Detect open event triggers
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      setSuccess(false)
      setConfirmedDetails(null)
      setEmail("")
      setErrorMsg("")
      setSelectedSlot(null)

      const today = new Date()
      setCurrentYear(today.getFullYear())
      setCurrentMonth(today.getMonth())
      setSelectedDay(today.getDate())

      fetchBookedSlots()
    }
    window.addEventListener("open-book-call-modal", handleOpen)
    return () => window.removeEventListener("open-book-call-modal", handleOpen)
  }, [fetchBookedSlots])

  if (!isOpen) return null

  // Date constants (calculated dynamically)
  const today = new Date()
  const todayYear = today.getFullYear()
  const todayMonth = today.getMonth()
  const todayDay = today.getDate()
  const currentHour = today.getHours()
  const currentMinute = today.getMinutes()

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const dayNamesFull = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  // Monday-first indexing: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6
  const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7

  const handlePrevMonth = () => {
    if (currentYear === todayYear && currentMonth === todayMonth) return
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(y => y - 1)
    } else {
      setCurrentMonth(m => m - 1)
    }
    setSelectedDay(null)
    setSelectedSlot(null)
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(y => y + 1)
    } else {
      setCurrentMonth(m => m + 1)
    }
    setSelectedDay(null)
    setSelectedSlot(null)
  }

  const isDayDisabled = (day: number) => {
    if (currentYear < todayYear) return true
    if (currentYear === todayYear && currentMonth < todayMonth) return true
    if (currentYear === todayYear && currentMonth === todayMonth && day < todayDay) return true
    return false
  }

  const handleDaySelect = (day: number) => {
    if (isDayDisabled(day)) return
    setSelectedDay(day)
    setSelectedSlot(null)
    setErrorMsg("")
  }

  // Selected date keys
  const dateKey = selectedDay
    ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
    : ""
  const formattedStorageDate = selectedDay
    ? `${monthNames[currentMonth]} ${selectedDay}, ${currentYear}`
    : ""

  const selectedDateObj = selectedDay ? new Date(currentYear, currentMonth, selectedDay) : null
  const selectedDayOfWeek = selectedDateObj ? dayNamesFull[selectedDateObj.getDay()] : ""
  const displaySelectedHeader = selectedDay
    ? `${selectedDayOfWeek}, ${monthNames[currentMonth]} ${selectedDay}`
    : "Select a Date"

  // Check if a time slot is already booked for the selected date
  const isSlotBooked = (slotLabel: string): boolean => {
    if (!selectedDay) return false
    const bookedForDateKey = bookedSlotsMap[dateKey] || []
    const bookedForFormatted = bookedSlotsMap[formattedStorageDate] || []
    return bookedForDateKey.includes(slotLabel) || bookedForFormatted.includes(slotLabel)
  }

  // Check if a time slot has already passed for today
  const isSlotPast = (slot: TimeSlotConfig): boolean => {
    if (currentYear === todayYear && currentMonth === todayMonth && selectedDay === todayDay) {
      if (currentHour > slot.startHour) return true
      if (currentHour === slot.startHour && currentMinute >= slot.startMinute) return true
    }
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDay) {
      setErrorMsg("Please select a date from the calendar.")
      return
    }
    if (!selectedSlot) {
      setErrorMsg("Please select an available consultation time slot.")
      return
    }
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid corporate email address.")
      return
    }

    // Safety check if slot became booked
    if (isSlotBooked(selectedSlot)) {
      setErrorMsg("This time slot is no longer available. Please select another slot.")
      setSelectedSlot(null)
      return
    }

    setSubmitting(true)
    setErrorMsg("")

    try {
      const res = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          date: formattedStorageDate,
          dateKey,
          timeSlot: selectedSlot,
          _gotcha: honeypot,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        // Record slot as booked locally right away
        const updated = { ...bookedSlotsMap }
        const list1 = updated[dateKey] || []
        const list2 = updated[formattedStorageDate] || []
        updated[dateKey] = Array.from(new Set([...list1, selectedSlot]))
        updated[formattedStorageDate] = Array.from(new Set([...list2, selectedSlot]))
        setBookedSlotsMap(updated)
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
        } catch {}

        setConfirmedDetails({
          date: `${selectedDayOfWeek}, ${formattedStorageDate}`,
          timeSlot: selectedSlot,
          email,
        })
        setSuccess(true)
      } else {
        setErrorMsg(data.error || "Unable to confirm booking. Please try another slot.")
        if (data.error && data.error.toLowerCase().includes("already been booked")) {
          // Refresh booked slots map
          fetchBookedSlots()
          setSelectedSlot(null)
        }
      }
    } catch {
      setErrorMsg("Network request failed. Please check your internet connection.")
    } finally {
      setSubmitting(false)
    }
  }

  // Days array for calendar grid (Mon-first)
  const daysArray = []
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/65 backdrop-blur-md animate-fade-in font-sans select-none text-left">
      <div 
        className="w-full max-w-3xl bg-white border border-slate-200/90 rounded-[28px] md:rounded-[36px] overflow-hidden shadow-2xl p-5 md:p-7 relative flex flex-col max-h-[92vh] glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-blue-200/70 bg-blue-50/80 text-[9px] font-extrabold text-blue-700 uppercase tracking-widest">
              <Sparkles size={10} className="text-blue-600 animate-pulse" />
              Architecture Consultation
            </div>
            <h2 className="text-xl md:text-2xl font-black font-display text-slate-900 tracking-tight">
              Select a Date &amp; Time
            </h2>
            <p className="text-[12px] text-slate-500 font-medium">
              Choose an available 1-hour engineering discovery slot with our architects.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-800 rounded-full transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 py-4 overflow-y-auto pr-1">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Bot Honeypot */}
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

              {/* 2-Column Responsive Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Left Column: Calendar Grid */}
                <div className="md:col-span-6 bg-slate-50/60 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                    <div className="flex gap-1">
                      <button 
                        type="button"
                        disabled={currentYear === todayYear && currentMonth === todayMonth}
                        onClick={handlePrevMonth}
                        className="p-1.5 border border-slate-200 rounded-lg hover:bg-white text-slate-650 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer shadow-xs"
                        aria-label="Previous month"
                      >
                        <ChevronLeft size={15} />
                      </button>
                      <button 
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1.5 border border-slate-200 rounded-lg hover:bg-white text-slate-650 transition-colors cursor-pointer shadow-xs"
                        aria-label="Next month"
                      >
                        <ChevronRight size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Weekday Names (Mon -> Sun) */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-semibold">
                    {daysArray.map((day, idx) => {
                      if (day === null) {
                        return <div key={`empty-${idx}`} className="h-8 md:h-9" />
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
                          className={`h-8 md:h-9 rounded-xl transition-all cursor-pointer relative flex flex-col items-center justify-center ${
                            isSelected 
                              ? "bg-blue-600 text-white font-extrabold shadow-md shadow-blue-500/30 scale-105" 
                              : isToday
                                ? "bg-blue-50/80 border border-blue-400/80 text-blue-650 font-extrabold"
                                : isDisabled 
                                  ? "text-slate-300 cursor-not-allowed hover:bg-transparent" 
                                  : "text-slate-700 hover:bg-white hover:border hover:border-slate-300/80 hover:text-slate-900 shadow-xs"
                          }`}
                        >
                          <span>{day}</span>
                          {isToday && !isSelected && (
                            <span className="w-1 h-1 bg-blue-600 rounded-full absolute bottom-1" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Time Zone Indicator */}
                  <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                    <Globe size={13} className="text-blue-600 shrink-0" />
                    <span>Time zone: <strong className="text-slate-700">India Standard Time (IST)</strong></span>
                  </div>
                </div>

                {/* Right Column: Time Slots & Details */}
                <div className="md:col-span-6 space-y-4">
                  {/* Selected Day Heading */}
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-extrabold text-blue-650 uppercase tracking-widest block">
                        Selected Date
                      </span>
                      <h3 className="text-sm md:text-base font-black text-slate-900">
                        {displaySelectedHeader}
                      </h3>
                    </div>
                    {loadingSlots && (
                      <span className="text-[10px] text-slate-400 font-medium animate-pulse">
                        Refreshing slots...
                      </span>
                    )}
                  </div>

                  {/* Time Slots List */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-extrabold text-slate-650 uppercase tracking-wider block">
                      Select Available Time Slot *
                    </label>

                    {!selectedDay ? (
                      <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center text-xs text-slate-400 font-medium">
                        Click any date on the calendar to see available slots.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        {CONSULTATION_TIME_SLOTS.map((slot) => {
                          const booked = isSlotBooked(slot.label)
                          const past = isSlotPast(slot)
                          const isUnavailable = booked || past
                          const isSelected = selectedSlot === slot.label

                          let statusBadge = null
                          if (booked) {
                            statusBadge = (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                                <Ban size={10} />
                                Not Available
                              </span>
                            )
                          } else if (past) {
                            statusBadge = (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                                Passed
                              </span>
                            )
                          } else if (isSelected) {
                            statusBadge = (
                              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-white bg-blue-700/80 px-2 py-0.5 rounded-full">
                                <Check size={11} />
                                Selected
                              </span>
                            )
                          } else {
                            statusBadge = (
                              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                Available
                              </span>
                            )
                          }

                          return (
                            <button
                              key={slot.id}
                              type="button"
                              disabled={isUnavailable}
                              onClick={() => {
                                setSelectedSlot(slot.label)
                                setErrorMsg("")
                              }}
                              className={`w-full p-2.5 sm:p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.01]"
                                  : isUnavailable
                                    ? "bg-slate-100/70 border-slate-200/80 text-slate-400 cursor-not-allowed opacity-80"
                                    : "bg-white border-slate-200/90 hover:border-blue-500 hover:bg-blue-50/20 text-slate-800 shadow-xs"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`w-2 h-2 rounded-full ${
                                  isSelected 
                                    ? "bg-white" 
                                    : isUnavailable 
                                      ? "bg-slate-300" 
                                      : "bg-emerald-500"
                                }`} />
                                <div>
                                  <span className={`block text-xs sm:text-sm font-black ${
                                    isSelected ? "text-white" : isUnavailable ? "text-slate-400 line-through" : "text-slate-900"
                                  }`}>
                                    {slot.timeDisplay}
                                  </span>
                                  <span className={`text-[10px] font-semibold ${
                                    isSelected ? "text-blue-100" : isUnavailable ? "text-slate-400" : "text-slate-500"
                                  }`}>
                                    {slot.period} Window (1 Hour)
                                  </span>
                                </div>
                              </div>

                              <div className="shrink-0">
                                {statusBadge}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Corporate Email Input */}
                  <div className="space-y-1.5 pt-1">
                    <label htmlFor="booking-email-input" className="text-[11px] font-extrabold text-slate-650 uppercase tracking-wider block">
                      Corporate Email Address *
                    </label>
                    <div className="relative flex items-center">
                      <Mail size={14} className="text-slate-400 absolute left-3 pointer-events-none" />
                      <input
                        id="booking-email-input"
                        type="email"
                        required
                        placeholder="e.g. director@yourcompany.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-900 font-medium placeholder:text-slate-400 transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Error Notification */}
                  {errorMsg && (
                    <div className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 rounded-xl p-2.5 animate-shake">
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting || !selectedDay || !selectedSlot}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-black py-3 rounded-xl transition-all cursor-pointer shadow-md shadow-blue-600/20 text-xs sm:text-sm flex justify-center items-center gap-2"
                  >
                    {submitting ? (
                      <span>Reserving Slot...</span>
                    ) : selectedSlot ? (
                      <>
                        <CheckCircle2 size={16} />
                        <span>Confirm Booking • {selectedSlot}</span>
                      </>
                    ) : (
                      <span>Select a Time Slot to Continue</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Booking Success Interface */
            <div className="py-8 text-center space-y-5 animate-scale-up max-w-md mx-auto">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={32} className="animate-bounce" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full inline-block">
                  Confirmed &amp; Locked
                </span>
                <h3 className="font-black text-slate-900 text-xl font-display">
                  Discovery Session Scheduled!
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed px-4">
                  Your architecture consultation has been locked. That time slot is now marked as booked.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <CalendarIcon size={16} className="text-blue-600 shrink-0" />
                  <div className="leading-tight">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Session Date</span>
                    <strong className="text-xs font-bold text-slate-900 block">{confirmedDetails?.date}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                  <Clock size={16} className="text-emerald-600 shrink-0" />
                  <div className="leading-tight">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Confirmed Time Slot</span>
                    <strong className="text-xs font-bold text-emerald-700 block">{confirmedDetails?.timeSlot} (IST)</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/60">
                  <Mail size={16} className="text-blue-500 shrink-0" />
                  <div className="leading-tight">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Recipient Corporate Email</span>
                    <strong className="text-xs font-bold text-slate-900 block truncate">{confirmedDetails?.email}</strong>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 font-medium leading-normal px-2">
                Check your inbox shortly for the calendar invite, Google Meet link, and meeting agenda.
              </p>

              <div className="flex gap-2 justify-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false)
                    setSelectedSlot(null)
                    setEmail("")
                    fetchBookedSlots()
                  }}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl py-2.5 px-4 text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Book Another Slot
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 px-6 text-xs font-bold transition-colors cursor-pointer shadow-md"
                >
                  Close Scheduler
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-blue-500" />
            <span>Slots: 10am-11am • 2pm-3pm • 6pm-7pm • 9pm-10pm (IST)</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">Instant availability lock verified</span>
        </div>
      </div>
    </div>
  )
}
