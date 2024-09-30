"use client";

import { useState } from "react";
import useClickOutside from "@/helpers/hooks/useClickOutside";

import Section from "../../shared/section/Index";
import ContactInfo from "./components/ContactInfo";
import ButtonDropDown from "../../shared/dropdown-menu/components/ButtonDropDown";
import Link from "../../shared/inline-link/Index";
import Icon from "../../shared/get-svg/Index";

import { cart, heart, user } from "@/helpers/constants/icons";

const languages = ["English", "Polish", "Ukrainian"];
const currencies = ["USD", "PLN", "UAH"];
const languageMenuId = "language-menu";
const currencyMenuId = "currency-menu";

export const TopBar = () => {
  const [activeLanguage, setActiveLanguage] = useState("English");
  const [activeCurrency, setActiveCurrency] = useState("USD");
  const [isLanguageMenuVisible, setIsLanguageMenuVisible] = useState(false);
  const [isCurrencyMenuVisible, setIsCurrencyMenuVisible] = useState(false);

  const menuRef = useClickOutside<HTMLLIElement>(() => {
    setIsLanguageMenuVisible(false);
    setIsCurrencyMenuVisible(false);
  });

  const handleToggleLanguageMenu = () => {
    setIsCurrencyMenuVisible(false);
    setIsLanguageMenuVisible((isVisible) => !isVisible);
  };

  const handleToggleCurrencyMenu = () => {
    setIsLanguageMenuVisible(false);
    setIsCurrencyMenuVisible((isVisible) => !isVisible);
  };

  const handleChangeLanguage = (lang: string) => {
    setActiveLanguage(lang);
    setIsLanguageMenuVisible(false);
  };

  const handleChangeCurrency = (curr: string) => {
    setActiveCurrency(curr);
    setIsCurrencyMenuVisible(false);
  };

  return (
    <div className=" bg-tertiary">
      <Section className="flex justify-between py-3.5 text-white">
        <ContactInfo />

        <menu className="flex gap-8" ref={menuRef}>
          <li className="relative">
            <ButtonDropDown
              id={languageMenuId}
              items={languages}
              activeItem={activeLanguage}
              isVisible={isLanguageMenuVisible}
              onToggle={handleToggleLanguageMenu}
              onSelect={handleChangeLanguage}
              after
            />
          </li>
          <li className="relative">
            <ButtonDropDown
              id={currencyMenuId}
              items={currencies}
              activeItem={activeCurrency}
              isVisible={isCurrencyMenuVisible}
              onToggle={handleToggleCurrencyMenu}
              onSelect={handleChangeCurrency}
              after
            />
          </li>
          <li>
            <Link href="#" className="gap-1" variant="primaryLight">
              Login <Icon id={user} />
            </Link>
          </li>
          <li>
            <Link href="#" className="gap-1" variant="primaryLight">
              Wishlist <Icon id={heart} />
            </Link>
          </li>
          <li>
            <Link href="#" aria-label="Cart" variant="primaryLight">
              <Icon id={cart} />
            </Link>
          </li>
        </menu>
      </Section>
    </div>
  );
};

export default TopBar;
