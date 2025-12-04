import { z } from "zod"
/**
 * ToolGroup
 */
export declare const toolGroups: readonly ["read", "edit", "browser", "command", "mcp", "modes"]
export declare const toolGroupsSchema: z.ZodEnum<["read", "edit", "browser", "command", "mcp", "modes"]>
export type ToolGroup = z.infer<typeof toolGroupsSchema>
/**
 * ToolName
 */
export declare const toolNames: readonly [
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
	"edit_file",
	"new_rule",
	"report_bug",
	"condense",
	"delete_file",
	"update_todo_list",
	"run_slash_command",
	"generate_image",
]
export declare const toolNamesSchema: z.ZodEnum<
	[
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
		"edit_file",
		"new_rule",
		"report_bug",
		"condense",
		"delete_file",
		"update_todo_list",
		"run_slash_command",
		"generate_image",
	]
>
export type ToolName = z.infer<typeof toolNamesSchema>
/**
 * ToolUsage
 */
export declare const toolUsageSchema: z.ZodRecord<
	z.ZodEnum<
		[
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
			"edit_file",
			"new_rule",
			"report_bug",
			"condense",
			"delete_file",
			"update_todo_list",
			"run_slash_command",
			"generate_image",
		]
	>,
	z.ZodObject<
		{
			attempts: z.ZodNumber
			failures: z.ZodNumber
		},
		"strip",
		z.ZodTypeAny,
		{
			attempts: number
			failures: number
		},
		{
			attempts: number
			failures: number
		}
	>
>
export type ToolUsage = z.infer<typeof toolUsageSchema>
/**
 * Tool protocol constants
 */
export declare const TOOL_PROTOCOL: {
	readonly XML: "xml"
	readonly NATIVE: "native"
}
/**
 * Tool protocol type for system prompt generation
 * Derived from TOOL_PROTOCOL constants to ensure type safety
 */
export type ToolProtocol = (typeof TOOL_PROTOCOL)[keyof typeof TOOL_PROTOCOL]
export declare const toolProtocolSchema: z.ZodEnum<["xml", "native"]>
/**
 * Checks if the protocol is native (non-XML).
 *
 * @param protocol - The tool protocol to check
 * @returns True if protocol is native
 */
export declare function isNativeProtocol(protocol: ToolProtocol): boolean
/**
 * Gets the effective protocol from settings or falls back to the default XML.
 * This function is safe to use in webview-accessible code as it doesn't depend on vscode module.
 *
 * @param toolProtocol - Optional tool protocol from settings
 * @returns The effective tool protocol (defaults to "xml")
 */
export declare function getEffectiveProtocol(toolProtocol?: ToolProtocol): ToolProtocol
//# sourceMappingURL=tool.d.ts.map
