import { IExtensionDescription } from "../deps/vscode/vs/platform/extensions/common/extensions.js"
import { IRPCProtocol } from "../deps/vscode/vs/workbench/services/extensions/common/proxyIdentifier.js"
export declare class ExtensionManager {
	private extensionDescriptions
	/**
	 * Parse extension description information
	 * @param extensionPath Extension path
	 * @returns Extension description object
	 */
	private parseExtensionDescription
	/**
	 * Get all parsed extension descriptions
	 * @returns Extension description array
	 */
	getAllExtensionDescriptions(): IExtensionDescription[]
	/**
	 * Get description information for specified extension
	 * @param extensionId Extension ID
	 * @returns Extension description object, or undefined if not exists
	 */
	getExtensionDescription(extensionId: string): IExtensionDescription | undefined
	/**
	 * Register an extension
	 * @param extensionPath Extension path
	 * @returns Extension description object
	 */
	registerExtension(extensionPath: string): IExtensionDescription
	/**
	 * Activate a registered extension
	 * @param extensionId Extension ID
	 * @param protocol RPC protocol
	 */
	activateExtension(extensionId: string, protocol: IRPCProtocol): Promise<void>
}
//# sourceMappingURL=extensionManager.d.ts.map
