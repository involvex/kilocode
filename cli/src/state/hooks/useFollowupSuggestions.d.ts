/**
 * Hook for managing followup suggestions
 * Provides state and actions for followup question suggestions
 */
import type { FollowupSuggestion } from "../atoms/ui.js"
/**
 * Return type for useFollowupSuggestions hook
 */
export interface UseFollowupSuggestionsReturn {
	/** Current followup suggestions */
	suggestions: FollowupSuggestion[]
	/** Whether followup suggestions menu is visible */
	isVisible: boolean
	/** Index of currently selected suggestion (-1 = no selection) */
	selectedIndex: number
	/** Currently selected suggestion (null if no selection) */
	selectedSuggestion: FollowupSuggestion | null
	/** Whether there are any followup suggestions */
	hasSuggestions: boolean
	/** Set followup suggestions */
	setSuggestions: (suggestions: FollowupSuggestion[]) => void
	/** Clear followup suggestions */
	clearSuggestions: () => void
	/** Select next suggestion */
	selectNext: () => void
	/** Select previous suggestion (unselects if at first item) */
	selectPrevious: () => void
	/** Unselect current suggestion */
	unselect: () => void
}
/**
 * Hook for managing followup suggestions
 *
 * Provides comprehensive management of followup question suggestions including
 * keyboard navigation with special behavior for unselecting when pressing up
 * arrow on the first item.
 *
 * @example
 * ```tsx
 * function FollowupInput() {
 *   const {
 *     suggestions,
 *     isVisible,
 *     selectedIndex,
 *     selectedSuggestion,
 *     selectNext,
 *     selectPrevious,
 *     setSuggestions
 *   } = useFollowupSuggestions()
 *
 *   useEffect(() => {
 *     // Set suggestions when followup message is received
 *     setSuggestions([
 *       { answer: "Option 1" },
 *       { answer: "Option 2", mode: "code" }
 *     ])
 *   }, [])
 *
 *   const handleKeyDown = (e: KeyboardEvent) => {
 *     if (e.key === 'ArrowDown') {
 *       e.preventDefault()
 *       selectNext()
 *     } else if (e.key === 'ArrowUp') {
 *       e.preventDefault()
 *       selectPrevious() // Unselects if at first item
 *     }
 *   }
 *
 *   return (
 *     <div>
 *       {isVisible && (
 *         <ul>
 *           {suggestions.map((suggestion, i) => (
 *             <li key={i} className={i === selectedIndex ? 'selected' : ''}>
 *               {suggestion.answer}
 *             </li>
 *           ))}
 *         </ul>
 *       )}
 *     </div>
 *   )
 * }
 * ```
 */
export declare function useFollowupSuggestions(): UseFollowupSuggestionsReturn
//# sourceMappingURL=useFollowupSuggestions.d.ts.map
