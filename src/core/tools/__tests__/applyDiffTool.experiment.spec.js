import { EXPERIMENT_IDS } from "../../../shared/experiments"
import { TOOL_PROTOCOL } from "@roo-code/types"
// Mock vscode
vi.mock("vscode", () => ({
	workspace: {
		getConfiguration: vi.fn(),
	},
}))
// Mock the ApplyDiffTool module
vi.mock("../ApplyDiffTool", () => ({
	applyDiffTool: {
		handle: vi.fn(),
	},
}))
// kilocode_change start
vi.mock("../kilocode/searchAndReplaceTool", () => ({
	searchAndReplaceTool: vi.fn(),
}))
import { searchAndReplaceTool } from "../kilocode/searchAndReplaceTool"
// kilocode_change end
// Import after mocking to get the mocked version
import { applyDiffTool as multiApplyDiffTool } from "../MultiApplyDiffTool"
import { applyDiffTool as applyDiffToolClass } from "../ApplyDiffTool"
describe("applyDiffTool experiment routing", () => {
	let mockCline
	let mockBlock
	let mockAskApproval
	let mockHandleError
	let mockPushToolResult
	let mockRemoveClosingTag
	let mockProvider
	beforeEach(async () => {
		vi.clearAllMocks()
		// Reset vscode mock to default behavior (XML protocol)
		const vscode = await import("vscode")
		vi.mocked(vscode.workspace.getConfiguration).mockReturnValue({
			get: vi.fn().mockReturnValue(TOOL_PROTOCOL.XML),
		})
		mockProvider = {
			getState: vi.fn(),
		}
		mockCline = {
			providerRef: {
				deref: vi.fn().mockReturnValue(mockProvider),
			},
			cwd: "/test",
			diffStrategy: {
				applyDiff: vi.fn(),
				getProgressStatus: vi.fn(),
			},
			diffViewProvider: {
				reset: vi.fn(),
			},
			api: {
				getModel: vi.fn().mockReturnValue({ id: "test-model" }),
			},
			processQueuedMessages: vi.fn(),
		}
		mockBlock = {
			params: {
				path: "test.ts",
				diff: "test diff",
			},
			partial: false,
		}
		mockAskApproval = vi.fn()
		mockHandleError = vi.fn()
		mockPushToolResult = vi.fn()
		mockRemoveClosingTag = vi.fn((tag, value) => value)
	})
	it("should use legacy tool when MULTI_FILE_APPLY_DIFF experiment is disabled", async () => {
		mockProvider.getState.mockResolvedValue({
			experiments: {
				[EXPERIMENT_IDS.MULTI_FILE_APPLY_DIFF]: false,
			},
		})
		applyDiffToolClass.handle.mockResolvedValue(undefined)
		await multiApplyDiffTool(
			mockCline,
			mockBlock,
			mockAskApproval,
			mockHandleError,
			mockPushToolResult,
			mockRemoveClosingTag,
		)
		expect(applyDiffToolClass.handle).toHaveBeenCalledWith(mockCline, mockBlock, {
			askApproval: mockAskApproval,
			handleError: mockHandleError,
			pushToolResult: mockPushToolResult,
			removeClosingTag: mockRemoveClosingTag,
		})
	})
	it("should use legacy tool when experiments are not defined", async () => {
		mockProvider.getState.mockResolvedValue({})
		applyDiffToolClass.handle.mockResolvedValue(undefined)
		await multiApplyDiffTool(
			mockCline,
			mockBlock,
			mockAskApproval,
			mockHandleError,
			mockPushToolResult,
			mockRemoveClosingTag,
		)
		expect(applyDiffToolClass.handle).toHaveBeenCalledWith(mockCline, mockBlock, {
			askApproval: mockAskApproval,
			handleError: mockHandleError,
			pushToolResult: mockPushToolResult,
			removeClosingTag: mockRemoveClosingTag,
		})
	})
	it("should use multi-file tool when MULTI_FILE_APPLY_DIFF experiment is enabled and using XML protocol", async () => {
		mockProvider.getState.mockResolvedValue({
			experiments: {
				[EXPERIMENT_IDS.MULTI_FILE_APPLY_DIFF]: true,
			},
		})
		// Mock the new tool behavior - it should continue with the multi-file implementation
		// Since we're not mocking the entire function, we'll just verify it doesn't call the class-based tool
		await multiApplyDiffTool(
			mockCline,
			mockBlock,
			mockAskApproval,
			mockHandleError,
			mockPushToolResult,
			mockRemoveClosingTag,
		)
		expect(applyDiffToolClass.handle).not.toHaveBeenCalled()
	})
	it("should use class-based tool when native protocol is enabled regardless of experiment", async () => {
		// Enable native protocol
		const vscode = await import("vscode")
		vi.mocked(vscode.workspace.getConfiguration).mockReturnValue({
			get: vi.fn().mockReturnValue(TOOL_PROTOCOL.NATIVE),
		})
		mockProvider.getState.mockResolvedValue({
			experiments: {
				[EXPERIMENT_IDS.MULTI_FILE_APPLY_DIFF]: true,
			},
		})
		searchAndReplaceTool.mockResolvedValue(undefined)
		await multiApplyDiffTool(
			mockCline,
			mockBlock,
			mockAskApproval,
			mockHandleError,
			mockPushToolResult,
			mockRemoveClosingTag,
		)
		// When native protocol is enabled, should always use class-based tool
		expect(searchAndReplaceTool).toHaveBeenCalledWith(
			mockCline,
			mockBlock,
			mockAskApproval,
			mockHandleError,
			mockPushToolResult,
		)
	})
})
//# sourceMappingURL=applyDiffTool.experiment.spec.js.map
