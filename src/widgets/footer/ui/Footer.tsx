"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/lib/cn";
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TikTokIcon,
} from "@/shared/ui/icons";

const CATALOG_LINKS = [
  "High Heels",
  "Одяг",
  "Образи",
  "Костюми",
  "Шорти",
  "Аксесуари",
];
const COMPANY_LINKS = [
  "Каталог товарів",
  "Про нас",
  "Співпраця",
  "Оплата і Доставка",
  "Гарантії і повернення",
  "Контакти",
];
const SOCIAL_LINKS = [
  { label: "Instagram", Icon: InstagramIcon },
  { label: "Facebook", Icon: FacebookIcon },
  { label: "Telegram", Icon: TelegramIcon },
  { label: "TikTok", Icon: TikTokIcon },
];

export function Footer() {
  const [activeLink, setActiveLink] = useState(CATALOG_LINKS[0]);

  return (
    <footer className="relative overflow-hidden bg-background">
      <div className="relative mx-auto grid max-w-375 gap-6 px-4 pt-14 pb-5 md:gap-8 md:px-6 3xl:grid-cols-[395px_200_200_200] 3xl:gap-25 3xl:px-0 3xl:pt-20 3xl:pb-11.25">
        <div className="flex flex-col items-center gap-6 text-center md:gap-4 3xl:mt-2 3xl:items-start 3xl:text-left">
          <Image src="/logo.svg" alt="World of Heels" width={155} height={48} />

          <p className="mt-1.5 max-w-92 font-montserrat text-sm leading-4 text-grey-text md:h-15 md:max-w-133.5 md:text-base md:leading-5 3xl:mt-0">
            WOH — це синергія високих технологій та професійної майстерності. Ми
            перетворюємо складну конструкцію на легкість вашого танцю.
          </p>

          <div className="flex gap-4 3xl:mt-8">
            {SOCIAL_LINKS.map(({ label, Icon }) => (
              <Link
                key={label}
                href="#"
                className="flex h-12.5 w-12.5 items-center justify-center rounded-full border border-[rgba(13,13,13,0.08)] bg-[rgba(255,255,255,1)] text-dark-main transition-all duration-300 hover:-translate-y-2 hover:-rotate-12 hover:border-pink-main hover:bg-pink-main hover:text-white"
                aria-label={label}
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:items-start 3xl:mt-4.25 3xl:contents">
          <div>
            <h3 className="mb-4 text-center font-montserrat text-xs font-bold tracking-[2px] text-grey-text uppercase md:text-left 3xl:mb-6">
              Каталог
            </h3>
            <ul className="flex flex-col items-center gap-2 text-[15px] font-medium md:items-start md:gap-4 md:px-4 md:leading-5">
              {CATALOG_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    onClick={() => setActiveLink(link)}
                    className={cn(
                      "hover:text-pink-main",
                      activeLink === link && "text-pink-main",
                    )}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-center font-montserrat text-xs leading-2 font-bold tracking-[2px] text-grey-text uppercase md:text-left 3xl:mb-6">
              Компанія
            </h3>
            <ul className="flex flex-col items-center gap-2 text-[15px] font-medium md:items-start md:gap-4 md:px-4 md:leading-5">
              {COMPANY_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    onClick={() => setActiveLink(link)}
                    className={cn(
                      "hover:text-pink-main",
                      activeLink === link && "text-pink-main",
                    )}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10">
            <h3 className="mb-4 text-center font-montserrat text-xs leading-2 font-bold tracking-[2px] text-grey-text uppercase md:text-left 3xl:mb-6">
              Зв&apos;язок
            </h3>
            <ul className="flex flex-col items-center gap-2 text-[15px] font-medium md:items-start md:gap-4 md:px-4 md:leading-5">
              <li>woh_support@gmail.com</li>
              <li>+38 (067) 967 01 63</li>
              <li>
                <Link href="#" className="font-semibold text-pink-main">
                  Замовити дзвінок →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-30 z-0 -translate-x-108.75 font-(family-name:--font-urbanist) text-[150px] leading-none font-bold tracking-[-10px] whitespace-nowrap text-[#9999990D] select-none md:text-[315px] 3xl:left-90">
          HIGH HEELS
        </div>
      </div>

      <div className="relative left-1/2 hidden w-screen -translate-x-1/2 border-t border-border 3xl:block"></div>
      <div className="relative mx-auto flex max-w-375 flex-col items-center gap-6 border-t border-border px-4 py-6 text-center text-xs text-text-muted sm:px-6 3xl:flex-row 3xl:items-center 3xl:justify-between 3xl:border-t-0 3xl:px-8 3xl:text-left">
        <span className="font-golos text-[12px] leading-[100%] font-semibold tracking-[1px] text-[#64748B] uppercase">
          © 2026 Structure Lab. Всі права захищені
        </span>
        <div className="flex flex-col items-center gap-6 text-[#0D0D0D] 3xl:flex-row 3xl:gap-4">
          <Link
            href="#"
            className="text-center font-golos text-xs font-medium tracking-[1px] uppercase"
          >
            Публічна оферта
          </Link>
          <Link
            href="#"
            className="text-center font-golos text-xs font-medium tracking-[1px] uppercase"
          >
            Політика конфіденційності
          </Link>
          <Link
            href="#"
            className="text-center font-golos text-xs font-medium tracking-[1px] uppercase"
          >
            Розробка та підтримка сайту: KeyKey
          </Link>
        </div>
      </div>
    </footer>
  );
}
