import { Priority } from "@/types";
import z from "zod";

export const createEmergencyRequestSchema = z.object({
  pickupLocation: z
    .string()
    .trim()
    .min(1, "Enter the pickup location")
    .max(255, "Pickup location cannot exceed 255 characters"),
  destination: z
    .string()
    .trim()
    .max(255, "Destination cannot exceed 255 characters"),
  emergencyType: z
    .string()
    .trim()
    .min(1, "Enter the emergency type")
    .max(100, "Emergency type cannot exceed 100 characters"),
  priority: z.enum(Priority),
});
