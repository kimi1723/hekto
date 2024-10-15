import { Lato, Josefin_Sans } from "next/font/google";

export const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

export const josefin_sans = Josefin_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin",
});
