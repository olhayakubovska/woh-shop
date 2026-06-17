import type { Metadata } from "next";
import { Golos_Text, Montserrat, Urbanist } from "next/font/google";
import "./globals.css";

const golosText = Golos_Text({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "WOH | Каталог взуття",
  description: "World of Heels — каталог професійного танцювального взуття",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uk"
      className={`${golosText.variable} ${montserrat.variable} ${urbanist.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
