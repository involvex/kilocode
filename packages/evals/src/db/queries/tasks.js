import { and, asc, eq, sql } from "drizzle-orm"
import { RecordNotFoundError, RecordNotCreatedError } from "./errors.js"
import { tasks } from "../schema.js"
import { client as db } from "../db.js"
export const findTask = async (id) => {
	const run = await db.query.tasks.findFirst({ where: eq(tasks.id, id) })
	if (!run) {
		throw new RecordNotFoundError()
	}
	return run
}
export const createTask = async (args) => {
	const records = await db
		.insert(tasks)
		.values({
			...args,
			createdAt: new Date(),
		})
		.returning()
	const record = records[0]
	if (!record) {
		throw new RecordNotCreatedError()
	}
	return record
}
export const updateTask = async (id, values) => {
	const records = await db.update(tasks).set(values).where(eq(tasks.id, id)).returning()
	const record = records[0]
	if (!record) {
		throw new RecordNotFoundError()
	}
	return record
}
export const getTask = async ({ runId, language, exercise }) =>
	db.query.tasks.findFirst({
		where: and(eq(tasks.runId, runId), eq(tasks.language, language), eq(tasks.exercise, exercise)),
	})
export const getTasks = async (runId) =>
	db.query.tasks.findMany({
		where: eq(tasks.runId, runId),
		with: { taskMetrics: true },
		orderBy: asc(tasks.id),
	})
export const getLanguageScores = async () => {
	const records = await db
		.select({
			runId: tasks.runId,
			language: tasks.language,
			score: sql`cast(sum(case when ${tasks.passed} = true then 1 else 0 end) as float) / count(*)`,
		})
		.from(tasks)
		.groupBy(tasks.runId, tasks.language)
	const results = {}
	for (const { runId, language, score } of records) {
		if (!results[runId]) {
			results[runId] = { go: 0, java: 0, javascript: 0, python: 0, rust: 0 }
		}
		results[runId][language] = score
	}
	return results
}
