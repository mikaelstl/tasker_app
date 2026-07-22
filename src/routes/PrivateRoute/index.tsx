import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Text } from "../../components/base/Text";

export function PrivateRoute() {
  const { authenticating, authenticated } = useAuth();

  if (authenticating) {
    return <Text>Carregando...</Text>;
  }

  return authenticated
    ? <Outlet />
    : <Navigate to="/login" replace />;
}
