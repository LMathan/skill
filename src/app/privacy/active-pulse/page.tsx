import { Metadata } from "next"
import ActivePulsePrivacyContent from "./ActivePulsePrivacyContent"

export const metadata: Metadata = {
  title: "Active Pulse Privacy Policy | SkillForge Technologies",
  description: "Official Privacy Policy and Data Security Disclosures for the Active Pulse Workspace Companion Mobile Application on Google Play Store.",
  keywords: [
    "Active Pulse Privacy Policy",
    "Active Pulse App Security",
    "BLE Device Permissions",
    "SkillForge Technologies Privacy"
  ],
  alternates: {
    canonical: "https://skillforgetechnology.app/privacy/active-pulse"
  },
  openGraph: {
    title: "Active Pulse Privacy Policy | SkillForge Technologies",
    description: "Official Privacy Policy and Data Security Guidelines for the Active Pulse Mobile Application.",
    url: "https://skillforgetechnology.app/privacy/active-pulse",
    siteName: "SkillForge Technologies",
    type: "website"
  }
}

export default function ActivePulsePrivacyPage() {
  return <ActivePulsePrivacyContent />
}
