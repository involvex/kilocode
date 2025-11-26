// Type declarations for third-party modules

declare module "knuth-shuffle-seeded" {
	export default function knuthShuffle<T>(array: T[], seed: any): T[]
}

// Fix React type conflicts by using consistent versions
declare global {
	namespace JSX {
		type ElementType = any
	}
}

// Force specific React version to avoid conflicts
declare module "@types/react" {
	const React: typeof import("react")
	export = React
}

declare module "@types/react-dom" {
	const ReactDOM: typeof import("react-dom")
	export = ReactDOM
}
