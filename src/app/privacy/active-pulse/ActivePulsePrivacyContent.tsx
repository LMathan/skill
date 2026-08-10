"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Shield, Lock, FileText, CheckCircle2, Smartphone, Mail, Wifi, Bluetooth, HardDrive, Radio, Download, Cpu } from "lucide-react"

export default function ActivePulsePrivacyContent() {
  const [activeSection, setActiveSection] = useState("intro")

  const sections = [
    { id: "intro", label: "Overview & Scope" },
    { id: "data-collection", label: "Data We Collect" },
    { id: "data-usage", label: "Wi-Fi & BLE Data Handling" },
    { id: "ota-updates", label: "OTA Firmware Updates" },
    { id: "permissions", label: "Required Device Permissions" },
    { id: "local-storage", label: "Local Data & Storage" },
    { id: "contact", label: "Contact Developer" }
  ]

  useEffect(() => {
    const handleScrollObserver = () => {
      const sectionIds = ["intro", "data-collection", "data-usage", "ota-updates", "permissions", "local-storage", "contact"]
      const scrollPosition = window.scrollY + 200

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScrollObserver, { passive: true })
    handleScrollObserver()
    return () => window.removeEventListener("scroll", handleScrollObserver)
  }, [])

  const handleScroll = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -120
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <div className="relative bg-slate-50/50 pt-28 pb-24 text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-4">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
          <span>/</span>
          <span className="text-blue-600 font-bold">Active Pulse App</span>
        </div>

        {/* Header Block */}
        <div className="space-y-4 text-left max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs font-bold text-blue-700 font-mono">
            <div className="flex items-center gap-1">
              <Wifi size={13} />
              <Bluetooth size={13} />
              <Cpu size={13} />
            </div>
            <span>Hardware &amp; OTA Controller Privacy Policy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display text-slate-900 leading-tight">
            Active Pulse Privacy Policy
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            Effective Date: August 10, 2026. This Privacy Policy governs the Active Pulse mobile application (&quot;Active Pulse&quot;), developed and operated by SkillForge Technology.
          </p>
        </div>

        {/* Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Navigation Outline */}
          <div className="lg:col-span-4 sticky top-28 bg-white border border-slate-200/90 p-5 rounded-2xl shadow-sm hidden lg:block text-left">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
              <Shield size={16} className="text-blue-600 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">Document Outline</span>
            </div>

            <nav className="space-y-1 font-mono text-xs">
              {sections.map((sec) => {
                const isActive = activeSection === sec.id
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleScroll(sec.id)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <span>{sec.label}</span>
                    {isActive && <CheckCircle2 size={14} />}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Right Main Policy Content */}
          <div className="lg:col-span-8 bg-white border border-slate-200/90 p-6 sm:p-10 rounded-2xl shadow-sm text-left space-y-10">

            {/* Section 1: Intro */}
            <section id="intro" className="space-y-4 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                <span>1. Overview & Scope</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Active Pulse is a smart workspace controller and companion mobile application that pairs with your hardware via direct local Wi-Fi (REST API / WebSockets) or Bluetooth Low Energy (BLE). It allows users to manage anti-idle automation schedules, movement intervals, custom click modes, and Over-The-Air (OTA) firmware updates on their paired ESP32 hardware. We respect your privacy and adhere strictly to Google Play Developer Policies.
              </p>
            </section>

            {/* Section 2: Data We Collect */}
            <section id="data-collection" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Lock size={20} className="text-blue-600" />
                <span>2. Data We Collect</span>
              </h2>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900">A. Device Configuration &amp; Telemetry:</span>
                  <p className="mt-1">Active Pulse queries status parameters from connected hardware (such as firmware version, active automation configurations, BLE MAC addresses, and connection status) using local network pings or BLE status channels. This information is processed and displayed entirely locally on the mobile device.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900">B. User Preference Configurations:</span>
                  <p className="mt-1">Timer durations, automation status schedules, and device preset names are stored locally on your mobile device (via secure local shared preferences). We do not collect or log personal keystrokes, browsing history, location coordinates, or files.</p>
                </div>
              </div>
            </section>

            {/* Section 3: Wi-Fi & BLE Data Handling */}
            <section id="data-usage" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Wifi size={20} className="text-blue-600" />
                <span>3. Local Wi-Fi &amp; Bluetooth Data Handling</span>
              </h2>
              <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm leading-relaxed">
                <li>Wi-Fi communications occur directly between your mobile phone and the Active Pulse hardware access point (default gateway: <code>192.168.4.1</code>) over local HTTP REST API endpoints and WebSockets.</li>
                <li>Bluetooth communications occur over direct point-to-point BLE channels paired with the hardware module.</li>
                <li>No remote cloud servers, database backups, or third-party tracking services are used.</li>
                <li><strong>We do not sell, track, or share your local device configuration telemetry with third-party advertisers.</strong></li>
              </ul>
            </section>

            {/* Section 4: OTA Firmware Updates */}
            <section id="ota-updates" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Download size={20} className="text-blue-600" />
                <span>4. Over-The-Air (OTA) Firmware Updates</span>
              </h2>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  Active Pulse includes support for Over-The-Air (OTA) firmware maintenance, allowing users to upgrade their paired ESP32 hardware device with performance improvements and bug fixes:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Firmware binary packages (<code>.bin</code>) are transferred directly to the hardware over local Wi-Fi or secure HTTPS channels from SkillForge Technology release mirrors.</li>
                  <li>During OTA update flashing, only hardware health parameters (current firmware version string, chip model, and binary transfer byte counts) are processed.</li>
                  <li>No personal user information, private network credentials, or phone files are accessed, read, or modified during the OTA flashing process.</li>
                </ul>
              </div>
            </section>

            {/* Section 5: Required Permissions */}
            <section id="permissions" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Smartphone size={20} className="text-blue-600" />
                <span>5. Required Device Permissions</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-900 text-xs font-sans flex items-center gap-1.5">
                    <Wifi size={15} className="text-blue-600" />
                    <span>INTERNET &amp; Wi-Fi State</span>
                  </div>
                  <div className="text-slate-500 font-sans text-[11px] leading-relaxed">
                    <code>INTERNET</code>, <code>ACCESS_WIFI_STATE</code>, <code>CHANGE_WIFI_STATE</code>: Required to discover, connect, send control configurations, and stream OTA updates directly to the hardware&apos;s local server (192.168.4.1).
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-900 text-xs font-sans flex items-center gap-1.5">
                    <Bluetooth size={15} className="text-blue-600" />
                    <span>BLUETOOTH / BLE</span>
                  </div>
                  <div className="text-slate-500 font-sans text-[11px] leading-relaxed">
                    <code>BLUETOOTH_SCAN</code>, <code>BLUETOOTH_CONNECT</code>: Required to discover and establish direct point-to-point BLE connections with Active Pulse hardware.
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-bold text-slate-900 text-xs font-sans flex items-center gap-1.5">
                    <Radio size={15} className="text-blue-600" />
                    <span>Location Services (Legacy Android)</span>
                  </div>
                  <div className="text-slate-500 font-sans text-[11px] leading-relaxed">
                    On legacy Android versions, Android OS requires location access permissions (<code>ACCESS_FINE_LOCATION</code> or <code>ACCESS_COARSE_LOCATION</code>) to scan for Wi-Fi SSIDs or BLE devices. Active Pulse processes this requirement solely to establish local connectivity and does not collect, store, or transmit your device&apos;s geographical location.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6: Local Data Storage & Account Policy */}
            <section id="local-storage" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <HardDrive size={20} className="text-blue-600" />
                <span>6. Local Data Storage &amp; Account Policy</span>
              </h2>
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-slate-700 text-sm space-y-2">
                <div className="font-bold text-blue-900">Offline &amp; Account-Free Design:</div>
                <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">
                  Active Pulse operates entirely offline. The application does not require user account registration, login credentials, or cloud server synchronization. All user preference settings and hardware configurations remain 100% stored on your local mobile device and can be erased instantly by clearing app storage in Android Settings or uninstalling the application.
                </p>
              </div>
            </section>

            {/* Section 7: Contact */}
            <section id="contact" className="space-y-4 border-t border-slate-100 pt-8 scroll-mt-32">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                <Mail size={20} className="text-blue-600" />
                <span>7. Developer Contact</span>
              </h2>
              <div className="text-slate-600 text-sm space-y-1 font-mono">
                <div><strong>Developer:</strong> SkillForge Technology</div>
                <div><strong>Email:</strong> support@skillforgetechnology.app</div>
                <div><strong>Website:</strong> https://skillforgetechnology.app</div>
              </div>
            </section>

          </div>

        </div>

      </div>
    </div>
  )
}
