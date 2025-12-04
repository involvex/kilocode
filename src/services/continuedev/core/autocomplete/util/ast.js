import { getParserForFile } from "../../util/treeSitter"
export async function getAst(filepath, fileContents) {
	const parser = await getParserForFile(filepath)
	if (!parser) {
		return undefined
	}
	try {
		const ast = parser.parse(fileContents)
		return ast || undefined
	} catch {
		return undefined
	}
}
export async function getTreePathAtCursor(ast, cursorIndex) {
	const path = [ast.rootNode]
	while (path[path.length - 1].childCount > 0) {
		let foundChild = false
		for (const child of path[path.length - 1].children) {
			if (child && child.startIndex <= cursorIndex && child.endIndex >= cursorIndex) {
				path.push(child)
				foundChild = true
				break
			}
		}
		if (!foundChild) {
			break
		}
	}
	return path
}
//# sourceMappingURL=ast.js.map
