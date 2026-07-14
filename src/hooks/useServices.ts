import { useContext } from "react";
import { ServicesContext } from "../context/ServicesContext";

export function useServices() {
  const ctx = useContext(ServicesContext);

  if (!ctx) throw new Error("useServices must be used only inside ServicesProvider");

  const {
    AccountService,
    UserService,
    ProjectService,
    OrganizationService,
    TaskService,
    AffiliationService,
    CommentService,
    EventService,
    MemberService
  } = ctx;

  return {
    AccountService,
    UserService,
    ProjectService,
    OrganizationService,
    TaskService,
    AffiliationService,
    CommentService,
    EventService,
    MemberService
  };
}