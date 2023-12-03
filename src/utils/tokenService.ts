import api from "../api/Api";

export const invalidateTokenSession = () => {
  sessionStorage.setItem("refreshExpiration", "");
  sessionStorage.setItem("token", "");
  sessionStorage.setItem("refreshToken", "");
  api.defaults.headers.common = { Authorization: "" };
};
