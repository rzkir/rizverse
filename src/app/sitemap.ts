import type { MetadataRoute } from "next";

import { fetchSitemapData } from "@/utils/FetchSitemap";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const data = await fetchSitemapData();

    return data.routes.map((route) => ({
      url: route.loc,
      lastModified: new Date(route.lastmod),
      changeFrequency: route.changefreq,
      priority: route.priority,
    }));
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
