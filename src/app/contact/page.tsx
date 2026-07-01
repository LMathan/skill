import { Metadata } from "next"
import ContactContent from "./ContactContent"
import { getSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = getSeoMetadata({
  title: "Contact Our Solutions Architects | SkillForge Technology",
  description: "Schedule a free 30-minute discovery call or submit your project scope to receive a transparent estimate. Connect with our architects at our Perundurai, Erode office in Tamil Nadu, India.",
  keywords: [
    "Contact Software Engineers",
    "Request Software Quote",
    "Schedule Technical Consultation",
    "Book Calendly Developer Call",
    "SkillForge WhatsApp Inquiry"
  ],
  path: "/contact"
})

export default function ContactPage() {
  return <ContactContent />
}
