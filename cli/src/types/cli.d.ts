import type { ModeConfig } from "./messages.js"
export interface WelcomeMessageOptions {
	clearScreen?: boolean
	showInstructions?: boolean
	instructions?: string[]
	worktreeBranch?: string | undefined
	workspace?: string | undefined
}
export interface CliMessage {
	id: string
	type: "user" | "assistant" | "system" | "error" | "welcome" | "empty" | "requestCheckpointRestoreApproval"
	content: string
	ts: number
	partial?: boolean | undefined
	metadata?: {
		welcomeOptions?: WelcomeMessageOptions | undefined
	}
	payload?: unknown
}
export interface CLIOptions {
	mode?: string
	workspace?: string
	ci?: boolean
	json?: boolean
	prompt?: string
	timeout?: number
	customModes?: ModeConfig[]
	parallel?: boolean
	worktreeBranch?: string | undefined
	continue?: boolean
	provider?: string
	model?: string
	session?: string
	fork?: string
	noSplash?: boolean
}
//# sourceMappingURL=cli.d.ts.map
