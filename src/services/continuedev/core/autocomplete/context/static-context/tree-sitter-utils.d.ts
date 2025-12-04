import { Node as SyntaxNode, QueryMatch, Tree } from "web-tree-sitter"
interface TypeDeclarationResult {
	name: string
	fullText: string
	startLine: number
	startColumn: number
	endLine: number
	endColumn: number
	kind: string
}
export declare function findEnclosingTypeDeclaration(
	sourceCode: string,
	cursorLine: number,
	cursorColumn: number,
	ast: Tree,
): TypeDeclarationResult | null
export declare function extractTopLevelDecls(currentFile: string): Promise<QueryMatch[]>
export declare function extractFunctionTypeFromDecl(match: QueryMatch): string
export declare function unwrapToBaseType(node: SyntaxNode): SyntaxNode
export {}
//# sourceMappingURL=tree-sitter-utils.d.ts.map
