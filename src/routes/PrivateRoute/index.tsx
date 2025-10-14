import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function PrivateRoute() {
  const { user, token} = useAuth();

  return (user && token) && (token !== '')
          ? <Outlet />
          : <Navigate to="/login" replace/>;
}