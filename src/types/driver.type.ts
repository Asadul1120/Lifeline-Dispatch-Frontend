export interface DriverApplyPayload {
  name: string;
  email: string;
  password: string;
  licenseNumber: string;
  experience: number;
  currentLocation?: string;
  contactNumber?: string;
}
