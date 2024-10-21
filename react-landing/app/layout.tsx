import type { Metadata } from "next";

import "./globals.css";

import TopBar from "@/components/layout/TopBar/Index";
import MainNav from "@/components/layout/MainNav/Index";

import QueryProvider from "@/providers/queryProvider";

import { lato, josefin_sans } from "@/helpers/utils/fonts";
import saveUser from "@/server/helpers/utils/save-user";
import Footer from "@/components/layout/Footer/Index";

export const metadata: Metadata = {
  title: "Hekto",
  description:
    "If you are looking for the best products, you have found the right site!",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  await saveUser();

  return (
    <html lang="en">
      <body
        id="app"
        className={`${lato.variable} ${josefin_sans.variable} pt-[7.5rem] text-body text-black antialiased bg-white`}
      >
        <QueryProvider>
          <div className="fixed top-0 left-0 right-0 font-josefin z-50">
            <TopBar />
            <MainNav />
          </div>

          {children}

          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
