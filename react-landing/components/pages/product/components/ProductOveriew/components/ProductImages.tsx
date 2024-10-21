import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const ProductImages = ({
  imgViews,
}: {
  imgViews: { src: string; alt: string }[];
}) => {
  const [view, setView] = useState(0);

  const mainImg = imgViews[view];

  const handleChangeView = (view: number) => setView(view);

  return (
    <section className="flex gap-8 flex-shrink-0">
      <div className="flex flex-col gap-4">
        {imgViews.map(({ src, alt }, i) => (
          <button
            key={src}
            onClick={() => handleChangeView(i)}
            className="relative hocus:scale-105 transition-transform"
            aria-label={`Change to view ${i + 1}`}
          >
            {i === view && (
              <Image
                src={mainImg.src}
                alt={mainImg.alt}
                height={136}
                width={192}
                className="absolute top-0 left-0 h-[136px] w-48 rounded-lg"
              />
            )}

            <motion.div
              key={`${src}-${alt}`}
              layoutId={`product-overview-${i}`}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Image
                src={src}
                alt={alt}
                height={136}
                width={192}
                className="h-[136px] w-48 rounded-lg z-10"
              />
            </motion.div>
          </button>
        ))}
      </div>

      <motion.div
        layoutId={`product-overview-${view}`}
        key={view}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-[438px] w-[528px] rounded-lg"
      >
        <Image
          src={mainImg.src}
          alt={mainImg.alt}
          height={438}
          width={528}
          priority
          className="h-[438px] w-[528px] rounded-lg"
        />
      </motion.div>
    </section>
  );
};

const variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

export default ProductImages;
