import { useMemo } from "react";
import { ApiClient } from "../../service/api";
import { ApiContext } from "../../context/ApiContext";

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const api = useMemo(() => {
    return new ApiClient();
  }, []);

  return (
    <ApiContext.Provider value={{ api }}>
      { children }
    </ApiContext.Provider>
  )
}