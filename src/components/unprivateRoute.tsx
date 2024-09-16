import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../config/authProvider";

export const UnprivateRoute = () => {
  const { user, isLoading } = useContext(AuthContext);
  return isLoading ? <></> : !user ? <Outlet /> : <Navigate to="/" replace />;
};
