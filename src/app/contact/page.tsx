import { Metadata } from "next"
import ContactContent from "./ContactContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Contact Us | Project Inquiries & Support",
  description: "Reach out to SkillForge Technology. Submit project inquiries, send reviews, or locate our electronics design center in Perundurai, Erode.",
  keywords: [
    "Contact SkillForge Erode",
    "Project inquiries",
    "Submit electronics project feedback",
    "Erode project center address",
    "SkillForge WhatsApp support"
  ],
  path: "/contact"
})

export default function ContactPage() {
  return <ContactContent />
}
