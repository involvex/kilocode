import { DiffStrategy } from "../../../shared/tools"
import { McpHub } from "../../../services/mcp/McpHub"
import { CodeIndexManager } from "../../../services/code-index/manager"
import type { ModeConfig } from "@roo-code/types"
import type { SystemPromptSettings } from "../types"
import { ClineProviderState } from "../../webview/ClineProvider"
export declare function getCapabilitiesSection(
	cwd: string,
	supportsComputerUse: boolean,
	mode: string,
	customModes: ModeConfig[] | undefined,
	experiments: Record<string, boolean> | undefined,
	mcpHub?: McpHub,
	diffStrategy?: DiffStrategy,
	codeIndexManager?: CodeIndexManager,
	settings?: SystemPromptSettings,
	clineProviderState?: ClineProviderState,
): string
//# sourceMappingURL=capabilities.d.ts.map
