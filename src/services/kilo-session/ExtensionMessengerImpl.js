import { singleCompletionHandler } from "../../utils/single-completion-handler"
export class ExtensionMessengerImpl {
	provider
	constructor(provider) {
		this.provider = provider
	}
	async sendWebviewMessage(message) {
		await this.provider.postMessageToWebview(message)
	}
	async requestSingleCompletion(prompt, timeoutMs) {
		const state = await this.provider.getState()
		if (!state?.apiConfiguration) {
			throw new Error("No API configuration available")
		}
		const timeoutPromise = new Promise((_, reject) => {
			setTimeout(() => reject(new Error("Single completion request timed out")), timeoutMs)
		})
		try {
			const completionPromise = singleCompletionHandler(state.apiConfiguration, prompt)
			return await Promise.race([completionPromise, timeoutPromise])
		} catch (error) {
			if (error instanceof Error && error.message.includes("timed out")) {
				throw new Error("Single completion request timed out")
			}
			throw error
		}
	}
}
//# sourceMappingURL=ExtensionMessengerImpl.js.map
