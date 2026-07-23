import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ContentHeader } from "@/components/base/ContentHeader";
import { Text } from "@/components/base/Text";
import { CreateButton } from "@/components/buttons/CreateButton";
import { DeleteBtn } from "@/components/buttons/DeleteBtn";
import { useAuth } from "@/hooks/useAuth";
import { useServices } from "@/hooks/useServices";
import { useToast, type ToastNotifications } from "@/hooks/useToast";
import type { ApiError } from "@/service/types/response/error";
import {
  Container,
  Content,
  EmptyState,
  Field,
  Form,
  Hint,
  Input,
  Section,
} from "./style";

function notifyError(error: unknown, fallback: string, notifications: ToastNotifications) {
  const apiError = error as ApiError;
  if (!apiError.errors?.length) {
    notifications.error(fallback);
    return;
  }
  apiError.errors.forEach((item) => notifications[item.level](item.message));
}

export function EditProfile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { AccountService, UserService } = useServices();
  const notifications = useToast();
  const [initialUsername, setInitialUsername] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [initialName, setInitialName] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadProfile = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await UserService.me();
      setInitialName(data.name);
      setInitialUsername(data.username);
      setInitialEmail(data.email);
      setName(data.name);
      setUsername(data.username);
      setEmail(data.email);
    } catch (error) {
      notifyError(error, "Não foi possível carregar o perfil.", notifications);
    } finally {
      setLoading(false);
    }
  }, [UserService, notifications]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedName = name.trim();
    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim();

    if (!normalizedName || !normalizedUsername || !normalizedEmail) {
      notifications.validation("Nome, usuário e e-mail são obrigatórios.");
      return;
    }
    if (password && !/^(?=.*\d)(?=.*[@$#]).{8,20}$/.test(password)) {
      notifications.validation("A senha deve ter de 8 a 20 caracteres, um número e um caractere @, $ ou #.");
      return;
    }

    const changes = {
      ...(normalizedName !== initialName ? { name: normalizedName } : {}),
      ...(normalizedUsername !== initialUsername ? { username: normalizedUsername } : {}),
      ...(normalizedEmail !== initialEmail ? { email: normalizedEmail } : {}),
      ...(password ? { password } : {}),
    };

    if (Object.keys(changes).length === 0) {
      notifications.info("Nenhuma alteração para salvar.");
      return;
    }

    setSaving(true);
    try {
      await AccountService.edit(changes);
      const requiresNewLogin = normalizedUsername !== initialUsername
        || normalizedEmail !== initialEmail;

      notifications.info(
        requiresNewLogin
          ? "Perfil atualizado. Entre novamente com suas credenciais."
          : "Perfil atualizado.",
      );

      if (requiresNewLogin) {
        logout();
        navigate("/login", { replace: true });
      } else {
        navigate("/me/profile", { replace: true });
      }
    } catch (error) {
      notifyError(error, "Não foi possível atualizar o perfil.", notifications);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container>
      <ContentHeader title="Editar perfil">
        <DeleteBtn label="Cancelar" onClick={() => navigate("/me/profile")} disabled={saving} />
        <CreateButton type="submit" form="edit-profile-form" disabled={saving || loading}>
          <Text>{saving ? "Salvando..." : "Salvar alterações"}</Text>
        </CreateButton>
      </ContentHeader>
      <Content>
        <Section>
          {loading ? (
            <EmptyState>Carregando perfil...</EmptyState>
          ) : (
            <Form id="edit-profile-form" onSubmit={(event) => void save(event)}>
              <Field>
                Nome
                <Input
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
              </Field>
              <Field>
                Nome de usuário
                <Input
                  name="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                />
              </Field>
              <Field>
                E-mail
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </Field>
              <Field>
                Nova senha
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  placeholder="Deixe em branco para manter a senha atual"
                />
                <Hint>Use de 8 a 20 caracteres, incluindo um número e um caractere @, $ ou #.</Hint>
              </Field>
              <Hint>
                Alterar usuário ou e-mail encerra a sessão para que um novo token seja emitido.
              </Hint>
            </Form>
          )}
        </Section>
      </Content>
    </Container>
  );
}
