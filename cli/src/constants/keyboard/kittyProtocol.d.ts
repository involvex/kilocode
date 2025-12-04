/**
 * Kitty keyboard protocol constants
 * Based on: https://sw.kovidgoyal.net/kitty/keyboard-protocol/
 */
export declare const KITTY_MODIFIER_BASE = 1
export declare const KITTY_MODIFIER_EVENT_TYPES_OFFSET = 128
export declare const MODIFIER_SHIFT_BIT = 1
export declare const MODIFIER_ALT_BIT = 2
export declare const MODIFIER_CTRL_BIT = 4
export declare const MODIFIER_SUPER_BIT = 8
export declare const MODIFIER_HYPER_BIT = 16
export declare const MODIFIER_META_BIT = 32
export declare const MODIFIER_CAPS_LOCK_BIT = 64
export declare const MODIFIER_NUM_LOCK_BIT = 128
export declare const EVENT_TYPE_PRESS = 1
export declare const EVENT_TYPE_REPEAT = 2
export declare const EVENT_TYPE_RELEASE = 3
export declare const BACKSLASH_ENTER_DETECTION_WINDOW_MS = 50
export declare const PASTE_DETECTION_TIMEOUT_MS = 10
export declare const MAX_KITTY_SEQUENCE_LENGTH = 32
export declare const KITTY_SEQUENCE_OVERFLOW_THRESHOLD = 64
export declare const KITTY_CTRL_C = "\u0003"
export declare const KITTY_CSI_U_TERMINATOR = "u"
export declare const KITTY_CSI_TILDE_TERMINATOR = "~"
export declare const KITTY_PROTOCOL_VERSION = 1
export declare const KITTY_FLAG_DISAMBIGUATE = 1
export declare const KITTY_FLAG_REPORT_EVENTS = 2
export declare const KITTY_FLAG_REPORT_ALTERNATE = 4
export declare const KITTY_FLAG_REPORT_ALL_KEYS = 8
export declare const KITTY_FLAG_REPORT_TEXT = 16
export declare const KITTY_DEFAULT_FLAGS = 1
//# sourceMappingURL=kittyProtocol.d.ts.map
