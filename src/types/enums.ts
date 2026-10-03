export const Role = {
  PATIENT: "PATIENT",
  DRIVER: "DRIVER",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof Role)[keyof typeof Role];


