import React from "react"
import type { createStore } from "jotai"
type JotaiStore = ReturnType<typeof createStore>
export interface AppOptions {
	mode?: string
	workspace?: string
	ci?: boolean
	json?: boolean
	prompt?: string
	timeout?: number
	parallel?: boolean
	worktreeBranch?: string | undefined
	noSplash?: boolean
}
export interface AppProps {
	store: JotaiStore
	options: AppOptions
	onExit: () => void
}
export declare const App: React.FC<AppProps>
export {}
//# sourceMappingURL=App.d.ts.map
