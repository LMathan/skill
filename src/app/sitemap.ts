import { MetadataRoute } from "next"
import { blogData } from "@/data/siteData"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://skillforgetechnology.app"
  
  const baseRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/reviews",
    "/blog",
    "/contact"
  ]

  const seoSlugs = [
    "/final-year-project-center-erode",
    "/iot-project-center-erode",
    "/ieee-project-center-erode",
    "/embedded-project-center-erode",
    "/ai-project-center-erode",
    "/internship-training-erode",
    "/project-center-erode"
  ]

  const blogSlugs = blogData.map((blog) => `/blog/${blog.id}`)

  const allRoutes = [...baseRoutes, ...seoSlugs, ...blogSlugs]

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : seoSlugs.includes(route) ? 0.9 : route.startsWith("/blog/") ? 0.7 : 0.8,
  }))
}
