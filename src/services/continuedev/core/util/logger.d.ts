export declare class Logger {
	#private
	private filename
	private includeFilename
	constructor(filename: string, includeFilename?: boolean)
	debug(message: string, ...args: any[]): void
	info(message: string, ...args: any[]): void
	warn(message: string, ...args: any[]): void
	error(message: string, ...args: any[]): void
}
//# sourceMappingURL=logger.d.ts.map
