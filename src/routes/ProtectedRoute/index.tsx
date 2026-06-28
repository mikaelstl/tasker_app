import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Text } from "../../components/base/Text";
import { useOrganization } from "@/hooks/useOrganization";

export function ProtectedRoute() {
  const { authenticating, authenticated } = useAuth();
  const { org } = useOrganization();

  if (authenticating) {
    return <Text>Carregando...</Text>;
  }

  return authenticated && org && org.orgkey && org.role ? <Outlet /> : <Navigate to="/workspaces" replace />;
}