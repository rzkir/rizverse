const SITEMAP_API_URL = `${process.env.NEXT_PUBLIC_API as string}/sitemap`;

function escapeXml(unsafe?: string): string {
  const s = String(unsafe ?? "");
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function fetchSitemapData(): Promise<SitemapData> {
  try {
    const response = await fetch(SITEMAP_API_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap data: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sitemap data from API:", error);
    // Fallback to basic routes if API fails
    const now = new Date().toISOString();
    return {
      generatedAt: now,
      baseUrl: "https://rizverse.my.id",
      routes: [
        {
          loc: "https://rizverse.my.id/",
          lastmod: now,
          changefreq: "daily",
          priority: 1,
        },
        {
          loc: "https://rizverse.my.id/download",
          lastmod: now,
          changefreq: "weekly",
          priority: 0.8,
        },
      ],
    };
  }
}

export function generateSitemapXml(data: SitemapData): string {
  const urlsXml = data.routes
    .map((r) => {
      return `\n  <url>\n    <loc>${escapeXml(
        r.loc
      )}</loc>\n    <lastmod>${escapeXml(
        r.lastmod
      )}</lastmod>\n    <changefreq>${escapeXml(
        r.changefreq
      )}</changefreq>\n    <priority>${r.priority.toFixed(
        1
      )}</priority>\n  </url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsXml}\n</urlset>`;
}
