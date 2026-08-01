import Palette from "@/assets/palette";
import { useEffect, useState } from "react";
import { Monitor } from "@/components/icons/solar-icons";
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
  actorName,
  actorUsername,
  actorPhotoUrl,
  isSystem = false,
  className,
  avatarSize = 32,
}: UserProps) {
  const { AffiliationService } = useServices();
  const { org } = useOrganization();
  const [user, setUser] = useState<UserDTO | null>(null);

  useEffect(() => {
    let active = true;

    if (isSystem || !affiliationId || !org?.orgkey) {
      setUser(null);
      return () => {
        active = false;
      };
    }

    void AffiliationService.findById(affiliationId)
      .then((result) => {
        if (active) setUser(result.data.user ?? null);
      })
      .catch(() => {
        if (active) setUser(null);
      });

    return () => {
      active = false;
    };
  }, [AffiliationService, affiliationId, isSystem, org?.orgkey]);

  useEffect(() => console.log(user), [user])

  const displayName = user?.name ?? actorName ?? username ?? "Usuário removido";
  const displayUsername = user?.username ?? actorUsername;
  const displayPhotoUrl = actorPhotoUrl ?? "";

  return (
    <Actor className={`tskr-user${className ? ` ${className}` : ""}`}>
      <ActorAvatar $size={avatarSize}>
        {isSystem
          ? <Monitor fill={Palette.gray} aria-hidden="true" />
          : <Avatar online={online} size="small" image={displayPhotoUrl} />}
      </ActorAvatar>
      <ActorIdentity>
        <ActorName>{displayName}</ActorName>
        {displayUsername && <span>@{displayUsername}</span>}
      </ActorIdentity>
    </Actor>
  );
}
