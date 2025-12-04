export function getUserAgent(context) {
	return `Kilo-Code ${context?.extension?.packageJSON?.version || "unknown"}`
}
