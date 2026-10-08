"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedBeamProps {
  className?: string
  containerRef: React.RefObject<HTMLElement | null>
  fromRef: React.RefObject<HTMLElement | null>
  toRef: React.RefObject<HTMLElement | null>
  curvature?: number
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  delay?: number
  duration?: number
  reverse?: boolean
}

export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  pathColor = "#e2e8f0",
  pathWidth = 2,
  pathOpacity = 0.5,
  gradientStartColor = "#06b6d4",
  gradientStopColor = "#3b82f6",
  delay = 0,
  duration = 3,
  reverse = false,
}: AnimatedBeamProps) {
  const [path, setPath] = useState("")
  const uniqueId = React.useId()

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const fromRect = fromRef.current.getBoundingClientRect()
      const toRect = toRef.current.getBoundingClientRect()

      const startX = fromRect.left - containerRect.left + fromRect.width / 2
      const startY = fromRect.top - containerRect.top + fromRect.height / 2
      const endX = toRect.left - containerRect.left + toRect.width / 2
      const endY = toRect.top - containerRect.top + toRect.height / 2

      const controlX = (startX + endX) / 2
      const controlY = (startY + endY) / 2 - curvature

      setPath(`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`)
    }

    // Run first calculation and observe changes
    updatePath()
    window.addEventListener("resize", updatePath)
    
    // Polling slightly to make sure refs have resolved layouts
    const timer = setTimeout(updatePath, 200)

    return () => {
      window.removeEventListener("resize", updatePath)
      clearTimeout(timer)
    }
  }, [containerRef, fromRef, toRef, curvature])

  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full stroke-2 fill-none z-10",
        className
      )}
    >
      <defs>
        <linearGradient
          id={`beam-grad-${uniqueId}`}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={reverse ? gradientStopColor : gradientStartColor} stopOpacity="0" />
          <stop offset="30%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="70%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="100%" stopColor={reverse ? gradientStartColor : gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Background static path */}
      <path
        d={path}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      
      {/* Animated path overlays */}
      <motion.path
        d={path}
        stroke={`url(#beam-grad-${uniqueId})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        initial={{ strokeDasharray: "0 100", strokeDashoffset: reverse ? -100 : 100 }}
        animate={{ strokeDasharray: ["10 90", "15 85", "10 90"], strokeDashoffset: reverse ? [100, -100] : [-100, 100] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      />
    </svg>
  )
}
export default AnimatedBeam
