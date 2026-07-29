import type { OrgRole } from "@/utils/enums/OrgRole";
import type { AffiliationDTO } from "../affiliation/affiliation.dto";
import type { AuditAction, AuditActorType, AuditLogActorDTO, AuditLogChanges, AuditResource } from "../audit-log/audit-log.dto";
import type { EventCategory } from "../events/event.dto";
import type { ProjectMember } from "../member/member.dto";
import type { OrganizationDTO } from "../organization/organization.dto";
import type { ProjectDTO, ProjectStage } from "../project/project.dto";
import type { TaskPriority } from "../task/priority.dto";
import type { TaskStage } from "../task/stage.dto";
import type { TaskDTO } from "../task/task.dto";
import type { UserDTO } from "../user/user.dto";

export interface MockAccountInputDTO {
  readonly id?: string;
  readonly email?: string;
  readonly password?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface MockUserInputDTO {
  readonly id?: string;
  readonly name?: string;
  readonly username?: string;
  readonly accountkey?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface MockOrganizationInputDTO {
  readonly id?: string;
  readonly name?: string;
  readonly ownerkey?: string;
  readonly owner?: UserDTO;
  readonly projects?: ProjectDTO[];
  readonly members?: AffiliationDTO[];
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface MockAffiliationInputDTO {
  readonly id?: string;
  readonly orgkey?: string;
  readonly userkey?: string;
  readonly role?: OrgRole;
  readonly org?: OrganizationDTO;
  readonly user?: UserDTO;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface MockProjectInputDTO {
  readonly id?: string;
  readonly title?: string;
  readonly description?: string;
  readonly orgkey?: string;
  readonly managerkey?: string | null;
  readonly deadline?: string;
  readonly started_at?: string | null;
  readonly done_at?: string | null;
  readonly delayed?: boolean;
  readonly stage?: ProjectStage;
  readonly members?: ProjectMember[];
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface MockProjectMemberInputDTO {
  readonly id?: string;
  readonly projectkey?: string;
  readonly userkey?: string;
  readonly tasks?: TaskDTO[];
  readonly user?: AffiliationDTO;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface MockTaskInputDTO {
  readonly id?: string;
  readonly code?: string;
  readonly name?: string;
  readonly description?: string;
  readonly projectkey?: string;
  readonly ownerkey?: string;
  readonly stage?: TaskStage;
  readonly priority?: TaskPriority;
  readonly deadline?: string;
  readonly started_at?: string | null;
  readonly done_at?: string | null;
  readonly delayed?: boolean;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface MockCommentInputDTO {
  readonly id?: string;
  readonly content?: string;
  readonly date?: string;
  readonly ownerkey?: string;
  readonly projectkey?: string;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface MockEventInputDTO {
  readonly id?: string;
  readonly title?: string;
  readonly projectkey?: string;
  readonly date?: string;
  readonly category?: EventCategory;
  readonly created_at?: string;
  readonly updated_at?: string;
}

export interface MockAuditLogInputDTO {
  readonly id?: string;
  readonly orgkey?: string;
  readonly actorkey?: string | null;
  readonly actorType?: AuditActorType;
  readonly action?: AuditAction;
  readonly resource?: AuditResource;
  readonly resourcekey?: string | null;
  readonly changes?: AuditLogChanges;
  readonly created_at?: string;
  readonly actor?: AuditLogActorDTO | null;
}

export interface MockAuthInputDTO {
  readonly account?: string;
  readonly email?: string;
  readonly access_token?: string;
  readonly username?: string;
}

export interface MockCurrentAccountInputDTO {
  readonly id?: string;
  readonly username?: string;
  readonly email?: string;
  readonly role?: OrgRole;
}

export interface AffiliationSeedDTO {
  readonly username: string;
  readonly role: OrgRole;
}

export interface OrganizationSeedDTO {
  readonly name: string;
  readonly ownerUsername: string;
  readonly affiliations: AffiliationSeedDTO[];
}
