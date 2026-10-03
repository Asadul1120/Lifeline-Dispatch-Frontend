import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEmergencyRequest } from "@/api";

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
