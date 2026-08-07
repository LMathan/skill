import { Metadata } from "next"
import ExpenseMatePrivacyContent from "./ExpenseMatePrivacyContent"

export const metadata: Metadata = {
  title: "ExpenseMate Privacy Policy | SkillForge Technology",
  description: "Official Privacy Policy and Data Security Guidelines for the ExpenseMate Mobile Application on Google Play Store.",
}

export default function ExpenseMatePrivacyPage() {
  return <ExpenseMatePrivacyContent />
}
