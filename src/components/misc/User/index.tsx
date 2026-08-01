import Palette from "@/assets/palette";
import { useEffect, useState } from "react";
import { ComputerDesktopIcon } from "@/components/icons/heroicons";
import { useOrganization } from "@/hooks/useOrganization";
import { useServices } from "@/hooks/useServices";
import type { UserDTO } from "@/service/types/user/user.dto";
import { Avatar } from "../Avatar";
import { Actor, ActorAvatar, ActorIdentity, ActorName } from "./style";

interface UserProps {
  online?: boolean;
  affiliationId?: string;
  username?: string;
  actorName?: string;
  actorUsername?: string | null;
  actorPhotoUrl?: string | null;
  isSystem?: boolean;
  className?: string;
  avatarSize?: number;
}

export function User({
  online = false,
  affiliationId,
  username,
  isSystem = false,
  className,
  avatarSize = 32,
}: UserProps) {
  const { AffiliationService } = useServices();
  const { org } = useOrganization();
  const [user, setUser] = useState<UserDTO | null>(null);

  const loadInfos = async () => {
    let active = true;

    try {
      if (!affiliationId || !org?.orgkey || isSystem) {
        return () => {
          active = false;
        };
      }

      const result = await AffiliationService.findById(affiliationId);

      console.log(result.data);
      

      setUser(result.data.user ?? null);
      
      return () => {
      active = false;
    };
  } catch (error) {
    
    setUser(null);
  }
}

useEffect(() => {
  loadInfos();
}, [AffiliationService, affiliationId, isSystem, org?.orgkey]);

const displayName = user?.name ?? username ?? "Usuário removido";
const displayUsername = user?.username;

return (
  <Actor className={`tskr-user${className ? ` ${className}` : ""}`}>
    <ActorAvatar $size={avatarSize}>
      {isSystem
        ? <ComputerDesktopIcon fill={Palette.gray} aria-hidden="true" />
        : <Avatar online={online} size="small" image="" />}
    </ActorAvatar>
    <ActorIdentity>
      <ActorName>{displayName}</ActorName>
      {displayUsername && <span>@{displayUsername}</span>}
    </ActorIdentity>
  </Actor>
)
}
