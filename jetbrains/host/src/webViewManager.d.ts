import {
	MainThreadWebviewViewsShape,
	WebviewExtensionDescription as ExtHostWebviewExtensionDescription,
	MainThreadWebviewsShape,
	IWebviewContentOptions,
} from "../deps/vscode/vs/workbench/api/common/extHost.protocol.js"
import { IRPCProtocol } from "../deps/vscode/vs/workbench/services/extensions/common/proxyIdentifier.js"
import { VSBuffer } from "../deps/vscode/vs/base/common/buffer.js"
export declare class WebViewManager implements MainThreadWebviewViewsShape, MainThreadWebviewsShape {
	private readonly rpcProtocol
	private readonly _proxy
	private readonly _webviews
	constructor(rpcProtocol: IRPCProtocol)
	$registerWebviewViewProvider(
		extension: ExtHostWebviewExtensionDescription,
		viewType: string,
		options: {
			retainContextWhenHidden?: boolean
			serializeBuffersForPostMessage: boolean
		},
	): void
	$unregisterWebviewViewProvider(viewType: string): void
	$setWebviewViewTitle(handle: string, value: string | undefined): void
	$setWebviewViewDescription(handle: string, value: string | undefined): void
	$setWebviewViewBadge(handle: string, badge: any | undefined): void
	$show(handle: string, preserveFocus: boolean): void
	$setHtml(handle: string, value: string): void
	$setOptions(handle: string, options: IWebviewContentOptions): void
	$postMessage(handle: string, value: string, ...buffers: VSBuffer[]): Promise<boolean>
	dispose(): void
}
//# sourceMappingURL=webViewManager.d.ts.map
