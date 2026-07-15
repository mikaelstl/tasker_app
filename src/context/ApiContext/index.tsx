import { createContext } from "react";
import type { ApiClient } from "../../service/api";

interface ApiContextInterface {
  api: ApiClient
}

export const ApiContext = createContext<ApiContextInterface | undefined>(undefined);