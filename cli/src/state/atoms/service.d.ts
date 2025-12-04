/**
 * Service-related Jotai atoms for managing ExtensionService instance and status
 */
import type { ExtensionService } from "../../services/extension.js"
import type { ExtensionAPI } from "../../host/ExtensionHost.js"
import type { MessageBridge } from "../../communication/ipc.js"
/**
 * Atom to hold the ExtensionService instance
 * This is the core service that manages the extension host and message bridge
 */
export declare const extensionServiceAtom: import("jotai").PrimitiveAtom<ExtensionService | null> & {
	init: ExtensionService | null
}
/**
 * Atom to track if the service is ready (initialized and not disposed)
 */
export declare const isServiceReadyAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Atom to track service initialization errors
 */
export declare const serviceErrorAtom: import("jotai").PrimitiveAtom<Error | null> & {
	init: Error | null
}
/**
 * Atom to track if the service is currently initializing
 */
export declare const isInitializingAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
/**
 * Derived atom to get the ExtensionAPI from the service
 * Returns null if service is not ready or API is not available
 */
export declare const extensionAPIAtom: import("jotai").Atom<ExtensionAPI | null>
/**
 * Derived atom to get the MessageBridge from the service
 * Returns null if service is not available
 */
export declare const messageBridgeAtom: import("jotai").Atom<MessageBridge | null>
/**
 * Derived atom to check if the service is disposed
 */
export declare const isServiceDisposedAtom: import("jotai").Atom<boolean>
/**
 * Action atom to set the ExtensionService instance
 * This should be called once during application initialization
 */
export declare const setExtensionServiceAtom: import("jotai").WritableAtom<
	null,
	[service: ExtensionService | null],
	void
> & {
	init: null
}
/**
 * Action atom to mark the service as ready
 * This should be called after successful initialization
 */
export declare const setServiceReadyAtom: import("jotai").WritableAtom<null, [ready: boolean], void> & {
	init: null
}
/**
 * Action atom to set a service error
 * This should be called when initialization or operation fails
 */
export declare const setServiceErrorAtom: import("jotai").WritableAtom<null, [error: Error | null], void> & {
	init: null
}
/**
 * Action atom to set initialization state
 */
export declare const setIsInitializingAtom: import("jotai").WritableAtom<null, [initializing: boolean], void> & {
	init: null
}
//# sourceMappingURL=service.d.ts.map
