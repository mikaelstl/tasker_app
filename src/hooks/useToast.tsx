import {
  CheckIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@/components/icons/heroicons";
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

function optionsWithId(
  message: string,
  options: ToastOptions,
): ToastOptions {
  return {
    ...options,
    toastId: `tasker:${message}`,
  };
}

export const notifications = {
  info: (message: string) => toast.info(message, optionsWithId(message, infoOptions)),
  warning: (message: string) => toast.warn(message, optionsWithId(message, warningOptions)),
  error: (message: string) => toast.error(message, optionsWithId(message, errorOptions)),
  critical: (message: string) => toast.error(message, optionsWithId(message, criticalOptions)),
  validation: (message: string) => toast.info(message, optionsWithId(message, validationOptions)),
};

export interface ToastNotifications {
  info(message: string): void;
  warning(message: string): void;
  error(message: string): void;
  critical(message: string): void;
  validation(message: string): void;
}

export function useToast(): ToastNotifications {
  return notifications;
}
