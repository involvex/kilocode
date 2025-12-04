import { z } from "zod"
export declare const openRouterModelSchema: z.ZodObject<
	{
		id: z.ZodString
		name: z.ZodString
	},
	"strip",
	z.ZodTypeAny,
	{
		id: string
		name: string
	},
	{
		id: string
		name: string
	}
>
export type OpenRouterModel = z.infer<typeof openRouterModelSchema>
export declare const getOpenRouterModels: () => Promise<OpenRouterModel[]>
export declare const useOpenRouterModels: () => import("@tanstack/react-query").UseQueryResult<
	{
		id: string
		name: string
	}[],
	Error
>
//# sourceMappingURL=use-open-router-models.d.ts.map
