import type { ProviderSettings } from "@roo-code/types"
import { ApiHandler } from "../api"
import { ApiStreamUsageChunk } from "../api/transform/stream"
/**
 * Enhances a prompt using the configured API without creating a full Cline instance or task history.
 * This is a lightweight alternative that only uses the API's completion functionality.
 */
export declare function singleCompletionHandler(apiConfiguration: ProviderSettings, promptText: string): Promise<string>
export declare function streamResponseFromHandler(
	handler: ApiHandler,
	promptText: string,
	systemPrompt?: string,
): Promise<{
	text: string
	usage?: ApiStreamUsageChunk
}>
//# sourceMappingURL=single-completion-handler.d.ts.map
