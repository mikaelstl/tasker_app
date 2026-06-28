import { createContext } from "react";
import type { OrgRole } from "@/utils/enums/OrgRole";

interface OrganizationContextInterface {
  orgkey: string;
  role: OrgRole;
  loadOrg: () => Promise<void>;
  setOrg: (orgkey: string) => Promise<void>;
}

export const OrganizationContext = createContext<OrganizationContextInterface | undefined>(undefined);