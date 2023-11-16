export const isTokenValid = () => {
  const token = sessionStorage.getItem("token");
  const expiration = sessionStorage.getItem("expiration");

  return new Date() > new Date(expiration) && !!token;
};
