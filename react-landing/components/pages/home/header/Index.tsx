"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Section from "@/components/shared/section/Index";
import Label from "@/components/shared/typography/Label";
import Heading from "@/components/shared/typography/Heading";
import ButtonLink from "@/components/shared/button-link/Index";
import ViewHandler from "./components/ViewHandler";

import { MAIN_NAV_PAGES } from "@/helpers/constants/pages";
import lamp from "@/assets/home/lamp.png";
import headphones from "@/assets/home/headphones.png";
import discount from "@/assets/home/discount.png";

import {
  HOME_HEADER_VIEWS as VIEWS_DATA,
  homeHeaderViews as views,
  type HomeHeaderView as View,
} from "@/helpers/constants/pages";

const viewHandlerId = "view-handler";

const Header = () => {
  const [activeView, setActiveView] = useState<View>("primary");

  useEffect(() => {
    const cycleViews = () => {
      setActiveView((currentView) => {
        const currentIndex = views.indexOf(currentView);
        const nextIndex = (currentIndex + 1) % views.length;

        return views[nextIndex];
      });
    };

    const interval = setInterval(cycleViews, 5000);

    return () => clearInterval(interval);
  }, [activeView]);

  const { label, heading, description } = VIEWS_DATA[activeView];

  const handleActiveView = (view: View) => setActiveView(view);

  return (
    <div className="bg-[#F2F0FF]">
      <Section
        el="header"
        className="relative w-full flex items-center gap-14 pl-[415px] pr-[172px] pb-[34px]"
      >
        <Image
          src={lamp}
          alt=""
          height={387}
          width={387}
          className="absolute top-0 left-[70px]"
        />

        <div className="absolute top-[503px] left-[184px] aspect-square h-[15px] bg-primary rounded-full"></div>

        <div
          className="flex flex-col gap-4"
          aria-labelledby={viewHandlerId}
          aria-live="polite"
        >
          <Label el="p" variant="bold" className="text-primary">
            {label}
          </Label>
          <Heading variant="primary">{heading}</Heading>
          <p className="text-grey-3 max-w-[551px]">{description}</p>
          <ButtonLink
            href={MAIN_NAV_PAGES.products.path}
            className="mt-2 w-max"
          >
            Shop Now
          </ButtonLink>
        </div>

        <Image
          src={headphones}
          alt=""
          height={692}
          width={706}
          className="mt-[34px]"
          priority
        />
        <Image
          src={discount}
          alt=""
          height={138.49}
          width={136.56}
          className="absolute top-[94px] right-[185.44px]"
          priority
        />

        <ViewHandler
          id={viewHandlerId}
          views={views}
          activeView={activeView}
          onClick={handleActiveView}
        />
      </Section>
    </div>
  );
};

export default Header;
