"use client"

import React, { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let rotation = 0

    const drawGlobe = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const width = canvas.width
      const height = canvas.height
      const radius = Math.min(width, height) / 2.2
      const cx = width / 2
      const cy = height / 2

      // Draw outer atmosphere glow glow
      const outerGlow = ctx.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius * 1.1)
      outerGlow.addColorStop(0, "rgba(6, 182, 212, 0.15)")
      outerGlow.addColorStop(1, "rgba(6, 182, 212, 0)")
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.2, 0, 2 * Math.PI)
      ctx.fillStyle = outerGlow
      ctx.fill()

      // Draw base circle
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI)
      ctx.fillStyle = "rgba(10, 15, 26, 0.6)"
      ctx.strokeStyle = "rgba(6, 182, 212, 0.25)"
      ctx.lineWidth = 1
      ctx.fill()
      ctx.stroke()

      // Draw latitude grid lines
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)"
      for (let i = 1; i < 6; i++) {
        const offset = (radius * 2 / 6) * i - radius
        ctx.beginPath()
        ctx.arc(cx, cy + offset, Math.sqrt(radius * radius - offset * offset), 0, 2 * Math.PI)
        ctx.stroke()
      }

      // Draw longitude grid curves (simulating rotation)
      ctx.strokeStyle = "rgba(6, 182, 212, 0.08)"
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI / 6) + rotation
        const rx = radius * Math.cos(angle)
        ctx.beginPath()
        ctx.ellipse(cx, cy, Math.abs(rx), radius, 0, 0, 2 * Math.PI)
        ctx.stroke()
      }

      // Pulse indicator for SkillForge Headquarters in Tamil Nadu
      const pulseRadius = Math.abs(Math.sin(Date.now() / 300)) * 5 + 3
      ctx.beginPath()
      ctx.arc(cx + radius * 0.45, cy + radius * 0.3, pulseRadius, 0, 2 * Math.PI)
      ctx.fillStyle = "rgba(6, 182, 212, 0.4)"
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx + radius * 0.45, cy + radius * 0.3, 3, 0, 2 * Math.PI)
      ctx.fillStyle = "#06b6d4"
      ctx.fill()

      rotation += 0.002
      animationFrameId = requestAnimationFrame(drawGlobe)
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    resize()
    window.addEventListener("resize", resize)
    drawGlobe()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center pointer-events-none select-none", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
export default Globe
