# Fix CodeIndexPopover.tsx Accessibility Issues

## Problems Identified:

1. **Line ~717**: Button type attribute has not been set
2. **Line ~717**: ARIA attributes must conform to valid values: Invalid ARIA attribute value: aria-expanded="{expression}"

## Root Cause:

Two disclosure buttons (Setup Settings and Advanced Settings) are missing:

- `type="button"` attribute (buttons inside forms default to type="submit")
- Proper ARIA attribute syntax for `aria-expanded` (should be `={expression}` not `="{expression}"`)

## Target Files:

- `webview-ui/src/components/chat/CodeIndexPopover.tsx`

## Solution:

Add `type="button"` and fix the `aria-expanded` attribute syntax for both disclosure buttons.

## Status: Ready for implementation
