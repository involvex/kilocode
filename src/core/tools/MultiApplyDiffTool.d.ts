import { Task } from "../task/Task"
import { ToolUse, RemoveClosingTag, AskApproval, HandleError, PushToolResult } from "../../shared/tools"
export interface DiffOperation {
	path: string
	diff: Array<{
		content: string
		startLine?: number
	}>
}
export interface OperationResult {
	path: string
	status: "pending" | "approved" | "denied" | "blocked" | "error"
	error?: string
	result?: string
	diffItems?: Array<{
		content: string
		startLine?: number
	}>
	absolutePath?: string
	fileExists?: boolean
}
export declare function applyDiffTool(
	cline: Task,
	block: ToolUse,
	askApproval: AskApproval,
	handleError: HandleError,
	pushToolResult: PushToolResult,
	removeClosingTag: RemoveClosingTag,
): Promise<void>
//# sourceMappingURL=MultiApplyDiffTool.d.ts.map
