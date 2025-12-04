import { ModelInfo } from "@roo-code/types"
import type { ModelRecord } from "../../../shared/api"
interface Deployment {
	id: string
	name: string
	model: string
	targetStatus: string
}
export interface SapAiCoreModel {
	model: string
	provider: Provider
	allowedScenarios: Scenario[]
	modelInfo: ModelInfo
	deployments?: Deployment[]
}
declare const PROVIDERS: readonly ["Amazon", "Anthropic", "Google", "OpenAI", "Mistral AI"]
export type Provider = (typeof PROVIDERS)[number]
export type Scenario = "Foundation" | "Orchestration"
export type DeploymentRecord = Record<string, Deployment>
export declare function getSapAiCoreModels(
	sapAiCoreServiceKey?: string,
	sapAiCoreResourceGroup?: string,
	sapAiCoreUseOrchestration?: boolean,
): Promise<ModelRecord>
export declare function getSapAiCoreDeployments(
	sapAiCoreServiceKey?: string,
	sapAiCoreResourceGroup?: string,
): Promise<DeploymentRecord>
/**
 * Get the provider for a given model ID
 * @param modelId - The model ID to look up
 * @returns The provider for the model, or undefined if not found
 */
export declare function getProviderForModel(modelId?: string): Provider | undefined
export {}
//# sourceMappingURL=sap-ai-core.d.ts.map
