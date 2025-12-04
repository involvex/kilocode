import type { DiffLine, DiffChar } from "../index.js"
export declare class CodeRenderer {
	private static instance
	static getInstance(): CodeRenderer
	setTheme(_theme: string): Promise<void>
	getDataUri(
		_text: string,
		_languageId: string,
		_options: {
			imageType: "svg"
			fontSize: number
			fontFamily: string
			dimensions: {
				width: number
				height: number
			}
			lineHeight: number
		},
		_currLineOffsetFromTop: number,
		_newDiffLines: DiffLine[],
		_diffChars: DiffChar[],
	): Promise<string>
}
//# sourceMappingURL=CodeRenderer.d.ts.map
