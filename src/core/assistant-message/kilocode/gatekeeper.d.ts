import { Task } from "../../task/Task"
/**
 * Evaluates whether an action should be approved using an AI gatekeeper model.
 * This is used in YOLO mode to provide a safety layer instead of blindly approving everything.
 *
 * @param cline - The task instance
 * @param toolName - The name of the tool being used
 * @param toolParams - The parameters for the tool
 * @returns Promise<boolean> - true if approved, false if denied, defaults to true on error
 */
export declare function evaluateGatekeeperApproval(
	cline: Task,
	toolName: string,
	toolParams: Record<string, any>,
): Promise<boolean>
//# sourceMappingURL=gatekeeper.d.ts.map
