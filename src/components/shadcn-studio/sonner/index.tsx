import type { CSSProperties, ReactNode } from "react";
import { AlertTriangle, CheckCircle2, CircleAlert, Info } from "lucide-react";
import { toast, Toaster as SonnerToaster } from "sonner";

type ToastLevel = "info" | "warning" | "error" | "critical" | "validation";

const createToastStyle = (
  background: string,
  text: string,
  border: string,
): CSSProperties =>
  ({
    "--normal-bg": background,
    "--normal-text": text,
    "--normal-border": border,
  }) as CSSProperties;

const baseToastStyle = createToastStyle(
  "var(--background)",
  "var(--foreground)",
  "var(--border)",
);

const infoToastStyle = createToastStyle(
  "color-mix(in oklab, var(--color-info) 12%, var(--background))",
  "var(--color-info)",
  "var(--color-info)",
);

const warningToastStyle = createToastStyle(
  "color-mix(in oklab, var(--color-warning) 12%, var(--background))",
  "var(--color-warning)",
  "var(--color-warning)",
);

const errorToastStyle = createToastStyle(
  "color-mix(in oklab, var(--color-destructive) 12%, var(--background))",
  "var(--color-destructive)",
  "var(--color-destructive)",
);

const criticalToastStyle = createToastStyle(
  "color-mix(in oklab, var(--color-destructive) 18%, var(--background))",
  "var(--color-destructive)",
  "var(--color-destructive)",
);

const validationToastStyle = createToastStyle(
  "color-mix(in oklab, var(--color-warning) 8%, var(--background))",
  "var(--color-warning-foreground)",
  "var(--color-warning)",
);

const toastStyles: Record<ToastLevel, CSSProperties> = {
  info: infoToastStyle,
  warning: warningToastStyle,
  error: errorToastStyle,
  critical: criticalToastStyle,
  validation: validationToastStyle,
};

const toastIcons: Record<ToastLevel, ReactNode> = {
  info: <Info className="size-4" />,
  warning: <AlertTriangle className="size-4" />,
  error: <CircleAlert className="size-4" />,
  critical: <CircleAlert className="size-4" />,
  validation: <CheckCircle2 className="size-4" />,
};

export const Toasts = {
  info: (content: string) =>
    toast.info(content, {
      icon: toastIcons.info,
      style: toastStyles.info,
    }),
  warning: (content: string) =>
    toast.warning(content, {
      icon: toastIcons.warning,
      style: toastStyles.warning,
    }),
  error: (content: string) =>
    toast.error(content, {
      icon: toastIcons.error,
      style: toastStyles.error,
    }),
  critical: (content: string) =>
    toast.error(content, {
      icon: toastIcons.critical,
      style: toastStyles.critical,
    }),
  validation: (content: string) =>
    toast.info(content, {
      icon: toastIcons.validation,
      style: toastStyles.validation,
    }),
};

export function Toaster() {
  return (
    <SonnerToaster
      theme="dark"
      position="bottom-right"
      closeButton
      richColors
      toastOptions={{
        classNames: {
          toast:
            "border border-border bg-background text-foreground shadow-floating",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-secondary text-secondary-foreground",
          closeButton: "text-muted-foreground",
        },
        style: baseToastStyle,
      }}
    />
  );
}

export { toast };
