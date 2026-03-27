import { CheckIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";
import Palette from "../../assets/palette";

export const Toasts = {
  'info': (content: string) => toast.info(content, {
    style: { backgroundColor: Palette.green_50, color: Palette.white },
    icon: <CheckIcon fill={Palette.white} width={16}/>
  }),
  'warning': (content: string) => toast.warn(content, {
    style: { backgroundColor: Palette.yellow_50, color: Palette.white },
    icon: <ExclamationTriangleIcon fill={Palette.white} width={16}/>
  }),
  'error': (content: string) => toast.error(content),
  'critical': (content: string) => toast.warning(content, {
    style: { backgroundColor: Palette.red_50, color: Palette.white },
    icon: <ExclamationCircleIcon fill={Palette.white} width={16}/>
  }),
  'validation': (content: string) => toast.info(content),
}