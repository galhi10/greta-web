import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";
import useToken from "../../hooks/useToken";

const AuthenticatedRoute = ({ children }) => {
  const { token } = useToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthenticatedRoute;
