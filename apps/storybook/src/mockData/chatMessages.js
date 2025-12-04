import { BASE_TIMESTAMP } from "./clineMessages"
/**
 * Type-safe message presets for Storybook
 * Each preset must satisfy ClineMessageData to ensure type safety
 * If ClineMessage shape changes, TypeScript will error here
 */
// ============================================================================
// ASK MESSAGE PRESETS
// ============================================================================
export const ASK_PRESETS = {
	followup: {
		type: "ask",
		ask: "followup",
		text: JSON.stringify({
			question: "Would you like me to add error handling to this component?",
			suggest: [
				{ answer: "Yes, please add error handling" },
				{ answer: "No, keep it simple" },
				{ answer: "Add error handling and logging" },
			],
		}),
	},
	followup_no_suggestions: {
		type: "ask",
		ask: "followup",
		text: JSON.stringify({
			question: "What should I do next?",
			suggest: [],
		}),
	},
	command: {
		type: "ask",
		ask: "command",
		text: "npm install react react-dom",
	},
	command_output: {
		type: "ask",
		ask: "command_output",
		text: "Command output here...",
	},
	tool_edited_file: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "editedExistingFile",
			path: "src/components/Example.tsx",
			diff: `--- a/src/components/Example.tsx\n+++ b/src/components/Example.tsx\n@@ -1,3 +1,4 @@\n import React from 'react'\n+\n+export const Example = () => <div>Example</div>`,
		}),
	},
	tool_applied_diff: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "appliedDiff",
			path: "src/utils.ts",
			diff: `--- a/src/utils.ts\n+++ b/src/utils.ts\n@@ -1,5 +1,6 @@\n export const add = (a, b) => a + b\n+export const subtract = (a, b) => a - b`,
		}),
	},
	tool_new_file: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "newFileCreated",
			path: "src/components/NewComponent.tsx",
			content: `import React from 'react'\n\nexport const Example = () => {\n  return <div>Example Component</div>\n}`,
		}),
	},
	tool_insert_content: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "insert_content",
			path: "src/app.ts",
			lineNumber: 42,
			content: "// New import added\nimport { newFunction } from './utils'",
		}),
	},
	tool_read_file: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "read_file",
			path: "src/components/Example.tsx",
		}),
	},
	tool_codebase_search: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "codebase_search",
			query: "user authentication",
		}),
	},
	tool_search_files: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "search_files",
			regex: ".*\\.ts$",
			path: "src/",
		}),
	},
	tool_list_files_top: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "listFilesTopLevel",
			path: "src/",
		}),
	},
	tool_list_files_recursive: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "listFilesRecursive",
			path: "src/",
		}),
	},
	tool_list_code_definitions: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "list_code_definition_names",
			path: "src/components/",
		}),
	},
	tool_switch_mode: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "switch_mode",
			mode: "code",
			reason: "Need to write some code",
		}),
	},
	tool_new_task: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "new_task",
			content: "Create a new feature component",
			mode: "code",
		}),
	},
	tool_generate_image: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "generate_image",
			path: "assets/diagram.png",
			prompt: "A flowchart showing the authentication process",
		}),
	},
	tool_run_slash_command: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "run_slash_command",
			command: "/test",
			args: "--verbose",
			description: "Run test suite",
			source: "custom",
		}),
	},
	tool_update_todo: {
		type: "ask",
		ask: "tool",
		text: JSON.stringify({
			tool: "update_todo_list",
			todos: [
				{ id: "1", text: "Create component", completed: false },
				{ id: "2", text: "Add tests", completed: false },
				{ id: "3", text: "Update documentation", completed: true },
			],
			content: "Updated todo list",
		}),
	},
	browser_action_launch: {
		type: "ask",
		ask: "browser_action_launch",
		text: JSON.stringify({ action: "navigate" }),
	},
	mcp_use_tool: {
		type: "ask",
		ask: "use_mcp_server",
		text: JSON.stringify({
			type: "use_mcp_tool",
			serverName: "filesystem",
			toolName: "read_file",
			arguments: '{"path": "/example"}',
		}),
	},
	mcp_access_resource: {
		type: "ask",
		ask: "use_mcp_server",
		text: JSON.stringify({
			type: "access_mcp_resource",
			serverName: "filesystem",
			uri: "file:///path/to/file",
		}),
	},
	completion_result: {
		type: "ask",
		ask: "completion_result",
		text: "Task completed successfully! I've created a new React component with proper TypeScript typing and error handling.",
	},
	api_req_failed: {
		type: "ask",
		ask: "api_req_failed",
		text: "API request failed: Connection timeout",
	},
	resume_task: {
		type: "ask",
		ask: "resume_task",
		text: "Resume previous task?",
	},
	resume_completed_task: {
		type: "ask",
		ask: "resume_completed_task",
		text: "Task was already completed. Start new task?",
	},
	mistake_limit_reached: {
		type: "ask",
		ask: "mistake_limit_reached",
		text: "Mistake limit reached. Too many errors encountered.",
	},
	auto_approval_max_reached: {
		type: "ask",
		ask: "auto_approval_max_req_reached",
		text: JSON.stringify({ count: 10, limit: 10 }),
	},
	payment_required: {
		type: "ask",
		ask: "payment_required_prompt",
		text: JSON.stringify({ message: "Low credit warning", credits: 0.5 }),
	},
	invalid_model: {
		type: "ask",
		ask: "invalid_model",
		text: JSON.stringify({
			model: "gpt-3.5-turbo",
			message: "Model gpt-3.5-turbo is not available",
		}),
	},
	report_bug: {
		type: "ask",
		ask: "report_bug",
		text: JSON.stringify({
			title: "Bug Report",
			body: "Description of the bug",
			labels: ["bug"],
		}),
	},
	condense: {
		type: "ask",
		ask: "condense",
		text: "Condensed conversation context",
	},
}
// ============================================================================
// SAY MESSAGE PRESETS
// ============================================================================
export const SAY_PRESETS = {
	text: {
		type: "say",
		say: "text",
		text: "I'll help you with that task.",
	},
	reasoning: {
		type: "say",
		say: "reasoning",
		reasoning: "First, I need to understand the current state of the project...",
	},
	error: {
		type: "say",
		say: "error",
		text: "An error occurred while processing the request.",
	},
	api_req_started: {
		type: "say",
		say: "api_req_started",
		text: JSON.stringify({ request: "chat" }),
	},
	api_req_finished: {
		type: "say",
		say: "api_req_finished",
		text: JSON.stringify({ tokensIn: 1500, tokensOut: 300, cost: 0.05 }),
	},
	command_output: {
		type: "say",
		say: "command_output",
		text: "Installation complete.\n\nadded 42 packages in 3s",
	},
	browser_action: {
		type: "say",
		say: "browser_action",
		text: "Navigating to https://example.com",
	},
	browser_action_result: {
		type: "say",
		say: "browser_action_result",
		text: JSON.stringify({ success: true, url: "https://example.com" }),
		images: [
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
		],
	},
	mcp_server_request_started: {
		type: "say",
		say: "mcp_server_request_started",
		text: JSON.stringify({ serverName: "filesystem", toolName: "read_file" }),
	},
	mcp_server_response: {
		type: "say",
		say: "mcp_server_response",
		text: JSON.stringify({ result: "File contents here" }),
	},
	checkpoint_saved: {
		type: "say",
		say: "checkpoint_saved",
		text: "Checkpoint saved successfully",
	},
	condense_context: {
		type: "say",
		say: "condense_context",
		contextCondense: {
			cost: 0.02,
			prevContextTokens: 5000,
			newContextTokens: 2000,
			summary: "Condensed conversation about React component development",
		},
	},
	codebase_search_result: {
		type: "say",
		say: "codebase_search_result",
		text: JSON.stringify({
			results: [
				{ file: "src/auth/login.ts", score: 0.95 },
				{ file: "src/auth/register.ts", score: 0.87 },
			],
		}),
	},
}
/**
 * Create a ClineMessage from a preset key with optional overrides and timestamp offset
 */
export function createMessage(preset, overrides = {}, tsOffset = 0) {
	const presetData = ASK_PRESETS[preset] || SAY_PRESETS[preset]
	return {
		...presetData,
		...overrides,
		ts: BASE_TIMESTAMP + tsOffset,
	}
}
