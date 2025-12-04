import { Task } from "../../task/Task"
import { ToolUse, AskApproval, HandleError, PushToolResult, RemoveClosingTag } from "../../../shared/tools"
/**
 * Implements the delete_file tool.
 */
export declare function deleteFileTool(
	cline: Task,
	block: ToolUse,
	askApproval: AskApproval,
	handleError: HandleError,
	pushToolResult: PushToolResult,
	removeClosingTag: RemoveClosingTag,
): Promise<void>
//# sourceMappingURL=deleteFileTool.d.ts.map
