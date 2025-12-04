import type { InsertTaskMetrics, UpdateTaskMetrics } from "../schema.js"
export declare const findTaskMetrics: (id: number) => Promise<{
	cost: number
	id: number
	duration: number
	tokensIn: number
	tokensOut: number
	cacheWrites: number
	cacheReads: number
	toolUsage: Partial<
		Record<
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
			| "generate_image",
			{
				attempts: number
				failures: number
			}
		>
	> | null
	createdAt: Date
	tokensContext: number
}>
export declare const createTaskMetrics: (args: InsertTaskMetrics) => Promise<{
	cost: number
	id: number
	duration: number
	tokensIn: number
	tokensOut: number
	cacheWrites: number
	cacheReads: number
	toolUsage: Partial<
		Record<
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
			| "generate_image",
			{
				attempts: number
				failures: number
			}
		>
	> | null
	createdAt: Date
	tokensContext: number
}>
export declare const updateTaskMetrics: (
	id: number,
	values: UpdateTaskMetrics,
) => Promise<{
	id: number
	tokensIn: number
	tokensOut: number
	tokensContext: number
	cacheWrites: number
	cacheReads: number
	cost: number
	duration: number
	toolUsage: Partial<
		Record<
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
			| "generate_image",
			{
				attempts: number
				failures: number
			}
		>
	> | null
	createdAt: Date
}>
//# sourceMappingURL=taskMetrics.d.ts.map
