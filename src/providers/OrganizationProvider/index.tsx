import { OrganizationContext } from "@/context/OrganizationContext";
import type { CurrentOrg } from "@/service/types/organization/current.dto";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { useState } from "react";

const ORG_KEY_STORAGE = "tasker.api.orgkey";
const ORG_ROLE_STORAGE = "tasker.api.orgrole";
const ORG_STORAGE = "tasker.api.org";

function readStoredOrg(): CurrentOrg | null {
  const orgkey = localStorage.getItem(ORG_KEY_STORAGE);
  const role = localStorage.getItem(ORG_ROLE_STORAGE) as OrgRole | null;

  if (orgkey && role) {
    return {
      orgkey,
      role
    };
  }

  const legacyOrg = localStorage.getItem(ORG_STORAGE);
  if (!legacyOrg) return null;

  try {
    const parsed = JSON.parse(legacyOrg) as Partial<CurrentOrg>;

    if (!parsed.orgkey || !parsed.role) return null;

    return {
      orgkey: parsed.orgkey,
      role: parsed.role
    };
  } catch {
    return null;
  }
}

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [org, setOrgState] = useState<CurrentOrg | null>(() => readStoredOrg());

  const persistOrg = (nextOrg: CurrentOrg | null) => {
    setOrgState(nextOrg);

    if (!nextOrg) {
      localStorage.removeItem(ORG_KEY_STORAGE);
      localStorage.removeItem(ORG_ROLE_STORAGE);
      localStorage.removeItem(ORG_STORAGE);
      return;
    }

    localStorage.setItem(ORG_KEY_STORAGE, nextOrg.orgkey);
    localStorage.setItem(ORG_ROLE_STORAGE, nextOrg.role);
    localStorage.setItem(ORG_STORAGE, JSON.stringify(nextOrg));
  };

  const setOrg = (nextOrgkey: string, role: OrgRole) => {
    persistOrg({
      orgkey: nextOrgkey,
      role
    });
  };

  const clearOrg = () => {
    persistOrg(null);
  };

  const hasOrg = () => Boolean(org?.orgkey);

  return (
    <OrganizationContext.Provider
      value={{
        org,
        setOrg,
        defineOrg: setOrg,
        clearOrg,
        hasOrg
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}
