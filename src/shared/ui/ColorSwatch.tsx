import { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

interface ColorSwatchProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  hex: string;
  label: string;
  active?: boolean;
}

export function ColorSwatch({
  hex,
  label,
  active,
  className,
  ...props
}: ColorSwatchProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex cursor-pointer items-center gap-2 text-sm leading-none font-medium transition-colors 3xl:text-base",
        active ? "fond-semibold" : "border-border",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "h-4.25 w-4.25 3xl:h-4.75 3xl:w-4.75",
          active
            ? "outline-2 outline-offset-1 outline-dark-main"
            : hex.toUpperCase() === "#FFFFFF" && "border border-border",
        )}
        style={{ backgroundColor: hex }}
        aria-hidden
      />
      <span>{label}</span>
    </button>
  );
}
