export interface LLMResponse {
	content: string
	provider: string
	model: string
	tokensUsed?: number
}
export interface FimResponse {
	completion: string
	provider: string
	model: string
	tokensUsed?: number
}
export declare class LLMClient {
	private provider
	private model
	private openai
	private useFim
	private baseUrl
	constructor(useFim?: boolean)
	isFimMode(): boolean
	sendPrompt(systemPrompt: string, userPrompt: string): Promise<LLMResponse>
	sendFimCompletion(prefix: string, suffix: string): Promise<FimResponse>
}
//# sourceMappingURL=llm-client.d.ts.map
