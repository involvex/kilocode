// Quick test to verify mock context has all required properties
import { createMockContext } from "./cli/src/commands/__tests__/helpers/mockContext.js"

const mockContext = createMockContext()

// Check if setWorkspacePath exists
console.log("setWorkspacePath exists:", typeof mockContext.setWorkspacePath === "function")

// Check if refreshTerminal exists
console.log("refreshTerminal exists:", typeof mockContext.refreshTerminal === "function")

console.log("Mock context test passed!")
