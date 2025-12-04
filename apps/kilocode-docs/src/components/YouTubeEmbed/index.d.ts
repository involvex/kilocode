/**
 * YouTube embed parameters interface
 * @see https://developers.google.com/youtube/player_parameters
 */
interface YouTubeEmbedParams {
	/** Show related videos at the end (0 = no, 1 = yes) */
	rel?: 0 | 1
	/** Use YouTube's modest branding (0 = no, 1 = yes) */
	modestbranding?: 0 | 1
	/** Enable privacy-enhanced mode (0 = no, 1 = yes) */
	privacy?: 0 | 1
	/** Auto-play the video (0 = no, 1 = yes) */
	autoplay?: 0 | 1
	/** Show video controls (0 = no, 1 = yes) */
	controls?: 0 | 1
	/** Show video info (0 = no, 1 = yes) */
	showinfo?: 0 | 1
	/** Loop the video (0 = no, 1 = yes) */
	loop?: 0 | 1
	/** Start time in seconds */
	start?: number
	/** End time in seconds */
	end?: number
}
interface YouTubeEmbedProps {
	/**
	 * YouTube video URL or video ID
	 */
	url: string
	/**
	 * Optional caption to display below the video
	 */
	caption?: string
	/**
	 * Optional title for the iframe (for accessibility)
	 */
	title?: string
	/**
	 * Optional YouTube embed parameters
	 */
	embedParams?: YouTubeEmbedParams
	/**
	 * Optional callback for when the video fails to load
	 */
	onError?: (error: Error) => void
	/**
	 * Optional callback for when the video successfully loads
	 */
	onLoad?: () => void
}
/**
 * A responsive YouTube video embed component with enhanced features
 *
 * @example
 * // With video ID
 * <YouTubeEmbed url="dQw4w9WgXcQ" />
 *
 * @example
 * // With full YouTube URL and custom parameters
 * <YouTubeEmbed
 *   url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
 *   caption="Rick Astley - Never Gonna Give You Up"
 *   embedParams={{ autoplay: 1, start: 30 }}
 * />
 */
export default function YouTubeEmbed({
	url,
	caption,
	title,
	embedParams,
	onError,
	onLoad,
}: YouTubeEmbedProps): JSX.Element
export {}
//# sourceMappingURL=index.d.ts.map
