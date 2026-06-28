import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import type { LoginDTO } from "../../service/types/auth/login.dto";
import type { ApiError } from "../../service/types/response/error";
import type { AuthDTO } from "../../service/types/auth/auth.dto";
import { Toasts } from "../../maps/toasts";
import type { CurrentAccountDTO } from "../../service/types/account/current-account.dto";
import { AuthContext } from "../../context/AuthContext";
import { useOrganization } from "@/hooks/useOrganization";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const api = useApi();
  const { clearOrg } = useOrganization();

  const [user, setUser] = useState<CurrentAccountDTO | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [authenticating, setAuthenticating] = useState<boolean>(true);

  useEffect(() => {
    const existingUser = localStorage.getItem('tasker.api.user');
    const existingToken = localStorage.getItem('tasker.api.token');
    if (existingUser && existingToken) {
      setUser(JSON.parse(existingUser));
      setToken(existingToken);
    }
  }, []);

  const login = async (data: LoginDTO) => {
    try {
      const response = await api.post<LoginDTO>({ route: '/auth/login', data: data });

      const auth = response.data as AuthDTO;

      const acc: CurrentAccountDTO = {
        id: auth.account,
        email: auth.email,
        username: auth.username,
      }

      console.log(acc);

      localStorage.setItem('tasker.api.user', JSON.stringify(acc));
      localStorage.setItem('tasker.api.token', auth.access_token);
      setUser(acc);
      setToken(auth.access_token);
    } catch (err: any) {
      const { errors } = err as ApiError;

      console.log(err);

      errors?.forEach(
        err => {
          console.warn(err);

          const notify = Toasts[err.level];
          notify(err.message);
        }
      );
    }
  }

  const logout = () => {
    setUser(null);
    setToken(null)
    localStorage.removeItem('tasker.api.user');
    localStorage.removeItem('tasker.api.token');
    clearOrg();
  }

  const validate = async (): Promise<boolean> => {
    const tk = localStorage.getItem('tasker.api.token');

    if (tk) {
      try {
        const res: any = await api.get({ route: "/auth/validate" });

        console.log("RESPONSE FROM '/auth/validate' >>>>>>");
        console.log(res);

        if (!res) {
          const notify = Toasts['warning'];
          notify('Unknown error');
          return false;
        }

        setAuthenticating(false);
        return res.data;
      } catch (error) {
        const err = error as ApiError;

        err?.errors?.forEach(e => {
          const notify = Toasts[e.level];
          notify(e.message);
        });

        setAuthenticating(false);
        return false;
      }
    } else {
      setAuthenticating(false);
      return false;
    }
  };

  useEffect(() => {
    validate();
  }, [user, token])

  return (
    <AuthContext.Provider value={{ 
        user,
        token,
        authenticating,
        authenticated: (!!user && !!token),
        validate,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  )
}
