import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import type { ApiClient } from "../service/api";

export function useApi() {
  const ctx = useContext(ApiContext)

  if (!ctx) throw new Error("useApi must be used only inside ApiProvider");
 
  return ctx.api as ApiClient;
}
