// Fix for @vscode/webview-ui-toolkit/react ReactWrapper typing issue
declare module "@vscode/webview-ui-toolkit/react" {
	import * as React from "react"

	export const VSCodeButton: React.FC<{
		children?: React.ReactNode
		onClick?: () => void
		appearance?: string
		"data-testid"?: string
		className?: string
		disabled?: boolean
		type?: string
	}>

	export const VSCodeLink: React.FC<{
		children?: React.ReactNode
		href?: string
		onClick?: (e: React.MouseEvent) => void
		className?: string
		"data-testid"?: string
		style?: React.CSSProperties
	}>

	export const VSCodeCheckbox: React.FC<{
		checked?: boolean
		onChange?: (checked: boolean) => void
		children?: React.ReactNode
		"data-testid"?: string
		className?: string
		disabled?: boolean
	}>

	export const VSCodeTextField: React.FC<{
		value?: string
		onInput?: (e: { target: { value: string } }) => void
		onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
		placeholder?: string
		children?: React.ReactNode
		"data-testid"?: string
		type?: string
		className?: string
		disabled?: boolean
	}>

	export const VSCodeTextArea: React.FC<{
		value?: string
		onInput?: (e: { target: { value: string } }) => void
		onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
		placeholder?: string
		children?: React.ReactNode
		"data-testid"?: string
		rows?: number
		className?: string
		disabled?: boolean
	}>

	export const VSCodeOption: React.FC<{
		children?: React.ReactNode
		value?: string
		"data-testid"?: string
	}>

	export const VSCodeRadio: React.FC<{
		value?: string
		checked?: boolean
		onChange?: () => void
		children?: React.ReactNode
		"data-testid"?: string
		name?: string
	}>

	export const VSCodeRadioGroup: React.FC<{
		children?: React.ReactNode
		value?: string
		onChange?: (value: string) => void
		"data-testid"?: string
		name?: string
	}>

	export const VSCodeBadge: React.FC<{
		children?: React.ReactNode
		"data-testid"?: string
		className?: string
	}>

	export const VSCodePanels: React.FC<{
		children?: React.ReactNode
		"data-testid"?: string
		className?: string
	}>

	export const VSCodePanelTab: React.FC<{
		children?: React.ReactNode
		"data-testid"?: string
		id?: string
	}>

	export const VSCodePanelView: React.FC<{
		children?: React.ReactNode
		"data-testid"?: string
	}>
}
