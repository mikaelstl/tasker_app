import { OrganizationContext } from "@/context/OrganizationContext";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { useEffect, useState } from "react";

const ORG_KEY_STORAGE = "tasker.api.orgkey";

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<OrgRole | null>(null);
  const [orgkey, setOrgkey] = useState<string | null>(() => {
    return localStorage.getItem(ORG_KEY_STORAGE);
  });

  const setOrg = (nextOrgkey: string, role: OrgRole) => {
    setRole(role);
    setOrgkey(nextOrgkey);
    localStorage.setItem(ORG_KEY_STORAGE, nextOrgkey);
  };

  const clearOrg = () => {
    setOrgkey(null);
    localStorage.removeItem(ORG_KEY_STORAGE);
  };

  const hasOrg = () => {
    setOrgkey(null);
    localStorage.removeItem(ORG_KEY_STORAGE);

    if (orgkey && localStorage.getItem(ORG_KEY_STORAGE)) return true;

    return false;
  };

  useEffect(() => {
    const storedOrgKey = localStorage.getItem(ORG_KEY_STORAGE);

    if (storedOrgKey && storedOrgKey !== orgkey) {
      setOrgkey(storedOrgKey);
    }
  }, [orgkey]);

  return (
    <OrganizationContext.Provider
      value={{
        role,
        orgkey,
        setOrg,
        clearOrg,
        hasOrg
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}
