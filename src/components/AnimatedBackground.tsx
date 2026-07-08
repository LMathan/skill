"use client"

import React, { useEffect, useRef } from "react"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Particle[] = []
    const particleCount = Math.min(80, Math.floor((width * height) / 15000))
    const mouse = { x: -1000, y: -1000, radius: 180 }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 2.5 + 1.5
        
        // Pick a matching theme color (blue, violet, cyan)
        const colors = [
          "rgba(59, 130, 246, 0.25)", // Blue
          "rgba(99, 102, 241, 0.25)", // Indigo
          "rgba(168, 85, 247, 0.22)", // Violet
          "rgba(6, 182, 212, 0.22)"   // Cyan
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off bounds
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1

        // Mouse interaction (push particles away gently)
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius
          const angle = Math.atan2(dy, dx)
          this.x += Math.cos(angle) * force * 1.5
          this.y += Math.sin(angle) * force * 1.5
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    // Handle Mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener("resize", handleResize, { passive: true })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw large fluid ambient morphing glows in background
      const time = Date.now() * 0.0005
      
      // Blob 1: Blue Glow
      const blob1X = width * 0.75 + Math.sin(time) * 100
      const blob1Y = height * 0.35 + Math.cos(time * 0.8) * 80
      const grad1 = ctx.createRadialGradient(blob1X, blob1Y, 10, blob1X, blob1Y, 400)
      grad1.addColorStop(0, "rgba(59, 130, 246, 0.08)")
      grad1.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.fillStyle = grad1
      ctx.fillRect(0, 0, width, height)

      // Blob 2: Violet/Magenta Glow
      const blob2X = width * 0.2 + Math.cos(time * 0.9) * 120
      const blob2Y = height * 0.7 + Math.sin(time * 0.7) * 90
      const grad2 = ctx.createRadialGradient(blob2X, blob2Y, 10, blob2X, blob2Y, 350)
      grad2.addColorStop(0, "rgba(168, 85, 247, 0.06)")
      grad2.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.fillStyle = grad2
      ctx.fillRect(0, 0, width, height)

      // 2. Draw Constellation Particle Swarm & Links
      particles.forEach(p => {
        p.update()
        p.draw()
      })

      // Link nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 130) {
            const alpha = (130 - dist) / 130 * 0.15
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }

        // Link particles close to the mouse
        const dx = particles[i].x - mouse.x
        const dy = particles[i].y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < mouse.radius) {
          const alpha = (mouse.radius - dist) / mouse.radius * 0.25
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none -z-20"
    />
  )
}
