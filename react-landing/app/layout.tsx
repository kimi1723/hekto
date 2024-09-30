import type { Metadata } from "next";

import "./globals.css";

import { lato, josefin_sans } from "@/helpers/utils/fonts";

import TopBar from "@/components/layout/top-bar/Index";
import MainNav from "@/components/layout/main-nav/Index";

export const metadata: Metadata = {
  title: "Hekto",
  description:
    "If you are looking for the best products, you have found the right site!",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${lato.variable} ${josefin_sans.variable} pt-[7.5rem] text-body antialiased bg-white`}
      >
        <div className="fixed top-0 left-0 right-0 font-josefin z-50">
          <TopBar />
          <MainNav />
        </div>

        {children}
      </body>
    </html>
  );
};

export default RootLayout;
