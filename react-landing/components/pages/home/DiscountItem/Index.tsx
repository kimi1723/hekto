"use client";

import Image from "next/image";

import useCarousel from "@/helpers/hooks/useCarousel";

import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";
import Subtitle from "@/components/shared/Typography/Subtitle";
import InlineButton from "@/components/shared/InlineButton/Index";
import Carousel from "@/components/shared/Carousel/Index";
import Icon from "@/components/shared/GetSvg/Index";
import ButtonLink from "@/components/shared/ButtonLink/Index";

import { fetchHomePage } from "@/server/helpers/utils/fetch-data/fetch-page";
import { Home } from "@/helpers/constants/query-keys";
import { check } from "@/helpers/constants/icons";
import { type HomeDiscountItems } from "@/server/helpers/types/data-types";

import lightEllipse from "@/public/images/home/discount-items/light-ellipse.png";
import darkEllipse from "@/public/images/home/discount-items/dark-ellipse.png";

const CAROUSEL_ID = "discount-items-carousel";
const HEADER_ID = "discount-items-carousel-heading";

const DiscountItem = () => {
  const { props, view, controlsArr, handleViewChange } = useCarousel({
    queryKey: [Home.DiscountItems],
    queryFn: () => fetchHomePage("discountItems"),
    handleDisplayData,
    customFilter: "controlTitle",
  });

  const carouselControls = (
    <menu className="mx-auto flex gap-8 mt-6 mb-[26px]">
      {(controlsArr as string[]).map((title, i) => (
        <li
          key={title || `discount-item-${i}`}
          className={view === i ? "text-primary" : ""}
        >
          <InlineButton
            className="p-0.5 -m-0.5 focus-outline-none"
            variant="primaryLight"
            onClick={() => handleViewChange(i)}
            aria-controls={CAROUSEL_ID}
          >
            {title}
          </InlineButton>
        </li>
      ))}
    </menu>
  );

  return (
    <Section className="py-[100px] flex flex-col items-center overflow-hidden">
      <Heading id={HEADER_ID} variant="secondary" className="text-center">
        Discount items
      </Heading>

      {carouselControls}

      <Carousel
        id={CAROUSEL_ID}
        aria-labelledby={HEADER_ID}
        className="grid grid-cols-2 items-center gap-8"
        {...props}
        {...{ handleDisplayError, handleDisplayPending }}
      />
    </Section>
  );
};

const handleDisplayData = (items: HomeDiscountItems) => {
  if (!items[0]) return;

  const {
    primaryTitle,
    secondaryTitle,
    description,
    features,
    path,
    img: { src, alt },
  } = items[0];

  return (
    <>
      <div className="flex flex-col gap-6">
        <Heading variant="tertiary">{primaryTitle}</Heading>
        <Subtitle el="h4" className="text-primary">
          {secondaryTitle}
        </Subtitle>

        <p className="text-body-lg text-grey-3 max-w-[523px]">{description}</p>

        <ul className="grid grid-cols-2 gap-y-6 gap-x-8 text-grey-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Icon id={check} height={24} width={24} />
              {feature}
            </li>
          ))}
        </ul>

        <ButtonLink href={`/products?category=${path}`} className="self-start">
          Shop Now
        </ButtonLink>
      </div>

      <div className="relative h-[568px]">
        <Image
          src={lightEllipse}
          alt=""
          className="absolute top-[11px] left-[296px]"
          height={316}
          width={316}
        />
        <Image
          src={darkEllipse}
          alt=""
          className="absolute top-12 left-[83px]"
          height={472}
          width={472}
        />
        <Image
          src={src}
          alt={alt}
          height={498}
          width={448}
          className="absolute top-[22px] left-[164px] h-[498px] w-[448px]"
        />
      </div>
    </>
  );
};

const handleDisplayError = (error: Error) => <p>Error! {error.message}</p>;

const handleDisplayPending = () => (
  <p className="text-center">Loading discounted items...</p>
);

export default DiscountItem;
