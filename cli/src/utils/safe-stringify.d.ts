/**
 * Safe JSON stringification utility that handles circular references,
 * Error objects, and other special types.
 */
/**
 * Safe stringify that handles circular references, Error objects, Dates, RegExp, etc.
 * Returns a serializable version of the object.
 */
export declare function safeStringify(obj: unknown, seen?: WeakSet<object>): unknown
/**
 * Convert an argument to a string representation, handling circular references
 * and special types. This is specifically designed for console logging.
 */
export declare function argToString(arg: unknown): string
/**
 * Convert multiple arguments to a single string message, handling circular references
 */
export declare function argsToMessage(args: unknown[]): string
//# sourceMappingURL=safe-stringify.d.ts.map
