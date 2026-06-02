import { createContext } from "react";
import { Api } from "../../service/api/Api";

interface ApiContextInterface {
  api: Api
}

export const ApiContext = createContext<ApiContextInterface | undefined>(undefined);