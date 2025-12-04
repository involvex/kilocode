/**
 * Integration tests for teams command with model validation
 */
import { describe, it, expect, vi, beforeEach } from "vitest"
// Mock the logs
vi.mock("../../services/logs.js", () => ({
	logs: {
		warn: vi.fn(),
		error: vi.fn(),
		info: vi.fn(),
		debug: vi.fn(),
	},
}))
describe("teams command - model validation", () => {
	let mockContext
	let updateProviderMock
	let refreshRouterModelsMock
	let addMessageMock
	beforeEach(() => {
		updateProviderMock = vi.fn().mockResolvedValue(undefined)
		refreshRouterModelsMock = vi.fn().mockResolvedValue(undefined)
		addMessageMock = vi.fn()
		const availableModels = {
			"claude-sonnet-4": {
				contextWindow: 200000,
				supportsPromptCache: true,
			},
			"claude-haiku": {
				contextWindow: 200000,
				supportsPromptCache: true,
			},
		}
		mockContext = {
			args: [],
			currentProvider: {
				id: "test-provider",
				provider: "kilocode",
				kilocodeModel: "claude-sonnet-4",
				kilocodeToken: "test-token",
				kilocodeOrganizationId: undefined,
			},
			config: {},
			addMessage: addMessageMock,
			updateProvider: updateProviderMock,
			refreshRouterModels: refreshRouterModelsMock,
			routerModels: {
				kilocode: availableModels,
			},
			kilocodeDefaultModel: "claude-sonnet-4",
			profileData: {
				organizations: [
					{
						id: "org-1",
						name: "Test Org",
						role: "admin",
					},
				],
			},
			profileLoading: false,
		}
	})
	it("should refresh router models after team switch", async () => {
		const { teamsCommand } = await import("../teams.js")
		mockContext.args = ["select", "test-org"]
		await teamsCommand.handler(mockContext)
		expect(refreshRouterModelsMock).toHaveBeenCalled()
	})
	it("should handle personal account switch with model validation", async () => {
		const { teamsCommand } = await import("../teams.js")
		mockContext.currentProvider.kilocodeOrganizationId = "org-1"
		mockContext.args = ["select", "personal"]
		await teamsCommand.handler(mockContext)
		// Should update to personal (no org ID)
		expect(updateProviderMock).toHaveBeenCalledWith(
			"test-provider",
			expect.objectContaining({
				kilocodeOrganizationId: undefined,
			}),
		)
		// Should refresh router models
		expect(refreshRouterModelsMock).toHaveBeenCalled()
	})
})
