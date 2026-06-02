import { useMemo } from "react";
import { Api } from "../../service/api/Api";
import { ApiContext } from "../../context/ApiContext";

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const api = useMemo(() => {
    return new Api();
  }, []);

  return (
    <ApiContext.Provider value={{ api }}>
      { children }
    </ApiContext.Provider>
  )
}