import { CheckIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";
import Palette from "../../assets/palette";

export const Toasts = {
  'info': (content: string) => toast.info(content, {
    style: {
      backgroundColor: Palette.green_25,
      border: `1px solid ${Palette.green}`,
      color: Palette.white,
    },
    icon: <CheckIcon fill={Palette.white} width={16}/>
  }),
  'warning': (content: string) => toast.warn(content, {
    style: {
      backgroundColor: Palette.yellow_25,
      border: `1px solid ${Palette.yellow}`,
      color: Palette.white,
    },
    icon: <ExclamationTriangleIcon fill={Palette.white} width={16}/>
  }),
  'error': (content: string) => toast.error(content, {
    style: { border: `1px solid ${Palette.red}` },
  }),
  'critical': (content: string) => toast.warning(content, {
    style: {
      backgroundColor: Palette.red_25,
      border: `1px solid ${Palette.red}`,
      color: Palette.white,
    },
    icon: <ExclamationCircleIcon fill={Palette.white} width={16}/>
  }),
  'validation': (content: string) => toast.info(content, {
    style: { border: `1px solid ${Palette.lightBlue}` },
  }),
}
