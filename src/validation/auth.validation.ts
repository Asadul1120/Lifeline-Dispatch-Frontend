import z from "zod";

export const loginSchema = z.object({
  email: z.email({
    message: "Enter a valid email address",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Enter your full name"),
  email: z.email({
    message: "Enter a valid email address",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const verifyEmailSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  otp: z
    .string()
    .length(6, "Enter a valid 6-digit verification code")
    .regex(/^\d+$/, "Verification code must be numeric"),
});
