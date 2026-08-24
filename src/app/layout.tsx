import type { Metadata, Viewport } from "next"
import { Inter, Outfit } from "next/font/google"
import { ThemeProvider } from "@/context/ThemeContext"
import { LanguageProvider } from "@/context/LanguageContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingWidgets from "@/components/FloatingWidgets"
import AnimatedBackground from "@/components/AnimatedBackground"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "SkillForge Technologies | Software Engineering & Digital Transformation",
    template: "%s | SkillForge Technologies"
  },
  description: "SkillForge Technologies is a global software engineering and digital transformation partner delivering premium digital solutions, custom websites, AI systems, and enterprise web applications.",
  keywords: [
    "Software Engineering",
    "Digital Transformation",
    "Custom Web Applications",
    "Enterprise Software Development",
    "AI-Powered Solutions",
    "Business Automation Platforms",
    "SaaS Development",
    "SkillForge Technologies"
  ],
  authors: [{ name: "SkillForge Technologies" }],
  metadataBase: new URL("https://skillforgetechnology.app"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "SkillForge Technologies | Software Engineering & Digital Transformation",
    description: "Premium software engineering, custom enterprise web applications, AI systems, and digital transformation services globally.",
    url: "https://skillforgetechnology.app",
    siteName: "SkillForge Technologies",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SkillForge Technologies Showcase"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillForge Technologies | Premium Global Software Engineering",
    description: "Global software engineering and digital transformation partner delivering custom websites, AI systems, and enterprise web applications.",
    images: ["/og-image.png"],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen flex flex-col bg-white text-slate-900`}>
        <LanguageProvider>
          <ThemeProvider>
            {/* Global Animated Background */}
            <AnimatedBackground />

            {/* Header */}
            <Navbar />

            {/* Main Area */}
            <div className="flex-grow">
              {children}
            </div>

            {/* Footer */}
            <Footer />

            {/* Hover widgets */}
            <FloatingWidgets />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
