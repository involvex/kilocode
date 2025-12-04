import { IDE } from "../.."
import { AutocompleteInput } from "../util/types"
/**
 * We have to handle a few edge cases in getting the entire prefix/suffix for the current file.
 * This is entirely prior to finding snippets from other files
 */
export declare function constructInitialPrefixSuffix(
	input: AutocompleteInput,
	ide: IDE,
): Promise<{
	prefix: string
	suffix: string
}>
//# sourceMappingURL=constructPrefixSuffix.d.ts.map
