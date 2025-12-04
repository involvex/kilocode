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
const test_utils_1 = require("./test-utils")
suite("Markdown List Rendering", function () {
	;(0, test_utils_1.setDefaultSuiteTimeout)(this)
	test("Should render unordered lists with bullets in chat", async () => {
		const api = globalThis.api
		const messages = []
		api.on(types_1.RooCodeEventName.Message, ({ message }) => {
			if (message.type === "say" && message.partial === false) {
				messages.push(message)
			}
		})
		const taskId = await api.startNewTask({
			configuration: { mode: "ask", alwaysAllowModeSwitch: true, autoApprovalEnabled: true },
			text: "Please show me an example of an unordered list with the following items: Apple, Banana, Orange",
		})
		await (0, utils_1.waitUntilCompleted)({ api, taskId })
		// Find the message containing the list
		const listMessage = messages.find(
			({ say, text }) =>
				(say === "completion_result" || say === "text") &&
				text?.includes("Apple") &&
				text?.includes("Banana") &&
				text?.includes("Orange"),
		)
		assert.ok(listMessage, "Should have a message containing the list items")
		// The rendered markdown should contain list markers
		const messageText = listMessage?.text || ""
		assert.ok(
			messageText.includes("- Apple") || messageText.includes("* Apple") || messageText.includes("• Apple"),
			"List items should be rendered with bullet points",
		)
	})
	test("Should render ordered lists with numbers in chat", async () => {
		const api = globalThis.api
		const messages = []
		api.on(types_1.RooCodeEventName.Message, ({ message }) => {
			if (message.type === "say" && message.partial === false) {
				messages.push(message)
			}
		})
		const taskId = await api.startNewTask({
			configuration: { mode: "ask", alwaysAllowModeSwitch: true, autoApprovalEnabled: true },
			text: "Please show me a numbered list with three steps: First step, Second step, Third step",
		})
		await (0, utils_1.waitUntilCompleted)({ api, taskId })
		// Find the message containing the numbered list
		const listMessage = messages.find(
			({ say, text }) =>
				(say === "completion_result" || say === "text") &&
				text?.includes("First step") &&
				text?.includes("Second step") &&
				text?.includes("Third step"),
		)
		assert.ok(listMessage, "Should have a message containing the numbered list")
		// The rendered markdown should contain numbered markers
		const messageText = listMessage?.text || ""
		assert.ok(
			messageText.includes("1. First step") || messageText.includes("1) First step"),
			"List items should be rendered with numbers",
		)
	})
	test("Should render nested lists with proper hierarchy", async () => {
		const api = globalThis.api
		const messages = []
		api.on(types_1.RooCodeEventName.Message, ({ message }) => {
			if (message.type === "say" && message.partial === false) {
				messages.push(message)
			}
		})
		const taskId = await api.startNewTask({
			configuration: { mode: "ask", alwaysAllowModeSwitch: true, autoApprovalEnabled: true },
			text: "Please create a nested list with 'Main item' having two sub-items: 'Sub-item A' and 'Sub-item B'",
		})
		await (0, utils_1.waitUntilCompleted)({ api, taskId })
		// Find the message containing the nested list
		const listMessage = messages.find(
			({ say, text }) =>
				(say === "completion_result" || say === "text") &&
				text?.includes("Main item") &&
				text?.includes("Sub-item A") &&
				text?.includes("Sub-item B"),
		)
		assert.ok(listMessage, "Should have a message containing the nested list")
		// The rendered markdown should show hierarchy through indentation
		const messageText = listMessage?.text || ""
		// Check for main item
		assert.ok(
			messageText.includes("- Main item") ||
				messageText.includes("* Main item") ||
				messageText.includes("• Main item"),
			"Main list item should be rendered",
		)
		// Check for sub-items with indentation (typically 2-4 spaces or a tab)
		assert.ok(
			messageText.match(/\s{2,}- Sub-item A/) ||
				messageText.match(/\s{2,}\* Sub-item A/) ||
				messageText.match(/\s{2,}• Sub-item A/) ||
				messageText.includes("\t- Sub-item A") ||
				messageText.includes("\t* Sub-item A") ||
				messageText.includes("\t• Sub-item A"),
			"Sub-items should be indented",
		)
	})
	test("Should render mixed ordered and unordered lists", async () => {
		const api = globalThis.api
		const messages = []
		api.on(types_1.RooCodeEventName.Message, ({ message }) => {
			if (message.type === "say" && message.partial === false) {
				messages.push(message)
			}
		})
		const taskId = await api.startNewTask({
			configuration: { mode: "ask", alwaysAllowModeSwitch: true, autoApprovalEnabled: true },
			text: "Please create a list that has both numbered items and bullet points, mixing ordered and unordered lists",
		})
		await (0, utils_1.waitUntilCompleted)({ api, taskId })
		// Find a message that contains both types of lists
		const listMessage = messages.find(
			({ say, text }) =>
				(say === "completion_result" || say === "text") &&
				text &&
				// Check for numbered list markers
				(text.includes("1.") || text.includes("1)")) &&
				// Check for bullet list markers
				(text.includes("-") || text.includes("*") || text.includes("•")),
		)
		assert.ok(listMessage, "Should have a message containing mixed list types")
	})
})
