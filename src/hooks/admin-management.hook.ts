"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getAdminUsers,
  getAdminUser,
  changeUserStatus,
  getManagedAmbulances,
  getManagedAmbulance,
  createAdminAmbulance,
  updateAdminAmbulance,
  changeAmbulanceStatus,
  getAllAdminRequests,
  getAdminRequestDetails,
  getAdminAuditLogs,
  getAdminDashboardSummary,
} from "@/api";

import type { AdminFilters } from "@/types";

export const useAdminUsers = (filters: AdminFilters) => {
  return useQuery({
    queryKey: ["admin", "users", filters],
    queryFn: () => getAdminUsers(filters),
    retry: false,
  });
};

export const useAdminUser = (userId: string) => {
  return useQuery({
    queryKey: ["admin", "user", userId],
    queryFn: () => getAdminUser(userId),
    enabled: Boolean(userId),
    retry: false,
  });
};

export const useChangeUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeUserStatus,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["admin"],
      });
    },
  });
};

export const useManagedAmbulances = () => {
  return useQuery({
    queryKey: ["admin", "ambulances"],
    queryFn: getManagedAmbulances,
    retry: false,
    refetchInterval: 10000,
  });
};

export const useManagedAmbulance = (ambulanceId: string) => {
  return useQuery({
    queryKey: ["admin", "ambulance", ambulanceId],
    queryFn: () => getManagedAmbulance(ambulanceId),
    enabled: Boolean(ambulanceId),
    retry: false,
  });
};

export const useCreateAdminAmbulance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdminAmbulance,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["admin"],
      });
    },
  });
};

export const useUpdateAdminAmbulance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminAmbulance,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["admin"],
      });
    },
  });
};

export const useChangeAmbulanceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeAmbulanceStatus,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["admin"],
      });
    },
  });
};

export const useAllAdminRequests = (filters: AdminFilters) => {
  return useQuery({
    queryKey: ["admin", "request-history", filters],
    queryFn: () => getAllAdminRequests(filters),
    retry: false,
    refetchInterval: 10000,
  });
};

export const useAdminRequestDetails = (requestId: string) => {
  return useQuery({
    queryKey: ["admin", "request", requestId],
    queryFn: () => getAdminRequestDetails(requestId),
    enabled: Boolean(requestId),
    retry: false,
    refetchInterval: 10000,
  });
};

export const useAdminAuditLogs = (filters: AdminFilters, userId?: string) => {
  return useQuery({
    queryKey: ["admin", "audit-logs", userId, filters],
    queryFn: () => getAdminAuditLogs(filters, userId),
    retry: false,
  });
};

export const useAdminDashboardSummary = () => {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: getAdminDashboardSummary,
    retry: false,
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
  });
};



