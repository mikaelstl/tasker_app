import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import type { ApiError } from "../../service/types/response/error";
import { Toasts } from "../../toasts";

export function PrivateRoute() {
  const api = useApi();

  const { user, token } = useAuth();

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const validate = async () => {
      try {
        await api.get({ route: "/auth/validate" });
        setIsValid(true);
      } catch (error) {
        const err = error as ApiError;

        setIsValid(false);

        err?.errors?.forEach(e => {
          const notify = Toasts[e.level];
          notify(e.message);
        });
      }
    };

    if (token) validate()
    else setIsValid(false);
  }, [user, token]);

  if (isValid === false) return <></>; 

  if (!user || !token || token === "" || !isValid) return <Navigate to="/login" replace />;

  return <Outlet />;
}