"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Cpu, Brain, Terminal, Shield, Award, Calendar, Users, MapPin, CheckCircle2, Loader2, ArrowRight, BookOpen, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import Particles from "@/components/magicui/particles"
import GridPattern from "@/components/magicui/grid-pattern"
import BorderBeam from "@/components/magicui/border-beam"

const programs = [
  {
    title: "IoT & Cloud Protocols",
    description: "Build cloud-connected IoT systems with real-time dashboards and edge integration.",
    icon: Cpu,
    color: "from-sky-500 to-blue-600",
    shadow: "shadow-sky-500/10",
    duration: "5 / 10 / 30 Days",
    topics: ["ESP32 & NodeMCU Architecture", "MQTT, HTTP & WebSockets Protocols", "Blynk, Firebase & AWS IoT Cloud", "Custom Mobile & Web IoT Apps"]
  },
  {
    title: "Embedded Systems & Firmware",
    description: "Write optimized C firmware, simulate devices, and design custom PCB circuits.",
    icon: Layers,
    color: "from-purple-500 to-indigo-600",
    shadow: "shadow-purple-500/10",
    duration: "5 / 10 / 30 Days",
    topics: ["Arduino & STM32 Microcontrollers", "Embedded C & Peripheral Protocols (I2C/SPI)", "Proteus Design Suite Simulation", "PCB Layout Schematics & Routing"]
  },
  {
    title: "Edge AI & Computer Vision",
    description: "Deploy machine learning models and visual detectors directly onto hardware chips.",
    icon: Brain,
    color: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/10",
    duration: "10 / 30 Days",
    topics: ["Python, OpenCV & Image Processing", "YOLO & MobileNet Object Tracking", "TinyML (Edge Impulse, TensorFlow Lite)", "Raspberry Pi & Coral Edge Inference"]
  },
  {
    title: "Robotics & Kinetic Systems",
    description: "Integrate motor drivers, IMU sensors, and telemetry for wireless kinetic systems.",
    icon: Terminal,
    color: "from-orange-500 to-amber-600",
    shadow: "shadow-orange-500/10",
    duration: "5 / 10 Days",
    topics: ["Kinematics & Motor Orchestration", "IMU & Gyroscopic Sensor Fusion", "RF / Bluetooth / Wi-Fi Drive Controls", "Robot Arm & Automated Rover Setup"]
  }
]

const packages = [
  {
    name: "Short-Term Boot Camp",
    duration: "5 Days",
    price: "₹1,999",
    target: "Beginners & Mini-Projects",
    features: [
      "Microcontroller Kit Access",
      "Basic Sensor Interfacing",
      "Full Code Walkthroughs",
      "Certified Internship Badge",
      "Offline / Online Modes"
    ]
  },
  {
    name: "Standard Industry Program",
    duration: "10 - 15 Days",
    price: "₹3,499",
    target: "Final Year & IEEE Projects",
    features: [
      "IoT Cloud Integrations",
      "Interactive Web Dashboards",
      "Basic PCB Design Workshop",
      "Dual Certification Program",
      "Review Presentation Prep",
      "Dedicated Lab Workspace"
    ],
    popular: true
  },
  {
    name: "Full Innovation Fellowship",
    duration: "30 Days",
    price: "₹5,999",
    target: "Researchers & Aspiring Devs",
    features: [
      "Multiple MCU Architectures",
      "Edge AI / Computer Vision Integration",
      "Complete PCB Fabrication Support",
      "Thesis/IEEE Research Writing Guidance",
      "Mock Technical Viva Prep",
      "1-on-1 Design Mentorship"
    ]
  }
]

const workshops = [
  {
    title: "Edge AI & Real-time Vision Workshop",
    date: "July 04 - 05, 2026",
    duration: "2 Days (Hands-on)",
    location: "Perundurai Center",
    topics: "OpenCV, Raspberry Pi, Object Detection",
    status: "Filling Fast"
  },
  {
    title: "Smart Cities & IoT Cloud Bootcamp",
    date: "July 12 - 13, 2026",
    duration: "2 Days (Hands-on)",
    location: "Perundurai Center / Online",
    topics: "ESP32, MQTT, AWS IoT Core, WebSockets",
    status: "Open"
  },
  {
    title: "PCB Schematic & Routing Design Session",
    date: "July 20, 2026",
    duration: "1 Day (Hands-on)",
    location: "Perundurai Center",
    topics: "Altium Designer, Proteus, PCB etching",
    status: "Open"
  }
]

export default function InternshipContent() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState("General Project Internship")
  
  // Registration Form State
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [college, setCollege] = useState("")
  const [department, setDepartment] = useState("")
  const [batch, setBatch] = useState("July 5 Batch")
  const [mode, setMode] = useState("Offline (Perundurai Center)")
  const [regStatus, setRegStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !phone || !college) {
      setRegStatus("error")
      return
    }

    setRegStatus("submitting")

    setTimeout(() => {
      setRegStatus("success")
      setTimeout(() => {
        setName("")
        setEmail("")
        setPhone("")
        setCollege("")
        setDepartment("")
        setRegStatus("idle")
        setIsSheetOpen(false)
      }, 2000)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background patterns */}
      <Particles className="absolute inset-0 z-0 opacity-40 pointer-events-none" quantity={60} staticity={50} />
      <GridPattern className="absolute inset-0 z-0 opacity-30 pointer-events-none" width={40} height={40} />

      {/* Glow shapes */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <GraduationCap size={14} />
            SkillForge Academy
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-6"
          >
            Hands-on Hardware <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 animate-pulse">Internships & Workshops</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            Bridge the gap between textbook engineering and actual embedded system prototype design. Step into our state-of-the-art laboratory in Perundurai and learn by making.
          </motion.p>
        </div>

        {/* Pathway Programs */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold font-display text-white mb-2">Training Pathways</h2>
              <p className="text-slate-400 text-sm">Select a pathway and master industrial hardware programming</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={() => {
                  setSelectedProgram("General Project Internship")
                  setIsSheetOpen(true)
                }}
                className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-medium flex items-center gap-2 group shadow-lg shadow-purple-500/25"
              >
                <span>Register for Batch</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((prog, idx) => {
              const Icon = prog.icon
              return (
                <motion.div
                  key={prog.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative"
                >
                  <Card className="h-full bg-slate-900/40 border-white/5 backdrop-blur-md rounded-3xl flex flex-col justify-between overflow-hidden hover:bg-slate-900/60 hover:border-white/10 transition-all duration-300">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <BorderBeam duration={10} size={280} />
                    </div>

                    <CardHeader className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${prog.color} text-white shadow-lg ${prog.shadow}`}>
                          <Icon size={24} />
                        </div>
                        <span className="text-xs text-purple-400 font-semibold bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full">
                          {prog.duration}
                        </span>
                      </div>
                      <CardTitle className="text-2xl font-bold font-display text-white group-hover:text-purple-400 transition-colors duration-300">
                        {prog.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400 mt-2 text-sm leading-relaxed">
                        {prog.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-8 pt-0 flex-grow">
                      <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <BookOpen size={13} />
                        Syllabus Highlights
                      </h4>
                      <ul className="space-y-2">
                        {prog.topics.map((topic) => (
                          <li key={topic} className="text-sm text-slate-400 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/80 mt-1.5 shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>

                    <CardFooter className="p-8 pt-0 mt-auto">
                      <Button
                        onClick={() => {
                          setSelectedProgram(prog.title)
                          setIsSheetOpen(true)
                        }}
                        className="w-full rounded-xl bg-slate-800 hover:bg-purple-600 text-white font-medium flex items-center justify-center gap-2 transition-all"
                      >
                        <span>Enroll in Pathway</span>
                        <ArrowRight size={14} className="opacity-75" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Pricing/Packages Grid */}
        <div className="mb-24 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-display text-white mb-3">Structured Internships</h2>
            <p className="text-slate-400 text-sm">Choose from short-term bootcamps or long-term design fellowships</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex flex-col justify-between rounded-3xl p-8 backdrop-blur-md transition-all duration-300 ${
                  pkg.popular
                    ? "bg-slate-900/80 border-purple-500/50 shadow-xl shadow-purple-500/10 scale-[1.03] md:-translate-y-2 z-10"
                    : "bg-slate-900/40 border-white/5 hover:border-white/10"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wider shadow">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold font-display text-white">{pkg.name}</h3>
                    <p className="text-slate-400 text-xs mt-1">{pkg.target}</p>
                  </div>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-extrabold text-white">{pkg.price}</span>
                    <span className="text-slate-400 text-sm">/ for {pkg.duration}</span>
                  </div>

                  <ul className="space-y-3.5 border-t border-white/5 pt-6 mb-8">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="text-sm text-slate-300 flex items-start gap-2">
                        <CheckCircle2 size={16} className="text-purple-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => {
                    setSelectedProgram(`${pkg.name} (${pkg.duration})`)
                    setIsSheetOpen(true)
                  }}
                  className={`w-full rounded-xl py-6 font-medium ${
                    pkg.popular
                      ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  }`}
                >
                  Apply & Reserve Spot
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Workshops */}
        <div className="mb-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-display text-white mb-3 font-semibold">Upcoming Hands-on Workshops</h2>
            <p className="text-slate-400 text-sm">Join our short weekend bootcamps held at our Erode lab</p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {workshops.map((w, idx) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/10 hover:bg-slate-900/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl shrink-0">
                    <Calendar size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-display text-white">{w.title}</h3>
                    <p className="text-slate-400 text-xs mt-1 flex flex-wrap gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1"><MapPin size={12} /> {w.location}</span>
                      <span>• Focus: {w.topics}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{w.date}</p>
                    <p className="text-xs text-slate-400">{w.duration}</p>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedProgram(`Workshop: ${w.title}`)
                      setIsSheetOpen(true)
                    }}
                    className="rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs py-2 px-3.5"
                  >
                    Register
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Sheet Drawer */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="bg-slate-950 border-l border-white/10 text-slate-100 flex flex-col justify-between p-6 w-[90%] max-w-[420px] overflow-y-auto">
          <div>
            <SheetHeader className="pr-6">
              <SheetTitle className="text-xl font-bold font-display text-white flex items-center gap-2">
                <GraduationCap className="text-purple-400" size={24} />
                Enrollment Form
              </SheetTitle>
              <SheetDescription className="text-slate-400 text-xs mt-1">
                Enter your details to reserve your batch slot. You will receive an official call with further onboarding details.
              </SheetDescription>
            </SheetHeader>

            {regStatus === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="text-emerald-500 w-16 h-16 animate-bounce mb-4" />
                <h3 className="text-lg font-bold font-display text-white mb-2">Registration Success!</h3>
                <p className="text-slate-400 text-xs max-w-xs">
                  Your seat has been provisionally reserved. An engineering coordinator will call you to confirm documentation and kit options.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 mt-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Program *</label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 text-slate-100 rounded-xl p-2.5 text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="General Project Internship">General Project Internship</option>
                    <option value="IoT & Cloud Protocols">IoT & Cloud Protocols</option>
                    <option value="Embedded Systems & Firmware">Embedded Systems & Firmware</option>
                    <option value="Edge AI & Computer Vision">Edge AI & Computer Vision</option>
                    <option value="Robotics & Kinetic Systems">Robotics & Kinetic Systems</option>
                    <option value="Short-Term Boot Camp (5 Days)">Short-Term Boot Camp (5 Days)</option>
                    <option value="Standard Industry Program (10-15 Days)">Standard Industry Program (10-15 Days)</option>
                    <option value="Full Innovation Fellowship (30 Days)">Full Innovation Fellowship (30 Days)</option>
                    <option value="Workshop: Edge AI & Real-time Vision Workshop">Workshop: Edge AI & Vision</option>
                    <option value="Workshop: Smart Cities & IoT Cloud Bootcamp">Workshop: Smart Cities & IoT</option>
                    <option value="Workshop: PCB Schematic & Routing Design Session">Workshop: PCB Schematic & Routing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name *</label>
                  <Input
                    required
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-slate-900 border-white/10 text-slate-100 rounded-xl focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address *</label>
                    <Input
                      required
                      type="email"
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-slate-900 border-white/10 text-slate-100 rounded-xl focus:border-purple-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number *</label>
                    <Input
                      required
                      type="tel"
                      placeholder="Contact No"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-slate-900 border-white/10 text-slate-100 rounded-xl focus:border-purple-500 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">College Name *</label>
                    <Input
                      required
                      type="text"
                      placeholder="College Name"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="bg-slate-900 border-white/10 text-slate-100 rounded-xl focus:border-purple-500 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Department</label>
                    <Input
                      type="text"
                      placeholder="e.g. ECE, CSE, EEE"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="bg-slate-900 border-white/10 text-slate-100 rounded-xl focus:border-purple-500 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Select Batch *</label>
                    <select
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 text-slate-100 rounded-xl p-2.5 text-xs focus:outline-none focus:border-purple-500"
                    >
                      <option value="June 25 Batch">June 25 Batch</option>
                      <option value="July 5 Batch">July 5 Batch</option>
                      <option value="July 15 Batch">July 15 Batch</option>
                      <option value="Custom Dates">Flexible / Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Mode *</label>
                    <select
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                      className="w-full bg-slate-900 border border-white/10 text-slate-100 rounded-xl p-2.5 text-xs focus:outline-none focus:border-purple-500"
                    >
                      <option value="Offline (Perundurai Center)">Offline (Perundurai)</option>
                      <option value="Online / Remote Support">Online Support</option>
                    </select>
                  </div>
                </div>

                {regStatus === "error" && (
                  <p className="text-red-400 text-xs flex items-center gap-1 bg-red-500/10 p-2 rounded-lg">
                    <span>* Please complete all mandatory fields.</span>
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={regStatus === "submitting"}
                  className="w-full py-6 mt-4 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-medium flex items-center justify-center gap-2"
                >
                  {regStatus === "submitting" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Processing Seat...</span>
                    </>
                  ) : (
                    <span>Confirm Registration</span>
                  )}
                </Button>
              </form>
            )}
          </div>
          <div className="text-[10px] text-slate-500 border-t border-white/5 pt-4 text-center mt-6">
            Secured by SkillForge SSL Encryption. <br />
            Need assistance? Reach out to support@skillforgetechnology.app
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
