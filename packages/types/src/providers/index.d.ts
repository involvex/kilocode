export * from "./anthropic.js"
export * from "./bedrock.js"
export * from "./cerebras.js"
export * from "./chutes.js"
export * from "./claude-code.js"
export * from "./deepseek.js"
export * from "./doubao.js"
export * from "./featherless.js"
export * from "./fireworks.js"
export * from "./gemini.js"
export * from "./gemini-cli.js"
export * from "./ovhcloud.js"
export * from "./synthetic.js"
export * from "./inception.js"
export * from "./minimax.js"
export * from "./glama.js"
export * from "./groq.js"
export * from "./huggingface.js"
export * from "./io-intelligence.js"
export * from "./lite-llm.js"
export * from "./lm-studio.js"
export * from "./mistral.js"
export * from "./moonshot.js"
export * from "./nano-gpt.js"
export * from "./ollama.js"
export * from "./openai.js"
export * from "./openrouter.js"
export * from "./qwen-code.js"
export * from "./requesty.js"
export * from "./roo.js"
export * from "./sambanova.js"
export * from "./unbound.js"
export * from "./vertex.js"
export * from "./kilocode-vscode-llm.js"
export * from "./xai.js"
export * from "./vercel-ai-gateway.js"
export * from "./zai.js"
export * from "./deepinfra.js"
export * from "./minimax.js"
import type { ProviderName } from "../provider-settings.js"
/**
 * Get the default model ID for a given provider.
 * This function returns only the provider's default model ID, without considering user configuration.
 * Used as a fallback when provider models are still loading.
 */
export declare function getProviderDefaultModelId(
	provider: ProviderName,
	options?: {
		isChina?: boolean
	},
): string
//# sourceMappingURL=index.d.ts.map
