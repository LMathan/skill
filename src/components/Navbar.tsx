"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Rocket, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { motion } from "framer-motion"

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Reviews", path: "/reviews" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "glass-nav py-3 shadow-md" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="SkillForge Technology" className="h-12 md:h-14 w-auto" />
            </Link>
          </div>

          {/* Desktop Nav links */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.path
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`relative text-sm font-semibold transition-colors duration-200 hover:text-brand-cyan ${
                      isActive ? "text-brand-cyan" : "text-slate-650 dark:text-slate-300"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-brand-cyan rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-6">
              <Link href="/contact">
                <Button variant="gradient" className="font-semibold text-xs">
                  Discuss Project
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile controllers */}
          <div className="md:hidden flex items-center gap-3">
            {/* Mobile Sheet drawer */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl text-slate-700 dark:text-slate-300">
                  <Menu size={22} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex flex-col justify-between">
                <div className="mt-8 flex flex-col gap-6">
                  <SheetHeader>
                    <SheetTitle>Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.path
                      return (
                        <Link
                          key={link.name}
                          href={link.path}
                          onClick={() => setIsMobileOpen(false)}
                          className={`text-lg font-bold py-1.5 transition-colors ${
                            isActive ? "text-brand-cyan" : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {link.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
                <div className="pb-8">
                  <Link href="/contact" onClick={() => setIsMobileOpen(false)}>
                    <Button variant="gradient" className="w-full py-4 text-sm font-bold flex items-center justify-center gap-2">
                      <span>Discuss Project</span>
                      <Send size={14} />
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
