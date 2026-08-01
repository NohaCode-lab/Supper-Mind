import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const habitSchema = z.object({
  name: z.string().min(2, "Habit name must be at least 2 characters.").max(50, "Habit name too long."),
});

export const journalSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  content: z.string().min(10, "Journal entry must be at least 10 characters long."),
  mood: z.string().min(1, "Please select a mood tag."),
});

export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  primaryGoal: z.string().min(1, "Please select a primary goal."),
  aiTone: z.string().min(1, "Please select an AI assistant tone preference."),
});
