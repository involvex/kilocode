import { z } from "zod"
/**
 * TelemetrySetting
 */
export declare const telemetrySettings: readonly ["unset", "enabled", "disabled"]
export declare const telemetrySettingsSchema: z.ZodEnum<["unset", "enabled", "disabled"]>
export type TelemetrySetting = z.infer<typeof telemetrySettingsSchema>
/**
 * TelemetryEventName
 */
export declare enum TelemetryEventName {
	COMMIT_MSG_GENERATED = "Commit Message Generated",
	INLINE_ASSIST_QUICK_TASK = "Inline Assist Quick Task",
	INLINE_ASSIST_AUTO_TASK = "Inline Assist Auto Task",
	INLINE_ASSIST_ACCEPT_SUGGESTION = "Inline Assist Accept Suggestion",
	INLINE_ASSIST_REJECT_SUGGESTION = "Inline Assist Reject Suggestion",
	CHECKPOINT_FAILURE = "Checkpoint Failure",
	TOOL_ERROR = "Tool Error",
	MAX_COMPLETION_TOKENS_REACHED_ERROR = "Max Completion Tokens Reached Error",
	NOTIFICATION_CLICKED = "Notification Clicked",
	WEBVIEW_MEMORY_USAGE = "Webview Memory Usage",
	MEMORY_WARNING_SHOWN = "Memory Warning Shown",
	FREE_MODELS_LINK_CLICKED = "Free Models Link Clicked",
	CREATE_ORGANIZATION_LINK_CLICKED = "Create Organization Link Clicked",
	SUGGESTION_BUTTON_CLICKED = "Suggestion Button Clicked",
	NO_ASSISTANT_MESSAGES = "No Assistant Messages",
	AUTO_PURGE_STARTED = "Auto Purge Started",
	AUTO_PURGE_COMPLETED = "Auto Purge Completed",
	AUTO_PURGE_FAILED = "Auto Purge Failed",
	MANUAL_PURGE_TRIGGERED = "Manual Purge Triggered",
	GHOST_SERVICE_DISABLED = "Ghost Service Disabled",
	ASK_APPROVAL = "Ask Approval",
	TASK_CREATED = "Task Created",
	TASK_RESTARTED = "Task Reopened",
	TASK_COMPLETED = "Task Completed",
	TASK_MESSAGE = "Task Message",
	TASK_CONVERSATION_MESSAGE = "Conversation Message",
	LLM_COMPLETION = "LLM Completion",
	MODE_SWITCH = "Mode Switched",
	MODE_SELECTOR_OPENED = "Mode Selector Opened",
	TOOL_USED = "Tool Used",
	CHECKPOINT_CREATED = "Checkpoint Created",
	CHECKPOINT_RESTORED = "Checkpoint Restored",
	CHECKPOINT_DIFFED = "Checkpoint Diffed",
	TAB_SHOWN = "Tab Shown",
	MODE_SETTINGS_CHANGED = "Mode Setting Changed",
	CUSTOM_MODE_CREATED = "Custom Mode Created",
	CONTEXT_CONDENSED = "Context Condensed",
	SLIDING_WINDOW_TRUNCATION = "Sliding Window Truncation",
	CODE_ACTION_USED = "Code Action Used",
	PROMPT_ENHANCED = "Prompt Enhanced",
	TITLE_BUTTON_CLICKED = "Title Button Clicked",
	AUTHENTICATION_INITIATED = "Authentication Initiated",
	MARKETPLACE_ITEM_INSTALLED = "Marketplace Item Installed",
	MARKETPLACE_ITEM_REMOVED = "Marketplace Item Removed",
	MARKETPLACE_TAB_VIEWED = "Marketplace Tab Viewed",
	MARKETPLACE_INSTALL_BUTTON_CLICKED = "Marketplace Install Button Clicked",
	SHARE_BUTTON_CLICKED = "Share Button Clicked",
	SHARE_ORGANIZATION_CLICKED = "Share Organization Clicked",
	SHARE_PUBLIC_CLICKED = "Share Public Clicked",
	SHARE_CONNECT_TO_CLOUD_CLICKED = "Share Connect To Cloud Clicked",
	ACCOUNT_CONNECT_CLICKED = "Account Connect Clicked",
	ACCOUNT_CONNECT_SUCCESS = "Account Connect Success",
	ACCOUNT_LOGOUT_CLICKED = "Account Logout Clicked",
	ACCOUNT_LOGOUT_SUCCESS = "Account Logout Success",
	FEATURED_PROVIDER_CLICKED = "Featured Provider Clicked",
	UPSELL_DISMISSED = "Upsell Dismissed",
	UPSELL_CLICKED = "Upsell Clicked",
	SCHEMA_VALIDATION_ERROR = "Schema Validation Error",
	DIFF_APPLICATION_ERROR = "Diff Application Error",
	SHELL_INTEGRATION_ERROR = "Shell Integration Error",
	CONSECUTIVE_MISTAKE_ERROR = "Consecutive Mistake Error",
	CODE_INDEX_ERROR = "Code Index Error",
	TELEMETRY_SETTINGS_CHANGED = "Telemetry Settings Changed",
}
/**
 * TelemetryProperties
 */
export declare const staticAppPropertiesSchema: z.ZodObject<
	{
		appName: z.ZodString
		appVersion: z.ZodString
		vscodeVersion: z.ZodString
		platform: z.ZodString
		editorName: z.ZodString
		wrapped: z.ZodBoolean
		wrapper: z.ZodNullable<z.ZodString>
		wrapperTitle: z.ZodNullable<z.ZodString>
		wrapperCode: z.ZodNullable<z.ZodString>
		wrapperVersion: z.ZodNullable<z.ZodString>
		hostname: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
		appName: string
		appVersion: string
		vscodeVersion: string
		platform: string
		editorName: string
		wrapped: boolean
		wrapper: string | null
		wrapperTitle: string | null
		wrapperCode: string | null
		wrapperVersion: string | null
		hostname?: string | undefined
	},
	{
		appName: string
		appVersion: string
		vscodeVersion: string
		platform: string
		editorName: string
		wrapped: boolean
		wrapper: string | null
		wrapperTitle: string | null
		wrapperCode: string | null
		wrapperVersion: string | null
		hostname?: string | undefined
	}
>
export type StaticAppProperties = z.infer<typeof staticAppPropertiesSchema>
export declare const dynamicAppPropertiesSchema: z.ZodObject<
	{
		language: z.ZodString
		mode: z.ZodString
	},
	"strip",
	z.ZodTypeAny,
	{
		language: string
		mode: string
	},
	{
		language: string
		mode: string
	}
>
export type DynamicAppProperties = z.infer<typeof dynamicAppPropertiesSchema>
export declare const cloudAppPropertiesSchema: z.ZodObject<
	{
		cloudIsAuthenticated: z.ZodOptional<z.ZodBoolean>
	},
	"strip",
	z.ZodTypeAny,
	{
		cloudIsAuthenticated?: boolean | undefined
	},
	{
		cloudIsAuthenticated?: boolean | undefined
	}
>
export type CloudAppProperties = z.infer<typeof cloudAppPropertiesSchema>
export declare const appPropertiesSchema: z.ZodObject<
	{
		cloudIsAuthenticated: z.ZodOptional<z.ZodBoolean>
		language: z.ZodString
		mode: z.ZodString
		appName: z.ZodString
		appVersion: z.ZodString
		vscodeVersion: z.ZodString
		platform: z.ZodString
		editorName: z.ZodString
		wrapped: z.ZodBoolean
		wrapper: z.ZodNullable<z.ZodString>
		wrapperTitle: z.ZodNullable<z.ZodString>
		wrapperCode: z.ZodNullable<z.ZodString>
		wrapperVersion: z.ZodNullable<z.ZodString>
		hostname: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
		language: string
		mode: string
		appName: string
		appVersion: string
		vscodeVersion: string
		platform: string
		editorName: string
		wrapped: boolean
		wrapper: string | null
		wrapperTitle: string | null
		wrapperCode: string | null
		wrapperVersion: string | null
		hostname?: string | undefined
		cloudIsAuthenticated?: boolean | undefined
	},
	{
		language: string
		mode: string
		appName: string
		appVersion: string
		vscodeVersion: string
		platform: string
		editorName: string
		wrapped: boolean
		wrapper: string | null
		wrapperTitle: string | null
		wrapperCode: string | null
		wrapperVersion: string | null
		hostname?: string | undefined
		cloudIsAuthenticated?: boolean | undefined
	}
>
export type AppProperties = z.infer<typeof appPropertiesSchema>
export declare const taskPropertiesSchema: z.ZodObject<
	{
		taskId: z.ZodOptional<z.ZodString>
		parentTaskId: z.ZodOptional<z.ZodString>
		apiProvider: z.ZodOptional<
			z.ZodEnum<
				[
					"openrouter",
					"vercel-ai-gateway",
					"huggingface",
					"litellm",
					"kilocode",
					"ovhcloud",
					"gemini",
					"inception",
					"synthetic",
					"sap-ai-core",
					"deepinfra",
					"io-intelligence",
					"requesty",
					"unbound",
					"glama",
					"roo",
					"chutes",
					"nano-gpt",
					"ollama",
					"lmstudio",
					"vscode-lm",
					"openai",
					"fake-ai",
					"human-relay",
					"anthropic",
					"bedrock",
					"cerebras",
					"claude-code",
					"doubao",
					"deepseek",
					"featherless",
					"fireworks",
					"gemini",
					"gemini-cli",
					"groq",
					"mistral",
					"moonshot",
					"minimax",
					"openai-native",
					"qwen-code",
					"roo",
					"kilocode",
					"minimax",
					"gemini-cli",
					"virtual-quota-fallback",
					"synthetic",
					"inception",
					"sambanova",
					"vertex",
					"xai",
					"zai",
				]
			>
		>
		modelId: z.ZodOptional<z.ZodString>
		diffStrategy: z.ZodOptional<z.ZodString>
		isSubtask: z.ZodOptional<z.ZodBoolean>
		todos: z.ZodOptional<
			z.ZodObject<
				{
					total: z.ZodNumber
					completed: z.ZodNumber
					inProgress: z.ZodNumber
					pending: z.ZodNumber
				},
				"strip",
				z.ZodTypeAny,
				{
					total: number
					completed: number
					inProgress: number
					pending: number
				},
				{
					total: number
					completed: number
					inProgress: number
					pending: number
				}
			>
		>
		currentTaskSize: z.ZodOptional<z.ZodNumber>
		taskHistorySize: z.ZodOptional<z.ZodNumber>
		toolStyle: z.ZodOptional<z.ZodEnum<["xml", "native"]>>
	},
	"strip",
	z.ZodTypeAny,
	{
		isSubtask?: boolean | undefined
		taskId?: string | undefined
		apiProvider?:
			| "kilocode"
			| "openrouter"
			| "openai"
			| "anthropic"
			| "ollama"
			| "gemini"
			| "mistral"
			| "vercel-ai-gateway"
			| "huggingface"
			| "litellm"
			| "ovhcloud"
			| "inception"
			| "synthetic"
			| "sap-ai-core"
			| "deepinfra"
			| "io-intelligence"
			| "requesty"
			| "unbound"
			| "glama"
			| "roo"
			| "chutes"
			| "nano-gpt"
			| "lmstudio"
			| "vscode-lm"
			| "fake-ai"
			| "human-relay"
			| "bedrock"
			| "cerebras"
			| "claude-code"
			| "doubao"
			| "deepseek"
			| "featherless"
			| "fireworks"
			| "gemini-cli"
			| "groq"
			| "moonshot"
			| "minimax"
			| "openai-native"
			| "qwen-code"
			| "virtual-quota-fallback"
			| "sambanova"
			| "vertex"
			| "xai"
			| "zai"
			| undefined
		modelId?: string | undefined
		toolStyle?: "xml" | "native" | undefined
		parentTaskId?: string | undefined
		diffStrategy?: string | undefined
		todos?:
			| {
					total: number
					completed: number
					inProgress: number
					pending: number
			  }
			| undefined
		currentTaskSize?: number | undefined
		taskHistorySize?: number | undefined
	},
	{
		isSubtask?: boolean | undefined
		taskId?: string | undefined
		apiProvider?:
			| "kilocode"
			| "openrouter"
			| "openai"
			| "anthropic"
			| "ollama"
			| "gemini"
			| "mistral"
			| "vercel-ai-gateway"
			| "huggingface"
			| "litellm"
			| "ovhcloud"
			| "inception"
			| "synthetic"
			| "sap-ai-core"
			| "deepinfra"
			| "io-intelligence"
			| "requesty"
			| "unbound"
			| "glama"
			| "roo"
			| "chutes"
			| "nano-gpt"
			| "lmstudio"
			| "vscode-lm"
			| "fake-ai"
			| "human-relay"
			| "bedrock"
			| "cerebras"
			| "claude-code"
			| "doubao"
			| "deepseek"
			| "featherless"
			| "fireworks"
			| "gemini-cli"
			| "groq"
			| "moonshot"
			| "minimax"
			| "openai-native"
			| "qwen-code"
			| "virtual-quota-fallback"
			| "sambanova"
			| "vertex"
			| "xai"
			| "zai"
			| undefined
		modelId?: string | undefined
		toolStyle?: "xml" | "native" | undefined
		parentTaskId?: string | undefined
		diffStrategy?: string | undefined
		todos?:
			| {
					total: number
					completed: number
					inProgress: number
					pending: number
			  }
			| undefined
		currentTaskSize?: number | undefined
		taskHistorySize?: number | undefined
	}
>
export type TaskProperties = z.infer<typeof taskPropertiesSchema>
export declare const gitPropertiesSchema: z.ZodObject<
	{
		repositoryUrl: z.ZodOptional<z.ZodString>
		repositoryName: z.ZodOptional<z.ZodString>
		defaultBranch: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
		repositoryUrl?: string | undefined
		repositoryName?: string | undefined
		defaultBranch?: string | undefined
	},
	{
		repositoryUrl?: string | undefined
		repositoryName?: string | undefined
		defaultBranch?: string | undefined
	}
>
export type GitProperties = z.infer<typeof gitPropertiesSchema>
export declare const telemetryPropertiesSchema: z.ZodObject<
	{
		repositoryUrl: z.ZodOptional<z.ZodString>
		repositoryName: z.ZodOptional<z.ZodString>
		defaultBranch: z.ZodOptional<z.ZodString>
		taskId: z.ZodOptional<z.ZodString>
		parentTaskId: z.ZodOptional<z.ZodString>
		apiProvider: z.ZodOptional<
			z.ZodEnum<
				[
					"openrouter",
					"vercel-ai-gateway",
					"huggingface",
					"litellm",
					"kilocode",
					"ovhcloud",
					"gemini",
					"inception",
					"synthetic",
					"sap-ai-core",
					"deepinfra",
					"io-intelligence",
					"requesty",
					"unbound",
					"glama",
					"roo",
					"chutes",
					"nano-gpt",
					"ollama",
					"lmstudio",
					"vscode-lm",
					"openai",
					"fake-ai",
					"human-relay",
					"anthropic",
					"bedrock",
					"cerebras",
					"claude-code",
					"doubao",
					"deepseek",
					"featherless",
					"fireworks",
					"gemini",
					"gemini-cli",
					"groq",
					"mistral",
					"moonshot",
					"minimax",
					"openai-native",
					"qwen-code",
					"roo",
					"kilocode",
					"minimax",
					"gemini-cli",
					"virtual-quota-fallback",
					"synthetic",
					"inception",
					"sambanova",
					"vertex",
					"xai",
					"zai",
				]
			>
		>
		modelId: z.ZodOptional<z.ZodString>
		diffStrategy: z.ZodOptional<z.ZodString>
		isSubtask: z.ZodOptional<z.ZodBoolean>
		todos: z.ZodOptional<
			z.ZodObject<
				{
					total: z.ZodNumber
					completed: z.ZodNumber
					inProgress: z.ZodNumber
					pending: z.ZodNumber
				},
				"strip",
				z.ZodTypeAny,
				{
					total: number
					completed: number
					inProgress: number
					pending: number
				},
				{
					total: number
					completed: number
					inProgress: number
					pending: number
				}
			>
		>
		currentTaskSize: z.ZodOptional<z.ZodNumber>
		taskHistorySize: z.ZodOptional<z.ZodNumber>
		toolStyle: z.ZodOptional<z.ZodEnum<["xml", "native"]>>
		cloudIsAuthenticated: z.ZodOptional<z.ZodBoolean>
		language: z.ZodString
		mode: z.ZodString
		appName: z.ZodString
		appVersion: z.ZodString
		vscodeVersion: z.ZodString
		platform: z.ZodString
		editorName: z.ZodString
		wrapped: z.ZodBoolean
		wrapper: z.ZodNullable<z.ZodString>
		wrapperTitle: z.ZodNullable<z.ZodString>
		wrapperCode: z.ZodNullable<z.ZodString>
		wrapperVersion: z.ZodNullable<z.ZodString>
		hostname: z.ZodOptional<z.ZodString>
	},
	"strip",
	z.ZodTypeAny,
	{
		language: string
		mode: string
		appName: string
		appVersion: string
		vscodeVersion: string
		platform: string
		editorName: string
		wrapped: boolean
		wrapper: string | null
		wrapperTitle: string | null
		wrapperCode: string | null
		wrapperVersion: string | null
		isSubtask?: boolean | undefined
		taskId?: string | undefined
		apiProvider?:
			| "kilocode"
			| "openrouter"
			| "openai"
			| "anthropic"
			| "ollama"
			| "gemini"
			| "mistral"
			| "vercel-ai-gateway"
			| "huggingface"
			| "litellm"
			| "ovhcloud"
			| "inception"
			| "synthetic"
			| "sap-ai-core"
			| "deepinfra"
			| "io-intelligence"
			| "requesty"
			| "unbound"
			| "glama"
			| "roo"
			| "chutes"
			| "nano-gpt"
			| "lmstudio"
			| "vscode-lm"
			| "fake-ai"
			| "human-relay"
			| "bedrock"
			| "cerebras"
			| "claude-code"
			| "doubao"
			| "deepseek"
			| "featherless"
			| "fireworks"
			| "gemini-cli"
			| "groq"
			| "moonshot"
			| "minimax"
			| "openai-native"
			| "qwen-code"
			| "virtual-quota-fallback"
			| "sambanova"
			| "vertex"
			| "xai"
			| "zai"
			| undefined
		modelId?: string | undefined
		toolStyle?: "xml" | "native" | undefined
		parentTaskId?: string | undefined
		hostname?: string | undefined
		cloudIsAuthenticated?: boolean | undefined
		diffStrategy?: string | undefined
		todos?:
			| {
					total: number
					completed: number
					inProgress: number
					pending: number
			  }
			| undefined
		currentTaskSize?: number | undefined
		taskHistorySize?: number | undefined
		repositoryUrl?: string | undefined
		repositoryName?: string | undefined
		defaultBranch?: string | undefined
	},
	{
		language: string
		mode: string
		appName: string
		appVersion: string
		vscodeVersion: string
		platform: string
		editorName: string
		wrapped: boolean
		wrapper: string | null
		wrapperTitle: string | null
		wrapperCode: string | null
		wrapperVersion: string | null
		isSubtask?: boolean | undefined
		taskId?: string | undefined
		apiProvider?:
			| "kilocode"
			| "openrouter"
			| "openai"
			| "anthropic"
			| "ollama"
			| "gemini"
			| "mistral"
			| "vercel-ai-gateway"
			| "huggingface"
			| "litellm"
			| "ovhcloud"
			| "inception"
			| "synthetic"
			| "sap-ai-core"
			| "deepinfra"
			| "io-intelligence"
			| "requesty"
			| "unbound"
			| "glama"
			| "roo"
			| "chutes"
			| "nano-gpt"
			| "lmstudio"
			| "vscode-lm"
			| "fake-ai"
			| "human-relay"
			| "bedrock"
			| "cerebras"
			| "claude-code"
			| "doubao"
			| "deepseek"
			| "featherless"
			| "fireworks"
			| "gemini-cli"
			| "groq"
			| "moonshot"
			| "minimax"
			| "openai-native"
			| "qwen-code"
			| "virtual-quota-fallback"
			| "sambanova"
			| "vertex"
			| "xai"
			| "zai"
			| undefined
		modelId?: string | undefined
		toolStyle?: "xml" | "native" | undefined
		parentTaskId?: string | undefined
		hostname?: string | undefined
		cloudIsAuthenticated?: boolean | undefined
		diffStrategy?: string | undefined
		todos?:
			| {
					total: number
					completed: number
					inProgress: number
					pending: number
			  }
			| undefined
		currentTaskSize?: number | undefined
		taskHistorySize?: number | undefined
		repositoryUrl?: string | undefined
		repositoryName?: string | undefined
		defaultBranch?: string | undefined
	}
>
export type TelemetryProperties = z.infer<typeof telemetryPropertiesSchema>
/**
 * TelemetryEvent
 */
export type TelemetryEvent = {
	event: TelemetryEventName
	properties?: Record<string, any>
}
/**
 * RooCodeTelemetryEvent
 */
export declare const rooCodeTelemetryEventSchema: z.ZodDiscriminatedUnion<
	"type",
	[
		z.ZodObject<
			{
				type: z.ZodEnum<
					[
						TelemetryEventName.COMMIT_MSG_GENERATED,
						TelemetryEventName.INLINE_ASSIST_QUICK_TASK,
						TelemetryEventName.INLINE_ASSIST_AUTO_TASK,
						TelemetryEventName.INLINE_ASSIST_ACCEPT_SUGGESTION,
						TelemetryEventName.INLINE_ASSIST_REJECT_SUGGESTION,
						TelemetryEventName.WEBVIEW_MEMORY_USAGE,
						TelemetryEventName.AUTO_PURGE_STARTED,
						TelemetryEventName.AUTO_PURGE_COMPLETED,
						TelemetryEventName.AUTO_PURGE_FAILED,
						TelemetryEventName.MANUAL_PURGE_TRIGGERED,
						TelemetryEventName.GHOST_SERVICE_DISABLED,
						TelemetryEventName.TASK_CREATED,
						TelemetryEventName.TASK_RESTARTED,
						TelemetryEventName.TASK_COMPLETED,
						TelemetryEventName.TASK_CONVERSATION_MESSAGE,
						TelemetryEventName.MODE_SWITCH,
						TelemetryEventName.MODE_SELECTOR_OPENED,
						TelemetryEventName.TOOL_USED,
						TelemetryEventName.CHECKPOINT_CREATED,
						TelemetryEventName.CHECKPOINT_RESTORED,
						TelemetryEventName.CHECKPOINT_DIFFED,
						TelemetryEventName.CODE_ACTION_USED,
						TelemetryEventName.PROMPT_ENHANCED,
						TelemetryEventName.TITLE_BUTTON_CLICKED,
						TelemetryEventName.AUTHENTICATION_INITIATED,
						TelemetryEventName.MARKETPLACE_ITEM_INSTALLED,
						TelemetryEventName.MARKETPLACE_ITEM_REMOVED,
						TelemetryEventName.MARKETPLACE_TAB_VIEWED,
						TelemetryEventName.MARKETPLACE_INSTALL_BUTTON_CLICKED,
						TelemetryEventName.SHARE_BUTTON_CLICKED,
						TelemetryEventName.SHARE_ORGANIZATION_CLICKED,
						TelemetryEventName.SHARE_PUBLIC_CLICKED,
						TelemetryEventName.SHARE_CONNECT_TO_CLOUD_CLICKED,
						TelemetryEventName.ACCOUNT_CONNECT_CLICKED,
						TelemetryEventName.ACCOUNT_CONNECT_SUCCESS,
						TelemetryEventName.ACCOUNT_LOGOUT_CLICKED,
						TelemetryEventName.ACCOUNT_LOGOUT_SUCCESS,
						TelemetryEventName.FEATURED_PROVIDER_CLICKED,
						TelemetryEventName.UPSELL_DISMISSED,
						TelemetryEventName.UPSELL_CLICKED,
						TelemetryEventName.SCHEMA_VALIDATION_ERROR,
						TelemetryEventName.DIFF_APPLICATION_ERROR,
						TelemetryEventName.SHELL_INTEGRATION_ERROR,
						TelemetryEventName.CONSECUTIVE_MISTAKE_ERROR,
						TelemetryEventName.CODE_INDEX_ERROR,
						TelemetryEventName.CONTEXT_CONDENSED,
						TelemetryEventName.SLIDING_WINDOW_TRUNCATION,
						TelemetryEventName.TAB_SHOWN,
						TelemetryEventName.MODE_SETTINGS_CHANGED,
						TelemetryEventName.CUSTOM_MODE_CREATED,
					]
				>
				properties: z.ZodObject<
					{
						repositoryUrl: z.ZodOptional<z.ZodString>
						repositoryName: z.ZodOptional<z.ZodString>
						defaultBranch: z.ZodOptional<z.ZodString>
						taskId: z.ZodOptional<z.ZodString>
						parentTaskId: z.ZodOptional<z.ZodString>
						apiProvider: z.ZodOptional<
							z.ZodEnum<
								[
									"openrouter",
									"vercel-ai-gateway",
									"huggingface",
									"litellm",
									"kilocode",
									"ovhcloud",
									"gemini",
									"inception",
									"synthetic",
									"sap-ai-core",
									"deepinfra",
									"io-intelligence",
									"requesty",
									"unbound",
									"glama",
									"roo",
									"chutes",
									"nano-gpt",
									"ollama",
									"lmstudio",
									"vscode-lm",
									"openai",
									"fake-ai",
									"human-relay",
									"anthropic",
									"bedrock",
									"cerebras",
									"claude-code",
									"doubao",
									"deepseek",
									"featherless",
									"fireworks",
									"gemini",
									"gemini-cli",
									"groq",
									"mistral",
									"moonshot",
									"minimax",
									"openai-native",
									"qwen-code",
									"roo",
									"kilocode",
									"minimax",
									"gemini-cli",
									"virtual-quota-fallback",
									"synthetic",
									"inception",
									"sambanova",
									"vertex",
									"xai",
									"zai",
								]
							>
						>
						modelId: z.ZodOptional<z.ZodString>
						diffStrategy: z.ZodOptional<z.ZodString>
						isSubtask: z.ZodOptional<z.ZodBoolean>
						todos: z.ZodOptional<
							z.ZodObject<
								{
									total: z.ZodNumber
									completed: z.ZodNumber
									inProgress: z.ZodNumber
									pending: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									total: number
									completed: number
									inProgress: number
									pending: number
								},
								{
									total: number
									completed: number
									inProgress: number
									pending: number
								}
							>
						>
						currentTaskSize: z.ZodOptional<z.ZodNumber>
						taskHistorySize: z.ZodOptional<z.ZodNumber>
						toolStyle: z.ZodOptional<z.ZodEnum<["xml", "native"]>>
						cloudIsAuthenticated: z.ZodOptional<z.ZodBoolean>
						language: z.ZodString
						mode: z.ZodString
						appName: z.ZodString
						appVersion: z.ZodString
						vscodeVersion: z.ZodString
						platform: z.ZodString
						editorName: z.ZodString
						wrapped: z.ZodBoolean
						wrapper: z.ZodNullable<z.ZodString>
						wrapperTitle: z.ZodNullable<z.ZodString>
						wrapperCode: z.ZodNullable<z.ZodString>
						wrapperVersion: z.ZodNullable<z.ZodString>
						hostname: z.ZodOptional<z.ZodString>
					},
					"strip",
					z.ZodTypeAny,
					{
						language: string
						mode: string
						appName: string
						appVersion: string
						vscodeVersion: string
						platform: string
						editorName: string
						wrapped: boolean
						wrapper: string | null
						wrapperTitle: string | null
						wrapperCode: string | null
						wrapperVersion: string | null
						isSubtask?: boolean | undefined
						taskId?: string | undefined
						apiProvider?:
							| "kilocode"
							| "openrouter"
							| "openai"
							| "anthropic"
							| "ollama"
							| "gemini"
							| "mistral"
							| "vercel-ai-gateway"
							| "huggingface"
							| "litellm"
							| "ovhcloud"
							| "inception"
							| "synthetic"
							| "sap-ai-core"
							| "deepinfra"
							| "io-intelligence"
							| "requesty"
							| "unbound"
							| "glama"
							| "roo"
							| "chutes"
							| "nano-gpt"
							| "lmstudio"
							| "vscode-lm"
							| "fake-ai"
							| "human-relay"
							| "bedrock"
							| "cerebras"
							| "claude-code"
							| "doubao"
							| "deepseek"
							| "featherless"
							| "fireworks"
							| "gemini-cli"
							| "groq"
							| "moonshot"
							| "minimax"
							| "openai-native"
							| "qwen-code"
							| "virtual-quota-fallback"
							| "sambanova"
							| "vertex"
							| "xai"
							| "zai"
							| undefined
						modelId?: string | undefined
						toolStyle?: "xml" | "native" | undefined
						parentTaskId?: string | undefined
						hostname?: string | undefined
						cloudIsAuthenticated?: boolean | undefined
						diffStrategy?: string | undefined
						todos?:
							| {
									total: number
									completed: number
									inProgress: number
									pending: number
							  }
							| undefined
						currentTaskSize?: number | undefined
						taskHistorySize?: number | undefined
						repositoryUrl?: string | undefined
						repositoryName?: string | undefined
						defaultBranch?: string | undefined
					},
					{
						language: string
						mode: string
						appName: string
						appVersion: string
						vscodeVersion: string
						platform: string
						editorName: string
						wrapped: boolean
						wrapper: string | null
						wrapperTitle: string | null
						wrapperCode: string | null
						wrapperVersion: string | null
						isSubtask?: boolean | undefined
						taskId?: string | undefined
						apiProvider?:
							| "kilocode"
							| "openrouter"
							| "openai"
							| "anthropic"
							| "ollama"
							| "gemini"
							| "mistral"
							| "vercel-ai-gateway"
							| "huggingface"
							| "litellm"
							| "ovhcloud"
							| "inception"
							| "synthetic"
							| "sap-ai-core"
							| "deepinfra"
							| "io-intelligence"
							| "requesty"
							| "unbound"
							| "glama"
							| "roo"
							| "chutes"
							| "nano-gpt"
							| "lmstudio"
							| "vscode-lm"
							| "fake-ai"
							| "human-relay"
							| "bedrock"
							| "cerebras"
							| "claude-code"
							| "doubao"
							| "deepseek"
							| "featherless"
							| "fireworks"
							| "gemini-cli"
							| "groq"
							| "moonshot"
							| "minimax"
							| "openai-native"
							| "qwen-code"
							| "virtual-quota-fallback"
							| "sambanova"
							| "vertex"
							| "xai"
							| "zai"
							| undefined
						modelId?: string | undefined
						toolStyle?: "xml" | "native" | undefined
						parentTaskId?: string | undefined
						hostname?: string | undefined
						cloudIsAuthenticated?: boolean | undefined
						diffStrategy?: string | undefined
						todos?:
							| {
									total: number
									completed: number
									inProgress: number
									pending: number
							  }
							| undefined
						currentTaskSize?: number | undefined
						taskHistorySize?: number | undefined
						repositoryUrl?: string | undefined
						repositoryName?: string | undefined
						defaultBranch?: string | undefined
					}
				>
			},
			"strip",
			z.ZodTypeAny,
			{
				type:
					| TelemetryEventName.COMMIT_MSG_GENERATED
					| TelemetryEventName.INLINE_ASSIST_QUICK_TASK
					| TelemetryEventName.INLINE_ASSIST_AUTO_TASK
					| TelemetryEventName.INLINE_ASSIST_ACCEPT_SUGGESTION
					| TelemetryEventName.INLINE_ASSIST_REJECT_SUGGESTION
					| TelemetryEventName.WEBVIEW_MEMORY_USAGE
					| TelemetryEventName.AUTO_PURGE_STARTED
					| TelemetryEventName.AUTO_PURGE_COMPLETED
					| TelemetryEventName.AUTO_PURGE_FAILED
					| TelemetryEventName.MANUAL_PURGE_TRIGGERED
					| TelemetryEventName.GHOST_SERVICE_DISABLED
					| TelemetryEventName.TASK_CREATED
					| TelemetryEventName.TASK_RESTARTED
					| TelemetryEventName.TASK_COMPLETED
					| TelemetryEventName.TASK_CONVERSATION_MESSAGE
					| TelemetryEventName.MODE_SWITCH
					| TelemetryEventName.MODE_SELECTOR_OPENED
					| TelemetryEventName.TOOL_USED
					| TelemetryEventName.CHECKPOINT_CREATED
					| TelemetryEventName.CHECKPOINT_RESTORED
					| TelemetryEventName.CHECKPOINT_DIFFED
					| TelemetryEventName.TAB_SHOWN
					| TelemetryEventName.MODE_SETTINGS_CHANGED
					| TelemetryEventName.CUSTOM_MODE_CREATED
					| TelemetryEventName.CONTEXT_CONDENSED
					| TelemetryEventName.SLIDING_WINDOW_TRUNCATION
					| TelemetryEventName.CODE_ACTION_USED
					| TelemetryEventName.PROMPT_ENHANCED
					| TelemetryEventName.TITLE_BUTTON_CLICKED
					| TelemetryEventName.AUTHENTICATION_INITIATED
					| TelemetryEventName.MARKETPLACE_ITEM_INSTALLED
					| TelemetryEventName.MARKETPLACE_ITEM_REMOVED
					| TelemetryEventName.MARKETPLACE_TAB_VIEWED
					| TelemetryEventName.MARKETPLACE_INSTALL_BUTTON_CLICKED
					| TelemetryEventName.SHARE_BUTTON_CLICKED
					| TelemetryEventName.SHARE_ORGANIZATION_CLICKED
					| TelemetryEventName.SHARE_PUBLIC_CLICKED
					| TelemetryEventName.SHARE_CONNECT_TO_CLOUD_CLICKED
					| TelemetryEventName.ACCOUNT_CONNECT_CLICKED
					| TelemetryEventName.ACCOUNT_CONNECT_SUCCESS
					| TelemetryEventName.ACCOUNT_LOGOUT_CLICKED
					| TelemetryEventName.ACCOUNT_LOGOUT_SUCCESS
					| TelemetryEventName.FEATURED_PROVIDER_CLICKED
					| TelemetryEventName.UPSELL_DISMISSED
					| TelemetryEventName.UPSELL_CLICKED
					| TelemetryEventName.SCHEMA_VALIDATION_ERROR
					| TelemetryEventName.DIFF_APPLICATION_ERROR
					| TelemetryEventName.SHELL_INTEGRATION_ERROR
					| TelemetryEventName.CONSECUTIVE_MISTAKE_ERROR
					| TelemetryEventName.CODE_INDEX_ERROR
				properties: {
					language: string
					mode: string
					appName: string
					appVersion: string
					vscodeVersion: string
					platform: string
					editorName: string
					wrapped: boolean
					wrapper: string | null
					wrapperTitle: string | null
					wrapperCode: string | null
					wrapperVersion: string | null
					isSubtask?: boolean | undefined
					taskId?: string | undefined
					apiProvider?:
						| "kilocode"
						| "openrouter"
						| "openai"
						| "anthropic"
						| "ollama"
						| "gemini"
						| "mistral"
						| "vercel-ai-gateway"
						| "huggingface"
						| "litellm"
						| "ovhcloud"
						| "inception"
						| "synthetic"
						| "sap-ai-core"
						| "deepinfra"
						| "io-intelligence"
						| "requesty"
						| "unbound"
						| "glama"
						| "roo"
						| "chutes"
						| "nano-gpt"
						| "lmstudio"
						| "vscode-lm"
						| "fake-ai"
						| "human-relay"
						| "bedrock"
						| "cerebras"
						| "claude-code"
						| "doubao"
						| "deepseek"
						| "featherless"
						| "fireworks"
						| "gemini-cli"
						| "groq"
						| "moonshot"
						| "minimax"
						| "openai-native"
						| "qwen-code"
						| "virtual-quota-fallback"
						| "sambanova"
						| "vertex"
						| "xai"
						| "zai"
						| undefined
					modelId?: string | undefined
					toolStyle?: "xml" | "native" | undefined
					parentTaskId?: string | undefined
					hostname?: string | undefined
					cloudIsAuthenticated?: boolean | undefined
					diffStrategy?: string | undefined
					todos?:
						| {
								total: number
								completed: number
								inProgress: number
								pending: number
						  }
						| undefined
					currentTaskSize?: number | undefined
					taskHistorySize?: number | undefined
					repositoryUrl?: string | undefined
					repositoryName?: string | undefined
					defaultBranch?: string | undefined
				}
			},
			{
				type:
					| TelemetryEventName.COMMIT_MSG_GENERATED
					| TelemetryEventName.INLINE_ASSIST_QUICK_TASK
					| TelemetryEventName.INLINE_ASSIST_AUTO_TASK
					| TelemetryEventName.INLINE_ASSIST_ACCEPT_SUGGESTION
					| TelemetryEventName.INLINE_ASSIST_REJECT_SUGGESTION
					| TelemetryEventName.WEBVIEW_MEMORY_USAGE
					| TelemetryEventName.AUTO_PURGE_STARTED
					| TelemetryEventName.AUTO_PURGE_COMPLETED
					| TelemetryEventName.AUTO_PURGE_FAILED
					| TelemetryEventName.MANUAL_PURGE_TRIGGERED
					| TelemetryEventName.GHOST_SERVICE_DISABLED
					| TelemetryEventName.TASK_CREATED
					| TelemetryEventName.TASK_RESTARTED
					| TelemetryEventName.TASK_COMPLETED
					| TelemetryEventName.TASK_CONVERSATION_MESSAGE
					| TelemetryEventName.MODE_SWITCH
					| TelemetryEventName.MODE_SELECTOR_OPENED
					| TelemetryEventName.TOOL_USED
					| TelemetryEventName.CHECKPOINT_CREATED
					| TelemetryEventName.CHECKPOINT_RESTORED
					| TelemetryEventName.CHECKPOINT_DIFFED
					| TelemetryEventName.TAB_SHOWN
					| TelemetryEventName.MODE_SETTINGS_CHANGED
					| TelemetryEventName.CUSTOM_MODE_CREATED
					| TelemetryEventName.CONTEXT_CONDENSED
					| TelemetryEventName.SLIDING_WINDOW_TRUNCATION
					| TelemetryEventName.CODE_ACTION_USED
					| TelemetryEventName.PROMPT_ENHANCED
					| TelemetryEventName.TITLE_BUTTON_CLICKED
					| TelemetryEventName.AUTHENTICATION_INITIATED
					| TelemetryEventName.MARKETPLACE_ITEM_INSTALLED
					| TelemetryEventName.MARKETPLACE_ITEM_REMOVED
					| TelemetryEventName.MARKETPLACE_TAB_VIEWED
					| TelemetryEventName.MARKETPLACE_INSTALL_BUTTON_CLICKED
					| TelemetryEventName.SHARE_BUTTON_CLICKED
					| TelemetryEventName.SHARE_ORGANIZATION_CLICKED
					| TelemetryEventName.SHARE_PUBLIC_CLICKED
					| TelemetryEventName.SHARE_CONNECT_TO_CLOUD_CLICKED
					| TelemetryEventName.ACCOUNT_CONNECT_CLICKED
					| TelemetryEventName.ACCOUNT_CONNECT_SUCCESS
					| TelemetryEventName.ACCOUNT_LOGOUT_CLICKED
					| TelemetryEventName.ACCOUNT_LOGOUT_SUCCESS
					| TelemetryEventName.FEATURED_PROVIDER_CLICKED
					| TelemetryEventName.UPSELL_DISMISSED
					| TelemetryEventName.UPSELL_CLICKED
					| TelemetryEventName.SCHEMA_VALIDATION_ERROR
					| TelemetryEventName.DIFF_APPLICATION_ERROR
					| TelemetryEventName.SHELL_INTEGRATION_ERROR
					| TelemetryEventName.CONSECUTIVE_MISTAKE_ERROR
					| TelemetryEventName.CODE_INDEX_ERROR
				properties: {
					language: string
					mode: string
					appName: string
					appVersion: string
					vscodeVersion: string
					platform: string
					editorName: string
					wrapped: boolean
					wrapper: string | null
					wrapperTitle: string | null
					wrapperCode: string | null
					wrapperVersion: string | null
					isSubtask?: boolean | undefined
					taskId?: string | undefined
					apiProvider?:
						| "kilocode"
						| "openrouter"
						| "openai"
						| "anthropic"
						| "ollama"
						| "gemini"
						| "mistral"
						| "vercel-ai-gateway"
						| "huggingface"
						| "litellm"
						| "ovhcloud"
						| "inception"
						| "synthetic"
						| "sap-ai-core"
						| "deepinfra"
						| "io-intelligence"
						| "requesty"
						| "unbound"
						| "glama"
						| "roo"
						| "chutes"
						| "nano-gpt"
						| "lmstudio"
						| "vscode-lm"
						| "fake-ai"
						| "human-relay"
						| "bedrock"
						| "cerebras"
						| "claude-code"
						| "doubao"
						| "deepseek"
						| "featherless"
						| "fireworks"
						| "gemini-cli"
						| "groq"
						| "moonshot"
						| "minimax"
						| "openai-native"
						| "qwen-code"
						| "virtual-quota-fallback"
						| "sambanova"
						| "vertex"
						| "xai"
						| "zai"
						| undefined
					modelId?: string | undefined
					toolStyle?: "xml" | "native" | undefined
					parentTaskId?: string | undefined
					hostname?: string | undefined
					cloudIsAuthenticated?: boolean | undefined
					diffStrategy?: string | undefined
					todos?:
						| {
								total: number
								completed: number
								inProgress: number
								pending: number
						  }
						| undefined
					currentTaskSize?: number | undefined
					taskHistorySize?: number | undefined
					repositoryUrl?: string | undefined
					repositoryName?: string | undefined
					defaultBranch?: string | undefined
				}
			}
		>,
		z.ZodObject<
			{
				type: z.ZodLiteral<TelemetryEventName.TELEMETRY_SETTINGS_CHANGED>
				properties: z.ZodObject<
					{
						previousSetting: z.ZodEnum<["unset", "enabled", "disabled"]>
						newSetting: z.ZodEnum<["unset", "enabled", "disabled"]>
						repositoryUrl: z.ZodOptional<z.ZodString>
						repositoryName: z.ZodOptional<z.ZodString>
						defaultBranch: z.ZodOptional<z.ZodString>
						taskId: z.ZodOptional<z.ZodString>
						parentTaskId: z.ZodOptional<z.ZodString>
						apiProvider: z.ZodOptional<
							z.ZodEnum<
								[
									"openrouter",
									"vercel-ai-gateway",
									"huggingface",
									"litellm",
									"kilocode",
									"ovhcloud",
									"gemini",
									"inception",
									"synthetic",
									"sap-ai-core",
									"deepinfra",
									"io-intelligence",
									"requesty",
									"unbound",
									"glama",
									"roo",
									"chutes",
									"nano-gpt",
									"ollama",
									"lmstudio",
									"vscode-lm",
									"openai",
									"fake-ai",
									"human-relay",
									"anthropic",
									"bedrock",
									"cerebras",
									"claude-code",
									"doubao",
									"deepseek",
									"featherless",
									"fireworks",
									"gemini",
									"gemini-cli",
									"groq",
									"mistral",
									"moonshot",
									"minimax",
									"openai-native",
									"qwen-code",
									"roo",
									"kilocode",
									"minimax",
									"gemini-cli",
									"virtual-quota-fallback",
									"synthetic",
									"inception",
									"sambanova",
									"vertex",
									"xai",
									"zai",
								]
							>
						>
						modelId: z.ZodOptional<z.ZodString>
						diffStrategy: z.ZodOptional<z.ZodString>
						isSubtask: z.ZodOptional<z.ZodBoolean>
						todos: z.ZodOptional<
							z.ZodObject<
								{
									total: z.ZodNumber
									completed: z.ZodNumber
									inProgress: z.ZodNumber
									pending: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									total: number
									completed: number
									inProgress: number
									pending: number
								},
								{
									total: number
									completed: number
									inProgress: number
									pending: number
								}
							>
						>
						currentTaskSize: z.ZodOptional<z.ZodNumber>
						taskHistorySize: z.ZodOptional<z.ZodNumber>
						toolStyle: z.ZodOptional<z.ZodEnum<["xml", "native"]>>
						cloudIsAuthenticated: z.ZodOptional<z.ZodBoolean>
						language: z.ZodString
						mode: z.ZodString
						appName: z.ZodString
						appVersion: z.ZodString
						vscodeVersion: z.ZodString
						platform: z.ZodString
						editorName: z.ZodString
						wrapped: z.ZodBoolean
						wrapper: z.ZodNullable<z.ZodString>
						wrapperTitle: z.ZodNullable<z.ZodString>
						wrapperCode: z.ZodNullable<z.ZodString>
						wrapperVersion: z.ZodNullable<z.ZodString>
						hostname: z.ZodOptional<z.ZodString>
					},
					"strip",
					z.ZodTypeAny,
					{
						language: string
						mode: string
						appName: string
						appVersion: string
						vscodeVersion: string
						platform: string
						editorName: string
						wrapped: boolean
						wrapper: string | null
						wrapperTitle: string | null
						wrapperCode: string | null
						wrapperVersion: string | null
						previousSetting: "unset" | "enabled" | "disabled"
						newSetting: "unset" | "enabled" | "disabled"
						isSubtask?: boolean | undefined
						taskId?: string | undefined
						apiProvider?:
							| "kilocode"
							| "openrouter"
							| "openai"
							| "anthropic"
							| "ollama"
							| "gemini"
							| "mistral"
							| "vercel-ai-gateway"
							| "huggingface"
							| "litellm"
							| "ovhcloud"
							| "inception"
							| "synthetic"
							| "sap-ai-core"
							| "deepinfra"
							| "io-intelligence"
							| "requesty"
							| "unbound"
							| "glama"
							| "roo"
							| "chutes"
							| "nano-gpt"
							| "lmstudio"
							| "vscode-lm"
							| "fake-ai"
							| "human-relay"
							| "bedrock"
							| "cerebras"
							| "claude-code"
							| "doubao"
							| "deepseek"
							| "featherless"
							| "fireworks"
							| "gemini-cli"
							| "groq"
							| "moonshot"
							| "minimax"
							| "openai-native"
							| "qwen-code"
							| "virtual-quota-fallback"
							| "sambanova"
							| "vertex"
							| "xai"
							| "zai"
							| undefined
						modelId?: string | undefined
						toolStyle?: "xml" | "native" | undefined
						parentTaskId?: string | undefined
						hostname?: string | undefined
						cloudIsAuthenticated?: boolean | undefined
						diffStrategy?: string | undefined
						todos?:
							| {
									total: number
									completed: number
									inProgress: number
									pending: number
							  }
							| undefined
						currentTaskSize?: number | undefined
						taskHistorySize?: number | undefined
						repositoryUrl?: string | undefined
						repositoryName?: string | undefined
						defaultBranch?: string | undefined
					},
					{
						language: string
						mode: string
						appName: string
						appVersion: string
						vscodeVersion: string
						platform: string
						editorName: string
						wrapped: boolean
						wrapper: string | null
						wrapperTitle: string | null
						wrapperCode: string | null
						wrapperVersion: string | null
						previousSetting: "unset" | "enabled" | "disabled"
						newSetting: "unset" | "enabled" | "disabled"
						isSubtask?: boolean | undefined
						taskId?: string | undefined
						apiProvider?:
							| "kilocode"
							| "openrouter"
							| "openai"
							| "anthropic"
							| "ollama"
							| "gemini"
							| "mistral"
							| "vercel-ai-gateway"
							| "huggingface"
							| "litellm"
							| "ovhcloud"
							| "inception"
							| "synthetic"
							| "sap-ai-core"
							| "deepinfra"
							| "io-intelligence"
							| "requesty"
							| "unbound"
							| "glama"
							| "roo"
							| "chutes"
							| "nano-gpt"
							| "lmstudio"
							| "vscode-lm"
							| "fake-ai"
							| "human-relay"
							| "bedrock"
							| "cerebras"
							| "claude-code"
							| "doubao"
							| "deepseek"
							| "featherless"
							| "fireworks"
							| "gemini-cli"
							| "groq"
							| "moonshot"
							| "minimax"
							| "openai-native"
							| "qwen-code"
							| "virtual-quota-fallback"
							| "sambanova"
							| "vertex"
							| "xai"
							| "zai"
							| undefined
						modelId?: string | undefined
						toolStyle?: "xml" | "native" | undefined
						parentTaskId?: string | undefined
						hostname?: string | undefined
						cloudIsAuthenticated?: boolean | undefined
						diffStrategy?: string | undefined
						todos?:
							| {
									total: number
									completed: number
									inProgress: number
									pending: number
							  }
							| undefined
						currentTaskSize?: number | undefined
						taskHistorySize?: number | undefined
						repositoryUrl?: string | undefined
						repositoryName?: string | undefined
						defaultBranch?: string | undefined
					}
				>
			},
			"strip",
			z.ZodTypeAny,
			{
				type: TelemetryEventName.TELEMETRY_SETTINGS_CHANGED
				properties: {
					language: string
					mode: string
					appName: string
					appVersion: string
					vscodeVersion: string
					platform: string
					editorName: string
					wrapped: boolean
					wrapper: string | null
					wrapperTitle: string | null
					wrapperCode: string | null
					wrapperVersion: string | null
					previousSetting: "unset" | "enabled" | "disabled"
					newSetting: "unset" | "enabled" | "disabled"
					isSubtask?: boolean | undefined
					taskId?: string | undefined
					apiProvider?:
						| "kilocode"
						| "openrouter"
						| "openai"
						| "anthropic"
						| "ollama"
						| "gemini"
						| "mistral"
						| "vercel-ai-gateway"
						| "huggingface"
						| "litellm"
						| "ovhcloud"
						| "inception"
						| "synthetic"
						| "sap-ai-core"
						| "deepinfra"
						| "io-intelligence"
						| "requesty"
						| "unbound"
						| "glama"
						| "roo"
						| "chutes"
						| "nano-gpt"
						| "lmstudio"
						| "vscode-lm"
						| "fake-ai"
						| "human-relay"
						| "bedrock"
						| "cerebras"
						| "claude-code"
						| "doubao"
						| "deepseek"
						| "featherless"
						| "fireworks"
						| "gemini-cli"
						| "groq"
						| "moonshot"
						| "minimax"
						| "openai-native"
						| "qwen-code"
						| "virtual-quota-fallback"
						| "sambanova"
						| "vertex"
						| "xai"
						| "zai"
						| undefined
					modelId?: string | undefined
					toolStyle?: "xml" | "native" | undefined
					parentTaskId?: string | undefined
					hostname?: string | undefined
					cloudIsAuthenticated?: boolean | undefined
					diffStrategy?: string | undefined
					todos?:
						| {
								total: number
								completed: number
								inProgress: number
								pending: number
						  }
						| undefined
					currentTaskSize?: number | undefined
					taskHistorySize?: number | undefined
					repositoryUrl?: string | undefined
					repositoryName?: string | undefined
					defaultBranch?: string | undefined
				}
			},
			{
				type: TelemetryEventName.TELEMETRY_SETTINGS_CHANGED
				properties: {
					language: string
					mode: string
					appName: string
					appVersion: string
					vscodeVersion: string
					platform: string
					editorName: string
					wrapped: boolean
					wrapper: string | null
					wrapperTitle: string | null
					wrapperCode: string | null
					wrapperVersion: string | null
					previousSetting: "unset" | "enabled" | "disabled"
					newSetting: "unset" | "enabled" | "disabled"
					isSubtask?: boolean | undefined
					taskId?: string | undefined
					apiProvider?:
						| "kilocode"
						| "openrouter"
						| "openai"
						| "anthropic"
						| "ollama"
						| "gemini"
						| "mistral"
						| "vercel-ai-gateway"
						| "huggingface"
						| "litellm"
						| "ovhcloud"
						| "inception"
						| "synthetic"
						| "sap-ai-core"
						| "deepinfra"
						| "io-intelligence"
						| "requesty"
						| "unbound"
						| "glama"
						| "roo"
						| "chutes"
						| "nano-gpt"
						| "lmstudio"
						| "vscode-lm"
						| "fake-ai"
						| "human-relay"
						| "bedrock"
						| "cerebras"
						| "claude-code"
						| "doubao"
						| "deepseek"
						| "featherless"
						| "fireworks"
						| "gemini-cli"
						| "groq"
						| "moonshot"
						| "minimax"
						| "openai-native"
						| "qwen-code"
						| "virtual-quota-fallback"
						| "sambanova"
						| "vertex"
						| "xai"
						| "zai"
						| undefined
					modelId?: string | undefined
					toolStyle?: "xml" | "native" | undefined
					parentTaskId?: string | undefined
					hostname?: string | undefined
					cloudIsAuthenticated?: boolean | undefined
					diffStrategy?: string | undefined
					todos?:
						| {
								total: number
								completed: number
								inProgress: number
								pending: number
						  }
						| undefined
					currentTaskSize?: number | undefined
					taskHistorySize?: number | undefined
					repositoryUrl?: string | undefined
					repositoryName?: string | undefined
					defaultBranch?: string | undefined
				}
			}
		>,
		z.ZodObject<
			{
				type: z.ZodLiteral<TelemetryEventName.TASK_MESSAGE>
				properties: z.ZodObject<
					{
						taskId: z.ZodString
						message: z.ZodObject<
							{
								ts: z.ZodNumber
								type: z.ZodUnion<[z.ZodLiteral<"ask">, z.ZodLiteral<"say">]>
								ask: z.ZodOptional<
									z.ZodEnum<
										[
											"followup",
											"command",
											"command_output",
											"completion_result",
											"tool",
											"api_req_failed",
											"resume_task",
											"resume_completed_task",
											"mistake_limit_reached",
											"browser_action_launch",
											"use_mcp_server",
											"auto_approval_max_req_reached",
											"payment_required_prompt",
											"invalid_model",
											"report_bug",
											"condense",
											"checkpoint_restore",
										]
									>
								>
								say: z.ZodOptional<
									z.ZodEnum<
										[
											"error",
											"api_req_started",
											"api_req_finished",
											"api_req_retried",
											"api_req_retry_delayed",
											"api_req_deleted",
											"text",
											"image",
											"reasoning",
											"completion_result",
											"user_feedback",
											"user_feedback_diff",
											"command_output",
											"shell_integration_warning",
											"browser_action",
											"browser_action_result",
											"mcp_server_request_started",
											"mcp_server_response",
											"subtask_result",
											"checkpoint_saved",
											"rooignore_error",
											"diff_error",
											"condense_context",
											"condense_context_error",
											"codebase_search_result",
											"user_edit_todos",
										]
									>
								>
								text: z.ZodOptional<z.ZodString>
								images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>
								partial: z.ZodOptional<z.ZodBoolean>
								reasoning: z.ZodOptional<z.ZodString>
								conversationHistoryIndex: z.ZodOptional<z.ZodNumber>
								checkpoint: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>
								progressStatus: z.ZodOptional<
									z.ZodObject<
										{
											icon: z.ZodOptional<z.ZodString>
											text: z.ZodOptional<z.ZodString>
										},
										"strip",
										z.ZodTypeAny,
										{
											text?: string | undefined
											icon?: string | undefined
										},
										{
											text?: string | undefined
											icon?: string | undefined
										}
									>
								>
								contextCondense: z.ZodOptional<
									z.ZodObject<
										{
											cost: z.ZodNumber
											prevContextTokens: z.ZodNumber
											newContextTokens: z.ZodNumber
											summary: z.ZodString
										},
										"strip",
										z.ZodTypeAny,
										{
											cost: number
											prevContextTokens: number
											newContextTokens: number
											summary: string
										},
										{
											cost: number
											prevContextTokens: number
											newContextTokens: number
											summary: string
										}
									>
								>
								isProtected: z.ZodOptional<z.ZodBoolean>
								apiProtocol: z.ZodOptional<
									z.ZodUnion<[z.ZodLiteral<"openai">, z.ZodLiteral<"anthropic">]>
								>
								isAnswered: z.ZodOptional<z.ZodBoolean>
								metadata: z.ZodOptional<
									z.ZodObject<
										{
											kiloCode: z.ZodOptional<
												z.ZodObject<
													{
														commitRange: z.ZodOptional<
															z.ZodObject<
																{
																	from: z.ZodString
																	fromTimeStamp: z.ZodOptional<z.ZodNumber>
																	to: z.ZodString
																},
																"strip",
																z.ZodTypeAny,
																{
																	from: string
																	to: string
																	fromTimeStamp?: number | undefined
																},
																{
																	from: string
																	to: string
																	fromTimeStamp?: number | undefined
																}
															>
														>
													},
													"strip",
													z.ZodTypeAny,
													{
														commitRange?:
															| {
																	from: string
																	to: string
																	fromTimeStamp?: number | undefined
															  }
															| undefined
													},
													{
														commitRange?:
															| {
																	from: string
																	to: string
																	fromTimeStamp?: number | undefined
															  }
															| undefined
													}
												>
											>
										},
										"strip",
										z.ZodTypeAny,
										{
											kiloCode?:
												| {
														commitRange?:
															| {
																	from: string
																	to: string
																	fromTimeStamp?: number | undefined
															  }
															| undefined
												  }
												| undefined
										},
										{
											kiloCode?:
												| {
														commitRange?:
															| {
																	from: string
																	to: string
																	fromTimeStamp?: number | undefined
															  }
															| undefined
												  }
												| undefined
										}
									>
								>
							},
							"strip",
							z.ZodTypeAny,
							{
								type: "ask" | "say"
								ts: number
								text?: string | undefined
								reasoning?: string | undefined
								ask?:
									| "followup"
									| "command"
									| "command_output"
									| "completion_result"
									| "tool"
									| "api_req_failed"
									| "resume_task"
									| "resume_completed_task"
									| "mistake_limit_reached"
									| "browser_action_launch"
									| "use_mcp_server"
									| "auto_approval_max_req_reached"
									| "payment_required_prompt"
									| "invalid_model"
									| "report_bug"
									| "condense"
									| "checkpoint_restore"
									| undefined
								say?:
									| "command_output"
									| "completion_result"
									| "error"
									| "api_req_started"
									| "api_req_finished"
									| "api_req_retried"
									| "api_req_retry_delayed"
									| "api_req_deleted"
									| "text"
									| "image"
									| "reasoning"
									| "user_feedback"
									| "user_feedback_diff"
									| "shell_integration_warning"
									| "browser_action"
									| "browser_action_result"
									| "mcp_server_request_started"
									| "mcp_server_response"
									| "subtask_result"
									| "checkpoint_saved"
									| "rooignore_error"
									| "diff_error"
									| "condense_context"
									| "condense_context_error"
									| "codebase_search_result"
									| "user_edit_todos"
									| undefined
								images?: string[] | undefined
								partial?: boolean | undefined
								conversationHistoryIndex?: number | undefined
								checkpoint?: Record<string, unknown> | undefined
								progressStatus?:
									| {
											text?: string | undefined
											icon?: string | undefined
									  }
									| undefined
								contextCondense?:
									| {
											cost: number
											prevContextTokens: number
											newContextTokens: number
											summary: string
									  }
									| undefined
								isProtected?: boolean | undefined
								apiProtocol?: "openai" | "anthropic" | undefined
								isAnswered?: boolean | undefined
								metadata?:
									| {
											kiloCode?:
												| {
														commitRange?:
															| {
																	from: string
																	to: string
																	fromTimeStamp?: number | undefined
															  }
															| undefined
												  }
												| undefined
									  }
									| undefined
							},
							{
								type: "ask" | "say"
								ts: number
								text?: string | undefined
								reasoning?: string | undefined
								ask?:
									| "followup"
									| "command"
									| "command_output"
									| "completion_result"
									| "tool"
									| "api_req_failed"
									| "resume_task"
									| "resume_completed_task"
									| "mistake_limit_reached"
									| "browser_action_launch"
									| "use_mcp_server"
									| "auto_approval_max_req_reached"
									| "payment_required_prompt"
									| "invalid_model"
									| "report_bug"
									| "condense"
									| "checkpoint_restore"
									| undefined
								say?:
									| "command_output"
									| "completion_result"
									| "error"
									| "api_req_started"
									| "api_req_finished"
									| "api_req_retried"
									| "api_req_retry_delayed"
									| "api_req_deleted"
									| "text"
									| "image"
									| "reasoning"
									| "user_feedback"
									| "user_feedback_diff"
									| "shell_integration_warning"
									| "browser_action"
									| "browser_action_result"
									| "mcp_server_request_started"
									| "mcp_server_response"
									| "subtask_result"
									| "checkpoint_saved"
									| "rooignore_error"
									| "diff_error"
									| "condense_context"
									| "condense_context_error"
									| "codebase_search_result"
									| "user_edit_todos"
									| undefined
								images?: string[] | undefined
								partial?: boolean | undefined
								conversationHistoryIndex?: number | undefined
								checkpoint?: Record<string, unknown> | undefined
								progressStatus?:
									| {
											text?: string | undefined
											icon?: string | undefined
									  }
									| undefined
								contextCondense?:
									| {
											cost: number
											prevContextTokens: number
											newContextTokens: number
											summary: string
									  }
									| undefined
								isProtected?: boolean | undefined
								apiProtocol?: "openai" | "anthropic" | undefined
								isAnswered?: boolean | undefined
								metadata?:
									| {
											kiloCode?:
												| {
														commitRange?:
															| {
																	from: string
																	to: string
																	fromTimeStamp?: number | undefined
															  }
															| undefined
												  }
												| undefined
									  }
									| undefined
							}
						>
						repositoryUrl: z.ZodOptional<z.ZodString>
						repositoryName: z.ZodOptional<z.ZodString>
						defaultBranch: z.ZodOptional<z.ZodString>
						parentTaskId: z.ZodOptional<z.ZodString>
						apiProvider: z.ZodOptional<
							z.ZodEnum<
								[
									"openrouter",
									"vercel-ai-gateway",
									"huggingface",
									"litellm",
									"kilocode",
									"ovhcloud",
									"gemini",
									"inception",
									"synthetic",
									"sap-ai-core",
									"deepinfra",
									"io-intelligence",
									"requesty",
									"unbound",
									"glama",
									"roo",
									"chutes",
									"nano-gpt",
									"ollama",
									"lmstudio",
									"vscode-lm",
									"openai",
									"fake-ai",
									"human-relay",
									"anthropic",
									"bedrock",
									"cerebras",
									"claude-code",
									"doubao",
									"deepseek",
									"featherless",
									"fireworks",
									"gemini",
									"gemini-cli",
									"groq",
									"mistral",
									"moonshot",
									"minimax",
									"openai-native",
									"qwen-code",
									"roo",
									"kilocode",
									"minimax",
									"gemini-cli",
									"virtual-quota-fallback",
									"synthetic",
									"inception",
									"sambanova",
									"vertex",
									"xai",
									"zai",
								]
							>
						>
						modelId: z.ZodOptional<z.ZodString>
						diffStrategy: z.ZodOptional<z.ZodString>
						isSubtask: z.ZodOptional<z.ZodBoolean>
						todos: z.ZodOptional<
							z.ZodObject<
								{
									total: z.ZodNumber
									completed: z.ZodNumber
									inProgress: z.ZodNumber
									pending: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									total: number
									completed: number
									inProgress: number
									pending: number
								},
								{
									total: number
									completed: number
									inProgress: number
									pending: number
								}
							>
						>
						currentTaskSize: z.ZodOptional<z.ZodNumber>
						taskHistorySize: z.ZodOptional<z.ZodNumber>
						toolStyle: z.ZodOptional<z.ZodEnum<["xml", "native"]>>
						cloudIsAuthenticated: z.ZodOptional<z.ZodBoolean>
						language: z.ZodString
						mode: z.ZodString
						appName: z.ZodString
						appVersion: z.ZodString
						vscodeVersion: z.ZodString
						platform: z.ZodString
						editorName: z.ZodString
						wrapped: z.ZodBoolean
						wrapper: z.ZodNullable<z.ZodString>
						wrapperTitle: z.ZodNullable<z.ZodString>
						wrapperCode: z.ZodNullable<z.ZodString>
						wrapperVersion: z.ZodNullable<z.ZodString>
						hostname: z.ZodOptional<z.ZodString>
					},
					"strip",
					z.ZodTypeAny,
					{
						message: {
							type: "ask" | "say"
							ts: number
							text?: string | undefined
							reasoning?: string | undefined
							ask?:
								| "followup"
								| "command"
								| "command_output"
								| "completion_result"
								| "tool"
								| "api_req_failed"
								| "resume_task"
								| "resume_completed_task"
								| "mistake_limit_reached"
								| "browser_action_launch"
								| "use_mcp_server"
								| "auto_approval_max_req_reached"
								| "payment_required_prompt"
								| "invalid_model"
								| "report_bug"
								| "condense"
								| "checkpoint_restore"
								| undefined
							say?:
								| "command_output"
								| "completion_result"
								| "error"
								| "api_req_started"
								| "api_req_finished"
								| "api_req_retried"
								| "api_req_retry_delayed"
								| "api_req_deleted"
								| "text"
								| "image"
								| "reasoning"
								| "user_feedback"
								| "user_feedback_diff"
								| "shell_integration_warning"
								| "browser_action"
								| "browser_action_result"
								| "mcp_server_request_started"
								| "mcp_server_response"
								| "subtask_result"
								| "checkpoint_saved"
								| "rooignore_error"
								| "diff_error"
								| "condense_context"
								| "condense_context_error"
								| "codebase_search_result"
								| "user_edit_todos"
								| undefined
							images?: string[] | undefined
							partial?: boolean | undefined
							conversationHistoryIndex?: number | undefined
							checkpoint?: Record<string, unknown> | undefined
							progressStatus?:
								| {
										text?: string | undefined
										icon?: string | undefined
								  }
								| undefined
							contextCondense?:
								| {
										cost: number
										prevContextTokens: number
										newContextTokens: number
										summary: string
								  }
								| undefined
							isProtected?: boolean | undefined
							apiProtocol?: "openai" | "anthropic" | undefined
							isAnswered?: boolean | undefined
							metadata?:
								| {
										kiloCode?:
											| {
													commitRange?:
														| {
																from: string
																to: string
																fromTimeStamp?: number | undefined
														  }
														| undefined
											  }
											| undefined
								  }
								| undefined
						}
						taskId: string
						language: string
						mode: string
						appName: string
						appVersion: string
						vscodeVersion: string
						platform: string
						editorName: string
						wrapped: boolean
						wrapper: string | null
						wrapperTitle: string | null
						wrapperCode: string | null
						wrapperVersion: string | null
						isSubtask?: boolean | undefined
						apiProvider?:
							| "kilocode"
							| "openrouter"
							| "openai"
							| "anthropic"
							| "ollama"
							| "gemini"
							| "mistral"
							| "vercel-ai-gateway"
							| "huggingface"
							| "litellm"
							| "ovhcloud"
							| "inception"
							| "synthetic"
							| "sap-ai-core"
							| "deepinfra"
							| "io-intelligence"
							| "requesty"
							| "unbound"
							| "glama"
							| "roo"
							| "chutes"
							| "nano-gpt"
							| "lmstudio"
							| "vscode-lm"
							| "fake-ai"
							| "human-relay"
							| "bedrock"
							| "cerebras"
							| "claude-code"
							| "doubao"
							| "deepseek"
							| "featherless"
							| "fireworks"
							| "gemini-cli"
							| "groq"
							| "moonshot"
							| "minimax"
							| "openai-native"
							| "qwen-code"
							| "virtual-quota-fallback"
							| "sambanova"
							| "vertex"
							| "xai"
							| "zai"
							| undefined
						modelId?: string | undefined
						toolStyle?: "xml" | "native" | undefined
						parentTaskId?: string | undefined
						hostname?: string | undefined
						cloudIsAuthenticated?: boolean | undefined
						diffStrategy?: string | undefined
						todos?:
							| {
									total: number
									completed: number
									inProgress: number
									pending: number
							  }
							| undefined
						currentTaskSize?: number | undefined
						taskHistorySize?: number | undefined
						repositoryUrl?: string | undefined
						repositoryName?: string | undefined
						defaultBranch?: string | undefined
					},
					{
						message: {
							type: "ask" | "say"
							ts: number
							text?: string | undefined
							reasoning?: string | undefined
							ask?:
								| "followup"
								| "command"
								| "command_output"
								| "completion_result"
								| "tool"
								| "api_req_failed"
								| "resume_task"
								| "resume_completed_task"
								| "mistake_limit_reached"
								| "browser_action_launch"
								| "use_mcp_server"
								| "auto_approval_max_req_reached"
								| "payment_required_prompt"
								| "invalid_model"
								| "report_bug"
								| "condense"
								| "checkpoint_restore"
								| undefined
							say?:
								| "command_output"
								| "completion_result"
								| "error"
								| "api_req_started"
								| "api_req_finished"
								| "api_req_retried"
								| "api_req_retry_delayed"
								| "api_req_deleted"
								| "text"
								| "image"
								| "reasoning"
								| "user_feedback"
								| "user_feedback_diff"
								| "shell_integration_warning"
								| "browser_action"
								| "browser_action_result"
								| "mcp_server_request_started"
								| "mcp_server_response"
								| "subtask_result"
								| "checkpoint_saved"
								| "rooignore_error"
								| "diff_error"
								| "condense_context"
								| "condense_context_error"
								| "codebase_search_result"
								| "user_edit_todos"
								| undefined
							images?: string[] | undefined
							partial?: boolean | undefined
							conversationHistoryIndex?: number | undefined
							checkpoint?: Record<string, unknown> | undefined
							progressStatus?:
								| {
										text?: string | undefined
										icon?: string | undefined
								  }
								| undefined
							contextCondense?:
								| {
										cost: number
										prevContextTokens: number
										newContextTokens: number
										summary: string
								  }
								| undefined
							isProtected?: boolean | undefined
							apiProtocol?: "openai" | "anthropic" | undefined
							isAnswered?: boolean | undefined
							metadata?:
								| {
										kiloCode?:
											| {
													commitRange?:
														| {
																from: string
																to: string
																fromTimeStamp?: number | undefined
														  }
														| undefined
											  }
											| undefined
								  }
								| undefined
						}
						taskId: string
						language: string
						mode: string
						appName: string
						appVersion: string
						vscodeVersion: string
						platform: string
						editorName: string
						wrapped: boolean
						wrapper: string | null
						wrapperTitle: string | null
						wrapperCode: string | null
						wrapperVersion: string | null
						isSubtask?: boolean | undefined
						apiProvider?:
							| "kilocode"
							| "openrouter"
							| "openai"
							| "anthropic"
							| "ollama"
							| "gemini"
							| "mistral"
							| "vercel-ai-gateway"
							| "huggingface"
							| "litellm"
							| "ovhcloud"
							| "inception"
							| "synthetic"
							| "sap-ai-core"
							| "deepinfra"
							| "io-intelligence"
							| "requesty"
							| "unbound"
							| "glama"
							| "roo"
							| "chutes"
							| "nano-gpt"
							| "lmstudio"
							| "vscode-lm"
							| "fake-ai"
							| "human-relay"
							| "bedrock"
							| "cerebras"
							| "claude-code"
							| "doubao"
							| "deepseek"
							| "featherless"
							| "fireworks"
							| "gemini-cli"
							| "groq"
							| "moonshot"
							| "minimax"
							| "openai-native"
							| "qwen-code"
							| "virtual-quota-fallback"
							| "sambanova"
							| "vertex"
							| "xai"
							| "zai"
							| undefined
						modelId?: string | undefined
						toolStyle?: "xml" | "native" | undefined
						parentTaskId?: string | undefined
						hostname?: string | undefined
						cloudIsAuthenticated?: boolean | undefined
						diffStrategy?: string | undefined
						todos?:
							| {
									total: number
									completed: number
									inProgress: number
									pending: number
							  }
							| undefined
						currentTaskSize?: number | undefined
						taskHistorySize?: number | undefined
						repositoryUrl?: string | undefined
						repositoryName?: string | undefined
						defaultBranch?: string | undefined
					}
				>
			},
			"strip",
			z.ZodTypeAny,
			{
				type: TelemetryEventName.TASK_MESSAGE
				properties: {
					message: {
						type: "ask" | "say"
						ts: number
						text?: string | undefined
						reasoning?: string | undefined
						ask?:
							| "followup"
							| "command"
							| "command_output"
							| "completion_result"
							| "tool"
							| "api_req_failed"
							| "resume_task"
							| "resume_completed_task"
							| "mistake_limit_reached"
							| "browser_action_launch"
							| "use_mcp_server"
							| "auto_approval_max_req_reached"
							| "payment_required_prompt"
							| "invalid_model"
							| "report_bug"
							| "condense"
							| "checkpoint_restore"
							| undefined
						say?:
							| "command_output"
							| "completion_result"
							| "error"
							| "api_req_started"
							| "api_req_finished"
							| "api_req_retried"
							| "api_req_retry_delayed"
							| "api_req_deleted"
							| "text"
							| "image"
							| "reasoning"
							| "user_feedback"
							| "user_feedback_diff"
							| "shell_integration_warning"
							| "browser_action"
							| "browser_action_result"
							| "mcp_server_request_started"
							| "mcp_server_response"
							| "subtask_result"
							| "checkpoint_saved"
							| "rooignore_error"
							| "diff_error"
							| "condense_context"
							| "condense_context_error"
							| "codebase_search_result"
							| "user_edit_todos"
							| undefined
						images?: string[] | undefined
						partial?: boolean | undefined
						conversationHistoryIndex?: number | undefined
						checkpoint?: Record<string, unknown> | undefined
						progressStatus?:
							| {
									text?: string | undefined
									icon?: string | undefined
							  }
							| undefined
						contextCondense?:
							| {
									cost: number
									prevContextTokens: number
									newContextTokens: number
									summary: string
							  }
							| undefined
						isProtected?: boolean | undefined
						apiProtocol?: "openai" | "anthropic" | undefined
						isAnswered?: boolean | undefined
						metadata?:
							| {
									kiloCode?:
										| {
												commitRange?:
													| {
															from: string
															to: string
															fromTimeStamp?: number | undefined
													  }
													| undefined
										  }
										| undefined
							  }
							| undefined
					}
					taskId: string
					language: string
					mode: string
					appName: string
					appVersion: string
					vscodeVersion: string
					platform: string
					editorName: string
					wrapped: boolean
					wrapper: string | null
					wrapperTitle: string | null
					wrapperCode: string | null
					wrapperVersion: string | null
					isSubtask?: boolean | undefined
					apiProvider?:
						| "kilocode"
						| "openrouter"
						| "openai"
						| "anthropic"
						| "ollama"
						| "gemini"
						| "mistral"
						| "vercel-ai-gateway"
						| "huggingface"
						| "litellm"
						| "ovhcloud"
						| "inception"
						| "synthetic"
						| "sap-ai-core"
						| "deepinfra"
						| "io-intelligence"
						| "requesty"
						| "unbound"
						| "glama"
						| "roo"
						| "chutes"
						| "nano-gpt"
						| "lmstudio"
						| "vscode-lm"
						| "fake-ai"
						| "human-relay"
						| "bedrock"
						| "cerebras"
						| "claude-code"
						| "doubao"
						| "deepseek"
						| "featherless"
						| "fireworks"
						| "gemini-cli"
						| "groq"
						| "moonshot"
						| "minimax"
						| "openai-native"
						| "qwen-code"
						| "virtual-quota-fallback"
						| "sambanova"
						| "vertex"
						| "xai"
						| "zai"
						| undefined
					modelId?: string | undefined
					toolStyle?: "xml" | "native" | undefined
					parentTaskId?: string | undefined
					hostname?: string | undefined
					cloudIsAuthenticated?: boolean | undefined
					diffStrategy?: string | undefined
					todos?:
						| {
								total: number
								completed: number
								inProgress: number
								pending: number
						  }
						| undefined
					currentTaskSize?: number | undefined
					taskHistorySize?: number | undefined
					repositoryUrl?: string | undefined
					repositoryName?: string | undefined
					defaultBranch?: string | undefined
				}
			},
			{
				type: TelemetryEventName.TASK_MESSAGE
				properties: {
					message: {
						type: "ask" | "say"
						ts: number
						text?: string | undefined
						reasoning?: string | undefined
						ask?:
							| "followup"
							| "command"
							| "command_output"
							| "completion_result"
							| "tool"
							| "api_req_failed"
							| "resume_task"
							| "resume_completed_task"
							| "mistake_limit_reached"
							| "browser_action_launch"
							| "use_mcp_server"
							| "auto_approval_max_req_reached"
							| "payment_required_prompt"
							| "invalid_model"
							| "report_bug"
							| "condense"
							| "checkpoint_restore"
							| undefined
						say?:
							| "command_output"
							| "completion_result"
							| "error"
							| "api_req_started"
							| "api_req_finished"
							| "api_req_retried"
							| "api_req_retry_delayed"
							| "api_req_deleted"
							| "text"
							| "image"
							| "reasoning"
							| "user_feedback"
							| "user_feedback_diff"
							| "shell_integration_warning"
							| "browser_action"
							| "browser_action_result"
							| "mcp_server_request_started"
							| "mcp_server_response"
							| "subtask_result"
							| "checkpoint_saved"
							| "rooignore_error"
							| "diff_error"
							| "condense_context"
							| "condense_context_error"
							| "codebase_search_result"
							| "user_edit_todos"
							| undefined
						images?: string[] | undefined
						partial?: boolean | undefined
						conversationHistoryIndex?: number | undefined
						checkpoint?: Record<string, unknown> | undefined
						progressStatus?:
							| {
									text?: string | undefined
									icon?: string | undefined
							  }
							| undefined
						contextCondense?:
							| {
									cost: number
									prevContextTokens: number
									newContextTokens: number
									summary: string
							  }
							| undefined
						isProtected?: boolean | undefined
						apiProtocol?: "openai" | "anthropic" | undefined
						isAnswered?: boolean | undefined
						metadata?:
							| {
									kiloCode?:
										| {
												commitRange?:
													| {
															from: string
															to: string
															fromTimeStamp?: number | undefined
													  }
													| undefined
										  }
										| undefined
							  }
							| undefined
					}
					taskId: string
					language: string
					mode: string
					appName: string
					appVersion: string
					vscodeVersion: string
					platform: string
					editorName: string
					wrapped: boolean
					wrapper: string | null
					wrapperTitle: string | null
					wrapperCode: string | null
					wrapperVersion: string | null
					isSubtask?: boolean | undefined
					apiProvider?:
						| "kilocode"
						| "openrouter"
						| "openai"
						| "anthropic"
						| "ollama"
						| "gemini"
						| "mistral"
						| "vercel-ai-gateway"
						| "huggingface"
						| "litellm"
						| "ovhcloud"
						| "inception"
						| "synthetic"
						| "sap-ai-core"
						| "deepinfra"
						| "io-intelligence"
						| "requesty"
						| "unbound"
						| "glama"
						| "roo"
						| "chutes"
						| "nano-gpt"
						| "lmstudio"
						| "vscode-lm"
						| "fake-ai"
						| "human-relay"
						| "bedrock"
						| "cerebras"
						| "claude-code"
						| "doubao"
						| "deepseek"
						| "featherless"
						| "fireworks"
						| "gemini-cli"
						| "groq"
						| "moonshot"
						| "minimax"
						| "openai-native"
						| "qwen-code"
						| "virtual-quota-fallback"
						| "sambanova"
						| "vertex"
						| "xai"
						| "zai"
						| undefined
					modelId?: string | undefined
					toolStyle?: "xml" | "native" | undefined
					parentTaskId?: string | undefined
					hostname?: string | undefined
					cloudIsAuthenticated?: boolean | undefined
					diffStrategy?: string | undefined
					todos?:
						| {
								total: number
								completed: number
								inProgress: number
								pending: number
						  }
						| undefined
					currentTaskSize?: number | undefined
					taskHistorySize?: number | undefined
					repositoryUrl?: string | undefined
					repositoryName?: string | undefined
					defaultBranch?: string | undefined
				}
			}
		>,
		z.ZodObject<
			{
				type: z.ZodLiteral<TelemetryEventName.LLM_COMPLETION>
				properties: z.ZodObject<
					{
						inputTokens: z.ZodNumber
						outputTokens: z.ZodNumber
						cacheReadTokens: z.ZodOptional<z.ZodNumber>
						cacheWriteTokens: z.ZodOptional<z.ZodNumber>
						cost: z.ZodOptional<z.ZodNumber>
						repositoryUrl: z.ZodOptional<z.ZodString>
						repositoryName: z.ZodOptional<z.ZodString>
						defaultBranch: z.ZodOptional<z.ZodString>
						taskId: z.ZodOptional<z.ZodString>
						parentTaskId: z.ZodOptional<z.ZodString>
						apiProvider: z.ZodOptional<
							z.ZodEnum<
								[
									"openrouter",
									"vercel-ai-gateway",
									"huggingface",
									"litellm",
									"kilocode",
									"ovhcloud",
									"gemini",
									"inception",
									"synthetic",
									"sap-ai-core",
									"deepinfra",
									"io-intelligence",
									"requesty",
									"unbound",
									"glama",
									"roo",
									"chutes",
									"nano-gpt",
									"ollama",
									"lmstudio",
									"vscode-lm",
									"openai",
									"fake-ai",
									"human-relay",
									"anthropic",
									"bedrock",
									"cerebras",
									"claude-code",
									"doubao",
									"deepseek",
									"featherless",
									"fireworks",
									"gemini",
									"gemini-cli",
									"groq",
									"mistral",
									"moonshot",
									"minimax",
									"openai-native",
									"qwen-code",
									"roo",
									"kilocode",
									"minimax",
									"gemini-cli",
									"virtual-quota-fallback",
									"synthetic",
									"inception",
									"sambanova",
									"vertex",
									"xai",
									"zai",
								]
							>
						>
						modelId: z.ZodOptional<z.ZodString>
						diffStrategy: z.ZodOptional<z.ZodString>
						isSubtask: z.ZodOptional<z.ZodBoolean>
						todos: z.ZodOptional<
							z.ZodObject<
								{
									total: z.ZodNumber
									completed: z.ZodNumber
									inProgress: z.ZodNumber
									pending: z.ZodNumber
								},
								"strip",
								z.ZodTypeAny,
								{
									total: number
									completed: number
									inProgress: number
									pending: number
								},
								{
									total: number
									completed: number
									inProgress: number
									pending: number
								}
							>
						>
						currentTaskSize: z.ZodOptional<z.ZodNumber>
						taskHistorySize: z.ZodOptional<z.ZodNumber>
						toolStyle: z.ZodOptional<z.ZodEnum<["xml", "native"]>>
						cloudIsAuthenticated: z.ZodOptional<z.ZodBoolean>
						language: z.ZodString
						mode: z.ZodString
						appName: z.ZodString
						appVersion: z.ZodString
						vscodeVersion: z.ZodString
						platform: z.ZodString
						editorName: z.ZodString
						wrapped: z.ZodBoolean
						wrapper: z.ZodNullable<z.ZodString>
						wrapperTitle: z.ZodNullable<z.ZodString>
						wrapperCode: z.ZodNullable<z.ZodString>
						wrapperVersion: z.ZodNullable<z.ZodString>
						hostname: z.ZodOptional<z.ZodString>
					},
					"strip",
					z.ZodTypeAny,
					{
						language: string
						mode: string
						appName: string
						appVersion: string
						vscodeVersion: string
						platform: string
						editorName: string
						wrapped: boolean
						wrapper: string | null
						wrapperTitle: string | null
						wrapperCode: string | null
						wrapperVersion: string | null
						inputTokens: number
						outputTokens: number
						cost?: number | undefined
						isSubtask?: boolean | undefined
						taskId?: string | undefined
						apiProvider?:
							| "kilocode"
							| "openrouter"
							| "openai"
							| "anthropic"
							| "ollama"
							| "gemini"
							| "mistral"
							| "vercel-ai-gateway"
							| "huggingface"
							| "litellm"
							| "ovhcloud"
							| "inception"
							| "synthetic"
							| "sap-ai-core"
							| "deepinfra"
							| "io-intelligence"
							| "requesty"
							| "unbound"
							| "glama"
							| "roo"
							| "chutes"
							| "nano-gpt"
							| "lmstudio"
							| "vscode-lm"
							| "fake-ai"
							| "human-relay"
							| "bedrock"
							| "cerebras"
							| "claude-code"
							| "doubao"
							| "deepseek"
							| "featherless"
							| "fireworks"
							| "gemini-cli"
							| "groq"
							| "moonshot"
							| "minimax"
							| "openai-native"
							| "qwen-code"
							| "virtual-quota-fallback"
							| "sambanova"
							| "vertex"
							| "xai"
							| "zai"
							| undefined
						modelId?: string | undefined
						toolStyle?: "xml" | "native" | undefined
						parentTaskId?: string | undefined
						hostname?: string | undefined
						cloudIsAuthenticated?: boolean | undefined
						diffStrategy?: string | undefined
						todos?:
							| {
									total: number
									completed: number
									inProgress: number
									pending: number
							  }
							| undefined
						currentTaskSize?: number | undefined
						taskHistorySize?: number | undefined
						repositoryUrl?: string | undefined
						repositoryName?: string | undefined
						defaultBranch?: string | undefined
						cacheReadTokens?: number | undefined
						cacheWriteTokens?: number | undefined
					},
					{
						language: string
						mode: string
						appName: string
						appVersion: string
						vscodeVersion: string
						platform: string
						editorName: string
						wrapped: boolean
						wrapper: string | null
						wrapperTitle: string | null
						wrapperCode: string | null
						wrapperVersion: string | null
						inputTokens: number
						outputTokens: number
						cost?: number | undefined
						isSubtask?: boolean | undefined
						taskId?: string | undefined
						apiProvider?:
							| "kilocode"
							| "openrouter"
							| "openai"
							| "anthropic"
							| "ollama"
							| "gemini"
							| "mistral"
							| "vercel-ai-gateway"
							| "huggingface"
							| "litellm"
							| "ovhcloud"
							| "inception"
							| "synthetic"
							| "sap-ai-core"
							| "deepinfra"
							| "io-intelligence"
							| "requesty"
							| "unbound"
							| "glama"
							| "roo"
							| "chutes"
							| "nano-gpt"
							| "lmstudio"
							| "vscode-lm"
							| "fake-ai"
							| "human-relay"
							| "bedrock"
							| "cerebras"
							| "claude-code"
							| "doubao"
							| "deepseek"
							| "featherless"
							| "fireworks"
							| "gemini-cli"
							| "groq"
							| "moonshot"
							| "minimax"
							| "openai-native"
							| "qwen-code"
							| "virtual-quota-fallback"
							| "sambanova"
							| "vertex"
							| "xai"
							| "zai"
							| undefined
						modelId?: string | undefined
						toolStyle?: "xml" | "native" | undefined
						parentTaskId?: string | undefined
						hostname?: string | undefined
						cloudIsAuthenticated?: boolean | undefined
						diffStrategy?: string | undefined
						todos?:
							| {
									total: number
									completed: number
									inProgress: number
									pending: number
							  }
							| undefined
						currentTaskSize?: number | undefined
						taskHistorySize?: number | undefined
						repositoryUrl?: string | undefined
						repositoryName?: string | undefined
						defaultBranch?: string | undefined
						cacheReadTokens?: number | undefined
						cacheWriteTokens?: number | undefined
					}
				>
			},
			"strip",
			z.ZodTypeAny,
			{
				type: TelemetryEventName.LLM_COMPLETION
				properties: {
					language: string
					mode: string
					appName: string
					appVersion: string
					vscodeVersion: string
					platform: string
					editorName: string
					wrapped: boolean
					wrapper: string | null
					wrapperTitle: string | null
					wrapperCode: string | null
					wrapperVersion: string | null
					inputTokens: number
					outputTokens: number
					cost?: number | undefined
					isSubtask?: boolean | undefined
					taskId?: string | undefined
					apiProvider?:
						| "kilocode"
						| "openrouter"
						| "openai"
						| "anthropic"
						| "ollama"
						| "gemini"
						| "mistral"
						| "vercel-ai-gateway"
						| "huggingface"
						| "litellm"
						| "ovhcloud"
						| "inception"
						| "synthetic"
						| "sap-ai-core"
						| "deepinfra"
						| "io-intelligence"
						| "requesty"
						| "unbound"
						| "glama"
						| "roo"
						| "chutes"
						| "nano-gpt"
						| "lmstudio"
						| "vscode-lm"
						| "fake-ai"
						| "human-relay"
						| "bedrock"
						| "cerebras"
						| "claude-code"
						| "doubao"
						| "deepseek"
						| "featherless"
						| "fireworks"
						| "gemini-cli"
						| "groq"
						| "moonshot"
						| "minimax"
						| "openai-native"
						| "qwen-code"
						| "virtual-quota-fallback"
						| "sambanova"
						| "vertex"
						| "xai"
						| "zai"
						| undefined
					modelId?: string | undefined
					toolStyle?: "xml" | "native" | undefined
					parentTaskId?: string | undefined
					hostname?: string | undefined
					cloudIsAuthenticated?: boolean | undefined
					diffStrategy?: string | undefined
					todos?:
						| {
								total: number
								completed: number
								inProgress: number
								pending: number
						  }
						| undefined
					currentTaskSize?: number | undefined
					taskHistorySize?: number | undefined
					repositoryUrl?: string | undefined
					repositoryName?: string | undefined
					defaultBranch?: string | undefined
					cacheReadTokens?: number | undefined
					cacheWriteTokens?: number | undefined
				}
			},
			{
				type: TelemetryEventName.LLM_COMPLETION
				properties: {
					language: string
					mode: string
					appName: string
					appVersion: string
					vscodeVersion: string
					platform: string
					editorName: string
					wrapped: boolean
					wrapper: string | null
					wrapperTitle: string | null
					wrapperCode: string | null
					wrapperVersion: string | null
					inputTokens: number
					outputTokens: number
					cost?: number | undefined
					isSubtask?: boolean | undefined
					taskId?: string | undefined
					apiProvider?:
						| "kilocode"
						| "openrouter"
						| "openai"
						| "anthropic"
						| "ollama"
						| "gemini"
						| "mistral"
						| "vercel-ai-gateway"
						| "huggingface"
						| "litellm"
						| "ovhcloud"
						| "inception"
						| "synthetic"
						| "sap-ai-core"
						| "deepinfra"
						| "io-intelligence"
						| "requesty"
						| "unbound"
						| "glama"
						| "roo"
						| "chutes"
						| "nano-gpt"
						| "lmstudio"
						| "vscode-lm"
						| "fake-ai"
						| "human-relay"
						| "bedrock"
						| "cerebras"
						| "claude-code"
						| "doubao"
						| "deepseek"
						| "featherless"
						| "fireworks"
						| "gemini-cli"
						| "groq"
						| "moonshot"
						| "minimax"
						| "openai-native"
						| "qwen-code"
						| "virtual-quota-fallback"
						| "sambanova"
						| "vertex"
						| "xai"
						| "zai"
						| undefined
					modelId?: string | undefined
					toolStyle?: "xml" | "native" | undefined
					parentTaskId?: string | undefined
					hostname?: string | undefined
					cloudIsAuthenticated?: boolean | undefined
					diffStrategy?: string | undefined
					todos?:
						| {
								total: number
								completed: number
								inProgress: number
								pending: number
						  }
						| undefined
					currentTaskSize?: number | undefined
					taskHistorySize?: number | undefined
					repositoryUrl?: string | undefined
					repositoryName?: string | undefined
					defaultBranch?: string | undefined
					cacheReadTokens?: number | undefined
					cacheWriteTokens?: number | undefined
				}
			}
		>,
	]
>
export type RooCodeTelemetryEvent = z.infer<typeof rooCodeTelemetryEventSchema>
/**
 * TelemetryEventSubscription
 */
export type TelemetryEventSubscription =
	| {
			type: "include"
			events: TelemetryEventName[]
	  }
	| {
			type: "exclude"
			events: TelemetryEventName[]
	  }
/**
 * TelemetryPropertiesProvider
 */
export interface TelemetryPropertiesProvider {
	getTelemetryProperties(): Promise<TelemetryProperties>
}
/**
 * TelemetryClient
 */
export interface TelemetryClient {
	subscription?: TelemetryEventSubscription
	setProvider(provider: TelemetryPropertiesProvider): void
	capture(options: TelemetryEvent): Promise<void>
	captureException(error: Error, properties?: Record<string | number, unknown>): void
	updateIdentity(kilocodeToken: string): Promise<void>
	updateTelemetryState(isOptedIn: boolean): void
	isTelemetryEnabled(): boolean
	shutdown(): Promise<void>
}
//# sourceMappingURL=telemetry.d.ts.map
