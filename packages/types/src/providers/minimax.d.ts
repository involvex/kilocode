export type MinimaxModelId = keyof typeof minimaxModels
export declare const minimaxDefaultModelId: MinimaxModelId
export declare const minimaxModels: {
	readonly "MiniMax-M2": {
		readonly maxTokens: 16384
		readonly contextWindow: 192000
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly inputPrice: 0.3
		readonly outputPrice: 1.2
		readonly cacheWritesPrice: 0.375
		readonly cacheReadsPrice: 0.03
		readonly preserveReasoning: true
		readonly description: "MiniMax M2, a model born for Agents and code, featuring Top-tier Coding Capabilities, Powerful Agentic Performance, and Ultimate Cost-Effectiveness & Speed."
	}
	readonly "MiniMax-M2-Stable": {
		readonly maxTokens: 16384
		readonly contextWindow: 192000
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly inputPrice: 0.3
		readonly outputPrice: 1.2
		readonly cacheWritesPrice: 0.375
		readonly cacheReadsPrice: 0.03
		readonly preserveReasoning: true
		readonly description: "MiniMax M2 Stable (High Concurrency, Commercial Use), a model born for Agents and code, featuring Top-tier Coding Capabilities, Powerful Agentic Performance, and Ultimate Cost-Effectiveness & Speed."
	}
}
export declare const MINIMAX_DEFAULT_MAX_TOKENS = 16384
export declare const MINIMAX_DEFAULT_TEMPERATURE = 1
//# sourceMappingURL=minimax.d.ts.map
