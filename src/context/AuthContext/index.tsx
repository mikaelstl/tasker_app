import { createContext, useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import type { LoginDTO } from "../../service/types/auth/login.dto";
import type { ApiError } from "../../service/types/response/error";
import type { AuthDTO } from "../../service/types/auth/auth.dto";
import { Toasts } from "../../maps/toasts";
import type { CurrentAccountDTO } from "../../service/types/account/current-account.dto";

type User = {
  readonly id: string;
  readonly username: string;
}

interface AuthContextInterface {
  user: User | null;
  token: string | null;
  login: (data: LoginDTO) => Promise<void>;
  logout: () => void;
  validate: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const api = useApi();

  const [user, setUser] = useState<CurrentAccountDTO | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
      const response = await api.post<LoginDTO>({ route: '/auth/login', data: data });

      const auth = response.data as AuthDTO;

      const acc: CurrentAccountDTO = {
        id: auth.account,
        email: auth.email,
        username: auth.username,
      }

      console.log(acc);

      localStorage.setItem('user', JSON.stringify(acc));
      localStorage.setItem('token', auth.access_token);
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
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  const validate = async (): Promise<boolean> => {
    try {
      const res: any = await api.get({ route: "/auth/validate" });

      console.log("RESPONSE FROM '/auth/validate' >>>>>>");
      console.log(res);

      if (!res) {
        const notify = Toasts['warning'];
        notify('Unknown error');
        return false;
      }

      return res.data;
    } catch (error) {
      const err = error as ApiError;      

      err?.errors?.forEach(e => {
        const notify = Toasts[e.level];
        notify(e.message);
      });

      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, validate }}>
      {children}
    </AuthContext.Provider>
  )
}