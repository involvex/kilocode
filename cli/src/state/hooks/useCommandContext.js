/**
 * Hook for creating CommandContext objects
 * Encapsulates all dependencies needed for command execution
 */
import { useSetAtom, useAtomValue } from "jotai"
import { useCallback } from "react"
import {
	addMessageAtom,
	clearMessagesAtom,
	replaceMessagesAtom,
	setMessageCutoffTimestampAtom,
	isCommittingParallelModeAtom,
	refreshTerminalAtom,
} from "../atoms/ui.js"
import {
	setModeAtom,
	setThemeAtom,
	providerAtom,
	updateProviderAtom,
	selectProviderAtom,
	configAtom,
} from "../atoms/config.js"
import { routerModelsAtom, extensionStateAtom, isParallelModeAtom, chatMessagesAtom } from "../atoms/extension.js"
import { requestRouterModelsAtom } from "../atoms/actions.js"
import { profileDataAtom, balanceDataAtom, profileLoadingAtom, balanceLoadingAtom } from "../atoms/profile.js"
import {
	taskHistoryDataAtom,
	taskHistoryFiltersAtom,
	taskHistoryLoadingAtom,
	taskHistoryErrorAtom,
} from "../atoms/taskHistory.js"
import {
	modelListPageIndexAtom,
	modelListFiltersAtom,
	updateModelListFiltersAtom,
	changeModelListPageAtom,
	resetModelListStateAtom,
} from "../atoms/modelList.js"
import { useWebviewMessage } from "./useWebviewMessage.js"
import { useTaskHistory } from "./useTaskHistory.js"
import { getModelIdKey } from "../../constants/providers/models.js"
const TERMINAL_CLEAR_DELAY_MS = 500
/**
 * Hook that provides a factory for creating CommandContext objects
 *
 * This hook encapsulates all the dependencies needed to create a CommandContext,
 * making it easier to test and reuse command execution logic.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { createContext } = useCommandContext()
 *
 *   const handleCommand = (input: string, args: string[], options: Record<string, any>) => {
 *     const context = createContext(input, args, options, onExit)
 *     await command.handler(context)
 *   }
 * }
 * ```
 */
export function useCommandContext() {
	// Get atoms and hooks
	const addMessage = useSetAtom(addMessageAtom)
	const clearMessages = useSetAtom(clearMessagesAtom)
	const replaceMessages = useSetAtom(replaceMessagesAtom)
	const setMode = useSetAtom(setModeAtom)
	const setTheme = useSetAtom(setThemeAtom)
	const updateProvider = useSetAtom(updateProviderAtom)
	const selectProvider = useSetAtom(selectProviderAtom)
	const refreshRouterModels = useSetAtom(requestRouterModelsAtom)
	const setMessageCutoffTimestamp = useSetAtom(setMessageCutoffTimestampAtom)
	const setCommittingParallelMode = useSetAtom(isCommittingParallelModeAtom)
	const refreshTerminal = useSetAtom(refreshTerminalAtom)
	const { sendMessage, clearTask } = useWebviewMessage()
	// Get read-only state
	const routerModels = useAtomValue(routerModelsAtom)
	const currentProvider = useAtomValue(providerAtom)
	const extensionState = useAtomValue(extensionStateAtom)
	const kilocodeDefaultModel = extensionState?.kilocodeDefaultModel || ""
	const customModes = extensionState?.customModes || []
	const isParallelMode = useAtomValue(isParallelModeAtom)
	const config = useAtomValue(configAtom)
	const chatMessages = useAtomValue(chatMessagesAtom)
	// Get profile state
	const profileData = useAtomValue(profileDataAtom)
	const balanceData = useAtomValue(balanceDataAtom)
	const profileLoading = useAtomValue(profileLoadingAtom)
	const balanceLoading = useAtomValue(balanceLoadingAtom)
	// Get task history state and functions
	const taskHistoryData = useAtomValue(taskHistoryDataAtom)
	const taskHistoryFilters = useAtomValue(taskHistoryFiltersAtom)
	const taskHistoryLoading = useAtomValue(taskHistoryLoadingAtom)
	const taskHistoryError = useAtomValue(taskHistoryErrorAtom)
	const {
		fetchTaskHistory,
		updateFilters: updateTaskHistoryFiltersAndFetch,
		changePage: changeTaskHistoryPageAndFetch,
		nextPage: nextTaskHistoryPage,
		previousPage: previousTaskHistoryPage,
	} = useTaskHistory()
	// Get model list state and functions
	const modelListPageIndex = useAtomValue(modelListPageIndexAtom)
	const modelListFilters = useAtomValue(modelListFiltersAtom)
	const updateModelListFilters = useSetAtom(updateModelListFiltersAtom)
	const changeModelListPage = useSetAtom(changeModelListPageAtom)
	const resetModelListState = useSetAtom(resetModelListStateAtom)
	// Create the factory function
	const createContext = useCallback(
		(input, args, options, onExit) => {
			return {
				input,
				args,
				options,
				config,
				sendMessage: async (message) => {
					await sendMessage(message)
				},
				addMessage: (message) => {
					addMessage(message)
				},
				clearMessages: () => {
					clearMessages()
				},
				refreshTerminal: () => {
					return new Promise((resolve) => {
						refreshTerminal()
						setTimeout(() => {
							resolve()
						}, TERMINAL_CLEAR_DELAY_MS)
					})
				},
				replaceMessages: (messages) => {
					replaceMessages(messages)
				},
				setMessageCutoffTimestamp: (timestamp) => {
					setMessageCutoffTimestamp(timestamp)
				},
				clearTask: async () => {
					await clearTask()
				},
				setMode: async (mode) => {
					await setMode(mode)
				},
				setTheme: async (theme) => {
					await setTheme(theme)
				},
				exit: () => {
					onExit()
				},
				setCommittingParallelMode: (isCommitting) => {
					setCommittingParallelMode(isCommitting)
				},
				isParallelMode,
				// Model-related context
				routerModels,
				currentProvider: currentProvider || null,
				kilocodeDefaultModel,
				updateProviderModel: async (modelId) => {
					if (!currentProvider) {
						throw new Error("No provider configured")
					}
					const modelIdKey = getModelIdKey(currentProvider.provider)
					await updateProvider(currentProvider.id, {
						[modelIdKey]: modelId,
					})
				},
				refreshRouterModels: async () => {
					await refreshRouterModels()
				},
				// Provider update function for teams command
				updateProvider: async (providerId, updates) => {
					await updateProvider(providerId, updates)
				},
				// Provider selection function
				selectProvider: async (providerId) => {
					await selectProvider(providerId)
				},
				// Profile data context
				profileData,
				balanceData,
				profileLoading,
				balanceLoading,
				// Custom modes context
				customModes,
				// Task history context
				taskHistoryData,
				taskHistoryFilters,
				taskHistoryLoading,
				taskHistoryError,
				fetchTaskHistory,
				updateTaskHistoryFilters: updateTaskHistoryFiltersAndFetch,
				changeTaskHistoryPage: changeTaskHistoryPageAndFetch,
				nextTaskHistoryPage,
				previousTaskHistoryPage,
				sendWebviewMessage: sendMessage,
				chatMessages: chatMessages,
				// Model list context
				modelListPageIndex,
				modelListFilters,
				updateModelListFilters,
				changeModelListPage,
				resetModelListState,
			}
		},
		[
			config,
			addMessage,
			clearMessages,
			setMode,
			setTheme,
			sendMessage,
			clearTask,
			refreshTerminal,
			routerModels,
			currentProvider,
			kilocodeDefaultModel,
			updateProvider,
			selectProvider,
			refreshRouterModels,
			replaceMessages,
			setMessageCutoffTimestamp,
			profileData,
			balanceData,
			profileLoading,
			balanceLoading,
			setCommittingParallelMode,
			isParallelMode,
			customModes,
			taskHistoryData,
			taskHistoryFilters,
			taskHistoryLoading,
			taskHistoryError,
			fetchTaskHistory,
			updateTaskHistoryFiltersAndFetch,
			changeTaskHistoryPageAndFetch,
			nextTaskHistoryPage,
			previousTaskHistoryPage,
			chatMessages,
			modelListPageIndex,
			modelListFilters,
			updateModelListFilters,
			changeModelListPage,
			resetModelListState,
		],
	)
	return { createContext }
}
