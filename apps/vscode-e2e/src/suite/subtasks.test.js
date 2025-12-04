"use strict"
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				var desc = Object.getOwnPropertyDescriptor(m, k)
				if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k]
						},
					}
				}
				Object.defineProperty(o, k2, desc)
			}
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k
				o[k2] = m[k]
			})
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", { enumerable: true, value: v })
			}
		: function (o, v) {
				o["default"] = v
			})
var __importStar =
	(this && this.__importStar) ||
	(function () {
		var ownKeys = function (o) {
			ownKeys =
				Object.getOwnPropertyNames ||
				function (o) {
					var ar = []
					for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k
					return ar
				}
			return ownKeys(o)
		}
		return function (mod) {
			if (mod && mod.__esModule) return mod
			var result = {}
			if (mod != null)
				for (var k = ownKeys(mod), i = 0; i < k.length; i++)
					if (k[i] !== "default") __createBinding(result, mod, k[i])
			__setModuleDefault(result, mod)
			return result
		}
	})()
Object.defineProperty(exports, "__esModule", { value: true })
const assert = __importStar(require("assert"))
const types_1 = require("@roo-code/types")
const utils_1 = require("./utils")
suite.skip("Kilo Code Subtasks", () => {
	test("Should handle subtask cancellation and resumption correctly", async () => {
		const api = globalThis.api
		const messages = {}
		api.on(types_1.RooCodeEventName.Message, ({ taskId, message }) => {
			if (message.type === "say" && message.partial === false) {
				messages[taskId] = messages[taskId] || []
				messages[taskId].push(message)
			}
		})
		const childPrompt = "You are a calculator. Respond only with numbers. What is the square root of 9?"
		// Start a parent task that will create a subtask.
		const parentTaskId = await api.startNewTask({
			configuration: {
				mode: "ask",
				alwaysAllowModeSwitch: true,
				alwaysAllowSubtasks: true,
				autoApprovalEnabled: true,
				enableCheckpoints: false,
			},
			text:
				"You are the parent task. " +
				`Create a subtask by using the new_task tool with the message '${childPrompt}'.` +
				"After creating the subtask, wait for it to complete and then respond 'Parent task resumed'.",
		})
		let spawnedTaskId = undefined
		// Wait for the subtask to be spawned and then cancel it.
		api.on(types_1.RooCodeEventName.TaskSpawned, (_, childTaskId) => (spawnedTaskId = childTaskId))
		await (0, utils_1.waitFor)(() => !!spawnedTaskId)
		await (0, utils_1.sleep)(1_000) // Give the task a chance to start and populate the history.
		await api.cancelCurrentTask()
		// Wait a bit to ensure any task resumption would have happened.
		await (0, utils_1.sleep)(2_000)
		// The parent task should not have resumed yet, so we shouldn't see
		// "Parent task resumed".
		assert.ok(
			messages[parentTaskId]?.find(({ type, text }) => type === "say" && text === "Parent task resumed") ===
				undefined,
			"Parent task should not have resumed after subtask cancellation",
		)
		// Start a new task with the same message as the subtask.
		const anotherTaskId = await api.startNewTask({ text: childPrompt })
		await (0, utils_1.waitUntilCompleted)({ api, taskId: anotherTaskId })
		// Wait a bit to ensure any task resumption would have happened.
		await (0, utils_1.sleep)(2_000)
		// The parent task should still not have resumed.
		assert.ok(
			messages[parentTaskId]?.find(({ type, text }) => type === "say" && text === "Parent task resumed") ===
				undefined,
			"Parent task should not have resumed after subtask cancellation",
		)
		// Clean up - cancel all tasks.
		await api.clearCurrentTask()
		await (0, utils_1.waitUntilCompleted)({ api, taskId: parentTaskId })
	})
})
