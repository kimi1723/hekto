import { motion, AnimatePresence } from "framer-motion";

import Heading from "@/components/shared/Typography/Heading";
import Product from "@/components/shared/Product/Index";

import { type Product as ProductType } from "@/server/helpers/types/data-types";

const PopulatedWishlist = ({ data }: { data: ProductType[] }) => (
  <>
    <Heading variant="primary" className="text-center mb-12">
      Wishlist
    </Heading>

    <div className="flex flex-wrap justify-center gap-x-8 gap-y-12">
      <AnimatePresence>
        {data.map(({ id, img, ...props }: ProductType) => (
          <motion.div
            key={id}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            layout
          >
            <Product
              motionId={`wishlist-product-${id}`}
              {...{
                ...props,
                id,
                img: { height: 232, width: 304, ...img },
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </>
);

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default PopulatedWishlist;
