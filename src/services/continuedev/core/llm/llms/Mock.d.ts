import { ChatMessage, CompletionOptions, LLMOptions } from "../../index.js"
import { BaseLLM } from "../index.js"
type MockMessage = ChatMessage | "REPEAT_LAST_MSG" | "REPEAT_SYSTEM_MSG" | "ERROR"
declare class MockLLM extends BaseLLM {
	completion: string
	chatStreams: MockMessage[][] | undefined
	static providerName: string
	constructor(options: LLMOptions)
	protected _streamComplete(
		_prompt: string,
		_signal: AbortSignal,
		_options: CompletionOptions,
	): AsyncGenerator<string>
	protected _streamChat(
		messages: ChatMessage[],
		_signal: AbortSignal,
		_options: CompletionOptions,
	): AsyncGenerator<ChatMessage>
}
export { MockLLM }
//# sourceMappingURL=Mock.d.ts.map
