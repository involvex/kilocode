import fs from "node:fs"
import path from "path"
import { getUriFileExtension } from "./uri"
export var LanguageName
;(function (LanguageName) {
	LanguageName["CPP"] = "cpp"
	LanguageName["C_SHARP"] = "c_sharp"
	LanguageName["C"] = "c"
	LanguageName["CSS"] = "css"
	LanguageName["PHP"] = "php"
	LanguageName["BASH"] = "bash"
	LanguageName["JSON"] = "json"
	LanguageName["TYPESCRIPT"] = "typescript"
	LanguageName["TSX"] = "tsx"
	LanguageName["ELM"] = "elm"
	LanguageName["JAVASCRIPT"] = "javascript"
	LanguageName["PYTHON"] = "python"
	LanguageName["ELISP"] = "elisp"
	LanguageName["ELIXIR"] = "elixir"
	LanguageName["GO"] = "go"
	LanguageName["EMBEDDED_TEMPLATE"] = "embedded_template"
	LanguageName["HTML"] = "html"
	LanguageName["JAVA"] = "java"
	LanguageName["LUA"] = "lua"
	LanguageName["OCAML"] = "ocaml"
	LanguageName["QL"] = "ql"
	LanguageName["RESCRIPT"] = "rescript"
	LanguageName["RUBY"] = "ruby"
	LanguageName["RUST"] = "rust"
	LanguageName["SYSTEMRDL"] = "systemrdl"
	LanguageName["TOML"] = "toml"
	LanguageName["SOLIDITY"] = "solidity"
})(LanguageName || (LanguageName = {}))
const supportedLanguages = {
	cpp: LanguageName.CPP,
	hpp: LanguageName.CPP,
	cc: LanguageName.CPP,
	cxx: LanguageName.CPP,
	hxx: LanguageName.CPP,
	cp: LanguageName.CPP,
	hh: LanguageName.CPP,
	inc: LanguageName.CPP,
	// Depended on this PR: https://github.com/tree-sitter/tree-sitter-cpp/pull/173
	// ccm: LanguageName.CPP,
	// c++m: LanguageName.CPP,
	// cppm: LanguageName.CPP,
	// cxxm: LanguageName.CPP,
	cs: LanguageName.C_SHARP,
	c: LanguageName.C,
	h: LanguageName.C,
	css: LanguageName.CSS,
	php: LanguageName.PHP,
	phtml: LanguageName.PHP,
	php3: LanguageName.PHP,
	php4: LanguageName.PHP,
	php5: LanguageName.PHP,
	php7: LanguageName.PHP,
	phps: LanguageName.PHP,
	"php-s": LanguageName.PHP,
	bash: LanguageName.BASH,
	sh: LanguageName.BASH,
	json: LanguageName.JSON,
	ts: LanguageName.TYPESCRIPT,
	mts: LanguageName.TYPESCRIPT,
	cts: LanguageName.TYPESCRIPT,
	tsx: LanguageName.TSX,
	// vue: LanguageName.VUE,  // tree-sitter-vue parser is broken
	// The .wasm file being used is faulty, and yaml is split line-by-line anyway for the most part
	// yaml: LanguageName.YAML,
	// yml: LanguageName.YAML,
	elm: LanguageName.ELM,
	js: LanguageName.JAVASCRIPT,
	jsx: LanguageName.JAVASCRIPT,
	mjs: LanguageName.JAVASCRIPT,
	cjs: LanguageName.JAVASCRIPT,
	py: LanguageName.PYTHON,
	// ipynb: LanguageName.PYTHON, // It contains Python, but the file format is a ton of JSON.
	pyw: LanguageName.PYTHON,
	pyi: LanguageName.PYTHON,
	el: LanguageName.ELISP,
	emacs: LanguageName.ELISP,
	ex: LanguageName.ELIXIR,
	exs: LanguageName.ELIXIR,
	go: LanguageName.GO,
	eex: LanguageName.EMBEDDED_TEMPLATE,
	heex: LanguageName.EMBEDDED_TEMPLATE,
	leex: LanguageName.EMBEDDED_TEMPLATE,
	html: LanguageName.HTML,
	htm: LanguageName.HTML,
	java: LanguageName.JAVA,
	lua: LanguageName.LUA,
	luau: LanguageName.LUA,
	ocaml: LanguageName.OCAML,
	ml: LanguageName.OCAML,
	mli: LanguageName.OCAML,
	ql: LanguageName.QL,
	res: LanguageName.RESCRIPT,
	resi: LanguageName.RESCRIPT,
	rb: LanguageName.RUBY,
	erb: LanguageName.RUBY,
	rs: LanguageName.RUST,
	rdl: LanguageName.SYSTEMRDL,
	toml: LanguageName.TOML,
	sol: LanguageName.SOLIDITY,
	// jl: LanguageName.JULIA,
	// swift: LanguageName.SWIFT,
	// kt: LanguageName.KOTLIN,
	// scala: LanguageName.SCALA,
}
export const IGNORE_PATH_PATTERNS = {
	[LanguageName.TYPESCRIPT]: [/.*node_modules/],
	[LanguageName.JAVASCRIPT]: [/.*node_modules/],
}
export async function getParserForFile(filepath) {
	try {
		// Dynamically import Parser to avoid issues with WASM loading
		const { Parser } = require("web-tree-sitter")
		await Parser.init()
		const parser = new Parser()
		const language = await getLanguageForFile(filepath)
		if (!language) {
			return undefined
		}
		parser.setLanguage(language)
		return parser
	} catch (e) {
		console.error("Unable to load language for file", filepath, e)
		return undefined
	}
}
// Helper function to find the first existing path from a list of candidates
function findExistingPath(candidatePaths) {
	for (const p of candidatePaths) {
		if (fs.existsSync(p)) {
			return p
		}
	}
	return undefined
}
// Loading the wasm files to create a Language object is an expensive operation and with
// sufficient number of files can result in errors, instead keep a map of language name
// to Language object
const nameToLanguage = new Map()
function getExtensionFromPathOrUri(input) {
	// Treat inputs with a scheme as URIs; otherwise as local filesystem paths
	if (input.includes("://") || input.startsWith("file:")) {
		return getUriFileExtension(input)
	}
	const base = path.basename(input)
	const dot = base.lastIndexOf(".")
	return dot >= 0 ? base.slice(dot + 1).toLowerCase() : ""
}
async function getLanguageForFile(filepathOrUri) {
	try {
		const extension = getExtensionFromPathOrUri(filepathOrUri)
		const languageName = supportedLanguages[extension]
		if (!languageName) {
			return undefined
		}
		let language = nameToLanguage.get(languageName)
		if (!language) {
			language = await loadLanguageForFileExt(extension)
			nameToLanguage.set(languageName, language)
		}
		return language
	} catch (e) {
		console.debug("Unable to load language for file", filepathOrUri, e)
		return undefined
	}
}
export const getFullLanguageName = (filepathOrUri) => {
	const extension = getExtensionFromPathOrUri(filepathOrUri)
	return supportedLanguages[extension]
}
export async function getQueryForFile(filepathOrUri, queryPath) {
	const language = await getLanguageForFile(filepathOrUri)
	if (!language) {
		return undefined
	}
	// Resolve the query file from tree-sitter directory.
	// The tree-sitter directory is at src/services/continuedev/tree-sitter/
	const repoRoot = path.resolve(__dirname, "..", "..", "..", "..")
	const candidatePaths = [
		// Development: from src/services/continuedev/core/util -> src/services/continuedev/tree-sitter
		path.join(__dirname, "..", "..", "tree-sitter", queryPath),
		// Production: tree-sitter might be copied alongside compiled code
		path.join(__dirname, "tree-sitter", queryPath),
		// Alternative: from repo root
		path.join(repoRoot, "src", "services", "continuedev", "tree-sitter", queryPath),
		// Fallback: dist directory
		path.join(repoRoot, "dist", "tree-sitter", queryPath),
	]
	const sourcePath = findExistingPath(candidatePaths)
	if (!sourcePath) {
		return undefined
	}
	const querySource = fs.readFileSync(sourcePath).toString()
	return language.query(querySource)
}
async function loadLanguageForFileExt(fileExtension) {
	// Dynamically import Language to avoid issues with WASM loading
	const { Language } = require("web-tree-sitter")
	const filename = `tree-sitter-${supportedLanguages[fileExtension]}.wasm`
	const repoRoot = path.resolve(__dirname, "..", "..", "..", "..")
	// The WASM files are copied to src/dist/ during build
	// In production (compiled): __dirname = /path/to/kilocode/src/dist or dist/
	// In development: __dirname = /path/to/kilocode/src/services/continuedev/core/util
	const candidatePaths = [
		// Production: WASM files are in the same directory as the compiled code
		path.join(__dirname, filename),
		// Development: from src/services/continuedev/core/util -> src/dist
		path.join(repoRoot, "dist", filename),
		// Fallback: repo root
		path.join(repoRoot, filename),
		// Legacy: node_modules location (fallback for older setups)
		path.join(repoRoot, "src", "node_modules", "tree-sitter-wasms", "out", filename),
	]
	const wasmPath = findExistingPath(candidatePaths)
	if (!wasmPath) {
		console.error(`Could not find ${filename}. Tried paths:`, candidatePaths)
		throw new Error(`Could not find language WASM file: ${filename}`)
	}
	return await Language.load(wasmPath)
}
// See https://tree-sitter.github.io/tree-sitter/using-parsers
const GET_SYMBOLS_FOR_NODE_TYPES = [
	"class_declaration",
	"class_definition",
	"function_item", // function name = first "identifier" child
	"function_definition",
	"method_declaration", // method name = first "identifier" child
	"method_definition",
	"generator_function_declaration",
	// property_identifier
	// field_declaration
	// "arrow_function",
]
export async function getSymbolsForFile(filepath, contents) {
	//MINIMAL_REPO - continue doesn't use this in autocomplete
	const parser = await getParserForFile(filepath)
	if (!parser) {
		return
	}
	let tree
	try {
		tree = parser.parse(contents)
	} catch {
		console.log(`Error parsing file: ${filepath}`)
		return
	}
	if (!tree) {
		console.log(`Failed to parse file: ${filepath}`)
		return
	}
	// console.log(`file: ${filepath}`);
	// Function to recursively find all named nodes (classes and functions)
	const symbols = []
	function findNamedNodesRecursive(node) {
		// console.log(`node: ${node.type}, ${node.text}`);
		if (GET_SYMBOLS_FOR_NODE_TYPES.includes(node.type)) {
			// console.log(`parent: ${node.type}, ${node.text.substring(0, 200)}`);
			// node.children.forEach((child) => {
			//   console.log(`child: ${child.type}, ${child.text}`);
			// });
			// Empirically, the actual name is the last identifier in the node
			// Especially with languages where return type is declared before the name
			// TODO use findLast in newer version of node target
			let identifier = undefined
			for (let i = node.children.length - 1; i >= 0; i--) {
				const child = node.children[i]
				if (child && (child.type === "identifier" || child.type === "property_identifier")) {
					identifier = child
					break
				}
			}
			if (identifier?.text) {
				symbols.push({
					filepath,
					type: node.type,
					name: identifier.text,
					range: {
						start: {
							character: node.startPosition.column,
							line: node.startPosition.row,
						},
						end: {
							character: node.endPosition.column + 1,
							line: node.endPosition.row + 1,
						},
					},
					content: node.text,
				})
			}
		}
		node.children.forEach((child) => {
			if (child) findNamedNodesRecursive(child)
		})
	}
	findNamedNodesRecursive(tree.rootNode)
	return symbols
}
//# sourceMappingURL=treeSitter.js.map
