import z from "zod"
export type KilocodeConfigProject = z.infer<typeof KilocodeConfigProject>
export declare const KilocodeConfigProject: z.ZodObject<
	{
		id: z.ZodString
	},
	"strip",
	z.ZodTypeAny,
	{
		id: string
	},
	{
		id: string
	}
>
export type KilocodeConfig = z.infer<typeof KilocodeConfig>
export declare const KilocodeConfig: z.ZodObject<
	{
		project: z.ZodOptional<
			z.ZodObject<
				{
					id: z.ZodString
				},
				"strip",
				z.ZodTypeAny,
				{
					id: string
				},
				{
					id: string
				}
			>
		>
	},
	"strip",
	z.ZodTypeAny,
	{
		project?:
			| {
					id: string
			  }
			| undefined
	},
	{
		project?:
			| {
					id: string
			  }
			| undefined
	}
>
/**
 * Normalizes a project identifier for consistent tracking.
 * If the project is a git repository URL, extracts the repository name.
 * Otherwise, returns the project ID as-is.
 *
 * @param projectId - The project identifier (could be a URL or plain string)
 * @returns The normalized project ID
 *
 * @example
 * normalizeProjectId('https://github.com/Kilo-Org/handbook.git') // returns 'handbook'
 * normalizeProjectId('git@github.com:Kilo-Org/handbook.git') // returns 'handbook'
 * normalizeProjectId('my-project') // returns 'my-project'
 * normalizeProjectId(undefined) // returns undefined
 */
export declare function normalizeProjectId(projectId?: KilocodeConfigProject["id"]): string | undefined
export declare function getKilocodeConfig(
	workspaceRoot: string,
	gitRepositoryUrl?: string,
): Promise<KilocodeConfig | null>
/**
 * Reads the project configuration from .kilocode/config.json
 * Note: .kilocode/config.jsonc is not supported to avoid bundling issues
 *
 * @param workspaceRoot The root path of the workspace
 * @returns The project configuration or undefined if not found or invalid
 */
export declare function getKilocodeConfigFile(workspaceRoot: string): Promise<KilocodeConfig | null>
/**
 * Gets the project ID from configuration file or git repository
 * Priority:
 * 1. .kilocode/config.json (project.id) - normalized
 * 2. Git repository URL (origin remote) - normalized to repo name
 * 3. undefined if neither exists
 *
 * @param workspaceRoot The root path of the workspace
 * @param gitRepositoryUrl Optional git repository URL to use as fallback
 * @returns The normalized project ID or undefined
 */
export declare function getProjectId(workspaceRoot: string, gitRepositoryUrl?: string): Promise<string | undefined>
/**
 * Gets the project ID for the current VSCode workspace
 * Priority:
 * 1. .kilocode/config.json (project.id) - normalized
 * 2. Git repository URL (origin remote) - normalized to repo name
 * 3. undefined if neither exists
 * @returns The normalized project ID or undefined
 */
export declare function getWorkspaceProjectId(gitRepositoryUrl?: string): Promise<string | undefined>
//# sourceMappingURL=kilo-config-file.d.ts.map
