/**
 * Hook for managing followup suggestions
 * Provides state and actions for followup question suggestions
 */
import { useAtomValue, useSetAtom } from "jotai"
import { useMemo, useCallback } from "react"
import {
	followupSuggestionsAtom,
	showFollowupSuggestionsAtom,
	selectedIndexAtom,
	setFollowupSuggestionsAtom,
	clearFollowupSuggestionsAtom,
	selectNextFollowupAtom,
	selectPreviousFollowupAtom,
	unselectFollowupAtom,
	getSelectedFollowupAtom,
	hasFollowupSuggestionsAtom,
} from "../atoms/ui.js"
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
export function useFollowupSuggestions() {
	// Read atoms
	const suggestions = useAtomValue(followupSuggestionsAtom)
	const isVisible = useAtomValue(showFollowupSuggestionsAtom)
	const selectedIndex = useAtomValue(selectedIndexAtom)
	const selectedSuggestion = useAtomValue(getSelectedFollowupAtom)
	const hasSuggestions = useAtomValue(hasFollowupSuggestionsAtom)
	// Write atoms
	const setSuggestionsAction = useSetAtom(setFollowupSuggestionsAtom)
	const clearSuggestionsAction = useSetAtom(clearFollowupSuggestionsAtom)
	const selectNextAction = useSetAtom(selectNextFollowupAtom)
	const selectPreviousAction = useSetAtom(selectPreviousFollowupAtom)
	const unselectAction = useSetAtom(unselectFollowupAtom)
	// Actions
	const setSuggestions = useCallback(
		(newSuggestions) => {
			setSuggestionsAction(newSuggestions)
		},
		[setSuggestionsAction],
	)
	const clearSuggestions = useCallback(() => {
		clearSuggestionsAction()
	}, [clearSuggestionsAction])
	const selectNext = useCallback(() => {
		selectNextAction()
	}, [selectNextAction])
	const selectPrevious = useCallback(() => {
		selectPreviousAction()
	}, [selectPreviousAction])
	const unselect = useCallback(() => {
		unselectAction()
	}, [unselectAction])
	// Memoize return value
	return useMemo(
		() => ({
			suggestions,
			isVisible,
			selectedIndex,
			selectedSuggestion,
			hasSuggestions,
			setSuggestions,
			clearSuggestions,
			selectNext,
			selectPrevious,
			unselect,
		}),
		[
			suggestions,
			isVisible,
			selectedIndex,
			selectedSuggestion,
			hasSuggestions,
			setSuggestions,
			clearSuggestions,
			selectNext,
			selectPrevious,
			unselect,
		],
	)
}
