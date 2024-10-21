import Section from "@/components/shared/Section/Index";

import logo from "@/assets/logo.png";
import Image from "next/image";
import InputButton from "@/components/shared/InputButton/Index";
import Subtitle from "@/components/shared/Typography/Subtitle";
import InlineLink from "@/components/shared/InlineLink/Index";
import Icon from "@/components/shared/GetSvg/Index";
import { SOCIALS } from "@/helpers/constants/icons";

const Footer = () => (
  <footer className="bg-grey-1">
    <Section className="flex gap-32 pt-[94px] pb-[142px]">
      <div className="flex flex-col gap-8 mr-4 w-[304px] text-grey-3">
        <Image src={logo} alt="Hekto logo" height={30} width={103} />

        <form
          action={async () => {
            "use server";
          }}
          className="relative"
        >
          <InputButton
            name="email"
            type="email"
            placeholder="Enter Email Address"
            buttonProps={{
              size: "sm",
              variant: "quinary",
            }}
          >
            Sign Up
          </InputButton>
        </form>

        <p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
      </div>

      {LISTS_DATA.map((list) => (
        <div key={list.title}>{getList(list)}</div>
      ))}
    </Section>

    <div className="py-4 bg-grey-2">
      <Section className="flex items-center justify-between text-grey-3">
        <p>&copy;Webecy - All Rights Reserved</p>

        <ul className="flex gap-4 text-white">
          {SOCIALS.map((id) => (
            <li key={id}>
              <InlineLink
                variant="infoWhite"
                href="#"
                className="p-2 bg-black rounded-full hocus:bg-info"
              >
                <Icon id={id} />
              </InlineLink>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  </footer>
);

const getList = ({ title, items }: { title: string; items: string[] }) => (
  <>
    <Subtitle el="h3" variant="secondary">
      {title}
    </Subtitle>

    <ul className="flex flex-col gap-6 mt-6 text-grey-3">
      {items.map((item) => (
        <li key={item}>
          <InlineLink href="#">{item}</InlineLink>
        </li>
      ))}
    </ul>
  </>
);

const LISTS_DATA = [
  {
    title: "Categories",
    items: [
      "Laptops & Computers",
      "Cameras & Photography",
      "Smart Phones & Tablets",
      "Video Games & Consoles",
      "Waterproof Headphones",
    ],
  },
  {
    title: "Customer Care",
    items: [
      "My Account",
      "Discount",
      "Returns",
      "Orders History",
      "Order Tracking",
    ],
  },
  {
    title: "Pages",
    items: [
      "Blog",
      "Browse the Shop",
      "Category",
      "Pre-Built Pages",
      "Visual Composer Elements",
    ],
  },
];

export default Footer;
