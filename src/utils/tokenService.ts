import api from "../api/Api";

export const invalidateTokenSession = () => {
  sessionStorage.setItem("tokenExpiration", "");
  sessionStorage.setItem("refreshExpiration", "");
  sessionStorage.setItem("token", "");
  sessionStorage.setItem("refreshToken", "");
  api.defaults.headers.common = { Authorization: "" };
};
