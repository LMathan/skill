"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface ThemeContextProps {
  theme: string
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const initialTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    setTheme(initialTheme)

    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(initialTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    localStorage.setItem("theme", nextTheme)

    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(nextTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used inside a ThemeProvider")
  return context
}
export default ThemeProvider
