import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  cancelTrip,
  completeTrip,
  getAssignedRequests,
  getMyTrips,
  getTrip,
  markTripOnTheWay,
  markTripPickedUp,
  startTrip,
  updateDriverAvailability,
  updateDriverLocation,
  updateTripStatus,
} from "@/api";
import type { UpdateTripStatusPayload } from "@/types";

export const driverTripsQueryKey = ["driver", "trips"] as const;

export const assignedRequestsQueryKey = [
  "driver",
  "assigned-requests",
] as const;

export const driverProfileQueryKey = ["user"] as const;

export const driverTripQueryKey = (tripId: string) =>
  ["driver", "trip", tripId] as const;

export const useAssignedRequests = () =>
  useQuery({
    queryKey: assignedRequestsQueryKey,
    queryFn: getAssignedRequests,
    retry: false,
    refetchInterval: 15_000,
    refetchOnWindowFocus: true,
  });

export const useMyTrips = () =>
  useQuery({
    queryKey: driverTripsQueryKey,
    queryFn: getMyTrips,
    retry: false,
    refetchInterval: 15_000,
    refetchOnWindowFocus: true,
  });

export const useStartTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startTrip,
    onSettled: () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: driverTripsQueryKey }),
        queryClient.invalidateQueries({ queryKey: assignedRequestsQueryKey }),
        queryClient.invalidateQueries({ queryKey: driverProfileQueryKey }),
      ]),
  });
};

export const useUpdateTripStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateTripStatusPayload) => {
      if (payload.status === "ONGOING") {
        return markTripOnTheWay(payload.tripId);
      }

      if (payload.status === "COMPLETED") {
        return completeTrip(payload.tripId);
      }

      return updateTripStatus(payload);
    },
    onSettled: (_data, _error, payload) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: driverTripsQueryKey }),
        queryClient.invalidateQueries({ queryKey: assignedRequestsQueryKey }),
        queryClient.invalidateQueries({ queryKey: driverProfileQueryKey }),
        queryClient.invalidateQueries({
          queryKey: driverTripQueryKey(payload.tripId),
          exact: true,
        }),
      ]),
  });
};

export const useMarkTripPickedUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markTripPickedUp,
    onSettled: (_data, _error, tripId) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: driverTripsQueryKey }),
        queryClient.invalidateQueries({
          queryKey: driverTripQueryKey(tripId),
          exact: true,
        }),
      ]),
  });
};

export const useCancelTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ tripId, reason }: { tripId: string; reason: string }) =>
      cancelTrip(tripId, reason),
    onSettled: (_data, _error, payload) =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: driverTripsQueryKey }),
        queryClient.invalidateQueries({ queryKey: driverProfileQueryKey }),
        queryClient.invalidateQueries({ queryKey: assignedRequestsQueryKey }),
        queryClient.invalidateQueries({
          queryKey: driverTripQueryKey(payload.tripId),
          exact: true,
        }),
      ]),
  });
};

export const useUpdateDriverAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDriverAvailability,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: driverProfileQueryKey }),
  });
};

export const useUpdateDriverLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDriverLocation,
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: driverProfileQueryKey }),
  });
};

export const useTrip = (tripId: string) =>
  useQuery({
    queryKey: driverTripQueryKey(tripId),
    queryFn: () => getTrip(tripId),
    enabled: Boolean(tripId),
    retry: false,
    staleTime: 0,
    refetchInterval: (query) => {
      const status = query.state.data?.data.status;

      return status === "COMPLETED" || status === "CANCELLED" ? false : 15_000;
    },
    refetchOnWindowFocus: true,
  });
