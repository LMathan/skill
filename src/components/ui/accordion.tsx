"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextProps {
  activeId: string | null
  toggleId: (id: string) => void
}

const AccordionContext = React.createContext<AccordionContextProps | undefined>(undefined)

export const Accordion = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  
  const toggleId = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id))
  }

  return (
    <AccordionContext.Provider value={{ activeId, toggleId }}>
      <div className={cn("space-y-3", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export const AccordionItem = ({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("rounded-2xl border bg-card/40 text-card-foreground overflow-hidden", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { id } as any)
        }
        return child
      })}
    </div>
  )
}

export const AccordionTrigger = ({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) => {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionTrigger must be used inside Accordion")
  
  const isOpen = context.activeId === id

  return (
    <button
      type="button"
      onClick={() => id && context.toggleId(id)}
      className={cn(
        "w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 dark:text-slate-100 hover:text-brand-cyan transition-colors",
        className
      )}
    >
      <span>{children}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="p-1 rounded-lg bg-secondary text-slate-500 shrink-0 ml-4"
      >
        <ChevronDown size={16} />
      </motion.span>
    </button>
  )
}

export const AccordionContent = ({ id, children, className }: { id?: string; children: React.ReactNode; className?: string }) => {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error("AccordionContent must be used inside Accordion")

  const isOpen = context.activeId === id

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <div className={cn("p-5 pt-0 text-sm text-muted-foreground leading-relaxed border-t border-border/50 bg-slate-50/10 dark:bg-slate-950/10", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
