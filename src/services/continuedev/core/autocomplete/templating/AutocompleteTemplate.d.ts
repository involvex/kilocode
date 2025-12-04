import { CompletionOptions } from "../../index.js"
import { AutocompleteSnippet } from "../snippets/types.js"
type TemplateRenderer = (
	prefix: string,
	suffix: string,
	filepath: string,
	reponame: string,
	language: string,
	snippets: AutocompleteSnippet[],
	workspaceUris: string[],
) => string
export interface AutocompleteTemplate {
	compilePrefixSuffix?: (
		prefix: string,
		suffix: string,
		filepath: string,
		reponame: string,
		snippets: AutocompleteSnippet[],
		workspaceUris: string[],
	) => [string, string]
	template: TemplateRenderer
	completionOptions?: Partial<CompletionOptions>
}
export declare function getTemplateForModel(model: string): AutocompleteTemplate
export {}
//# sourceMappingURL=AutocompleteTemplate.d.ts.map
