import z from "zod";

export const driverApplySchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters"),
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  licenseNumber: z
    .string()
    .trim()
    .min(5, "License number must be at least 5 characters"),
  experience: z
    .number()
    .int("Experience must be a whole number")
    .min(0, "Experience cannot be negative"),
  currentLocation: z
    .string()
    .trim()
    .max(255, "Location cannot exceed 255 characters"),
  contactNumber: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^01[3-9]\d{8}$/.test(value),
      "Enter a valid Bangladesh phone number",
    ),
});

