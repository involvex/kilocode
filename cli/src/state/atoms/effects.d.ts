/**
 * Effect atoms for message handling and service initialization
 * These atoms handle side effects like processing messages and initializing the service
 */
import type { ExtensionMessage } from "../../types/messages.js"
/**
 * Map to store pending output updates for command_output asks
 * Key: executionId, Value: latest output data
 * Exported so extension.ts can apply pending updates when asks appear
 */
export declare const pendingOutputUpdatesAtom: import("jotai").PrimitiveAtom<
	Map<
		string,
		{
			output: string
			command?: string
			completed?: boolean
		}
	>
> & {
	init: Map<
		string,
		{
			output: string
			command?: string
			completed?: boolean
		}
	>
}
/**
 * Map to track which commands have shown a command_output ask
 * Key: executionId, Value: true if ask was shown
 * Exported for testing
 */
export declare const commandOutputAskShownAtom: import("jotai").PrimitiveAtom<Map<string, boolean>> & {
	init: Map<string, boolean>
}
export interface IndexingStatus {
	systemStatus: string
	message?: string
	processedItems: number
	totalItems: number
	currentItemUnit?: string
	workspacePath?: string
	gitBranch?: string
	manifest?: {
		totalFiles: number
		totalChunks: number
		lastUpdated: string
	}
}
/**
 * Effect atom to initialize the ExtensionService
 * This sets up event listeners and activates the service
 */
export declare const initializeServiceEffectAtom: import("jotai").WritableAtom<
	null,
	[
		store?:
			| {
					set: <Value, Args extends unknown[], Result>(
						atom: import("jotai").WritableAtom<Value, Args, Result>,
						...args: Args
					) => Result
			  }
			| undefined,
	],
	Promise<void>
> & {
	init: null
}
/**
 * Effect atom to handle incoming extension messages
 * This processes messages and updates state accordingly
 */
export declare const messageHandlerEffectAtom: import("jotai").WritableAtom<null, [message: ExtensionMessage], void> & {
	init: null
}
/**
 * Effect atom to process buffered messages
 * This is called after the service becomes ready
 */
export declare const processMessageBufferAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Effect atom to dispose the service
 * This cleans up resources and removes event listeners
 */
export declare const disposeServiceEffectAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Derived atom to get the message buffer size
 * Useful for debugging and monitoring
 */
export declare const messageBufferSizeAtom: import("jotai").Atom<number>
/**
 * Derived atom to check if there are buffered messages
 */
export declare const hasBufferedMessagesAtom: import("jotai").Atom<boolean>
/**
 * Action atom to clear the message buffer
 * Useful for error recovery
 */
export declare const clearMessageBufferAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
//# sourceMappingURL=effects.d.ts.map
