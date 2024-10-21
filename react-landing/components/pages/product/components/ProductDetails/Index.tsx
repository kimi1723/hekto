import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Subtitle from "@/components/shared/Typography/Subtitle";
import Icon from "@/components/shared/GetSvg/Index";
import Section from "@/components/shared/Section/Index";

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

  const handleViewChange = (nextView: number) => {
    setDirection(nextView > view ? 1 : -1);
    setView(nextView);
  };

  const carouselControls = (
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
  );

  const activeHeader = detailedProductViews?.[view];

  const variants = {
    initial: (direction: number) => ({
      opacity: 0,
      filter: "blur(2px)",
      x: `${100 * direction}%`,
    }),
    visible: {
      opacity: 1,
      filter: "blur(0)",
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      filter: "blur(2px)",
      x: `${-100 * direction}%`,
    }),
  };

  return (
    <div className="bg-grey-1">
      <Section className="py-16 px-[416px] overflow-hidden" px={false}>
        {carouselControls}

        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.section
            key={view}
            id={CAROUSEL_ID}
            aria-labelledby={activeHeader}
            aria-live="polite"
            className="flex flex-col gap-8"
            custom={direction}
            variants={variants}
            initial="initial"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", duration: 1, bounce: 0 }}
          >
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
          </motion.section>
        </AnimatePresence>
      </Section>
    </div>
  );
};

export default ProductDetails;
