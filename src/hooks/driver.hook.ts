import { useMutation } from "@tanstack/react-query";
import { applyAsDriver, verifyDriverEmail } from "@/api";

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
