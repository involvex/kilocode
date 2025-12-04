/**
 * Central export file for all Jotai atoms
 *
 * This file provides a single entry point for importing atoms throughout the application.
 * Atoms are organized by category for better maintainability.
 */
export {
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
} from "./service.js"
export {
	extensionStateAtom,
	chatMessagesAtom,
	currentTaskAtom,
	taskTodosAtom,
	routerModelsAtom,
	apiConfigurationAtom,
	extensionModeAtom,
	customModesAtom,
	mcpServersAtom,
	cwdAtom,
	isParallelModeAtom,
	extensionVersionAtom,
	currentApiConfigNameAtom,
	listApiConfigMetaAtom,
	taskHistoryLengthAtom,
	renderContextAtom,
	hasChatMessagesAtom as hasExtensionMessagesAtom,
	lastChatMessageAtom as lastExtensionMessageAtom,
	hasActiveTaskAtom,
	pendingTodosCountAtom,
	completedTodosCountAtom,
	inProgressTodosCountAtom,
	updateExtensionStateAtom,
	updateChatMessagesAtom,
	addChatMessageAtom,
	updateCurrentTaskAtom,
	updateTaskTodosAtom,
	updateRouterModelsAtom,
	updateExtensionModeAtom,
	updatePartialExtensionStateAtom,
	clearExtensionStateAtom,
} from "./extension.js"
export {
	configAtom,
	configLoadingAtom,
	configErrorAtom,
	providerAtom,
	providersAtom,
	modeAtom,
	mappedExtensionStateAtom,
	loadConfigAtom,
	saveConfigAtom,
	selectProviderAtom,
	addProviderAtom,
	updateProviderAtom,
	removeProviderAtom,
	setModeAtom,
	setThemeAtom,
} from "./config.js"
export {
	sendWebviewMessageAtom,
	sendTaskAtom,
	sendAskResponseAtom,
	requestRouterModelsAtom,
	clearTaskAtom,
	cancelTaskAtom,
	switchModeAtom,
	sendApiConfigurationAtom,
	sendCustomInstructionsAtom,
	sendAlwaysAllowAtom,
	respondToToolAtom,
	openFileAtom,
	openSettingsAtom,
	refreshStateAtom,
	sendPrimaryButtonClickAtom,
	sendSecondaryButtonClickAtom,
} from "./actions.js"
export {
	initializeServiceEffectAtom,
	disposeServiceEffectAtom,
	messageHandlerEffectAtom,
	processMessageBufferAtom,
	messageBufferSizeAtom,
	hasBufferedMessagesAtom,
	clearMessageBufferAtom,
} from "./effects.js"
export { validateModelOnRouterModelsUpdateAtom } from "./modelValidation.js"
export { syncConfigToExtensionEffectAtom } from "./config-sync.js"
export { notificationsAtom, notificationsLoadingAtom, notificationsErrorAtom } from "./notifications.js"
export {
	modelListPageIndexAtom,
	modelListFiltersAtom,
	updateModelListFiltersAtom,
	changeModelListPageAtom,
	resetModelListStateAtom,
	MODEL_LIST_PAGE_SIZE,
	defaultModelListFilters,
	type ModelListFilters,
	type ModelListState,
} from "./modelList.js"
export {
	messagesAtom,
	isStreamingAtom,
	errorAtom,
	isCommittingParallelModeAtom,
	commitCountdownSecondsAtom,
	showAutocompleteAtom,
	suggestionsAtom,
	argumentSuggestionsAtom,
	selectedSuggestionIndexAtom,
	followupSuggestionsAtom,
	showFollowupSuggestionsAtom,
	selectedFollowupIndexAtom,
	suggestionCountAtom,
	isCommandInputAtom,
	commandQueryAtom,
	hasMessagesAtom,
	lastMessageAtom,
	hasErrorAtom,
	getSelectedSuggestionAtom,
	getSelectedFollowupAtom,
	hasFollowupSuggestionsAtom,
	addMessageAtom,
	clearMessagesAtom,
	updateLastMessageAtom,
	setSuggestionsAtom,
	setArgumentSuggestionsAtom,
	selectNextSuggestionAtom,
	selectPreviousSuggestionAtom,
	setFollowupSuggestionsAtom,
	clearFollowupSuggestionsAtom,
	selectNextFollowupAtom,
	selectPreviousFollowupAtom,
	unselectFollowupAtom,
	setErrorAtom,
	hideAutocompleteAtom,
	showAutocompleteMenuAtom,
} from "./ui.js"
export type { ExtensionService } from "../../services/extension.js"
export type { ExtensionAPI } from "../../host/ExtensionHost.js"
export type { MessageBridge } from "../../communication/ipc.js"
export type {
	ExtensionMessage,
	WebviewMessage,
	ExtensionState,
	ExtensionChatMessage,
	HistoryItem,
	TodoItem,
	RouterModels,
	ProviderSettings,
	McpServer,
} from "../../types/messages.js"
export type { CliMessage } from "../../types/cli.js"
export type { CommandSuggestion, ArgumentSuggestion } from "../../services/autocomplete.js"
export type { FollowupSuggestion } from "./ui.js"
export type { KilocodeNotification } from "./notifications.js"
//# sourceMappingURL=index.d.ts.map
