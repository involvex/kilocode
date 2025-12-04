import { IDE, TabAutocompleteOptions } from "../.."
import { AutocompleteLanguageInfo } from "../constants/AutocompleteLanguageInfo"
import { AstPath } from "./ast"
import { AutocompleteInput } from "./types"
/**
 * A collection of variables that are often accessed throughout the autocomplete pipeline
 * It's noisy to re-calculate all the time or inject them into each function
 */
export interface HelperVars {
	lang: AutocompleteLanguageInfo
	treePath: AstPath | undefined
	workspaceUris: string[]
	fileContents: string
	fileLines: string[]
	fullPrefix: string
	fullSuffix: string
	prunedPrefix: string
	prunedSuffix: string
	input: AutocompleteInput
	options: TabAutocompleteOptions
	modelName: string
	filepath: string
	pos: any
	prunedCaretWindow: string
}
export declare const HelperVars: {
	create: (
		input: AutocompleteInput,
		options: TabAutocompleteOptions,
		modelName: string,
		ide: IDE,
	) => Promise<HelperVars>
}
//# sourceMappingURL=HelperVars.d.ts.map
