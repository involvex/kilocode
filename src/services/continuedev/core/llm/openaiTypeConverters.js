function toChatMessage(message) {
	if (message.role === "system") {
		return {
			role: "system",
			content: message.content,
		}
	}
	if (message.role === "assistant") {
		return {
			role: "assistant",
			content:
				typeof message.content === "string"
					? message.content || " " // LM Studio (and other providers) don't accept empty content
					: message.content.filter((part) => part.type === "text").map((part) => part), // can remove with newer typescript version
		}
	} else {
		if (typeof message.content === "string") {
			return {
				role: "user",
				content: message.content ?? " ", // LM Studio (and other providers) don't accept empty content
			}
		}
		// Extract text from message parts
		return {
			role: "user",
			content: message.content.map((item) => item.text).join("") || " ",
		}
	}
}
export function toChatBody(messages, options) {
	return {
		messages: messages.map(toChatMessage),
		model: options.model,
		max_tokens: options.maxTokens,
		temperature: options.temperature,
		top_p: options.topP,
		frequency_penalty: options.frequencyPenalty,
		presence_penalty: options.presencePenalty,
		stream: options.stream ?? true,
		stop: options.stop,
	}
}
export function toCompleteBody(prompt, options) {
	return {
		prompt,
		model: options.model,
		max_tokens: options.maxTokens,
		temperature: options.temperature,
		top_p: options.topP,
		frequency_penalty: options.frequencyPenalty,
		presence_penalty: options.presencePenalty,
		stream: options.stream ?? true,
		stop: options.stop,
	}
}
export function toFimBody(prefix, suffix, options) {
	return {
		model: options.model,
		prompt: prefix,
		suffix,
		max_tokens: options.maxTokens,
		temperature: options.temperature,
		top_p: options.topP,
		frequency_penalty: options.frequencyPenalty,
		presence_penalty: options.presencePenalty,
		stop: options.stop,
		stream: true,
	}
}
export function fromChatResponse(response) {
	const message = response.choices[0].message
	return {
		role: "assistant",
		content: message.content ?? "",
	}
}
export function fromChatCompletionChunk(chunk) {
	const delta = chunk.choices?.[0]?.delta
	if (delta?.content) {
		return {
			role: "assistant",
			content: delta.content,
		}
	}
	return undefined
}
//# sourceMappingURL=openaiTypeConverters.js.map
