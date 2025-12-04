import { z } from "zod"
/**
 * HistoryItem
 */
export declare const historyItemSchema: z.ZodObject<
	{
		id: z.ZodString
		rootTaskId: z.ZodOptional<z.ZodString>
		parentTaskId: z.ZodOptional<z.ZodString>
		number: z.ZodNumber
		ts: z.ZodNumber
		task: z.ZodString
		tokensIn: z.ZodNumber
		tokensOut: z.ZodNumber
		cacheWrites: z.ZodOptional<z.ZodNumber>
		cacheReads: z.ZodOptional<z.ZodNumber>
		totalCost: z.ZodNumber
		size: z.ZodOptional<z.ZodNumber>
		workspace: z.ZodOptional<z.ZodString>
		isFavorited: z.ZodOptional<z.ZodBoolean>
		fileNotfound: z.ZodOptional<z.ZodBoolean>
		mode: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
		number: number
		ts: number
		totalCost: number
		id: string
		task: string
		tokensIn: number
		tokensOut: number
		rootTaskId?: string | undefined
		parentTaskId?: string | undefined
		cacheWrites?: number | undefined
		cacheReads?: number | undefined
		size?: number | undefined
		workspace?: string | undefined
		isFavorited?: boolean | undefined
		fileNotfound?: boolean | undefined
		mode?: string | undefined
	},
	{
		number: number
		ts: number
		totalCost: number
		id: string
		task: string
		tokensIn: number
		tokensOut: number
		rootTaskId?: string | undefined
		parentTaskId?: string | undefined
		cacheWrites?: number | undefined
		cacheReads?: number | undefined
		size?: number | undefined
		workspace?: string | undefined
		isFavorited?: boolean | undefined
		fileNotfound?: boolean | undefined
		mode?: string | undefined
	}
>
export type HistoryItem = z.infer<typeof historyItemSchema>
//# sourceMappingURL=history.d.ts.map
