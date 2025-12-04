import { Task } from "../task/Task"
export declare function summarizeSuccessfulMcpOutputWhenTooLong(task: Task, outputText: string): Promise<string>
export declare function blockFileReadWhenTooLarge(
	task: Task,
	relPath: string,
	content: string,
): Promise<
	| {
			status: "blocked"
			error: string
			xmlContent: string
	  }
	| undefined
>
type FileEntry = {
	path?: string
	lineRanges?: {
		start: number
		end: number
	}[]
}
export declare function parseNativeFiles(
	nativeFiles: {
		path?: string
		line_ranges?: string[]
	}[],
): FileEntry[]
export declare function getNativeReadFileToolDescription(blockName: string, files: FileEntry[]): string
export {}
//# sourceMappingURL=kilocode.d.ts.map
