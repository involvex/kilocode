/**
 * Generate a dynamic OpenGraph image URL
 * @param title - The title to display on the OG image
 * @param description - Optional description to display (will be truncated to ~140 chars)
 * @returns Absolute URL to the dynamic OG image endpoint
 */
export declare function ogImageUrl(title: string, description?: string): string
/**
 * Generate OpenGraph metadata for a page with dynamic image
 * @param title - The page title
 * @param description - The page description
 * @returns OpenGraph metadata object with dynamic image
 */
export declare function getOgMetadata(
	title: string,
	description: string,
): {
	title: string
	description: string
	images: {
		url: string
		width: number
		height: number
		alt: string
	}[]
}
/**
 * Generate Twitter metadata for a page with dynamic image
 * @param title - The page title
 * @param description - The page description
 * @returns Twitter metadata object with dynamic image
 */
export declare function getTwitterMetadata(
	title: string,
	description: string,
): {
	card: "summary_large_image"
	title: string
	description: string
	images: string[]
}
//# sourceMappingURL=og.d.ts.map
