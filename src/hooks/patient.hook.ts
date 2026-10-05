import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  cancelEmergencyRequest,
  createPayment,
  createEmergencyRequest,
  getEmergencyRequest,
  getMyEmergencyRequests,
  getMyPayments,
  updatePatientProfile,
} from "@/api";
import type { EmergencyRequestFilters } from "@/types";

export const useCreateEmergencyRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmergencyRequest,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["emergency-requests"],
      });
    },
  });
};

export const useMyEmergencyRequests = (filters?: EmergencyRequestFilters) => {
  return useQuery({
    queryKey: ["emergency-requests", filters],
    queryFn: () => getMyEmergencyRequests(filters),
    retry: false,
  });
};

export const useEmergencyRequest = (requestId: string) => {
  return useQuery({
    queryKey: ["emergency-request", requestId],
    queryFn: () => getEmergencyRequest(requestId),
    enabled: Boolean(requestId),
    retry: false,
  });
};

export const useCancelEmergencyRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelEmergencyRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["emergency-requests"] }),
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments"] }),
  });
};

export const useMyPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: getMyPayments,
    retry: false,
  });
};

export const useUpdatePatientProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePatientProfile,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
};
