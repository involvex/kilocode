/**
 * Hook for managing model selection and provider settings
 * Provides access to available models, current configuration, and switching actions
 */
import type { RouterModels, ProviderSettings, ProviderSettingsEntry } from "../../types/messages.js"
/**
 * Return type for useModelSelection hook
 */
export interface UseModelSelectionReturn {
	/** Available router models */
	routerModels: RouterModels | null
	/** Current API configuration/provider settings */
	apiConfiguration: ProviderSettings | null
	/** Current API config profile name */
	currentConfigName: string | null
	/** List of available API config profiles */
	availableConfigs: ProviderSettingsEntry[]
	/** Current provider name */
	currentProvider: string | null
	/** Current model ID */
	currentModelId: string | null
	/** Send new API configuration */
	setApiConfiguration: (config: ProviderSettings) => Promise<void>
	/** Request router models from extension */
	refreshRouterModels: () => Promise<void>
	/** Check if a specific provider is configured */
	isProviderConfigured: (provider: string) => boolean
	/** Get model info by ID from router models */
	getModelInfo: (modelId: string) => unknown | null
}
/**
 * Hook for managing model selection and provider settings
 *
 * Provides access to the current model configuration, available models,
 * and actions for switching models or updating provider settings.
 *
 * @example
 * ```tsx
 * function ModelSelector() {
 *   const {
 *     apiConfiguration,
 *     currentProvider,
 *     currentModelId,
 *     setApiConfiguration,
 *     routerModels
 *   } = useModelSelection()
 *
 *   const handleModelChange = async (newModelId: string) => {
 *     await setApiConfiguration({
 *       ...apiConfiguration,
 *       apiModelId: newModelId
 *     })
 *   }
 *
 *   return (
 *     <div>
 *       <h3>Current: {currentProvider} - {currentModelId}</h3>
 *       <select onChange={e => handleModelChange(e.target.value)}>
 *         {routerModels?.models.map(model => (
 *           <option key={model.id} value={model.id}>
 *             {model.name}
 *           </option>
 *         ))}
 *       </select>
 *     </div>
 *   )
 * }
 * ```
 */
export declare function useModelSelection(): UseModelSelectionReturn
//# sourceMappingURL=useModelSelection.d.ts.map
