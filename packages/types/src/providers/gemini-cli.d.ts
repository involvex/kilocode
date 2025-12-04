export type GeminiCliModelId = keyof typeof geminiCliModels
export declare const geminiCliDefaultModelId: GeminiCliModelId
export declare const geminiCliModels: {
	readonly "gemini-2.5-flash": {
		readonly maxTokens: 64000
		readonly contextWindow: 1048576
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly maxThinkingTokens: 24576
		readonly supportsReasoningBudget: true
	}
	readonly "gemini-2.5-pro": {
		readonly maxTokens: 64000
		readonly contextWindow: 1048576
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly maxThinkingTokens: 32768
		readonly supportsReasoningBudget: true
		readonly requiredReasoningBudget: true
	}
	readonly "gemini-3-pro-preview": {
		readonly maxTokens: 64000
		readonly contextWindow: 1048576
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly supportsReasoningBudget: true
		readonly maxThinkingTokens: 64000
	}
}
//# sourceMappingURL=gemini-cli.d.ts.map
