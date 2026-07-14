import type { OrgRole } from "@/utils/enums/OrgRole";

export interface CurrentOrg {
  readonly orgkey: string;
  readonly role: OrgRole;
}