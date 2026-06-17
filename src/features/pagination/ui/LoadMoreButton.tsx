import { Button } from "@/shared/ui/Button";
import { Spinner } from "@/shared/ui/Spinner";

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  remaining: number;
}

export function LoadMoreButton({
  onClick,
  isLoading,
  remaining,
}: LoadMoreButtonProps) {
  if (remaining <= 0) return null;

  return (
    <div className="mt-6 flex justify-center">
      <Button
        onClick={onClick}
        disabled={isLoading}
        className="w-full max-w-59.25 rounded-none border border-dark-main bg-transparent px-10 py-3 text-xs font-medium tracking-[0.04em] text-dark-main hover:bg-dark-main hover:text-white-main md:h-10.25 md:max-w-65.75 md:text-sm md:leading-none"
      >
        {isLoading ? (
          <Spinner className="h-4 w-4" />
        ) : (
          `Показати ще ${remaining} товари`
        )}
      </Button>
    </div>
  );
}
