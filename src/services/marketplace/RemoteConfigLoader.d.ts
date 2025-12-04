import { type MarketplaceItem, type MarketplaceItemType } from "@roo-code/types"
export declare class RemoteConfigLoader {
	private cache
	private cacheDuration
	loadAllItems(hideMarketplaceMcps?: boolean): Promise<MarketplaceItem[]>
	private fetchModes
	private fetchMcps
	private fetchWithRetry
	getItem(id: string, type: MarketplaceItemType): Promise<MarketplaceItem | null>
	private getFromCache
	private setCache
	clearCache(): void
}
//# sourceMappingURL=RemoteConfigLoader.d.ts.map
