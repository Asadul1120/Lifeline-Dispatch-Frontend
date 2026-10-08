import apiClient from "@/lib/apiClient";
import type {
  AssignedDriverRequestsResponse,
  DriverAvailabilityResponse,
  DriverTripResponse,
  DriverTripsResponse,
  UpdateTripStatusPayload,
} from "@/types";

export const updateDriverAvailability = (isAvailable: boolean) => {
  return apiClient<DriverAvailabilityResponse>("/driver/availability", {
    method: "PATCH",
    body: { isAvailable },
  });
};

export const updateDriverLocation = (currentLocation: string) => {
  return apiClient<DriverAvailabilityResponse>("/driver/location", {
    method: "PATCH",
    body: { currentLocation },
  });
};

export const getAssignedRequests = () => {
  return apiClient<AssignedDriverRequestsResponse>(
    "/driver/assigned-requests",
    {
      method: "GET",
    },
  );
};

export const getMyTrips = () => {
  return apiClient<DriverTripsResponse>("/trip/my", { method: "GET" });
};

export const startTrip = (requestId: string) => {
  return apiClient(`/trip/start/${requestId}`, { method: "POST" });
};

export const updateTripStatus = ({
  tripId,
  status,
  reason,
}: UpdateTripStatusPayload) => {
  return apiClient(`/trip/status/${tripId}`, {
    method: "PATCH",
    body: { status, reason },
  });
};

export const markTripOnTheWay = (tripId: string) => {
  return apiClient(`/trip/on-the-way/${tripId}`, { method: "PATCH" });
};

export const markTripPickedUp = (tripId: string) => {
  return apiClient(`/trip/picked-up/${tripId}`, { method: "PATCH" });
};

export const completeTrip = (tripId: string) => {
  return apiClient(`/trip/complete/${tripId}`, { method: "PATCH" });
};

export const cancelTrip = (tripId: string, reason: string) => {
  return apiClient(`/trip/cancel/${tripId}`, {
    method: "PATCH",
    body: { reason },
  });
};

export const getTrip = (tripId: string) => {
  return apiClient<DriverTripResponse>(`/trip/${tripId}`, {
    method: "GET",
  });
};