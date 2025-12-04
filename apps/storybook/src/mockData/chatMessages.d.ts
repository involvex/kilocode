import { ClineMessage } from "@roo-code/types"
/**
 * Type alias for ClineMessage without timestamp
 * Cleaner than writing Omit<ClineMessage, 'ts'> everywhere
 */
export type ClineMessageData = Omit<ClineMessage, "ts">
/**
 * Type-safe message presets for Storybook
 * Each preset must satisfy ClineMessageData to ensure type safety
 * If ClineMessage shape changes, TypeScript will error here
 */
export declare const ASK_PRESETS: {
	readonly followup: {
		type: "ask"
		ask: "followup"
		text: string
	}
	readonly followup_no_suggestions: {
		type: "ask"
		ask: "followup"
		text: string
	}
	readonly command: {
		type: "ask"
		ask: "command"
		text: string
	}
	readonly command_output: {
		type: "ask"
		ask: "command_output"
		text: string
	}
	readonly tool_edited_file: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_applied_diff: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_new_file: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_insert_content: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_read_file: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_codebase_search: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_search_files: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_list_files_top: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_list_files_recursive: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_list_code_definitions: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_switch_mode: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_new_task: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_generate_image: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_run_slash_command: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly tool_update_todo: {
		type: "ask"
		ask: "tool"
		text: string
	}
	readonly browser_action_launch: {
		type: "ask"
		ask: "browser_action_launch"
		text: string
	}
	readonly mcp_use_tool: {
		type: "ask"
		ask: "use_mcp_server"
		text: string
	}
	readonly mcp_access_resource: {
		type: "ask"
		ask: "use_mcp_server"
		text: string
	}
	readonly completion_result: {
		type: "ask"
		ask: "completion_result"
		text: string
	}
	readonly api_req_failed: {
		type: "ask"
		ask: "api_req_failed"
		text: string
	}
	readonly resume_task: {
		type: "ask"
		ask: "resume_task"
		text: string
	}
	readonly resume_completed_task: {
		type: "ask"
		ask: "resume_completed_task"
		text: string
	}
	readonly mistake_limit_reached: {
		type: "ask"
		ask: "mistake_limit_reached"
		text: string
	}
	readonly auto_approval_max_reached: {
		type: "ask"
		ask: "auto_approval_max_req_reached"
		text: string
	}
	readonly payment_required: {
		type: "ask"
		ask: "payment_required_prompt"
		text: string
	}
	readonly invalid_model: {
		type: "ask"
		ask: "invalid_model"
		text: string
	}
	readonly report_bug: {
		type: "ask"
		ask: "report_bug"
		text: string
	}
	readonly condense: {
		type: "ask"
		ask: "condense"
		text: string
	}
}
export declare const SAY_PRESETS: {
	readonly text: {
		type: "say"
		say: "text"
		text: string
	}
	readonly reasoning: {
		type: "say"
		say: "reasoning"
		reasoning: string
	}
	readonly error: {
		type: "say"
		say: "error"
		text: string
	}
	readonly api_req_started: {
		type: "say"
		say: "api_req_started"
		text: string
	}
	readonly api_req_finished: {
		type: "say"
		say: "api_req_finished"
		text: string
	}
	readonly command_output: {
		type: "say"
		say: "command_output"
		text: string
	}
	readonly browser_action: {
		type: "say"
		say: "browser_action"
		text: string
	}
	readonly browser_action_result: {
		type: "say"
		say: "browser_action_result"
		text: string
		images: string[]
	}
	readonly mcp_server_request_started: {
		type: "say"
		say: "mcp_server_request_started"
		text: string
	}
	readonly mcp_server_response: {
		type: "say"
		say: "mcp_server_response"
		text: string
	}
	readonly checkpoint_saved: {
		type: "say"
		say: "checkpoint_saved"
		text: string
	}
	readonly condense_context: {
		type: "say"
		say: "condense_context"
		contextCondense: {
			cost: number
			prevContextTokens: number
			newContextTokens: number
			summary: string
		}
	}
	readonly codebase_search_result: {
		type: "say"
		say: "codebase_search_result"
		text: string
	}
}
export type AskPresetKey = keyof typeof ASK_PRESETS
export type SayPresetKey = keyof typeof SAY_PRESETS
export type PresetKey = AskPresetKey | SayPresetKey
/**
 * Create a ClineMessage from a preset key with optional overrides and timestamp offset
 */
export declare function createMessage(
	preset: PresetKey,
	overrides?: Partial<ClineMessageData>,
	tsOffset?: number,
): ClineMessage
//# sourceMappingURL=chatMessages.d.ts.map
