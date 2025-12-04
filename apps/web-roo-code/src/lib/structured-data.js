import { SEO } from "./seo"
import { EXTERNAL_LINKS } from "./constants"
/**
 * Generates the complete JSON-LD structured data for SEO
 *
 * This includes:
 * - Organization schema (brand identity, logo, social profiles)
 * - WebSite schema (site name for Google Search)
 * - SoftwareApplication schema (VS Code extension metadata)
 *
 * @returns Complete structured data object ready for JSON-LD injection
 */
export function getStructuredData() {
	// Organization ID - used to link all entities
	const orgId = `${SEO.url}#org`
	const organization = {
		"@type": "Organization",
		"@id": orgId,
		name: SEO.name,
		url: SEO.url,
		logo: {
			"@type": "ImageObject",
			url: `${SEO.url}/android-chrome-512x512.png`,
			width: 512,
			height: 512,
		},
		alternateName: ["RooCode"],
		sameAs: [
			EXTERNAL_LINKS.GITHUB,
			EXTERNAL_LINKS.MARKETPLACE,
			EXTERNAL_LINKS.X,
			EXTERNAL_LINKS.LINKEDIN,
			EXTERNAL_LINKS.REDDIT,
			EXTERNAL_LINKS.DISCORD,
			EXTERNAL_LINKS.YOUTUBE,
		],
	}
	const website = {
		"@type": "WebSite",
		"@id": `${SEO.url}#website`,
		url: SEO.url,
		name: SEO.name,
		alternateName: ["RooCode"],
		publisher: { "@id": orgId },
	}
	const softwareApplication = {
		"@type": "SoftwareApplication",
		"@id": `${SEO.url}#vscode-extension`,
		name: "Roo Code (VS Code extension)",
		applicationCategory: "DeveloperApplication",
		operatingSystem: "Windows, macOS, Linux",
		url: SEO.url,
		downloadUrl: EXTERNAL_LINKS.MARKETPLACE,
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		isAccessibleForFree: true,
		publisher: { "@id": orgId },
	}
	return {
		"@context": "https://schema.org",
		"@graph": [organization, website, softwareApplication],
	}
}
