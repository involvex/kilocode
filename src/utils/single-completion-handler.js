import { buildApiHandler } from "../api" //kilocode_change
/**
 * Enhances a prompt using the configured API without creating a full Cline instance or task history.
 * This is a lightweight alternative that only uses the API's completion functionality.
 */
export async function singleCompletionHandler(apiConfiguration, promptText) {
	if (!promptText) {
		throw new Error("No prompt text provided")
	}
	if (!apiConfiguration || !apiConfiguration.apiProvider) {
		throw new Error("No valid API configuration provided")
	}
	const handler = buildApiHandler(apiConfiguration)
	// Initialize handler if it has an initialize method
	if ("initialize" in handler && typeof handler.initialize === "function") {
		await handler.initialize()
	}
	// Check if handler supports single completions
	if (!("completePrompt" in handler)) {
		// kilocode_change start - stream responses for handlers without completePrompt
		// throw new Error("The selected API provider does not support prompt enhancement")
		return (await streamResponseFromHandler(handler, promptText)).text
		// kilocode_change end
	}
	return handler.completePrompt(promptText)
}
// kilocode_change start - Stream responses using createMessage
export async function streamResponseFromHandler(handler, promptText, systemPrompt = "") {
	const stream = handler.createMessage(systemPrompt, [
		{ role: "user", content: [{ type: "text", text: promptText }] },
	])
	let text = ""
	let usage = undefined
	for await (const chunk of stream) {
		if (chunk.type === "text") {
			text += chunk.text
		} else if (chunk.type === "usage") {
			usage = chunk
		}
	}
	return { text, usage }
}
// kilocode_change end - streamResponseFromHandler
//# sourceMappingURL=single-completion-handler.js.map
