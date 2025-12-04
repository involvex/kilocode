/**
 * Config synchronization atoms
 * Handles syncing CLI configuration to the extension
 *
 * This module is separate to avoid circular dependencies between config.ts and effects.ts
 */
/**
 * Effect atom to sync CLI configuration to the extension
 * This sends configuration updates to the extension when config changes
 */
export declare const syncConfigToExtensionEffectAtom: import("jotai").WritableAtom<null, [], Promise<void>> & {
	init: null
}
//# sourceMappingURL=config-sync.d.ts.map
