/**
 * Interactive config editor for the terminal
 * Provides a menu-driven interface to edit CLI configuration
 */
import type { CliMessage } from "../types/cli.js"
/**
 * Main interactive config editor
 */
export declare function startInteractiveConfigEditor(
	context: {
		addMessage: (message: CliMessage) => void
	},
	_directOption?: number,
): Promise<void>
//# sourceMappingURL=interactiveEditor.d.ts.map
