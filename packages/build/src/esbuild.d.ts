type CopyPathOptions = {
    optional?: boolean;
};
export declare function copyPaths(copyPaths: [string, string, CopyPathOptions?][], srcDir: string, dstDir: string): void;
export declare function copyWasms(srcDir: string, distDir: string): void;
export declare function copyLocales(srcDir: string, distDir: string): void;
export declare function setupLocaleWatcher(srcDir: string, distDir: string): void;
export declare function generatePackageJson({ packageJson: { contributes, ...packageJson }, overrideJson, substitution, }: {
    packageJson: Record<string, unknown>;
    overrideJson: Record<string, unknown>;
    substitution: [string, string];
}): Record<string, unknown>;
export {};
//# sourceMappingURL=esbuild.d.ts.map