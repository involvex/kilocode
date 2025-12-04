/**
 * Given an async iterable, re-yield the chunks into line chunks
 */
export declare function chunksToLinesAsync(chunks: AsyncIterable<string>): AsyncIterable<string>
/**
 * Combines multiple async iterables into a single async iterable, interleaving
 * the values over time. Adapted from: https://stackoverflow.com/a/50586391
 */
export declare function combine<T>(...iterable: Array<AsyncIterable<T>>): AsyncIterable<T>
//# sourceMappingURL=iterable.d.ts.map
