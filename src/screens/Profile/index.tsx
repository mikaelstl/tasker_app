import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContentHeader } from "@/components/base/ContentHeader";
import { DeleteBtn } from "@/components/buttons/DeleteBtn";
import { Subtitle } from "@/components/base/Subtitle";
import { Text } from "@/components/base/Text";
import { Title } from "@/components/base/Title";
import { useAuth } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { useToast, type ToastNotifications } from "@/hooks/useToast";
import type { ApiError } from "@/service/types/response/error";
import { Container, Content, DangerCard, Identity, Value } from "./style";

function notifyError(error: unknown, fallback: string, notifications: ToastNotifications) {
  const apiError = error as ApiError;
  if (!apiError.errors?.length) {
    notifications.error(fallback);
    return;
  }
  apiError.errors.forEach((item) => notifications[item.level](item.message));
}

export function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { AccountService, UserService } = useServices();
  const notifications = useToast();
  const [deleting, setDeleting] = useState<"user" | "account" | null>(null);

  const finishDeletion = (message: string) => {
    notifications.info(message);
    logout();
    navigate("/login", { replace: true });
  };

  const deleteUser = async () => {
    if (!user || !window.confirm(`Excluir definitivamente o perfil @${user.username}?`)) return;
    setDeleting("user");
    try {
      await UserService.delete(user.username);
      finishDeletion("Perfil de usuário excluído.");
    } catch (error) {
      notifyError(error, "Não foi possível excluir o perfil de usuário.", notifications);
    } finally {
      setDeleting(null);
    }
  };

  const deleteAccount = async () => {
    if (!user || !window.confirm(`Excluir definitivamente a conta ${user.email}?`)) return;
    setDeleting("account");
    try {
      // O repository de Accounts exclui pelo e-mail, apesar de o parâmetro da
      // rota se chamar `id` no backend.
      await AccountService.delete(user.email);
      finishDeletion("Conta de acesso excluída.");
    } catch (error) {
      notifyError(error, "Não foi possível excluir a conta de acesso.", notifications);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <Container>
      <ContentHeader title="Perfil" />
      <Content>
        <Identity>
          <Title>Dados da sessão</Title>
          <Subtitle>Usuário</Subtitle>
          <Value>@{user?.username ?? "—"}</Value>
          <Subtitle>E-mail</Subtitle>
          <Value>{user?.email ?? "—"}</Value>
          <Subtitle>ID da conta</Subtitle>
          <Value>{user?.id ?? "—"}</Value>
        </Identity>

        <Title>Zona de risco</Title>
        <DangerCard>
          <div>
            <Title>Excluir perfil de usuário</Title>
            <Text>Remove o perfil identificado pelo username. A credencial da conta permanece no backend.</Text>
          </div>
          <DeleteBtn
            label={deleting === "user" ? "Excluindo..." : "Excluir perfil"}
            onClick={() => void deleteUser()}
            disabled={deleting !== null}
          />
        </DangerCard>
        <DangerCard>
          <div>
            <Title>Excluir conta de acesso</Title>
            <Text>Remove a credencial identificada pelo e-mail e encerra esta sessão.</Text>
          </div>
          <DeleteBtn
            label={deleting === "account" ? "Excluindo..." : "Excluir conta"}
            onClick={() => void deleteAccount()}
            disabled={deleting !== null}
          />
        </DangerCard>
      </Content>
    </Container>
  );
}
