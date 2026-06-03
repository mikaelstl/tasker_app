const REGEX = /[^\p{L}\p{N}()]/gu;

export function formatOrgAvatar(name: string) {
  const words = name.trim().split(REGEX);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}