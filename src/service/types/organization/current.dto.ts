import type { OrgRole } from "@/utils/enums/OrgRole";

export interface CurrentOrg {
  readonly affiliationId: string;
  readonly orgkey: string;
  readonly role: OrgRole;
}