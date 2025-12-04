// kilocode_change - file added
import { describe, it, expect, vi, beforeEach } from "vitest"
import fs from "fs/promises"
import * as path from "path"
import { deleteFileTool } from "../kilocode/deleteFileTool"
import { isPathOutsideWorkspace } from "../../../utils/pathUtils"
import { getReadablePath } from "../../../utils/path"
// Mock dependencies
vi.mock("fs/promises", () => ({
	default: {
		stat: vi.fn(),
		unlink: vi.fn(),
		readdir: vi.fn(),
		rm: vi.fn(),
	},
}))
vi.mock("../../../utils/pathUtils", () => ({
	isPathOutsideWorkspace: vi.fn().mockReturnValue(false),
}))
vi.mock("../../prompts/responses", () => ({
	formatResponse: {
		toolError: vi.fn((msg) => `Error: ${msg}`),
		toolResult: vi.fn((msg) => `Result: ${msg}`),
		rooIgnoreError: vi.fn((path) => `Access denied: ${path}`),
	},
}))
vi.mock("../../../utils/path", () => ({
	getReadablePath: vi.fn((cwd, path) => path || ""),
}))
describe("deleteFileTool", () => {
	const testFilePath = "test/file.txt"
	const mockedFsStat = fs.stat
	const mockedFsUnlink = fs.unlink
	const mockedFsReaddir = fs.readdir
	const mockedFsRm = fs.rm
	const mockedIsPathOutsideWorkspace = isPathOutsideWorkspace
	const mockedGetReadablePath = getReadablePath
	const mockCline = {}
	let mockAskApproval
	let mockHandleError
	let mockPushToolResult
	let mockRemoveClosingTag
	let toolResult
	beforeEach(() => {
		vi.clearAllMocks()
		mockedFsStat.mockResolvedValue({
			isDirectory: () => false,
		})
		mockedFsUnlink.mockResolvedValue(undefined)
		mockedFsReaddir.mockResolvedValue([])
		mockedFsRm.mockResolvedValue(undefined)
		mockedIsPathOutsideWorkspace.mockReturnValue(false)
		mockedGetReadablePath.mockImplementation((cwd, path) => path || "")
		mockCline.cwd = "/test/workspace"
		mockCline.consecutiveMistakeCount = 0
		mockCline.recordToolError = vi.fn()
		mockCline.sayAndCreateMissingParamError = vi.fn().mockResolvedValue("Missing parameter error")
		mockCline.say = vi.fn().mockResolvedValue(undefined)
		mockCline.ask = vi.fn().mockResolvedValue(undefined)
		mockCline.rooIgnoreController = {
			validateAccess: vi.fn().mockReturnValue(true),
		}
		mockCline.rooProtectedController = {
			isWriteProtected: vi.fn().mockReturnValue(false),
		}
		mockAskApproval = vi.fn().mockResolvedValue(true)
		mockHandleError = vi.fn().mockResolvedValue(undefined)
		mockRemoveClosingTag = vi.fn((tag, content) => content || "")
		toolResult = undefined
		mockPushToolResult = vi.fn((result) => {
			toolResult = result
		})
	})
	/**
	 * Helper function to execute the delete file tool with different parameters
	 */
	async function executeDeleteFileTool(params = {}, options = {}) {
		const isPartial = options.isPartial ?? false
		const accessAllowed = options.accessAllowed ?? true
		const isWriteProtected = options.isWriteProtected ?? false
		const fileExists = options.fileExists ?? true
		const isDirectory = options.isDirectory ?? false
		const isOutsideWorkspace = options.isOutsideWorkspace ?? false
		mockCline.rooIgnoreController.validateAccess.mockReturnValue(accessAllowed)
		mockCline.rooProtectedController.isWriteProtected.mockReturnValue(isWriteProtected)
		mockedIsPathOutsideWorkspace.mockReturnValue(isOutsideWorkspace)
		if (fileExists) {
			mockedFsStat.mockResolvedValue({
				isDirectory: () => isDirectory,
			})
		} else {
			mockedFsStat.mockRejectedValue(new Error("File not found"))
		}
		const toolUse = {
			type: "tool_use",
			name: "delete_file",
			params: {
				path: testFilePath,
				...params,
			},
			partial: isPartial,
		}
		await deleteFileTool(
			mockCline,
			toolUse,
			mockAskApproval,
			mockHandleError,
			mockPushToolResult,
			mockRemoveClosingTag,
		)
		return toolResult
	}
	describe("parameter validation", () => {
		it("should handle missing path parameter", async () => {
			await executeDeleteFileTool({ path: undefined })
			expect(mockCline.recordToolError).toHaveBeenCalledWith("delete_file")
			expect(mockCline.sayAndCreateMissingParamError).toHaveBeenCalledWith("delete_file", "path")
		})
	})
	describe("access control", () => {
		it("validates and allows access when rooIgnoreController permits", async () => {
			await executeDeleteFileTool({}, { accessAllowed: true })
			// Normalize path for cross-platform compatibility
			const normalizedPath = path.normalize(testFilePath)
			expect(mockCline.rooIgnoreController.validateAccess).toHaveBeenCalledWith(normalizedPath)
			expect(mockedFsUnlink).toHaveBeenCalled()
		})
		it("should reject files in .kilocodeignore", async () => {
			await executeDeleteFileTool({}, { accessAllowed: false })
			// Normalize path for cross-platform compatibility
			const normalizedPath = path.normalize(testFilePath)
			expect(mockCline.say).toHaveBeenCalledWith("error", `Access denied: ${normalizedPath}`)
			expect(mockPushToolResult).toHaveBeenCalled()
			expect(mockedFsUnlink).not.toHaveBeenCalled()
		})
		it("should reject write-protected files", async () => {
			await executeDeleteFileTool({}, { isWriteProtected: true })
			expect(mockCline.say).toHaveBeenCalledWith("error", expect.stringContaining("write-protected"))
			expect(mockCline.recordToolError).toHaveBeenCalledWith("delete_file")
			expect(mockedFsUnlink).not.toHaveBeenCalled()
		})
	})
	describe("workspace boundary", () => {
		it("should reject files outside workspace", async () => {
			await executeDeleteFileTool({}, { isOutsideWorkspace: true })
			expect(mockCline.say).toHaveBeenCalledWith("error", expect.stringContaining("outside workspace"))
			expect(mockCline.recordToolError).toHaveBeenCalledWith("delete_file")
			expect(mockedFsUnlink).not.toHaveBeenCalled()
		})
	})
	describe("file operations", () => {
		it("should successfully delete a file", async () => {
			await executeDeleteFileTool({})
			expect(mockCline.consecutiveMistakeCount).toBe(0)
			expect(mockAskApproval).toHaveBeenCalled()
			expect(mockedFsUnlink).toHaveBeenCalled()
			expect(mockPushToolResult).toHaveBeenCalledWith(expect.stringContaining("Deleted file"))
		})
		it("should successfully delete an empty directory", async () => {
			mockedFsReaddir.mockResolvedValue([])
			await executeDeleteFileTool({}, { isDirectory: true })
			expect(mockCline.consecutiveMistakeCount).toBe(0)
			expect(mockAskApproval).toHaveBeenCalled()
			// Use expect.any(String) and custom matcher to handle cross-platform paths
			expect(mockedFsRm).toHaveBeenCalledWith(
				expect.stringMatching(new RegExp(path.normalize(testFilePath).replace(/\\/g, "\\\\"))),
				{
					recursive: true,
					force: false,
				},
			)
			expect(mockPushToolResult).toHaveBeenCalledWith(expect.stringContaining("Deleted directory"))
		})
		it("should successfully delete a directory with files", async () => {
			// Mock directory with files
			mockedFsReaddir.mockResolvedValue([
				{ name: "file1.txt", isFile: () => true, isDirectory: () => false, isSymbolicLink: () => false },
				{ name: "file2.txt", isFile: () => true, isDirectory: () => false, isSymbolicLink: () => false },
			])
			mockedFsStat.mockResolvedValue({
				isDirectory: () => true,
				size: 1024,
			})
			await executeDeleteFileTool({}, { isDirectory: true })
			expect(mockCline.consecutiveMistakeCount).toBe(0)
			expect(mockAskApproval).toHaveBeenCalled()
			// Use expect.any(String) and custom matcher to handle cross-platform paths
			expect(mockedFsRm).toHaveBeenCalledWith(
				expect.stringMatching(new RegExp(path.normalize(testFilePath).replace(/\\/g, "\\\\"))),
				{
					recursive: true,
					force: false,
				},
			)
			expect(mockPushToolResult).toHaveBeenCalledWith(expect.stringContaining("Deleted directory"))
		})
		it("should reject directory with protected files", async () => {
			const testDirPath = "test/dir"
			// Mock directory with a protected file
			mockedFsReaddir.mockResolvedValue([
				{
					name: "protected.txt",
					isFile: () => true,
					isDirectory: () => false,
					isSymbolicLink: () => false,
				},
			])
			// Mock stat - first call is for the directory itself
			mockedFsStat.mockResolvedValue({
				isDirectory: () => true,
				size: 100,
			})
			// THIS is the key: configure the mock BEFORE executeDeleteFileTool overwrites it
			// The executeDeleteFileTool helper sets isWriteProtected based on the 'isWriteProtected' option,
			// but that only affects the directory itself, not files inside it.
			// We need to set up a mock that returns true for files inside the directory.
			mockCline.rooProtectedController.isWriteProtected.mockImplementation((path) => {
				// Return true only for files inside the directory (containing "protected")
				return path.includes("protected")
			})
			const toolUse = {
				type: "tool_use",
				name: "delete_file",
				params: { path: testDirPath },
				partial: false,
			}
			await deleteFileTool(
				mockCline,
				toolUse,
				mockAskApproval,
				mockHandleError,
				mockPushToolResult,
				mockRemoveClosingTag,
			)
			expect(mockCline.say).toHaveBeenCalledWith("error", expect.stringContaining("protected file"))
			expect(mockCline.recordToolError).toHaveBeenCalledWith("delete_file")
			expect(mockedFsRm).not.toHaveBeenCalled()
		})
		it("should reject .git directory (protected by RooProtectedController)", async () => {
			// Mock .git directory with typical Git files
			mockedFsReaddir.mockResolvedValue([
				{ name: "HEAD", isFile: () => true, isDirectory: () => false, isSymbolicLink: () => false },
				{ name: "config", isFile: () => true, isDirectory: () => false, isSymbolicLink: () => false },
			])
			mockedFsStat.mockResolvedValue({
				isDirectory: () => true,
				size: 100,
			})
			// Configure protection controller to protect files in .git
			mockCline.rooProtectedController.isWriteProtected.mockImplementation((path) => {
				return path.startsWith(".git/") || path === ".git"
			})
			const toolUse = {
				type: "tool_use",
				name: "delete_file",
				params: { path: ".git" },
				partial: false,
			}
			await deleteFileTool(
				mockCline,
				toolUse,
				mockAskApproval,
				mockHandleError,
				mockPushToolResult,
				mockRemoveClosingTag,
			)
			expect(mockCline.say).toHaveBeenCalledWith("error", expect.stringContaining("protected file"))
			expect(mockCline.recordToolError).toHaveBeenCalledWith("delete_file")
			expect(mockedFsRm).not.toHaveBeenCalled()
		})
		it("should handle non-existent files", async () => {
			await executeDeleteFileTool({}, { fileExists: false })
			expect(mockCline.say).toHaveBeenCalledWith("error", expect.stringContaining("does not exist"))
			expect(mockCline.recordToolError).toHaveBeenCalledWith("delete_file")
			expect(mockedFsUnlink).not.toHaveBeenCalled()
		})
	})
	describe("user interaction", () => {
		it("should not delete when user rejects approval", async () => {
			mockAskApproval.mockResolvedValue(false)
			await executeDeleteFileTool({})
			expect(mockAskApproval).toHaveBeenCalled()
			expect(mockedFsUnlink).not.toHaveBeenCalled()
		})
	})
	describe("error handling", () => {
		it("should handle general errors", async () => {
			mockedFsUnlink.mockRejectedValue(new Error("Delete failed"))
			await executeDeleteFileTool({})
			expect(mockHandleError).toHaveBeenCalledWith("deleting file", expect.any(Error))
		})
	})
	describe("path display", () => {
		it("should pass relPath (not relativePath) to getReadablePath for approval message", async () => {
			await executeDeleteFileTool({ path: ".gitignore" })
			// getReadablePath should be called with the original relPath, not the computed relativePath
			// This prevents bugs where empty relativePath causes cwd basename to be shown
			expect(mockedGetReadablePath).toHaveBeenCalledWith(mockCline.cwd, ".gitignore")
		})
		it("should pass relPath (not relativePath) to getReadablePath for partial message", async () => {
			await executeDeleteFileTool({ path: ".gitignore" })
			// The partial message is sent regardless of the block.partial flag
			// getReadablePath should be called with relPath for this message
			expect(mockedGetReadablePath).toHaveBeenCalledWith(mockCline.cwd, ".gitignore")
		})
		it("should handle dot path correctly without showing workspace directory name", async () => {
			// This is a regression test for a bug where "." would cause
			// the workspace directory name to be shown instead of the file path
			await executeDeleteFileTool({ path: "." })
			// Should be called with ".", not with empty string or computed relativePath
			expect(mockedGetReadablePath).toHaveBeenCalledWith(mockCline.cwd, ".")
		})
	})
})
//# sourceMappingURL=deleteFileTool.spec.js.map
