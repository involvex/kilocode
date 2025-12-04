/**
 * Streams a Response body as UTF-8 text chunks.
 *
 * Modern implementation using native ReadableStream and TextDecoderStream APIs.
 * Requires Node.js 18+ or modern browsers.
 */
export declare function streamResponse(response: Response): AsyncGenerator<string>
/**
 * Streams Server-Sent Events (SSE) from a Response.
 * Parses SSE format and yields parsed data objects.
 */
export declare function streamSse(response: Response): AsyncGenerator<any>
/**
 * Streams newline-delimited JSON from a Response.
 * Each line should be a complete JSON object.
 */
export declare function streamJSON(response: Response): AsyncGenerator<any>
//# sourceMappingURL=stream.d.ts.map
