import z from "zod";

export const patientProfileSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").max(100),
  phone: z.string().trim().max(20, "Phone number cannot exceed 20 characters"),
  address: z.string().trim().max(255, "Address cannot exceed 255 characters"),
  bloodGroup: z
    .enum(["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+"])
    .or(z.literal("O-")),
  emergencyContact: z
    .string()
    .trim()
    .max(20, "Emergency contact cannot exceed 20 characters"),
});

export const driverProfileSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").max(100),

  licenseNumber: z
    .string()
    .trim()
    .min(5, "License number must be at least 5 characters")
    .max(50, "License number cannot exceed 50 characters"),

  experience: z
    .number()
    .int("Experience must be a whole number")
    .min(0, "Experience cannot be negative")
    .max(2147483647, "Experience is too large"),

  currentLocation: z
    .string()
    .trim()
    .max(255, "Location cannot exceed 255 characters"),

  contactNumber: z
    .string()
    .trim()
    .max(20, "Phone number cannot exceed 20 characters")
    .refine(
      (value) => value === "" || /^01[3-9]\d{8}$/.test(value),
      "Enter a valid Bangladesh phone number",
    ),
});
