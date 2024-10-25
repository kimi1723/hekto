import { useState } from "react";
import { motion } from "framer-motion";

import Subtitle from "@/components/shared/Typography/Subtitle";
import Icon from "@/components/shared/GetSvg/Index";
import Section from "@/components/shared/Section/Index";
import Carousel from "@/components/shared/Carousel/Index";

import { check } from "@/helpers/constants/icons";
import { type Product } from "@/server/helpers/types/data-types";

const CAROUSEL_ID = "product-details-carousel";

const ProductDetails = ({ data }: { data: Product }) => {
  const [view, setView] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const {
    description: { title, long },
    details,
    detailedProductViews,
  } = data;

  const activeHeader = detailedProductViews?.[view];

  const handleViewChange = (nextView: number) => {
    setDirection(nextView > view ? 1 : -1);
    setView(nextView);
  };

  const carouselElement = (
    <>
      <div className="flex flex-col gap-4">
        <Subtitle variant="secondary" el="h3">
          {title}
        </Subtitle>
        <p className="text-grey-3">{long}</p>
      </div>

      <div className="flex flex-col gap-4">
        <Subtitle variant="secondary" el="h3">
          More details
        </Subtitle>
        <ul className="flex flex-col gap-4 text-grey-3">
          {details.map((detail) => (
            <li key={detail} className="flex gap-4 items-center">
              <Icon id={check} />
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <div className="bg-grey-1">
      <Section className="py-16 px-[416px] overflow-hidden" px={false}>
        <menu className="flex gap-[72px] mb-[52px]">
          {detailedProductViews?.map((detailedView, i) => (
            <li key={detailedView} className="relative">
              <button
                onClick={() => handleViewChange(i)}
                aria-controls={CAROUSEL_ID}
              >
                <Subtitle className={`capitalize pb-1`} el="h2">
                  {detailedView}
                </Subtitle>
              </button>

              {view === i && (
                <motion.div
                  layoutId="product-details-view-underline"
                  className="absolute left-0 -bottom-1 h-[1px] w-full bg-black"
                ></motion.div>
              )}
            </li>
          ))}
        </menu>

        <Carousel
          id={CAROUSEL_ID}
          aria-labelledby={activeHeader}
          aria-live="polite"
          className="flex flex-col gap-8"
          {...{ displayedData: carouselElement, view, direction }}
        />
      </Section>
    </div>
  );
};

export default ProductDetails;
