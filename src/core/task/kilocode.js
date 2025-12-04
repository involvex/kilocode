export function mergeApiMessages(message1, message2) {
	const content = new Array()
	if (typeof message1.content === "string") {
		content.push({ type: "text", text: message1.content })
	} else {
		content.push(...message1.content)
	}
	if (typeof message2.content === "string") {
		content.push({ type: "text", text: message2.content })
	} else {
		content.push(...message2.content)
	}
	return { ...message1, content }
}
export function addOrMergeUserContent(messages, newUserContent) {
	const result = [...messages]
	const lastIndex = result.length - 1
	const lastItem = result[lastIndex]
	if (lastItem && lastItem.type === "tool_result") {
		if (Array.isArray(lastItem.content)) {
			result[lastIndex] = {
				...lastItem,
				content: [...lastItem.content, ...newUserContent],
			}
		} else if (lastItem.content) {
			result[lastIndex] = {
				...lastItem,
				content: [{ type: "text", text: lastItem.content }, ...newUserContent],
			}
		} else {
			result[lastIndex] = { ...lastItem, content: newUserContent }
		}
	} else {
		result.push(...newUserContent)
	}
	return result
}
//# sourceMappingURL=kilocode.js.map
