import { redirect } from "next/navigation"

// Precompile pages at build time
export async function generateStaticParams() {
  return [
    { slug: "final-year-project-center-erode" },
    { slug: "iot-project-center-erode" },
    { slug: "ieee-project-center-erode" },
    { slug: "embedded-project-center-erode" },
    { slug: "ai-project-center-erode" },
    { slug: "internship-training-erode" },
    { slug: "project-center-erode" }
  ]
}

export default async function SEOPage() {
  // Redirect legacy local project center traffic to the new premium global homepage
  redirect("/")
}
