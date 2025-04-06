import { z } from "zod"

export const verifySchema = z.object({
    content: z
    .string()
    .min(5, "bio must be atleast 2 characters")
    .max(100,"bio cannot be more than 100 words")
})