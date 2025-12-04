import * as vscode from "vscode"
import type { ILogger } from "../../shared/kilocode/cli-sessions/types/ILogger"
export declare class ExtensionLoggerAdapter implements ILogger {
	private readonly outputChannel
	constructor(outputChannel: vscode.OutputChannel)
	private formatLog
	debug(message: string, source: string, metadata?: Record<string, unknown>): void
	info(message: string, source: string, metadata?: Record<string, unknown>): void
	warn(message: string, source: string, metadata?: Record<string, unknown>): void
	error(message: string, source: string, metadata?: Record<string, unknown>): void
}
//# sourceMappingURL=ExtensionLoggerAdapter.d.ts.map
