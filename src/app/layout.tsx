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
    default: "SkillForge Tech | Enterprise Software & AI",
    template: "%s | SkillForge Tech"
  },
  description: "SkillForge Technology is a global software agency building custom enterprise software, cloud platforms, IoT systems, and AI solutions.",
  keywords: [
    "Enterprise Software Development",
    "Digital Transformation Company",
    "SaaS Product Engineering",
    "Custom AI Agent Development",
    "Industrial IoT & Embedded Systems",
    "Premium Web Development Agency",
    "Global Software Consulting"
  ],
  authors: [{ name: "SkillForge Technology" }],
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
    title: "SkillForge Technology | Enterprise Software & AI",
    description: "Premium software development, AI agent deployment, IoT engineering, and digital transformation services globally.",
    url: "https://skillforgetechnology.app",
    siteName: "SkillForge Technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SkillForge Technology Showcase"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillForge Technology | Premium Global Software Engineering",
    description: "Enterprise software, cloud migrations, AI integrations, and industrial IoT solutions worldwide.",
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
