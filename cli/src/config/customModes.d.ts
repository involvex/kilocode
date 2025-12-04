/**
 * Custom modes loader
 * Loads custom modes from global and project-specific configuration files
 */
import type { ModeConfig } from "../types/messages.js"
/**
 * Load all custom modes (global + project)
 * Project modes override global modes with the same slug
 * @param workspace - Workspace directory path
 * @returns Array of all custom mode configurations
 */
export declare function loadCustomModes(workspace: string): Promise<ModeConfig[]>
//# sourceMappingURL=customModes.d.ts.map
