import { AutocompleteSnippetType } from "../../../autocomplete/snippets/types"
import { getAst, getTreePathAtCursor } from "../../../autocomplete/util/ast"
import { intersection } from "../../../util/ranges"
import * as vscode from "vscode"
const FUNCTION_BLOCK_NODE_TYPES = ["block", "statement_block"]
const FUNCTION_DECLARATION_NODE_TYPEs = [
	"method_definition",
	"function_definition",
	"function_item",
	"function_declaration",
	"method_declaration",
]
function gotoInputKey(input) {
	return `${input.name}${input.uri.toString()}${input.line}${input.character}`
}
const MAX_CACHE_SIZE = 500
const gotoCache = new Map()
function signatureHelpKey(input) {
	return `${input.name}${input.uri.toString()}${input.line}${input.character}`
}
const signatureHelpCache = new Map()
export async function executeSignatureHelpProvider(input) {
	const cacheKey = signatureHelpKey(input)
	const cached = signatureHelpCache.get(cacheKey)
	if (cached) {
		return cached
	}
	try {
		const definitions = await vscode.commands.executeCommand(
			input.name,
			input.uri,
			new vscode.Position(input.line, input.character),
		)
		// Add to cache
		if (signatureHelpCache.size >= MAX_CACHE_SIZE) {
			// Remove the oldest item from the cache
			const oldestKey = signatureHelpCache.keys().next().value
			if (oldestKey) {
				signatureHelpCache.delete(oldestKey)
			}
		}
		signatureHelpCache.set(cacheKey, definitions)
		return definitions
	} catch (e) {
		console.warn(`Error executing ${input.name}:`, e)
		return null
	}
}
export async function executeGotoProvider(input) {
	const cacheKey = gotoInputKey(input)
	const cached = gotoCache.get(cacheKey)
	if (cached) {
		return cached
	}
	try {
		const definitions = await vscode.commands.executeCommand(
			input.name,
			input.uri,
			new vscode.Position(input.line, input.character),
		)
		const results = definitions
			.filter((d) => (d.targetUri || d.uri) && (d.targetRange || d.range))
			.map((d) => ({
				filepath: (d.targetUri || d.uri).toString(),
				range: d.targetRange || d.range,
			}))
		// Add to cache
		if (gotoCache.size >= MAX_CACHE_SIZE) {
			// Remove the oldest item from the cache
			const oldestKey = gotoCache.keys().next().value
			if (oldestKey) {
				gotoCache.delete(oldestKey)
			}
		}
		gotoCache.set(cacheKey, results)
		return results
	} catch (e) {
		console.warn(`Error executing ${input.name}:`, e)
		return []
	}
}
function isRifWithContents(rif) {
	return typeof rif.contents === "string"
}
function findChildren(node, predicate, firstN) {
	let matchingNodes = []
	if (firstN && firstN <= 0) {
		return []
	}
	// Check if the current node's type is in the list of types we're interested in
	if (predicate(node)) {
		matchingNodes.push(node)
	}
	// Recursively search for matching types in all children of the current node
	for (const child of node.children) {
		if (!child) continue
		matchingNodes = matchingNodes.concat(
			findChildren(child, predicate, firstN ? firstN - matchingNodes.length : undefined),
		)
	}
	return matchingNodes
}
function findTypeIdentifiers(node) {
	return findChildren(
		node,
		(childNode) =>
			childNode.type === "type_identifier" ||
			(["ERROR"].includes(childNode.parent?.type ?? "") &&
				childNode.type === "identifier" &&
				childNode.text[0].toUpperCase() === childNode.text[0]),
	)
}
async function crawlTypes(rif, ide, depth = 1, results = [], searchedLabels = new Set()) {
	// Get the file contents if not already attached
	const contents = isRifWithContents(rif) ? rif.contents : await ide.readFile(rif.filepath)
	// Parse AST
	const ast = await getAst(rif.filepath, contents)
	if (!ast) {
		return results
	}
	const astLineCount = ast.rootNode.text.split("\n").length
	// Find type identifiers
	const identifierNodes = findTypeIdentifiers(ast.rootNode).filter((node) => !searchedLabels.has(node.text))
	// Don't search for the same type definition more than once
	// We deduplicate below to be sure, but this saves calls to the LSP
	identifierNodes.forEach((node) => searchedLabels.add(node.text))
	// Use LSP to get the definitions of those types
	const definitions = []
	for (const node of identifierNodes) {
		const [typeDef] = await executeGotoProvider({
			uri: vscode.Uri.parse(rif.filepath),
			// TODO: tree-sitter is zero-indexed, but there seems to be an off-by-one
			// error at least with the .ts parser sometimes
			line: rif.range.start.line + Math.min(node.startPosition.row, astLineCount - 1),
			character: rif.range.start.character + node.startPosition.column,
			name: "vscode.executeDefinitionProvider",
		})
		if (!typeDef) {
			definitions.push(undefined)
			continue
		}
		const contents = await ide.readRangeInFile(typeDef.filepath, typeDef.range)
		definitions.push({
			...typeDef,
			contents,
		})
	}
	// TODO: Filter out if not in our code?
	// Filter out duplicates
	for (const definition of definitions) {
		if (
			!definition ||
			results.some(
				(result) =>
					result.filepath === definition.filepath && intersection(result.range, definition.range) !== null,
			)
		) {
			continue // ;)
		}
		results.push(definition)
	}
	// Recurse
	if (depth > 0) {
		for (const result of [...results]) {
			await crawlTypes(result, ide, depth - 1, results, searchedLabels)
		}
	}
	return results
}
async function getDefinitionsForNode(uri, node, ide, lang) {
	const ranges = []
	switch (node.type) {
		case "call_expression": {
			// function call -> function definition
			const [funDef] = await executeGotoProvider({
				uri,
				line: node.startPosition.row,
				character: node.startPosition.column,
				name: "vscode.executeDefinitionProvider",
			})
			if (!funDef) {
				return []
			}
			// Don't display a function of more than 15 lines
			// We can of course do something smarter here eventually
			let funcText = await ide.readRangeInFile(funDef.filepath, funDef.range)
			if (funcText.split("\n").length > 15) {
				let truncated = false
				const funRootAst = await getAst(funDef.filepath, funcText)
				if (funRootAst) {
					const [funNode] = findChildren(
						funRootAst?.rootNode,
						(node) => FUNCTION_DECLARATION_NODE_TYPEs.includes(node.type),
						1,
					)
					if (funNode) {
						const [statementBlockNode] = findChildren(
							funNode,
							(node) => FUNCTION_BLOCK_NODE_TYPES.includes(node.type),
							1,
						)
						if (statementBlockNode) {
							funcText = funRootAst.rootNode.text.slice(0, statementBlockNode.startIndex).trim()
							truncated = true
						}
					}
				}
				if (!truncated) {
					funcText = funcText.split("\n")[0]
				}
			}
			ranges.push(funDef)
			const typeDefs = await crawlTypes(
				{
					...funDef,
					contents: funcText,
				},
				ide,
			)
			ranges.push(...typeDefs)
			break
		}
		case "variable_declarator":
			// variable assignment -> variable definition/type
			// usages of the var that appear after the declaration
			break
		case "impl_item":
			// impl of trait -> trait definition
			break
		case "new_expression": {
			// In 'new MyClass(...)', "MyClass" is the classNameNode
			const classNameNode = node.children.find((child) => child && child.type === "identifier")
			const [classDef] = await executeGotoProvider({
				uri,
				line: (classNameNode ?? node).endPosition.row,
				character: (classNameNode ?? node).endPosition.column,
				name: "vscode.executeDefinitionProvider",
			})
			if (!classDef) {
				break
			}
			const contents = await ide.readRangeInFile(classDef.filepath, classDef.range)
			ranges.push({
				...classDef,
				contents: `${classNameNode?.text ? `${lang.singleLineComment} ${classNameNode.text}:\n` : ""}${contents.trim()}`,
			})
			const definitions = await crawlTypes({ ...classDef, contents }, ide)
			ranges.push(...definitions.filter(Boolean))
			break
		}
		case "":
			// function definition -> implementations?
			break
	}
	return await Promise.all(
		ranges.map(async (rif) => {
			// Convert the VS Code Range type to ours
			const range = {
				start: {
					line: rif.range.start.line,
					character: rif.range.start.character,
				},
				end: {
					line: rif.range.end.line,
					character: rif.range.end.character,
				},
			}
			rif.range = range
			if (!isRifWithContents(rif)) {
				return {
					...rif,
					contents: await ide.readRangeInFile(rif.filepath, rif.range),
				}
			}
			return rif
		}),
	)
}
/**
 * and other stuff not directly on the path:
 * - variables defined on line above
 * ...etc...
 */
export const getDefinitionsFromLsp = async (filepath, contents, cursorIndex, ide, lang) => {
	try {
		const ast = await getAst(filepath, contents)
		if (!ast) {
			return []
		}
		const treePath = await getTreePathAtCursor(ast, cursorIndex)
		if (!treePath) {
			return []
		}
		const results = []
		for (const node of treePath.reverse()) {
			const definitions = await getDefinitionsForNode(vscode.Uri.parse(filepath), node, ide, lang)
			results.push(...definitions)
		}
		return results.map((result) => ({
			filepath: result.filepath,
			content: result.contents,
			type: AutocompleteSnippetType.Code,
		}))
	} catch (e) {
		console.warn("Error getting definitions from LSP: ", e)
		return []
	}
}
function symbolInputKey(input) {
	return `${input.name}${input.uri.toString()}`
}
const MAX_SYMBOL_CACHE_SIZE = 100
const symbolCache = new Map()
export async function executeSymbolProvider(input) {
	const cacheKey = symbolInputKey(input)
	const cached = symbolCache.get(cacheKey)
	if (cached) {
		return cached
	}
	try {
		const symbols = await vscode.commands.executeCommand(input.name, input.uri)
		const results = []
		// Handle both possible return types from the symbol provider
		if (symbols.length > 0) {
			// if ("location" in symbols[0]) {
			//   // SymbolInformation type
			//   results.push(
			//     ...symbols.map((s: vscode.SymbolInformation) => ({
			//       filepath: s.location.uri.toString(),
			//       range: s.location.range,
			//     })),
			//   );
			// } else {
			// DocumentSymbol type - collect symbols recursively
			function collectSymbols(symbols, uri) {
				const result = []
				for (const symbol of symbols) {
					result.push({
						name: symbol.name,
						range: symbol.range,
						selectionRange: symbol.selectionRange,
						kind: symbol.kind,
					})
					if (symbol.children && symbol.children.length > 0) {
						result.push(...collectSymbols(symbol.children, uri))
					}
				}
				return result
			}
			results.push(...collectSymbols(symbols, input.uri))
			// }
		}
		// Add to cache
		if (symbolCache.size >= MAX_SYMBOL_CACHE_SIZE) {
			// Remove the oldest item from the cache
			const oldestKey = symbolCache.keys().next().value
			if (oldestKey) {
				symbolCache.delete(oldestKey)
			}
		}
		symbolCache.set(cacheKey, results)
		return results
	} catch (e) {
		console.warn(`Error executing ${input.name}:`, e)
		return []
	}
}
//# sourceMappingURL=lsp.js.map
