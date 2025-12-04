import { z } from "zod"
/**
 * Profile Type System
 */
export declare const profileTypes: readonly ["chat", "autocomplete"]
export declare const profileTypeSchema: z.ZodEnum<["chat", "autocomplete"]>
export type ProfileType = z.infer<typeof profileTypeSchema>
export declare const DEFAULT_PROFILE_TYPE: ProfileType
//# sourceMappingURL=profile-type.d.ts.map
