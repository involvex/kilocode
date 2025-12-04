import * as vscode from "vscode"
/**
 * Special character used to mark cursor position in test documents.
 * Using "␣" (U+2423, OPEN BOX) as it's visually distinct and unlikely to be in normal code.
 */
export declare const CURSOR_MARKER = "\u2423"
/**
 * MockTextEditor encapsulates both a TextDocument and cursor position
 * for simpler testing of editor-related functionality
 */
export declare class MockTextEditor {
	readonly document: vscode.TextDocument
	selection: vscode.Selection
	/**
	 * Creates a new MockTextEditor
	 * @param content Text content with optional cursor marker (CURSOR_MARKER)
	 *                If no cursor marker is provided, cursor defaults to position (0,0)
	 */
	constructor(content: string)
	static create(content: string): MockTextEditor
}
//# sourceMappingURL=MockTextEditor.d.ts.map
