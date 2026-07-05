import { createContext } from "react";
import type { AccountServiceI } from "@/service/modules/account/account.service";
import type { UserServiceI } from "@/service/modules/user/user.service";
import type { ProjectServiceI } from "@/service/modules/project/project.service";
import type { OrganizationServiceI } from "@/service/modules/organization/organization.service";
import type { TaskServiceI } from "@/service/modules/task/task.service";
import type { AffiliationServiceI } from "@/service/modules/affiliation/affiliation.service";
import type { CommentServiceI } from "@/service/modules/comment/comment.service";
import type { EventServiceI } from "@/service/modules/event/event.service";
import type { MemberServiceI } from "@/service/modules/member/member.service";

interface ServicesContextInterface {
  AccountService: AccountServiceI;
  UserService: UserServiceI;
  ProjectService: ProjectServiceI;
  OrganizationService: OrganizationServiceI;
  TaskService: TaskServiceI;
  AffiliationService: AffiliationServiceI;
  CommentService: CommentServiceI;
  EventService: EventServiceI;
  MemberService: MemberServiceI;
}

export const ServicesContext = createContext<ServicesContextInterface | undefined>(undefined);
