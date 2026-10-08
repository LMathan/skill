"use client"

import React, { useEffect, useState, useId } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface GridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  strokeDasharray?: string
  numSquares?: number
  maxOpacity?: number
  className?: string
}

export function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = "0",
  numSquares = 30,
  maxOpacity = 0.3,
  className,
  ...props
}: GridPatternProps) {
  const id = useId()
  const [squares, setSquares] = useState<Array<{ id: number; x: number; y: number; duration: number }>>([])

  // Generate random squares on the client only — never during render, so SSR
  // and hydration output always match. State is set asynchronously (rAF +
  // interval callbacks) rather than synchronously in the effect body.
  useEffect(() => {
    const makeSquare = (i: number) => ({
      id: i,
      x: Math.floor(Math.random() * 20) - 10,
      y: Math.floor(Math.random() * 20) - 10,
      // Random per-square animation duration, generated outside of render.
      duration: Math.random() * 3 + 2,
    })

    const raf = requestAnimationFrame(() => {
      setSquares(Array.from({ length: numSquares }).map((_, i) => makeSquare(i)))
    })

    // Continuously swap some cells to make it animate
    const interval = setInterval(() => {
      setSquares((prev) => {
        if (prev.length === 0) return prev
        const next = [...prev]
        const swapIdx = Math.floor(Math.random() * next.length)
        next[swapIdx] = makeSquare(Date.now() + swapIdx)
        return next
      })
    }, 2000)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(interval)
    }
  }, [numSquares])

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full stroke-gray-400/20 dark:stroke-slate-800/30",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ id: sqId, x: sqX, y: sqY, duration }) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, maxOpacity, 0] }}
            transition={{
              duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            key={sqId}
            width={width - 1}
            height={height - 1}
            x={sqX * width + 1}
            y={sqY * height + 1}
            fill="currentColor"
            className="text-brand-cyan/20 dark:text-brand-cyan/10"
            strokeWidth="0"
          />
        ))}
      </svg>
    </svg>
  )
}
export default GridPattern
