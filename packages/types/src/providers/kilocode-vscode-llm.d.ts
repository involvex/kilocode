export type VscodeLlmModelId = keyof typeof vscodeLlmModels
export declare const vscodeLlmDefaultModelId: VscodeLlmModelId
export declare const vscodeLlmModels: {
	readonly "gpt-3.5-turbo": {
		readonly contextWindow: 16384
		readonly maxTokens: 4096
		readonly supportsImages: false
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "gpt-3.5-turbo"
		readonly version: "gpt-3.5-turbo-0613"
		readonly name: "GPT 3.5 Turbo"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 12288
	}
	readonly "gpt-4o-mini": {
		readonly contextWindow: 128000
		readonly maxTokens: 4096
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "gpt-4o-mini"
		readonly version: "gpt-4o-mini-2024-07-18"
		readonly name: "GPT-4o mini"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 12288
	}
	readonly "gpt-4": {
		readonly contextWindow: 32768
		readonly maxTokens: 4096
		readonly supportsImages: false
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "gpt-4"
		readonly version: "gpt-4-0613"
		readonly name: "GPT 4"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 32768
	}
	readonly "gpt-4-0125-preview": {
		readonly contextWindow: 128000
		readonly maxTokens: 4096
		readonly supportsImages: false
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "gpt-4-turbo"
		readonly version: "gpt-4-0125-preview"
		readonly name: "GPT 4 Turbo"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 64000
	}
	readonly "gpt-4o": {
		readonly contextWindow: 128000
		readonly maxTokens: 16384
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "gpt-4o"
		readonly version: "gpt-4o-2024-11-20"
		readonly name: "GPT-4o"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 64000
	}
	readonly o1: {
		readonly contextWindow: 19827
		readonly supportsImages: false
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "o1-ga"
		readonly version: "o1-2024-12-17"
		readonly name: "o1 (Preview)"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 19827
	}
	readonly "o3-mini": {
		readonly contextWindow: 200000
		readonly maxTokens: 100000
		readonly supportsImages: false
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "o3-mini"
		readonly version: "o3-mini-2025-01-31"
		readonly name: "o3-mini"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 64000
	}
	readonly "claude-3.5-sonnet": {
		readonly contextWindow: 90000
		readonly maxTokens: 8192
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "claude-3.5-sonnet"
		readonly version: "claude-3.5-sonnet"
		readonly name: "Claude 3.5 Sonnet"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 90000
	}
	readonly "claude-4-sonnet": {
		readonly contextWindow: 216000
		readonly maxTokens: 16000
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "claude-sonnet-4"
		readonly version: "claude-sonnet-4"
		readonly name: "Claude Sonnet 4"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 128000
	}
	readonly "gemini-2.0-flash-001": {
		readonly contextWindow: 1000000
		readonly maxTokens: 8192
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "gemini-2.0-flash"
		readonly version: "gemini-2.0-flash-001"
		readonly name: "Gemini 2.0 Flash"
		readonly supportsToolCalling: false
		readonly maxInputTokens: 128000
	}
	readonly "gemini-2.5-pro": {
		readonly contextWindow: 128000
		readonly maxTokens: 64000
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "gemini-2.5-pro"
		readonly version: "gemini-2.5-pro"
		readonly name: "Gemini 2.5 Pro"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 128000
	}
	readonly "o4-mini": {
		readonly contextWindow: 200000
		readonly maxTokens: 100000
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "o4-mini"
		readonly version: "o4-mini-2025-04-16"
		readonly name: "o4-mini (Preview)"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 128000
	}
	readonly "gpt-4.1": {
		readonly contextWindow: 128000
		readonly maxTokens: 16384
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "gpt-4.1"
		readonly version: "gpt-4.1-2025-04-14"
		readonly name: "GPT-4.1"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 128000
	}
	readonly "gpt-5-mini": {
		readonly contextWindow: 264000
		readonly maxTokens: 127805
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "gpt-5-mini"
		readonly version: "gpt-5-mini"
		readonly name: "GPT-5 mini"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 128000
	}
	readonly "gpt-5": {
		readonly contextWindow: 264000
		readonly maxTokens: 64000
		readonly supportsImages: true
		readonly supportsPromptCache: false
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly family: "gpt-5"
		readonly version: "gpt-5"
		readonly name: "GPT-5"
		readonly supportsToolCalling: true
		readonly maxInputTokens: 128000
	}
}
//# sourceMappingURL=kilocode-vscode-llm.d.ts.map
