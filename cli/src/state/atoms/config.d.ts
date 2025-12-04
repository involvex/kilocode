import type { AutoApprovalConfig, CLIConfig, ProviderConfig } from "../../config/types.js"
import type { ValidationResult } from "../../config/validation.js"
import type { Theme } from "../../types/theme.js"
export declare const configAtom: import("jotai").PrimitiveAtom<CLIConfig> & {
	init: CLIConfig
}
export declare const configValidationAtom: import("jotai").PrimitiveAtom<ValidationResult> & {
	init: ValidationResult
}
export declare const configLoadingAtom: import("jotai").PrimitiveAtom<boolean> & {
	init: boolean
}
export declare const configErrorAtom: import("jotai").PrimitiveAtom<Error | null> & {
	init: Error | null
}
export declare const providerAtom: import("jotai").Atom<ProviderConfig | undefined>
export declare const providersAtom: import("jotai").Atom<ProviderConfig[]>
export declare const modeAtom: import("jotai").Atom<string>
export declare const themeAtom: import("jotai").Atom<string>
export declare const loadConfigAtom: import("jotai").WritableAtom<
	null,
	[mode?: string | undefined],
	Promise<CLIConfig>
> & {
	init: null
}
export declare const saveConfigAtom: import("jotai").WritableAtom<
	null,
	[config?: CLIConfig | undefined],
	Promise<void>
> & {
	init: null
}
export declare const selectProviderAtom: import("jotai").WritableAtom<null, [providerId: string], Promise<void>> & {
	init: null
}
export declare const addProviderAtom: import("jotai").WritableAtom<null, [provider: ProviderConfig], Promise<void>> & {
	init: null
}
export declare const updateProviderAtom: import("jotai").WritableAtom<
	null,
	[providerId: string, updates: Partial<ProviderConfig>],
	Promise<void>
> & {
	init: null
}
export declare const removeProviderAtom: import("jotai").WritableAtom<null, [providerId: string], Promise<void>> & {
	init: null
}
export declare const setModeAtom: import("jotai").WritableAtom<null, [mode: string], Promise<void>> & {
	init: null
}
export declare const setThemeAtom: import("jotai").WritableAtom<null, [theme: string], Promise<void>> & {
	init: null
}
export declare const mappedExtensionStateAtom: import("jotai").Atom<Partial<import("./index.js").ExtensionState>>
/**
 * Derived atom to get the complete auto approval configuration
 */
export declare const autoApprovalConfigAtom: import("jotai").Atom<AutoApprovalConfig | undefined>
/**
 * Derived atom to get the global auto approval enabled state
 */
export declare const autoApprovalEnabledAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to check if read operations should be auto-approved
 */
export declare const autoApproveReadAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to check if read operations outside workspace should be auto-approved
 */
export declare const autoApproveReadOutsideAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to check if write operations should be auto-approved
 */
export declare const autoApproveWriteAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to check if write operations outside workspace should be auto-approved
 */
export declare const autoApproveWriteOutsideAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to check if write operations to protected files should be auto-approved
 */
export declare const autoApproveWriteProtectedAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to check if browser operations should be auto-approved
 */
export declare const autoApproveBrowserAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to check if retry operations should be auto-approved
 */
export declare const autoApproveRetryAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to get retry delay in seconds
 */
export declare const autoApproveRetryDelayAtom: import("jotai").Atom<number>
/**
 * Derived atom to check if MCP operations should be auto-approved
 */
export declare const autoApproveMcpAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to check if mode switching should be auto-approved
 */
export declare const autoApproveModeAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to check if subtask creation should be auto-approved
 */
export declare const autoApproveSubtasksAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to check if command execution should be auto-approved
 */
export declare const autoApproveExecuteAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to get allowed commands list
 */
export declare const autoApproveExecuteAllowedAtom: import("jotai").Atom<string[]>
/**
 * Derived atom to get denied commands list
 */
export declare const autoApproveExecuteDeniedAtom: import("jotai").Atom<string[]>
/**
 * Derived atom to check if followup questions should be auto-approved
 */
export declare const autoApproveQuestionAtom: import("jotai").Atom<boolean>
/**
 * Derived atom to get followup question timeout in seconds
 */
export declare const autoApproveQuestionTimeoutAtom: import("jotai").Atom<number>
/**
 * Derived atom to check if todo list updates should be auto-approved
 */
export declare const autoApproveTodoAtom: import("jotai").Atom<boolean>
/**
 * Action atom to toggle global auto approval
 */
export declare const toggleAutoApprovalAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
/**
 * Action atom to update auto approval configuration
 */
export declare const updateAutoApprovalAtom: import("jotai").WritableAtom<
	null,
	[updates: Partial<AutoApprovalConfig>],
	Promise<void>
> & {
	init: null
}
/**
 * Action atom to update a specific auto approval setting
 */
export declare const updateAutoApprovalSettingAtom: import("jotai").WritableAtom<
	null,
	[category: keyof AutoApprovalConfig, updates: Record<string, unknown>],
	Promise<void>
> & {
	init: null
}
/**
 * Action atom to add a command pattern to the auto-approval allowed list
 */
export declare const addAllowedCommandAtom: import("jotai").WritableAtom<
	null,
	[commandPattern: string],
	Promise<void>
> & {
	init: null
}
/**
 * Action atom to add a custom theme
 */
export declare const addCustomThemeAtom: import("jotai").WritableAtom<
	null,
	[themeId: string, theme: Theme],
	Promise<void>
> & {
	init: null
}
/**
 * Action atom to remove a custom theme
 */
export declare const removeCustomThemeAtom: import("jotai").WritableAtom<null, [themeId: string], Promise<void>> & {
	init: null
}
/**
 * Action atom to update a custom theme
 */
export declare const updateCustomThemeAtom: import("jotai").WritableAtom<
	null,
	[themeId: string, updates: Partial<Theme>],
	Promise<void>
> & {
	init: null
}
/**
 * Derived atom to get all custom themes
 */
export declare const customThemesAtom: import("jotai").Atom<Record<string, Theme>>
//# sourceMappingURL=config.d.ts.map
