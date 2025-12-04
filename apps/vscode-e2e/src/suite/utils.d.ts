import { type RooCodeAPI } from "@roo-code/types"
type WaitForOptions = {
	timeout?: number
	interval?: number
}
export declare const waitFor: (
	condition: (() => Promise<boolean>) | (() => boolean),
	{ timeout, interval }?: WaitForOptions,
) => Promise<unknown>
type WaitUntilAbortedOptions = WaitForOptions & {
	api: RooCodeAPI
	taskId: string
}
export declare const waitUntilAborted: ({ api, taskId, ...options }: WaitUntilAbortedOptions) => Promise<void>
type WaitUntilCompletedOptions = WaitForOptions & {
	api: RooCodeAPI
	taskId: string
}
export declare const waitUntilCompleted: ({ api, taskId, ...options }: WaitUntilCompletedOptions) => Promise<void>
export declare const sleep: (ms: number) => Promise<unknown>
export {}
//# sourceMappingURL=utils.d.ts.map
