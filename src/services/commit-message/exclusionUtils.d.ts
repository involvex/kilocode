/**
 * Determines if a file should be excluded from git diffs based on lock file patterns.
 * This function specifically handles package manager lock files and build artifacts
 * that typically shouldn't be included in commit message generation.
 *
 * @param filename - The filename to check (can be a full path or just filename)
 * @returns boolean - true if the file should be excluded from git diffs
 */
export declare function shouldExcludeLockFile(filePath: string): boolean
//# sourceMappingURL=exclusionUtils.d.ts.map
