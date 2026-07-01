import { createContext } from "react";
import { ApiClient } from "../../service/api";

interface ApiContextInterface {
  api: ApiClient
}

export const ApiContext = createContext<ApiContextInterface | undefined>(undefined);
