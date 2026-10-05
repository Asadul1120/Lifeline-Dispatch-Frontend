export interface PatientProfile {
  phone: string | null;
  address: string | null;
  bloodGroup: string | null;
  emergencyContact: string | null;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "PATIENT" | "DRIVER" | "ADMIN";
  imageUrl?: string | null;
  emailVerified: boolean;
  patient?: PatientProfile | null;
}

export interface UpdatePatientProfilePayload {
  name: string;
  patient: {
    phone: string;
    address: string;
    bloodGroup?: string;
    emergencyContact: string;
  };
  profileImage?: File | null;
}
