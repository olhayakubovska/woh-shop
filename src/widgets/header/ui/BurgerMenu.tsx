"use client";

import { useState } from "react";
import Link from "next/link";
import { CloseIcon, MenuIcon } from "@/shared/ui/icons";
import { IconButton } from "@/shared/ui/IconButton";

const NAV_LINKS = [
  { href: "/catalog", label: "Каталог" },
  { href: "#", label: "Колекції" },
  { href: "#", label: "Знижки" },
  { href: "#", label: "Про нас" },
  { href: "#", label: "Співпраця" },
];

export function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton
        aria-label="Меню"
        className="3xl:hidden"
        onClick={() => setIsOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <span className="font-montserrat text-sm font-semibold tracking-widest uppercase">
            Меню
          </span>
          <button
            type="button"
            aria-label="Закрити меню"
            onClick={() => setIsOpen(false)}
            className="cursor-pointer p-1"
          >
            <CloseIcon width={16} height={16} />
          </button>
        </div>

        <nav className="flex flex-col gap-1 px-6 py-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-montserrat py-3 text-sm font-medium tracking-[1.5px] uppercase hover:text-pink-main border-b border-border last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-6 pb-8">
          <span className="font-montserrat text-sm font-medium tracking-widest uppercase">
            UA
          </span>
        </div>
      </div>
    </>
  );
}
