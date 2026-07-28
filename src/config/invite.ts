const INVITE_SESSION_KEY = "tasker.invite.pending-token";

export function savePendingInviteToken(token: string): void {
  sessionStorage.setItem(INVITE_SESSION_KEY, token);
}

export function readPendingInviteToken(): string | null {
  return sessionStorage.getItem(INVITE_SESSION_KEY);
}

export function clearPendingInviteToken(): void {
  sessionStorage.removeItem(INVITE_SESSION_KEY);
}

export function buildInviteUrl(token: string): string {
  return `${window.location.origin}/org/join/${encodeURIComponent(token)}`;
}

