import { LineStream } from "../../../diff/util"
import { lineIsRepeated } from "../../util/textSimilarity"
export { lineIsRepeated }
export type LineFilter = (args: { lines: LineStream; fullStop: () => void }) => LineStream
export type CharacterFilter = (args: {
	chars: AsyncGenerator<string>
	prefix: string
	suffix: string
	filepath: string
	multiline: boolean
}) => AsyncGenerator<string>
export declare const PREFIXES_TO_SKIP: string[]
export declare const LINES_TO_STOP_AT: string[]
/**
 * Filter out lines starting with "// Path: <PATH>" which models sometimes echo.
 */
export declare function avoidPathLine(stream: LineStream, comment?: string): LineStream
/**
 * Filter out empty comment-only lines.
 */
export declare function avoidEmptyComments(stream: LineStream, comment?: string): LineStream
/**
 * Insert "\n" separators between streamed lines.
 */
export declare function streamWithNewLines(stream: LineStream): LineStream
/**
 * Yield until a line equals or is very similar to the provided line, then call fullStop.
 * If the provided line ends with a bracket/semicolon, allow exact trimmed matches to pass through.
 */
export declare function stopAtSimilarLine(
	stream: LineStream,
	line: string,
	fullStop: () => void,
): AsyncGenerator<string>
/**
 * Yield until any of the stop phrases is encountered in a valid context, then call fullStop.
 */
export declare function stopAtLines(stream: LineStream, fullStop: () => void, linesToStopAt?: string[]): LineStream
/**
 * Yield until an exact stop line is encountered, then call fullStop.
 */
export declare function stopAtLinesExact(stream: LineStream, fullStop: () => void, linesToStopAt: string[]): LineStream
/**
 * On the first line only, strip any configured prefix (e.g. "<COMPLETION>").
 */
export declare function skipPrefixes(lines: LineStream): LineStream
/**
 * Yield lines until a line repeats 3 times consecutively. Only the first of the repeats is yielded.
 */
export declare function stopAtRepeatingLines(lines: LineStream, fullStop: () => void): LineStream
/**
 * Pass through lines, but if the stream takes longer than ms after we have at least one non-empty line, stop early.
 */
export declare function showWhateverWeHaveAtXMs(lines: LineStream, ms: number): LineStream
/**
 * Yield lines until the first blank line after some content; then stop.
 */
export declare function noDoubleNewLine(lines: LineStream): LineStream
//# sourceMappingURL=lineStream.d.ts.map
