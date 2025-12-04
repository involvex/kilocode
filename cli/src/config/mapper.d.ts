import type { CLIConfig, ProviderConfig } from "./types.js"
import type { ExtensionState } from "../types/messages.js"
export declare function mapConfigToExtensionState(
	config: CLIConfig,
	currentState?: Partial<ExtensionState>,
): Partial<ExtensionState>
export declare function getModelIdForProvider(provider: ProviderConfig): string
export declare function mapExtensionStateToConfig(state: ExtensionState, currentConfig?: CLIConfig): CLIConfig
//# sourceMappingURL=mapper.d.ts.map
