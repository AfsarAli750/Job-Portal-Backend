import { z } from "zod";

export const jobSeekerProfileValid = z.object({
  name: z
    .string()
    .min(3, "Minimum 3 character required")
    .max(30, "Maximum 30 character allowed")
    .trim(),

  description: z
    .string()
    .min(10, "Minimum 10 character required")
    .trim(),

  skills: z.preprocess(
    (value) => {
      if (typeof value === "string") {
        return value
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 0);
      }

      return value;
    },
    z
      .array(z.string().min(1, "Minimum 1 skill required"))
      .min(1, "Minimum 1 skill required")
      .max(10, "Maximum 10 skills allowed")
  ),
});

export type JobSeekerProfileValid = z.infer<typeof jobSeekerProfileValid>;

export const skillsValid = z.object({
  skills: jobSeekerProfileValid.shape.skills,
});