"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Spinner } from "@/shared/ui/Spinner";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Не вдалося завантажити товари",
  description = "Спробуйте оновити сторінку або повторіть спробу пізніше.",
  onRetry,
}: ErrorStateProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    setIsRetrying(true);
    await Promise.resolve(onRetry());
    setTimeout(() => setIsRetrying(false), 1000);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <p className="text-lg font-semibold">{title}</p>
      <p className="max-w-md text-sm text-text-muted">{description}</p>
      {onRetry && (
        <Button
          onClick={handleRetry}
          disabled={isRetrying}
          className="min-w-40 border border-dark-main px-8 py-3 text-xs font-semibold tracking-[0.04em] uppercase hover:bg-dark-main hover:text-white-main"
        >
          {isRetrying ? <Spinner className="h-4 w-4" /> : "Спробувати ще раз"}
        </Button>
      )}
    </div>
  );
}
