import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";

export function useApi() {
  const ctx = useContext(ApiContext)

  if (!ctx) throw new Error("useApi must be used only inside ApiProvider");
 
  return ctx.api;
}