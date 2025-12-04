/**
 * Test for the specific race condition bug where command messages
 * with partial=true never transition to partial=false
 *
 * Bug scenario:
 * 1. Extension sends messageUpdated with partial=false
 * 2. Extension sends state update with stale partial=true version
 * 3. CLI should keep the partial=false version, not revert to partial=true
 */
export {}
//# sourceMappingURL=partial-race-condition.test.d.ts.map
