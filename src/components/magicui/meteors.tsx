"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function Meteors({
  number = 20,
  className,
}: {
  number?: number
  className?: string
}) {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>([])

  useEffect(() => {
    const styles = Array.from({ length: number }).map(() => ({
      top: Math.floor(Math.random() * -20) + "px",
      left: Math.floor(Math.random() * 800) + "px",
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
    }))
    setMeteorStyles(styles)
  }, [number])

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
