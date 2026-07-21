import { useEffect, useState } from "react";
import { ContentHeader } from "@/components/base/ContentHeader";
import { OrganizationCard } from "@/components/cards/OrganizationCard";
import { useOrganization } from "@/hooks/useOrganization";
import { useServices } from "@/hooks/useServices";
import { Toasts } from "@/maps/toasts";
import type { UserOrganizationSummaryDTO } from "@/service/types/affiliation/summary.dto";
import type { ApiError } from "@/service/types/response/error";
import { Container, Content, EmptyMessage } from "./style";

export function Organization() {
  const { org } = useOrganization();
  const { AffiliationService } = useServices();
  const [organization, setOrganization] = useState<UserOrganizationSummaryDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadOrganization = async () => {
      try {
        const response = await AffiliationService.list();
        const currentOrganization = response.data.find(
          (item) => item.orgkey === org?.orgkey,
        ) ?? null;

        if (active) {
          setOrganization(currentOrganization);
        }
      } catch (error) {
        const { errors } = error as ApiError;

        errors?.forEach((item) => Toasts[item.level](item.message));
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadOrganization();

    return () => {
      active = false;
    };
  }, [AffiliationService, org?.orgkey]);

  return (
    <Container className="organization-content">
      <ContentHeader title="Organização" />
      <Content>
        {organization ? (
          <OrganizationCard
            name={organization.name}
            members={organization.members}
            projects={organization.projects}
            role={organization.role}
          />
        ) : (
          <EmptyMessage>
            {loading
              ? "Carregando organização..."
              : "Não foi possível encontrar a organização selecionada."}
          </EmptyMessage>
        )}
      </Content>
    </Container>
  );
}
