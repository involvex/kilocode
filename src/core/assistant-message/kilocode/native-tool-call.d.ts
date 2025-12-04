/**
 * Represents a native tool call from OpenAI-compatible APIs
 */
export interface NativeToolCall {
	index?: number
	id?: string
	type?: string
	function?: {
		name: string
		arguments: string
	}
}
/**
 * Extract server name and tool name from dynamic MCP tool names.
 * Format: use_mcp_tool___{serverName}___{toolName}
 * Uses triple underscores as separator to allow underscores in tool names.
 * Returns null if the format is invalid.
 */
export declare function extractMcpToolInfo(toolName: string): {
	serverName: string
	toolName: string
} | null
//# sourceMappingURL=native-tool-call.d.ts.map
