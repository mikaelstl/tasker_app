import { useCallback, useEffect, useRef, useState } from "react";
import type { LoginDTO } from "../../service/types/auth/login.dto";
import type { ApiError } from "../../service/types/response/error";
import type { AuthDTO } from "../../service/types/auth/auth.dto";
import { useToast } from "@/hooks/useToast";
import type { CurrentAccountDTO } from "../../service/types/account/current-account.dto";
import { AuthContext } from "../../context/AuthContext";
import { useServices } from "../../hooks/useServices";
import { useOrganization } from "@/hooks/useOrganization";
import { STORAGE_KEYS, clearAuthStorage } from "@/config/storage";

function readStoredUser(): CurrentAccountDTO | null {
  const storedUser = localStorage.getItem(STORAGE_KEYS.auth.user);

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as CurrentAccountDTO;
  } catch {
    localStorage.removeItem(STORAGE_KEYS.auth.user);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { AccountService } = useServices();
  const notifications = useToast();

  const { clearOrg } = useOrganization();

  const [user, setUser] = useState<CurrentAccountDTO | null>(() => readStoredUser());
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem(STORAGE_KEYS.auth.token),
  );

  const [authenticating, setAuthenticating] = useState<boolean>(true);
  const validationPromiseRef = useRef<Promise<boolean> | null>(null);
  const validationDisabledRef = useRef(false);

  const login = async (data: LoginDTO) => {
    try {
      const response = await AccountService.login(data);

      const auth = response.data as AuthDTO;
      const acc: CurrentAccountDTO = AccountService.buildCurrentAccount(auth);

      localStorage.setItem(STORAGE_KEYS.auth.user, JSON.stringify(acc));
      localStorage.setItem(STORAGE_KEYS.auth.token, auth.access_token);
      validationDisabledRef.current = false;
      setUser(acc);
      setToken(auth.access_token);
    } catch (error: unknown) {
      const { errors } = error as ApiError;

      console.log(error);

      errors?.forEach(
        err => {
          console.warn(err);

          notifications[err.level](err.message);
        }
      );
    }
  }

  const clearAuthentication = useCallback(() => {
    clearOrg();
    setUser(null);
    setToken(null);
    clearAuthStorage();
  }, [clearOrg]);

  const redirectToLogin = useCallback(() => {
    validationDisabledRef.current = true;
    clearAuthentication();
    setAuthenticating(false);

    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }, [clearAuthentication]);

  const logout = () => {
    validationDisabledRef.current = true;
    clearAuthentication();
  };

  const validate = useCallback((): Promise<boolean> => {
    if (validationDisabledRef.current) {
      return Promise.resolve(false);
    }

    if (validationPromiseRef.current) {
      return validationPromiseRef.current;
    }

    const storedToken = localStorage.getItem(STORAGE_KEYS.auth.token);

    if (!storedToken) {
      setAuthenticating(false);
      return Promise.resolve(false);
    }

    const validation = (async () => {
      try {
        const res = await AccountService.validate();

        if (!res?.data) {
          notifications.warning("Sessão inválida ou expirada");
          redirectToLogin();
          return false;
        }

        setAuthenticating(false);
        return true;
      } catch (error) {
        const err = error as ApiError;

        err?.errors?.forEach(e => {
          notifications[e.level](e.message);
        });

        redirectToLogin();
        return false;
      } finally {
        validationPromiseRef.current = null;
      }
    })();

    validationPromiseRef.current = validation;
    return validation;
  }, [AccountService, notifications, redirectToLogin]);

  useEffect(() => {
    void validate();
  }, [validate]);

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
