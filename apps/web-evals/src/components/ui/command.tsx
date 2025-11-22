"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

function Command({
	className,
	children,
	filter,
	shouldFilter,
	defaultValue,
	value,
	onValueChange,
	loop,
	disablePointerSelection,
	vimBindings,
}: {
	className?: string
	children?: React.ReactNode
	filter?: (value: string, search: string) => number
	shouldFilter?: boolean
	defaultValue?: string
	value?: string
	onValueChange?: (value: string) => void
	loop?: boolean
	disablePointerSelection?: boolean
	vimBindings?: boolean
}) {
	return React.createElement(
		CommandPrimitive as any,
		{
			"data-slot": "command",
			className: cn(
				"bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-sm",
				className,
			),
			filter,
			shouldFilter,
			defaultValue,
			value,
			onValueChange,
			loop,
			disablePointerSelection,
			vimBindings,
		},
		children,
	)
}

function CommandDialog({
	title = "Command Palette",
	description = "Search for a command to run...",
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	title?: string
	description?: string
	children?: React.ReactNode
}) {
	return (
		<Dialog {...props}>
			<DialogHeader className="sr-only">
				<DialogTitle>{title}</DialogTitle>
				<DialogDescription>{description}</DialogDescription>
			</DialogHeader>
			<DialogContent className="overflow-hidden p-0">
				<Command className="[&_[cmdk-group-heading]]:text-muted-foreground **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	)
}

function CommandInput({
	className,
	value,
	onValueChange,
	placeholder,
	onKeyDown,
	onFocus,
	onBlur,
	disabled,
	readOnly,
	...props
}: {
	className?: string
	value?: string
	onValueChange?: (search: string) => void
	placeholder?: string
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
	disabled?: boolean
	readOnly?: boolean
	[key: string]: any
}) {
	return (
		<div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
			<SearchIcon className="size-4 shrink-0 opacity-50" />
			{React.createElement(CommandPrimitive.Input as any, {
				"data-slot": "command-input",
				className: cn(
					"placeholder:text-muted-foreground flex h-10 w-full rounded-sm bg-transparent py-3 outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
					className,
				),
				value,
				onValueChange,
				placeholder,
				onKeyDown,
				onFocus,
				onBlur,
				disabled,
				readOnly,
				...props,
			})}
		</div>
	)
}

function CommandList({ className, children }: { className?: string; children?: React.ReactNode }) {
	return React.createElement(
		CommandPrimitive.List as any,
		{
			"data-slot": "command-list",
			className: cn("max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto", className),
		},
		children,
	)
}

function CommandEmpty({ className, children }: { className?: string; children?: React.ReactNode }) {
	return React.createElement(
		CommandPrimitive.Empty as any,
		{
			"data-slot": "command-empty",
			className: cn("py-6 text-center", className),
		},
		children,
	)
}

function CommandGroup({ className, children }: { className?: string; children?: React.ReactNode }) {
	return React.createElement(
		CommandPrimitive.Group as any,
		{
			"data-slot": "command-group",
			className: cn(
				"text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
				className,
			),
		},
		children,
	)
}

function CommandSeparator({ className, ...props }: { className?: string; [key: string]: any }) {
	return React.createElement(CommandPrimitive.Separator as any, {
		"data-slot": "command-separator",
		className: cn("bg-accent/5 -mx-1 h-px", className),
		...props,
	})
}

function CommandItem({
	className,
	children,
	value,
	onSelect,
	keywords,
	forceMount,
}: {
	className?: string
	children?: React.ReactNode
	value?: string
	onSelect?: (value: string) => void
	keywords?: string[]
	forceMount?: boolean
}) {
	return React.createElement(
		CommandPrimitive.Item as any,
		{
			"data-slot": "command-item",
			className: cn(
				"data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-xs px-2 py-1.5 outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				"text-foreground active:opacity-80 cursor-pointer group",
				className,
			),
			value,
			onSelect,
			keywords,
			forceMount,
		},
		children,
	)
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="command-shortcut"
			className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
			{...props}
		/>
	)
}

export {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator,
}
