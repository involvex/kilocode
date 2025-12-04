export declare const EVALS_REPO_PATH: string
export declare const exerciseLanguages: readonly ["go", "java", "javascript", "python", "rust"]
export type ExerciseLanguage = (typeof exerciseLanguages)[number]
export declare const listDirectories: (basePath: string, relativePath: string) => Promise<string[]>
export declare const getExercisesForLanguage: (basePath: string, language: ExerciseLanguage) => Promise<string[]>
//# sourceMappingURL=index.d.ts.map
