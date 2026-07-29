import { OrganizationContext } from "@/context/OrganizationContext";
import type { CurrentOrg } from "@/service/types/organization/current.dto";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { useCallback, useMemo, useState } from "react";
import { STORAGE_KEYS, clearOrganizationStorage } from "@/config/storage";

function readStoredOrg(): CurrentOrg | null {
  const orgkey = localStorage.getItem(STORAGE_KEYS.organization.orgkey);
  const role = localStorage.getItem(STORAGE_KEYS.organization.role) as OrgRole | null;

  if (orgkey && role) {
    return {
      orgkey,
      role
    };
  }

  const storedOrg = localStorage.getItem(STORAGE_KEYS.organization.current);
  if (!storedOrg) return null;

  try {
    const parsed = JSON.parse(storedOrg) as CurrentOrg;

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

  const persistOrg = useCallback((nextOrg: CurrentOrg | null) => {
    setOrgState(nextOrg);

    if (!nextOrg) {
      clearOrganizationStorage();
      return;
    }

    localStorage.setItem(STORAGE_KEYS.organization.orgkey, nextOrg.orgkey);
    localStorage.setItem(STORAGE_KEYS.organization.role, nextOrg.role);
    localStorage.setItem(STORAGE_KEYS.organization.current, JSON.stringify(nextOrg));
  }, []);

  const setOrg = useCallback((nextOrgkey: string, role: OrgRole) => {
    persistOrg({
      orgkey: nextOrgkey,
      role
    });
  }, [persistOrg]);

  const clearOrg = useCallback(() => {
    persistOrg(null);
  }, [persistOrg]);

  const hasOrg = useCallback(() => Boolean(org?.orgkey), [org?.orgkey]);

  const value = useMemo(() => ({
    org,
    setOrg,
    defineOrg: setOrg,
    clearOrg,
    hasOrg,
  }), [clearOrg, hasOrg, org, setOrg]);

  return (
    <OrganizationContext.Provider
      value={value}
    >
      {children}
    </OrganizationContext.Provider>
  );
}
