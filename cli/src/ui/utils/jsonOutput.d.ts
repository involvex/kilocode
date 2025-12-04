/**
 * JSON output utilities for CI mode
 * Converts messages to JSON format for non-interactive output
 */
import type { UnifiedMessage } from "../../state/atoms/ui.js"
/**
 * Convert a unified message to JSON output format
 */
export declare function formatMessageAsJson(unifiedMessage: UnifiedMessage):
	| Record<string, unknown>
	| {
			id: string
			type: "user" | "assistant" | "system" | "error" | "welcome" | "empty" | "requestCheckpointRestoreApproval"
			content: string
			partial?: boolean | undefined
			metadata?: {
				welcomeOptions?: import("../../types/cli.js").WelcomeMessageOptions | undefined
			}
			payload?: unknown
			timestamp: number
			source: string
	  }
/**
 * Output a message as JSON to stdout
 */
export declare function outputJsonMessage(unifiedMessage: UnifiedMessage): void
/**
 * Output multiple messages as JSON array to stdout
 */
export declare function outputJsonMessages(messages: UnifiedMessage[]): void
//# sourceMappingURL=jsonOutput.d.ts.map
