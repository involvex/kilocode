export const geminiCliDefaultModelId = "gemini-2.5-flash"
export const geminiCliModels = {
	"gemini-2.5-flash": {
		maxTokens: 64_000,
		contextWindow: 1_048_576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		maxThinkingTokens: 24_576,
		supportsReasoningBudget: true,
	},
	"gemini-2.5-pro": {
		maxTokens: 64_000,
		contextWindow: 1_048_576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		maxThinkingTokens: 32_768,
		supportsReasoningBudget: true,
		requiredReasoningBudget: true,
	},
	"gemini-3-pro-preview": {
		maxTokens: 64_000,
		contextWindow: 1_048_576,
		supportsImages: true,
		supportsPromptCache: false,
		inputPrice: 0,
		outputPrice: 0,
		supportsReasoningBudget: true,
		maxThinkingTokens: 64_000,
	},
}
//# sourceMappingURL=gemini-cli.js.map
