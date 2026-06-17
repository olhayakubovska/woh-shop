import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <p className="text-lg font-semibold">{title}</p>
      {description && (
        <p className="max-w-md text-sm text-text-muted">{description}</p>
      )}
      {action}
    </div>
  );
}
