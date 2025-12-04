import { LLMClient } from "./llm-client.js"
export declare class FimTester {
	private llmClient
	constructor(llmClient: LLMClient)
	getCompletion(
		code: string,
		testCaseName?: string,
	): Promise<{
		prefix: string
		completion: string
		suffix: string
	}>
	getName(): string
}
//# sourceMappingURL=fim-tester.d.ts.map
