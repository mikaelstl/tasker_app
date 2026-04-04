import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

export function PrivateRoute() {
  const { user, token, validate } = useAuth();

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (!!token) {
      validate().then(
        value => setIsValid(value)
      );
    } else {
      setIsValid(false);
    }
  }, [user, token]);

  return (user || token || isValid) ? <Outlet /> : <Navigate to="/login" replace />;
}