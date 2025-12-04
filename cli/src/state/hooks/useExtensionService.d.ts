/**
 * Hook for accessing and managing the ExtensionService
 * Provides access to service instance, readiness state, and lifecycle management
 */
import type { ExtensionService } from "../../services/extension.js"
import type { ExtensionAPI } from "../../host/ExtensionHost.js"
import type { MessageBridge } from "../../communication/ipc.js"
/**
 * Return type for useExtensionService hook
 */
export interface UseExtensionServiceReturn {
	/** The ExtensionService instance (null if not set) */
	service: ExtensionService | null
	/** Whether the service is ready for use */
	isReady: boolean
	/** Whether the service is currently initializing */
	isInitializing: boolean
	/** Whether the service has been disposed */
	isDisposed: boolean
	/** Current service error (null if no error) */
	error: Error | null
	/** The ExtensionAPI instance (null if service not ready) */
	api: ExtensionAPI | null
	/** The MessageBridge instance (null if service not available) */
	messageBridge: MessageBridge | null
	/** Set the ExtensionService instance */
	setService: (service: ExtensionService | null) => void
	/** Initialize the service */
	initialize: () => Promise<void>
	/** Dispose the service */
	dispose: () => Promise<void>
	/** Mark service as ready */
	markReady: (ready: boolean) => void
	/** Set a service error */
	setError: (error: Error | null) => void
}
/**
 * Hook for accessing and managing the ExtensionService
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { service, isReady, initialize, error } = useExtensionService()
 *
 *   useEffect(() => {
 *     if (!service) {
 *       const newService = createExtensionService()
 *       setService(newService)
 *       initialize()
 *     }
 *   }, [])
 *
 *   if (error) return <div>Error: {error.message}</div>
 *   if (!isReady) return <div>Loading...</div>
 *
 *   return <div>Service ready!</div>
 * }
 * ```
 */
export declare function useExtensionService(): UseExtensionServiceReturn
//# sourceMappingURL=useExtensionService.d.ts.map
