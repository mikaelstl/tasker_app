import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Text } from "../../components/base/Text";
import { useOrganization } from "@/hooks/useOrganization";
import { useServices } from "@/hooks/useServices";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import type { ApiError } from "@/service/types/response/error";

interface OrganizationValidation {
  orgkey: string;
  belongs: boolean;
}

export function ProtectedRoute() {
  const { authenticating, authenticated } = useAuth();
  const { org, clearOrg } = useOrganization();
  const { AffiliationService } = useServices();
  const notifications = useToast();
  const [validation, setValidation] = useState<OrganizationValidation | null>(null);

  useEffect(() => {
    let active = true;

    if (!authenticated || !org?.orgkey || !org.role) {
      return;
    }

    const orgkey = org.orgkey;

    const loadOrganizationValidation = async () => {
      try {
        const response = await AffiliationService.participates(orgkey);
        const belongs = response.data;

        if (!active) return;

        setValidation({ orgkey, belongs });
        if (!belongs) clearOrg();
      } catch (error) {
        const { errors } = error as ApiError;

        errors?.forEach((item) => {
          notifications[item.level](item.message);
        });

        if (active) setValidation({ orgkey, belongs: false });
      }
    };

    void loadOrganizationValidation();

    return () => {
      active = false;
    };
  }, [AffiliationService, authenticated, clearOrg, notifications, org?.orgkey, org?.role]);

  const hasOrganizationToValidate = Boolean(authenticated && org?.orgkey && org.role);
  const organizationWasValidated = org?.orgkey === validation?.orgkey;

  if (authenticating || (hasOrganizationToValidate && !organizationWasValidated)) {
    return <Text>Carregando...</Text>;
  }

  return authenticated && validation?.belongs
    ? <Outlet />
    : <Navigate to="/workspaces" replace />;
}
