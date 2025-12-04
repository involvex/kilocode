export declare class AutocompleteLruCacheInMem {
	private static capacity
	private cache
	private constructor()
	static get(): Promise<AutocompleteLruCacheInMem>
	get(prefix: string): Promise<string | undefined>
	put(prefix: string, completion: string): Promise<void>
}
//# sourceMappingURL=AutocompleteLruCacheInMem.d.ts.map
