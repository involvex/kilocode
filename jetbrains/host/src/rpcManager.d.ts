import { IRPCProtocol } from "../deps/vscode/vs/workbench/services/extensions/common/proxyIdentifier.js"
import { PersistentProtocol } from "../deps/vscode/vs/base/parts/ipc/common/ipc.net.js"
import { ExtensionManager } from "./extensionManager.js"
export declare class RPCManager {
	private protocol
	private rpcProtocol
	private logger
	private extensionManager
	constructor(protocol: PersistentProtocol, extensionManager: ExtensionManager)
	startInitialize(): void
	setupDefaultProtocols(): void
	setupExtensionRequiredProtocols(): void
	setupRooCodeRequiredProtocols(): void
	getRPCProtocol(): IRPCProtocol | null
}
//# sourceMappingURL=rpcManager.d.ts.map
