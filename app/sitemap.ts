import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://nuroverseas.com";
const lastModified = new Date("2026-11-18");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/terms-and-conditions/`, lastModified, priority: 0.3 },
    { url: `${base}/user-agreement/`, lastModified, priority: 0.3 },
  ];
}
