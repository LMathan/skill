import { MetadataRoute } from "next"
import { blogData } from "@/data/siteData"
import { agencyServices } from "@/data/agencyData"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://skillforgetechnology.app"
  
  const baseRoutes = [
    "",
    "/about",
    "/products",
    "/products/active-pulse",
    "/privacy/active-pulse",
    "/products/expense-mate",
    "/privacy/expense-mate",
    "/products/mavio",
    "/services",
    "/industries",
    "/technologies",
    "/portfolio",
    "/case-studies",
    "/careers",
    "/blog",
    "/contact"
  ]

  // Add the 12 service divisions dynamically
  const serviceSlugs = agencyServices.map((service) => `/services/${service.slug}`)

  // Add blog posts paths
  const blogSlugs = blogData.map((blog) => `/blog/${blog.id}`)

  const allRoutes = [...baseRoutes, ...serviceSlugs, ...blogSlugs]

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : serviceSlugs.includes(route) ? 0.9 : route.startsWith("/blog/") ? 0.7 : 0.8,
  }))
}
