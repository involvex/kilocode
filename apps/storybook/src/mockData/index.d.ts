export * from "./clineMessages"
export declare const mockMarketplaceItems: (
	| {
			id: string
			name: string
			description: string
			author: string
			tags: string[]
			type: "mcp"
			url: string
			content: string
	  }
	| {
			id: string
			name: string
			description: string
			author: string
			tags: string[]
			type: "mode"
			content: string
			url?: undefined
	  }
)[]
export declare const mockModes: {
	slug: string
	name: string
	description: string
	roleDefinition: string
	whenToUse: string
	groups: string[]
	source: "builtin"
}[]
export declare const createMockMarketplaceStateManager: (activeTab?: "mcp" | "mode") => {
	getState: () => {
		allItems: (
			| {
					id: string
					name: string
					description: string
					author: string
					tags: string[]
					type: "mcp"
					url: string
					content: string
			  }
			| {
					id: string
					name: string
					description: string
					author: string
					tags: string[]
					type: "mode"
					content: string
					url?: undefined
			  }
		)[]
		organizationMcps: never[]
		displayItems: (
			| {
					id: string
					name: string
					description: string
					author: string
					tags: string[]
					type: "mcp"
					url: string
					content: string
			  }
			| {
					id: string
					name: string
					description: string
					author: string
					tags: string[]
					type: "mode"
					content: string
					url?: undefined
			  }
		)[]
		displayOrganizationMcps: never[]
		isFetching: boolean
		activeTab: "mcp" | "mode"
		filters: {
			type: string
			search: string
			tags: never[]
			installed: "all"
		}
		installedMetadata: {
			global: {}
			project: {}
		}
	}
	transition: () => Promise<void>
	onStateChange: () => () => void
	cleanup: () => void
	handleMessage: () => Promise<void>
}
//# sourceMappingURL=index.d.ts.map
