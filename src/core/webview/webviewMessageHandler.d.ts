import { MaybeTypedWebviewMessage } from "../../shared/WebviewMessage"
import { ClineProvider } from "./ClineProvider"
import { MarketplaceManager } from "../../services/marketplace"
export declare const webviewMessageHandler: (
	provider: ClineProvider,
	message: MaybeTypedWebviewMessage, // kilocode_change switch to MaybeTypedWebviewMessage for better type-safety
	marketplaceManager?: MarketplaceManager,
) => Promise<void>
//# sourceMappingURL=webviewMessageHandler.d.ts.map
