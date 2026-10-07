export interface PendingDriver {
  id: string;
  licenseNumber: string;
  experience: number;
  user: {
    name: string;
    email: string;
  };
}

export interface AdminAmbulance {
  id: string;
  vehicleNumber: string;
  type: string;
  status: string;
  driver: {
    isAvailable: boolean;
    applicationStatus: string;
    user: {
      name: string;
    };
  };
}

export interface AdminEmergencyRequest {
  id: string;
  pickupLocation: string;
  destination: string | null;
  emergencyType: string;
  priority: string;
  patient: {
    name: string;
    email: string;
  };
}

export interface AdminEmergencyRequestList {
  data: AdminEmergencyRequest[];
  pagination: {
    total: number;
    hasNextPage: boolean;
  };
}

export interface AssignAmbulancePayload {
  requestId: string;
  ambulanceId: string;
}