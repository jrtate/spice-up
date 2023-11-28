export const isTokenValid = () => {
  const token = sessionStorage.getItem("token");
  // todo: fix this and add refresh token
  // const expiration = sessionStorage.getItem("tokenExpiration");

  // return new Date() > new Date(expiration) && !!token;
  return !!token;
};
