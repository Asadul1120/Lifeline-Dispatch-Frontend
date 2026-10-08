import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyAsDriver, updateDriverProfile, verifyDriverEmail } from "@/api";

export const useDriverApply = () => {
  return useMutation({
    mutationFn: applyAsDriver,
  });
};

export const useDriverEmailVerification = () => {
  return useMutation({
    mutationFn: verifyDriverEmail,
  });
};

export const useUpdateDriverProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDriverProfile,

    onSuccess: (response) => {
      queryClient.setQueryData(["user"], response);

      return queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: true,
      });
    },
  });
};
