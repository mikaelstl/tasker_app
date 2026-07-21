import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/16/solid";
import { toast, type ToastOptions } from "react-toastify";
import Palette from "@/assets/palette";

export type ToastLevel = "info" | "warning" | "error" | "critical" | "validation";

const baseStyle = {
  color: Palette.white,
};

const infoOptions: ToastOptions = {
  style: {
    ...baseStyle,
    backgroundColor: Palette.green_25,
    border: `1px solid ${Palette.green}`,
  },
  icon: <CheckIcon fill={Palette.white} width={16} />,
};

const warningOptions: ToastOptions = {
  style: {
    ...baseStyle,
    backgroundColor: Palette.yellow_25,
    border: `1px solid ${Palette.yellow}`,
  },
  icon: <ExclamationTriangleIcon fill={Palette.white} width={16} />,
};

const errorOptions: ToastOptions = {
  style: { border: `1px solid ${Palette.red}` },
};

const criticalOptions: ToastOptions = {
  style: {
    ...baseStyle,
    backgroundColor: Palette.red_25,
    border: `1px solid ${Palette.red}`,
  },
  icon: <ExclamationCircleIcon fill={Palette.white} width={16} />,
};

const validationOptions: ToastOptions = {
  style: { border: `1px solid ${Palette.lightBlue}` },
};

const notifications = {
  info: (message: string) => toast.info(message, infoOptions),
  warning: (message: string) => toast.warn(message, warningOptions),
  error: (message: string) => toast.error(message, errorOptions),
  critical: (message: string) => toast.warning(message, criticalOptions),
  validation: (message: string) => toast.info(message, validationOptions),
};

export type ToastNotifications = typeof notifications;

export function useToast(): ToastNotifications {
  return notifications;
}
