import { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active, className, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex cursor-pointer items-center justify-center border px-4.5 py-2.5 text-xs leading-none transition-colors",
        active
          ? "border-[#99999933] bg-foreground font-bold text-white"
          : "border-border bg-background text-foreground hover:border-foreground",
        className,
      )}
      {...props}
    />
  );
}
