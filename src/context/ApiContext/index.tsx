import { createContext, useMemo } from "react";
import { Api } from "../../service/api/Api";

interface ApiContextInterface {
  api: Api
}

export const ApiContext = createContext<ApiContextInterface | undefined>(undefined);

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