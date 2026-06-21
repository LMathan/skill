"use client"

import React, { useEffect, useState, useId, useRef } from "react"
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
  const [squares, setSquares] = useState<Array<{ id: number; x: number; y: number }>>([])
  
  // Set random squares on client side load
  useEffect(() => {
    const list = Array.from({ length: numSquares }).map((_, i) => ({
      id: i,
      x: Math.floor(Math.random() * 20) - 10,
      y: Math.floor(Math.random() * 20) - 10,
    }))
    setSquares(list)

    // Continuously swap some cells to make it animate
    const interval = setInterval(() => {
      setSquares((prev) => {
        const next = [...prev]
        const swapIdx = Math.floor(Math.random() * next.length)
        next[swapIdx] = {
          id: Date.now() + swapIdx,
          x: Math.floor(Math.random() * 20) - 10,
          y: Math.floor(Math.random() * 20) - 10,
        }
        return next
      })
    }, 2000)

    return () => clearInterval(interval)
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
        {squares.map(({ id: sqId, x: sqX, y: sqY }) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, maxOpacity, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
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
