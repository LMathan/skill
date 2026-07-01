"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { translations, TranslationKey } from "@/data/translations"

export type Locale = "en" | "de" | "fr" | "es" | "it" | "nl" | "ar" | "ja" | "ta" | "hi"

interface LanguageContextProps {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>("en")

  useEffect(() => {
    const savedLocale = localStorage.getItem("preferred-locale") as Locale
    if (savedLocale && ["en", "de", "fr", "es", "it", "nl", "ar", "ja", "ta", "hi"].includes(savedLocale)) {
      setTimeout(() => {
        setLocaleState(savedLocale)
      }, 0)
    }
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    root.setAttribute("lang", locale)
    if (locale === "ar") {
      root.setAttribute("dir", "rtl")
    } else {
      root.setAttribute("dir", "ltr")
    }
  }, [locale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("preferred-locale", newLocale)
  };

  const t = (key: TranslationKey): string => {
    const keys = key.split(".")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = translations[locale]
    
    for (const k of keys) {
      if (current && current[k] !== undefined) {
        current = current[k]
      } else {
        // Fallback to English
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let engFallback: any = translations["en"]
        for (const fallbackK of keys) {
          if (engFallback && engFallback[fallbackK] !== undefined) {
            engFallback = engFallback[fallbackK]
          } else {
            return key // Return key if not found
          }
        }
        return engFallback
      }
    }
    return typeof current === "string" ? current : key
  }

  const isRTL = locale === "ar"

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
