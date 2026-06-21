"use client"

import React, { useRef, useEffect, useState } from "react"

interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  refresh?: boolean
}

export function Particles({
  className,
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<any[]>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const requestRef = useRef<number | null>(null)

  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark")

  useEffect(() => {
    // Detect theme class manually
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark")
      setThemeMode(isDark ? "dark" : "light")
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    
    // Set initial
    setThemeMode(document.documentElement.classList.contains("dark") ? "dark" : "light")

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d")
    }
    initCanvas()
    animate()
    window.addEventListener("resize", initCanvas)

    return () => {
      window.removeEventListener("resize", initCanvas)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [themeMode])

  useEffect(() => {
    onMouseMove()
  }, [])

  const initCanvas = () => {
    resizeCanvas()
    drawParticles()
  }

  const onMouseMove = () => {
    const handleMouseMove = (event: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        const { clientX, clientY } = event
        const x = clientX - rect.left - canvasSize.current.w / 2
        const y = clientY - rect.top - canvasSize.current.h / 2
        mouse.current = { x, y }
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = []
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w
      canvasRef.current.height = canvasSize.current.h
    }
  }

  const circleParams = (): any => {
    const x = Math.random() * canvasSize.current.w
    const y = Math.random() * canvasSize.current.h
    const translateX = 0
    const translateY = 0
    const size = Math.random() * 2 + 1
    const alpha = 0
    const targetAlpha = Math.random() * 0.6 + 0.1
    const dx = (Math.random() - 0.5) * 0.1
    const dy = (Math.random() - 0.5) * 0.1
    const magnetism = Math.random() * 4 + 2
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    }
  }

  const drawCircle = (circle: any, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle
      context.current.translate(translateX, translateY)
      context.current.beginPath()
      context.current.arc(x, y, size, 0, 2 * Math.PI)
      const color = themeMode === "dark" ? "255, 255, 255" : "6, 182, 212"
      context.current.fillStyle = `rgba(${color}, ${alpha})`
      context.current.fill()
      context.current.setTransform(1, 0, 0, 1, 0, 0)

      if (!update) {
        circles.current.push(circle)
      }
    }
  }

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h)
    }
  }

  const drawParticles = () => {
    clearContext()
    for (let i = 0; i < quantity; i++) {
      const circle = circleParams()
      drawCircle(circle)
    }
  }

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const factor = (value - start1) / (end1 - start1)
    return start2 + (end2 - start2) * factor
  }

  const animate = () => {
    clearContext()
    circles.current.forEach((circle: any, i: number) => {
      // Handle ease alpha
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ]
      const closestEdge = edge.reduce((a, b) => Math.min(a, b))
      const remapOpacity = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      )
      if (remapOpacity < 1) {
        circle.alpha = circle.targetAlpha * remapOpacity
      } else if (circle.alpha < circle.targetAlpha) {
        circle.alpha += 0.02
      }

      // Physics translate
      circle.x += circle.dx
      circle.y += circle.dy
      circle.translateX +=
        (mouse.current.x / staticity - circle.translateX) / ease
      circle.translateY +=
        (mouse.current.y / staticity - circle.translateY) / ease

      // Out of bounds
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current[i] = circleParams()
      } else {
        drawCircle(circle, true)
      }
    })
    requestRef.current = requestAnimationFrame(animate)
  }

  return (
    <div
      className={className}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
export default Particles
