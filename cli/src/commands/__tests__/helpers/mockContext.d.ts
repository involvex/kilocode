/**
 * Test helper for creating mock CommandContext
 *
 * This utility provides a reusable mock context for command tests,
 * eliminating the need to duplicate the same mock setup across multiple test files.
 *
 * @example
 * ```typescript
 * import { createMockContext } from "./helpers/mockContext.js"
 *
 * const mockContext = createMockContext({
 *   input: "/clear",
 *   addMessage: vi.fn(),
 * })
 * ```
 */
import type { CommandContext } from "../../core/types.js"
/**
 * Creates a mock CommandContext with all required properties.
 * All functions are mocked with vi.fn() and return appropriate default values.
 *
 * @param overrides - Partial context to override default values
 * @returns A complete mock CommandContext with all required properties
 */
export declare function createMockContext(overrides?: Partial<CommandContext>): CommandContext
//# sourceMappingURL=mockContext.d.ts.map
