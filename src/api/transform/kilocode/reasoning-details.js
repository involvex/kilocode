// Originally from Cline: https://github.com/cline/cline/blob/ba98b44504d81ea2a261a7a18bf894b4893579c3/src/core/api/transform/openai-format.ts#L181
// Helper function to convert reasoning_details array to the format OpenRouter API expects
// Takes an array of reasoning detail objects and consolidates them by index
export function consolidateReasoningDetails(reasoningDetails) {
	if (!reasoningDetails || reasoningDetails.length === 0) {
		return []
	}
	// Group by index
	const groupedByIndex = new Map()
	for (const detail of reasoningDetails) {
		const index = detail.index ?? 0
		if (!groupedByIndex.has(index)) {
			groupedByIndex.set(index, [])
		}
		groupedByIndex.get(index).push(detail)
	}
	// Consolidate each group
	const consolidated = []
	for (const [index, details] of groupedByIndex.entries()) {
		// Concatenate all text parts
		let concatenatedText = ""
		let signature
		let id
		let format = "unknown"
		let type = "reasoning.text"
		for (const detail of details) {
			if (detail.text) {
				concatenatedText += detail.text
			}
			// Keep the signature from the last item that has one
			if (detail.signature) {
				signature = detail.signature
			}
			// Keep the id from the last item that has one
			if (detail.id) {
				id = detail.id
			}
			// Keep format and type from any item (they should all be the same)
			if (detail.format) {
				format = detail.format
			}
			if (detail.type) {
				type = detail.type
			}
		}
		// Create consolidated entry for text
		if (concatenatedText) {
			const consolidatedEntry = {
				type: type,
				text: concatenatedText,
				signature: signature,
				id: id,
				format: format,
				index: index,
			}
			consolidated.push(consolidatedEntry)
		}
		// For encrypted chunks (data), only keep the last one
		let lastDataEntry
		for (const detail of details) {
			if (detail.data) {
				lastDataEntry = {
					type: detail.type,
					data: detail.data,
					signature: detail.signature,
					id: detail.id,
					format: detail.format,
					index: index,
				}
			}
		}
		if (lastDataEntry) {
			consolidated.push(lastDataEntry)
		}
	}
	return consolidated
}
const supportsReasoningDetails = ["openrouter", "kilocode"]
export function maybeRemoveReasoningDetails_kilocode(messages, provider) {
	if (provider && supportsReasoningDetails.includes(provider)) {
		return messages
	}
	return messages
		.map((message) => {
			let { content } = message
			if (Array.isArray(content)) {
				content = content
					.map((block) => ("reasoning_details" in block ? { ...block, reasoning_details: undefined } : block))
					.filter((block) => block.type !== "text" || !!block.text)
			}
			return { ...message, content }
		})
		.filter((message) => !Array.isArray(message.content) || message.content.length > 0)
}
//# sourceMappingURL=reasoning-details.js.map
