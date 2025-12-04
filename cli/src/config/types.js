// Type guards
export function isValidConfig(config) {
	return (
		typeof config === "object" &&
		config !== null &&
		"version" in config &&
		"provider" in config &&
		"providers" in config
	)
}
export function isProviderConfig(provider) {
	return typeof provider === "object" && provider !== null && "id" in provider && "provider" in provider
}
