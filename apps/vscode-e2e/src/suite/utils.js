"use strict"
Object.defineProperty(exports, "__esModule", { value: true })
exports.sleep = exports.waitUntilCompleted = exports.waitUntilAborted = exports.waitFor = void 0
const types_1 = require("@roo-code/types")
const waitFor = (condition, { timeout = 30_000, interval = 250 } = {}) => {
	let timeoutId = undefined
	return Promise.race([
		new Promise((resolve) => {
			const check = async () => {
				const result = condition()
				const isSatisfied = result instanceof Promise ? await result : result
				if (isSatisfied) {
					if (timeoutId) {
						clearTimeout(timeoutId)
						timeoutId = undefined
					}
					resolve()
				} else {
					setTimeout(check, interval)
				}
			}
			check()
		}),
		new Promise((_, reject) => {
			timeoutId = setTimeout(() => {
				reject(new Error(`Timeout after ${Math.floor(timeout / 1000)}s`))
			}, timeout)
		}),
	])
}
exports.waitFor = waitFor
const waitUntilAborted = async ({ api, taskId, ...options }) => {
	const set = new Set()
	api.on(types_1.RooCodeEventName.TaskAborted, (taskId) => set.add(taskId))
	await (0, exports.waitFor)(() => set.has(taskId), options)
}
exports.waitUntilAborted = waitUntilAborted
const waitUntilCompleted = async ({ api, taskId, ...options }) => {
	const set = new Set()
	api.on(types_1.RooCodeEventName.TaskCompleted, (taskId) => set.add(taskId))
	await (0, exports.waitFor)(() => set.has(taskId), options)
}
exports.waitUntilCompleted = waitUntilCompleted
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
exports.sleep = sleep
