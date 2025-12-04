import { GlobalState } from "@roo-code/types"
import { WebviewMessage } from "../../shared/WebviewMessage"
import { ClineProvider } from "./ClineProvider"
export declare function refreshOrganizationModes(
	message: WebviewMessage,
	provider: ClineProvider,
	updateGlobalState: <K extends keyof GlobalState>(key: K, value: GlobalState[K]) => Promise<void>,
): Promise<void>
export declare function fetchAndRefreshOrganizationModesOnStartup(
	provider: ClineProvider,
	updateGlobalState: <K extends keyof GlobalState>(key: K, value: GlobalState[K]) => Promise<void>,
): Promise<void>
//# sourceMappingURL=kiloWebviewMessgeHandlerHelpers.d.ts.map
