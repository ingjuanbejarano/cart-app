import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../config/authProvider";

export const PrivateRoute = () => {
  const { user, isLoading } = useContext(AuthContext);
  return isLoading ? (
    <></>
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};
