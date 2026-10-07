export interface AdminResult<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AdminPage<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface AdminFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  priority?: string;
  action?: string;
  entity?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: string;
  sortOrder?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  imageUrl?: string | null;
  emailVerified: boolean;
  createdAt: string;
  patient?: {
    phone: string | null;
    address: string | null;
    bloodGroup: string | null;
    emergencyContact: string | null;
  } | null;
  driver?: {
    id: string;
    licenseNumber: string;
    experience: number;
    applicationStatus: string;
    isAvailable: boolean;
    currentLocation: string | null;
    contactNumber: string | null;
  } | null;
}

export interface ManagedAmbulance {
  id: string;
  driverId: string;
  vehicleNumber: string;
  type: string;
  status: string;
  location: string | null;
  driver: {
    id: string;
    isAvailable: boolean;
    applicationStatus: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface AmbulanceFormData {
  vehicleNumber: string;
  type: string;
  location: string;
}

export interface NewAmbulance extends AmbulanceFormData {
  driverId: string;
}

export interface AdminRequestInfo {
  id: string;
  emergencyType: string;
  pickupLocation: string;
  destination: string | null;
  priority: string;
  status: string;
  createdAt: string;
  patient: {
    id: string;
    name: string;
    email: string;
  };
  ambulance: ManagedAmbulance | null;
  trip: {
    id: string;
    status: string;
    startTime: string | null;
    endTime: string | null;
  } | null;
  payment: {
    amount: string | number;
    status: string;
    gateway: string;
    transactionId: string | null;
  } | null;
}

export interface AdminAuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string | null;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface AdminDashboardSummary {
  generatedAt: string;
  users: {
    total: number;
    patients: number;
    drivers: number;
    admins: number;
    suspended: number;
    banned: number;
  };
  applications: {
    pending: number;
    approved: number;
    rejected: number;
  };
  requests: {
    total: number;
    pending: number;
    active: number;
    completed: number;
    cancelled: number;
  };
  fleet: {
    total: number;
    available: number;
    busy: number;
    maintenance: number;
  };
  trips: {
    total: number;
    active: number;
    completed: number;
    cancelled: number;
  };
  payments: {
    total: number;
    paid: number;
    pending: number;
    failed: number;
    paidAmount: string;
  };
  recentRequests: {
    id: string;
    emergencyType: string;
    priority: string;
    status: string;
    createdAt: string;
    patient: {
      name: string;
    };
  }[];
  recentActivity: {
    id: string;
    action: string;
    entity: string;
    createdAt: string;
    user: {
      name: string;
    };
  }[];
}
