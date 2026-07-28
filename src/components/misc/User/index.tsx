import Palette from "@/assets/palette";
import { ComputerDesktopIcon } from "@heroicons/react/16/solid";
import { Avatar } from "../Avatar";
import { Actor, ActorIdentity, ActorName } from "./style";

interface UserProps {
  online?: boolean;
  username?: string;
  actorName?: string;
  actorUsername?: string | null;
  actorPhotoUrl?: string | null;
  isSystem?: boolean;
  className?: string;
}

export function User({
  online = false,
  username,
  actorName,
  actorUsername = null,
  actorPhotoUrl = null,
  isSystem = false,
  className,
}: UserProps) {
  const displayName = actorName ?? username ?? "Usuário removido";

  return (
    <Actor className={`tskr-user${className ? ` ${className}` : ""}`}>
      {isSystem
        ? <ComputerDesktopIcon width={24} fill={Palette.gray} aria-hidden="true" />
        : <Avatar online={online} size="small" image={actorPhotoUrl ?? ""} />}
      <ActorIdentity>
        <ActorName>{displayName}</ActorName>
        {actorUsername && <span>@{actorUsername}</span>}
      </ActorIdentity>
    </Actor>
  )
}
