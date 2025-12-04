import type { InsertToolError } from "../schema.js"
export declare const createToolError: (args: InsertToolError) => Promise<{
	error: string
	id: number
	taskId: number | null
	toolName:
		| "report_bug"
		| "condense"
		| "browser_action"
		| "execute_command"
		| "read_file"
		| "write_to_file"
		| "apply_diff"
		| "insert_content"
		| "search_files"
		| "list_files"
		| "list_code_definition_names"
		| "use_mcp_tool"
		| "access_mcp_resource"
		| "ask_followup_question"
		| "attempt_completion"
		| "switch_mode"
		| "new_task"
		| "fetch_instructions"
		| "codebase_search"
		| "edit_file"
		| "new_rule"
		| "delete_file"
		| "update_todo_list"
		| "run_slash_command"
		| "generate_image"
	createdAt: Date
	runId: number | null
}>
//# sourceMappingURL=toolErrors.d.ts.map
