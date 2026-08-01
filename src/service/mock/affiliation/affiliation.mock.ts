import type { ApiResponse } from "@/service/types/response/response";
import type { AffiliationDTO } from "../../types/affiliation/affiliation.dto";
import type { UserOrganizationSummaryDTO } from "../../types/affiliation/summary.dto";
import type {
  OrganizationInviteCreateResponse,
  OrganizationInvitePreviewResponse,
} from "../../types/affiliation/invite.dto";
import { OrgRole } from "@/utils/enums/OrgRole";
import type { DefineAffiliationDTO } from "../../types/affiliation/define.dto";

import { mockData, createMockAffiliation, createMockId, createMockResponse } from "../data";
import type { AffiliationServiceI, APIMessage } from "../../modules/affiliation/affiliation.service";
import {
  createMockRequestError,
  requireMockCurrentAccount,
  requireMockOrgRequest,
} from "../request-context";

function nextRole(role: OrgRole, direction: "up" | "down"): OrgRole {
  if (direction === "up") {
    if (role === OrgRole.MEMBER) {
      return OrgRole.MANAGER;
    }

    return OrgRole.OWNER;
  }

  if (role === OrgRole.OWNER) {
    return OrgRole.MANAGER;
  }

  return OrgRole.MEMBER;
}

function requireOwnerRequest(path: string): string {
  const { currentAccount, orgkey } = requireMockOrgRequest(path, mockData.affiliations);
  const isOwner = mockData.affiliations.some(
    (affiliation) => affiliation.orgkey === orgkey
      && affiliation.userkey === currentAccount.username
      && affiliation.role === OrgRole.OWNER,
  );

  if (!isOwner) {
    throw createMockRequestError(
      path,
      403,
      "Apenas o proprietário pode gerenciar participantes.",
    );
  }

  return orgkey;
}

function buildSummary(username: string): UserOrganizationSummaryDTO[] {
  const userAffiliations = mockData.affiliations
    .filter((affiliation) => affiliation.userkey === username)
    .flatMap((currentAffiliation) => {
      const organization = mockData.organizations.find(
        (item) => item.id === currentAffiliation.orgkey,
      );

      if (!organization) {
        return [];
      }

      return [{
        orgkey: organization.id,
        role: currentAffiliation.role,
        name: organization.name,
        projects: mockData.projects.filter(
          (item) => item.orgkey === organization.id,
        ).length,
        members: mockData.affiliations.filter(
          (item) => item.orgkey === organization.id,
        ).length,
      }];
    });

    return userAffiliations;
}

interface StoredInvite extends OrganizationInviteCreateResponse {
  readonly orgkey: string;
}

const INVITES_STORAGE_KEY = "tasker.mock.affiliation-invites";
const invites = new Map<string, StoredInvite>();

function restoreInvites(): void {
  if (typeof localStorage === "undefined") return;

  try {
    const stored = JSON.parse(localStorage.getItem(INVITES_STORAGE_KEY) ?? "[]") as StoredInvite[];
    stored.forEach((invite) => invites.set(invite.token, invite));
  } catch {
    localStorage.removeItem(INVITES_STORAGE_KEY);
  }
}

function persistInvites(): void {
  if (typeof localStorage === "undefined") return;

  localStorage.setItem(INVITES_STORAGE_KEY, JSON.stringify([...invites.values()]));
}

function deleteInvite(token: string): void {
  invites.delete(token);
  persistInvites();
}

restoreInvites();

export class AffiliationMockService implements AffiliationServiceI {
  async create(data: DefineAffiliationDTO): Promise<ApiResponse<AffiliationDTO>> {
    const orgkey = requireOwnerRequest("/affiliations");
    if (data.orgkey !== orgkey) {
      throw createMockRequestError("/affiliations", 403, "A organização informada difere da organização ativa.");
    }
    const affiliation = createMockAffiliation({
      id: createMockId("affiliation"),
      orgkey,
      userkey: data.userkey,
      role: data.role ?? OrgRole.MEMBER,
      user: mockData.users.find((item) => item.username === data.userkey),
      org: mockData.organizations.find((item) => item.id === orgkey),
    });
    mockData.affiliations.push(affiliation);
    return createMockResponse(affiliation, "/affiliations", "Afiliação criada.", 201);
  }

  async list(): Promise<ApiResponse<UserOrganizationSummaryDTO[]>> {
    const currentAccount = requireMockCurrentAccount("/affiliations");
    const summary = buildSummary(currentAccount.username);

    return createMockResponse(summary, "/affiliations");
  }

  async listByOrganization(orgkey: string): Promise<ApiResponse<AffiliationDTO[]>> {
    const path = `/affiliations/${orgkey}`;
    const affiliations = mockData.affiliations.filter(
      (affiliation) => affiliation.orgkey === orgkey,
    );

    return createMockResponse(affiliations, path);
  }

  async findById(id: string): Promise<ApiResponse<AffiliationDTO>> {
    const path = `/affiliations/find/${encodeURIComponent(id)}`;
    const { orgkey } = requireMockOrgRequest(path, mockData.affiliations);
    const affiliation = mockData.affiliations.find(
      (item) => item.orgkey === orgkey && item.id === id,
    );

    if (!affiliation) {
      throw createMockRequestError(path, 404, "Afiliação do usuário não encontrada.");
    }

    return createMockResponse(
      {
        ...affiliation,
        user: affiliation.user ?? mockData.users.find((item) => item.username === affiliation.userkey),
      },
      path,
      "Afiliação encontrada com sucesso.",
    );
  }

  async participates(orgkey: string): Promise<ApiResponse<boolean>> {
    const path = `/affiliations/participates/${orgkey}`;
    const currentAccount = requireMockCurrentAccount(path);

    try {
      const affiliation = mockData.affiliations.find(
        (item) => item.userkey === currentAccount.username && item.orgkey === orgkey,
      );
      const participates = Boolean(affiliation);

      return createMockResponse(
        participates,
        path,
        participates
          ? "O usuário participa da organização."
          : "O usuário não participa da organização.",
      );
    } catch (error: unknown) {
      console.warn(
        "[ERRO] ao verificar participação do usuário na organização.",
        error,
      );

      return createMockResponse(
        false,
        path,
        "O usuário não participa da organização.",
      );
    }
  }

  async createInvite(orgkey: string): Promise<ApiResponse<OrganizationInviteCreateResponse>> {
    const selectedOrgkey = requireOwnerRequest("/org/invites");

    if (selectedOrgkey !== orgkey) {
      throw createMockRequestError(
        "/org/invites",
        403,
        "A organização do convite difere da organização selecionada.",
      );
    }

    const token = crypto.randomUUID();
    const invite: StoredInvite = {
      id: createMockId("invite"),
      token,
      orgkey,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    invites.set(token, invite);
    persistInvites();

    return createMockResponse(
      {
        id: invite.id,
        token: invite.token,
        expiresAt: invite.expiresAt,
      },
      "/org/invites",
      "Convite criado",
      201,
    );
  }

  async previewInvite(token: string): Promise<ApiResponse<OrganizationInvitePreviewResponse>> {
    const path = "/org/invites/preview";
    const invite = invites.get(token);
    const organization = invite
      ? mockData.organizations.find((item) => item.id === invite.orgkey)
      : undefined;

    if (!invite || new Date(invite.expiresAt).getTime() < Date.now()) {
      return createMockResponse(
        {
          valid: false,
          expiresAt: invite?.expiresAt ?? new Date(0).toISOString(),
          organization: {
            id: organization?.id ?? "",
            name: organization?.name ?? "",
          },
        },
        path,
      );
    }

    return createMockResponse(
      {
        valid: true,
        expiresAt: invite.expiresAt,
        organization: {
          id: organization?.id ?? invite.orgkey,
          name: organization?.name ?? "",
        },
      },
      path,
    );
  }

  async acceptInvite(token: string): Promise<ApiResponse<AffiliationDTO>> {
    const path = "/org/invites/accept";
    const currentAccount = requireMockCurrentAccount(path);
    const invite = invites.get(token);

    if (!invite || new Date(invite.expiresAt).getTime() < Date.now()) {
      throw createMockRequestError(path, 410, "Convite inválido ou expirado.");
    }

    const existingAffiliation = mockData.affiliations.find(
      (affiliation) => affiliation.orgkey === invite.orgkey
        && affiliation.userkey === currentAccount.username,
    );

    if (existingAffiliation) {
      deleteInvite(token);
      throw createMockRequestError(path, 409, "Você já participa desta organização.");
    }

    const user = mockData.users.find(
      (item) => item.username === currentAccount.username,
    );
    const organization = mockData.organizations.find(
      (item) => item.id === invite.orgkey,
    );
    const affiliation = createMockAffiliation({
      id: createMockId("affiliation"),
      orgkey: invite.orgkey,
      userkey: currentAccount.username,
      role: OrgRole.MEMBER,
      user,
      org: organization,
    });

    mockData.affiliations.push(affiliation);
    if (organization?.members) {
      organization.members.push(affiliation);
    }
    deleteInvite(token);

    return createMockResponse(affiliation, path, "Convite aceito", 201);
  }

  async rejectInvite(token: string): Promise<ApiResponse<null>> {
    const path = "/org/invites/reject";
    const currentAccount = requireMockCurrentAccount(path);
    const invite = invites.get(token);

    if (!invite || new Date(invite.expiresAt).getTime() < Date.now()) {
      throw createMockRequestError(path, 410, "Convite inválido ou expirado.");
    }

    const isMember = mockData.affiliations.some(
      (affiliation) => affiliation.orgkey === invite.orgkey
        && affiliation.userkey === currentAccount.username,
    );

    if (isMember) {
      deleteInvite(token);
      return createMockResponse(null, path, "Convite já resolvido.");
    }

    deleteInvite(token);
    return createMockResponse(null, path, "Convite rejeitado.");
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const path = `/affiliations/remove/${id}`;
    const orgkey = requireOwnerRequest(path);
    const index = mockData.affiliations.findIndex((item) => item.id === id);

    if (index >= 0 && mockData.affiliations[index].orgkey !== orgkey) {
      throw createMockRequestError(
        `/affiliations/remove/${id}`,
        403,
        "A afiliação não pertence à organização acessada.",
      );
    }

    if (index >= 0 && mockData.affiliations[index].role === OrgRole.OWNER) {
      throw createMockRequestError(path, 409, "O proprietário não pode ser removido.");
    }

    if (index >= 0) {
      mockData.affiliations.splice(index, 1);
    }

    return createMockResponse(null, `/affiliations/remove/${id}`);
  }

  async promote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>> {
    const path = `/affiliations/promote/${id}`;
    const orgkey = requireOwnerRequest(path);
    const affiliation = mockData.affiliations.find((item) => item.id === id);

    if (!affiliation) {
      return createMockResponse({ message: "Vínculo não encontrado" }, `/affiliations/promote/${id}`, "Vínculo não encontrado", 404, true);
    }

    if (affiliation.orgkey !== orgkey) {
      throw createMockRequestError(
        `/affiliations/promote/${id}`,
        403,
        "A afiliação não pertence à organização acessada.",
      );
    }

    if (affiliation.role !== OrgRole.MEMBER) {
      throw createMockRequestError(path, 409, "Somente membros podem ser promovidos a gestores.");
    }

    affiliation.role = nextRole(affiliation.role, "up");

    return createMockResponse(affiliation, `/affiliations/promote/${id}`);
  }

  async demote(id: string): Promise<ApiResponse<AffiliationDTO | APIMessage>> {
    const path = `/affiliations/demote/${id}`;
    const orgkey = requireOwnerRequest(path);
    const affiliation = mockData.affiliations.find((item) => item.id === id);

    if (!affiliation) {
      return createMockResponse({ message: "Vínculo não encontrado" }, `/affiliations/demote/${id}`, "Vínculo não encontrado", 404, true);
    }

    if (affiliation.orgkey !== orgkey) {
      throw createMockRequestError(
        `/affiliations/demote/${id}`,
        403,
        "A afiliação não pertence à organização acessada.",
      );
    }

    if (affiliation.role !== OrgRole.MANAGER) {
      throw createMockRequestError(path, 409, "Somente gestores podem ser rebaixados a membros.");
    }

    affiliation.role = nextRole(affiliation.role, "down");

    return createMockResponse(affiliation, `/affiliations/demote/${id}`);
  }
}
