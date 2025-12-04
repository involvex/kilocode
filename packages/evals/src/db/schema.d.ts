import type { RooCodeSettings } from "@roo-code/types"
/**
 * runs
 */
export declare const runs: import("drizzle-orm/pg-core").PgTableWithColumns<{
	name: "runs"
	schema: undefined
	columns: {
		id: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "id"
				tableName: "runs"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: true
				isPrimaryKey: true
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: "always"
				generated: undefined
			},
			{},
			{}
		>
		taskMetricsId: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "task_metrics_id"
				tableName: "runs"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		model: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "model"
				tableName: "runs"
				dataType: "string"
				columnType: "PgText"
				data: string
				driverParam: string
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: [string, ...string[]]
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		name: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "name"
				tableName: "runs"
				dataType: "string"
				columnType: "PgText"
				data: string
				driverParam: string
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: [string, ...string[]]
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		description: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "description"
				tableName: "runs"
				dataType: "string"
				columnType: "PgText"
				data: string
				driverParam: string
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: [string, ...string[]]
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		contextWindow: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "contextWindow"
				tableName: "runs"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		inputPrice: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "inputPrice"
				tableName: "runs"
				dataType: "number"
				columnType: "PgReal"
				data: number
				driverParam: string | number
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		outputPrice: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "outputPrice"
				tableName: "runs"
				dataType: "number"
				columnType: "PgReal"
				data: number
				driverParam: string | number
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		cacheWritesPrice: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "cacheWritesPrice"
				tableName: "runs"
				dataType: "number"
				columnType: "PgReal"
				data: number
				driverParam: string | number
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		cacheReadsPrice: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "cacheReadsPrice"
				tableName: "runs"
				dataType: "number"
				columnType: "PgReal"
				data: number
				driverParam: string | number
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		settings: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "settings"
				tableName: "runs"
				dataType: "json"
				columnType: "PgJsonb"
				data: RooCodeSettings
				driverParam: unknown
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{
				$type: RooCodeSettings
			}
		>
		pid: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "pid"
				tableName: "runs"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		socketPath: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "socket_path"
				tableName: "runs"
				dataType: "string"
				columnType: "PgText"
				data: string
				driverParam: string
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: [string, ...string[]]
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		concurrency: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "concurrency"
				tableName: "runs"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: true
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		timeout: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "timeout"
				tableName: "runs"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: true
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		passed: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "passed"
				tableName: "runs"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: true
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		failed: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "failed"
				tableName: "runs"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: true
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		createdAt: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "created_at"
				tableName: "runs"
				dataType: "date"
				columnType: "PgTimestamp"
				data: Date
				driverParam: string
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
	}
	dialect: "pg"
}>
export declare const runsRelations: import("drizzle-orm").Relations<
	"runs",
	{
		taskMetrics: import("drizzle-orm").One<"taskMetrics", false>
	}
>
export type Run = typeof runs.$inferSelect
export type InsertRun = Omit<typeof runs.$inferInsert, "id" | "createdAt">
export type UpdateRun = Partial<Omit<Run, "id" | "createdAt">>
/**
 * tasks
 */
export declare const tasks: import("drizzle-orm/pg-core").PgTableWithColumns<{
	name: "tasks"
	schema: undefined
	columns: {
		id: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "id"
				tableName: "tasks"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: true
				isPrimaryKey: true
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: "always"
				generated: undefined
			},
			{},
			{}
		>
		runId: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "run_id"
				tableName: "tasks"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		taskMetricsId: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "task_metrics_id"
				tableName: "tasks"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		language: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "language"
				tableName: "tasks"
				dataType: "string"
				columnType: "PgText"
				data: "javascript" | "python" | "rust" | "go" | "java"
				driverParam: string
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: [string, ...string[]]
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{
				$type: "javascript" | "python" | "rust" | "go" | "java"
			}
		>
		exercise: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "exercise"
				tableName: "tasks"
				dataType: "string"
				columnType: "PgText"
				data: string
				driverParam: string
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: [string, ...string[]]
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		passed: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "passed"
				tableName: "tasks"
				dataType: "boolean"
				columnType: "PgBoolean"
				data: boolean
				driverParam: boolean
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		startedAt: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "started_at"
				tableName: "tasks"
				dataType: "date"
				columnType: "PgTimestamp"
				data: Date
				driverParam: string
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		finishedAt: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "finished_at"
				tableName: "tasks"
				dataType: "date"
				columnType: "PgTimestamp"
				data: Date
				driverParam: string
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		createdAt: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "created_at"
				tableName: "tasks"
				dataType: "date"
				columnType: "PgTimestamp"
				data: Date
				driverParam: string
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
	}
	dialect: "pg"
}>
export declare const tasksRelations: import("drizzle-orm").Relations<
	"tasks",
	{
		run: import("drizzle-orm").One<"runs", true>
		taskMetrics: import("drizzle-orm").One<"taskMetrics", false>
	}
>
export type Task = typeof tasks.$inferSelect
export type InsertTask = Omit<typeof tasks.$inferInsert, "id" | "createdAt">
export type UpdateTask = Partial<Omit<Task, "id" | "createdAt">>
/**
 * taskMetrics
 */
export declare const taskMetrics: import("drizzle-orm/pg-core").PgTableWithColumns<{
	name: "taskMetrics"
	schema: undefined
	columns: {
		id: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "id"
				tableName: "taskMetrics"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: true
				isPrimaryKey: true
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: "always"
				generated: undefined
			},
			{},
			{}
		>
		tokensIn: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "tokens_in"
				tableName: "taskMetrics"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		tokensOut: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "tokens_out"
				tableName: "taskMetrics"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		tokensContext: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "tokens_context"
				tableName: "taskMetrics"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		cacheWrites: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "cache_writes"
				tableName: "taskMetrics"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		cacheReads: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "cache_reads"
				tableName: "taskMetrics"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		cost: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "cost"
				tableName: "taskMetrics"
				dataType: "number"
				columnType: "PgReal"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		duration: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "duration"
				tableName: "taskMetrics"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		toolUsage: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "tool_usage"
				tableName: "taskMetrics"
				dataType: "json"
				columnType: "PgJsonb"
				data: Partial<
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
				>
				driverParam: unknown
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{
				$type: Partial<
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
				>
			}
		>
		createdAt: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "created_at"
				tableName: "taskMetrics"
				dataType: "date"
				columnType: "PgTimestamp"
				data: Date
				driverParam: string
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
	}
	dialect: "pg"
}>
export type TaskMetrics = typeof taskMetrics.$inferSelect
export type InsertTaskMetrics = Omit<typeof taskMetrics.$inferInsert, "id" | "createdAt">
export type UpdateTaskMetrics = Partial<Omit<TaskMetrics, "id" | "createdAt">>
/**
 * toolErrors
 */
export declare const toolErrors: import("drizzle-orm/pg-core").PgTableWithColumns<{
	name: "toolErrors"
	schema: undefined
	columns: {
		id: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "id"
				tableName: "toolErrors"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: true
				hasDefault: true
				isPrimaryKey: true
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: "always"
				generated: undefined
			},
			{},
			{}
		>
		runId: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "run_id"
				tableName: "toolErrors"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		taskId: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "task_id"
				tableName: "toolErrors"
				dataType: "number"
				columnType: "PgInteger"
				data: number
				driverParam: string | number
				notNull: false
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		toolName: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "tool_name"
				tableName: "toolErrors"
				dataType: "string"
				columnType: "PgText"
				data:
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
				driverParam: string
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: [string, ...string[]]
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{
				$type:
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
			}
		>
		error: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "error"
				tableName: "toolErrors"
				dataType: "string"
				columnType: "PgText"
				data: string
				driverParam: string
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: [string, ...string[]]
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
		createdAt: import("drizzle-orm/pg-core").PgColumn<
			{
				name: "created_at"
				tableName: "toolErrors"
				dataType: "date"
				columnType: "PgTimestamp"
				data: Date
				driverParam: string
				notNull: true
				hasDefault: false
				isPrimaryKey: false
				isAutoincrement: false
				hasRuntimeDefault: false
				enumValues: undefined
				baseColumn: never
				identity: undefined
				generated: undefined
			},
			{},
			{}
		>
	}
	dialect: "pg"
}>
export declare const toolErrorsRelations: import("drizzle-orm").Relations<
	"toolErrors",
	{
		run: import("drizzle-orm").One<"runs", false>
		task: import("drizzle-orm").One<"tasks", false>
	}
>
export type ToolError = typeof toolErrors.$inferSelect
export type InsertToolError = Omit<typeof toolErrors.$inferInsert, "id" | "createdAt">
export type UpdateToolError = Partial<Omit<ToolError, "id" | "createdAt">>
/**
 * schema
 */
export declare const schema: {
	runs: import("drizzle-orm/pg-core").PgTableWithColumns<{
		name: "runs"
		schema: undefined
		columns: {
			id: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "id"
					tableName: "runs"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: true
					isPrimaryKey: true
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: "always"
					generated: undefined
				},
				{},
				{}
			>
			taskMetricsId: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "task_metrics_id"
					tableName: "runs"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			model: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "model"
					tableName: "runs"
					dataType: "string"
					columnType: "PgText"
					data: string
					driverParam: string
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: [string, ...string[]]
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			name: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "name"
					tableName: "runs"
					dataType: "string"
					columnType: "PgText"
					data: string
					driverParam: string
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: [string, ...string[]]
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			description: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "description"
					tableName: "runs"
					dataType: "string"
					columnType: "PgText"
					data: string
					driverParam: string
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: [string, ...string[]]
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			contextWindow: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "contextWindow"
					tableName: "runs"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			inputPrice: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "inputPrice"
					tableName: "runs"
					dataType: "number"
					columnType: "PgReal"
					data: number
					driverParam: string | number
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			outputPrice: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "outputPrice"
					tableName: "runs"
					dataType: "number"
					columnType: "PgReal"
					data: number
					driverParam: string | number
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			cacheWritesPrice: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "cacheWritesPrice"
					tableName: "runs"
					dataType: "number"
					columnType: "PgReal"
					data: number
					driverParam: string | number
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			cacheReadsPrice: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "cacheReadsPrice"
					tableName: "runs"
					dataType: "number"
					columnType: "PgReal"
					data: number
					driverParam: string | number
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			settings: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "settings"
					tableName: "runs"
					dataType: "json"
					columnType: "PgJsonb"
					data: RooCodeSettings
					driverParam: unknown
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{
					$type: RooCodeSettings
				}
			>
			pid: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "pid"
					tableName: "runs"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			socketPath: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "socket_path"
					tableName: "runs"
					dataType: "string"
					columnType: "PgText"
					data: string
					driverParam: string
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: [string, ...string[]]
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			concurrency: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "concurrency"
					tableName: "runs"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: true
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			timeout: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "timeout"
					tableName: "runs"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: true
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			passed: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "passed"
					tableName: "runs"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: true
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			failed: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "failed"
					tableName: "runs"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: true
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			createdAt: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "created_at"
					tableName: "runs"
					dataType: "date"
					columnType: "PgTimestamp"
					data: Date
					driverParam: string
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
		}
		dialect: "pg"
	}>
	runsRelations: import("drizzle-orm").Relations<
		"runs",
		{
			taskMetrics: import("drizzle-orm").One<"taskMetrics", false>
		}
	>
	tasks: import("drizzle-orm/pg-core").PgTableWithColumns<{
		name: "tasks"
		schema: undefined
		columns: {
			id: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "id"
					tableName: "tasks"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: true
					isPrimaryKey: true
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: "always"
					generated: undefined
				},
				{},
				{}
			>
			runId: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "run_id"
					tableName: "tasks"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			taskMetricsId: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "task_metrics_id"
					tableName: "tasks"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			language: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "language"
					tableName: "tasks"
					dataType: "string"
					columnType: "PgText"
					data: "javascript" | "python" | "rust" | "go" | "java"
					driverParam: string
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: [string, ...string[]]
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{
					$type: "javascript" | "python" | "rust" | "go" | "java"
				}
			>
			exercise: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "exercise"
					tableName: "tasks"
					dataType: "string"
					columnType: "PgText"
					data: string
					driverParam: string
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: [string, ...string[]]
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			passed: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "passed"
					tableName: "tasks"
					dataType: "boolean"
					columnType: "PgBoolean"
					data: boolean
					driverParam: boolean
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			startedAt: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "started_at"
					tableName: "tasks"
					dataType: "date"
					columnType: "PgTimestamp"
					data: Date
					driverParam: string
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			finishedAt: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "finished_at"
					tableName: "tasks"
					dataType: "date"
					columnType: "PgTimestamp"
					data: Date
					driverParam: string
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			createdAt: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "created_at"
					tableName: "tasks"
					dataType: "date"
					columnType: "PgTimestamp"
					data: Date
					driverParam: string
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
		}
		dialect: "pg"
	}>
	tasksRelations: import("drizzle-orm").Relations<
		"tasks",
		{
			run: import("drizzle-orm").One<"runs", true>
			taskMetrics: import("drizzle-orm").One<"taskMetrics", false>
		}
	>
	taskMetrics: import("drizzle-orm/pg-core").PgTableWithColumns<{
		name: "taskMetrics"
		schema: undefined
		columns: {
			id: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "id"
					tableName: "taskMetrics"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: true
					isPrimaryKey: true
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: "always"
					generated: undefined
				},
				{},
				{}
			>
			tokensIn: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "tokens_in"
					tableName: "taskMetrics"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			tokensOut: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "tokens_out"
					tableName: "taskMetrics"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			tokensContext: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "tokens_context"
					tableName: "taskMetrics"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			cacheWrites: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "cache_writes"
					tableName: "taskMetrics"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			cacheReads: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "cache_reads"
					tableName: "taskMetrics"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			cost: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "cost"
					tableName: "taskMetrics"
					dataType: "number"
					columnType: "PgReal"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			duration: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "duration"
					tableName: "taskMetrics"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			toolUsage: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "tool_usage"
					tableName: "taskMetrics"
					dataType: "json"
					columnType: "PgJsonb"
					data: Partial<
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
					>
					driverParam: unknown
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{
					$type: Partial<
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
					>
				}
			>
			createdAt: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "created_at"
					tableName: "taskMetrics"
					dataType: "date"
					columnType: "PgTimestamp"
					data: Date
					driverParam: string
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
		}
		dialect: "pg"
	}>
	toolErrors: import("drizzle-orm/pg-core").PgTableWithColumns<{
		name: "toolErrors"
		schema: undefined
		columns: {
			id: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "id"
					tableName: "toolErrors"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: true
					hasDefault: true
					isPrimaryKey: true
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: "always"
					generated: undefined
				},
				{},
				{}
			>
			runId: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "run_id"
					tableName: "toolErrors"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			taskId: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "task_id"
					tableName: "toolErrors"
					dataType: "number"
					columnType: "PgInteger"
					data: number
					driverParam: string | number
					notNull: false
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			toolName: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "tool_name"
					tableName: "toolErrors"
					dataType: "string"
					columnType: "PgText"
					data:
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
					driverParam: string
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: [string, ...string[]]
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{
					$type:
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
				}
			>
			error: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "error"
					tableName: "toolErrors"
					dataType: "string"
					columnType: "PgText"
					data: string
					driverParam: string
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: [string, ...string[]]
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
			createdAt: import("drizzle-orm/pg-core").PgColumn<
				{
					name: "created_at"
					tableName: "toolErrors"
					dataType: "date"
					columnType: "PgTimestamp"
					data: Date
					driverParam: string
					notNull: true
					hasDefault: false
					isPrimaryKey: false
					isAutoincrement: false
					hasRuntimeDefault: false
					enumValues: undefined
					baseColumn: never
					identity: undefined
					generated: undefined
				},
				{},
				{}
			>
		}
		dialect: "pg"
	}>
	toolErrorsRelations: import("drizzle-orm").Relations<
		"toolErrors",
		{
			run: import("drizzle-orm").One<"runs", false>
			task: import("drizzle-orm").One<"tasks", false>
		}
	>
}
//# sourceMappingURL=schema.d.ts.map
