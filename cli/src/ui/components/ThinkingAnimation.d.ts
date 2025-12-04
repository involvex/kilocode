/**
 * ThinkingAnimation - Animated spinner for "Thinking..." status
 * Uses Braille pattern characters for smooth rotation effect
 */
import React from "react"
export interface ThinkingAnimationProps {
	/** Optional text to display after the spinner */
	text?: string
}
/**
 * Displays an animated spinner with rotating Braille characters
 *
 * Features:
 * - Smooth rotation using Braille pattern characters
 * - 80ms frame interval for optimal visual appeal
 * - Uses vibrant brand color instead of dimmed text
 * - Proper cleanup to prevent memory leaks
 */
export declare const ThinkingAnimation: React.FC<ThinkingAnimationProps>
//# sourceMappingURL=ThinkingAnimation.d.ts.map
