import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Text } from "../../components/base/Text";

export function PrivateRoute() {
  const { authenticating, authenticated } = useAuth();
  const location = useLocation();

  if (authenticating) {
    return <Text>Carregando...</Text>;
  }

  return authenticated
    ? <Outlet />
    : <Navigate to="/login" replace state={{ from: location }} />;
}
