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
  driver?: {
    licenseNumber: string;
    experience: number;
    isAvailable: boolean;
    currentLocation: string | null;
    contactNumber: string | null;
    applicationStatus: "PENDING" | "APPROVED" | "REJECTED";
  } | null;
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


export interface UpdateDriverProfilePayload {
  name: string;
  driver: {
    licenseNumber: string;
    experience: number;
    currentLocation: string;
    contactNumber: string;
  };
  profileImage?: File | null;
}

export interface UserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}