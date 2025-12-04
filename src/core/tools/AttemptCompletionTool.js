import * as vscode from "vscode"
import { RooCodeEventName } from "@roo-code/types"
import { TelemetryService } from "@roo-code/telemetry"
import { formatResponse } from "../prompts/responses"
import { Package } from "../../shared/package"
import { BaseTool } from "./BaseTool"
import { getCommitRangeForNewCompletion } from "../checkpoints/kilocode/seeNewChanges" // kilocode_change
// kilocode_change start
async function getClineMessageOptions(task) {
	const commitRange = await getCommitRangeForNewCompletion(task)
	if (!commitRange) {
		return {}
	}
	return {
		metadata: {
			kiloCode: { commitRange },
		},
	}
}
export class AttemptCompletionTool extends BaseTool {
	name = "attempt_completion"
	parseLegacy(params) {
		return {
			result: params.result || "",
			command: params.command,
		}
	}
	async execute(params, task, callbacks) {
		const { result } = params
		const { handleError, pushToolResult, askFinishSubTaskApproval, toolDescription } = callbacks
		const preventCompletionWithOpenTodos = vscode.workspace
			.getConfiguration(Package.name)
			.get("preventCompletionWithOpenTodos", false)
		const hasIncompleteTodos = task.todoList && task.todoList.some((todo) => todo.status !== "completed")
		if (preventCompletionWithOpenTodos && hasIncompleteTodos) {
			task.consecutiveMistakeCount++
			task.recordToolError("attempt_completion")
			pushToolResult(
				formatResponse.toolError(
					"Cannot complete task while there are incomplete todos. Please finish all todos before attempting completion.",
				),
			)
			return
		}
		try {
			if (!result) {
				task.consecutiveMistakeCount++
				task.recordToolError("attempt_completion")
				pushToolResult(await task.sayAndCreateMissingParamError("attempt_completion", "result"))
				return
			}
			task.consecutiveMistakeCount = 0
			await task.say(
				"completion_result",
				result,
				undefined,
				false,
				// kilocode_change start
				undefined,
				undefined,
				await getClineMessageOptions(task),
			)
			TelemetryService.instance.captureTaskCompleted(task.taskId)
			task.emit(RooCodeEventName.TaskCompleted, task.taskId, task.getTokenUsage(), task.toolUsage)
			if (task.parentTask) {
				const didApprove = await askFinishSubTaskApproval()
				if (!didApprove) {
					pushToolResult(formatResponse.toolDenied())
					return
				}
				pushToolResult("")
				await task.providerRef.deref()?.finishSubTask(result)
				return
			}
			const { response, text, images } = await task.ask("completion_result", "", false)
			if (response === "yesButtonClicked") {
				pushToolResult("")
				return
			}
			await task.say("user_feedback", text ?? "", images)
			const feedbackText = `The user has provided feedback on the results. Consider their input to continue the task, and then attempt completion again.\n<feedback>\n${text}\n</feedback>`
			pushToolResult(formatResponse.toolResult(feedbackText, images))
		} catch (error) {
			await handleError("inspecting site", error)
		}
	}
	async handlePartial(task, block) {
		const result = block.params.result
		const command = block.params.command
		const lastMessage = task.clineMessages.at(-1)
		if (command) {
			if (lastMessage && lastMessage.ask === "command") {
				await task
					.ask("command", this.removeClosingTag("command", command, block.partial), block.partial)
					.catch(() => {})
			} else {
				await task.say(
					"completion_result",
					this.removeClosingTag("result", result, block.partial),
					undefined,
					false,
					// kilocode_change start
					undefined,
					undefined,
					await getClineMessageOptions(task),
				)
				TelemetryService.instance.captureTaskCompleted(task.taskId)
				task.emit(RooCodeEventName.TaskCompleted, task.taskId, task.getTokenUsage(), task.toolUsage)
				await task
					.ask("command", this.removeClosingTag("command", command, block.partial), block.partial)
					.catch(() => {})
			}
		} else {
			await task.say(
				"completion_result",
				this.removeClosingTag("result", result, block.partial),
				undefined,
				block.partial,
				// kilocode_change start
				undefined,
				undefined,
				await getClineMessageOptions(task),
			)
		}
	}
}
export const attemptCompletionTool = new AttemptCompletionTool()
//# sourceMappingURL=AttemptCompletionTool.js.map
