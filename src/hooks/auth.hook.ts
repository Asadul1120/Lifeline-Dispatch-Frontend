import { useMutation, useQuery } from "@tanstack/react-query";
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
  return useMutation({
    mutationFn: emailVerification,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: googleOAuth,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
};
