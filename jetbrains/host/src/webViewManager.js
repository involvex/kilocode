// Copyright 2009-2025 Weibo, Inc.
// SPDX-FileCopyrightText: 2025 Weibo, Inc.
//
// SPDX-License-Identifier: Apache-2.0
import { ExtHostContext } from "../deps/vscode/vs/workbench/api/common/extHost.protocol.js"
import { URI } from "../deps/vscode/vs/base/common/uri.js"
import { CancellationToken } from "../deps/vscode/vs/base/common/cancellation.js"
/**
 * A simplified webview implementation that only includes methods used by WebViewManager
 */
class SimpleWebview {
	contentOptions = {}
	setHtml(html) {
		console.log("[SimpleWebview] Set HTML:", html)
	}
	setTitle(title) {
		console.log("[SimpleWebview] Set title:", title)
	}
	postMessage(message, transfer) {
		console.log("[SimpleWebview] Post message:", message)
		return Promise.resolve(true)
	}
	focus() {
		console.log("[SimpleWebview] Focus")
	}
	dispose() {
		console.log("[SimpleWebview] Dispose")
	}
}
export class WebViewManager {
	rpcProtocol
	_proxy
	_webviews = new Map()
	constructor(rpcProtocol) {
		this.rpcProtocol = rpcProtocol
		this._proxy = this.rpcProtocol.getProxy(ExtHostContext.ExtHostWebviewViews)
	}
	// MainThreadWebviewViewsShape implementation
	$registerWebviewViewProvider(extension, viewType, options) {
		console.log("Register webview view provider:", { extension, viewType, options })
		// Create a new webview instance
		const webview = new SimpleWebview()
		// Store the webview instance
		this._webviews.set(viewType, webview)
		// Generate a unique handle for this webview
		const webviewHandle = `webview-${viewType}-${Date.now()}`
		// Notify the extension host that the webview is ready
		this._proxy.$resolveWebviewView(
			webviewHandle,
			viewType,
			undefined, // title
			undefined, // state
			CancellationToken.None,
		)
	}
	$unregisterWebviewViewProvider(viewType) {
		console.log("Unregister webview view provider:", viewType)
		// Remove the webview instance
		const webview = this._webviews.get(viewType)
		if (webview) {
			webview.dispose()
			this._webviews.delete(viewType)
		}
	}
	$setWebviewViewTitle(handle, value) {
		console.log("Set webview view title:", { handle, value })
		const webview = this._webviews.get(handle)
		if (webview) {
			webview.setTitle(value || "")
		}
	}
	$setWebviewViewDescription(handle, value) {
		console.log("Set webview view description:", { handle, value })
	}
	$setWebviewViewBadge(handle, badge) {
		console.log("Set webview view badge:", { handle, badge })
	}
	$show(handle, preserveFocus) {
		console.log("Show webview view:", { handle, preserveFocus })
		const webview = this._webviews.get(handle)
		if (webview) {
			webview.focus()
		}
	}
	// MainThreadWebviewsShape implementation
	$setHtml(handle, value) {
		console.log("Set webview HTML:", { handle, value })
		const webview = this._webviews.get(handle)
		if (webview) {
			webview.setHtml(value)
		}
	}
	$setOptions(handle, options) {
		console.log("Set webview panel options:", { handle, options })
		const webview = this._webviews.get(handle)
		if (webview) {
			// Convert IWebviewContentOptions to WebviewContentOptions
			const contentOptions = {
				allowScripts: options.enableScripts,
				allowForms: options.enableForms,
				localResourceRoots: options.localResourceRoots?.map((uri) => URI.revive(uri)),
				portMapping: options.portMapping,
			}
			webview.contentOptions = contentOptions
		}
	}
	$postMessage(handle, value, ...buffers) {
		console.log("Post message to webview:", { handle, value, buffers })
		const webview = this._webviews.get(handle)
		if (webview) {
			return webview.postMessage(value, buffers)
		}
		return Promise.resolve(false)
	}
	dispose() {
		console.log("Dispose WebViewManager")
		// Dispose all webviews
		for (const webview of this._webviews.values()) {
			webview.dispose()
		}
		this._webviews.clear()
	}
}
