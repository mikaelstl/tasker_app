import type { OrgRole } from "@/utils/enums/OrgRole"

export type CurrentAccountDTO = {
  id: string,
  username: string,
  email: string,
  role?: OrgRole
}