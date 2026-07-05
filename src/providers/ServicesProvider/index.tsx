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
import { useMemo } from "react";

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const api = useApi();

  const services = useMemo(() => {
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

  return (
    <ServicesContext.Provider value={{ ...services }}>
      {children}
    </ServicesContext.Provider>
  )
}
