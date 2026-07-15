import type { Metadata } from "next";
import "./globals.css";

import { Inter, Press_Start_2P } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PokeScry",
  description: "Search for Pokemon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable}
          ${pressStart2P.variable}
          
          antialiased
        `}
      >
        {children}
      </body>
    </html>
  );
}
