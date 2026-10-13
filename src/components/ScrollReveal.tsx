"use client"

import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  once?: boolean
}

// Ultra-fast responsive scroll reveal with lookahead margin (no delay on scroll)
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.3,
  direction = "up",
  distance = 12,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  // Positive lookahead margin so elements trigger 150px BEFORE reaching viewport
  const isInView = useInView(ref, { once, margin: "150px 0px 50px 0px" })

  const getOffset = () => {
    switch (direction) {
      case "up": return { y: distance, x: 0 }
      case "down": return { y: -distance, x: 0 }
      case "left": return { x: distance, y: 0 }
      case "right": return { x: -distance, y: 0 }
      case "none": return { x: 0, y: 0 }
    }
  }

  const offset = getOffset()

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      <motion.div
        initial={{
          opacity: 0,
          x: offset.x,
          y: offset.y,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
                y: 0,
              }
            : {
                opacity: 0,
                x: offset.x,
                y: offset.y,
              }
        }
        transition={{
          duration,
          delay: Math.min(delay, 0.15),
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "150px 0px 50px 0px" })

  const words = text.split(" ")

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-[0.3em] gap-y-[0.1em] ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden pb-1">
          <motion.span
            initial={{ y: "40%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "40%", opacity: 0 }}
            transition={{
              duration: 0.25,
              delay: Math.min(delay + idx * 0.015, 0.12),
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.03,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "150px 0px 50px 0px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.25,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
