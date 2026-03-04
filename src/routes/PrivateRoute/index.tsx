import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import type { ApiError } from "../../service/types/response/error";
import { Toasts } from "../../maps/toasts";
import { Text } from "../../components/base/Text";

export function PrivateRoute() {
  const navigate = useNavigate();

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