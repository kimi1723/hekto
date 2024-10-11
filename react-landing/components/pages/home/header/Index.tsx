"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import useCarousel from "@/helpers/hooks/useCarousel";

import Section from "@/components/shared/section/Index";
import Carousel from "@/components/shared/carousel/Index";
import Label from "@/components/shared/typography/Label";
import Heading from "@/components/shared/typography/Heading";
import ButtonLink from "@/components/shared/button-link/Index";

import { fetchHomePage } from "@/server/utils/fetch-data";
import { type PagesData } from "@/server/utils/data-types";
import { MAIN_NAV_PAGES } from "@/helpers/constants/pages";

import lampImg from "@/assets/home/lamp.png";
import discountImg from "@/assets/home/discount.png";

const CAROUSEL_ID = "home-header-views-carousel";

const Header = () => {
  const {
    props: { displayedData, ...props },
    view,
    controlsArr,
    handleViewChange,
  } = useCarousel({
    queryKey: [`home-header-views`],
    queryFn: () => fetchHomePage("headerViews"),
    handleDisplayData,
  });

  const carouselControls = controlsArr.map((i) => (
    <li key={i}>
      <button
        onClick={() => handleViewChange(i)}
        aria-label={`Switch to view number ${i + 1}`}
        aria-controls={CAROUSEL_ID}
        className={`aspect-square h-3 hocus:scale-125 focus:outline-none transition-all rotate-45 border border-solid border-primary ${
          i === view ? "bg-primary" : ""
        }`}
      ></button>
    </li>
  ));

  return (
    <div className="bg-[#F2F0FF]">
      <Section
        el="header"
        className="relative w-full pl-[415px] pr-[172px] pb-[34px] min-h-[759.84px] overflow-hidden"
      >
        {displayedData && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -200, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
              transition={{
                duration: 1.5,
                type: "spring",
                bounce: 0.4,
                delay: 0.5,
              }}
              className="absolute top-0 left-[70px] z-10"
            >
              <Image src={lampImg} alt="" height={387} width={387} />
            </motion.div>
            <motion.div
              className="absolute top-[503px] left-[184px] aspect-square h-[15px] bg-primary rounded-full z-10"
              {...dotMenuVariants}
            ></motion.div>
          </>
        )}

        <Carousel
          id={CAROUSEL_ID}
          aria-label="Home page header views"
          initialDuration={1.5}
          initialSlideIn={100}
          className="relative flex items-center gap-14 z-0"
          {...props}
          {...{ displayedData, handleDisplayError, handleDisplayPending }}
        />

        {displayedData && (
          <motion.menu
            className="absolute bottom-[44px] left-1/2 flex gap-4"
            {...dotMenuVariants}
          >
            {carouselControls}
          </motion.menu>
        )}
      </Section>
    </div>
  );
};

const dotMenuVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 3, type: "spring", bounce: 0 },
};

const handleDisplayData = (view: PagesData["home"]["headerViews"]) => {
  if (!view[0]) return;

  const {
    label,
    heading,
    description,
    img: { alt, ...rest },
    discount,
  } = view[0];

  return (
    <>
      <div className="flex flex-col gap-4">
        <Label el="p" variant="bold" className="text-primary">
          {label}
        </Label>
        <Heading variant="primary">{heading}</Heading>
        <p className="text-grey-3 max-w-[551px]">{description}</p>
        <ButtonLink href={MAIN_NAV_PAGES.products.path} className="mt-2 w-max">
          Shop Now
        </ButtonLink>
      </div>

      <Image {...rest} alt={alt} className="mt-[34px]" priority />

      {discount && (
        <div className="absolute top-[60px] right-[12.44px]">
          <Image
            src={discountImg}
            alt=""
            height={138.49}
            width={136.56}
            priority
          />
          <Heading
            variant="tertiary"
            className="absolute top-[28px] left-1/2 flex flex-col text-white text-center -translate-x-1/2"
          >
            <span>{discount}</span>
            <span>off</span>
          </Heading>
        </div>
      )}
    </>
  );
};

const handleDisplayError = (error: Error) => <p>Error! {error.message}</p>;

const handleDisplayPending = () => (
  <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    Loading header...
  </p>
);
export default Header;
