"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextProps {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextProps | undefined>(undefined)

export const Tabs = ({ children, defaultValue, value, onValueChange, className }: { children: React.ReactNode; defaultValue?: string; value?: string; onValueChange?: (val: string) => void; className?: string }) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const isControlled = value !== undefined
  
  const currentValue = isControlled ? value : internalValue
  const setValue = (val: string) => {
    if (onValueChange) onValueChange(val)
    if (!isControlled) setInternalValue(val)
  }

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: setValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export const TabsList = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("inline-flex h-11 items-center justify-center rounded-xl bg-secondary p-1 text-muted-foreground", className)}>
      {children}
    </div>
  )
}

export const TabsTrigger = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error("TabsTrigger must be used inside Tabs")

  const isActive = context.value === value

  return (
    <button
      type="button"
      onClick={() => context.onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-1.5 text-sm font-semibold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        isActive 
          ? "bg-card text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {children}
    </button>
  )
}

export const TabsContent = ({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) => {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error("TabsContent must be used inside Tabs")

  const isActive = context.value === value

  if (!isActive) return null

  return (
    <div className={cn("mt-4 focus-visible:outline-none", className)}>
      {children}
    </div>
  )
}
