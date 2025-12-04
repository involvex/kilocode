// kilocode_change new file
import { z } from "zod"
/**
 * Profile Type System
 */
export const profileTypes = ["chat", "autocomplete"]
export const profileTypeSchema = z.enum(profileTypes)
export const DEFAULT_PROFILE_TYPE = "chat"
//# sourceMappingURL=profile-type.js.map
