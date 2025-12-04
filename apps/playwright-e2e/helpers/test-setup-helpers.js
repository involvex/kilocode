import { waitForWebviewText, configureApiKeyThroughUI, waitForModelSelector } from "./webview-helpers"
import { verifyExtensionInstalled, waitForAllExtensionActivation } from "./vscode-helpers"
export async function setupTestEnvironment(page) {
	await waitForAllExtensionActivation(page)
	await verifyExtensionInstalled(page)
	await waitForWebviewText(page, "Welcome to Kilo Code!")
	await configureApiKeyThroughUI(page)
	await waitForWebviewText(page, "Generate, refactor, and debug code with AI assistance")
	await waitForModelSelector(page)
}
