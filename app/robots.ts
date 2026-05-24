import { MetadataRoute } from "next";
import { siteData } from "./lib/siteData";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteData.domain;
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
