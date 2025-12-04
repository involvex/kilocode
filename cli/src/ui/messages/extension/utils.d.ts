import type { ExtensionChatMessage } from "../../../types/messages.js"
import type { ToolData, McpServerData, FollowUpData, ApiReqInfo, ImageData } from "./types.js"
/**
 * Parse JSON from message text safely
 */
export declare function parseMessageJson<T = unknown>(text?: string): T | null
/**
 * Parse tool data from message
 */
export declare function parseToolData(message: ExtensionChatMessage): ToolData | null
/**
 * Type guard to check if an object is valid McpServerData
 * Uses Zod for validation
 */
export declare function isMcpServerData(obj: unknown): obj is McpServerData
/**
 * Parse MCP server data from message with Zod validation
 */
export declare function parseMcpServerData(message: ExtensionChatMessage): McpServerData | null
/**
 * Parse follow-up data from message
 * Checks both text and metadata fields
 */
export declare function parseFollowUpData(message: ExtensionChatMessage): FollowUpData | null
/**
 * Parse API request info from message
 */
export declare function parseApiReqInfo(message: ExtensionChatMessage): ApiReqInfo | null
/**
 * Parse image data from message
 */
export declare function parseImageData(message: ExtensionChatMessage): ImageData | null
/**
 * Get icon for message type
 */
export declare function getMessageIcon(type: "ask" | "say", subtype?: string): string
/**
 * Get color for message type
 */
export declare function getMessageColor(type: "ask" | "say", subtype?: string): string
/**
 * Get tool icon
 */
export declare function getToolIcon(tool: string): string
/**
 * Truncate text to max length
 */
export declare function truncateText(text: string, maxLength?: number): string
/**
 * Format file path for display
 */
export declare function formatFilePath(path: string): string
/**
 * Check if message has JSON content
 */
export declare function hasJsonContent(message: ExtensionChatMessage): boolean
/**
 * Format JSON string with indentation
 */
export declare function formatJson(jsonString: string, indent?: number): string | null
/**
 * Format content with JSON detection and optional preview
 */
export interface FormattedContent {
	isJson: boolean
	content: string
	lineCount: number
	charCount: number
	byteSize: number
	isPreview: boolean
	hiddenLines: number
}
export declare function formatContentWithMetadata(
	text: string,
	maxLines?: number,
	previewLines?: number,
): FormattedContent
/**
 * Format byte size for display
 * Adds ~ prefix for approximations (KB/MB)
 */
export declare function formatByteSize(bytes: number): string
/**
 * Build metadata string for content
 */
export declare function buildMetadataString(metadata: FormattedContent): string
//# sourceMappingURL=utils.d.ts.map
