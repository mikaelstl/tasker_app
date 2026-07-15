import { useMemo } from "react";
import { ApiContext } from "../../context/ApiContext";
import { ApiClient } from "../../service/api";

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