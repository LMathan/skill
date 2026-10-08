"use client"

import React, { useMemo } from "react"
import { cn } from "@/lib/utils"

/**
 * Meteor positions are generated once per mount with a lazy initializer.
 * Math.random() in a lazy state initializer still differs between server and
 * client, but the component only renders spans after mount results exist…
 * actually, to be hydration-safe we use a deterministic PRNG seeded per
 * instance so server and client render identical HTML.
 */
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function Meteors({
  number = 20,
  className,
}: {
  number?: number
  className?: string
}) {
  const meteorStyles = useMemo(
    () =>
      Array.from({ length: number }).map((_, i) => {
        // Deterministic per-index seed: identical output on server & client,
        // different instances still vary via the count prop.
        const rand = mulberry32(42 + i * 7919)
        return {
          top: Math.floor(rand() * -20) + "px",
          left: Math.floor(rand() * 800) + "px",
          animationDelay: rand() * (0.8 - 0.2) + 0.2 + "s",
          animationDuration: Math.floor(rand() * (10 - 2) + 2) + "s",
        }
      }),
    [number]
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-400 shadow-[0_0_0_1px_rgba(255,255,255,0.1)] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-slate-400 before:to-transparent",
            className
          )}
          style={style}
        />
      ))}
    </div>
  )
}
export default Meteors
