/**
 * CommandUI - Main application component for command-based UI
 * Refactored to use specialized hooks for better maintainability
 */
import React from "react"
import { AppOptions } from "./App.js"
interface UIAppProps {
	options: AppOptions
	onExit: () => void
}
export declare const UI: React.FC<UIAppProps>
export {}
//# sourceMappingURL=UI.d.ts.map
