"use client";

import useCarousel from "@/helpers/hooks/useCarousel";

import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";
import Product from "@/components/shared/Product/Index";
import Carousel from "@/components/shared/Carousel/Index";

import fetchProducts from "@/server/helpers/utils/fetch-data/fetch-products";
import { Products } from "@/helpers/constants/query-keys";
import { type Product as ProductType } from "@/server/helpers/types/data-types";

const PRODUCTS_PER_PAGE = 4;
const CAROUSEL_ID = "featured-products-carousel";
const HEADER_ID = "featured-products-carousel-heading";

const FeaturedProducts = () => {
  const { props, view, controlsArr, handleViewChange } = useCarousel({
    queryKey: [Products.Featured],
    queryFn: () => fetchProducts(Products.Featured),
    dataPerView: PRODUCTS_PER_PAGE,
    handleDisplayData: handleDisplayProducts,
  });

  const carouselControls = (
    <menu className="flex gap-2 justify-center">
      {(controlsArr as number[]).map((i) => (
        <li key={`featured-control-${i}`}>
          <button
            className="p-0.5 -m-0.5 focus:outline-none group"
            onClick={() => handleViewChange(i)}
            aria-label={`Show products from view ${i + 1}`}
            aria-controls={CAROUSEL_ID}
          >
            <span className={getCarouselControlsClasses(i, view)}></span>
          </button>
        </li>
      ))}
    </menu>
  );

  return (
    <Section className="my-[100px] overflow-hidden relative transition-all">
      <Heading id={HEADER_ID} variant="secondary" className="mb-12 text-center">
        Featured products
      </Heading>

      <div className="flex flex-col gap-[60px]">
        <Carousel
          id={CAROUSEL_ID}
          aria-labelledby={HEADER_ID}
          className="flex gap-8"
          {...props}
          {...{ handleDisplayError, handleDisplayPending }}
        />

        {carouselControls}
      </div>
    </Section>
  );
};

const handleDisplayProducts = (products: ProductType[]) =>
  products.map(({ id, ...props }) => (
    <Product
      key={id}
      id={id}
      motionId={`featured-product-${id}`}
      className="basis-1/4 max-w-[304px]"
      {...{
        ...props,
        img: { height: 232, width: 304, ...props.img },
        discountedPrice: undefined,
      }}
    />
  ));

const handleDisplayError = (error: Error) => <p>Error! {error.message}</p>;

const handleDisplayPending = () => (
  <p className="text-center">Loading products...</p>
);

const getCarouselControlsClasses = (i: number, view: number) => {
  const isActive = i === view;
  const width = isActive ? "w-6" : "w-4";
  const bg = isActive ? "bg-primary" : "bg-[#FEBAD7]";

  return `block h-1 ${width} ${bg} group-focus:bg-primary-dark group-hover:bg-primary-dark rounded-[10px] transition-all duration-500`;
};

export default FeaturedProducts;
