import { motion } from "framer-motion";

import Product from "@/components/shared/Product/Index";

import { type Product as ProductType } from "@/server/helpers/types/data-types";

interface DisplayedProductsProps {
  products: ProductType[];
  view: string;
}

const DisplayedProducts = ({ products, view }: DisplayedProductsProps) => (
  <motion.section
    variants={variants}
    initial="hidden"
    animate="visible"
    exit="hidden"
    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
    layout
    className={`flex justify-around gap-8 h-max min-w-[976px] ${
      view === "list" ? "flex-col" : "flex-wrap"
    }`}
  >
    {products.length > 0 &&
      products.map(({ id, img, ...p }) => (
        <Product
          key={id}
          id={id}
          motionId={`all-products-${id}`}
          type={view === "list" ? "detailed-wide" : "detailed-card"}
          {...{
            ...p,
            ...{ img: { ...img, height: 200, width: 288 } },
          }}
        />
      ))}

    {products.length === 0 && <p>No products with provided filters!</p>}
  </motion.section>
);

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default DisplayedProducts;
