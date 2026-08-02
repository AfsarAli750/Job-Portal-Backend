import { z } from "zod";

export const userValid = z.object({
    email : z
            .string()
            .email('please enter correct password')
            .min(6, 'Minimum 6 length character')
            .max(255, 'Maximum 255 length character allowed')
            .trim()
            .lowercase(),
    password: z
             .string()
             .min(6, 'Minimum 6 length password enter')
             .max(20, 'Maximum 20 length password allowed')
             .trim()
})

export const roleValid = z.object({
    role: z
          .enum(["job-seeker", "recruiter"])
          .default("job-seeker")
})
