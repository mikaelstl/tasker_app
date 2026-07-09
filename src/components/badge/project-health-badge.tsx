import { Badge } from "@/components/ui/badge";

export enum ProjectHealthStatus {
  SAFE='SAFE',
  WARNING='WARNING',
  CRITICAL='CRITICAL'
}

type RoleBadgesType = {
  [k in ProjectHealthStatus]: React.ReactNode
}

export const ProjectHealthBadge: RoleBadgesType = {
  SAFE: <Badge variant='info'>seguro</Badge>,
  WARNING: <Badge variant='warning'>em alerta</Badge>,
  CRITICAL: <Badge variant='destructive'>critico</Badge>,
}
