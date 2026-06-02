import { createContext } from "react";
import type { LoginDTO } from "../../service/types/auth/login.dto";
import type { CurrentAccountDTO } from "../../service/types/account/current-account.dto";

interface AuthContextInterface {
  user: CurrentAccountDTO | null;
  token: string | null;
  authenticated: boolean;
  authenticating: boolean;
  login: (data: LoginDTO) => Promise<void>;
  logout: () => void;
  validate: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);