import { GetLspDefinitionsFunction } from "../../../autocomplete/types"
import * as vscode from "vscode"
import type { DocumentSymbol, RangeInFile, SignatureHelp } from "../../../"
type GotoProviderName =
	| "vscode.executeDefinitionProvider"
	| "vscode.executeTypeDefinitionProvider"
	| "vscode.executeDeclarationProvider"
	| "vscode.executeImplementationProvider"
	| "vscode.executeReferenceProvider"
interface GotoInput {
	uri: vscode.Uri
	line: number
	character: number
	name: GotoProviderName
}
type SignatureHelpProviderName = "vscode.executeSignatureHelpProvider"
interface SignatureHelpInput {
	uri: vscode.Uri
	line: number
	character: number
	name: SignatureHelpProviderName
}
export declare function executeSignatureHelpProvider(input: SignatureHelpInput): Promise<SignatureHelp | null>
export declare function executeGotoProvider(input: GotoInput): Promise<RangeInFile[]>
/**
 * and other stuff not directly on the path:
 * - variables defined on line above
 * ...etc...
 */
export declare const getDefinitionsFromLsp: GetLspDefinitionsFunction
type SymbolProviderName = "vscode.executeDocumentSymbolProvider"
interface SymbolInput {
	uri: vscode.Uri
	name: SymbolProviderName
}
export declare function executeSymbolProvider(input: SymbolInput): Promise<DocumentSymbol[]>
export {}
//# sourceMappingURL=lsp.d.ts.map
