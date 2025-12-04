export declare function findUriInDirs(
	uri: string,
	dirUriCandidates: string[],
): {
	uri: string
	relativePathOrBasename: string
	foundInDir: string | null
}
export declare function getUriPathBasename(uri: string): string
export declare function getUriFileExtension(uri: string): string
export declare function getLastNUriRelativePathParts(dirUriCandidates: string[], uri: string, n: number): string
export declare function joinPathsToUri(uri: string, ...pathSegments: string[]): string
export declare function getShortestUniqueRelativeUriPaths(
	uris: string[],
	dirUriCandidates: string[],
): {
	uri: string
	uniquePath: string
}[]
//# sourceMappingURL=uri.d.ts.map
