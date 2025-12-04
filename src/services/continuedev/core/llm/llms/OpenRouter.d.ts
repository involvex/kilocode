import { ChatCompletionCreateParams } from "openai/resources/index"
import { LLMOptions } from "../../index.js"
import { OpenAI } from "./OpenAI"
declare class OpenRouter extends OpenAI {
	static providerName: string
	protected supportsReasoningField: boolean
	protected supportsReasoningDetailsField: boolean
	static defaultOptions: Partial<LLMOptions>
	protected extraBodyProperties(): Record<string, any>
	/**
	 * Detect if the model is an Anthropic/Claude model
	 */
	private isAnthropicModel
	/**
	 * Add cache_control to message content for Anthropic models
	 */
	private addCacheControlToContent
	/**
	 * Override modifyChatBody to add Anthropic caching when appropriate
	 */
	protected modifyChatBody(body: ChatCompletionCreateParams): ChatCompletionCreateParams
}
export default OpenRouter
//# sourceMappingURL=OpenRouter.d.ts.map
