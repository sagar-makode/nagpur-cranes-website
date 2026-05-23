import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nagpurcranes.com";

  // Base routes
  const routes = [
    "",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Crane dynamic routes
  let craneRoutes: any[] = [];
  try {
    const cranesPath = path.join(process.cwd(), "content", "cranes-data.json");
    const cranesData = JSON.parse(fs.readFileSync(cranesPath, "utf8"));
    craneRoutes = cranesData.map((crane: any) => ({
      url: `${baseUrl}/cranes/${crane.slug}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Error generating sitemap crane routes:", e);
  }

  // Blog dynamic routes
  let blogRoutes: any[] = [];
  try {
    const blogPath = path.join(process.cwd(), "content", "blog-posts.json");
    const blogData = JSON.parse(fs.readFileSync(blogPath, "utf8"));
    blogRoutes = blogData.map((post: any) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Error generating sitemap blog routes:", e);
  }

  return [...routes, ...craneRoutes, ...blogRoutes];
}
