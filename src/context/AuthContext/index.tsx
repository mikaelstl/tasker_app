import { createContext, useEffect, useState } from "react";

type User = {
  readonly id: string;
  readonly username: string;
}

interface AuthContextInterface {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      setUser(JSON.parse(existingUser));
    }
  }, []);

  const login = (data: User) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(data));
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login,logout }}>
      { children }
    </AuthContext.Provider>
  )
}