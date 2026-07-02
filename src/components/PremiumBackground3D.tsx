"use client"

import React, { useRef, useEffect } from "react"

export default function PremiumBackground3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = canvas.width = window.innerWidth
    let height = canvas.height = Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      window.innerHeight
    )

    // Mouse movement state for premium parallax sway
    let mouseX = 0
    let mouseY = 0
    let targetOffsetX = 0
    let targetOffsetY = 0
    let currentOffsetX = 0
    let currentOffsetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -0.5 to 0.5 range
      mouseX = (e.clientX / window.innerWidth) - 0.5
      mouseY = (e.clientY / window.innerHeight) - 0.5
      targetOffsetX = mouseX * 50 // 50px max displacement
      targetOffsetY = mouseY * 50
    }
    window.addEventListener("mousemove", handleMouseMove)

    // 3D Point class with proper compound matrix-free rotation
    class Point3D {
      x: number
      y: number
      z: number
      origX: number
      origY: number
      origZ: number

      constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
        this.origX = x
        this.origY = y
        this.origZ = z
      }

      // True compounded rotation on X, Y and Z axes simultaneously
      rotate(ax: number, ay: number, az: number) {
        const radX = (ax * Math.PI) / 180
        const radY = (ay * Math.PI) / 180
        const radZ = (az * Math.PI) / 180

        const cosX = Math.cos(radX), sinX = Math.sin(radX)
        const cosY = Math.cos(radY), sinY = Math.sin(radY)
        const cosZ = Math.cos(radZ), sinZ = Math.sin(radZ)

        // 1. Rotate around X axis
        const y1 = this.origY * cosX - this.origZ * sinX
        const z1 = this.origY * sinX + this.origZ * cosX

        // 2. Rotate around Y axis
        const x2 = this.origX * cosY + z1 * sinY
        const z2 = -this.origX * sinY + z1 * cosY

        // 3. Rotate around Z axis
        const x3 = x2 * cosZ - y1 * sinZ
        const y3 = x2 * sinZ + y1 * cosZ

        this.x = x3
        this.y = y3
        this.z = z2
      }
    }

    // 1. Generate primary rotating 3D Sphere vertices (Top Right)
    const spherePoints: Point3D[] = []
    const sphereRadius = 245
    const rings = 10 // slightly more segments for details
    const segments = 16

    for (let i = 0; i < rings; i++) {
      const theta = (i * Math.PI) / (rings - 1)
      const sinTheta = Math.sin(theta)
      const cosTheta = Math.cos(theta)

      for (let j = 0; j < segments; j++) {
        const phi = (j * 2 * Math.PI) / segments
        const sinPhi = Math.sin(phi)
        const cosPhi = Math.cos(phi)

        const x = sphereRadius * sinTheta * cosPhi
        const y = sphereRadius * sinTheta * sinPhi
        const z = sphereRadius * cosTheta
        spherePoints.push(new Point3D(x, y, z))
      }
    }

    // 2. Generate a secondary floating 3D Dodecahedron (Bottom Left)
    const shapePoints: Point3D[] = []
    const t = (1 + Math.sqrt(5)) / 2
    const size = 125
    const rawVertices = [
      [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1],
      [1, -1, -1], [1, -1, 1], [1, 1, -1], [1, 1, 1],
      [0, -1/t, -t], [0, -1/t, t], [0, 1/t, -t], [0, 1/t, t],
      [-1/t, -t, 0], [-1/t, t, 0], [1/t, -t, 0], [1/t, t, 0],
      [-t, 0, -1/t], [t, 0, -1/t], [-t, 0, 1/t], [t, 0, 1/t]
    ]
    rawVertices.forEach(([vx, vy, vz]) => {
      shapePoints.push(new Point3D(vx * size, vy * size, vz * size))
    })

    // 3. Floating orbiting satellites around the sphere to look futuristic
    const satellites: { point: Point3D; orbitRadius: number; orbitSpeed: number; orbitPhase: number }[] = []
    for (let i = 0; i < 5; i++) {
      const orbitRadius = sphereRadius + 40 + Math.random() * 50
      const orbitSpeed = 0.6 + Math.random() * 1.2
      const orbitPhase = Math.random() * Math.PI * 2
      satellites.push({
        point: new Point3D(0, 0, 0),
        orbitRadius,
        orbitSpeed,
        orbitPhase
      })
    }

    let angleX = 0
    let angleY = 0
    let tick = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      tick += 1

      // Ease parallax displacement
      currentOffsetX += (targetOffsetX - currentOffsetX) * 0.08
      currentOffsetY += (targetOffsetY - currentOffsetY) * 0.08

      // Slow compound rotations
      angleX += 0.06
      angleY += 0.09

      // Projection mapping positions with mouse parallax
      const sphereCX = width * 0.85 + currentOffsetX
      const sphereCY = 320 + currentOffsetY
      const shapeCX = width * 0.12 - currentOffsetX
      const shapeCY = Math.min(height - 400, 1600) - currentOffsetY
      const fov = 450

      // ── RENDER 1: 3D SPHERE ──
      // Rotate all sphere points
      spherePoints.forEach(p => {
        p.rotate(angleX * 0.5, angleY * 0.5, angleX * 0.2)
      })

      ctx.strokeStyle = "rgba(99, 102, 241, 0.07)" // higher opacity, beautiful indigo wireframe
      ctx.lineWidth = 0.65

      for (let i = 0; i < rings; i++) {
        for (let j = 0; j < segments; j++) {
          const idx1 = i * segments + j
          const idx2 = i * segments + ((j + 1) % segments)
          const idx3 = ((i + 1) % rings) * segments + j

          const p1 = spherePoints[idx1]
          const scale1 = fov / (fov + p1.z)
          const sx1 = p1.x * scale1 + sphereCX
          const sy1 = p1.y * scale1 + sphereCY

          const p2 = spherePoints[idx2]
          const scale2 = fov / (fov + p2.z)
          const sx2 = p2.x * scale2 + sphereCX
          const sy2 = p2.y * scale2 + sphereCY

          ctx.beginPath()
          ctx.moveTo(sx1, sy1)
          ctx.lineTo(sx2, sy2)
          ctx.stroke()

          if (i < rings - 1) {
            const p3 = spherePoints[idx3]
            const scale3 = fov / (fov + p3.z)
            const sx3 = p3.x * scale3 + sphereCX
            const sy3 = p3.y * scale3 + sphereCY

            ctx.beginPath()
            ctx.moveTo(sx1, sy1)
            ctx.lineTo(sx3, sy3)
            ctx.stroke()
          }
        }
      }

      // Draw equatorial ring highlighted
      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)" // glowing blue equator
      ctx.lineWidth = 1.2
      ctx.beginPath()
      const midRingIdx = Math.floor(rings / 2)
      for (let j = 0; j <= segments; j++) {
        const idx = midRingIdx * segments + (j % segments)
        const p = spherePoints[idx]
        const scale = fov / (fov + p.z)
        const sx = p.x * scale + sphereCX
        const sy = p.y * scale + sphereCY
        if (j === 0) ctx.moveTo(sx, sy)
        else ctx.lineTo(sx, sy)
      }
      ctx.stroke()

      // ── RENDER SATELLITES ──
      satellites.forEach((sat, sIdx) => {
        // Orbit math
        const angle = (tick * sat.orbitSpeed * Math.PI) / 360 + sat.orbitPhase
        // Position point relative to origin
        sat.point.origX = sat.orbitRadius * Math.cos(angle)
        sat.point.origY = sat.orbitRadius * Math.sin(angle) * 0.45 // elliptical slant
        sat.point.origZ = sat.orbitRadius * Math.sin(angle) * 0.85

        // Compounded rotation matches the sphere
        sat.point.rotate(angleX * 0.5, angleY * 0.5, angleX * 0.2)

        const scale = fov / (fov + sat.point.z)
        const sx = sat.point.x * scale + sphereCX
        const sy = sat.point.y * scale + sphereCY

        // Draw small glowing satellite dot
        ctx.fillStyle = sIdx % 2 === 0 ? "rgba(99, 102, 241, 0.35)" : "rgba(59, 130, 246, 0.35)"
        ctx.beginPath()
        ctx.arc(sx, sy, 3.5, 0, 2 * Math.PI)
        ctx.fill()
      })

      // ── RENDER 2: 3D DODECAHEDRON ──
      shapePoints.forEach(p => {
        p.rotate(-angleX * 0.7, angleY * 0.7, -angleY * 0.3)
      })

      ctx.strokeStyle = "rgba(59, 130, 246, 0.075)" // subtle blue wireframe
      ctx.beginPath()
      for (let i = 0; i < shapePoints.length; i++) {
        const p1 = shapePoints[i]
        const scale1 = fov / (fov + p1.z)
        const sx1 = p1.x * scale1 + shapeCX
        const sy1 = p1.y * scale1 + shapeCY

        for (let j = i + 1; j < shapePoints.length; j++) {
          const p2 = shapePoints[j]
          const dx = p1.origX - p2.origX
          const dy = p1.origY - p2.origY
          const dz = p1.origZ - p2.origZ
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < size * 1.8) {
            const scale2 = fov / (fov + p2.z)
            const sx2 = p2.x * scale2 + shapeCX
            const sy2 = p2.y * scale2 + shapeCY

            ctx.moveTo(sx1, sy1)
            ctx.lineTo(sx2, sy2)
          }
        }
      }
      ctx.stroke()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        window.innerHeight
      )
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleResize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none -z-20 opacity-100"
    />
  )
}
