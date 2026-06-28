import type { OrgRole } from "@/utils/enums/OrgRole";

export interface UserOrganizationSummaryDTO {
  orgkey: string;
  role: OrgRole;
  name: string;
  projects: number;
  members: number;
};