/**
 * Custom React hooks for service integration
 *
 * This module exports all custom hooks for accessing and managing
 * the ExtensionService, messages, tasks, models, and command input.
 */
// Service hooks
export { useExtensionService } from "./useExtensionService.js"
// CI mode hooks
export { useCIMode } from "./useCIMode.js"
// Message hooks
export { useWebviewMessage } from "./useWebviewMessage.js"
export { useExtensionMessage } from "./useExtensionMessage.js"
// Task management hooks
export { useTaskManagement } from "./useTaskManagement.js"
// Model selection hooks
export { useModelSelection } from "./useModelSelection.js"
// Profile hooks
export { useProfile } from "./useProfile.js"
// Command input hooks
export { useCommandInput } from "./useCommandInput.js"
// Command execution hooks
export { useCommandContext } from "./useCommandContext.js"
export { useCommandHandler } from "./useCommandHandler.js"
export { useMessageHandler } from "./useMessageHandler.js"
export { useTaskState } from "./useTaskState.js"
// Theme hooks
export { useTheme } from "./useTheme.js"
// Approval hooks
export { useApprovalHandler } from "./useApprovalHandler.js"
export { useApprovalMonitor } from "./useApprovalMonitor.js"
export { useFollowupSuggestions } from "./useFollowupSuggestions.js"
export { useFollowupCIResponse } from "./useFollowupCIResponse.js"
export { useTerminal } from "./useTerminal.js"
export { useFollowupHandler } from "./useFollowupHandler.js"
