/**
 * Custom React hooks for service integration
 *
 * This module exports all custom hooks for accessing and managing
 * the ExtensionService, messages, tasks, models, and command input.
 */
export { useExtensionService } from "./useExtensionService.js"
export type { UseExtensionServiceReturn } from "./useExtensionService.js"
export { useCIMode } from "./useCIMode.js"
export type { UseCIModeOptions, UseCIModeReturn } from "./useCIMode.js"
export { useWebviewMessage } from "./useWebviewMessage.js"
export type {
	UseWebviewMessageReturn,
	SendTaskParams,
	SendAskResponseParams,
	RespondToToolParams,
} from "./useWebviewMessage.js"
export { useExtensionMessage } from "./useExtensionMessage.js"
export type { UseExtensionMessageReturn, MessageFilter } from "./useExtensionMessage.js"
export { useTaskManagement } from "./useTaskManagement.js"
export type { UseTaskManagementReturn, TodoFilter } from "./useTaskManagement.js"
export { useModelSelection } from "./useModelSelection.js"
export type { UseModelSelectionReturn } from "./useModelSelection.js"
export { useProfile } from "./useProfile.js"
export type { UseProfileReturn } from "./useProfile.js"
export { useCommandInput } from "./useCommandInput.js"
export type { UseCommandInputReturn } from "./useCommandInput.js"
export { useCommandContext } from "./useCommandContext.js"
export type { UseCommandContextReturn, CommandContextFactory } from "./useCommandContext.js"
export { useCommandHandler } from "./useCommandHandler.js"
export type { UseCommandHandlerReturn } from "./useCommandHandler.js"
export { useMessageHandler } from "./useMessageHandler.js"
export type { UseMessageHandlerReturn } from "./useMessageHandler.js"
export { useTaskState } from "./useTaskState.js"
export type { UseTaskStateReturn } from "./useTaskState.js"
export { useTheme } from "./useTheme.js"
export { useApprovalHandler } from "./useApprovalHandler.js"
export type { UseApprovalHandlerOptions, UseApprovalHandlerReturn } from "./useApprovalHandler.js"
export { useApprovalMonitor } from "./useApprovalMonitor.js"
export { useFollowupSuggestions } from "./useFollowupSuggestions.js"
export type { UseFollowupSuggestionsReturn } from "./useFollowupSuggestions.js"
export { useFollowupCIResponse } from "./useFollowupCIResponse.js"
export { useTerminal } from "./useTerminal.js"
export { useFollowupHandler } from "./useFollowupHandler.js"
//# sourceMappingURL=index.d.ts.map
