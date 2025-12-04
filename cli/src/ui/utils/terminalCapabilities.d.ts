/**
 * Terminal capability detection utilities
 * Detects support for Kitty keyboard protocol and other advanced features
 */
export declare function detectKittyProtocolSupport(): Promise<boolean>
/**
 * Auto-detect and enable Kitty protocol if supported
 * Returns true if enabled, false otherwise
 */
export declare function autoEnableKittyProtocol(): Promise<boolean>
/**
 * Disable Kitty keyboard protocol
 * Must use the same flag value as enable (flag 1)
 */
export declare function disableKittyProtocol(): void
//# sourceMappingURL=terminalCapabilities.d.ts.map
