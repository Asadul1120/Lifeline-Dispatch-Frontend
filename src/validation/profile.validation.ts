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
