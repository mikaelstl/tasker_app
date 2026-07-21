import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserGroupIcon } from "@heroicons/react/20/solid";
import { ContentHeader } from "@/components/base/ContentHeader";
import { CreateButton } from "@/components/buttons/CreateButton";
import { Text } from "@/components/base/Text";
import { useOrganization } from "@/hooks/useOrganization";
import { useServices } from "@/hooks/useServices";
import { Toasts } from "@/maps/toasts";
import type { ApiError } from "@/service/types/response/error";
import { Card, Container, Description, IconArea } from "./style";

export function AcceptInvite() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { AffiliationService } = useServices();
  const { defineOrg } = useOrganization();
  const [accepting, setAccepting] = useState(false);

  const acceptInvite = async () => {
    if (!token) {
      Toasts.error("Link de convite inválido.");
      return;
    }

    setAccepting(true);

    try {
      const response = await AffiliationService.acceptInvite(token);

      defineOrg(response.data.orgkey, response.data.role);
      Toasts.info("Você entrou na organização.");
      navigate("/home/organization", { replace: true });
    } catch (error) {
      const { errors } = error as ApiError;

      if (!errors?.length) {
        Toasts.error("Não foi possível aceitar o convite.");
      } else {
        errors.forEach((item) => Toasts[item.level](item.message));
      }
    } finally {
      setAccepting(false);
    }
  };

  return (
    <Container>
      <ContentHeader title="Convite para organização" />
      <Card>
        <IconArea>
          <UserGroupIcon />
        </IconArea>
        <Description>
          Ao aceitar este convite, você entrará na organização com o papel de membro.
        </Description>
        <CreateButton type="button" onClick={acceptInvite} disabled={accepting}>
          <Text>{accepting ? "Aceitando..." : "Aceitar convite"}</Text>
        </CreateButton>
      </Card>
    </Container>
  );
}
