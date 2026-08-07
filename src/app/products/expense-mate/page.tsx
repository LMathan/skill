import { Metadata } from "next"
import ExpenseMateProductContent from "./ExpenseMateProductContent"

export const metadata: Metadata = {
  title: "ExpenseMate — Personal Finance & Group Bill Split App | SkillForge Technology",
  description: "Manage daily personal expenses, track budget limits, analyze visual spending charts, and split group bills effortlessly with ExpenseMate by SkillForge Technology.",
  keywords: [
    "ExpenseMate",
    "ExpenseMate App",
    "Personal Finance App",
    "Group Expense Splitter",
    "Bill Splitter App",
    "Flutter Expense Tracker",
    "SkillForge Technology Products"
  ],
  openGraph: {
    title: "ExpenseMate — Personal Finance & Group Split",
    description: "Take complete control of your financial life. Track personal expenses and split group bills effortlessly.",
    url: "https://skillforgetechnology.app/products/expense-mate",
    siteName: "SkillForge Technology",
    locale: "en_US",
    type: "website"
  }
}

export default function ExpenseMateProductPage() {
  return <ExpenseMateProductContent />
}
