export declare function getTasks(runId: number): Promise<
	{
		id: number
		language: "javascript" | "python" | "rust" | "go" | "java"
		createdAt: Date
		taskMetricsId: number | null
		passed: boolean | null
		runId: number
		exercise: string
		startedAt: Date | null
		finishedAt: Date | null
		taskMetrics: {
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
		} | null
	}[]
>
//# sourceMappingURL=tasks.d.ts.map
