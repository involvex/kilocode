import { MessageCreateParams } from "@anthropic-ai/sdk/resources"
type CachingStrategy = (anthropicBody: MessageCreateParams) => MessageCreateParams
export declare const CACHING_STRATEGIES: {
	readonly none: CachingStrategy
	readonly systemOnly: CachingStrategy
	readonly systemAndTools: CachingStrategy
	readonly optimized: CachingStrategy
}
export type CachingStrategyName = keyof typeof CACHING_STRATEGIES
export {}
//# sourceMappingURL=AnthropicCachingStrategies.d.ts.map
