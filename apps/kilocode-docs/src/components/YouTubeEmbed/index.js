"use strict"
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				var desc = Object.getOwnPropertyDescriptor(m, k)
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k]
						},
					}
				}
				Object.defineProperty(o, k2, desc)
			}
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				o[k2] = m[k]
			})
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", { enumerable: true, value: v })
			}
		: function (o, v) {
				o["default"] = v
			})
var __importStar =
	(this && this.__importStar) ||
	(function () {
		var ownKeys = function (o) {
			ownKeys =
				Object.getOwnPropertyNames ||
				function (o) {
					var ar = []
					for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k
					return ar
				}
			return ownKeys(o)
		}
		return function (mod) {
			if (mod && mod.__esModule) return mod
			var result = {}
			if (mod != null)
				for (var k = ownKeys(mod), i = 0; i < k.length; i++)
					if (k[i] !== "default") __createBinding(result, mod, k[i])
			__setModuleDefault(result, mod)
			return result
		}
	})()
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod }
	}
Object.defineProperty(exports, "__esModule", { value: true })
exports.default = YouTubeEmbed
const react_1 = __importStar(require("react"))
const styles_module_css_1 = __importDefault(require("./styles.module.css"))
/**
 * Error that occurs when a YouTube video ID cannot be extracted
 */
class YouTubeExtractError extends Error {
	constructor(url) {
		super(`Could not extract YouTube video ID from: ${url}`)
		this.name = "YouTubeExtractError"
	}
}
/**
 * Extracts the YouTube video ID from a URL or returns the ID if already provided
 * @param {string} urlOrId - YouTube URL or video ID
 * @returns {string | null} YouTube video ID or null if extraction fails
 */
const extractVideoId = (urlOrId) => {
	// Trim whitespace
	const trimmedUrl = urlOrId.trim()
	// If empty, return null
	if (!trimmedUrl) {
		return null
	}
	// If it's just the ID (no slashes or dots)
	if (!/[\/.]/.test(trimmedUrl) && /^[a-zA-Z0-9_-]{11}$/.test(trimmedUrl)) {
		return trimmedUrl
	}
	// Extract from various YouTube URL formats
	const regexPatterns = [
		/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
		/youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
		/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
	]
	for (const regex of regexPatterns) {
		const match = trimmedUrl.match(regex)
		if (match && match[1]) {
			return match[1]
		}
	}
	// If no pattern matches, return null
	return null
}
/**
 * Builds the YouTube embed URL with parameters
 * @param {string} videoId - YouTube video ID
 * @param {YouTubeEmbedParams} params - Embed parameters
 * @returns {string} Complete embed URL
 */
const buildEmbedUrl = (videoId, params = {}) => {
	// Start with base URL
	const baseUrl = params.privacy
		? `https://www.youtube-nocookie.com/embed/${videoId}`
		: `https://www.youtube.com/embed/${videoId}`
	// Default parameters
	const defaultParams = {
		rel: 0,
		modestbranding: 1,
		controls: 1,
	}
	// Merge default and custom parameters
	const mergedParams = { ...defaultParams, ...params }
	// Convert parameters to URL query string
	const queryParams = Object.entries(mergedParams)
		.map(([key, value]) => `${key}=${value}`)
		.join("&")
	return `${baseUrl}?${queryParams}`
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
function YouTubeEmbed({ url, caption, title = "YouTube video player", embedParams = {}, onError, onLoad }) {
	// State for loading and error handling
	const [isLoading, setIsLoading] = (0, react_1.useState)(true)
	const [error, setError] = (0, react_1.useState)(null)
	// Extract video ID with memoization to prevent unnecessary processing
	const videoId = (0, react_1.useMemo)(() => {
		try {
			const id = extractVideoId(url)
			if (!id) {
				throw new YouTubeExtractError(url)
			}
			return id
		} catch (err) {
			const error = err instanceof Error ? err : new Error(String(err))
			setError(error)
			onError?.(error)
			return null
		}
	}, [url, onError])
	// Build embed URL with memoization
	const embedUrl = (0, react_1.useMemo)(() => {
		if (!videoId) return ""
		return buildEmbedUrl(videoId, embedParams)
	}, [videoId, embedParams])
	// Handle iframe load event
	const handleIframeLoad = (0, react_1.useCallback)(() => {
		setIsLoading(false)
		onLoad?.()
	}, [onLoad])
	// Handle iframe error event
	const handleIframeError = (0, react_1.useCallback)(() => {
		const loadError = new Error(`Failed to load YouTube video: ${url}`)
		setError(loadError)
		onError?.(loadError)
	}, [url, onError])
	// Reset loading state when URL changes
	;(0, react_1.useEffect)(() => {
		setIsLoading(true)
		setError(null)
	}, [url])
	// If there's an error, show error UI
	if (error) {
		return (
			<div className={styles_module_css_1.default.youtubeWrapper}>
				<div className={styles_module_css_1.default.errorContainer}>
					<div className={styles_module_css_1.default.errorIcon}>⚠️</div>
					<p>Failed to load YouTube video</p>
					<p>{error.message}</p>
				</div>
				{caption && <div className={styles_module_css_1.default.caption}>{caption}</div>}
			</div>
		)
	}
	return (
		<div className={styles_module_css_1.default.youtubeWrapper}>
			<div className={styles_module_css_1.default.videoContainer}>
				{videoId && (
					<iframe
						className={`${styles_module_css_1.default.videoIframe} ${isLoading ? styles_module_css_1.default.loading : ""}`}
						src={embedUrl}
						title={title}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						loading="lazy"
						onLoad={handleIframeLoad}
						onError={handleIframeError}
						aria-labelledby={caption ? `youtube-caption-${videoId}` : undefined}
					/>
				)}
			</div>
			{caption && (
				<div
					className={styles_module_css_1.default.caption}
					id={videoId ? `youtube-caption-${videoId}` : undefined}>
					{caption}
				</div>
			)}
		</div>
	)
}
