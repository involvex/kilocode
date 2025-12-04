import type { ModelInfo } from "../model.js"
export declare const doubaoDefaultModelId = "doubao-seed-code-preview-latest"
export declare const doubaoModels: {
	readonly "doubao-seed-1-6-250615": {
		readonly maxTokens: 32768
		readonly contextWindow: 128000
		readonly supportsImages: true
		readonly supportsPromptCache: true
		readonly inputPrice: 0.0001
		readonly outputPrice: 0.0004
		readonly cacheWritesPrice: 0.0001
		readonly cacheReadsPrice: 0.00002
		readonly description: "Doubao Seed 1.6 is a powerful model designed for high-performance tasks with extensive context handling."
	}
	readonly "doubao-seed-1-6-thinking-250715": {
		readonly maxTokens: 32768
		readonly contextWindow: 128000
		readonly supportsImages: true
		readonly supportsPromptCache: true
		readonly inputPrice: 0.0002
		readonly outputPrice: 0.0008
		readonly cacheWritesPrice: 0.0002
		readonly cacheReadsPrice: 0.00004
		readonly description: "Doubao Seed 1.6 Thinking is optimized for reasoning tasks, providing enhanced performance in complex problem-solving scenarios."
	}
	readonly "doubao-seed-1-6-flash-250715": {
		readonly maxTokens: 32768
		readonly contextWindow: 128000
		readonly supportsImages: true
		readonly supportsPromptCache: true
		readonly inputPrice: 0.00015
		readonly outputPrice: 0.0006
		readonly cacheWritesPrice: 0.00015
		readonly cacheReadsPrice: 0.00003
		readonly description: "Doubao Seed 1.6 Flash is tailored for speed and efficiency, making it ideal for applications requiring rapid responses."
	}
	readonly "doubao-seed-code-preview-251028": {
		readonly maxTokens: 32768
		readonly contextWindow: 256000
		readonly supportsImages: true
		readonly supportsPromptCache: true
		readonly inputPrice: 0.1687
		readonly outputPrice: 1.1247
		readonly cacheWritesPrice: 0.0024
		readonly cacheReadsPrice: 0.0337
		readonly description: "Doubao-seed-code is an AI coding model specifically designed for real-world development scenarios, enhancing bug-fixing and front-end capabilities. It supports transparent input caching, reducing usage costs."
	}
	readonly "doubao-seed-code-preview-latest": {
		readonly maxTokens: 32768
		readonly contextWindow: 256000
		readonly supportsImages: true
		readonly supportsPromptCache: true
		readonly inputPrice: 0.1687
		readonly outputPrice: 1.1247
		readonly cacheWritesPrice: 0.0024
		readonly cacheReadsPrice: 0.0337
		readonly description: "Doubao-seed-code is an AI coding model specifically designed for real-world development scenarios, enhancing bug-fixing and front-end capabilities. It supports transparent input caching, reducing usage costs."
	}
}
export declare const doubaoDefaultModelInfo: ModelInfo
export declare const DOUBAO_API_BASE_URL = "https://ark.cn-beijing.volces.com/api/v3"
export declare const DOUBAO_API_CHAT_PATH = "/chat/completions"
//# sourceMappingURL=doubao.d.ts.map
