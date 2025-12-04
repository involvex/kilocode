/**
 * StatusIndicator - Displays current status and context-aware keyboard shortcuts
 * Shows status text on the left (e.g., "Thinking...") and available hotkeys on the right
 */
import React from "react"
export interface StatusIndicatorProps {
	/** Whether the indicator is disabled */
	disabled?: boolean
}
/**
 * Displays current status and available keyboard shortcuts
 *
 * Features:
 * - Shows status text (e.g., "Thinking...") on the left when processing
 * - Shows hotkey indicators on the right based on current context
 * - Shows cancel hotkey when processing
 * - Shows approval hotkeys when approval is pending
 * - Shows navigation hotkeys when followup suggestions are visible
 * - Shows general command hints when idle
 */
export declare const StatusIndicator: React.FC<StatusIndicatorProps>
//# sourceMappingURL=StatusIndicator.d.ts.map
