import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Users } from "@/components/icons";
import { RoleBadges } from "@/components/badge/RoleBadge";
import { formatOrgAvatar } from "@/utils/formatOrgAvatar";
import { formatNumber } from "@/utils/formatNumber";
import type { OrgRole } from "@/utils/enums/OrgRole";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface OrganizatioCardProps {
  orgkey: string
  role: OrgRole
  name: string
  members: number
  projects: number
  onSelect?: (orgkey: string, role: OrgRole) => void
}

interface OrgCardLabelProps {
  value: number
  type: OrgCardLabelType
}

type OrgCardLabelType = "members" | "projects"

type IconTypeMap = {
  [K in OrgCardLabelType]: ReactNode
}

const OrgCardLabel = ({ value, type }: OrgCardLabelProps) => {
  const iconTypeMap: IconTypeMap = {
    members: <Users className="size-4 shrink-0 text-muted-foreground" />,
    projects: <FolderOpen className="size-4 shrink-0 text-muted-foreground" />,
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {iconTypeMap[type]}
      <span className="font-medium text-muted-foreground">
        {formatNumber(value)}
      </span>
      <span>{type}</span>
    </div>
  )
}

export function OrganizationCard({
  orgkey,
  role,
  name,
  members,
  projects,
  onSelect,
}: OrganizatioCardProps) {
  const handleSelect = () => {
    onSelect?.(orgkey, role)
  }

  return (
    <Card
      className={cn(
        "group w-full max-w-xl cursor-pointer gap-0 border bg-card/95 py-0 shadow-sm hover:border-primary hover:shadow-md"
      )}
      onClick={handleSelect}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={(event) => {
        if (!onSelect) return

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          handleSelect()
        }
      }}
    >
      <CardHeader className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-4">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <span className="text-base font-semibold tracking-wide">
            {formatOrgAvatar(name)}
          </span>
        </div>

        <div className="min-w-0">
          <CardTitle className="truncate text-base font-semibold">
            {name}
          </CardTitle>
        </div>

        <div className="justify-self-end">{RoleBadges[role]}</div>
      </CardHeader>

      <CardContent className="px-4 pb-4 pt-0">
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <OrgCardLabel type="members" value={members} />
          <OrgCardLabel type="projects" value={projects} />
        </div>
      </CardContent>
    </Card>
  )
}
