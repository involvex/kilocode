// Minimal vscode mock for standalone tsx runner
// This directory doesn't use vitest, so needs its own lightweight mock
export class Position {
	line
	character
	constructor(line, character) {
		this.line = line
		this.character = character
	}
	isEqual(other) {
		return this.line === other.line && this.character === other.character
	}
	isBefore(other) {
		if (this.line < other.line) return true
		if (this.line > other.line) return false
		return this.character < other.character
	}
	isAfter(other) {
		return !this.isEqual(other) && !this.isBefore(other)
	}
	isBeforeOrEqual(other) {
		return this.isBefore(other) || this.isEqual(other)
	}
	isAfterOrEqual(other) {
		return this.isAfter(other) || this.isEqual(other)
	}
}
export class Range {
	start
	end
	constructor(startOrStartLine, endOrStartCharacter, endLine, endCharacter) {
		if (typeof startOrStartLine === "number") {
			this.start = new Position(startOrStartLine, endOrStartCharacter)
			this.end = new Position(endLine, endCharacter)
		} else {
			this.start = startOrStartLine
			this.end = endOrStartCharacter
		}
	}
	get isEmpty() {
		return this.start.isEqual(this.end)
	}
	get isSingleLine() {
		return this.start.line === this.end.line
	}
	contains(positionOrRange) {
		if (positionOrRange instanceof Range) {
			return this.contains(positionOrRange.start) && this.contains(positionOrRange.end)
		}
		const position = positionOrRange
		return position.isAfterOrEqual(this.start) && position.isBeforeOrEqual(this.end)
	}
	isEqual(other) {
		return this.start.isEqual(other.start) && this.end.isEqual(other.end)
	}
}
export class Uri {
	scheme
	authority
	path
	query
	fragment
	constructor(scheme, authority, path, query, fragment) {
		this.scheme = scheme
		this.authority = authority
		this.path = path
		this.query = query
		this.fragment = fragment
	}
	static parse(value) {
		const match = value.match(/^([^:]+):(?:\/\/([^\/]+))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?$/)
		if (!match) {
			throw new Error("Invalid URI")
		}
		return new Uri(match[1] || "", match[2] || "", match[3] || "", match[4] || "", match[5] || "")
	}
	static file(path) {
		return new Uri("file", "", path, "", "")
	}
	toString() {
		let result = this.scheme + ":"
		if (this.authority) {
			result += "//" + this.authority
		}
		result += this.path
		if (this.query) {
			result += "?" + this.query
		}
		if (this.fragment) {
			result += "#" + this.fragment
		}
		return result
	}
	get fsPath() {
		return this.path
	}
}
export class Selection extends Range {
	anchor
	active
	constructor(anchorOrAnchorLine, activeOrAnchorCharacter, activeLine, activeCharacter) {
		let anchor
		let active
		if (typeof anchorOrAnchorLine === "number") {
			anchor = new Position(anchorOrAnchorLine, activeOrAnchorCharacter)
			active = new Position(activeLine, activeCharacter)
		} else {
			anchor = anchorOrAnchorLine
			active = activeOrAnchorCharacter
		}
		super(anchor, active)
		this.anchor = anchor
		this.active = active
	}
	get isReversed() {
		return this.anchor.isAfter(this.active)
	}
}
export var EndOfLine
;(function (EndOfLine) {
	EndOfLine[(EndOfLine["LF"] = 1)] = "LF"
	EndOfLine[(EndOfLine["CRLF"] = 2)] = "CRLF"
})(EndOfLine || (EndOfLine = {}))
export var DiagnosticSeverity
;(function (DiagnosticSeverity) {
	DiagnosticSeverity[(DiagnosticSeverity["Error"] = 0)] = "Error"
	DiagnosticSeverity[(DiagnosticSeverity["Warning"] = 1)] = "Warning"
	DiagnosticSeverity[(DiagnosticSeverity["Information"] = 2)] = "Information"
	DiagnosticSeverity[(DiagnosticSeverity["Hint"] = 3)] = "Hint"
})(DiagnosticSeverity || (DiagnosticSeverity = {}))
export const workspace = {
	asRelativePath(pathOrUri, includeWorkspaceFolder) {
		const path = typeof pathOrUri === "string" ? pathOrUri : pathOrUri.path
		return path.split("/").pop() || path
	},
}
//# sourceMappingURL=mock-vscode.js.map
