import { ClineMessage } from "@roo-code/types"
export declare const BASE_TIMESTAMP = 1704110400000
/**
 * Create mock messages for a typical component creation task
 * Shows realistic timing patterns for development workflows
 */
export declare const createComponentCreationMessages: () => ClineMessage[]
/**
 * Create mock messages for a debugging workflow
 * Shows error handling and recovery patterns
 */
export declare const createDebuggingMessages: () => ClineMessage[]
/**
 * Create mock messages for a complex full-stack development task
 * Shows extended workflow with many varied operations
 */
export declare const createFullStackMessages: () => ClineMessage[]
/**
 * Create mock messages for TaskHeader stories
 * Shows a realistic agent workflow with proper read/write ratios
 */
export declare const createTaskHeaderMessages: () => ClineMessage[]
/**
 * Create a mock task message for TaskHeader stories
 */
export declare const createMockTask: () => ClineMessage
/**
 * Create mock messages for a very quick task
 * Shows minimum timing constraints and fast operations
 */
export declare const createQuickTaskMessages: () => ClineMessage[]
/**
 * Create mock messages for testing different message types
 * Includes examples of all message types supported by the timeline registry
 */
export declare const createMessageTypeVarietyMessages: () => ClineMessage[]
//# sourceMappingURL=clineMessages.d.ts.map
