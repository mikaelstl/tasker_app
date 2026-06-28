import { OrganizationContext } from "@/context/OrganizationContext";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { useState } from "react";

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
  const [ orgkey, setOrgkey ] = useState<string>('');
  const [ role, setRole ] = useState<OrgRole | null>(null);

  const loadOrg = async (orgkey: string) => {
      try {
        const response = await api.post<LoginDTO>({ route: '/auth/login', data: data });
  
        const auth = response.data as AuthDTO;
  
        const acc: CurrentAccountDTO = {
          id: auth.account,
          email: auth.email,
          username: auth.username,
        }
  
        console.log(acc);
  
        localStorage.setItem('tasker.api.user', JSON.stringify(acc));
        localStorage.setItem('tasker.api.token', auth.access_token);
        setUser(acc);
        setToken(auth.access_token);
      } catch (err: any) {
        const { errors } = err as ApiError;
  
        console.log(err);
  
        errors?.forEach(
          err => {
            console.warn(err);
  
            const notify = Toasts[err.level];
            notify(err.message);
          }
        );
      }
    }

  const setOrg = async (orgkey: string) => {
    localStorage.setItem('tasker.api.orgkey', orgkey);
  }

  return (
    <OrganizationContext.Provider value={{ 
        orgkey,
        role,
        loadOrg,
        setOrg
      }}>
      {children}
    </OrganizationContext.Provider>
  )
}