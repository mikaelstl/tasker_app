import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import type { ApiError } from "../../service/types/response/error";
import { Toasts } from "../../toasts";
import { Text } from "../../components/base/Text";

export function PrivateRoute() {
  const api = useApi();

  const { user, token, logout } = useAuth();

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const validate = async () => {
      try {
        const res: any = await api.get({ route: "/auth/validate" });
        
        const notify = Toasts['info'];
        notify(res.message);

        setIsValid(true);
      } catch (error) {
        const err = error as ApiError;

        setIsValid(false);

        err?.errors?.forEach(e => {
          const notify = Toasts[e.level];
          notify(e.message);
        });

        logout();
      }
    };

    if (token) validate()
    else setIsValid(false);
  }, [user, token]);

  if (isValid === false) return <><Text>Carregando...</Text></>; 

  if (!user || !token || token === "" || !isValid) return <Navigate to="/login" replace />;

  return <Outlet />;
}