import { useEffect, useState } from "react";
import type { LoginDTO } from "../../service/types/auth/login.dto";
import type { ApiError } from "../../service/types/response/error";
import type { AuthDTO } from "../../service/types/auth/auth.dto";
import { Toasts } from "../../maps/toasts";
import type { CurrentAccountDTO } from "../../service/types/account/current-account.dto";
import { AuthContext } from "../../context/AuthContext";
import { useServices } from "../../hooks/useServices";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { AccountService } = useServices();

  const [user, setUser] = useState<CurrentAccountDTO | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [authenticating, setAuthenticating] = useState<boolean>(true);

  useEffect(() => {
    const existingUser = localStorage.getItem('user');
    const existingToken = localStorage.getItem('token');
    if (existingUser && existingToken) {
      setUser(JSON.parse(existingUser));
      setToken(existingToken);
    }
  }, []);

  const login = async (data: LoginDTO) => {
    try {
      const response = await AccountService.login(data);

      const auth = response.data as AuthDTO;
      const acc: CurrentAccountDTO = AccountService.buildCurrentAccount(auth);

      console.log(acc);

      localStorage.setItem('user', JSON.stringify(acc));
      localStorage.setItem('token', auth.access_token);
      setUser(acc);
      setToken(auth.access_token);
    } catch (error: unknown) {
      const { errors } = error as ApiError;

      console.log(error);

      errors?.forEach(
        err => {
          console.warn(err);

          const notify = Toasts[err.level];
          notify(err.message);
        }
      );

      throw error;
    }
  }

  const logout = () => {
    setUser(null);
    setToken(null)
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  const validate = async (): Promise<boolean> => {
    const tk = localStorage.getItem('token');

    if (tk) {
      try {
        const res = await AccountService.validate();

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
