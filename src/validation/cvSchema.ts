import { z } from "zod";

// ── Reusable field refinements ───────────────────────────────────────────────

const optionalUrl = z
  .string()
  .refine(
    (val) => {
      if (!val) return true;
      try {
        new URL(val.startsWith("http") ? val : `https://${val}`);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Please enter a valid URL" }
  )
  .optional()
  .or(z.literal(""));

const optionalPhone = z
  .string()
  .refine(
    (val) => {
      if (!val) return true;
      return /^[+]?[1-9][\d]{0,15}$/.test(val.replace(/[\s\-()\s]/g, ""));
    },
    { message: "Please enter a valid phone number" }
  )
  .optional()
  .or(z.literal(""));

// ── Section schemas ──────────────────────────────────────────────────────────

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  jobTitle: z.string().optional().or(z.literal("")),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: optionalPhone,
  address: z.string().optional().or(z.literal("")),
  website: optionalUrl,
  linkedin: optionalUrl,
});

export const experienceItemSchema = z.object({
  id: z.string(),
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional().or(z.literal("")),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
  current: z.boolean(),
  description: z.string().optional().or(z.literal("")),
});

export const educationItemSchema = z.object({
  id: z.string(),
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  location: z.string().optional().or(z.literal("")),
  startDate: z.string().optional().or(z.literal("")),
  endDate: z.string().optional().or(z.literal("")),
  current: z.boolean(),
  description: z.string().optional().or(z.literal("")),
  gpa: z.string().optional().or(z.literal("")),
});

export const projectItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional().or(z.literal("")),
  url: optionalUrl,
});

export const languageItemSchema = z.object({
  id: z.string(),
  language: z.string().min(1, "Language is required"),
  proficiency: z.string().min(1, "Proficiency is required"),
});

export const cvSchema = z.object({
  personalInfo: personalInfoSchema,
  summary: z.string().optional().or(z.literal("")),
  experience: z.array(experienceItemSchema),
  education: z.array(educationItemSchema),
  skills: z.array(z.string()),
  projects: z.array(projectItemSchema).optional(),
  languages: z.array(languageItemSchema).optional(),
  interests: z.array(z.string()).optional(),
  template: z.string(),
});

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type ExperienceItem = z.infer<typeof experienceItemSchema>;
export type EducationItem = z.infer<typeof educationItemSchema>;
export type ProjectItem = z.infer<typeof projectItemSchema>;
export type LanguageItem = z.infer<typeof languageItemSchema>;
export type CVFormData = z.infer<typeof cvSchema>;
