"use client"

import React, { useEffect } from "react"
import Lenis from "lenis"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Expose Lenis globally so other components can stop/start it
declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
    })

    window.__lenis = lenis
    lenis.on("scroll", ScrollTrigger.update)

    let reqId: number

    function raf(time: number) {
      lenis.raf(time)
      reqId = requestAnimationFrame(raf)
    }

    reqId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(reqId)
      window.__lenis = undefined
      lenis.destroy()
    }
  }, [])

  return <div className="smooth-scroll-wrapper">{children}</div>
}
