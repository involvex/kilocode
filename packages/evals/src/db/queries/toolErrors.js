import { RecordNotCreatedError } from "./errors.js"
import { toolErrors } from "../schema.js"
import { client as db } from "../db.js"
export const createToolError = async (args) => {
	const records = await db
		.insert(toolErrors)
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
