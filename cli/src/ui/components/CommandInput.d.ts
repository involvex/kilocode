/**
 * CommandInput component - input field with autocomplete, approval, and followup suggestions support
 * Updated to use useCommandInput, useWebviewMessage, useApprovalHandler, and useFollowupSuggestions hooks
 */
import React from "react"
interface CommandInputProps {
	onSubmit: (value: string) => void
	placeholder?: string
	disabled?: boolean
}
export declare const CommandInput: React.FC<CommandInputProps>
export {}
//# sourceMappingURL=CommandInput.d.ts.map
