"use client";

import { useState } from "react";

import useClickOutside from "@/helpers/hooks/useClickOutside";

import Section from "@/components/shared/Section/Index";
import Dropdown from "./components/Dropdown";

import Link from "@/components/shared/InlineLink/Index";
import Icon from "@/components/shared/GetSvg/Index";

import ContactInfo from "./components/ContactInfo";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";

import { user } from "@/helpers/constants/icons";

const languages = ["English", "Polish", "Ukrainian"] as const;
const currencies = ["USD", "PLN", "UAH"] as const;
const languageMenuId = "language-menu";
const currencyMenuId = "currency-menu";

type language = (typeof languages)[number];
type currency = (typeof currencies)[number];

export const TopBar = () => {
  const [activeLanguage, setActiveLanguage] = useState<language>("English");
  const [activeCurrency, setActiveCurrency] = useState<currency>("USD");
  const [isLanguageMenuVisible, setIsLanguageMenuVisible] = useState(false);
  const [isCurrencyMenuVisible, setIsCurrencyMenuVisible] = useState(false);
  const [isOtherMenuVisible, setIsOtherMenuVisible] = useState(false);

  const menuRef = useClickOutside<HTMLLIElement>(() => {
    setIsLanguageMenuVisible(false);
    setIsCurrencyMenuVisible(false);
  });

  const handleToggleLanguageMenu = () => {
    setIsCurrencyMenuVisible(false);
    setIsOtherMenuVisible(isCurrencyMenuVisible && !isLanguageMenuVisible);
    setIsLanguageMenuVisible(!isLanguageMenuVisible);
  };

  const handleToggleCurrencyMenu = () => {
    setIsLanguageMenuVisible(false);
    setIsOtherMenuVisible(!isCurrencyMenuVisible && isLanguageMenuVisible);
    setIsCurrencyMenuVisible(!isCurrencyMenuVisible);
  };

  const handleChangeLanguage = (lang: language) => {
    setActiveLanguage(lang);
    setIsLanguageMenuVisible(false);
  };

  const handleChangeCurrency = (curr: currency) => {
    setActiveCurrency(curr);
    setIsCurrencyMenuVisible(false);
  };

  return (
    <div className="bg-tertiary">
      <Section className="flex justify-between py-3.5 text-white">
        <ContactInfo />

        <menu className="flex gap-8" ref={menuRef}>
          <Dropdown
            id={languageMenuId}
            isVisible={isLanguageMenuVisible}
            isOtherMenuVisible={isOtherMenuVisible}
            elements={languages}
            activeElement={activeLanguage}
            setActiveElement={handleChangeLanguage}
            toggleMenu={handleToggleLanguageMenu}
          />

          <Dropdown
            id={currencyMenuId}
            isVisible={isCurrencyMenuVisible}
            isOtherMenuVisible={isOtherMenuVisible}
            elements={currencies}
            activeElement={activeCurrency}
            setActiveElement={handleChangeCurrency}
            toggleMenu={handleToggleCurrencyMenu}
          />

          <li>
            <Link href="#" className="gap-1" variant="primaryLight">
              Login <Icon id={user} />
            </Link>
          </li>

          <Wishlist />

          <Cart />
        </menu>
      </Section>
    </div>
  );
};

export default TopBar;
