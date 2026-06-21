"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SheetContextProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextProps | undefined>(undefined)

export const Sheet = ({ children, open, onOpenChange }: { children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const isControlled = open !== undefined
  
  const currentOpen = isControlled ? open : internalOpen
  const setOpen = (val: boolean) => {
    if (onOpenChange) onOpenChange(val)
    if (!isControlled) setInternalOpen(val)
  }

  return (
    <SheetContext.Provider value={{ open: currentOpen, setOpen }}>
      {children}
    </SheetContext.Provider>
  )
}

export const SheetTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) => {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error("SheetTrigger must be used inside Sheet")

  const handleClick = () => {
    context.setOpen(true)
  }

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleClick } as any)
  }

  return <button onClick={handleClick}>{children}</button>
}

export const SheetContent = ({ children, className, side = "right" }: { children: React.ReactNode; className?: string; side?: "left" | "right" | "top" | "bottom" }) => {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error("SheetContent must be used inside Sheet")

  React.useEffect(() => {
    if (context.open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [context.open])

  const placement = {
    left: { x: "-100%", y: 0, top: 0, bottom: 0, left: 0, width: "75%", maxWidth: "380px" },
    right: { x: "100%", y: 0, top: 0, bottom: 0, right: 0, width: "75%", maxWidth: "380px" },
    top: { x: 0, y: "-100%", top: 0, left: 0, right: 0, height: "300px" },
    bottom: { x: 0, y: "100%", bottom: 0, left: 0, right: 0, height: "300px" }
  }[side]

  return (
    <AnimatePresence>
      {context.open && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => context.setOpen(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ ...placement }}
            animate={{ x: 0, y: 0 }}
            exit={{ ...placement }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 shadow-2xl z-55 flex flex-col justify-between border-l border-slate-200 dark:border-slate-800",
              className
            )}
            style={{
              top: side !== "bottom" ? 0 : undefined,
              bottom: side !== "top" ? 0 : undefined,
              left: side === "left" || side === "top" || side === "bottom" ? 0 : undefined,
              right: side === "right" || side === "top" || side === "bottom" ? 0 : undefined,
              width: side === "left" || side === "right" ? "75%" : "100%",
              maxWidth: side === "left" || side === "right" ? "380px" : undefined,
              height: side === "top" || side === "bottom" ? "350px" : "100%"
            }}
          >
            {children}
            {/* Close trigger button */}
            <button
              onClick={() => context.setOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 mb-6 text-left", className)} {...props} />
)
SheetHeader.displayName = "SheetHeader"

export const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-bold font-display text-slate-950 dark:text-white", className)} {...props} />
  )
)
SheetTitle.displayName = "SheetTitle"

export const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-slate-500 dark:text-slate-400", className)} {...props} />
  )
)
SheetDescription.displayName = "SheetDescription"
