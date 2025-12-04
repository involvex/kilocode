/**
 * Atom-based text buffer system
 * Replaces the TextBuffer class with efficient Jotai atoms
 * This eliminates the need to create new TextBuffer instances on every keystroke
 */
export interface CursorPosition {
	row: number
	column: number
}
export interface TextBufferState {
	lines: string[]
	cursor: CursorPosition
}
export interface VisualLine {
	text: string
	logicalRow: number
	logicalStartCol: number
	logicalEndCol: number
}
/**
 * Core text buffer state
 * Contains the lines of text and cursor position
 */
export declare const textBufferStateAtom: import("jotai").PrimitiveAtom<TextBufferState> & {
	init: TextBufferState
}
/**
 * Get the full text as a single string
 */
export declare const textBufferStringAtom: import("jotai").Atom<string>
/**
 * Get the lines array
 */
export declare const textBufferLinesAtom: import("jotai").Atom<string[]>
/**
 * Get the cursor position
 */
export declare const textBufferCursorAtom: import("jotai").Atom<CursorPosition>
/**
 * Get the current line text
 */
export declare const textBufferCurrentLineAtom: import("jotai").Atom<string>
/**
 * Get the line count
 */
export declare const textBufferLineCountAtom: import("jotai").Atom<number>
/**
 * Check if buffer is empty
 */
export declare const textBufferIsEmptyAtom: import("jotai").Atom<boolean>
/**
 * Move cursor up one line
 */
export declare const moveUpAtom: import("jotai").WritableAtom<null, [], boolean> & {
	init: null
}
/**
 * Move cursor down one line
 */
export declare const moveDownAtom: import("jotai").WritableAtom<null, [], boolean> & {
	init: null
}
/**
 * Move cursor left one character
 */
export declare const moveLeftAtom: import("jotai").WritableAtom<null, [], boolean> & {
	init: null
}
/**
 * Move cursor right one character
 */
export declare const moveRightAtom: import("jotai").WritableAtom<null, [], boolean> & {
	init: null
}
/**
 * Move cursor to start of current line
 */
export declare const moveToLineStartAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Move cursor to end of current line
 */
export declare const moveToLineEndAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Move cursor to start of buffer
 */
export declare const moveToStartAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Move cursor to end of buffer
 */
export declare const moveToEndAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Move cursor to specific position
 */
export declare const moveToAtom: import("jotai").WritableAtom<
	null,
	[
		position: {
			row: number
			column: number
		},
	],
	void
> & {
	init: null
}
/**
 * Insert a single character at cursor position
 */
export declare const insertCharAtom: import("jotai").WritableAtom<null, [char: string], void> & {
	init: null
}
/**
 * Insert text at cursor position (can be multiline)
 */
export declare const insertTextAtom: import("jotai").WritableAtom<null, [text: string], void> & {
	init: null
}
/**
 * Insert a newline at cursor position
 */
export declare const insertNewlineAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Delete character before cursor (backspace)
 */
export declare const backspaceAtom: import("jotai").WritableAtom<null, [], boolean> & {
	init: null
}
/**
 * Delete character at cursor position
 */
export declare const deleteCharAtom: import("jotai").WritableAtom<null, [], boolean> & {
	init: null
}
/**
 * Delete word before cursor
 */
export declare const deleteWordAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Kill (delete) from cursor to end of line
 */
export declare const killLineAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Kill (delete) from start of line to cursor
 */
export declare const killLineLeftAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Set the entire text content
 */
export declare const setTextAtom: import("jotai").WritableAtom<null, [text: string], void> & {
	init: null
}
/**
 * Clear the buffer
 */
export declare const clearTextAtom: import("jotai").WritableAtom<null, [], void> & {
	init: null
}
/**
 * Get visual lines with word wrapping
 */
export declare const getVisualLinesAtom: import("jotai").WritableAtom<
	null,
	[
		params: {
			width: number
			maxLines?: number
		},
	],
	VisualLine[]
> & {
	init: null
}
/**
 * Get the visual cursor position accounting for line wrapping
 */
export declare const getVisualCursorAtom: import("jotai").WritableAtom<null, [width: number], CursorPosition> & {
	init: null
}
//# sourceMappingURL=textBuffer.d.ts.map
