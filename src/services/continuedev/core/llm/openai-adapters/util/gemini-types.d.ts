import { ChatCompletionTool } from "openai/resources/index.mjs"
type GeminiObjectSchemaType = "TYPE_UNSPECIFIED" | "STRING" | "NUMBER" | "INTEGER" | "BOOLEAN" | "ARRAY" | "OBJECT"
interface GeminiObjectSchema {
	type: GeminiObjectSchemaType
	format?: string
	title?: string
	description?: string
	nullable?: boolean
	enum?: string[]
	maxItems?: string
	minItems?: string
	properties?: Record<string, GeminiObjectSchema>
	required?: string[]
	anyOf?: GeminiObjectSchema[]
	propertyOrdering?: string[]
	items?: GeminiObjectSchema
	minimum?: number
	maximum?: number
}
export declare function convertOpenAIToolToGeminiFunction(tool: ChatCompletionTool): GeminiToolFunctionDeclaration
type GeminiTextContentPart = {
	text: string
}
type GeminiInlineDataContentPart = {
	inlineData: {
		mimeType: string
		data: string
	}
}
type GeminiFunctionCallContentPart = {
	functionCall: {
		id?: string
		name: string
		args: unknown
	}
}
type GeminiFunctionResponseContentPart = {
	functionResponse: {
		id?: string
		name: string
		response: unknown
	}
}
type GeminiFileDataContentPart = {
	fileData: {
		fileUri: string
		mimeType: string
	}
}
type GeminiExecutableCodeContentPart = {
	executableCode: {
		language: "PYTHON" | "LANGUAGE_UNSPECIFIED"
		code: string
	}
}
type GeminiCodeExecutionResultContentPart = {
	codeExecutionResult: {
		outcome: "OUTCOME_UNSPECIFIED" | "OUTCOME_OK" | "OUTCOME_FAILED" | "OUTCOME_DEADLINE_EXCEEDED"
		output: string
	}
}
export type GeminiChatContentPart =
	| GeminiTextContentPart
	| GeminiInlineDataContentPart
	| GeminiFunctionCallContentPart
	| GeminiFunctionResponseContentPart
	| GeminiFileDataContentPart
	| GeminiExecutableCodeContentPart
	| GeminiCodeExecutionResultContentPart
export interface GeminiChatContent {
	role?: "user" | "model"
	parts: GeminiChatContentPart[]
}
export interface GeminiToolFunctionDeclaration {
	name: string
	description: string
	parameters?: GeminiObjectSchema
	response?: GeminiObjectSchema
}
export {}
//# sourceMappingURL=gemini-types.d.ts.map
