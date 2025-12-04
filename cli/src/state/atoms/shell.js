/**
 * Jotai atoms for shell mode state management
 */
import { atom } from "jotai"
import { addMessageAtom, inputModeAtom } from "./ui.js"
import { exec } from "child_process"
import { clearTextAtom, setTextAtom, textBufferIsEmptyAtom } from "./textBuffer.js"
// ============================================================================
// Workspace Path Atom
// ============================================================================
/**
 * The workspace directory where shell commands should be executed
 */
export const workspacePathAtom = atom(null)
// ============================================================================
// Shell Mode Atoms
// ============================================================================
/**
 * Whether shell mode is currently active
 */
export const shellModeActiveAtom = atom(false)
/**
 * Shell command history
 */
export const shellHistoryAtom = atom([])
/**
 * Current shell history index (for navigation)
 */
export const shellHistoryIndexAtom = atom(-1)
/**
 * Action atom to toggle shell mode
 * Only enters shell mode if input is empty, but always allows exiting
 */
export const toggleShellModeAtom = atom(null, (get, set) => {
	const isCurrentlyActive = get(shellModeActiveAtom)
	const isEmpty = get(textBufferIsEmptyAtom)
	if (!isCurrentlyActive) {
		// Entering shell mode - only allow if input is empty
		if (!isEmpty) {
			// Don't enter shell mode if there's already text in the input
			return
		}
		set(shellModeActiveAtom, true)
		set(inputModeAtom, "shell")
		set(shellHistoryIndexAtom, -1)
		// Clear text buffer when entering shell mode
		set(clearTextAtom)
	} else {
		// Exiting shell mode - always allow
		set(shellModeActiveAtom, false)
		set(inputModeAtom, "normal")
		set(shellHistoryIndexAtom, -1)
		// Clear text buffer when exiting shell mode
		set(clearTextAtom)
	}
})
/**
 * Action atom to add command to shell history
 */
export const addToShellHistoryAtom = atom(null, (get, set, command) => {
	const history = get(shellHistoryAtom)
	const newHistory = [...history, command]
	// Keep only last 100 commands
	set(shellHistoryAtom, newHistory.slice(-100))
})
/**
 * Action atom to navigate shell history up
 */
export const navigateShellHistoryUpAtom = atom(null, (get, set) => {
	const history = get(shellHistoryAtom)
	const currentIndex = get(shellHistoryIndexAtom)
	if (history.length === 0) return
	let newIndex
	if (currentIndex === -1) {
		// First time going up - go to most recent command
		newIndex = history.length - 1
	} else if (currentIndex > 0) {
		// Go to older command
		newIndex = currentIndex - 1
	} else {
		// Already at oldest command
		return
	}
	set(shellHistoryIndexAtom, newIndex)
	// Set the text buffer to the history command
	set(setTextAtom, history[newIndex] || "")
})
/**
 * Action atom to navigate shell history down
 */
export const navigateShellHistoryDownAtom = atom(null, (get, set) => {
	const history = get(shellHistoryAtom)
	const currentIndex = get(shellHistoryIndexAtom)
	if (currentIndex === -1) return
	let newIndex
	if (currentIndex === history.length - 1) {
		// At most recent command - clear input
		newIndex = -1
	} else {
		// Go to newer command
		newIndex = currentIndex + 1
	}
	set(shellHistoryIndexAtom, newIndex)
	// Set the text buffer to the history command or clear it
	if (newIndex === -1) {
		set(clearTextAtom)
	} else {
		set(setTextAtom, history[newIndex] || "")
	}
})
/**
 * Action atom to execute shell command
 */
export const executeShellCommandAtom = atom(null, async (get, set, command) => {
	if (!command.trim()) return
	// Add to history
	set(addToShellHistoryAtom, command.trim())
	// Clear the text buffer immediately for better UX
	set(clearTextAtom)
	// Execute the command immediately (no approval needed)
	try {
		// Get the workspace path for command execution
		const workspacePath = get(workspacePathAtom)
		const executionDir = workspacePath || process.cwd()
		// Execute command and capture output
		const childProcess = exec(command, {
			cwd: executionDir,
			timeout: 30000, // 30 second timeout
		})
		let stdout = ""
		let stderr = ""
		// Collect output
		childProcess.stdout?.on("data", (data) => {
			stdout += data.toString()
		})
		childProcess.stderr?.on("data", (data) => {
			stderr += data.toString()
		})
		// Wait for completion
		await new Promise((resolve, reject) => {
			childProcess.on("close", (code) => {
				if (code === 0) {
					resolve()
				} else {
					reject(new Error(`Command exited with code ${code}`))
				}
			})
			childProcess.on("error", (error) => {
				reject(error)
			})
		})
		const output = stdout || stderr || "Command executed successfully"
		// Display as system message for visibility in CLI
		const systemMessage = {
			id: `shell-${Date.now()}`,
			type: "system",
			ts: Date.now(),
			content: `$ ${command}\n${output}`,
			partial: false,
		}
		set(addMessageAtom, systemMessage)
	} catch (error) {
		// Handle errors and display them in the message system
		const errorOutput = `❌ Error: ${error instanceof Error ? error.message : error}`
		// Display as error message for visibility in CLI
		const errorMessage = {
			id: `shell-error-${Date.now()}`,
			type: "error",
			ts: Date.now(),
			content: `$ ${command}\n${errorOutput}`,
			partial: false,
		}
		set(addMessageAtom, errorMessage)
	}
	// Reset history navigation index
	set(shellHistoryIndexAtom, -1)
})
