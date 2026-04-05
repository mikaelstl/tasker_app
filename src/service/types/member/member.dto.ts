import type { TaskDTO } from "../task/task.dto";
// import type { UserDTO } from "../user/user.dto";
import type { MemberRole } from "./role.dto";

export interface ProjectMember {
  readonly id: string;
  readonly projectkey: string;
  readonly userkey: string;
  // readonly user: UserDTO;
  readonly role: MemberRole;
  readonly tasks: TaskDTO[];
}