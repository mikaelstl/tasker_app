import type { ComponentType } from "react";
import {
  AddCircle as AddCircleIcon,
  AltArrowDown as AltArrowDownIcon,
  AltArrowLeft as AltArrowLeftIcon,
  AltArrowRight as AltArrowRightIcon,
  AltArrowUp as AltArrowUpIcon,
  ArchiveDown as ArchiveDownIcon,
  ArrowDown as ArrowDownIcon,
  ArrowUp as ArrowUpIcon,
  Bell as BellIcon,
  Buildings as BuildingsIcon,
  Buildings2 as Buildings2Icon,
  Calendar as CalendarIcon,
  Chart as ChartIcon,
  ChatRound as ChatRoundIcon,
  CheckCircle as CheckCircleIcon,
  CheckSquare as CheckSquareIcon,
  Clipboard as ClipboardIcon,
  ClipboardCheck as ClipboardCheckIcon,
  ClockCircle as ClockCircleIcon,
  CloseCircle as CloseCircleIcon,
  DangerCircle as DangerCircleIcon,
  DangerTriangle as DangerTriangleIcon,
  Eye as EyeIcon,
  EyeClosed as EyeClosedIcon,
  Flag as FlagIcon,
  FolderOpen as FolderOpenIcon,
  GraphUp as GraphUpIcon,
  Home as HomeIcon,
  Inbox as InboxIcon,
  Key as KeyIcon,
  Letter as LetterIcon,
  Link as LinkIcon,
  Logout as LogoutIcon,
  Magnifer as MagniferIcon,
  MenuDots as MenuDotsIcon,
  Monitor as MonitorIcon,
  Restart as RestartIcon,
  Rocket as RocketIcon,
  Settings as SettingsIcon,
  ShieldCheck as ShieldCheckIcon,
  ShieldWarning as ShieldWarningIcon,
  Tag as TagIcon,
  TestTube as TestTubeIcon,
  TrashBin2 as TrashBin2Icon,
  TransferHorizontal as TransferHorizontalIcon,
  Tuning2 as Tuning2Icon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  UsersGroupRounded as UsersGroupRoundedIcon,
  WindowFrame as WindowFrameIcon,
  Plain
} from "@solar-icons/react";
import type { IconProps } from "@solar-icons/react";
import type { Icon } from "@solar-icons/react/lib/types";
import Palette from "@/assets/palette";

type SolarIconProps = IconProps & {
  fill?: string;
  width?: number | string;
  height?: number | string;
};

function solarIcon(IconComponent: Icon): ComponentType<SolarIconProps> {
  return function SolarIcon({
    fill,
    color,
    size,
    width,
    height,
    weight = "LineDuotone",
    ...props
  }: SolarIconProps) {
    return (
      <IconComponent
        {...props}
        color={color ?? fill ?? Palette.white}
        size={size ?? width}
        width={width}
        height={height}
        weight={weight}
      />
    );
  };
}

export const AddCircle = solarIcon(AddCircleIcon);
export const AltArrowDown = solarIcon(AltArrowDownIcon);
export const AltArrowLeft = solarIcon(AltArrowLeftIcon);
export const AltArrowRight = solarIcon(AltArrowRightIcon);
export const AltArrowUp = solarIcon(AltArrowUpIcon);
export const ArchiveDown = solarIcon(ArchiveDownIcon);
export const ArrowDown = solarIcon(ArrowDownIcon);
export const ArrowUp = solarIcon(ArrowUpIcon);
export const Bell = solarIcon(BellIcon);
export const Buildings = solarIcon(BuildingsIcon);
export const Buildings2 = solarIcon(Buildings2Icon);
export const Calendar = solarIcon(CalendarIcon);
export const Chart = solarIcon(ChartIcon);
export const ChatRound = solarIcon(ChatRoundIcon);
export const CheckCircle = solarIcon(CheckCircleIcon);
export const CheckSquare = solarIcon(CheckSquareIcon);
export const Clipboard = solarIcon(ClipboardIcon);
export const ClipboardCheck = solarIcon(ClipboardCheckIcon);
export const ClockCircle = solarIcon(ClockCircleIcon);
export const CloseCircle = solarIcon(CloseCircleIcon);
export const DangerCircle = solarIcon(DangerCircleIcon);
export const DangerTriangle = solarIcon(DangerTriangleIcon);
export const Eye = solarIcon(EyeIcon);
export const EyeClosed = solarIcon(EyeClosedIcon);
export const Flag = solarIcon(FlagIcon);
export const FolderOpen = solarIcon(FolderOpenIcon);
export const GraphUp = solarIcon(GraphUpIcon);
export const Home = solarIcon(HomeIcon);
export const Inbox = solarIcon(InboxIcon);
export const Key = solarIcon(KeyIcon);
export const Letter = solarIcon(LetterIcon);
export const Link = solarIcon(LinkIcon);
export const Logout = solarIcon(LogoutIcon);
export const Magnifer = solarIcon(MagniferIcon);
export const MenuDots = solarIcon(MenuDotsIcon);
export const Monitor = solarIcon(MonitorIcon);
export const Restart = solarIcon(RestartIcon);
export const Rocket = solarIcon(RocketIcon);
export const Settings = solarIcon(SettingsIcon);
export const ShieldCheck = solarIcon(ShieldCheckIcon);
export const ShieldWarning = solarIcon(ShieldWarningIcon);
export const Tag = solarIcon(TagIcon);
export const TestTube = solarIcon(TestTubeIcon);
export const TrashBin2 = solarIcon(TrashBin2Icon);
export const TransferHorizontal = solarIcon(TransferHorizontalIcon);
export const Tuning2 = solarIcon(Tuning2Icon);
export const User = solarIcon(UserIcon);
export const UserPlus = solarIcon(UserPlusIcon);
export const UsersGroupRounded = solarIcon(UsersGroupRoundedIcon);
export const WindowFrame = solarIcon(WindowFrameIcon);
export const Plane = solarIcon(Plain)
