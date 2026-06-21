"use client"

import React, { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export const Spotlight = ({
  className,
  fill = "rgba(6, 182, 212, 0.15)",
}: {
  className?: string
  fill?: string
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!divRef.current) return
      const rect = divRef.current.getBoundingClientRect()
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }

    const div = divRef.current
    if (div) {
      div.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (div) {
        div.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <div
      ref={divRef}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 transition-opacity duration-300",
        className
      )}
      style={{
        opacity: isFocused ? 1 : 0.6,
      }}
    >
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${fill}, transparent 80%)`,
        }}
      />
    </div>
  )
}
export default Spotlight
