"use client";

import useCarousel from "@/helpers/hooks/useCarousel";

import Section from "@/components/shared/section/Index";
import Heading from "@/components/shared/typography/Heading";
import Product from "@/components/shared/product/Index";
import Carousel from "@/components/shared/carousel/Index";

import { fetchProducts } from "@/server/utils/fetch-data";
import { PRODUCTS_KEY, FEATURED_KEY } from "@/helpers/constants/query-keys";
import { type Product as ProductType } from "@/server/utils/data-types";

const PRODUCTS_PER_PAGE = 4;
const CAROUSEL_ID = "featured-products-carousel";
const HEADER_ID = "featured-products-carousel-heading";

const FeaturedProducts = () => {
  const { props, view, controlsArr, handleViewChange } = useCarousel({
    queryKey: [PRODUCTS_KEY, FEATURED_KEY],
    queryFn: () => fetchProducts(FEATURED_KEY),
    dataPerView: PRODUCTS_PER_PAGE,
    handleDisplayData: handleDisplayProducts,
  });

  const carouselControls = controlsArr.map((i) => (
    <button
      key={i}
      className="p-0.5 -m-0.5 focus:outline-none group"
      onClick={() => handleViewChange(i)}
      aria-label={`Show products from view ${i + 1}`}
      aria-controls={CAROUSEL_ID}
    >
      <span className={getCarouselControlsClasses(i, view)}></span>
    </button>
  ));

  return (
    <Section className="my-[100px] overflow-hidden">
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
        <div className="flex gap-2 justify-center">{carouselControls}</div>
      </div>
    </Section>
  );
};

const handleDisplayProducts = (products: ProductType[]) =>
  products.map(({ id, img, ...props }) => (
    <Product
      key={id}
      id={id}
      img={{ ...img, width: 304, height: 232 }}
      className="basis-1/4 max-w-[304px]"
      {...props}
    />
  ));

const handleDisplayError = (error: Error) => <p>Error! {error.message}</p>;

const handleDisplayPending = () => <p>Loading products...</p>;

const getCarouselControlsClasses = (i: number, view: number) => {
  const isActive = i === view;
  const width = isActive ? "w-6" : "w-4";
  const bg = isActive ? "bg-primary" : "bg-[#FEBAD7]";

  return `block h-1 ${width} ${bg} group-focus:bg-primary-dark group-hover:bg-primary-dark rounded-[10px] transition-all duration-500`;
};

export default FeaturedProducts;
