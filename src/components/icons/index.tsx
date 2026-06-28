import type { LucideIcon, LucideProps } from 'lucide-react';
import {
  AppWindow as AppWindowIcon,
  ArrowLeft as ArrowLeftIcon,
  Bell as BellIcon,
  Building2 as Building2Icon,
  Calendar as CalendarIcon,
  ChartBar as ChartBarIcon,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronUp as ChevronUpIcon,
  Check as CheckIcon,
  CircleAlert as CircleAlertIcon,
  Clipboard as ClipboardIcon,
  LogOut as LogOutIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Flag as FlagIcon,
  FolderOpen as FolderOpenIcon,
  Inbox as InboxIcon,
  KeyRound as KeyRoundIcon,
  Link2 as Link2Icon,
  Mail as MailIcon,
  MessageCircle as MessageCircleIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  ShieldAlert as ShieldAlertIcon,
  ShieldCheck as ShieldCheckIcon,
  Settings2 as Settings2Icon,
  Tag as TagIcon,
  TrendingUp as TrendingUpIcon,
  TriangleAlert as TriangleAlertIcon,
  User as UserIcon,
  Users as UsersIcon,
  X as XIcon,
  Send as SendIcon,
} from "lucide-react";

const withDefaultSize = (Icon: LucideIcon) => {
  return ({ className, ...props }: LucideProps) => (
    <Icon
      size={20}
      className={["tskr-icon", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
};

export const AppWindow = withDefaultSize(AppWindowIcon);
export const ArrowLeft = withDefaultSize(ArrowLeftIcon);
export const Bell = withDefaultSize(BellIcon);
export const Building2 = withDefaultSize(Building2Icon);
export const Calendar = withDefaultSize(CalendarIcon);
export const ChartBar = withDefaultSize(ChartBarIcon);
export const ChevronDown = withDefaultSize(ChevronDownIcon);
export const ChevronLeft = withDefaultSize(ChevronLeftIcon);
export const ChevronRight = withDefaultSize(ChevronRightIcon);
export const ChevronUp = withDefaultSize(ChevronUpIcon);
export const Check = withDefaultSize(CheckIcon);
export const CircleAlert = withDefaultSize(CircleAlertIcon);
export const Clipboard = withDefaultSize(ClipboardIcon);
export const LogOut = withDefaultSize(LogOutIcon);
export const Eye = withDefaultSize(EyeIcon);
export const EyeOff = withDefaultSize(EyeOffIcon);
export const Flag = withDefaultSize(FlagIcon);
export const FolderOpen = withDefaultSize(FolderOpenIcon);
export const Inbox = withDefaultSize(InboxIcon);
export const KeyRound = withDefaultSize(KeyRoundIcon);
export const Link2 = withDefaultSize(Link2Icon);
export const Mail = withDefaultSize(MailIcon);
export const MessageCircle = withDefaultSize(MessageCircleIcon);
export const Plus = withDefaultSize(PlusIcon);
export const Search = withDefaultSize(SearchIcon);
export const Settings = withDefaultSize(SettingsIcon);
export const ShieldAlert = withDefaultSize(ShieldAlertIcon);
export const ShieldCheck = withDefaultSize(ShieldCheckIcon);
export const Settings2 = withDefaultSize(Settings2Icon);
export const Tag = withDefaultSize(TagIcon);
export const TrendingUp = withDefaultSize(TrendingUpIcon);
export const TriangleAlert = withDefaultSize(TriangleAlertIcon);
export const User = withDefaultSize(UserIcon);
export const Users = withDefaultSize(UsersIcon);
export const X = withDefaultSize(XIcon);
export const Send = withDefaultSize(SendIcon);
