function stripImages(messageContent) {
	if (typeof messageContent === "string") {
		return messageContent
	}
	return messageContent
		.filter((part) => part.type === "text")
		.map((part) => part.text)
		.join("\n")
}
export function renderChatMessage(message) {
	switch (message?.role) {
		case "user":
		case "assistant":
		case "system":
			return stripImages(message.content)
		default:
			return ""
	}
}
//# sourceMappingURL=messageContent.js.map
