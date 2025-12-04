export type InternationalZAiModelId = keyof typeof internationalZAiModels
export declare const internationalZAiDefaultModelId: InternationalZAiModelId
export declare const internationalZAiModels: {
	readonly "glm-4.5": {
		readonly maxTokens: 98304
		readonly contextWindow: 131072
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly supportsReasoningBinary: true
		readonly inputPrice: 0.6
		readonly outputPrice: 2.2
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.11
		readonly description: "GLM-4.5 is Zhipu's latest featured model. Its comprehensive capabilities in reasoning, coding, and agent reach the state-of-the-art (SOTA) level among open-source models, with a context length of up to 128k."
	}
	readonly "glm-4.5-air": {
		readonly maxTokens: 98304
		readonly contextWindow: 131072
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly inputPrice: 0.2
		readonly outputPrice: 1.1
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.03
		readonly description: "GLM-4.5-Air is the lightweight version of GLM-4.5. It balances performance and cost-effectiveness, and can flexibly switch to hybrid thinking models."
	}
	readonly "glm-4.5-x": {
		readonly maxTokens: 98304
		readonly contextWindow: 131072
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly inputPrice: 2.2
		readonly outputPrice: 8.9
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.45
		readonly description: "GLM-4.5-X is a high-performance variant optimized for strong reasoning with ultra-fast responses."
	}
	readonly "glm-4.5-airx": {
		readonly maxTokens: 98304
		readonly contextWindow: 131072
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly inputPrice: 1.1
		readonly outputPrice: 4.5
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.22
		readonly description: "GLM-4.5-AirX is a lightweight, ultra-fast variant delivering strong performance with lower cost."
	}
	readonly "glm-4.5-flash": {
		readonly maxTokens: 98304
		readonly contextWindow: 131072
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0
		readonly description: "GLM-4.5-Flash is a free, high-speed model excellent for reasoning, coding, and agentic tasks."
	}
	readonly "glm-4.5v": {
		readonly maxTokens: 16384
		readonly contextWindow: 131072
		readonly supportsImages: true
		readonly supportsPromptCache: true
		readonly inputPrice: 0.6
		readonly outputPrice: 1.8
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.11
		readonly description: "GLM-4.5V is Z.AI's multimodal visual reasoning model (image/video/text/file input), optimized for GUI tasks, grounding, and document/video understanding."
	}
	readonly "glm-4.6": {
		readonly maxTokens: 98304
		readonly contextWindow: 200000
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly supportsReasoningBinary: true
		readonly inputPrice: 0.6
		readonly outputPrice: 2.2
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.11
		readonly description: "GLM-4.6 is Zhipu's newest model with an extended context window of up to 200k tokens, providing enhanced capabilities for processing longer documents and conversations."
	}
	readonly "glm-4-32b-0414-128k": {
		readonly maxTokens: 98304
		readonly contextWindow: 131072
		readonly supportsImages: false
		readonly supportsPromptCache: false
		readonly inputPrice: 0.1
		readonly outputPrice: 0.1
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0
		readonly description: "GLM-4-32B is a 32 billion parameter model with 128k context length, optimized for efficiency."
	}
}
export type MainlandZAiModelId = keyof typeof mainlandZAiModels
export declare const mainlandZAiDefaultModelId: MainlandZAiModelId
export declare const mainlandZAiModels: {
	readonly "glm-4.5": {
		readonly maxTokens: 98304
		readonly contextWindow: 131072
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly supportsReasoningBinary: true
		readonly inputPrice: 0.29
		readonly outputPrice: 1.14
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.057
		readonly description: "GLM-4.5 is Zhipu's latest featured model. Its comprehensive capabilities in reasoning, coding, and agent reach the state-of-the-art (SOTA) level among open-source models, with a context length of up to 128k."
	}
	readonly "glm-4.5-air": {
		readonly maxTokens: 98304
		readonly contextWindow: 131072
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly inputPrice: 0.1
		readonly outputPrice: 0.6
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.02
		readonly description: "GLM-4.5-Air is the lightweight version of GLM-4.5. It balances performance and cost-effectiveness, and can flexibly switch to hybrid thinking models."
	}
	readonly "glm-4.5-x": {
		readonly maxTokens: 98304
		readonly contextWindow: 131072
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly inputPrice: 0.29
		readonly outputPrice: 1.14
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.057
		readonly description: "GLM-4.5-X is a high-performance variant optimized for strong reasoning with ultra-fast responses."
	}
	readonly "glm-4.5-airx": {
		readonly maxTokens: 98304
		readonly contextWindow: 131072
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly inputPrice: 0.1
		readonly outputPrice: 0.6
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.02
		readonly description: "GLM-4.5-AirX is a lightweight, ultra-fast variant delivering strong performance with lower cost."
	}
	readonly "glm-4.5-flash": {
		readonly maxTokens: 98304
		readonly contextWindow: 131072
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly inputPrice: 0
		readonly outputPrice: 0
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0
		readonly description: "GLM-4.5-Flash is a free, high-speed model excellent for reasoning, coding, and agentic tasks."
	}
	readonly "glm-4.5v": {
		readonly maxTokens: 16384
		readonly contextWindow: 131072
		readonly supportsImages: true
		readonly supportsPromptCache: true
		readonly inputPrice: 0.29
		readonly outputPrice: 0.93
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.057
		readonly description: "GLM-4.5V is Z.AI's multimodal visual reasoning model (image/video/text/file input), optimized for GUI tasks, grounding, and document/video understanding."
	}
	readonly "glm-4.6": {
		readonly maxTokens: 98304
		readonly contextWindow: 204800
		readonly supportsImages: false
		readonly supportsPromptCache: true
		readonly supportsReasoningBinary: true
		readonly inputPrice: 0.29
		readonly outputPrice: 1.14
		readonly cacheWritesPrice: 0
		readonly cacheReadsPrice: 0.057
		readonly description: "GLM-4.6 is Zhipu's newest model with an extended context window of up to 200k tokens, providing enhanced capabilities for processing longer documents and conversations."
	}
}
export declare const ZAI_DEFAULT_TEMPERATURE = 0.6
export declare const zaiApiLineConfigs: {
	international_coding: {
		name: string
		baseUrl: string
		isChina: false
	}
	china_coding: {
		name: string
		baseUrl: string
		isChina: true
	}
}
//# sourceMappingURL=zai.d.ts.map
