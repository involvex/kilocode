import { MinimalConfigProvider } from "./MinimalConfig.js"
import { IDE, ILLM } from "../index.js"
import { GetLspDefinitionsFunction } from "./types.js"
import { AutocompleteInput, AutocompleteOutcome } from "./util/types.js"
export declare class CompletionProvider {
	private readonly configHandler
	private readonly ide
	private readonly _injectedGetLlm
	private readonly _onError
	private readonly getDefinitionsFromLsp
	private autocompleteCache
	errorsShown: Set<string>
	private bracketMatchingService
	private debouncer
	private completionStreamer
	private loggingService
	private contextRetrievalService
	constructor(
		configHandler: MinimalConfigProvider,
		ide: IDE,
		_injectedGetLlm: () => Promise<ILLM | undefined>,
		_onError: (e: unknown) => void,
		getDefinitionsFromLsp: GetLspDefinitionsFunction,
	)
	private _prepareLlm
	private onError
	cancel(): void
	accept(completionId: string): void
	markDisplayed(completionId: string, outcome: AutocompleteOutcome): void
	private _getAutocompleteOptions
	provideInlineCompletionItems(
		input: AutocompleteInput,
		token: AbortSignal | undefined,
		force?: boolean,
	): Promise<AutocompleteOutcome | undefined>
}
export default CompletionProvider
//# sourceMappingURL=CompletionProvider.d.ts.map
