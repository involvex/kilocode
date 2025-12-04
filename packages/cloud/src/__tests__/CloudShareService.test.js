/* eslint-disable @typescript-eslint/no-explicit-any */
import * as vscode from "vscode"
import { CloudAPI } from "../CloudAPI.js"
import { CloudShareService } from "../CloudShareService.js"
import { CloudAPIError, TaskNotFoundError } from "../errors.js"
const mockFetch = vi.fn()
global.fetch = mockFetch
vi.mock("vscode", () => ({
	window: {
		showInformationMessage: vi.fn(),
		showErrorMessage: vi.fn(),
		showQuickPick: vi.fn(),
	},
	env: {
		clipboard: {
			writeText: vi.fn(),
		},
		openExternal: vi.fn(),
	},
	Uri: {
		parse: vi.fn(),
	},
	extensions: {
		getExtension: vi.fn(() => ({
			packageJSON: { version: "1.0.0" },
		})),
	},
}))
vi.mock("../Config", () => ({
	getRooCodeApiUrl: () => "https://app.roocode.com",
}))
vi.mock("../utils", () => ({
	getUserAgent: () => "Roo-Code 1.0.0",
}))
describe("CloudShareService", () => {
	let shareService
	let mockAuthService
	let mockSettingsService
	let mockCloudAPI
	let mockLog
	beforeEach(() => {
		vi.clearAllMocks()
		mockFetch.mockClear()
		mockLog = vi.fn()
		mockAuthService = {
			hasActiveSession: vi.fn(),
			getSessionToken: vi.fn(),
			isAuthenticated: vi.fn(),
		}
		mockSettingsService = {
			getSettings: vi.fn(),
		}
		mockCloudAPI = new CloudAPI(mockAuthService, mockLog)
		shareService = new CloudShareService(mockCloudAPI, mockSettingsService, mockLog)
	})
	describe("shareTask", () => {
		it("should share task with organization visibility and copy to clipboard", async () => {
			const mockResponseData = {
				success: true,
				shareUrl: "https://app.roocode.com/share/abc123",
			}
			mockAuthService.getSessionToken.mockReturnValue("session-token")
			mockFetch.mockResolvedValue({
				ok: true,
				json: vi.fn().mockResolvedValue(mockResponseData),
			})
			const result = await shareService.shareTask("task-123", "organization")
			expect(result.success).toBe(true)
			expect(result.shareUrl).toBe("https://app.roocode.com/share/abc123")
			expect(mockFetch).toHaveBeenCalledWith("https://app.roocode.com/api/extension/share", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer session-token",
					"User-Agent": "Roo-Code 1.0.0",
				},
				body: JSON.stringify({
					taskId: "task-123",
					visibility: "organization",
				}),
				signal: expect.any(AbortSignal),
			})
			expect(vscode.env.clipboard.writeText).toHaveBeenCalledWith("https://app.roocode.com/share/abc123")
		})
		it("should share task with public visibility", async () => {
			const mockResponseData = {
				success: true,
				shareUrl: "https://app.roocode.com/share/abc123",
			}
			mockAuthService.getSessionToken.mockReturnValue("session-token")
			mockFetch.mockResolvedValue({
				ok: true,
				json: vi.fn().mockResolvedValue(mockResponseData),
			})
			const result = await shareService.shareTask("task-123", "public")
			expect(result.success).toBe(true)
			expect(mockFetch).toHaveBeenCalledWith("https://app.roocode.com/api/extension/share", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer session-token",
					"User-Agent": "Roo-Code 1.0.0",
				},
				body: JSON.stringify({ taskId: "task-123", visibility: "public" }),
				signal: expect.any(AbortSignal),
			})
		})
		it("should default to organization visibility when not specified", async () => {
			const mockResponseData = {
				success: true,
				shareUrl: "https://app.roocode.com/share/abc123",
			}
			mockAuthService.getSessionToken.mockReturnValue("session-token")
			mockFetch.mockResolvedValue({
				ok: true,
				json: vi.fn().mockResolvedValue(mockResponseData),
			})
			const result = await shareService.shareTask("task-123")
			expect(result.success).toBe(true)
			expect(mockFetch).toHaveBeenCalledWith("https://app.roocode.com/api/extension/share", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer session-token",
					"User-Agent": "Roo-Code 1.0.0",
				},
				body: JSON.stringify({
					taskId: "task-123",
					visibility: "organization",
				}),
				signal: expect.any(AbortSignal),
			})
		})
		it("should handle API error response", async () => {
			const mockResponseData = {
				success: false,
				error: "Task not found",
			}
			mockAuthService.getSessionToken.mockReturnValue("session-token")
			mockFetch.mockResolvedValue({
				ok: true,
				json: vi.fn().mockResolvedValue(mockResponseData),
			})
			const result = await shareService.shareTask("task-123", "organization")
			expect(result.success).toBe(false)
			expect(result.error).toBe("Task not found")
		})
		it("should handle authentication errors", async () => {
			mockAuthService.getSessionToken.mockReturnValue(null)
			await expect(shareService.shareTask("task-123", "organization")).rejects.toThrow("Authentication required")
		})
		it("should handle unexpected errors", async () => {
			mockAuthService.getSessionToken.mockReturnValue("session-token")
			mockFetch.mockRejectedValue(new Error("Network error"))
			await expect(shareService.shareTask("task-123", "organization")).rejects.toThrow("Network error")
		})
		it("should throw TaskNotFoundError for 404 responses", async () => {
			mockAuthService.getSessionToken.mockReturnValue("session-token")
			mockFetch.mockResolvedValue({
				ok: false,
				status: 404,
				statusText: "Not Found",
				json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
				text: vi.fn().mockResolvedValue("Not Found"),
			})
			await expect(shareService.shareTask("task-123", "organization")).rejects.toThrow(TaskNotFoundError)
			await expect(shareService.shareTask("task-123", "organization")).rejects.toThrow("Task not found")
		})
		it("should throw generic Error for non-404 HTTP errors", async () => {
			mockAuthService.getSessionToken.mockReturnValue("session-token")
			mockFetch.mockResolvedValue({
				ok: false,
				status: 500,
				statusText: "Internal Server Error",
				json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
				text: vi.fn().mockResolvedValue("Internal Server Error"),
			})
			await expect(shareService.shareTask("task-123", "organization")).rejects.toThrow(CloudAPIError)
			await expect(shareService.shareTask("task-123", "organization")).rejects.toThrow(
				"HTTP 500: Internal Server Error",
			)
		})
		it("should create TaskNotFoundError with correct properties", async () => {
			mockAuthService.getSessionToken.mockReturnValue("session-token")
			mockFetch.mockResolvedValue({
				ok: false,
				status: 404,
				statusText: "Not Found",
				json: vi.fn().mockRejectedValue(new Error("Invalid JSON")),
				text: vi.fn().mockResolvedValue("Not Found"),
			})
			try {
				await shareService.shareTask("task-123", "organization")
				expect.fail("Expected TaskNotFoundError to be thrown")
			} catch (error) {
				expect(error).toBeInstanceOf(TaskNotFoundError)
				expect(error).toBeInstanceOf(Error)
				expect(error.message).toBe("Task not found")
			}
		})
	})
	describe("canShareTask", () => {
		it("should return true when authenticated and sharing is enabled", async () => {
			mockAuthService.isAuthenticated.mockReturnValue(true)
			mockSettingsService.getSettings.mockReturnValue({
				cloudSettings: {
					enableTaskSharing: true,
				},
			})
			const result = await shareService.canShareTask()
			expect(result).toBe(true)
		})
		it("should return false when authenticated but sharing is disabled", async () => {
			mockAuthService.isAuthenticated.mockReturnValue(true)
			mockSettingsService.getSettings.mockReturnValue({
				cloudSettings: {
					enableTaskSharing: false,
				},
			})
			const result = await shareService.canShareTask()
			expect(result).toBe(false)
		})
		it("should return false when authenticated and sharing setting is undefined (default)", async () => {
			mockAuthService.isAuthenticated.mockReturnValue(true)
			mockSettingsService.getSettings.mockReturnValue({
				cloudSettings: {},
			})
			const result = await shareService.canShareTask()
			expect(result).toBe(false)
		})
		it("should return false when authenticated and no settings available (default)", async () => {
			mockAuthService.isAuthenticated.mockReturnValue(true)
			mockSettingsService.getSettings.mockReturnValue(undefined)
			const result = await shareService.canShareTask()
			expect(result).toBe(false)
		})
		it("should return false when settings service returns undefined", async () => {
			mockSettingsService.getSettings.mockReturnValue(undefined)
			const result = await shareService.canShareTask()
			expect(result).toBe(false)
		})
		it("should handle errors gracefully", async () => {
			mockSettingsService.getSettings.mockImplementation(() => {
				throw new Error("Settings error")
			})
			const result = await shareService.canShareTask()
			expect(result).toBe(false)
			expect(mockLog).toHaveBeenCalledWith(
				"[ShareService] Error checking if task can be shared:",
				expect.any(Error),
			)
		})
	})
})
