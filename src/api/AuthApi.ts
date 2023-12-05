import { useMutation } from "@tanstack/react-query";
import { AuthCreds } from "../models/Auth";
import api from "./Api";

const BASE_URL = "/auth";

export const useSignUpMutation = (navigate, handleSetShowToast) =>
  useMutation({
    mutationFn: (authCreds: AuthCreds) =>
      api.post(`${BASE_URL}/signup`, authCreds),
    onSuccess: () => {
      handleSetShowToast("Success!");
      navigate("/login");
    },
    onError: (error) => {
      handleSetShowToast(error.message);
    },
  });

export const useLoginMutation = (navigate, handleSetShowToast) =>
  useMutation({
    mutationFn: (authCreds: AuthCreds) =>
      api.post(`${BASE_URL}/login`, authCreds),
    onSuccess: (res) => {
      const { token, refreshToken, email, refreshExpiration } = res.data.user;
      sessionStorage.setItem("refreshExpiration", `${refreshExpiration}`);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("email", email);
      api.defaults.headers.common = { Authorization: `Bearer ${token}` };
      navigate("/plan");
    },
    onError: (error) => {
      handleSetShowToast(error.message);
    },
  });
