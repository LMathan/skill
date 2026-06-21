import { MetadataRoute } from "next"

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
    "/project-center-erode",
    "/project-center-salem",
    "/project-center-coimbatore",
    "/project-center-tiruppur",
    "/project-center-namakkal",
    "/project-center-karur"
  ]

  const allRoutes = [...baseRoutes, ...seoSlugs]

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : seoSlugs.includes(route) ? 0.9 : 0.8,
  }))
}
