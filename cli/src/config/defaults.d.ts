import type { AutoApprovalConfig } from "./types.js"
/**
 * Default auto approval configuration
 * Matches the defaults from the webview settings
 */
export declare const DEFAULT_AUTO_APPROVAL: AutoApprovalConfig
export declare const DEFAULT_CONFIG: {
	version: "1.0.0"
	mode: string
	telemetry: true
	provider: string
	providers: {
		id: string
		provider: "kilocode"
		kilocodeToken: string
		kilocodeModel: string
	}[]
	autoApproval: AutoApprovalConfig
	theme: string
	customThemes: {}
}
//# sourceMappingURL=defaults.d.ts.map
