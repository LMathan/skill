"use client"

import React, { createContext, useContext, useEffect } from "react"
import { translations, TranslationKey } from "@/data/translations"

export type Locale = "en"

interface LanguageContextProps {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const locale: Locale = "en"
  const setLocale = () => {}
  const isRTL = false

  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute("lang", "en")
    root.setAttribute("dir", "ltr")
  }, [])

  const t = (key: TranslationKey): string => {
    const keys = key.split(".")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = translations["en"]
    
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k]
      } else {
        return key
      }
    }
    return typeof current === "string" ? current : key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLanguage must be used inside a LanguageProvider")
  return context
}

export default LanguageProvider
