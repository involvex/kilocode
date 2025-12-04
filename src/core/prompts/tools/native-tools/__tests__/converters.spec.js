import { describe, it, expect } from "vitest"
import { convertOpenAIToolToAnthropic, convertOpenAIToolsToAnthropic } from "../converters"
describe("converters", () => {
	describe("convertOpenAIToolToAnthropic", () => {
		it("should convert a simple OpenAI tool to Anthropic format", () => {
			const openAITool = {
				type: "function",
				function: {
					name: "get_weather",
					description: "Get the current weather in a location",
					parameters: {
						type: "object",
						properties: {
							location: {
								type: "string",
								description: "The city and state",
							},
						},
						required: ["location"],
					},
				},
			}
			const result = convertOpenAIToolToAnthropic(openAITool)
			expect(result).toEqual({
				name: "get_weather",
				description: "Get the current weather in a location",
				input_schema: {
					type: "object",
					properties: {
						location: {
							type: "string",
							description: "The city and state",
						},
					},
					required: ["location"],
				},
			})
		})
		it("should handle tools with empty description", () => {
			const openAITool = {
				type: "function",
				function: {
					name: "test_tool",
					parameters: {
						type: "object",
						properties: {},
					},
				},
			}
			const result = convertOpenAIToolToAnthropic(openAITool)
			expect(result.name).toBe("test_tool")
			expect(result.description).toBe("")
			expect(result.input_schema).toEqual({
				type: "object",
				properties: {},
			})
		})
		it("should throw error for non-function tool types", () => {
			const customTool = {
				type: "custom",
			}
			expect(() => convertOpenAIToolToAnthropic(customTool)).toThrow("Unsupported tool type: custom")
		})
		it("should preserve complex parameter schemas", () => {
			const openAITool = {
				type: "function",
				function: {
					name: "read_file",
					description: "Read files",
					parameters: {
						type: "object",
						properties: {
							files: {
								type: "array",
								items: {
									type: "object",
									properties: {
										path: { type: "string" },
										line_ranges: {
											type: ["array", "null"],
											items: { type: "string", pattern: "^[0-9]+-[0-9]+$" },
										},
									},
									required: ["path", "line_ranges"],
								},
							},
						},
						required: ["files"],
						additionalProperties: false,
					},
				},
			}
			const result = convertOpenAIToolToAnthropic(openAITool)
			expect(result.input_schema).toEqual(openAITool.function.parameters)
		})
	})
	describe("convertOpenAIToolsToAnthropic", () => {
		it("should convert multiple tools", () => {
			const openAITools = [
				{
					type: "function",
					function: {
						name: "tool1",
						description: "First tool",
						parameters: { type: "object", properties: {} },
					},
				},
				{
					type: "function",
					function: {
						name: "tool2",
						description: "Second tool",
						parameters: { type: "object", properties: {} },
					},
				},
			]
			const results = convertOpenAIToolsToAnthropic(openAITools)
			expect(results).toHaveLength(2)
			expect(results[0].name).toBe("tool1")
			expect(results[1].name).toBe("tool2")
		})
		it("should handle empty array", () => {
			const results = convertOpenAIToolsToAnthropic([])
			expect(results).toEqual([])
		})
	})
})
//# sourceMappingURL=converters.spec.js.map
