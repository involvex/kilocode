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
const fs = __importStar(require("fs/promises"))
const path = __importStar(require("path"))
const vscode = __importStar(require("vscode"))
const types_1 = require("@roo-code/types")
const utils_1 = require("../utils")
const test_utils_1 = require("../test-utils")
suite.skip("Roo Code insert_content Tool", function () {
	;(0, test_utils_1.setDefaultSuiteTimeout)(this)
	let workspaceDir
	// Pre-created test files that will be used across tests
	const testFiles = {
		simpleText: {
			name: `test-insert-simple-${Date.now()}.txt`,
			content: "Line 1\nLine 2\nLine 3",
			path: "",
		},
		jsFile: {
			name: `test-insert-js-${Date.now()}.js`,
			content: `function hello() {
	console.log("Hello World")
}

function goodbye() {
	console.log("Goodbye World")
}`,
			path: "",
		},
		emptyFile: {
			name: `test-insert-empty-${Date.now()}.txt`,
			content: "",
			path: "",
		},
		pythonFile: {
			name: `test-insert-python-${Date.now()}.py`,
			content: `def main():
    print("Start")
    print("End")`,
			path: "",
		},
	}
	// Get the actual workspace directory that VSCode is using and create all test files
	suiteSetup(async function () {
		// Get the workspace folder from VSCode
		const workspaceFolders = vscode.workspace.workspaceFolders
		if (!workspaceFolders || workspaceFolders.length === 0) {
			throw new Error("No workspace folder found")
		}
		workspaceDir = workspaceFolders[0].uri.fsPath
		console.log("Using workspace directory:", workspaceDir)
		// Create all test files before any tests run
		console.log("Creating test files in workspace...")
		for (const [key, file] of Object.entries(testFiles)) {
			file.path = path.join(workspaceDir, file.name)
			await fs.writeFile(file.path, file.content)
			console.log(`Created ${key} test file at:`, file.path)
		}
		// Verify all files exist
		for (const [key, file] of Object.entries(testFiles)) {
			const exists = await fs
				.access(file.path)
				.then(() => true)
				.catch(() => false)
			if (!exists) {
				throw new Error(`Failed to create ${key} test file at ${file.path}`)
			}
		}
	})
	// Clean up after all tests
	suiteTeardown(async () => {
		// Cancel any running tasks before cleanup
		test("Should insert content at the beginning of a file (line 1)", async function () {
			const api = globalThis.api
			// Clean up before each test
			setup(async () => {
				// Cancel any previous task
				try {
					await globalThis.api.cancelCurrentTask()
				} catch {
					// Task might not be running
				}
				// Small delay to ensure clean state
				await (0, utils_1.sleep)(100)
			})
			// Clean up after each test
			teardown(async () => {
				// Cancel the current task
				try {
					await globalThis.api.cancelCurrentTask()
				} catch {
					// Task might not be running
				}
				// Small delay to ensure clean state
				await (0, utils_1.sleep)(100)
			})
			const messages = []
			const testFile = testFiles.simpleText
			const insertContent = "New first line"
			const expectedContent = `${insertContent}
${testFile.content}`
			let taskStarted = false
			let taskCompleted = false
			let errorOccurred = null
			let insertContentExecuted = false
			// Listen for messages
			const messageHandler = ({ message }) => {
				messages.push(message)
				// Log important messages for debugging
				if (message.type === "say" && message.say === "error") {
					errorOccurred = message.text || "Unknown error"
					console.error("Error:", message.text)
				}
				if (message.type === "ask" && message.ask === "tool") {
					console.log("Tool request:", message.text?.substring(0, 200))
				}
				if (message.type === "say" && (message.say === "completion_result" || message.say === "text")) {
					console.log("AI response:", message.text?.substring(0, 200))
				}
				// Check for tool execution
				if (message.type === "say" && message.say === "api_req_started" && message.text) {
					console.log("API request started:", message.text.substring(0, 200))
					try {
						const requestData = JSON.parse(message.text)
						if (requestData.request && requestData.request.includes("insert_content")) {
							insertContentExecuted = true
							console.log("insert_content tool executed!")
						}
					} catch (e) {
						console.log("Failed to parse api_req_started message:", e)
					}
				}
			}
			api.on(types_1.RooCodeEventName.Message, messageHandler)
			// Listen for task events
			const taskStartedHandler = (id) => {
				if (id === taskId) {
					taskStarted = true
					console.log("Task started:", id)
				}
			}
			api.on(types_1.RooCodeEventName.TaskStarted, taskStartedHandler)
			const taskCompletedHandler = (id) => {
				if (id === taskId) {
					taskCompleted = true
					console.log("Task completed:", id)
				}
			}
			api.on(types_1.RooCodeEventName.TaskCompleted, taskCompletedHandler)
			let taskId
			try {
				// Start the task
				taskId = await api.startNewTask({
					configuration: {
						mode: "code",
						autoApprovalEnabled: true,
						alwaysAllowWrite: true,
						alwaysAllowReadOnly: true,
						alwaysAllowReadOnlyOutsideWorkspace: true,
					},
					text: `Use insert_content to add "${insertContent}" at line 1 (beginning) of the file ${testFile.name}. The file already exists with this content:
${testFile.content}

Assume the file exists and you can modify it directly.`,
				})
				console.log("Task ID:", taskId)
				console.log("Test filename:", testFile.name)
				// Wait for task to start
				await (0, utils_1.waitFor)(() => taskStarted, { timeout: 45_000 })
				// Check for early errors
				if (errorOccurred) {
					console.error("Early error detected:", errorOccurred)
				}
				// Wait for task completion
				await (0, utils_1.waitFor)(() => taskCompleted, { timeout: 45_000 })
				// Give extra time for file system operations
				await (0, utils_1.sleep)(2000)
				// Check if the file was modified correctly
				const actualContent = await fs.readFile(testFile.path, "utf-8")
				console.log("File content after insertion:", actualContent)
				// Verify tool was executed
				assert.strictEqual(insertContentExecuted, true, "insert_content tool should have been executed")
				// Verify file content
				assert.strictEqual(
					actualContent.trim(),
					expectedContent.trim(),
					"Content should be inserted at the beginning of the file",
				)
				// Verify no errors occurred
				assert.strictEqual(
					errorOccurred,
					null,
					`Task should complete without errors, but got: ${errorOccurred}`,
				)
				console.log("Test passed! insert_content tool executed and content inserted at beginning successfully")
			} finally {
				api.off(types_1.RooCodeEventName.Message, messageHandler)
				api.off(types_1.RooCodeEventName.TaskStarted, taskStartedHandler)
				api.off(types_1.RooCodeEventName.TaskCompleted, taskCompletedHandler)
			}
		})
		try {
			await globalThis.api.cancelCurrentTask()
		} catch {
			// Task might not be running
		}
		// Clean up all test files
		console.log("Cleaning up test files...")
		for (const [key, file] of Object.entries(testFiles)) {
			try {
				await fs.unlink(file.path)
				console.log(`Cleaned up ${key} test file`)
			} catch (error) {
				console.log(`Failed to clean up ${key} test file:`, error)
			}
		}
	})
	test("Should insert content at the end of a file (line 0)", async function () {
		const api = globalThis.api
		const messages = []
		const testFile = testFiles.simpleText
		const insertContent = "New last line"
		const expectedContent = `${testFile.content}
${insertContent}`
		let taskStarted = false
		let taskCompleted = false
		let errorOccurred = null
		let insertContentExecuted = false
		// Listen for messages
		const messageHandler = ({ message }) => {
			messages.push(message)
			// Log important messages for debugging
			if (message.type === "say" && message.say === "error") {
				errorOccurred = message.text || "Unknown error"
				console.error("Error:", message.text)
			}
			if (message.type === "ask" && message.ask === "tool") {
				console.log("Tool request:", message.text?.substring(0, 200))
			}
			if (message.type === "say" && (message.say === "completion_result" || message.say === "text")) {
				console.log("AI response:", message.text?.substring(0, 200))
			}
			// Check for tool execution
			if (message.type === "say" && message.say === "api_req_started" && message.text) {
				console.log("API request started:", message.text.substring(0, 200))
				try {
					const requestData = JSON.parse(message.text)
					if (requestData.request && requestData.request.includes("insert_content")) {
						insertContentExecuted = true
						console.log("insert_content tool executed!")
					}
				} catch (e) {
					console.log("Failed to parse api_req_started message:", e)
				}
			}
		}
		api.on(types_1.RooCodeEventName.Message, messageHandler)
		// Listen for task events
		const taskStartedHandler = (id) => {
			if (id === taskId) {
				taskStarted = true
				console.log("Task started:", id)
			}
		}
		api.on(types_1.RooCodeEventName.TaskStarted, taskStartedHandler)
		const taskCompletedHandler = (id) => {
			if (id === taskId) {
				taskCompleted = true
				console.log("Task completed:", id)
			}
		}
		api.on(types_1.RooCodeEventName.TaskCompleted, taskCompletedHandler)
		let taskId
		try {
			// Start the task
			taskId = await api.startNewTask({
				configuration: {
					mode: "code",
					autoApprovalEnabled: true,
					alwaysAllowWrite: true,
					alwaysAllowReadOnly: true,
					alwaysAllowReadOnlyOutsideWorkspace: true,
				},
				text: `Use insert_content to add "${insertContent}" at line 0 (end of file) of the file ${testFile.name}. The file already exists with this content:
${testFile.content}

Assume the file exists and you can modify it directly.`,
			})
			console.log("Task ID:", taskId)
			console.log("Test filename:", testFile.name)
			// Wait for task to start
			await (0, utils_1.waitFor)(() => taskStarted, { timeout: 45_000 })
			// Check for early errors
			if (errorOccurred) {
				console.error("Early error detected:", errorOccurred)
			}
			// Wait for task completion
			await (0, utils_1.waitFor)(() => taskCompleted, { timeout: 45_000 })
			// Give extra time for file system operations
			await (0, utils_1.sleep)(2000)
			// Check if the file was modified correctly
			const actualContent = await fs.readFile(testFile.path, "utf-8")
			console.log("File content after insertion:", actualContent)
			// Verify tool was executed
			test("Should insert multiline content into a JavaScript file", async function () {
				const api = globalThis.api
				const messages = []
				const testFile = testFiles.jsFile
				const insertContent = `// New import statements
import { utils } from './utils'
import { helpers } from './helpers'`
				const expectedContent = `${insertContent}
${testFile.content}`
				let taskStarted = false
				let taskCompleted = false
				let errorOccurred = null
				let insertContentExecuted = false
				// Listen for messages
				const messageHandler = ({ message }) => {
					messages.push(message)
					// Log important messages for debugging
					if (message.type === "say" && message.say === "error") {
						errorOccurred = message.text || "Unknown error"
						console.error("Error:", message.text)
					}
					if (message.type === "ask" && message.ask === "tool") {
						console.log("Tool request:", message.text?.substring(0, 200))
					}
					if (message.type === "say" && (message.say === "completion_result" || message.say === "text")) {
						console.log("AI response:", message.text?.substring(0, 200))
					}
					// Check for tool execution
					if (message.type === "say" && message.say === "api_req_started" && message.text) {
						console.log("API request started:", message.text.substring(0, 200))
						try {
							const requestData = JSON.parse(message.text)
							if (requestData.request && requestData.request.includes("insert_content")) {
								insertContentExecuted = true
								console.log("insert_content tool executed!")
							}
						} catch (e) {
							console.log("Failed to parse api_req_started message:", e)
						}
					}
				}
				api.on(types_1.RooCodeEventName.Message, messageHandler)
				// Listen for task events
				const taskStartedHandler = (id) => {
					if (id === taskId) {
						taskStarted = true
						console.log("Task started:", id)
					}
				}
				api.on(types_1.RooCodeEventName.TaskStarted, taskStartedHandler)
				const taskCompletedHandler = (id) => {
					if (id === taskId) {
						taskCompleted = true
						console.log("Task completed:", id)
					}
				}
				api.on(types_1.RooCodeEventName.TaskCompleted, taskCompletedHandler)
				let taskId
				try {
					// Start the task
					taskId = await api.startNewTask({
						configuration: {
							mode: "code",
							autoApprovalEnabled: true,
							alwaysAllowWrite: true,
							alwaysAllowReadOnly: true,
							alwaysAllowReadOnlyOutsideWorkspace: true,
						},
						text: `Use insert_content to add import statements at the beginning (line 1) of the JavaScript file ${testFile.name}. Add these lines:
${insertContent}

The file already exists with this content:
${testFile.content}

Assume the file exists and you can modify it directly.`,
					})
					console.log("Task ID:", taskId)
					console.log("Test filename:", testFile.name)
					// Wait for task to start
					await (0, utils_1.waitFor)(() => taskStarted, { timeout: 45_000 })
					// Check for early errors
					if (errorOccurred) {
						console.error("Early error detected:", errorOccurred)
					}
					// Wait for task completion
					await (0, utils_1.waitFor)(() => taskCompleted, { timeout: 45_000 })
					// Give extra time for file system operations
					await (0, utils_1.sleep)(2000)
					test("Should insert content into an empty file", async function () {
						const api = globalThis.api
						const messages = []
						const testFile = testFiles.emptyFile
						const insertContent = `# My New File
This is the first line of content
And this is the second line`
						const expectedContent = insertContent
						let taskStarted = false
						let taskCompleted = false
						let errorOccurred = null
						let insertContentExecuted = false
						// Listen for messages
						const messageHandler = ({ message }) => {
							messages.push(message)
							// Log important messages for debugging
							if (message.type === "say" && message.say === "error") {
								errorOccurred = message.text || "Unknown error"
								console.error("Error:", message.text)
							}
							if (message.type === "ask" && message.ask === "tool") {
								console.log("Tool request:", message.text?.substring(0, 200))
							}
							if (
								message.type === "say" &&
								(message.say === "completion_result" || message.say === "text")
							) {
								console.log("AI response:", message.text?.substring(0, 200))
							}
							// Check for tool execution
							if (message.type === "say" && message.say === "api_req_started" && message.text) {
								console.log("API request started:", message.text.substring(0, 200))
								try {
									const requestData = JSON.parse(message.text)
									if (requestData.request && requestData.request.includes("insert_content")) {
										insertContentExecuted = true
										console.log("insert_content tool executed!")
									}
								} catch (e) {
									console.log("Failed to parse api_req_started message:", e)
								}
							}
						}
						api.on(types_1.RooCodeEventName.Message, messageHandler)
						// Listen for task events
						const taskStartedHandler = (id) => {
							if (id === taskId) {
								taskStarted = true
								console.log("Task started:", id)
							}
						}
						api.on(types_1.RooCodeEventName.TaskStarted, taskStartedHandler)
						const taskCompletedHandler = (id) => {
							if (id === taskId) {
								taskCompleted = true
								console.log("Task completed:", id)
							}
						}
						api.on(types_1.RooCodeEventName.TaskCompleted, taskCompletedHandler)
						let taskId
						try {
							// Start the task
							taskId = await api.startNewTask({
								configuration: {
									mode: "code",
									autoApprovalEnabled: true,
									alwaysAllowWrite: true,
									alwaysAllowReadOnly: true,
									alwaysAllowReadOnlyOutsideWorkspace: true,
								},
								text: `Use insert_content to add content to the empty file ${testFile.name}. Add this content at line 0 (end of file):
${insertContent}

The file is currently empty. Assume the file exists and you can modify it directly.`,
							})
							console.log("Task ID:", taskId)
							console.log("Test filename:", testFile.name)
							// Wait for task to start
							await (0, utils_1.waitFor)(() => taskStarted, { timeout: 45_000 })
							// Check for early errors
							if (errorOccurred) {
								console.error("Early error detected:", errorOccurred)
							}
							// Wait for task completion
							await (0, utils_1.waitFor)(() => taskCompleted, { timeout: 45_000 })
							// Give extra time for file system operations
							await (0, utils_1.sleep)(2000)
							// Check if the file was modified correctly
							const actualContent = await fs.readFile(testFile.path, "utf-8")
							console.log("File content after insertion:", actualContent)
							// Verify tool was executed
							assert.strictEqual(
								insertContentExecuted,
								true,
								"insert_content tool should have been executed",
							)
							// Verify file content
							assert.strictEqual(
								actualContent.trim(),
								expectedContent.trim(),
								"Content should be inserted into the empty file",
							)
							// Verify no errors occurred
							assert.strictEqual(
								errorOccurred,
								null,
								`Task should complete without errors, but got: ${errorOccurred}`,
							)
							console.log(
								"Test passed! insert_content tool executed and content inserted into empty file successfully",
							)
						} finally {
							api.off(types_1.RooCodeEventName.Message, messageHandler)
							api.off(types_1.RooCodeEventName.TaskStarted, taskStartedHandler)
							api.off(types_1.RooCodeEventName.TaskCompleted, taskCompletedHandler)
						}
					})
					// Check if the file was modified correctly
					const actualContent = await fs.readFile(testFile.path, "utf-8")
					console.log("File content after insertion:", actualContent)
					// Verify tool was executed
					assert.strictEqual(insertContentExecuted, true, "insert_content tool should have been executed")
					// Verify file content
					assert.strictEqual(
						actualContent.trim(),
						expectedContent.trim(),
						"Multiline content should be inserted at the beginning of the JavaScript file",
					)
					// Verify no errors occurred
					assert.strictEqual(
						errorOccurred,
						null,
						`Task should complete without errors, but got: ${errorOccurred}`,
					)
					console.log("Test passed! insert_content tool executed and multiline content inserted successfully")
				} finally {
					api.off(types_1.RooCodeEventName.Message, messageHandler)
					api.off(types_1.RooCodeEventName.TaskStarted, taskStartedHandler)
					api.off(types_1.RooCodeEventName.TaskCompleted, taskCompletedHandler)
				}
			})
			assert.strictEqual(insertContentExecuted, true, "insert_content tool should have been executed")
			// Verify file content
			assert.strictEqual(
				actualContent.trim(),
				expectedContent.trim(),
				"Content should be inserted at the end of the file",
			)
			// Verify no errors occurred
			assert.strictEqual(errorOccurred, null, `Task should complete without errors, but got: ${errorOccurred}`)
			console.log("Test passed! insert_content tool executed and content inserted at end successfully")
		} finally {
			api.off(types_1.RooCodeEventName.Message, messageHandler)
			api.off(types_1.RooCodeEventName.TaskStarted, taskStartedHandler)
			api.off(types_1.RooCodeEventName.TaskCompleted, taskCompletedHandler)
		}
	})
	// Tests will be added here one by one
})
