"use client";

import { ReactNode, useState } from "react";
import { ChevronFilterIcon } from "@/shared/ui/icons";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  noBorder?: boolean;
}

export function FilterSection({
  title,
  children,
  defaultOpen = true,
  noBorder,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between text-left font-montserrat text-xs font-bold tracking-[1px] uppercase 3xl:text-base 3xl:leading-5"
      >
        {title}
        <ChevronFilterIcon className={isOpen ? "" : "rotate-180"} />
      </button>
      {isOpen && (
        <div
          className={`mt-3 space-y-3 3xl:mt-6 3xl:space-y-4 ${noBorder ? "" : "3xl:border-l 3xl:border-border 3xl:pl-3"}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
