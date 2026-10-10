import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  emailVerification,
  getMe,
  googleOAuth,
  userLogin,
  userLogout,
  userRegister,
} from "@/api";

export const useRegister = () => {
  return useMutation({
    mutationFn: userRegister,
  });
};

export const useEmailVerification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailVerification,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: true,
      });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: true,
      });
    },
  });
};

export const useGoogleOAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleOAuth,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: true,
      });
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogout,

    onSuccess: async () => {
      await queryClient.cancelQueries();
      queryClient.removeQueries();
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,

    retry: false,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
};
