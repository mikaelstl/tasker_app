import type { ApiResponse } from "@/service/types/response/response";
import type { AffiliationDTO } from "../../types/affiliation/affiliation.dto";
import type { UserOrganizationSummaryDTO } from "../../types/affiliation/summary.dto";
import type { AffiliationInviteDTO } from "../../types/affiliation/invite.dto";
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

const INVITES_STORAGE_KEY = "tasker.mock.affiliation-invites";
const invites = new Map<string, AffiliationInviteDTO>();

function restoreInvites(): void {
  if (typeof localStorage === "undefined") return;

  try {
    const stored = JSON.parse(localStorage.getItem(INVITES_STORAGE_KEY) ?? "[]") as AffiliationInviteDTO[];
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

  async createInvite(orgkey: string): Promise<ApiResponse<AffiliationInviteDTO>> {
    const selectedOrgkey = requireOwnerRequest("/affiliations/invites");

    if (selectedOrgkey !== orgkey) {
      throw createMockRequestError(
        "/affiliations/invites",
        403,
        "A organização do convite difere da organização selecionada.",
      );
    }

    const token = crypto.randomUUID();
    const invite: AffiliationInviteDTO = {
      token,
      orgkey,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    invites.set(token, invite);
    persistInvites();

    return createMockResponse(invite, "/affiliations/invites", "Convite criado", 201);
  }

  async acceptInvite(token: string): Promise<ApiResponse<AffiliationDTO>> {
    const path = `/affiliations/invites/${token}/accept`;
    const currentAccount = requireMockCurrentAccount(path);
    const invite = invites.get(token);

    if (!invite || new Date(invite.expires_at).getTime() < Date.now()) {
      throw createMockRequestError(path, 404, "Convite inválido ou expirado.");
    }

    const existingAffiliation = mockData.affiliations.find(
      (affiliation) => affiliation.orgkey === invite.orgkey
        && affiliation.userkey === currentAccount.username,
    );

    if (existingAffiliation) {
      deleteInvite(token);
      return createMockResponse(existingAffiliation, path, "Você já participa desta organização");
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
