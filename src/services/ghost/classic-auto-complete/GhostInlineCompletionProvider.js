import * as vscode from "vscode"
import { extractPrefixSuffix, contextToAutocompleteInput } from "../types"
import { GhostContextProvider } from "./GhostContextProvider"
import { HoleFiller } from "./HoleFiller"
import { FimPromptBuilder } from "./FillInTheMiddle"
import { RecentlyVisitedRangesService } from "../../continuedev/core/vscode-test-harness/src/autocomplete/RecentlyVisitedRangesService"
import { RecentlyEditedTracker } from "../../continuedev/core/vscode-test-harness/src/autocomplete/recentlyEdited"
import { postprocessGhostSuggestion } from "./uselessSuggestionFilter"
import { RooIgnoreController } from "../../../core/ignore/RooIgnoreController"
const MAX_SUGGESTIONS_HISTORY = 20
const DEBOUNCE_DELAY_MS = 300
/**
 * Find a matching suggestion from the history based on current prefix and suffix
 * @param prefix - The text before the cursor position
 * @param suffix - The text after the cursor position
 * @param suggestionsHistory - Array of previous suggestions (most recent last)
 * @returns The matching suggestion text, or null if no match found
 */
export function findMatchingSuggestion(prefix, suffix, suggestionsHistory) {
	// Search from most recent to least recent
	for (let i = suggestionsHistory.length - 1; i >= 0; i--) {
		const fillInAtCursor = suggestionsHistory[i]
		// First, try exact prefix/suffix match
		if (prefix === fillInAtCursor.prefix && suffix === fillInAtCursor.suffix) {
			return fillInAtCursor.text
		}
		// If no exact match, but suggestion is available, check for partial typing
		// The user may have started typing the suggested text
		if (
			fillInAtCursor.text !== "" &&
			prefix.startsWith(fillInAtCursor.prefix) &&
			suffix === fillInAtCursor.suffix
		) {
			// Extract what the user has typed between the original prefix and current position
			const typedContent = prefix.substring(fillInAtCursor.prefix.length)
			// Check if the typed content matches the beginning of the suggestion
			if (fillInAtCursor.text.startsWith(typedContent)) {
				// Return the remaining part of the suggestion (with already-typed portion removed)
				return fillInAtCursor.text.substring(typedContent.length)
			}
		}
		// Check for backward deletion: user deleted characters from the end of the prefix
		// The stored prefix should start with the current prefix (current is shorter)
		if (fillInAtCursor.prefix.startsWith(prefix) && suffix === fillInAtCursor.suffix) {
			// Extract the deleted portion of the prefix
			const deletedContent = fillInAtCursor.prefix.substring(prefix.length)
			// Return the deleted portion plus the original suggestion text
			return deletedContent + fillInAtCursor.text
		}
	}
	return null
}
export function stringToInlineCompletions(text, position) {
	if (text === "") {
		return []
	}
	const item = {
		insertText: text,
		range: new vscode.Range(position, position),
	}
	return [item]
}
export class GhostInlineCompletionProvider {
	suggestionsHistory = []
	/** Tracks all pending/in-flight requests */
	pendingRequests = []
	holeFiller
	fimPromptBuilder
	model
	costTrackingCallback
	getSettings
	recentlyVisitedRangesService
	recentlyEditedTracker
	debounceTimer = null
	isFirstCall = true
	ignoreController
	constructor(context, model, costTrackingCallback, getSettings, cline) {
		this.model = model
		this.costTrackingCallback = costTrackingCallback
		this.getSettings = getSettings
		// Create ignore controller internally
		this.ignoreController = (async () => {
			const ignoreController = new RooIgnoreController(cline.cwd)
			await ignoreController.initialize()
			return ignoreController
		})()
		const contextProvider = new GhostContextProvider(context, model, this.ignoreController)
		this.holeFiller = new HoleFiller(contextProvider)
		this.fimPromptBuilder = new FimPromptBuilder(contextProvider)
		const ide = contextProvider.getIde()
		this.recentlyVisitedRangesService = new RecentlyVisitedRangesService(ide)
		this.recentlyEditedTracker = new RecentlyEditedTracker(ide)
	}
	updateSuggestions(fillInAtCursor) {
		const isDuplicate = this.suggestionsHistory.some(
			(existing) =>
				existing.text === fillInAtCursor.text &&
				existing.prefix === fillInAtCursor.prefix &&
				existing.suffix === fillInAtCursor.suffix,
		)
		if (isDuplicate) {
			return
		}
		// Add to the end of the array (most recent)
		this.suggestionsHistory.push(fillInAtCursor)
		// Remove oldest if we exceed the limit
		if (this.suggestionsHistory.length > MAX_SUGGESTIONS_HISTORY) {
			this.suggestionsHistory.shift()
		}
	}
	async getPrompt(document, position) {
		// Build complete context with all tracking data
		const recentlyVisitedRanges = this.recentlyVisitedRangesService.getSnippets()
		const recentlyEditedRanges = await this.recentlyEditedTracker.getRecentlyEditedRanges()
		const context = {
			document,
			range: new vscode.Range(position, position),
			recentlyVisitedRanges,
			recentlyEditedRanges,
		}
		const autocompleteInput = contextToAutocompleteInput(context)
		const { prefix, suffix } = extractPrefixSuffix(document, position)
		const languageId = document.languageId
		// Determine strategy based on model capabilities and call only the appropriate prompt builder
		const prompt = this.model.supportsFim()
			? await this.fimPromptBuilder.getFimPrompts(autocompleteInput, this.model.getModelName() ?? "codestral")
			: await this.holeFiller.getPrompts(autocompleteInput, languageId)
		return { prompt, prefix, suffix }
	}
	processSuggestion(suggestionText, prefix, suffix, model) {
		if (!suggestionText) {
			return { text: "", prefix, suffix }
		}
		const processedText = postprocessGhostSuggestion({
			suggestion: suggestionText,
			prefix,
			suffix,
			model: model.getModelName() || "",
		})
		if (processedText) {
			return { text: processedText, prefix, suffix }
		}
		return { text: "", prefix, suffix }
	}
	async disposeIgnoreController() {
		if (this.ignoreController) {
			const ignoreController = this.ignoreController
			this.ignoreController = undefined
			;(await ignoreController).dispose()
		}
	}
	dispose() {
		if (this.debounceTimer !== null) {
			clearTimeout(this.debounceTimer)
			this.debounceTimer = null
		}
		this.recentlyVisitedRangesService.dispose()
		this.recentlyEditedTracker.dispose()
		void this.disposeIgnoreController()
	}
	async provideInlineCompletionItems(document, position, _context, _token) {
		const settings = this.getSettings()
		const isAutoTriggerEnabled = settings?.enableAutoTrigger ?? false
		if (!isAutoTriggerEnabled) {
			return []
		}
		return this.provideInlineCompletionItems_Internal(document, position, _context, _token)
	}
	async provideInlineCompletionItems_Internal(document, position, _context, _token) {
		if (!this.model) {
			// bail if no model is available, because if there is none, we also have no cache
			return []
		}
		if (!document?.uri?.fsPath) {
			return []
		}
		try {
			// Check if file is ignored (for manual trigger via codeSuggestion)
			// Skip ignore check for untitled documents
			if (this.ignoreController && !document.isUntitled) {
				try {
					// Try to get the controller with a short timeout
					const controller = await Promise.race([
						this.ignoreController,
						new Promise((resolve) => setTimeout(() => resolve(null), 50)),
					])
					if (!controller) {
						// If promise hasn't resolved yet, assume file is ignored
						return []
					}
					const isAccessible = controller.validateAccess(document.fileName)
					if (!isAccessible) {
						return []
					}
				} catch (error) {
					console.error("[GhostInlineCompletionProvider] Error checking file access:", error)
					// On error, assume file is ignored
					return []
				}
			}
			const { prefix, suffix } = extractPrefixSuffix(document, position)
			const matchingText = findMatchingSuggestion(prefix, suffix, this.suggestionsHistory)
			if (matchingText !== null) {
				return stringToInlineCompletions(matchingText, position)
			}
			const { prompt, prefix: promptPrefix, suffix: promptSuffix } = await this.getPrompt(document, position)
			await this.debouncedFetchAndCacheSuggestion(prompt, promptPrefix, promptSuffix)
			const cachedText = findMatchingSuggestion(prefix, suffix, this.suggestionsHistory)
			return stringToInlineCompletions(cachedText ?? "", position)
		} catch (error) {
			// only big catch at the top of the call-chain, if anything goes wrong at a lower level
			// do not catch, just let the error cascade
			console.error("[GhostInlineCompletionProvider] Error providing inline completion:", error)
			return []
		}
	}
	/**
	 * Find a pending request that covers the current prefix/suffix.
	 * A request covers the current position if:
	 * 1. The suffix matches (user hasn't changed text after cursor)
	 * 2. The current prefix either equals or extends the pending prefix
	 *    (user is typing forward, not backspacing or editing earlier)
	 *
	 * @returns The covering pending request, or null if none found
	 */
	findCoveringPendingRequest(prefix, suffix) {
		for (const pendingRequest of this.pendingRequests) {
			// Suffix must match exactly (text after cursor unchanged)
			if (suffix !== pendingRequest.suffix) {
				continue
			}
			// Current prefix must start with the pending prefix (user typed more)
			// or be exactly equal (same position)
			if (prefix.startsWith(pendingRequest.prefix)) {
				return pendingRequest
			}
		}
		return null
	}
	/**
	 * Remove a pending request from the list when it completes.
	 */
	removePendingRequest(request) {
		const index = this.pendingRequests.indexOf(request)
		if (index !== -1) {
			this.pendingRequests.splice(index, 1)
		}
	}
	/**
	 * Debounced fetch with leading edge execution and pending request reuse.
	 * - First call executes immediately (leading edge)
	 * - Subsequent calls reset the timer and wait for DEBOUNCE_DELAY_MS of inactivity (trailing edge)
	 * - If a pending request covers the current prefix/suffix, reuse it instead of starting a new one
	 */
	debouncedFetchAndCacheSuggestion(prompt, prefix, suffix) {
		// Check if any existing pending request covers this one
		const coveringRequest = this.findCoveringPendingRequest(prefix, suffix)
		if (coveringRequest) {
			// Wait for the existing request to complete - no need to start a new one
			return coveringRequest.promise
		}
		// If this is the first call (no pending debounce), execute immediately
		if (this.isFirstCall && this.debounceTimer === null) {
			this.isFirstCall = false
			return this.fetchAndCacheSuggestion(prompt, prefix, suffix)
		}
		// Clear any existing timer (reset the debounce)
		if (this.debounceTimer !== null) {
			clearTimeout(this.debounceTimer)
		}
		// Create the pending request object first so we can reference it in the cleanup
		const pendingRequest = {
			prefix,
			suffix,
			promise: null, // Will be set immediately below
		}
		const requestPromise = new Promise((resolve) => {
			this.debounceTimer = setTimeout(async () => {
				this.debounceTimer = null
				this.isFirstCall = true // Reset for next sequence
				await this.fetchAndCacheSuggestion(prompt, prefix, suffix)
				// Remove this request from pending when done
				this.removePendingRequest(pendingRequest)
				resolve()
			}, DEBOUNCE_DELAY_MS)
		})
		// Complete the pending request object
		pendingRequest.promise = requestPromise
		// Add to the list of pending requests
		this.pendingRequests.push(pendingRequest)
		return requestPromise
	}
	async fetchAndCacheSuggestion(prompt, prefix, suffix) {
		try {
			// Curry processSuggestion with prefix, suffix, and model - only text needs to be provided
			const curriedProcessSuggestion = (text) => this.processSuggestion(text, prefix, suffix, this.model)
			const result =
				prompt.strategy === "fim"
					? await this.fimPromptBuilder.getFromFIM(this.model, prompt, curriedProcessSuggestion)
					: await this.holeFiller.getFromChat(this.model, prompt, curriedProcessSuggestion)
			this.costTrackingCallback(
				result.cost,
				result.inputTokens,
				result.outputTokens,
				result.cacheWriteTokens,
				result.cacheReadTokens,
			)
			// Always update suggestions, even if text is empty (for caching)
			this.updateSuggestions(result.suggestion)
		} catch (error) {
			console.error("Error getting inline completion from LLM:", error)
		}
	}
}
//# sourceMappingURL=GhostInlineCompletionProvider.js.map
