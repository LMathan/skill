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
    // Detect mobile or touch devices — NEVER hijack native touch momentum scrolling
    const isTouchOrMobile =
      typeof window !== "undefined" &&
      (window.innerWidth < 1024 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0)

    if (isTouchOrMobile) {
      // Provide safe fallback interface
      window.__lenis = {
        stop: () => {},
        start: () => {},
        scrollTo: (target: number | string | HTMLElement) => {
          if (typeof target === "number") {
            window.scrollTo({ top: target, behavior: "smooth" })
          } else if (typeof target === "string") {
            const el = document.querySelector(target)
            el?.scrollIntoView({ behavior: "smooth" })
          } else if (target instanceof HTMLElement) {
            target.scrollIntoView({ behavior: "smooth" })
          }
        },
      } as unknown as Lenis
      return () => {
        window.__lenis = undefined
      }
    }

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0, // Never hijack touch
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
