"use client"

import React from "react"
import { ShieldCheck, Target, Eye, Award, CheckCircle } from "lucide-react"
import { motion, Variants } from "framer-motion"

export default function AboutContent() {
  const values = [
    {
      title: "Who We Are",
      desc: "SkillForge Technology is a multidisciplinary engineering team focused on custom electronics prototyping, IoT platform integrations, and intelligent automation software. We cater to engineering scholars, startups, and product companies.",
      icon: <ShieldCheck className="text-brand-cyan" size={26} />
    },
    {
      title: "Our Mission",
      desc: "To convert creative engineering ideas into dependable, fully functional hardware and software solutions by combining design precision, detailed documentation, and robust development standard practices.",
      icon: <Target className="text-brand-blue" size={26} />
    },
    {
      title: "Our Vision",
      desc: "To become a premier hardware prototyping and technology mentoring hub, empowering the next generation of engineers, scholars, and builders with future-ready embedded, IoT, AI, and robotics setups.",
      icon: <Eye className="text-brand-indigo" size={26} />
    }
  ]

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden pt-20"
    >
      {/* Hero Header */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-display">
            About <span className="text-gradient">SkillForge Technology</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
            Empowering electronics innovation and practical engineering mentorship in Perundurai, Erode, Tamil Nadu.
          </p>
        </motion.div>
      </section>

      {/* Values Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {values.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-panel p-8 rounded-3xl space-y-4 flex flex-col justify-between hover:border-brand-cyan/20 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 w-fit rounded-2xl">
                  {item.icon}
                </div>
                <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">{item.title}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Lab Layout and Map */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/50 dark:bg-transparent rounded-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <h2 className="text-3xl font-bold tracking-tight font-display text-slate-900 dark:text-white">
              Our Prototyping & <br />
              <span className="text-gradient">Hardware Laboratory</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Our workshop is outfitted to support detailed electronic prototyping. We work across microcontrollers, sensor nodes, and software dash integrations. Whether it is programming customized firmware or assembling multi-layered sensor arrays, we test each component systematically.
            </p>
            
            <div className="space-y-4">
              {[
                "Microcontrollers: Arduino, ESP8266, ESP32, Raspberry Pi, STM32, PIC, MSP430",
                "Languages: C, Embedded C, C++, MicroPython, Python, JavaScript, Dart",
                "AI Frameworks: TensorFlow Lite, OpenCV, YOLO, Edge Impulse",
                "Cloud Interfaces: Firebase, Blynk, AWS IoT, ThingSpeak, Node-RED"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="text-brand-cyan shrink-0" size={16} />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="glass-panel overflow-hidden rounded-3xl h-80 sm:h-96 relative shadow-xl border-white/20 dark:border-white/5">
              <iframe 
                className="absolute inset-0 w-full h-full border-0 grayscale dark:invert-[0.9] dark:hue-rotate-180" 
                title="SkillForge Location Map" 
                src="https://maps.google.com/maps?q=Perundurai%2C%20Erode%2C%20Tamil%20Nadu&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Trust Badges */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-display">Trust & Quality Assured</h2>
          <p className="text-slate-500 dark:text-slate-400">
            We stand for reliability. All projects undergo rigid validation steps before delivery.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            { title: "ISO 9001:2015 Standards", desc: "Our design frameworks align with international engineering methodologies." },
            { title: "Certified Hardware Kit Guides", desc: "All delivery setups include thorough documentation, connection guides, and video tutorials." },
            { title: "99.8% Success Reviews", desc: "Outstanding rating across engineering colleges in Tamil Nadu." },
            { title: "Direct Lab Consultations", desc: "One-on-one session slots with seasoned design engineers for code explanation and setup reviews." }
          ].map((badge, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-3 bg-brand-cyan/10 text-brand-cyan rounded-xl w-fit mx-auto">
                <Award size={24} />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">{badge.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{badge.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  )
}
