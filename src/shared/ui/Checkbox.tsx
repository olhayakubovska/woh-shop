import { InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: string;
}

export function Checkbox({
  label,
  className,
  checked,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 text-sm leading-none font-medium 3xl:text-base",
        checked ? "text-pink-main" : "text-foreground",
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        className="peer sr-only"
        {...props}
      />

      <span
        className={cn(
          "flex h-4.25 w-4.25 shrink-0 items-center justify-center border transition-colors 3xl:h-4.75 3xl:w-4.75",
          checked
            ? "border-pink-main bg-pink-main"
            : "border-border bg-background",
        )}
      >
        {checked && (
          <svg
            viewBox="0 0 16 16"
            className="h-3 w-3 fill-none stroke-white stroke-[2.5]"
          >
            <path
              d="M3 8.5L6.5 12L13 4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span>{label}</span>
    </label>
  );
}
