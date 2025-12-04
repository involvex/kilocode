/**
 * AutocompleteMenu component - displays command and argument suggestions
 */
import React from "react"
import type { CommandSuggestion, ArgumentSuggestion, FileMentionSuggestion } from "../../services/autocomplete.js"
interface AutocompleteMenuProps {
	type: "command" | "argument" | "file-mention" | "none"
	commandSuggestions?: CommandSuggestion[]
	argumentSuggestions?: ArgumentSuggestion[]
	fileMentionSuggestions?: FileMentionSuggestion[]
	selectedIndex: number
	visible: boolean
}
export declare const AutocompleteMenu: React.FC<AutocompleteMenuProps>
export {}
//# sourceMappingURL=AutocompleteMenu.d.ts.map
