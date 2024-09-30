import Link from "next/link";
import Image from "next/image";

import InlineLink from "@/components/shared/inline-link/Index";
import Section from "@/components/shared/section/Index";
import Input from "@/components/shared/input-button/Index";
import Icon from "@/components/shared/get-svg/Index";

import logo from "@/assets/logo.png";

import { MAIN_NAV_PAGES } from "@/helpers/constants/pages";
import { search } from "@/helpers/constants/icons";

const MainNav = () => {
  return (
    <Section className="flex items-center py-4">
      <Link href={MAIN_NAV_PAGES.home.path}>
        <Image src={logo} alt="Hekto logo" width={100} height={28} />
      </Link>

      <nav className="ml-20">
        <ul className="flex gap-8">
          {Object.values(MAIN_NAV_PAGES).map(({ name, path }) => (
            <li key={name}>
              <InlineLink href={path}>{name}</InlineLink>
            </li>
          ))}
        </ul>
      </nav>

      <Input
        type="text"
        placeholder="Search"
        aria-label="Search"
        buttonLabel="Search"
        icon={true}
        action={async () => {
          "use server";
        }}
        className="ml-auto"
      >
        <Icon id={search} width={24} height={24} className="text-white" />
      </Input>
    </Section>
  );
};

export default MainNav;

//TODO: (after completing products page) move input to a separate component and add logic for searching
