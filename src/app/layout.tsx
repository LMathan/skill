import type { Metadata, Viewport } from "next"
import { Inter, Outfit } from "next/font/google"
import { ThemeProvider } from "@/context/ThemeContext"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import FloatingWidgets from "@/components/FloatingWidgets"
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
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: "SkillForge Technology | Premium Projects & Embedded Systems Lab",
    template: "%s | SkillForge Technology"
  },
  description: "SkillForge Technology is an electronics and IoT innovation lab specializing in engineering project mentoring, custom electronic prototyping, and intelligent software systems in Tamil Nadu.",
  keywords: [
    "Final Year Project Center",
    "Engineering Project Center",
    "IoT Project Center",
    "IEEE Project Center",
    "AI Project Center",
    "Embedded Systems Training",
    "Mini Project Center",
    "Final Year Projects Tamil Nadu",
    "Engineering Projects Erode",
    "SkillForge Technology"
  ],
  authors: [{ name: "SkillForge Technology" }],
  metadataBase: new URL("https://skillforgetechnology.app"),
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "SkillForge Technology | Premium Projects & Embedded Lab",
    description: "Upgrade your engineering journey with certified project prototypes in IoT, Embedded Systems, and AI. Serving Tamil Nadu and startups.",
    url: "https://skillforgetechnology.app",
    siteName: "SkillForge Technology",
    images: [
      {
        url: "/og-image.jpg",
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
    title: "SkillForge Technology | Engineering Prototyping",
    description: "Certified projects and internships in IoT, AI/ML, and Robotics.",
    images: ["/og-image.jpg"],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans min-h-screen flex flex-col`}>
        <ThemeProvider>
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
      </body>
    </html>
  )
}
