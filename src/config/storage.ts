export const STORAGE_KEYS = {
  auth: {
    user: "tasker.auth.user",
    token: "tasker.auth.token",
  },
  organization: {
    orgkey: "tasker.org.orgkey",
    role: "tasker.org.role",
    current: "tasker.org.current",
  },
} as const;

export function clearAuthStorage(): void {
  localStorage.removeItem(STORAGE_KEYS.auth.user);
  localStorage.removeItem(STORAGE_KEYS.auth.token);
}

export function clearOrganizationStorage(): void {
  localStorage.removeItem(STORAGE_KEYS.organization.orgkey);
  localStorage.removeItem(STORAGE_KEYS.organization.role);
  localStorage.removeItem(STORAGE_KEYS.organization.current);
}

export function clearSessionStorage(): void {
  clearAuthStorage();
  clearOrganizationStorage();
}
