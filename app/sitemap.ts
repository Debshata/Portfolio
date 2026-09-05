import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://debshata.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1
    }
  ];
}
