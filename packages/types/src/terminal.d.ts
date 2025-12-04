import { z } from "zod"
/**
 * CommandExecutionStatus
 */
export declare const commandExecutionStatusSchema: z.ZodDiscriminatedUnion<
	"status",
	[
		z.ZodObject<
			{
				executionId: z.ZodString
				status: z.ZodLiteral<"started">
				pid: z.ZodOptional<z.ZodNumber>
				command: z.ZodString
			},
			"strip",
			z.ZodTypeAny,
			{
				status: "started"
				command: string
				executionId: string
				pid?: number | undefined
			},
			{
				status: "started"
				command: string
				executionId: string
				pid?: number | undefined
			}
		>,
		z.ZodObject<
			{
				executionId: z.ZodString
				status: z.ZodLiteral<"output">
				output: z.ZodString
			},
			"strip",
			z.ZodTypeAny,
			{
				status: "output"
				output: string
				executionId: string
			},
			{
				status: "output"
				output: string
				executionId: string
			}
		>,
		z.ZodObject<
			{
				executionId: z.ZodString
				status: z.ZodLiteral<"exited">
				exitCode: z.ZodOptional<z.ZodNumber>
			},
			"strip",
			z.ZodTypeAny,
			{
				status: "exited"
				executionId: string
				exitCode?: number | undefined
			},
			{
				status: "exited"
				executionId: string
				exitCode?: number | undefined
			}
		>,
		z.ZodObject<
			{
				executionId: z.ZodString
				status: z.ZodLiteral<"fallback">
			},
			"strip",
			z.ZodTypeAny,
			{
				status: "fallback"
				executionId: string
			},
			{
				status: "fallback"
				executionId: string
			}
		>,
		z.ZodObject<
			{
				executionId: z.ZodString
				status: z.ZodLiteral<"timeout">
			},
			"strip",
			z.ZodTypeAny,
			{
				status: "timeout"
				executionId: string
			},
			{
				status: "timeout"
				executionId: string
			}
		>,
	]
>
export type CommandExecutionStatus = z.infer<typeof commandExecutionStatusSchema>
//# sourceMappingURL=terminal.d.ts.map
