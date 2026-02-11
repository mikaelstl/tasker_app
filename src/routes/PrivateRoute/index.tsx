import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useApi } from "../../hooks/useApi";
import type { ApiError } from "../../service/types/response/error";
import { Toasts } from "../../maps/toasts";
import { Text } from "../../components/base/Text";

export function PrivateRoute() {
  const api = useApi();

  const navigate = useNavigate();

  const { user, token } = useAuth();

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const validate = async () => {
      try {
        const res: any = await api.get({ route: "/auth/validate" });
        
        if (!res) {
          const notify = Toasts['warning'];
          notify('Unknown error');
          return;
        }

        const notify = Toasts['info'];
        notify('Login successful');

        setIsValid(true);
      } catch (error) {
        const err = error as ApiError;

        setIsValid(false);

        err?.errors?.forEach(e => {
          const notify = Toasts[e.level];
          notify(e.message);
        });

        navigate('/login');
      }
    };

    if (token) validate()
    else setIsValid(false);

    if (isValid === false) navigate('/login')
  }, [user, token]);

  if (isValid === false) return <><Text>Carregando...</Text></>;

  if (!user || !token || token === "" || !isValid) return <Navigate to="/login" replace />;

  return <Outlet />;
}