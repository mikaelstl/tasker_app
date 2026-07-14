import dotenv from "@/config/dotenv";
import { ServicesContext } from "@/context/ServicesContext";
import { useApi } from "@/hooks/useApi";
import { AccountService } from "@/service/modules/account/account.service";
import { AffiliationService } from "@/service/modules/affiliation/affiliation.service";
import { CommentService } from "@/service/modules/comment/comment.service";
import { EventService } from "@/service/modules/event/event.service";
import { MemberService } from "@/service/modules/member/member.service";
import { OrganizationService } from "@/service/modules/organization/organization.service";
import { ProjectService } from "@/service/modules/project/project.service";
import { TaskService } from "@/service/modules/task/task.service";
import { UserService } from "@/service/modules/user/user.service";
import { AccountMockService } from "@/service/mock/account/account.mock";
import { AffiliationMockService } from "@/service/mock/affiliation/affiliation.mock";
import { CommentMockService } from "@/service/mock/comment/comment.mock";
import { EventMockService } from "@/service/mock/event/event.mock";
import { MemberMockService } from "@/service/mock/member/member.mock";
import { OrganizationMockService } from "@/service/mock/organization/organization.mock";
import { ProjectMockService } from "@/service/mock/project/project.mock";
import { TaskMockService } from "@/service/mock/task/task.mock";
import { UserMockService } from "@/service/mock/user/user.mock";
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

  const mockServices = useMemo(() => {
    return {
      AccountService: new AccountMockService(),
      UserService: new UserMockService(),
      ProjectService: new ProjectMockService(),
      OrganizationService: new OrganizationMockService(),
      TaskService: new TaskMockService(),
      AffiliationService: new AffiliationMockService(),
      CommentService: new CommentMockService(),
      EventService: new EventMockService(),
      MemberService: new MemberMockService(),
    };
  }, []);

  const services = useMemo(() => {
    return dotenv.USE_MOCKS ? mockServices : realServices;
  }, [realServices, mockServices]);

  return (
    <ServicesContext.Provider value={{ ...services }}>
      {children}
    </ServicesContext.Provider>
  )
}
