import path from "path"
import fs from "fs/promises"
import { getReadablePath } from "../../utils/path"
import { isPathOutsideWorkspace } from "../../utils/pathUtils"
import { parseSourceCodeForDefinitionsTopLevel, parseSourceCodeDefinitionsForFile } from "../../services/tree-sitter"
import { truncateDefinitionsToLineLimit } from "./helpers/truncateDefinitions"
import { BaseTool } from "./BaseTool"
export class ListCodeDefinitionNamesTool extends BaseTool {
	name = "list_code_definition_names"
	parseLegacy(params) {
		return {
			path: params.path || "",
		}
	}
	async execute(params, task, callbacks) {
		const { askApproval, handleError, pushToolResult } = callbacks
		const { path: relPath } = params
		if (!relPath) {
			task.consecutiveMistakeCount++
			task.recordToolError("list_code_definition_names")
			pushToolResult(await task.sayAndCreateMissingParamError("list_code_definition_names", "path"))
			return
		}
		task.consecutiveMistakeCount = 0
		const absolutePath = path.resolve(task.cwd, relPath)
		const isOutsideWorkspace = isPathOutsideWorkspace(absolutePath)
		const sharedMessageProps = {
			tool: "listCodeDefinitionNames",
			path: getReadablePath(task.cwd, relPath),
			isOutsideWorkspace,
		}
		try {
			let result
			try {
				const stats = await fs.stat(absolutePath)
				if (stats.isFile()) {
					const fileResult = await parseSourceCodeDefinitionsForFile(absolutePath, task.rooIgnoreController)
					if (fileResult) {
						const { maxReadFileLine = -1 } = (await task.providerRef.deref()?.getState()) ?? {}
						result = truncateDefinitionsToLineLimit(fileResult, maxReadFileLine)
					} else {
						result = "No source code definitions found in file."
					}
				} else if (stats.isDirectory()) {
					result = await parseSourceCodeForDefinitionsTopLevel(absolutePath, task.rooIgnoreController)
				} else {
					result = "The specified path is neither a file nor a directory."
				}
			} catch {
				result = `${absolutePath}: does not exist or cannot be accessed.`
			}
			const completeMessage = JSON.stringify({ ...sharedMessageProps, content: result })
			const didApprove = await askApproval("tool", completeMessage)
			if (!didApprove) {
				return
			}
			if (relPath) {
				await task.fileContextTracker.trackFileContext(relPath, "read_tool")
			}
			pushToolResult(result)
		} catch (error) {
			await handleError("parsing source code definitions", error)
		}
	}
	async handlePartial(task, block) {
		const relPath = block.params.path
		const absolutePath = relPath ? path.resolve(task.cwd, relPath) : task.cwd
		const isOutsideWorkspace = isPathOutsideWorkspace(absolutePath)
		const sharedMessageProps = {
			tool: "listCodeDefinitionNames",
			path: getReadablePath(task.cwd, relPath || ""),
			isOutsideWorkspace,
		}
		const partialMessage = JSON.stringify({ ...sharedMessageProps, content: "" })
		await task.ask("tool", partialMessage, block.partial).catch(() => {})
	}
}
export const listCodeDefinitionNamesTool = new ListCodeDefinitionNamesTool()
//# sourceMappingURL=ListCodeDefinitionNamesTool.js.map
