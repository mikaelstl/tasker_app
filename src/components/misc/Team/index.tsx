import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/components/ui/avatar";

const avatars = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'OS',
    name: 'Olivia Sparks'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'HL',
    name: 'Howard Lloyd'
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
    fallback: 'HR',
    name: 'Hallie Richards'
  }
]

export function Team() {
  return (
    <AvatarGroup>
      {avatars.map((avatar, index) => (
        <Avatar key={index} className='ring-card ring-2'>
          <AvatarImage className='ring-card ring-2' src={avatar.src} alt={avatar.name} />
          <AvatarFallback className='ring-card ring-2'>{avatar.fallback}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount className='ring-card ring-2'>+n</AvatarGroupCount>
    </AvatarGroup>
  )
}