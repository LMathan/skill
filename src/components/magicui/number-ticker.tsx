"use client"

import React, { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import { cn } from "@/lib/utils"

export function NumberTicker({
  value,
  className,
  duration = 2000,
}: {
  value: number
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    if (start === end) return

    const startTime = performance.now()

    const step = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      // Ease out quad
      const easeProgress = progress * (2 - progress)
      
      const currentVal = Math.floor(easeProgress * (end - start) + start)
      setDisplayValue(currentVal)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setDisplayValue(end)
      }
    }

    requestAnimationFrame(step)
  }, [value, duration, isInView])

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {displayValue}
    </span>
  )
}
export default NumberTicker
