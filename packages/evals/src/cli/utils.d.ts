import type { Run, Task } from "../db/index.js"
export declare const getTag: (
	caller: string,
	{
		run,
		task,
	}: {
		run: Run
		task?: Task
	},
) => string
export declare const isDockerContainer: () => boolean
export declare const resetEvalsRepo: ({ run, cwd }: { run: Run; cwd: string }) => Promise<void>
export declare const commitEvalsRepoChanges: ({ run, cwd }: { run: Run; cwd: string }) => Promise<void>
interface LoggerOptions {
	logDir: string
	filename: string
	tag: string
}
export declare class Logger {
	private logStream
	private logFilePath
	private tag
	constructor({ logDir, filename, tag }: LoggerOptions)
	private initializeLogger
	private writeToLog
	info(message: string, ...args: unknown[]): void
	error(message: string, ...args: unknown[]): void
	warn(message: string, ...args: unknown[]): void
	debug(message: string, ...args: unknown[]): void
	log(message: string, ...args: unknown[]): void
	close(): void
}
export {}
//# sourceMappingURL=utils.d.ts.map
