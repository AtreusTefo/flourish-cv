import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
