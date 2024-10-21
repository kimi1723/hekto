"use client";

import useCarousel from "@/helpers/hooks/useCarousel";

import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";
import Carousel from "@/components/shared/Carousel/Index";
import Category from "./components/Category";

import { Home } from "@/helpers/constants/query-keys";
import { fetchHomePage } from "@/server/helpers/utils/fetch-data/fetch-page";

import { type HomeCategory } from "@/server/helpers/types/data-types";

const CAROUSEL_ID = "top-categories-carousel";
const HEADER_ID = "top-categories-carousel-header";
const DATA_PER_VIEW = 4;

const TopCategories = () => {
  const { props, view, controlsArr, handleViewChange } = useCarousel({
    queryKey: [Home.TopCategories],
    queryFn: () => fetchHomePage("topCategories"),
    handleDisplayData,
    dataPerView: DATA_PER_VIEW,
  });

  const carouselControls = (
    <menu className="flex gap-[18px]">
      {(controlsArr as number[]).map((i) => (
        <li key={i}>
          <button
            onClick={() => handleViewChange(i)}
            aria-label={`Switch to view number ${i + 1}`}
            aria-controls={CAROUSEL_ID}
            className={`aspect-square h-2 hocus:scale-125 focus:outline-none transition-all border rounded-full border-solid border-primary ${
              i === view ? "bg-primary" : ""
            }`}
          ></button>
        </li>
      ))}
    </menu>
  );

  return (
    <Section className="flex flex-col items-center my-[100px] overflow-hidden">
      <Heading
        id={HEADER_ID}
        variant="secondary"
        className="text-center mb-[72px]"
      >
        Top Categories
      </Heading>

      <Carousel
        id={CAROUSEL_ID}
        className="flex gap-16 mb-[60px]"
        {...{ ...props, handleDisplayError, handleDisplayPending }}
      />
      {carouselControls}
    </Section>
  );
};

const handleDisplayData = (categories: HomeCategory) =>
  categories.map(({ title, path, ...img }) => (
    <Category
      key={title}
      title={title}
      href={`/products?category=${path}`}
      {...img}
    />
  ));

const handleDisplayError = (error: Error) => <p>Error! {error.message}</p>;

const handleDisplayPending = () => (
  <p className="text-center">Loading top categories...</p>
);

export default TopCategories;
