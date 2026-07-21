import { Container, MemberAvatar, RemainingMembers } from "./style";

export type TeamMember = string | {
  id?: string;
  username?: string;
  userkey?: string;
  user?: {
    username?: string;
    userkey?: string;
    user?: {
      username?: string;
    };
  };
};

interface TeamProps {
  members: readonly TeamMember[];
  color?: string;
}

const MAX_VISIBLE_MEMBERS = 3;

const AVATAR_COLORS = [
  "#2563EB",
  "#7C3AED",
  "#DB2777",
  "#DC2626",
  "#D97706",
  "#059669",
  "#0891B2",
  "#4F46E5",
];

function getUsername(member: TeamMember) {
  if (typeof member === "string") return member;

  return member.username
    ?? member.user?.username
    ?? member.user?.user?.username
    ?? member.userkey
    ?? member.user?.userkey
    ?? "?";
}

function getInitial(username: string) {
  const normalizedUsername = username.trim().replace(/^@/, "");
  return Array.from(normalizedUsername)[0]?.toLocaleUpperCase("pt-BR") ?? "?";
}

function getAvatarColor(username: string) {
  const hash = Array.from(username).reduce(
    (value, character) => ((value << 5) - value + character.codePointAt(0)!) | 0,
    0,
  );

  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function Team({ members, color }: TeamProps) {
  const visibleMembers = members.slice(0, MAX_VISIBLE_MEMBERS);
  const remainingMembers = members.length - visibleMembers.length;

  return (
    <Container
      className="tskr-team"
      $outlineColor={color}
      role="group"
      aria-label={`${members.length} membros no projeto`}
    >
      {visibleMembers.map((member, index) => {
        const username = getUsername(member);
        const key = typeof member === "string" ? `${member}-${index}` : member.id ?? `${username}-${index}`;

        return (
          <MemberAvatar
            key={key}
            $background={getAvatarColor(username)}
            role="img"
            title={`@${username}`}
            aria-label={`Membro @${username}`}
          >
            {getInitial(username)}
          </MemberAvatar>
        );
      })}

      {remainingMembers > 0 && (
        <RemainingMembers
          role="img"
          title={`Mais ${remainingMembers} membros`}
          aria-label={`Mais ${remainingMembers} membros`}
        >
          +{remainingMembers}
        </RemainingMembers>
      )}
    </Container>
  );
}
