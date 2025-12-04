import { pgTable, text, timestamp, integer, real, boolean, jsonb, uniqueIndex } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
/**
 * runs
 */
export const runs = pgTable("runs", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	taskMetricsId: integer("task_metrics_id").references(() => taskMetrics.id),
	model: text().notNull(),
	name: text(),
	description: text(),
	contextWindow: integer(),
	inputPrice: real(),
	outputPrice: real(),
	cacheWritesPrice: real(),
	cacheReadsPrice: real(),
	settings: jsonb().$type(),
	pid: integer(),
	socketPath: text("socket_path").notNull(),
	concurrency: integer().default(2).notNull(),
	timeout: integer().default(5).notNull(),
	passed: integer().default(0).notNull(),
	failed: integer().default(0).notNull(),
	createdAt: timestamp("created_at").notNull(),
})
export const runsRelations = relations(runs, ({ one }) => ({
	taskMetrics: one(taskMetrics, { fields: [runs.taskMetricsId], references: [taskMetrics.id] }),
}))
/**
 * tasks
 */
export const tasks = pgTable(
	"tasks",
	{
		id: integer().primaryKey().generatedAlwaysAsIdentity(),
		runId: integer("run_id")
			.references(() => runs.id)
			.notNull(),
		taskMetricsId: integer("task_metrics_id").references(() => taskMetrics.id),
		language: text().notNull().$type(),
		exercise: text().notNull(),
		passed: boolean(),
		startedAt: timestamp("started_at"),
		finishedAt: timestamp("finished_at"),
		createdAt: timestamp("created_at").notNull(),
	},
	(table) => [uniqueIndex("tasks_language_exercise_idx").on(table.runId, table.language, table.exercise)],
)
export const tasksRelations = relations(tasks, ({ one }) => ({
	run: one(runs, { fields: [tasks.runId], references: [runs.id] }),
	taskMetrics: one(taskMetrics, { fields: [tasks.taskMetricsId], references: [taskMetrics.id] }),
}))
/**
 * taskMetrics
 */
export const taskMetrics = pgTable("taskMetrics", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	tokensIn: integer("tokens_in").notNull(),
	tokensOut: integer("tokens_out").notNull(),
	tokensContext: integer("tokens_context").notNull(),
	cacheWrites: integer("cache_writes").notNull(),
	cacheReads: integer("cache_reads").notNull(),
	cost: real().notNull(),
	duration: integer().notNull(),
	toolUsage: jsonb("tool_usage").$type(),
	createdAt: timestamp("created_at").notNull(),
})
/**
 * toolErrors
 */
export const toolErrors = pgTable("toolErrors", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	runId: integer("run_id").references(() => runs.id),
	taskId: integer("task_id").references(() => tasks.id),
	toolName: text("tool_name").notNull().$type(),
	error: text().notNull(),
	createdAt: timestamp("created_at").notNull(),
})
export const toolErrorsRelations = relations(toolErrors, ({ one }) => ({
	run: one(runs, { fields: [toolErrors.runId], references: [runs.id] }),
	task: one(tasks, { fields: [toolErrors.taskId], references: [tasks.id] }),
}))
/**
 * schema
 */
export const schema = { runs, runsRelations, tasks, tasksRelations, taskMetrics, toolErrors, toolErrorsRelations }
