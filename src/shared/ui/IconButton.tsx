import { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export function IconButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-full bg-background text-foreground transition-colors",
        className,
      )}
      {...props}
    />
  );
}
