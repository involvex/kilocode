export function chatChunk(options) {
	return {
		choices: [
			{
				delta: {
					content: options.content,
					role: "assistant",
				},
				finish_reason: options.finish_reason ?? "stop",
				index: 0,
				logprobs: null,
			},
		],
		usage: options.usage,
		created: Date.now(),
		id: options.id ?? "",
		model: options.model,
		object: "chat.completion.chunk",
	}
}
export function usageChatChunk(options) {
	return {
		choices: [],
		usage: options.usage,
		created: Date.now(),
		id: options.id ?? "",
		model: options.model,
		object: "chat.completion.chunk",
	}
}
export function chatCompletion(options) {
	return {
		choices: [
			{
				finish_reason: options.finish_reason ?? "stop",
				index: options.index ?? 0,
				logprobs: null,
				message: {
					content: options.content ?? null,
					role: "assistant",
					refusal: null,
				},
			},
		],
		usage: options.usage,
		created: Date.now(),
		id: options.id ?? "",
		model: options.model,
		object: "chat.completion",
	}
}
export function rerank(options) {
	return {
		data: options.data.map((score, index) => ({
			index,
			relevance_score: score,
		})),
		model: options.model,
		object: "list",
		usage: options.usage ?? {
			total_tokens: 0,
		},
	}
}
//# sourceMappingURL=util.js.map
