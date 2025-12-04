/**
 * Simple consent event system
 * Dispatches events when cookie consent changes
 */
export declare const CONSENT_EVENT = "cookieConsentChanged"
/**
 * Check if user has given consent for analytics cookies
 * Uses react-cookie-consent's built-in function
 */
export declare function hasConsent(): boolean
/**
 * Dispatch a consent change event
 */
export declare function dispatchConsentEvent(consented: boolean): void
/**
 * Listen for consent changes
 */
export declare function onConsentChange(callback: (consented: boolean) => void): () => void
/**
 * Handle user accepting cookies
 * Opts PostHog back into cookie-based tracking
 */
export declare function handleConsentAccept(): void
/**
 * Handle user rejecting cookies
 * Switches PostHog to cookieless (memory-only) mode
 */
export declare function handleConsentReject(): void
//# sourceMappingURL=consent-manager.d.ts.map
