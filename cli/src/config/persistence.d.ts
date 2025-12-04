import type { CLIConfig } from "./types.js"
import { type ValidationResult } from "./validation.js"
/**
 * Result of loading config, includes both the config and validation status
 */
export interface ConfigLoadResult {
	config: CLIConfig
	validation: ValidationResult
}
export declare const CONFIG_DIR: string
export declare const CONFIG_FILE: string
export declare function setConfigPaths(dir: string, file: string): void
export declare function resetConfigPaths(): void
export declare function ensureConfigDir(): Promise<void>
export declare function getKiloToken(config: CLIConfig): string | null | undefined
export declare function loadConfig(): Promise<ConfigLoadResult>
export declare function saveConfig(config: CLIConfig, skipValidation?: boolean): Promise<void>
export declare function getConfigPath(): string
export declare function configExists(): Promise<boolean>
//# sourceMappingURL=persistence.d.ts.map
