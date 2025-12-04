import { MinimalConfigProvider } from "../autocomplete/MinimalConfig.js"
export class FakeConfigHandler extends MinimalConfigProvider {
	/** Track calls to onConfigUpdate for assertions */
	configUpdateCallbacks = []
	constructor(options = {}) {
		// Build config from options
		const autocompleteModel = options.autocompleteModel
		const config = {
			tabAutocompleteOptions: options.tabAutocompleteOptions,
			experimental: {
				enableStaticContextualization: options.enableStaticContextualization ?? false,
			},
			modelsByRole: {
				autocomplete: autocompleteModel ? [autocompleteModel] : [],
			},
			selectedModelByRole: {
				autocomplete: autocompleteModel,
			},
			...options.config,
		}
		// Call parent constructor with merged config
		super(config)
		// Set profile if provided
		if (options.profileType) {
			this.currentProfile = {
				profileDescription: {
					profileType: options.profileType,
				},
			}
		}
	}
	/**
	 * Register config update handler
	 * Overrides parent to track callbacks for test assertions
	 */
	onConfigUpdate(handler) {
		this.configUpdateCallbacks.push(handler)
	}
}
//# sourceMappingURL=FakeConfigHandler.js.map
