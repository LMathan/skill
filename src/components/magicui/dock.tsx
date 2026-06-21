"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface DockProps {
  className?: string
  children?: React.ReactNode
}

export function Dock({ className, children }: DockProps) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl border border-white/10 bg-white/70 dark:bg-slate-900/60 p-2.5 backdrop-blur-md shadow-xl",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { mouseX } as any)
        }
        return child
      })}
    </motion.div>
  )
}

export function DockIcon({
  children,
  className,
  mouseX,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  mouseX?: any
  onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform(mouseX || useMotionValue(Infinity), (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  // Width and height mapping based on cursor proximity
  const widthSize = useTransform(distance, [-150, 0, 150], [40, 56, 40])
  const heightSize = useTransform(distance, [-150, 0, 150], [40, 56, 40])

  const width = useSpring(widthSize, { mass: 0.1, stiffness: 150, damping: 12 })
  const height = useSpring(heightSize, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onClick={onClick}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 transition-colors shadow-sm",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
export default Dock
