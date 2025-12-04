import * as z from "zod"
export declare const OpenAIConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodUnion<
			[
				z.ZodLiteral<"openai">,
				z.ZodLiteral<"mistral">,
				z.ZodLiteral<"voyage">,
				z.ZodLiteral<"deepinfra">,
				z.ZodLiteral<"groq">,
				z.ZodLiteral<"nvidia">,
				z.ZodLiteral<"ovhcloud">,
				z.ZodLiteral<"fireworks">,
				z.ZodLiteral<"together">,
				z.ZodLiteral<"novita">,
				z.ZodLiteral<"nebius">,
				z.ZodLiteral<"function-network">,
				z.ZodLiteral<"llama.cpp">,
				z.ZodLiteral<"llamafile">,
				z.ZodLiteral<"lmstudio">,
				z.ZodLiteral<"ollama">,
				z.ZodLiteral<"cerebras">,
				z.ZodLiteral<"kindo">,
				z.ZodLiteral<"msty">,
				z.ZodLiteral<"openrouter">,
				z.ZodLiteral<"sambanova">,
				z.ZodLiteral<"text-gen-webui">,
				z.ZodLiteral<"vllm">,
				z.ZodLiteral<"xAI">,
				z.ZodLiteral<"scaleway">,
				z.ZodLiteral<"ncompass">,
				z.ZodLiteral<"relace">,
				z.ZodLiteral<"huggingface-inference-api">,
			]
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		provider:
			| "openrouter"
			| "openai"
			| "ollama"
			| "mistral"
			| "ovhcloud"
			| "deepinfra"
			| "lmstudio"
			| "cerebras"
			| "fireworks"
			| "groq"
			| "sambanova"
			| "xAI"
			| "voyage"
			| "nvidia"
			| "together"
			| "novita"
			| "nebius"
			| "function-network"
			| "llama.cpp"
			| "llamafile"
			| "kindo"
			| "msty"
			| "text-gen-webui"
			| "vllm"
			| "scaleway"
			| "ncompass"
			| "relace"
			| "huggingface-inference-api"
		apiKey?: string | undefined
		apiBase?: string | undefined
	},
	{
		provider:
			| "openrouter"
			| "openai"
			| "ollama"
			| "mistral"
			| "ovhcloud"
			| "deepinfra"
			| "lmstudio"
			| "cerebras"
			| "fireworks"
			| "groq"
			| "sambanova"
			| "xAI"
			| "voyage"
			| "nvidia"
			| "together"
			| "novita"
			| "nebius"
			| "function-network"
			| "llama.cpp"
			| "llamafile"
			| "kindo"
			| "msty"
			| "text-gen-webui"
			| "vllm"
			| "scaleway"
			| "ncompass"
			| "relace"
			| "huggingface-inference-api"
		apiKey?: string | undefined
		apiBase?: string | undefined
	}
>
export type OpenAIConfig = z.infer<typeof OpenAIConfigSchema>
declare const _MoonshotConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"moonshot">
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "moonshot"
		apiKey?: string | undefined
		apiBase?: string | undefined
	},
	{
		provider: "moonshot"
		apiKey?: string | undefined
		apiBase?: string | undefined
	}
>
export type MoonshotConfig = z.infer<typeof _MoonshotConfigSchema>
declare const _DeepseekConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"deepseek">
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "deepseek"
		apiKey?: string | undefined
		apiBase?: string | undefined
	},
	{
		provider: "deepseek"
		apiKey?: string | undefined
		apiBase?: string | undefined
	}
>
export type DeepseekConfig = z.infer<typeof _DeepseekConfigSchema>
declare const _BedrockConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"bedrock">
		env: z.ZodOptional<
			z.ZodObject<
				{
					region: z.ZodOptional<z.ZodString>
					accessKeyId: z.ZodOptional<z.ZodString>
					secretAccessKey: z.ZodOptional<z.ZodString>
					profile: z.ZodOptional<z.ZodString>
				},
				"strip",
				z.ZodTypeAny,
				{
					region?: string | undefined
					accessKeyId?: string | undefined
					secretAccessKey?: string | undefined
					profile?: string | undefined
				},
				{
					region?: string | undefined
					accessKeyId?: string | undefined
					secretAccessKey?: string | undefined
					profile?: string | undefined
				}
			>
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "bedrock"
		apiKey?: string | undefined
		env?:
			| {
					region?: string | undefined
					accessKeyId?: string | undefined
					secretAccessKey?: string | undefined
					profile?: string | undefined
			  }
			| undefined
		apiBase?: string | undefined
	},
	{
		provider: "bedrock"
		apiKey?: string | undefined
		env?:
			| {
					region?: string | undefined
					accessKeyId?: string | undefined
					secretAccessKey?: string | undefined
					profile?: string | undefined
			  }
			| undefined
		apiBase?: string | undefined
	}
>
export type BedrockConfig = z.infer<typeof _BedrockConfigSchema>
declare const _LlamastackConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"llamastack">
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "llamastack"
		apiKey?: string | undefined
		apiBase?: string | undefined
	},
	{
		provider: "llamastack"
		apiKey?: string | undefined
		apiBase?: string | undefined
	}
>
export type LlamastackConfig = z.infer<typeof _LlamastackConfigSchema>
export declare const ContinueProxyConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"continue-proxy">
		env: z.ZodObject<
			{
				apiKeyLocation: z.ZodOptional<z.ZodString>
				envSecretLocations: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>
				orgScopeId: z.ZodNullable<z.ZodString>
				proxyUrl: z.ZodOptional<z.ZodString>
			},
			"strip",
			z.ZodTypeAny,
			{
				orgScopeId: string | null
				apiKeyLocation?: string | undefined
				envSecretLocations?: Record<string, string> | undefined
				proxyUrl?: string | undefined
			},
			{
				orgScopeId: string | null
				apiKeyLocation?: string | undefined
				envSecretLocations?: Record<string, string> | undefined
				proxyUrl?: string | undefined
			}
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "continue-proxy"
		env: {
			orgScopeId: string | null
			apiKeyLocation?: string | undefined
			envSecretLocations?: Record<string, string> | undefined
			proxyUrl?: string | undefined
		}
		apiKey?: string | undefined
		apiBase?: string | undefined
	},
	{
		provider: "continue-proxy"
		env: {
			orgScopeId: string | null
			apiKeyLocation?: string | undefined
			envSecretLocations?: Record<string, string> | undefined
			proxyUrl?: string | undefined
		}
		apiKey?: string | undefined
		apiBase?: string | undefined
	}
>
declare const _MockConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"mock">
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "mock"
		apiKey?: string | undefined
		apiBase?: string | undefined
	},
	{
		provider: "mock"
		apiKey?: string | undefined
		apiBase?: string | undefined
	}
>
declare const _CohereConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"cohere">
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "cohere"
		apiKey?: string | undefined
		apiBase?: string | undefined
	},
	{
		provider: "cohere"
		apiKey?: string | undefined
		apiBase?: string | undefined
	}
>
export type CohereConfig = z.infer<typeof _CohereConfigSchema>
declare const _CometAPIConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"cometapi">
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "cometapi"
		apiKey?: string | undefined
		apiBase?: string | undefined
	},
	{
		provider: "cometapi"
		apiKey?: string | undefined
		apiBase?: string | undefined
	}
>
export type CometAPIConfig = z.infer<typeof _CometAPIConfigSchema>
export declare const AzureConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"azure">
		env: z.ZodOptional<
			z.ZodObject<
				{
					apiVersion: z.ZodOptional<z.ZodString>
					apiType: z.ZodOptional<
						z.ZodUnion<[z.ZodLiteral<"azure-foundry">, z.ZodLiteral<"azure-openai">, z.ZodLiteral<"azure">]>
					>
					deployment: z.ZodOptional<z.ZodString>
				},
				"strip",
				z.ZodTypeAny,
				{
					apiVersion?: string | undefined
					apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined
					deployment?: string | undefined
				},
				{
					apiVersion?: string | undefined
					apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined
					deployment?: string | undefined
				}
			>
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "azure"
		apiKey?: string | undefined
		env?:
			| {
					apiVersion?: string | undefined
					apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined
					deployment?: string | undefined
			  }
			| undefined
		apiBase?: string | undefined
	},
	{
		provider: "azure"
		apiKey?: string | undefined
		env?:
			| {
					apiVersion?: string | undefined
					apiType?: "azure" | "azure-foundry" | "azure-openai" | undefined
					deployment?: string | undefined
			  }
			| undefined
		apiBase?: string | undefined
	}
>
declare const _GeminiConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"gemini">
		apiKey: z.ZodString
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "gemini"
		apiKey: string
		apiBase?: string | undefined
	},
	{
		provider: "gemini"
		apiKey: string
		apiBase?: string | undefined
	}
>
export type GeminiConfig = z.infer<typeof _GeminiConfigSchema>
declare const _AnthropicConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"anthropic">
		apiKey: z.ZodString
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "anthropic"
		apiKey: string
		apiBase?: string | undefined
	},
	{
		provider: "anthropic"
		apiKey: string
		apiBase?: string | undefined
	}
>
export type AnthropicConfig = z.infer<typeof _AnthropicConfigSchema>
declare const _WatsonXConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"watsonx">
		apiKey: z.ZodString
		env: z.ZodObject<
			{
				apiVersion: z.ZodOptional<z.ZodString>
				projectId: z.ZodOptional<z.ZodString>
				deploymentId: z.ZodOptional<z.ZodString>
			},
			"strip",
			z.ZodTypeAny,
			{
				projectId?: string | undefined
				apiVersion?: string | undefined
				deploymentId?: string | undefined
			},
			{
				projectId?: string | undefined
				apiVersion?: string | undefined
				deploymentId?: string | undefined
			}
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "watsonx"
		apiKey: string
		env: {
			projectId?: string | undefined
			apiVersion?: string | undefined
			deploymentId?: string | undefined
		}
		apiBase?: string | undefined
	},
	{
		provider: "watsonx"
		apiKey: string
		env: {
			projectId?: string | undefined
			apiVersion?: string | undefined
			deploymentId?: string | undefined
		}
		apiBase?: string | undefined
	}
>
export type WatsonXConfig = z.infer<typeof _WatsonXConfigSchema>
declare const _JinaConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"jina">
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "jina"
		apiKey?: string | undefined
		apiBase?: string | undefined
	},
	{
		provider: "jina"
		apiKey?: string | undefined
		apiBase?: string | undefined
	}
>
export type JinaConfig = z.infer<typeof _JinaConfigSchema>
declare const _InceptionConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"inception">
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "inception"
		apiKey?: string | undefined
		apiBase?: string | undefined
	},
	{
		provider: "inception"
		apiKey?: string | undefined
		apiBase?: string | undefined
	}
>
export type InceptionConfig = z.infer<typeof _InceptionConfigSchema>
declare const _VertexAIConfigSchema: z.ZodObject<
	{
		apiBase: z.ZodOptional<z.ZodString>
		apiKey: z.ZodOptional<z.ZodString>
	} & {
		provider: z.ZodLiteral<"vertexai">
		env: z.ZodOptional<
			z.ZodObject<
				{
					region: z.ZodOptional<z.ZodString>
					projectId: z.ZodOptional<z.ZodString>
					keyFile: z.ZodOptional<z.ZodString>
					keyJson: z.ZodOptional<z.ZodString>
				},
				"strip",
				z.ZodTypeAny,
				{
					keyFile?: string | undefined
					projectId?: string | undefined
					region?: string | undefined
					keyJson?: string | undefined
				},
				{
					keyFile?: string | undefined
					projectId?: string | undefined
					region?: string | undefined
					keyJson?: string | undefined
				}
			>
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		provider: "vertexai"
		apiKey?: string | undefined
		env?:
			| {
					keyFile?: string | undefined
					projectId?: string | undefined
					region?: string | undefined
					keyJson?: string | undefined
			  }
			| undefined
		apiBase?: string | undefined
	},
	{
		provider: "vertexai"
		apiKey?: string | undefined
		env?:
			| {
					keyFile?: string | undefined
					projectId?: string | undefined
					region?: string | undefined
					keyJson?: string | undefined
			  }
			| undefined
		apiBase?: string | undefined
	}
>
export type VertexAIConfig = z.infer<typeof _VertexAIConfigSchema>
export type LLMConfig =
	| OpenAIConfig
	| BedrockConfig
	| MoonshotConfig
	| DeepseekConfig
	| CohereConfig
	| z.infer<typeof AzureConfigSchema>
	| GeminiConfig
	| AnthropicConfig
	| WatsonXConfig
	| JinaConfig
	| z.infer<typeof _MockConfigSchema>
	| InceptionConfig
	| VertexAIConfig
	| LlamastackConfig
	| z.infer<typeof ContinueProxyConfigSchema>
	| CometAPIConfig
export {}
//# sourceMappingURL=types.d.ts.map
