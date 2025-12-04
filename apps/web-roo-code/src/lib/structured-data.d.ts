/**
 * Type definitions for Schema.org structured data
 */
interface ImageObject {
	"@type": "ImageObject"
	url: string
	width: number
	height: number
}
interface Organization {
	"@type": "Organization"
	"@id": string
	name: string
	url: string
	logo: ImageObject
	alternateName: string[]
	sameAs: string[]
}
interface WebSite {
	"@type": "WebSite"
	"@id": string
	url: string
	name: string
	alternateName: string[]
	publisher: {
		"@id": string
	}
}
interface SoftwareApplication {
	"@type": "SoftwareApplication"
	"@id": string
	name: string
	applicationCategory: string
	operatingSystem: string
	url: string
	downloadUrl: string
	offers: {
		"@type": "Offer"
		price: string
		priceCurrency: string
	}
	isAccessibleForFree: boolean
	publisher: {
		"@id": string
	}
}
interface StructuredDataGraph {
	"@context": "https://schema.org"
	"@graph": [Organization, WebSite, SoftwareApplication]
}
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
export declare function getStructuredData(): StructuredDataGraph
/**
 * Type export for use in components
 */
export type { StructuredDataGraph }
//# sourceMappingURL=structured-data.d.ts.map
