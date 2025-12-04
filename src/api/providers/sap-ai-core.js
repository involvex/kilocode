import { convertToOpenAiMessages } from "../transform/openai-format"
import { BaseProvider } from "./base-provider"
// SAP AI SDK imports
import { OrchestrationClient } from "@sap-ai-sdk/orchestration"
import { AzureOpenAiChatClient } from "@sap-ai-sdk/foundation-models"
import { openAiModelInfoSaneDefaults } from "@roo-code/types"
import { getProviderForModel, getSapAiCoreModels } from "./fetchers/sap-ai-core"
/**
 * SAP AI Core provider supporting both Orchestration and Foundation Models modes
 */
export class SapAiCoreHandler extends BaseProvider {
	options
	providerName = "SAP AI Core"
	isAiCoreEnvSetup = false
	backend
	modelCache = null
	constructor(options) {
		super()
		this.options = options
		this.backend = this.createBackend()
		// Fetch models asynchronously
		this.fetchModels()
	}
	async *createMessage(systemPrompt, messages, _) {
		this.ensureAiCoreEnvSetup()
		yield* this.backend.createMessage(systemPrompt, messages)
	}
	async completePrompt(prompt) {
		this.ensureAiCoreEnvSetup()
		try {
			return await this.backend.completePrompt(prompt)
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`${this.providerName} completion error: ${error.message}`)
			}
			throw error
		}
	}
	async fetchModels() {
		try {
			this.modelCache = await getSapAiCoreModels(
				this.options.sapAiCoreServiceKey,
				this.options.sapAiCoreResourceGroup,
				this.options.sapAiCoreUseOrchestration,
			)
		} catch (error) {
			console.error("Failed to fetch SAP AI Core models:", error)
		}
	}
	getModel() {
		const modelId = this.options.sapAiCoreModelId || "gpt-4o"
		// Try to get model info from cache
		const modelInfo = this.modelCache?.[modelId]
		if (modelInfo) {
			return {
				id: modelId,
				info: modelInfo,
			}
		}
		// Fallback to default values if model not found in cache
		return {
			id: modelId,
			info: openAiModelInfoSaneDefaults,
		}
	}
	createBackend() {
		const useOrchestration = this.options.sapAiCoreUseOrchestration ?? false
		if (useOrchestration) {
			return new OrchestrationBackend(this.options)
		} else {
			return new FoundationBackend(this.options)
		}
	}
	ensureAiCoreEnvSetup() {
		if (this.isAiCoreEnvSetup) {
			return
		}
		process.env["AICORE_SERVICE_KEY"] = this.options.sapAiCoreServiceKey
		this.isAiCoreEnvSetup = true
	}
}
// Base class for all SAP AI Core backends
class SapAiCoreBackend {
	options
	constructor(options) {
		this.options = options
	}
	processUsageMetrics(tokenUsage) {
		return {
			type: "usage",
			inputTokens: tokenUsage?.prompt_tokens || 0,
			outputTokens: tokenUsage?.completion_tokens || 0,
			cacheWriteTokens: tokenUsage?.cache_creation_input_tokens || undefined,
			cacheReadTokens: tokenUsage?.cache_read_input_tokens || undefined,
		}
	}
	getModelParams() {
		const params = {}
		if (this.options.modelTemperature !== undefined) {
			params.temperature = this.options.modelTemperature
		}
		if (this.options.modelMaxTokens) {
			params.max_tokens = this.options.modelMaxTokens
		}
		return Object.keys(params).length > 0 ? params : undefined
	}
}
// Orchestration backend implementation
class OrchestrationBackend extends SapAiCoreBackend {
	async *createMessage(systemPrompt, messages) {
		try {
			const modelId = this.options.sapAiCoreModelId
			const orchestrationClient = this.createOrchestrationClient(modelId, systemPrompt)
			const chatMessages = this.convertToOrchestrationMessages(messages)
			const response = await orchestrationClient.stream({
				messages: chatMessages,
			})
			for await (const chunk of response.stream.toContentStream()) {
				yield { type: "text", text: chunk }
			}
			const tokenUsage = response.getTokenUsage()
			if (tokenUsage) {
				yield this.processUsageMetrics(tokenUsage)
			}
		} catch (error) {
			console.error("Error in SAP orchestration mode:", error)
			throw error
		}
	}
	async completePrompt(prompt) {
		const modelId = this.options.sapAiCoreModelId
		const orchestrationClient = this.createOrchestrationClient(modelId)
		const response = await orchestrationClient.chatCompletion({
			messages: [{ role: "user", content: prompt }],
		})
		return response.getContent() || ""
	}
	createOrchestrationClient(modelName, systemPrompt) {
		const config = {
			promptTemplating: {
				model: {
					name: modelName,
					...(this.getModelParams() && { params: this.getModelParams() }),
				},
				...(systemPrompt && {
					prompt: {
						template: [
							{
								role: "system",
								content: systemPrompt,
							},
						],
					},
				}),
			},
		}
		const resourceGroup = this.options.sapAiCoreResourceGroup ?? "default"
		const resourceGroupConfig = { resourceGroup: resourceGroup }
		return new OrchestrationClient(config, resourceGroupConfig)
	}
	convertToOrchestrationMessages(messages) {
		return convertToOpenAiMessages(messages)
	}
}
// Foundation backend that routes to appropriate provider
class FoundationBackend extends SapAiCoreBackend {
	providerBackend
	constructor(options) {
		super(options)
		this.providerBackend = this.createProviderBackend()
	}
	async *createMessage(systemPrompt, messages) {
		yield* this.providerBackend.createMessage(systemPrompt, messages)
	}
	async completePrompt(prompt) {
		return this.providerBackend.completePrompt(prompt)
	}
	createProviderBackend() {
		const provider = this.getModelProvider()
		switch (provider) {
			case "OpenAI":
				return new OpenAIFoundationBackend(this.options)
			case "Anthropic":
				throw new Error("Anthropic foundation models not yet supported")
			case "Google":
				throw new Error("Google foundation models not yet supported")
			case "Amazon":
				throw new Error("Amazon foundation models not yet supported")
			case "Mistral AI":
				throw new Error("Mistral foundation models not yet supported")
			default:
				throw new Error(`Unsupported provider: ${provider}`)
		}
	}
	getModelProvider() {
		return getProviderForModel(this.options.sapAiCoreModelId)
	}
}
// OpenAI Foundation backend
class OpenAIFoundationBackend extends SapAiCoreBackend {
	async *createMessage(systemPrompt, messages) {
		const foundationClient = this.createOpenAIClient()
		const chatMessages = this.convertToFoundationMessages(systemPrompt, messages)
		const response = await foundationClient.stream({
			messages: chatMessages,
		})
		for await (const chunk of response.stream.toContentStream()) {
			yield { type: "text", text: chunk }
		}
		const tokenUsage = response.getTokenUsage()
		if (tokenUsage) {
			yield this.processUsageMetrics(tokenUsage)
		}
	}
	async completePrompt(prompt) {
		const foundationClient = this.createOpenAIClient()
		const response = await foundationClient.run({
			messages: [{ role: "user", content: prompt }],
		})
		return response.getContent() || ""
	}
	createOpenAIClient() {
		const deploymentId = this.options.sapAiCoreDeploymentId ?? ""
		const resourceGroup = this.options.sapAiCoreResourceGroup ?? "default"
		return new AzureOpenAiChatClient({
			deploymentId: deploymentId,
			resourceGroup: resourceGroup,
		})
	}
	convertToFoundationMessages(systemPrompt, messageParams) {
		const convertedMessages = messageParams.map((param) => {
			let content
			if (typeof param.content === "string") {
				content = param.content
			} else if (Array.isArray(param.content)) {
				content = param.content
					.map((block) => {
						if (block.type === "text") {
							return block.text
						} else if (block.type === "image") {
							return "[Image content]"
						}
						return ""
					})
					.join("\n")
			} else {
				content = ""
			}
			let role
			switch (param.role) {
				case "user":
					role = "user"
					break
				case "assistant":
					role = "assistant"
					break
				default:
					role = "system"
			}
			return { role, content }
		})
		return [{ role: "system", content: systemPrompt }, ...convertedMessages]
	}
}
//# sourceMappingURL=sap-ai-core.js.map
