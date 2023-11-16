export const isTokenValid = () => {
  const token = sessionStorage.getItem("token");
  const expiration = sessionStorage.getItem("expiration");
  console.log("token", !!token);
  console.log(
    "new Date() < new Date(expiration)",
    new Date() > new Date(expiration),
  );

  return new Date() > new Date(expiration) && !!token;
};
