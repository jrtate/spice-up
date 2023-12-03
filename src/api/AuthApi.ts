import { useMutation } from "@tanstack/react-query";
import { AuthCreds } from "../models/Auth";
import { add } from "date-fns";
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
      const { token, refreshToken, email } = res.data.user;
      const tokenExpiration = add(new Date(), { hours: 1 });
      const refreshExpiration = add(new Date(), { hours: 24 });
      sessionStorage.setItem("tokenExpiration", `${tokenExpiration}`);
      sessionStorage.setItem("refreshExpiration", `${refreshExpiration}`);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refreshToken", refreshToken);
      sessionStorage.setItem("email", email);
      api.defaults.headers.common = { Authorization: `Bearer ${token}` };
      navigate("/brainstorm");
    },
    onError: (error) => {
      handleSetShowToast(error.message);
    },
  });
