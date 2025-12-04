/**
 * Hook for sending webview messages to the extension
 * Provides type-safe message sending helpers with error handling
 */
import { useSetAtom } from "jotai"
import { useCallback, useMemo } from "react"
import {
	sendWebviewMessageAtom,
	sendTaskAtom,
	sendAskResponseAtom,
	requestRouterModelsAtom,
	clearTaskAtom,
	cancelTaskAtom,
	resumeTaskAtom,
	switchModeAtom,
	respondToToolAtom,
	sendApiConfigurationAtom,
	sendCustomInstructionsAtom,
	sendAlwaysAllowAtom,
	openFileAtom,
	openSettingsAtom,
	refreshStateAtom,
	sendPrimaryButtonClickAtom,
	sendSecondaryButtonClickAtom,
} from "../atoms/actions.js"
/**
 * Hook for sending webview messages to the extension
 *
 * Provides type-safe helpers for common message types with built-in error handling.
 * All methods are async and will throw errors if the service is not ready.
 *
 * @example
 * ```tsx
 * function TaskInput() {
 *   const { sendTask, isReady } = useWebviewMessage()
 *   const [input, setInput] = useState('')
 *
 *   const handleSubmit = async () => {
 *     try {
 *       await sendTask({ text: input })
 *       setInput('')
 *     } catch (error) {
 *       console.error('Failed to send task:', error)
 *     }
 *   }
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input value={input} onChange={e => setInput(e.target.value)} />
 *       <button disabled={!isReady}>Send</button>
 *     </form>
 *   )
 * }
 * ```
 */
export function useWebviewMessage() {
	// Get action atoms
	const sendMessage = useSetAtom(sendWebviewMessageAtom)
	const sendTaskAction = useSetAtom(sendTaskAtom)
	const sendAskResponseAction = useSetAtom(sendAskResponseAtom)
	const requestRouterModelsAction = useSetAtom(requestRouterModelsAtom)
	const clearTaskAction = useSetAtom(clearTaskAtom)
	const cancelTaskAction = useSetAtom(cancelTaskAtom)
	const resumeTaskAction = useSetAtom(resumeTaskAtom)
	const switchModeAction = useSetAtom(switchModeAtom)
	const respondToToolAction = useSetAtom(respondToToolAtom)
	const sendApiConfigurationAction = useSetAtom(sendApiConfigurationAtom)
	const sendCustomInstructionsAction = useSetAtom(sendCustomInstructionsAtom)
	const sendAlwaysAllowAction = useSetAtom(sendAlwaysAllowAtom)
	const openFileAction = useSetAtom(openFileAtom)
	const openSettingsAction = useSetAtom(openSettingsAtom)
	const refreshStateAction = useSetAtom(refreshStateAtom)
	const sendPrimaryButtonClickAction = useSetAtom(sendPrimaryButtonClickAtom)
	const sendSecondaryButtonClickAction = useSetAtom(sendSecondaryButtonClickAtom)
	// Wrap actions with useCallback for stable references
	const sendTask = useCallback(
		async (params) => {
			await sendTaskAction(params)
		},
		[sendTaskAction],
	)
	const sendAskResponse = useCallback(
		async (params) => {
			await sendAskResponseAction(params)
		},
		[sendAskResponseAction],
	)
	const requestRouterModels = useCallback(async () => {
		await requestRouterModelsAction()
	}, [requestRouterModelsAction])
	const clearTask = useCallback(async () => {
		await clearTaskAction()
	}, [clearTaskAction])
	const cancelTask = useCallback(async () => {
		await cancelTaskAction()
	}, [cancelTaskAction])
	const resumeTask = useCallback(async () => {
		await resumeTaskAction()
	}, [resumeTaskAction])
	const switchMode = useCallback(
		async (mode) => {
			await switchModeAction(mode)
		},
		[switchModeAction],
	)
	const respondToTool = useCallback(
		async (params) => {
			await respondToToolAction(params)
		},
		[respondToToolAction],
	)
	const sendApiConfiguration = useCallback(
		async (config) => {
			await sendApiConfigurationAction(config)
		},
		[sendApiConfigurationAction],
	)
	const sendCustomInstructions = useCallback(
		async (instructions) => {
			await sendCustomInstructionsAction(instructions)
		},
		[sendCustomInstructionsAction],
	)
	const sendAlwaysAllow = useCallback(
		async (alwaysAllow) => {
			await sendAlwaysAllowAction(alwaysAllow)
		},
		[sendAlwaysAllowAction],
	)
	const openFile = useCallback(
		async (filePath) => {
			await openFileAction(filePath)
		},
		[openFileAction],
	)
	const openSettings = useCallback(async () => {
		await openSettingsAction()
	}, [openSettingsAction])
	const refreshState = useCallback(async () => {
		await refreshStateAction()
	}, [refreshStateAction])
	const sendPrimaryButtonClick = useCallback(async () => {
		await sendPrimaryButtonClickAction()
	}, [sendPrimaryButtonClickAction])
	const sendSecondaryButtonClick = useCallback(async () => {
		await sendSecondaryButtonClickAction()
	}, [sendSecondaryButtonClickAction])
	// Memoize return value
	return useMemo(
		() => ({
			sendMessage,
			sendTask,
			sendAskResponse,
			requestRouterModels,
			clearTask,
			cancelTask,
			resumeTask,
			switchMode,
			respondToTool,
			sendApiConfiguration,
			sendCustomInstructions,
			sendAlwaysAllow,
			openFile,
			openSettings,
			refreshState,
			sendPrimaryButtonClick,
			sendSecondaryButtonClick,
		}),
		[
			sendMessage,
			sendTask,
			sendAskResponse,
			requestRouterModels,
			clearTask,
			cancelTask,
			resumeTask,
			switchMode,
			respondToTool,
			sendApiConfiguration,
			sendCustomInstructions,
			sendAlwaysAllow,
			openFile,
			openSettings,
			refreshState,
			sendPrimaryButtonClick,
			sendSecondaryButtonClick,
		],
	)
}
