// DO NOT REMOVE: React type override for webview apps using only React 18/icon libraries.
// This file patches workspace pollution/failures due to React 19 types from other packages.
// See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/67674, https://github.com/lucide-icons/lucide/issues/1892

import "react"
declare module "react" {
	// Patch the ambient type only for the local app.
	export type ReactNode =
		| React.ReactElement
		| string
		| number
		| Iterable<ReactNode>
		| React.ReactPortal
		| boolean
		| null
		| undefined
	export type ForwardRefExoticComponent<P> = (props: P) => ReactNode
	export type ElementType<P = any> = (props: P) => ReactNode
}
