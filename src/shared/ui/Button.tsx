import { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export function Button({
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "flex cursor-pointer items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
