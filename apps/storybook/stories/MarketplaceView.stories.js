import { MarketplaceView } from "../../../webview-ui/src/components/marketplace/MarketplaceView"
import { createMockMarketplaceStateManager } from "../src/mockData"
import { createExtensionStateMock } from "../src/utils/createExtensionStateMock"
import { withSidebarContainer } from "../src/decorators/withSidebarContainer"
const meta = {
	title: "Views/MarketplaceView",
	component: MarketplaceView,
	argTypes: {
		targetTab: {
			control: { type: "select" },
			options: ["mcp", "mode"],
			description: "Which tab should be active initially",
		},
		hideHeader: {
			control: "boolean",
			description: "Whether to hide the header",
		},
		onDone: {
			action: "onDone",
			description: "Callback when done button is clicked",
		},
	},
	args: {
		hideHeader: false,
		onDone: () => {},
	},
	decorators: [withSidebarContainer()],
	parameters: {
		extensionState: createExtensionStateMock({
			organizationAllowList: {
				allowAll: true,
				providers: {},
			},
			apiConfiguration: {
				apiProvider: "anthropic",
				apiModelId: "claude-3-5-sonnet-20241022",
				apiKey: "mock-key",
			},
			marketplaceInstalledMetadata: {
				global: {},
				project: {},
			},
			mcpServers: [],
			mode: "code",
			customModes: [],
		}),
	},
}
export default meta
export const MCPTab = {
	args: {
		stateManager: createMockMarketplaceStateManager("mcp"),
		targetTab: "mcp",
	},
}
export const ModeTab = {
	args: {
		stateManager: createMockMarketplaceStateManager("mode"),
		targetTab: "mode",
	},
}
