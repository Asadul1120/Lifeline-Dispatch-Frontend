export const Priority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export interface CreateEmergencyRequestPayload {
  pickupLocation: string;
  destination?: string;
  emergencyType: string;
  priority?: Priority;
}
