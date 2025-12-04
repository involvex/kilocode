/**
 * HotkeyBadge - Displays a single keyboard shortcut in a styled badge
 */
import React from "react"
export interface HotkeyBadgeProps {
	/** The key combination to display (e.g., "Ctrl+C", "Cmd+X") */
	keys: string
	/** Description of what the hotkey does */
	description: string
	/** Whether this is the primary/recommended action */
	primary?: boolean
}
/**
 * Displays a keyboard shortcut badge with styling
 */
export declare const HotkeyBadge: React.FC<HotkeyBadgeProps>
//# sourceMappingURL=HotkeyBadge.d.ts.map
