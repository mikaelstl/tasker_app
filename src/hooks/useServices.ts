import { useContext } from "react";
import { ServicesContext } from "../context/ServicesContext";

export function useServices() {
  const ctx = useContext(ServicesContext);

  if (!ctx) throw new Error("useServices must be used only inside ServicesProvider");

  const {
    accounts,
    users,
    projects,
    organizations,
    tasks,
    affiliations,
    comments,
    events,
    members
  } = ctx;

  return {
    accounts,
    users,
    projects,
    organizations,
    tasks,
    affiliations,
    comments,
    events,
    members
  };
}