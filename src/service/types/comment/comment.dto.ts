import type { MemberRecordDTO } from "../member/member.dto";
import type { ProjectDTO } from "../project/project.dto";

export interface CommentDTO {
  readonly id:          string;
  readonly content:     string;
  readonly date:        string;
  readonly ownerkey:   string | null;
  readonly projectkey:  string;
  readonly created_at: Date;

  readonly owner?:   MemberRecordDTO;
  readonly project?:  ProjectDTO;
}