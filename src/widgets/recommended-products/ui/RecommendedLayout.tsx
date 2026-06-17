import type { ReactNode } from "react";

interface RecommendedLayoutProps {
  mobile: ReactNode;
  tablet: ReactNode;
  desktop: ReactNode;
}

export function RecommendedLayout({ mobile, tablet, desktop }: RecommendedLayoutProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:hidden">{mobile}</div>
      <div className="-mx-4 hidden snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:-mx-6 md:flex md:pb-0 3xl:hidden [&::-webkit-scrollbar]:hidden">
        {tablet}
      </div>
      <div className="hidden 3xl:grid 3xl:grid-cols-6 3xl:gap-6">{desktop}</div>
    </>
  );
}
