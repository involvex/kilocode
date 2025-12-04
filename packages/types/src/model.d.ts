import { z } from "zod"
/**
 * ReasoningEffort
 */
export declare const reasoningEfforts: readonly ["low", "medium", "high"]
export declare const reasoningEffortsSchema: z.ZodEnum<["low", "medium", "high"]>
export type ReasoningEffort = z.infer<typeof reasoningEffortsSchema>
/**
 * ReasoningEffortWithMinimal
 */
export declare const reasoningEffortWithMinimalSchema: z.ZodUnion<
	[z.ZodEnum<["low", "medium", "high"]>, z.ZodLiteral<"minimal">]
>
export type ReasoningEffortWithMinimal = z.infer<typeof reasoningEffortWithMinimalSchema>
/**
 * Extended Reasoning Effort (includes "none" and "minimal")
 * Note: "disable" is a UI/control value, not a value sent as effort
 */
export declare const reasoningEffortsExtended: readonly ["none", "minimal", "low", "medium", "high"]
export declare const reasoningEffortExtendedSchema: z.ZodEnum<["none", "minimal", "low", "medium", "high"]>
export type ReasoningEffortExtended = z.infer<typeof reasoningEffortExtendedSchema>
/**
 * Reasoning Effort user setting (includes "disable")
 */
export declare const reasoningEffortSettingValues: readonly ["disable", "none", "minimal", "low", "medium", "high"]
export declare const reasoningEffortSettingSchema: z.ZodEnum<["disable", "none", "minimal", "low", "medium", "high"]>
/**
 * Verbosity
 */
export declare const verbosityLevels: readonly ["low", "medium", "high"]
export declare const verbosityLevelsSchema: z.ZodEnum<["low", "medium", "high"]>
export type VerbosityLevel = z.infer<typeof verbosityLevelsSchema>
/**
 * Service tiers (OpenAI Responses API)
 */
export declare const serviceTiers: readonly ["default", "flex", "priority"]
export declare const serviceTierSchema: z.ZodEnum<["default", "flex", "priority"]>
export type ServiceTier = z.infer<typeof serviceTierSchema>
/**
 * ModelParameter
 */
export declare const modelParameters: readonly ["max_tokens", "temperature", "reasoning", "include_reasoning"]
export declare const modelParametersSchema: z.ZodEnum<["max_tokens", "temperature", "reasoning", "include_reasoning"]>
export type ModelParameter = z.infer<typeof modelParametersSchema>
export declare const isModelParameter: (value: string) => value is ModelParameter
/**
 * ModelInfo
 */
export declare const modelInfoSchema: z.ZodObject<
	{
		maxTokens: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		maxThinkingTokens: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		contextWindow: z.ZodNumber
		supportsImages: z.ZodOptional<z.ZodBoolean>
		supportsComputerUse: z.ZodOptional<z.ZodBoolean>
		supportsPromptCache: z.ZodBoolean
		promptCacheRetention: z.ZodOptional<z.ZodEnum<["in_memory", "24h"]>>
		supportsVerbosity: z.ZodOptional<z.ZodBoolean>
		supportsReasoningBudget: z.ZodOptional<z.ZodBoolean>
		supportsReasoningBinary: z.ZodOptional<z.ZodBoolean>
		supportsTemperature: z.ZodOptional<z.ZodBoolean>
		defaultTemperature: z.ZodOptional<z.ZodNumber>
		requiredReasoningBudget: z.ZodOptional<z.ZodBoolean>
		supportsReasoningEffort: z.ZodOptional<
			z.ZodUnion<
				[z.ZodBoolean, z.ZodArray<z.ZodEnum<["disable", "none", "minimal", "low", "medium", "high"]>, "many">]
			>
		>
		requiredReasoningEffort: z.ZodOptional<z.ZodBoolean>
		preserveReasoning: z.ZodOptional<z.ZodBoolean>
		supportedParameters: z.ZodOptional<
			z.ZodArray<z.ZodEnum<["max_tokens", "temperature", "reasoning", "include_reasoning"]>, "many">
		>
		inputPrice: z.ZodOptional<z.ZodNumber>
		outputPrice: z.ZodOptional<z.ZodNumber>
		cacheWritesPrice: z.ZodOptional<z.ZodNumber>
		cacheReadsPrice: z.ZodOptional<z.ZodNumber>
		description: z.ZodOptional<z.ZodString>
		reasoningEffort: z.ZodOptional<z.ZodEnum<["none", "minimal", "low", "medium", "high"]>>
		minTokensPerCachePoint: z.ZodOptional<z.ZodNumber>
		maxCachePoints: z.ZodOptional<z.ZodNumber>
		cachableFields: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
		displayName: z.ZodOptional<z.ZodNullable<z.ZodString>>
		preferredIndex: z.ZodOptional<z.ZodNullable<z.ZodNumber>>
		deprecated: z.ZodOptional<z.ZodBoolean>
		isFree: z.ZodOptional<z.ZodBoolean>
		supportsNativeTools: z.ZodOptional<z.ZodBoolean>
		/**
		 * Service tiers with pricing information.
		 * Each tier can have a name (for OpenAI service tiers) and pricing overrides.
		 * The top-level input/output/cache* fields represent the default/standard tier.
		 */
		tiers: z.ZodOptional<
			z.ZodArray<
				z.ZodObject<
					{
						name: z.ZodOptional<z.ZodEnum<["default", "flex", "priority"]>>
						contextWindow: z.ZodNumber
						inputPrice: z.ZodOptional<z.ZodNumber>
						outputPrice: z.ZodOptional<z.ZodNumber>
						cacheWritesPrice: z.ZodOptional<z.ZodNumber>
						cacheReadsPrice: z.ZodOptional<z.ZodNumber>
					},
					"strip",
					z.ZodTypeAny,
					{
						contextWindow: number
						name?: "default" | "flex" | "priority" | undefined
						inputPrice?: number | undefined
						outputPrice?: number | undefined
						cacheWritesPrice?: number | undefined
						cacheReadsPrice?: number | undefined
					},
					{
						contextWindow: number
						name?: "default" | "flex" | "priority" | undefined
						inputPrice?: number | undefined
						outputPrice?: number | undefined
						cacheWritesPrice?: number | undefined
						cacheReadsPrice?: number | undefined
					}
				>,
				"many"
			>
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		contextWindow: number
		supportsPromptCache: boolean
		maxTokens?: number | null | undefined
		maxThinkingTokens?: number | null | undefined
		supportsImages?: boolean | undefined
		supportsComputerUse?: boolean | undefined
		promptCacheRetention?: "in_memory" | "24h" | undefined
		supportsVerbosity?: boolean | undefined
		supportsReasoningBudget?: boolean | undefined
		supportsReasoningBinary?: boolean | undefined
		supportsTemperature?: boolean | undefined
		defaultTemperature?: number | undefined
		requiredReasoningBudget?: boolean | undefined
		supportsReasoningEffort?: boolean | ("low" | "medium" | "high" | "minimal" | "none" | "disable")[] | undefined
		requiredReasoningEffort?: boolean | undefined
		preserveReasoning?: boolean | undefined
		supportedParameters?: ("reasoning" | "max_tokens" | "temperature" | "include_reasoning")[] | undefined
		inputPrice?: number | undefined
		outputPrice?: number | undefined
		cacheWritesPrice?: number | undefined
		cacheReadsPrice?: number | undefined
		description?: string | undefined
		reasoningEffort?: "low" | "medium" | "high" | "minimal" | "none" | undefined
		minTokensPerCachePoint?: number | undefined
		maxCachePoints?: number | undefined
		cachableFields?: string[] | undefined
		displayName?: string | null | undefined
		preferredIndex?: number | null | undefined
		deprecated?: boolean | undefined
		isFree?: boolean | undefined
		supportsNativeTools?: boolean | undefined
		tiers?:
			| {
					contextWindow: number
					name?: "default" | "flex" | "priority" | undefined
					inputPrice?: number | undefined
					outputPrice?: number | undefined
					cacheWritesPrice?: number | undefined
					cacheReadsPrice?: number | undefined
			  }[]
			| undefined
	},
	{
		contextWindow: number
		supportsPromptCache: boolean
		maxTokens?: number | null | undefined
		maxThinkingTokens?: number | null | undefined
		supportsImages?: boolean | undefined
		supportsComputerUse?: boolean | undefined
		promptCacheRetention?: "in_memory" | "24h" | undefined
		supportsVerbosity?: boolean | undefined
		supportsReasoningBudget?: boolean | undefined
		supportsReasoningBinary?: boolean | undefined
		supportsTemperature?: boolean | undefined
		defaultTemperature?: number | undefined
		requiredReasoningBudget?: boolean | undefined
		supportsReasoningEffort?: boolean | ("low" | "medium" | "high" | "minimal" | "none" | "disable")[] | undefined
		requiredReasoningEffort?: boolean | undefined
		preserveReasoning?: boolean | undefined
		supportedParameters?: ("reasoning" | "max_tokens" | "temperature" | "include_reasoning")[] | undefined
		inputPrice?: number | undefined
		outputPrice?: number | undefined
		cacheWritesPrice?: number | undefined
		cacheReadsPrice?: number | undefined
		description?: string | undefined
		reasoningEffort?: "low" | "medium" | "high" | "minimal" | "none" | undefined
		minTokensPerCachePoint?: number | undefined
		maxCachePoints?: number | undefined
		cachableFields?: string[] | undefined
		displayName?: string | null | undefined
		preferredIndex?: number | null | undefined
		deprecated?: boolean | undefined
		isFree?: boolean | undefined
		supportsNativeTools?: boolean | undefined
		tiers?:
			| {
					contextWindow: number
					name?: "default" | "flex" | "priority" | undefined
					inputPrice?: number | undefined
					outputPrice?: number | undefined
					cacheWritesPrice?: number | undefined
					cacheReadsPrice?: number | undefined
			  }[]
			| undefined
	}
>
export type ModelInfo = z.infer<typeof modelInfoSchema>
//# sourceMappingURL=model.d.ts.map
