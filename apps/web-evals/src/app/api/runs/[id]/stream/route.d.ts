import type { NextRequest } from "next/server"
export declare const dynamic = "force-dynamic"
export declare function GET(
	request: NextRequest,
	{
		params,
	}: {
		params: Promise<{
			id: string
		}>
	},
): Promise<any>
//# sourceMappingURL=route.d.ts.map
