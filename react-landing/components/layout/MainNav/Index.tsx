import Link from "next/link";
import Image from "next/image";

import InlineLink from "@/components/shared/InlineLink/Index";
import Section from "@/components/shared/Section/Index";
import Input from "@/components/shared/InputButton/Index";
import Icon from "@/components/shared/GetSvg/Index";

import logo from "@/assets/logo.png";

import { MAIN_NAV_PAGES } from "@/helpers/constants/pages";
import { search } from "@/helpers/constants/icons";

const MainNav = () => {
  return (
    <div className="bg-white">
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

        <form
          action={async () => {
            "use server";
          }}
          className="relative ml-auto"
          role="search"
          aria-label="products"
        >
          <Input
            type="text"
            placeholder="Search"
            buttonLabel="Search products"
            icon={true}
          >
            <Icon id={search} width={24} height={24} className="text-white" />
          </Input>
        </form>
      </Section>
    </div>
  );
};

export default MainNav;
