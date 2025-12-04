export interface ApprovalResult {
	isApproved: boolean
	newOutput: boolean
}
export declare function checkApproval(
	category: string,
	testName: string,
	input: string,
	output: string,
	skipApproval?: boolean,
): Promise<ApprovalResult>
//# sourceMappingURL=approvals.d.ts.map
