import { useNavigate } from "react-router-dom";
import { isTokenValid } from "utils/tokenValidation";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  if (isTokenValid()) navigate("/login");

  return children;
};

export default ProtectedRoute;
