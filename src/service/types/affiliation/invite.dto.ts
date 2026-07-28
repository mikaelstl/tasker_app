export interface OrganizationInviteCreateResponse {
  readonly id: string;
  readonly token: string;
  readonly expiresAt: string;
}

export interface OrganizationInvitePreviewResponse {
  readonly valid: boolean;
  readonly expiresAt: string;
  readonly organization: {
    readonly id: string;
    readonly name: string;
  };
}

export interface OrganizationInviteTokenDTO {
  readonly token: string;
}

export interface RevokeOrganizationInviteDTO {
  readonly inviteId: string;
}

// Legacy alias kept so older mock code or external imports do not break while
// the invite flow is migrated to the new /org/invites contract.
export interface AffiliationInviteDTO {
  readonly token: string;
  readonly orgkey: string;
  readonly expires_at: string;
}
