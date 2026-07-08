import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User as UserIcon } from "lucide-react";

interface UserProps {
  image?: string;
  online?: boolean;
  username: string
  className?: string;
}

export function User(props: UserProps) {
  const initials = props.username
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <div className={cn("inline-flex items-center gap-2.5", props.className)}>
      <Avatar size="sm" className="relative">
        {props.image ? <AvatarImage src={props.image} alt={props.username} /> : null}
        <AvatarFallback>{initials || <UserIcon />}</AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium leading-none">
          {props.username}
        </span>
      </div>
    </div>
  )
}
