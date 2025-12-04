import type { ExerciseLanguage } from "../../exercises/index.js"
import type { InsertTask, UpdateTask } from "../schema.js"
export declare const findTask: (id: number) => Promise<{
	id: number
	language: "javascript" | "python" | "rust" | "go" | "java"
	createdAt: Date
	taskMetricsId: number | null
	passed: boolean | null
	runId: number
	exercise: string
	startedAt: Date | null
	finishedAt: Date | null
}>
export declare const createTask: (args: InsertTask) => Promise<{
	id: number
	language: "javascript" | "python" | "rust" | "go" | "java"
	createdAt: Date
	taskMetricsId: number | null
	passed: boolean | null
	runId: number
	exercise: string
	startedAt: Date | null
	finishedAt: Date | null
}>
export declare const updateTask: (
	id: number,
	values: UpdateTask,
) => Promise<{
	id: number
	runId: number
	taskMetricsId: number | null
	language: "javascript" | "python" | "rust" | "go" | "java"
	exercise: string
	passed: boolean | null
	startedAt: Date | null
	finishedAt: Date | null
	createdAt: Date
}>
type GetTask = {
	runId: number
	language: ExerciseLanguage
	exercise: string
}
export declare const getTask: ({ runId, language, exercise }: GetTask) => Promise<
	| {
			id: number
			language: "javascript" | "python" | "rust" | "go" | "java"
			createdAt: Date
			taskMetricsId: number | null
			passed: boolean | null
			runId: number
			exercise: string
			startedAt: Date | null
			finishedAt: Date | null
	  }
	| undefined
>
export declare const getTasks: (runId: number) => Promise<
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
export declare const getLanguageScores: () => Promise<
	Record<number, Record<"javascript" | "python" | "rust" | "go" | "java", number>>
>
export {}
//# sourceMappingURL=tasks.d.ts.map
