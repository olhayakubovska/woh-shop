import { cn } from "@/shared/lib/cn";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-4 w-4 animate-spin rounded-full border-2 border-border border-t-pink-main",
        className,
      )}
      role="status"
      aria-label="Завантаження"
    />
  );
}
