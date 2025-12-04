import React from "react"
import { type TerminalRendererOptions } from "marked-terminal"
export type MarkdownTextProps = TerminalRendererOptions & {
	children: string
}
/**
 * MarkdownText Component with Adaptive Typewriter Effect
 *
 * A wrapper component that renders markdown text in Ink terminals with an intelligent
 * typewriter animation that adapts to streaming content speed.
 *
 * ## Features
 *
 * ### Adaptive Speed Animation
 * The typewriter effect dynamically adjusts speed based on ALL remaining unrendered text:
 *
 * - **Speed calculation**: Uses time since last chunk ÷ remaining unrendered characters
 * - **Dynamic adjustment**: Recalculates on each new chunk to catch up if needed
 * - **Very fast** (< 8ms/char): Shows many characters per 8ms update
 * - **Fast** (8-15ms/char): Shows 2-3 characters per 10ms update
 * - **Normal** (15-30ms/char): Shows 1 character per update at natural pace
 * - **Slow** (> 30ms/char): Shows 1 character per slower update (max 40ms)
 *
 * This ensures the animation stays synchronized even with variable chunk speeds:
 * - If first chunk is slow, starts slow
 * - If next chunk arrives faster, speeds up to catch up with ALL remaining text
 * - Uses 98% of available time per chunk to stay synchronized
 * - No content gets "dumped" at the end when streaming stops
 *
 * ### Intelligent Chunk Detection
 * - Automatically detects when new content is appended (streaming scenario)
 * - Handles complete content replacement (new message scenario)
 * - Shows initial content immediately without animation
 *
 * ### Performance Optimizations
 * - Markdown parsing occurs once per displayed text update (not per character)
 * - Uses refs to track state without causing unnecessary re-renders
 * - Efficient timer cleanup on unmount
 *
 * ### Edge Case Handling
 * - Empty or whitespace content: Returns null immediately
 * - Content replacement: Shows new content right away
 * - Rapid updates: Continues animation smoothly through new chunks
 *
 * ## Usage
 *
 * ```tsx
 * // Basic usage
 * <MarkdownText>**Hello** World</MarkdownText>
 *
 * // With streaming updates
 * <MarkdownText>{streamingContent}</MarkdownText>
 *
 * // With TerminalRenderer options
 * <MarkdownText width={80} reflowText={true}>
 *   # Heading
 * </MarkdownText>
 * ```
 *
 * @param children - The markdown content to render
 * @param options - Optional TerminalRenderer configuration
 * @returns Rendered markdown text with typewriter animation for streaming content
 */
export declare const MarkdownText: React.FC<MarkdownTextProps>
//# sourceMappingURL=MarkdownText.d.ts.map
