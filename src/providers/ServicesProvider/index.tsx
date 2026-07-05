import dotenv from "@/config/dotenv";
import { ServicesContext } from "@/context/ServicesContext";
import { useApi } from "@/hooks/useApi";
import mockData from "@/service/mocks/data";
import { AccountMockService } from "@/service/modules/account/account.mock";
import { AccountService } from "@/service/modules/account/account.service";
import { AffiliationMockService } from "@/service/modules/affiliation/affiliation.mock";
import { AffiliationService } from "@/service/modules/affiliation/affiliation.service";
import { CommentMockService } from "@/service/modules/comment/comment.mock";
import { CommentService } from "@/service/modules/comment/comment.service";
import { EventMockService } from "@/service/modules/event/event.mock";
import { EventService } from "@/service/modules/event/event.service";
import { MemberMockService } from "@/service/modules/member/member.mock";
import { MemberService } from "@/service/modules/member/member.service";
import { OrganizationMockService } from "@/service/modules/organization/organization.mock";
import { OrganizationService } from "@/service/modules/organization/organization.service";
import { ProjectMockService } from "@/service/modules/project/project.mock";
import { ProjectService } from "@/service/modules/project/project.service";
import { TaskMockService } from "@/service/modules/task/task.mock";
import { TaskService } from "@/service/modules/task/task.service";
import { UserMockService } from "@/service/modules/user/user.mock";
import { UserService } from "@/service/modules/user/user.service";
import { useMemo } from "react";

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const api = useApi();

  const realServices = useMemo(() => {
    return {
      AccountService: new AccountService(api),
      UserService: new UserService(api),
      ProjectService: new ProjectService(api),
      OrganizationService: new OrganizationService(api),
      TaskService: new TaskService(api),
      AffiliationService: new AffiliationService(api),
      CommentService: new CommentService(api),
      EventService: new EventService(api),
      MemberService: new MemberService(api),
    }
  }, [api]);

  const mockServices = {
    AccountService: new AccountMockService(),
    UserService: new UserMockService(),
    ProjectService: new ProjectMockService(),
    OrganizationService: new OrganizationMockService(),
    TaskService: new TaskMockService(),
    AffiliationService: new AffiliationMockService(),
    CommentService: new CommentMockService(),
    EventService: new EventMockService(),
    MemberService: new MemberMockService(),
  }

  const services = useMemo(() => { return dotenv.USE_MOCKS ? mockServices : realServices }, [realServices, mockServices]);

  return (
    <ServicesContext.Provider value={{ ...services }}>
      {children}
    </ServicesContext.Provider>
  )
}
