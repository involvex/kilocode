import * as vscode from "vscode"
import { defaultModeSlug, getModeBySlug } from "../../shared/modes"
import { formatResponse } from "../prompts/responses"
import { t } from "../../i18n"
import { parseMarkdownChecklist } from "./UpdateTodoListTool"
import { Package } from "../../shared/package"
import { BaseTool } from "./BaseTool"
export class NewTaskTool extends BaseTool {
	name = "new_task"
	parseLegacy(params) {
		return {
			mode: params.mode || "",
			message: params.message || "",
			todos: params.todos,
		}
	}
	async execute(params, task, callbacks) {
		const { mode, message, todos } = params
		const { askApproval, handleError, pushToolResult } = callbacks
		try {
			// Validate required parameters.
			if (!mode) {
				task.consecutiveMistakeCount++
				task.recordToolError("new_task")
				pushToolResult(await task.sayAndCreateMissingParamError("new_task", "mode"))
				return
			}
			if (!message) {
				task.consecutiveMistakeCount++
				task.recordToolError("new_task")
				pushToolResult(await task.sayAndCreateMissingParamError("new_task", "message"))
				return
			}
			// Get the VSCode setting for requiring todos.
			const provider = task.providerRef.deref()
			if (!provider) {
				pushToolResult(formatResponse.toolError("Provider reference lost"))
				return
			}
			const state = await provider.getState()
			// Use Package.name (dynamic at build time) as the VSCode configuration namespace.
			// Supports multiple extension variants (e.g., stable/nightly) without hardcoded strings.
			const requireTodos = vscode.workspace.getConfiguration(Package.name).get("newTaskRequireTodos", false)
			// Check if todos are required based on VSCode setting.
			// Note: `undefined` means not provided, empty string is valid.
			if (requireTodos && todos === undefined) {
				task.consecutiveMistakeCount++
				task.recordToolError("new_task")
				pushToolResult(await task.sayAndCreateMissingParamError("new_task", "todos"))
				return
			}
			// Parse todos if provided, otherwise use empty array
			let todoItems = []
			if (todos) {
				try {
					todoItems = parseMarkdownChecklist(todos)
				} catch (error) {
					task.consecutiveMistakeCount++
					task.recordToolError("new_task")
					pushToolResult(formatResponse.toolError("Invalid todos format: must be a markdown checklist"))
					return
				}
			}
			task.consecutiveMistakeCount = 0
			// Un-escape one level of backslashes before '@' for hierarchical subtasks
			// Un-escape one level: \\@ -> \@ (removes one backslash for hierarchical subtasks)
			const unescapedMessage = message.replace(/\\\\@/g, "\\@")
			// Verify the mode exists
			const targetMode = getModeBySlug(mode, state?.customModes)
			if (!targetMode) {
				pushToolResult(formatResponse.toolError(`Invalid mode: ${mode}`))
				return
			}
			const toolMessage = JSON.stringify({
				tool: "newTask",
				mode: targetMode.name,
				content: message,
				todos: todoItems,
			})
			const didApprove = await askApproval("tool", toolMessage)
			if (!didApprove) {
				return
			}
			// Provider is guaranteed to be defined here due to earlier check.
			if (task.enableCheckpoints) {
				task.checkpointSave(true)
			}
			// Preserve the current mode so we can resume with it later.
			task.pausedModeSlug = (await provider.getState()).mode ?? defaultModeSlug
			const newTask = await task.startSubtask(unescapedMessage, todoItems, mode)
			if (!newTask) {
				pushToolResult(t("tools:newTask.errors.policy_restriction"))
				return
			}
			pushToolResult(
				`Successfully created new task in ${targetMode.name} mode with message: ${unescapedMessage} and ${todoItems.length} todo items`,
			)
			return
		} catch (error) {
			await handleError("creating new task", error)
			return
		}
	}
	async handlePartial(task, block) {
		const mode = block.params.mode
		const message = block.params.message
		const todos = block.params.todos
		const partialMessage = JSON.stringify({
			tool: "newTask",
			mode: this.removeClosingTag("mode", mode, block.partial),
			content: this.removeClosingTag("message", message, block.partial),
			todos: this.removeClosingTag("todos", todos, block.partial),
		})
		await task.ask("tool", partialMessage, block.partial).catch(() => {})
	}
}
export const newTaskTool = new NewTaskTool()
//# sourceMappingURL=NewTaskTool.js.map
