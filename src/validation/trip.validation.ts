import z from "zod";

export const cancelTripSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(3, "Enter a cancellation reason with at least 3 characters.")
    .max(255, "Cancellation reason cannot exceed 255 characters."),
});
