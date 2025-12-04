import { SEO } from "@/lib/seo"
export default function robots() {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: `${SEO.url}/sitemap.xml`,
		host: SEO.url,
	}
}
