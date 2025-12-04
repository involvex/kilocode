import { ProviderName } from "@roo-code/types"
import { ApiMessage } from "../../../core/task-persistence"
export type ReasoningDetail = {
	type: string
	text?: string
	data?: string
	signature?: string | null
	id?: string | null
	format: string
	index?: number
}
export declare function consolidateReasoningDetails(reasoningDetails: ReasoningDetail[]): ReasoningDetail[]
export declare function maybeRemoveReasoningDetails_kilocode(
	messages: ApiMessage[],
	provider: ProviderName | undefined,
): ApiMessage[]
//# sourceMappingURL=reasoning-details.d.ts.map
