export const minimaxDefaultModelId = "MiniMax-M2"
export const minimaxModels = {
	"MiniMax-M2": {
		maxTokens: 16_384,
		contextWindow: 192_000,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.3,
		outputPrice: 1.2,
		cacheWritesPrice: 0.375,
		cacheReadsPrice: 0.03,
		preserveReasoning: true,
		description:
			"MiniMax M2, a model born for Agents and code, featuring Top-tier Coding Capabilities, Powerful Agentic Performance, and Ultimate Cost-Effectiveness & Speed.",
	},
	"MiniMax-M2-Stable": {
		maxTokens: 16_384,
		contextWindow: 192_000,
		supportsImages: false,
		supportsPromptCache: true,
		inputPrice: 0.3,
		outputPrice: 1.2,
		cacheWritesPrice: 0.375,
		cacheReadsPrice: 0.03,
		preserveReasoning: true,
		description:
			"MiniMax M2 Stable (High Concurrency, Commercial Use), a model born for Agents and code, featuring Top-tier Coding Capabilities, Powerful Agentic Performance, and Ultimate Cost-Effectiveness & Speed.",
	},
}
export const MINIMAX_DEFAULT_MAX_TOKENS = 16384 // kilocode_change
export const MINIMAX_DEFAULT_TEMPERATURE = 1.0
//# sourceMappingURL=minimax.js.map
