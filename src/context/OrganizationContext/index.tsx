import type { OrgRole } from "@/utils/enums/OrgRole";
import { createContext } from "react";

interface OrganizationContextInterface {
  role: OrgRole | null;
  orgkey: string | null;
  setOrg: (orgkey: string, role: OrgRole) => void;
  clearOrg: () => void;
  hasOrg: () => boolean;
}

export const OrganizationContext = createContext<OrganizationContextInterface | undefined>(undefined);
