import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";
import { toast } from "react-toastify";
import Palette from "../assets/palette";

export const Toasts = {
  'info': (content: string) => toast.info(content),
  'warning': (content: string) => toast.warn(content, {
    style: { backgroundColor: Palette.yellow, color: Palette.white },
    icon: <ExclamationTriangleIcon fill={Palette.white} width={16}/>
  }),
  'error': (content: string) => toast.error(content),
  'critical': (content: string) => toast.warning(content),
  'validation': (content: string) => toast.info(content),
}