/**
 * Hook for accessing and managing the ExtensionService
 * Provides access to service instance, readiness state, and lifecycle management
 */
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { useMemo, useCallback } from "react"
import {
	extensionServiceAtom,
	isServiceReadyAtom,
	serviceErrorAtom,
	isInitializingAtom,
	extensionAPIAtom,
	messageBridgeAtom,
	isServiceDisposedAtom,
	setExtensionServiceAtom,
	setServiceReadyAtom,
	setServiceErrorAtom,
	setIsInitializingAtom,
} from "../atoms/service.js"
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
export function useExtensionService() {
	// Read atoms
	const [service] = useAtom(extensionServiceAtom)
	const isReady = useAtomValue(isServiceReadyAtom)
	const isInitializing = useAtomValue(isInitializingAtom)
	const isDisposed = useAtomValue(isServiceDisposedAtom)
	const error = useAtomValue(serviceErrorAtom)
	const api = useAtomValue(extensionAPIAtom)
	const messageBridge = useAtomValue(messageBridgeAtom)
	// Write atoms
	const setService = useSetAtom(setExtensionServiceAtom)
	const markReady = useSetAtom(setServiceReadyAtom)
	const setError = useSetAtom(setServiceErrorAtom)
	const setInitializing = useSetAtom(setIsInitializingAtom)
	/**
	 * Initialize the service
	 * Handles initialization state and errors
	 */
	const initialize = useCallback(async () => {
		if (!service) {
			const err = new Error("Cannot initialize: service not set")
			setError(err)
			throw err
		}
		if (isReady) {
			return
		}
		try {
			setInitializing(true)
			await service.initialize()
			markReady(true)
		} catch (err) {
			const error = err instanceof Error ? err : new Error(String(err))
			setError(error)
			throw error
		}
	}, [service, isReady, setInitializing, markReady, setError])
	/**
	 * Dispose the service
	 * Cleans up resources and resets state
	 */
	const dispose = useCallback(async () => {
		if (!service) {
			return
		}
		try {
			await service.dispose()
			markReady(false)
			setService(null)
		} catch (err) {
			const error = err instanceof Error ? err : new Error(String(err))
			setError(error)
			throw error
		}
	}, [service, markReady, setService, setError])
	// Memoize return value to prevent unnecessary re-renders
	return useMemo(
		() => ({
			service,
			isReady,
			isInitializing,
			isDisposed,
			error,
			api,
			messageBridge,
			setService,
			initialize,
			dispose,
			markReady,
			setError,
		}),
		[
			service,
			isReady,
			isInitializing,
			isDisposed,
			error,
			api,
			messageBridge,
			setService,
			initialize,
			dispose,
			markReady,
			setError,
		],
	)
}
