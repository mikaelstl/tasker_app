import { useCallback, useEffect, useRef, useState } from "react";
import type { LoginDTO } from "../../service/types/auth/login.dto";
import type { ApiError } from "../../service/types/response/error";
import type { AuthDTO } from "../../service/types/auth/auth.dto";
import { useToast } from "@/hooks/useToast";
import type { CurrentAccountDTO } from "../../service/types/account/current-account.dto";
import { AuthContext } from "../../context/AuthContext";
import { useServices } from "../../hooks/useServices";
import { useOrganization } from "@/hooks/useOrganization";
import {
  AUTH_SESSION_EXPIRED_EVENT,
  STORAGE_KEYS,
  clearAuthStorage,
} from "@/config/storage";

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

  const login = async (data: LoginDTO): Promise<void> => {
    try {
      const response = await AccountService.login(data);

      const auth = response.data as AuthDTO;
      const acc: CurrentAccountDTO = AccountService.buildCurrentAccount(auth);

      localStorage.setItem(STORAGE_KEYS.auth.user, JSON.stringify(acc));
      localStorage.setItem(STORAGE_KEYS.auth.token, auth.access_token);
      validationDisabledRef.current = false;
      setUser(acc);
      setToken(auth.access_token);
      setAuthenticating(false);
    } catch (error: unknown) {
      const { errors } = error as ApiError;

      if (errors?.length) {
        errors.forEach((err) => notifications[err.level](err.message));
      } else {
        notifications.error("Não foi possível entrar. Tente novamente.");
      }

      throw error;
    }
  };

  const clearAuthentication = useCallback(() => {
    clearOrg();
    setUser(null);
    setToken(null);
    clearAuthStorage();
  }, [clearOrg]);

  const invalidateAuthentication = useCallback(() => {
    validationDisabledRef.current = true;
    clearAuthentication();
    setAuthenticating(false);
  }, [clearAuthentication]);

  const logout = () => {
    invalidateAuthentication();
  };

  const validate = useCallback((): Promise<boolean> => {
    if (validationDisabledRef.current) {
      return Promise.resolve(false);
    }

    if (validationPromiseRef.current) {
      return validationPromiseRef.current;
    }

    const storedToken = localStorage.getItem(STORAGE_KEYS.auth.token);

    if (!storedToken || !readStoredUser()) {
      clearAuthentication();
      setAuthenticating(false);
      return Promise.resolve(false);
    }

    const validation = (async () => {
      try {
        const res = await AccountService.validate();

        if (!res?.data) {
          notifications.warning("Sessão inválida ou expirada");
          invalidateAuthentication();
          return false;
        }

        setAuthenticating(false);
        return true;
      } catch (error) {
        const err = error as ApiError;

        err?.errors?.forEach(e => {
          notifications[e.level](e.message);
        });

        invalidateAuthentication();
        return false;
      } finally {
        validationPromiseRef.current = null;
      }
    })();

    validationPromiseRef.current = validation;
    return validation;
  }, [AccountService, clearAuthentication, invalidateAuthentication, notifications]);

  useEffect(() => {
    window.addEventListener(AUTH_SESSION_EXPIRED_EVENT, invalidateAuthentication);

    return () => {
      window.removeEventListener(AUTH_SESSION_EXPIRED_EVENT, invalidateAuthentication);
    };
  }, [invalidateAuthentication]);

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
