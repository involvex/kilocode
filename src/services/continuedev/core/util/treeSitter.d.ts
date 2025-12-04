import type { Query } from "web-tree-sitter"
import { SymbolWithRange } from ".."
export declare enum LanguageName {
	CPP = "cpp",
	C_SHARP = "c_sharp",
	C = "c",
	CSS = "css",
	PHP = "php",
	BASH = "bash",
	JSON = "json",
	TYPESCRIPT = "typescript",
	TSX = "tsx",
	ELM = "elm",
	JAVASCRIPT = "javascript",
	PYTHON = "python",
	ELISP = "elisp",
	ELIXIR = "elixir",
	GO = "go",
	EMBEDDED_TEMPLATE = "embedded_template",
	HTML = "html",
	JAVA = "java",
	LUA = "lua",
	OCAML = "ocaml",
	QL = "ql",
	RESCRIPT = "rescript",
	RUBY = "ruby",
	RUST = "rust",
	SYSTEMRDL = "systemrdl",
	TOML = "toml",
	SOLIDITY = "solidity",
}
export declare const IGNORE_PATH_PATTERNS: Partial<Record<LanguageName, RegExp[]>>
export declare function getParserForFile(filepath: string): Promise<any>
export declare const getFullLanguageName: (filepathOrUri: string) => LanguageName | undefined
export declare function getQueryForFile(filepathOrUri: string, queryPath: string): Promise<Query | undefined>
export declare function getSymbolsForFile(filepath: string, contents: string): Promise<SymbolWithRange[] | undefined>
//# sourceMappingURL=treeSitter.d.ts.map
