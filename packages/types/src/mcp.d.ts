import { z } from "zod"
/**
 * MCP Server Use Types
 */
export interface McpServerUse {
	type: string
	serverName: string
	toolName?: string
	uri?: string
}
/**
 * McpExecutionStatus
 */
export declare const mcpExecutionStatusSchema: z.ZodDiscriminatedUnion<
	"status",
	[
		z.ZodObject<
			{
				executionId: z.ZodString
				status: z.ZodLiteral<"started">
				serverName: z.ZodString
				toolName: z.ZodString
			},
			"strip",
			z.ZodTypeAny,
			{
				status: "started"
				executionId: string
				serverName: string
				toolName: string
			},
			{
				status: "started"
				executionId: string
				serverName: string
				toolName: string
			}
		>,
		z.ZodObject<
			{
				executionId: z.ZodString
				status: z.ZodLiteral<"output">
				response: z.ZodString
			},
			"strip",
			z.ZodTypeAny,
			{
				status: "output"
				executionId: string
				response: string
			},
			{
				status: "output"
				executionId: string
				response: string
			}
		>,
		z.ZodObject<
			{
				executionId: z.ZodString
				status: z.ZodLiteral<"completed">
				response: z.ZodOptional<z.ZodString>
			},
			"strip",
			z.ZodTypeAny,
			{
				status: "completed"
				executionId: string
				response?: string | undefined
			},
			{
				status: "completed"
				executionId: string
				response?: string | undefined
			}
		>,
		z.ZodObject<
			{
				executionId: z.ZodString
				status: z.ZodLiteral<"error">
				error: z.ZodOptional<z.ZodString>
			},
			"strip",
			z.ZodTypeAny,
			{
				status: "error"
				executionId: string
				error?: string | undefined
			},
			{
				status: "error"
				executionId: string
				error?: string | undefined
			}
		>,
	]
>
export type McpExecutionStatus = z.infer<typeof mcpExecutionStatusSchema>
//# sourceMappingURL=mcp.d.ts.map
