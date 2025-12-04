/**
 * Hook for managing command input and autocomplete
 * Provides input state, autocomplete suggestions, and command execution
 */
import type {
	CommandSuggestion,
	ArgumentSuggestion,
	FileMentionSuggestion,
	FileMentionContext,
} from "../../services/autocomplete.js"
import { detectInputState } from "../../services/autocomplete.js"
/**
 * Return type for useCommandInput hook
 */
export interface UseCommandInputReturn {
	/** Current input value */
	inputValue: string
	/** Whether autocomplete menu is visible */
	isAutocompleteVisible: boolean
	/** Command suggestions (empty if showing argument suggestions) */
	commandSuggestions: CommandSuggestion[]
	/** Argument suggestions (empty if showing command suggestions) */
	argumentSuggestions: ArgumentSuggestion[]
	/** File mention suggestions (empty if not in file mention context) */
	fileMentionSuggestions: FileMentionSuggestion[]
	/** File mention context (null if not in file mention) */
	fileMentionContext: FileMentionContext | null
	/** Index of currently selected suggestion */
	selectedIndex: number
	/** Total count of suggestions */
	suggestionCount: number
	/** Whether input is a command (starts with /) */
	isCommand: boolean
	/** Command query (input without leading /) */
	commandQuery: string
	/** Currently selected suggestion */
	selectedSuggestion: CommandSuggestion | ArgumentSuggestion | FileMentionSuggestion | null
	/** Set input value and update suggestions */
	setInput: (value: string) => void
	/** Clear input and hide autocomplete */
	clearInput: () => void
	/** Select next suggestion */
	selectNext: () => void
	/** Select previous suggestion */
	selectPrevious: () => void
	/** Hide autocomplete menu */
	hideAutocomplete: () => void
	/** Show autocomplete menu */
	showAutocompleteMenu: () => void
	/** Update suggestions based on current input */
	updateSuggestions: () => Promise<void>
	/** Get the input state (command, argument, or none) */
	getInputState: () => ReturnType<typeof detectInputState>
}
/**
 * Hook for managing command input and autocomplete
 *
 * Provides comprehensive input management including autocomplete suggestions,
 * keyboard navigation, and command execution helpers. Automatically updates
 * suggestions as the user types.
 *
 * @example
 * ```tsx
 * function CommandInput() {
 *   const {
 *     inputValue,
 *     setInput,
 *     commandSuggestions,
 *     isAutocompleteVisible,
 *     selectNext,
 *     selectPrevious,
 *     selectedIndex
 *   } = useCommandInput()
 *
 *   const handleKeyDown = (e: KeyboardEvent) => {
 *     if (e.key === 'ArrowDown') {
 *       e.preventDefault()
 *       selectNext()
 *     } else if (e.key === 'ArrowUp') {
 *       e.preventDefault()
 *       selectPrevious()
 *     }
 *   }
 *
 *   return (
 *     <div>
 *       <input
 *         value={inputValue}
 *         onChange={e => setInput(e.target.value)}
 *         onKeyDown={handleKeyDown}
 *       />
 *       {isAutocompleteVisible && (
 *         <ul>
 *           {commandSuggestions.map((suggestion, i) => (
 *             <li key={i} className={i === selectedIndex ? 'selected' : ''}>
 *               {suggestion.command.name}
 *             </li>
 *           ))}
 *         </ul>
 *       )}
 *     </div>
 *   )
 * }
 * ```
 */
export declare function useCommandInput(): UseCommandInputReturn
//# sourceMappingURL=useCommandInput.d.ts.map
