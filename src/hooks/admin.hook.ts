// "use client";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// import {
//   getPendingDrivers,
//   approveDriver,
//   rejectDriver,
//   getAdminEmergencyRequests,
//   getAdminAmbulances,
//   assignAmbulanceToRequest,
// } from "@/api";

// export const usePendingDrivers = () => {
//   return useQuery({
//     queryKey: ["admin", "pending-drivers"],
//     queryFn: getPendingDrivers,
//     retry: false,
//   });
// };

// export const useApproveDriver = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: approveDriver,
//     onSuccess: () => {
//       return queryClient.invalidateQueries({
//         queryKey: ["admin", "pending-drivers"],
//       });
//     },
//   });
// };

// export const useRejectDriver = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: rejectDriver,
//     onSuccess: () => {
//       return queryClient.invalidateQueries({
//         queryKey: ["admin", "pending-drivers"],
//       });
//     },
//   });
// };

// export const useAdminEmergencyRequests = (page: number) => {
//   return useQuery({
//     queryKey: ["admin", "emergency-requests", page],
//     queryFn: () => getAdminEmergencyRequests(page),
//     retry: false,
//     refetchInterval: 10000,
//   });
// };

// export const useAdminAmbulances = () => {
//   return useQuery({
//     queryKey: ["admin", "ambulances"],
//     queryFn: getAdminAmbulances,
//     retry: false,
//     refetchInterval: 10000,
//   });
// };

// export const useAssignAmbulance = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: assignAmbulanceToRequest,
//     onSettled: async () => {
//       await Promise.all([
//         queryClient.invalidateQueries({
//           queryKey: ["admin", "emergency-requests"],
//         }),
//         queryClient.invalidateQueries({
//           queryKey: ["admin", "ambulances"],
//         }),
//       ]);
//     },
//   });
// };



"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getPendingDrivers,
  approveDriver,
  rejectDriver,
  getAdminEmergencyRequests,
  getAdminAmbulances,
  assignAmbulanceToRequest,
} from "@/api";

export const usePendingDrivers = () => {
  return useQuery({
    queryKey: ["admin", "pending-drivers"],
    queryFn: getPendingDrivers,
    retry: false,
  });
};

export const useApproveDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveDriver,
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["admin"],
      }),
  });
};

export const useRejectDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectDriver,
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["admin"],
      }),
  });
};

export const useAdminEmergencyRequests = (
  page: number
) => {
  return useQuery({
    queryKey: ["admin", "emergency-requests", page],
    queryFn: () => getAdminEmergencyRequests(page),
    retry: false,
    refetchInterval: 10000,
  });
};

export const useAdminAmbulances = () => {
  return useQuery({
    queryKey: ["admin", "ambulances"],
    queryFn: getAdminAmbulances,
    retry: false,
    refetchInterval: 10000,
  });
};

export const useAssignAmbulance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignAmbulanceToRequest,
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ["admin"],
      }),
  });
};
