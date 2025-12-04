/**
 * Hook for managing hotkey state and handlers
 */
import { useAtomValue } from "jotai"
import { useMemo } from "react"
import { isStreamingAtom, showFollowupSuggestionsAtom } from "../atoms/ui.js"
import { useApprovalHandler } from "./useApprovalHandler.js"
import { hasResumeTaskAtom } from "../atoms/extension.js"
import { shellModeActiveAtom } from "../atoms/keyboard.js"
/**
 * Detects the platform and returns the appropriate modifier key
 */
function getModifierKey() {
	const platform = process.platform
	return platform === "darwin" ? "Cmd" : "Ctrl"
}
/**
 * Hook to manage and display context-aware hotkeys
 *
 * Returns different hotkeys based on the current UI state:
 * - When streaming: Shows cancel hotkey
 * - When approval pending: Shows approval hotkeys
 * - When followup suggestions visible: Shows navigation hotkeys
 * - When idle: Shows general command hotkeys
 */
export function useHotkeys() {
	const isStreaming = useAtomValue(isStreamingAtom)
	const isFollowupVisible = useAtomValue(showFollowupSuggestionsAtom)
	const hasResumeTask = useAtomValue(hasResumeTaskAtom)
	const isShellModeActive = useAtomValue(shellModeActiveAtom)
	const { isApprovalPending } = useApprovalHandler()
	const modifierKey = useMemo(() => getModifierKey(), [])
	const hotkeys = useMemo(() => {
		// Priority 1: Resume task hotkey
		if (hasResumeTask) {
			return [{ keys: `${modifierKey}+R`, description: "to resume" }]
		}
		// Priority 2: Approval mode hotkeys
		if (isApprovalPending) {
			return [
				{ keys: "Y", description: "to approve" },
				{ keys: "N", description: "to reject" },
				{ keys: "Esc", description: "to cancel" },
			]
		}
		// Priority 3: Streaming state - show cancel
		if (isStreaming) {
			return [{ keys: `${modifierKey}+X`, description: "to cancel" }]
		}
		// Priority 4: Followup suggestions visible
		if (isFollowupVisible) {
			return [
				{ keys: "↑↓", description: "to navigate" },
				{ keys: "Tab", description: "to fill" },
				{ keys: "Enter", description: "to submit" },
			]
		}
		// Priority 5: Shell mode hotkeys
		if (isShellModeActive) {
			return [
				{ keys: "Up/Down", description: "history" },
				{ keys: "Enter", description: "to execute" },
				{ keys: "Esc", description: "to exit" },
				{ keys: "!", description: "to exit shell mode" },
			]
		}
		// Default: General command hints
		return [
			{ keys: "/help", description: "for commands" },
			{ keys: "/mode", description: "to switch mode" },
			{ keys: "!", description: "for shell mode", primary: true },
		]
	}, [hasResumeTask, isApprovalPending, isStreaming, isFollowupVisible, isShellModeActive, modifierKey])
	const shouldShow = hotkeys.length > 0
	return {
		hotkeys,
		shouldShow,
		modifierKey,
	}
}
