import { Metadata } from "next"
import ExpenseMateProductContent from "./ExpenseMateProductContent"

export const metadata: Metadata = {
  title: "ExpenseMate — Smart Personal Finance & Group Bill Splitter App | SkillForge Technologies",
  description: "Master your money with ExpenseMate. Track daily personal expenses, split group bills with zero conflict, get real-time AI budget advice, and secure your wallet with biometric protection. 100% Ad-Free.",
  keywords: [
    "ExpenseMate",
    "ExpenseMate App",
    "Personal Finance App",
    "Group Bill Splitter",
    "Bill Splitter App",
    "Roommate Expense Tracker",
    "Best Splitwise Alternative",
    "Ad-Free Expense Tracker",
    "AI Budget Advisor",
    "Biometric Finance Vault",
    "Expense Tracker India",
    "SkillForge Technologies Products"
  ],
  alternates: {
    canonical: "https://skillforgetechnology.app/products/expense-mate"
  },
  openGraph: {
    title: "ExpenseMate — Smart Personal Finance & Group Bill Splitter App",
    description: "Master your money with ExpenseMate. Track daily personal expenses, split group bills effortlessly, get real-time AI budget guidance, and secure your wallet. 100% Ad-Free.",
    url: "https://skillforgetechnology.app/products/expense-mate",
    siteName: "SkillForge Technologies",
    images: [
      {
        url: "https://skillforgetechnology.app/Product/ExpenseMate/home-dashboard.jpg",
        width: 1200,
        height: 630,
        alt: "ExpenseMate Smart Personal Finance App"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ExpenseMate — Smart Personal Finance & Group Bill Splitter App",
    description: "Track daily expenses, split roommate bills effortlessly, and get AI financial advice. 100% Ad-Free.",
    images: ["https://skillforgetechnology.app/Product/ExpenseMate/home-dashboard.jpg"]
  }
}

// Google JSON-LD Rich Snippet Structured Data for SoftwareApplication
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ExpenseMate",
  "operatingSystem": "Android, iOS",
  "applicationCategory": "FinanceApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "128"
  },
  "description": "Smart personal budget manager and group bill splitter with AI financial advice and biometric vault protection.",
  "author": {
    "@type": "Organization",
    "name": "SkillForge Technologies",
    "url": "https://skillforgetechnology.app"
  }
}

export default function ExpenseMateProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ExpenseMateProductContent />
    </>
  )
}
