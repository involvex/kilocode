import { z } from "zod"
/**
 * ToolGroup
 */
export const toolGroups = ["read", "edit", "browser", "command", "mcp", "modes"]
export const toolGroupsSchema = z.enum(toolGroups)
/**
 * ToolName
 */
export const toolNames = [
	"execute_command",
	"read_file",
	"write_to_file",
	"apply_diff",
	"insert_content",
	"search_files",
	"list_files",
	"list_code_definition_names",
	"browser_action",
	"use_mcp_tool",
	"access_mcp_resource",
	"ask_followup_question",
	"attempt_completion",
	"switch_mode",
	"new_task",
	"fetch_instructions",
	"codebase_search",
	// kilocode_change start
	"edit_file",
	"new_rule",
	"report_bug",
	"condense",
	"delete_file",
	// kilocode_change end
	"update_todo_list",
	"run_slash_command",
	"generate_image",
]
export const toolNamesSchema = z.enum(toolNames)
/**
 * ToolUsage
 */
export const toolUsageSchema = z.record(
	toolNamesSchema,
	z.object({
		attempts: z.number(),
		failures: z.number(),
	}),
)
/**
 * Tool protocol constants
 */
export const TOOL_PROTOCOL = {
	XML: "xml",
	NATIVE: "native",
}
export const toolProtocolSchema = z.enum([TOOL_PROTOCOL.XML, TOOL_PROTOCOL.NATIVE]) // kilocode_change
/**
 * Checks if the protocol is native (non-XML).
 *
 * @param protocol - The tool protocol to check
 * @returns True if protocol is native
 */
export function isNativeProtocol(protocol) {
	return protocol === TOOL_PROTOCOL.NATIVE
}
/**
 * Gets the effective protocol from settings or falls back to the default XML.
 * This function is safe to use in webview-accessible code as it doesn't depend on vscode module.
 *
 * @param toolProtocol - Optional tool protocol from settings
 * @returns The effective tool protocol (defaults to "xml")
 */
export function getEffectiveProtocol(toolProtocol) {
	return toolProtocol || TOOL_PROTOCOL.XML
}
