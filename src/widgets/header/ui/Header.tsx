import Image from "next/image";
import Link from "next/link";
import {
  CartIcon,
  HeartIcon,
  SearchIcon,
  UserIcon,
} from "@/shared/ui/icons";
import { IconButton } from "@/shared/ui/IconButton";
import { BurgerMenu } from "@/widgets/header/ui/BurgerMenu";

const NAV_LINKS = [
  { href: "/catalog", label: "Каталог" },
  { href: "#", label: "Колекції" },
  { href: "#", label: "Знижки" },
  { href: "#", label: "Про нас" },
  { href: "#", label: "Співпраця" },
];

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex max-w-375 items-center justify-between gap-6 px-4.75 py-3 md:px-6 md:py-3.5 3xl:px-0">
        <Link href="/catalog" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="World of Heels"
            width={128}
            height={40}
            className="h-9.75 w-32"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-10 font-montserrat text-[13px] leading-[100%] font-medium tracking-[1.5px] uppercase 3xl:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-pink-main"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <IconButton aria-label="Пошук">
            <SearchIcon />
          </IconButton>

          <IconButton aria-label="Особистий кабінет" className="hidden md:flex">
            <UserIcon />
          </IconButton>
          <IconButton aria-label="Особистий кабінет" className="hidden md:flex">
            <HeartIcon />
          </IconButton>

          <div className="relative">
            <IconButton aria-label="Кошик">
              <CartIcon />
            </IconButton>
            <span className="absolute -top-2 -right-2 flex h-4 w-5.5 items-center justify-center rounded-full bg-pink-main text-[8px] font-bold text-black">
              10
            </span>
          </div>

          <BurgerMenu />

          <span className="hidden h-6 items-center gap-10 border-l-[0.5px] border-[#0D0D0D] pl-[16.5px] font-montserrat text-[13px] leading-[100%] font-medium tracking-[1.5px] uppercase 3xl:flex">
            UA
          </span>
        </div>
      </div>
    </header>
  );
}
