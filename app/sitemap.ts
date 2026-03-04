import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://career-finders.vercel.app").replace(
    /\/+$/,
    ""
  )

  const routes: string[] = [
    "/",
    "/careers",
    "/colleges",
    "/compare",
    "/dashboard",
    "/quiz",
    "/salary-calculator",
    "/scholarships",
  ]

  const now = new Date()

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1.0 : 0.8,
  }))
}
