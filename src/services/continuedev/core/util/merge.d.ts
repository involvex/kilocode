import { ConfigMergeType } from "../index.js"
export declare function mergeJson<T = Record<string, unknown>>(
	first: T,
	second: Partial<T>,
	mergeBehavior?: ConfigMergeType,
	mergeKeys?: {
		[key: string]: (a: unknown, b: unknown) => boolean
	},
): T
//# sourceMappingURL=merge.d.ts.map
