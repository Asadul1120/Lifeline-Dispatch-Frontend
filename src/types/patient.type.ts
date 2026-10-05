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

export const RequestStatus = {
  PENDING: "PENDING",
  ASSIGNED: "ASSIGNED",
  ON_THE_WAY: "ON_THE_WAY",
  PICKED_UP: "PICKED_UP",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];

export interface EmergencyRequestItem {
  id: string;
  pickupLocation: string;
  destination: string | null;
  emergencyType: string;
  priority: Priority;
  status: RequestStatus;
  createdAt: string;
  ambulance?: {
    driver?: {
      user?: {
        name: string;
      };
    };
  } | null;
  trip?: {
    id: string;
    status: string;
    startTime: string | null;
    endTime: string | null;
  } | null;
  payment?: PatientPayment | null;
}

export interface EmergencyRequestFilters {
  page?: number;
  limit?: number;
  status?: RequestStatus | "";
  priority?: Priority | "";
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PatientPayment {
  id: string;
  amount: number;
  status: "PENDING" | "PAID" | "FAILED";
  transactionId?: string | null;
  createdAt: string;
  request?: EmergencyRequestItem;
}

export interface CreatePaymentPayload {
  requestId: string;
  amount: number;
}

export interface EmergencyRequestListData {
  data: EmergencyRequestItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
