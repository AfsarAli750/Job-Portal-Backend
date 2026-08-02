import {z} from "zod";


export const jobValid = z.object({
    title: z
        .string()
        .min(3, 'Minimum 3 character required')
        .trim(),
    company: z
        .string()
        .min(3, 'Minimum 3 character required')
        .trim(),
    location: z
        .string()
        .min(5 , 'Minimum 5 character required')
        .trim(),
    jobType: z
        .enum(["Full-Time" , "Part-Time" , "Internship"])
        .default("Full-Time"),
    description: z
        .string()
        .min(20, "Minimum 20 character required")
        .trim(),
    requirements: z
        .string()
        .min(10, "Minimum 10 character required")
        .trim(),
    salary: z
        .number()
        .min(100000)
        .max(100000000)
        .positive(),
    experience: z
        .enum(["Fresher" , "1-2 Years" , "3-5 Years" , "5+ Years"])
        .default("Fresher"),
    skills: z
        .array(z.string().min(1, "Minimum 1 skill required"))
        .min(1, "Minimum 1 skill required")
        .max(10, "Maximum 10 skill allowed")
        .default([]),
    deadline: z
        .coerce.date()
        .min(new Date(), "Please give future time")
})

export type UserFormData = z.infer<typeof jobValid>;