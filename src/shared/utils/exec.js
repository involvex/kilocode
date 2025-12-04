// kilocode_change - new file
import { spawn } from "child_process"
import { Readable } from "stream"
import { chunksToLinesAsync, combine } from "./iterable"
/**
 * Returns a childProcess, piping stdin to the process
 */
export async function execWithStdin({ cmd, cwd, uid, env }) {
	const proc = spawn(cmd, {
		cwd,
		uid,
		shell: true,
		stdio: ["pipe", 1, 2],
		env,
	})
	return proc
}
/**
 * Executes a shell command, piping all stdio to the current process
 */
export async function exec({ cmd, cwd, context, uid, env }) {
	const proc = spawn(cmd, {
		cwd,
		uid,
		shell: true,
		stdio: ["inherit", "inherit", "inherit"],
		env,
	})
	await onChildProcessExit(proc, context)
}
/**
 * Just like exec, except it is a generator which yields stdout lines
 */
export async function* execGetLines({ cmd, cwd, context, uid, env }) {
	const proc = spawn(cmd, {
		cwd,
		uid,
		shell: true,
		stdio: ["ignore", "pipe", "inherit"],
		env,
	})
	const exit = onChildProcessExit(proc, context)
	try {
		for await (const line of chunksToLinesAsync(proc.stdout)) {
			yield line
		}
	} finally {
		// CRITICAL: Kill the process if the loop breaks, returns, or throws.
		if (!proc.killed) {
			proc.kill()
		}
	}
	await exit
}
/**
 * Just like exec, except it is a generator which yields stdout lines
 */
export async function* execGetLinesStdoutStderr({ cmd, cwd, context, uid, env }) {
	const proc = spawn(cmd, {
		cwd,
		uid,
		shell: true,
		stdio: ["ignore", "pipe", "pipe"],
		env,
	})
	// Transform stdout/stderr into a stream of lines, then wrap the lines in
	// objects that say where the lines came from (either stdout | stderr)
	const stdout = withIOType("stdout", chunksToLinesAsync(proc.stdout))
	const stderr = withIOType("stderr", chunksToLinesAsync(proc.stderr))
	const exit = onChildProcessExit(proc, context)
	try {
		// Yield each line object from the combined iterable from stdout/stderr
		for await (const line of combine(stdout, stderr)) {
			yield line
		}
	} finally {
		// CRITICAL: Kill the process if the loop breaks, returns, or throws.
		if (!proc.killed) {
			proc.kill()
		}
	}
	await exit
}
function withIOType(type, source) {
	return Readable.from(source).map((line) => ({ type, line }))
}
export function onChildProcessExit(childProcess, context) {
	return new Promise((resolve, reject) => {
		childProcess.once("exit", (code, _signal) => {
			if (code === 0) {
				resolve(undefined)
			} else {
				if (context) {
					reject(new ExecError(`Error while ${context}. Exited with error code: ${code}`))
				} else {
					reject(new Error(`Exit with error code: ${code}`))
				}
			}
		})
		childProcess.once("error", (err) => {
			reject(err)
		})
	})
}
export class ExecError extends Error {}
//# sourceMappingURL=exec.js.map
