import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
	// eslint-disable-next-line react/prop-types
	({ className, style, ...props }, ref) => (
		<div className="relative w-full overflow-auto">
			<table
				ref={ref}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				style={style as any}
				className={cn("w-full caption-bottom text-sm", className)}
				{...props}
			/>
		</div>
	),
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	// eslint-disable-next-line react/prop-types
	({ className, style, ...props }, ref) => (
		<thead
			ref={ref}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			style={style as any}
			className={cn("[&_tr]:border-b", className)}
			{...props}
		/>
	),
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	// eslint-disable-next-line react/prop-types
	({ className, style, ...props }, ref) => (
		<tbody
			ref={ref}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			style={style as any}
			className={cn("[&_tr:last-child]:border-0", className)}
			{...props}
		/>
	),
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	// eslint-disable-next-line react/prop-types
	({ className, style, ...props }, ref) => (
		<tfoot
			ref={ref}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			style={style as any}
			className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
			{...props}
		/>
	),
)
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
	// eslint-disable-next-line react/prop-types
	({ className, style, ...props }, ref) => (
		<tr
			ref={ref}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			style={style as any}
			className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)}
			{...props}
		/>
	),
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
	// eslint-disable-next-line react/prop-types
	({ className, style, ...props }, ref) => (
		<th
			ref={ref}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			style={style as any}
			className={cn(
				"h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	),
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
	// eslint-disable-next-line react/prop-types
	({ className, style, ...props }, ref) => (
		<td
			ref={ref}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			style={style as any}
			className={cn(
				"p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
				className,
			)}
			{...props}
		/>
	),
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
	// eslint-disable-next-line react/prop-types
	({ className, style, ...props }, ref) => (
		<caption
			ref={ref}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			style={style as any}
			className={cn("mt-4 text-sm text-muted-foreground", className)}
			{...props}
		/>
	),
)
TableCaption.displayName = "TableCaption"

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
