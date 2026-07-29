import type { CurrentAccountDTO } from "../types/account/current-account.dto";
import type { AffiliationDTO } from "../types/affiliation/affiliation.dto";
import type { ApiError } from "../types/response/error";
import { STORAGE_KEYS } from "@/config/storage";

export interface MockRequestHeaders {
  readonly Authorization?: string;
  readonly "x-org-key"?: string;
}

export interface MockRequestContext {
  readonly currentAccount: CurrentAccountDTO | null;
  readonly orgkey: string | null;
  readonly token: string | null;
  readonly headers: MockRequestHeaders;
}

function storageItem(key: string): string | null {
  if (typeof localStorage === "undefined") {
    return null;
  }

  return localStorage.getItem(key);
}

function readCurrentAccount(): CurrentAccountDTO | null {
  const storedUser = storageItem(STORAGE_KEYS.auth.user);

  if (!storedUser) {
    return null;
  }

  try {
    const account = JSON.parse(storedUser) as CurrentAccountDTO;

    if (!account.id || !account.username || !account.email) {
      return null;
    }

    return {
      id: account.id,
      username: account.username,
      email: account.email,
      ...(account.role ? { role: account.role } : {}),
    };
  } catch {
    return null;
  }
}

function readOrgKey(): string | null {
  const orgkey = storageItem(STORAGE_KEYS.organization.orgkey);

  if (orgkey) {
    return orgkey;
  }

  const storedOrg = storageItem(STORAGE_KEYS.organization.current);

  if (!storedOrg) {
    return null;
  }

  try {
    const parsed = JSON.parse(storedOrg) as { orgkey?: unknown };

    return typeof parsed.orgkey === "string" && parsed.orgkey
      ? parsed.orgkey
      : null;
  } catch {
    return null;
  }
}

export function readMockRequestContext(): MockRequestContext {
  const currentAccount = readCurrentAccount();
  const token = storageItem(STORAGE_KEYS.auth.token);
  const orgkey = readOrgKey();

  return {
    currentAccount,
    token,
    orgkey,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(orgkey ? { "x-org-key": orgkey } : {}),
    },
  };
}

export function createMockRequestError(
  path: string,
  status: number,
  message: string,
): ApiError {
  return {
    status,
    errors: [{ level: "error", message }],
    timestamp: new Date().toISOString(),
    path,
  };
}

export function requireMockCurrentAccount(path: string): CurrentAccountDTO {
  const context = readMockRequestContext();

  if (!context.headers.Authorization || !context.currentAccount) {
    throw createMockRequestError(path, 401, "Usuário não autenticado.");
  }

  return context.currentAccount;
}

export function requireMockOrgRequest(
  path: string,
  affiliations: AffiliationDTO[],
): { currentAccount: CurrentAccountDTO; orgkey: string; headers: MockRequestHeaders } {
  const context = readMockRequestContext();
  const orgkey = context.headers["x-org-key"];

  if (!context.headers.Authorization || !context.currentAccount) {
    throw createMockRequestError(path, 401, "Usuário não autenticado.");
  }

  if (!orgkey) {
    throw createMockRequestError(path, 400, "Header x-org-key não informado.");
  }

  const hasAccess = affiliations.some(
    (affiliation) => (
      affiliation.orgkey === context.orgkey
      && affiliation.userkey === context.currentAccount?.username
    ),
  );

  if (!hasAccess) {
    throw createMockRequestError(
      path,
      403,
      "Usuário não possui acesso à organização informada.",
    );
  }

  return {
    currentAccount: context.currentAccount,
    orgkey,
    headers: context.headers,
  };
}
