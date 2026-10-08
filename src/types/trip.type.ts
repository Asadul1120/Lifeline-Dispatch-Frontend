export type TripStatus = "STARTED" | "ONGOING" | "COMPLETED" | "CANCELLED";

export interface PatientContact {
  phone: string | null;
}

export interface DriverTripRequest {
  id: string;
  pickupLocation: string;
  destination: string | null;
  emergencyType: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status:
    | "PENDING"
    | "ASSIGNED"
    | "ON_THE_WAY"
    | "PICKED_UP"
    | "COMPLETED"
    | "CANCELLED";
  createdAt: string;
  patient: {
    id: string;
    name: string;
    email: string;
    patient?: PatientContact | null;
  };
}

export interface DriverTrip {
  id: string;
  requestId: string;
  driverId: string;
  startTime: string | null;
  endTime: string | null;
  status: TripStatus;
  createdAt: string;
  updatedAt: string;
  cancelReason?: string | null;
  request: DriverTripRequest;
}

export interface DriverTripsResponse {
  data: DriverTrip[];
}

export interface AssignedDriverRequest {
  id: string;
  pickupLocation: string;
  destination: string | null;
  emergencyType: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "ASSIGNED";
  createdAt: string;
  updatedAt: string;
  patient: {
    id: string;
    name: string;
    email: string;
    patient?: PatientContact | null;
  };
  ambulance: {
    id: string;
    vehicleNumber: string;
    type: string;
    status: "BUSY" | "AVAILABLE" | "MAINTENANCE";
    location: string | null;
  } | null;
}

export interface AssignedDriverRequestsResponse {
  data: AssignedDriverRequest[];
}

export interface UpdateTripStatusPayload {
  tripId: string;
  status: "ONGOING" | "COMPLETED" | "CANCELLED";
  reason?: string;
}

export interface DriverAvailabilityResponse {
  data: {
    id: string;
    isAvailable: boolean;
    currentLocation: string | null;
    applicationStatus?: string;
  };
}
