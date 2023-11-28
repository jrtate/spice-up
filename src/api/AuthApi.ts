import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { AuthCreds } from "../models/Auth";
import { add } from "date-fns";

const BASE_URL = "/auth";

export const useSignUpMutation = (navigate, handleSetShowToast) =>
  useMutation({
    mutationFn: (authCreds: AuthCreds) =>
      axios.post(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}/signup`,
        authCreds,
      ),
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
      axios.post(
        `${process.env.REACT_APP_BASE_URL}${BASE_URL}/login`,
        authCreds,
      ),
    onSuccess: (res) => {
      const token = res.data.user.token;
      const expiration = add(new Date(), { hours: 1 });
      sessionStorage.setItem("tokenExpiration", `${expiration}`);
      sessionStorage.setItem("token", token);
      axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
      navigate("/brainstorm");
    },
    onError: (error) => {
      handleSetShowToast(error.message);
    },
  });
