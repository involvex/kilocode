/**
 * FollowupSuggestionsMenu component - displays followup question suggestions
 * Similar to AutocompleteMenu but for followup question responses
 */
import React from "react"
import type { FollowupSuggestion } from "../../state/atoms/ui.js"
interface FollowupSuggestionsMenuProps {
	suggestions: FollowupSuggestion[]
	selectedIndex: number
	visible: boolean
}
export declare const FollowupSuggestionsMenu: React.FC<FollowupSuggestionsMenuProps>
export {}
//# sourceMappingURL=FollowupSuggestionsMenu.d.ts.map
