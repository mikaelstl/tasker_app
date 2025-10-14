import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error("useAuth must be used only inside AuthProvider");
  
  const { user, token, login, logout } = ctx;

  return { user, token, login, logout };
}