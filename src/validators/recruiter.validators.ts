import { z } from "zod";

export const recruiterProfileValid = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 character required")
    .max(30, "Maximum 30 character allowed")
    .trim(),

  description: z
    .string()
    .min(10, "Minimum 10 character required")
    .trim(),
  companyName: z
    .string()
    .min(3, "Minimum 3 character required")
    .trim(),

  
});

export type recruiterProfileValid = z.infer<
  typeof recruiterProfileValid
>;