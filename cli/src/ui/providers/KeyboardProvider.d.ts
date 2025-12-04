/**
 * KeyboardProvider - Centralized keyboard event handling provider
 * Sets up raw mode, captures all keyboard input, and broadcasts events via Jotai
 * Automatically detects and enables Kitty keyboard protocol if supported
 */
import React from "react"
import type { KeyboardProviderConfig } from "../../types/keyboard.js"
interface KeyboardProviderProps {
	children: React.ReactNode
	config?: KeyboardProviderConfig
}
export declare function KeyboardProvider({ children, config }: KeyboardProviderProps): React.JSX.Element
export {}
//# sourceMappingURL=KeyboardProvider.d.ts.map
