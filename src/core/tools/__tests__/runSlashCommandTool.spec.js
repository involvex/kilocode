import { describe, it, expect, vi, beforeEach } from "vitest"
import { runSlashCommandTool } from "../RunSlashCommandTool"
import { formatResponse } from "../../prompts/responses"
import { getCommand, getCommandNames } from "../../../services/command/commands"
// Mock dependencies
vi.mock("../../../services/command/commands", () => ({
	getCommand: vi.fn(),
	getCommandNames: vi.fn(),
}))
describe("runSlashCommandTool", () => {
	let mockTask
	let mockCallbacks
	beforeEach(() => {
		vi.clearAllMocks()
		mockTask = {
			consecutiveMistakeCount: 0,
			recordToolError: vi.fn(),
			sayAndCreateMissingParamError: vi.fn().mockResolvedValue("Missing parameter error"),
			ask: vi.fn().mockResolvedValue({}),
			cwd: "/test/project",
			providerRef: {
				deref: vi.fn().mockReturnValue({
					getState: vi.fn().mockResolvedValue({
						experiments: {
							runSlashCommand: true,
						},
					}),
				}),
			},
		}
		mockCallbacks = {
			askApproval: vi.fn().mockResolvedValue(true),
			handleError: vi.fn(),
			pushToolResult: vi.fn(),
			removeClosingTag: vi.fn((tag, text) => text || ""),
		}
	})
	it("should handle missing command parameter", async () => {
		const block = {
			type: "tool_use",
			name: "run_slash_command",
			params: {},
			partial: false,
		}
		await runSlashCommandTool.handle(mockTask, block, mockCallbacks)
		expect(mockTask.consecutiveMistakeCount).toBe(1)
		expect(mockTask.recordToolError).toHaveBeenCalledWith("run_slash_command")
		expect(mockTask.sayAndCreateMissingParamError).toHaveBeenCalledWith("run_slash_command", "command")
		expect(mockCallbacks.pushToolResult).toHaveBeenCalledWith("Missing parameter error")
	})
	it("should handle command not found", async () => {
		const block = {
			type: "tool_use",
			name: "run_slash_command",
			params: {
				command: "nonexistent",
			},
			partial: false,
		}
		vi.mocked(getCommand).mockResolvedValue(undefined)
		vi.mocked(getCommandNames).mockResolvedValue(["init", "test", "deploy"])
		await runSlashCommandTool.handle(mockTask, block, mockCallbacks)
		expect(mockTask.recordToolError).toHaveBeenCalledWith("run_slash_command")
		expect(mockCallbacks.pushToolResult).toHaveBeenCalledWith(
			formatResponse.toolError("Command 'nonexistent' not found. Available commands: init, test, deploy"),
		)
	})
	it("should handle user rejection", async () => {
		const block = {
			type: "tool_use",
			name: "run_slash_command",
			params: {
				command: "init",
			},
			partial: false,
		}
		const mockCommand = {
			name: "init",
			content: "Initialize project",
			source: "built-in",
			filePath: "<built-in:init>",
			description: "Initialize the project",
		}
		vi.mocked(getCommand).mockResolvedValue(mockCommand)
		mockCallbacks.askApproval.mockResolvedValue(false)
		await runSlashCommandTool.handle(mockTask, block, mockCallbacks)
		expect(mockCallbacks.askApproval).toHaveBeenCalled()
		expect(mockCallbacks.pushToolResult).not.toHaveBeenCalled()
	})
	it("should successfully execute built-in command", async () => {
		const block = {
			type: "tool_use",
			name: "run_slash_command",
			params: {
				command: "init",
			},
			partial: false,
		}
		const mockCommand = {
			name: "init",
			content: "Initialize project content here",
			source: "built-in",
			filePath: "<built-in:init>",
			description: "Analyze codebase and create AGENTS.md",
		}
		vi.mocked(getCommand).mockResolvedValue(mockCommand)
		await runSlashCommandTool.handle(mockTask, block, mockCallbacks)
		expect(mockCallbacks.askApproval).toHaveBeenCalledWith(
			"tool",
			JSON.stringify({
				tool: "runSlashCommand",
				command: "init",
				args: undefined,
				source: "built-in",
				description: "Analyze codebase and create AGENTS.md",
			}),
		)
		expect(mockCallbacks.pushToolResult).toHaveBeenCalledWith(`Command: /init
Description: Analyze codebase and create AGENTS.md
Source: built-in

--- Command Content ---

Initialize project content here`)
	})
	it("should successfully execute command with arguments", async () => {
		const block = {
			type: "tool_use",
			name: "run_slash_command",
			params: {
				command: "test",
				args: "focus on unit tests",
			},
			partial: false,
		}
		const mockCommand = {
			name: "test",
			content: "Run tests with specific focus",
			source: "project",
			filePath: ".roo/commands/test.md",
			description: "Run project tests",
			argumentHint: "test type or focus area",
		}
		vi.mocked(getCommand).mockResolvedValue(mockCommand)
		await runSlashCommandTool.handle(mockTask, block, mockCallbacks)
		expect(mockCallbacks.pushToolResult).toHaveBeenCalledWith(`Command: /test
Description: Run project tests
Argument hint: test type or focus area
Provided arguments: focus on unit tests
Source: project

--- Command Content ---

Run tests with specific focus`)
	})
	it("should handle global command", async () => {
		const block = {
			type: "tool_use",
			name: "run_slash_command",
			params: {
				command: "deploy",
			},
			partial: false,
		}
		const mockCommand = {
			name: "deploy",
			content: "Deploy application to production",
			source: "global",
			filePath: "~/.roo/commands/deploy.md",
		}
		vi.mocked(getCommand).mockResolvedValue(mockCommand)
		await runSlashCommandTool.handle(mockTask, block, mockCallbacks)
		expect(mockCallbacks.pushToolResult).toHaveBeenCalledWith(`Command: /deploy
Source: global

--- Command Content ---

Deploy application to production`)
	})
	it("should handle partial block", async () => {
		const block = {
			type: "tool_use",
			name: "run_slash_command",
			params: {
				command: "init",
			},
			partial: true,
		}
		await runSlashCommandTool.handle(mockTask, block, mockCallbacks)
		expect(mockTask.ask).toHaveBeenCalledWith(
			"tool",
			JSON.stringify({
				tool: "runSlashCommand",
				command: "init",
				args: "",
			}),
			true,
		)
		expect(mockCallbacks.pushToolResult).not.toHaveBeenCalled()
	})
	it("should handle errors during execution", async () => {
		const block = {
			type: "tool_use",
			name: "run_slash_command",
			params: {
				command: "init",
			},
			partial: false,
		}
		const error = new Error("Test error")
		vi.mocked(getCommand).mockRejectedValue(error)
		await runSlashCommandTool.handle(mockTask, block, mockCallbacks)
		expect(mockCallbacks.handleError).toHaveBeenCalledWith("running slash command", error)
	})
	it("should handle empty available commands list", async () => {
		const block = {
			type: "tool_use",
			name: "run_slash_command",
			params: {
				command: "nonexistent",
			},
			partial: false,
		}
		vi.mocked(getCommand).mockResolvedValue(undefined)
		vi.mocked(getCommandNames).mockResolvedValue([])
		await runSlashCommandTool.handle(mockTask, block, mockCallbacks)
		expect(mockCallbacks.pushToolResult).toHaveBeenCalledWith(
			formatResponse.toolError("Command 'nonexistent' not found. Available commands: (none)"),
		)
	})
	it("should reset consecutive mistake count on valid command", async () => {
		const block = {
			type: "tool_use",
			name: "run_slash_command",
			params: {
				command: "init",
			},
			partial: false,
		}
		mockTask.consecutiveMistakeCount = 5
		const mockCommand = {
			name: "init",
			content: "Initialize project",
			source: "built-in",
			filePath: "<built-in:init>",
		}
		vi.mocked(getCommand).mockResolvedValue(mockCommand)
		await runSlashCommandTool.handle(mockTask, block, mockCallbacks)
		expect(mockTask.consecutiveMistakeCount).toBe(0)
	})
})
//# sourceMappingURL=runSlashCommandTool.spec.js.map
