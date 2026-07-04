import { createContext } from "react";
import type { AccountService } from "@/service/modules/account/account.service";
import type { UserService } from "@/service/modules/user/user.service";
import type { ProjectService } from "@/service/modules/project/project.service";
import type { OrganizationService } from "@/service/modules/organization/organization.service";
import type { TaskService } from "@/service/modules/task/task.service";
import type { AffiliationService } from "@/service/modules/affiliation/affiliation.service";
import type { CommentService } from "@/service/modules/comment/comment.service";
import type { EventService } from "@/service/modules/event/event.service";
import type { MemberService } from "@/service/modules/member/member.service";

interface ServicesContextInterface {
  AccountService: AccountService;
  UserService: UserService;
  ProjectService: ProjectService;
  OrganizationService: OrganizationService;
  TaskService: TaskService;
  AffiliationService: AffiliationService;
  CommentService: CommentService;
  EventService: EventService;
  MemberService: MemberService;
}

export const ServicesContext = createContext<ServicesContextInterface | undefined>(undefined);
