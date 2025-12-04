import type { ChildProcess } from "child_process"
export interface ExecOptions {
	/**
	 * command to execute
	 */
	cmd: string
	/**
	 * where to execute the command
	 */
	cwd?: string
	/**
	 * what is being executed that should be logged for
	 * the user when it fails.eg. "running user command"
	 */
	context?: string
	/**
	 * the user that should run the command
	 */
	uid?: number
	/**
	 * environment variables
	 */
	env?: Record<string, string | undefined>
}
/**
 * Returns a childProcess, piping stdin to the process
 */
export declare function execWithStdin({ cmd, cwd, uid, env }: ExecOptions): Promise<ChildProcess>
/**
 * Executes a shell command, piping all stdio to the current process
 */
export declare function exec({ cmd, cwd, context, uid, env }: ExecOptions): Promise<void>
/**
 * Just like exec, except it is a generator which yields stdout lines
 */
export declare function execGetLines({
	cmd,
	cwd,
	context,
	uid,
	env,
}: ExecOptions): AsyncGenerator<string, void, unknown>
/**
 * Just like exec, except it is a generator which yields stdout lines
 */
export declare function execGetLinesStdoutStderr({
	cmd,
	cwd,
	context,
	uid,
	env,
}: ExecOptions): AsyncGenerator<WithIOType, void, unknown>
export type WithIOType = {
	type: "stdout" | "stderr"
	line: string
}
export declare function onChildProcessExit(childProcess: ChildProcess, context?: string): Promise<void>
export declare class ExecError extends Error {}
//# sourceMappingURL=exec.d.ts.map
