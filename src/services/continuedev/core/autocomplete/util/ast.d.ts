import { Node as SyntaxNode, Tree } from "web-tree-sitter"
export type AstPath = SyntaxNode[]
export declare function getAst(filepath: string, fileContents: string): Promise<Tree | undefined>
export declare function getTreePathAtCursor(ast: Tree, cursorIndex: number): Promise<AstPath>
//# sourceMappingURL=ast.d.ts.map
