"use client";

import useCarousel from "@/helpers/hooks/useCarousel";

import Product from "@/components/shared/Product/Index";
import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";
import Carousel from "@/components/shared/Carousel/Index";

import fetchProducts from "@/server/helpers/utils/fetch-data/fetch-products";
import { kebabToCamelCase } from "@/helpers/utils/utils";
import { Products } from "@/helpers/constants/query-keys";
import { type Product as ProductType } from "@/server/helpers/types/data-types";

const PRODUCT_PER_PAGE = 6;
const CAROUSEL_ID = "latest-products-carousel";
const HEADER_ID = "latest-products-carousel-heading";

const LatestProducts = () => {
  const { props, view, controlsArr, handleViewChange } = useCarousel({
    queryKey: [Products.Latest],
    queryFn: () => fetchProducts(Products.Latest),
    dataPerView: PRODUCT_PER_PAGE,
    handleDisplayData: handleDisplayProducts,
    customFilter: "set",
  });

  const carouselControls = (
    <menu className="flex gap-16 mt-4 mb-16 justify-center">
      {(controlsArr as string[]).map((set, i) => (
        <li key={set || `latest-product-${i}`}>
          <button
            className="p-0.5 -m-0.5 focus:outline-none group"
            onClick={() => handleViewChange(i)}
            aria-label={`Show products from view ${i + 1}`}
            aria-controls={CAROUSEL_ID}
          >
            <span
              className={`text-body-lg ${view === i ? "text-primary" : ""}`}
            >
              {kebabToCamelCase(set)}
            </span>
          </button>
        </li>
      ))}
    </menu>
  );

  return (
    <Section className="my-[100px] overflow-hidden">
      <Heading id={HEADER_ID} variant="secondary" className="text-center">
        Latest products
      </Heading>

      {carouselControls}

      <Carousel
        id={CAROUSEL_ID}
        aria-labelledby={HEADER_ID}
        className="flex flex-wrap gap-8 min-h-[639.95px]"
        {...props}
        {...{ handleDisplayError, handleDisplayPending }}
      />
    </Section>
  );
};

const handleDisplayProducts = (products: ProductType[]) =>
  products.map(({ id, img, ...props }) => (
    <Product
      key={id}
      id={id}
      motionId={`latest-product-${id}`}
      type="simple"
      img={{ ...img, width: 416, height: 272 }}
      className="basis-1/3 max-w-[416px]"
      {...props}
    />
  ));

const handleDisplayError = (error: Error) => <p>Error! {error.message}</p>;

const handleDisplayPending = () => (
  <p className="text-center">Loading products...</p>
);

export default LatestProducts;
