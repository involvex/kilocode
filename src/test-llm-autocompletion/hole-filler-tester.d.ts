import { LLMClient } from "./llm-client.js"
export declare class HoleFillerTester {
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
//# sourceMappingURL=hole-filler-tester.d.ts.map
