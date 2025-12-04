/**
 * ApprovalMenu component - displays approval/rejection options
 * Similar to AutocompleteMenu but for approve/reject actions
 */
import React from "react"
import type { ApprovalOption } from "../../state/atoms/approval.js"
interface ApprovalMenuProps {
	options: ApprovalOption[]
	selectedIndex: number
	visible: boolean
}
export declare const ApprovalMenu: React.FC<ApprovalMenuProps>
export {}
//# sourceMappingURL=ApprovalMenu.d.ts.map
