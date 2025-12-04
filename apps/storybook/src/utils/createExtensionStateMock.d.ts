import type { ExtensionStateContextType } from "../../../../webview-ui/src/context/ExtensionStateContext"
/**
 * Creates a smart Proxy-based mock for ExtensionState in Storybook
 *
 * Only defines properties actually used in Storybook stories.
 * If you access an undefined property, you get a helpful error message.
 *
 * This approach minimizes maintenance - we only add properties when needed,
 * not every time ExtensionStateContextType changes.
 *
 * @param overrides - Story-specific overrides for extension state properties
 * @returns Proxied ExtensionStateContextType that provides smart defaults and helpful errors
 */
export declare const createExtensionStateMock: (
	overrides?: Partial<ExtensionStateContextType>,
) => ExtensionStateContextType
//# sourceMappingURL=createExtensionStateMock.d.ts.map
