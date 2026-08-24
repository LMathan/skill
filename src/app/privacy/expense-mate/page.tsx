import { Metadata } from "next"
import ExpenseMatePrivacyContent from "./ExpenseMatePrivacyContent"

export const metadata: Metadata = {
  title: "ExpenseMate Privacy Policy | SkillForge Technologies",
  description: "Official Privacy Policy and Data Security Disclosures for the ExpenseMate Mobile Application. Learn about TLS encryption, local biometric vaults, and account deletion rights.",
  keywords: [
    "ExpenseMate Privacy Policy",
    "ExpenseMate Data Security",
    "SkillForge Technologies Privacy",
    "ExpenseMate Account Deletion"
  ],
  alternates: {
    canonical: "https://skillforgetechnology.app/privacy/expense-mate"
  },
  openGraph: {
    title: "ExpenseMate Privacy Policy | SkillForge Technologies",
    description: "Official Privacy Policy and Data Security Guidelines for the ExpenseMate Mobile Application.",
    url: "https://skillforgetechnology.app/privacy/expense-mate",
    siteName: "SkillForge Technologies",
    type: "website"
  }
}

export default function ExpenseMatePrivacyPage() {
  return <ExpenseMatePrivacyContent />
}
