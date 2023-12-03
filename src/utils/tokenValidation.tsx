export const isTokenValid = () => {
  const token = sessionStorage.getItem("refreshToken");
  const expiration = sessionStorage.getItem("refreshExpiration");

  return new Date() > new Date(expiration) || !token;
};
