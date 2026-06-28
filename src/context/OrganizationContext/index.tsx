import type { CurrentOrg } from "@/service/types/organization/current.dto";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { createContext } from "react";

interface OrganizationContextInterface {
  org: CurrentOrg | null;
  setOrg: (orgkey: string, role: OrgRole) => void;
  defineOrg: (orgkey: string, role: OrgRole) => void;
  clearOrg: () => void;
  hasOrg: () => boolean;
}

export const OrganizationContext = createContext<OrganizationContextInterface | undefined>(undefined);
