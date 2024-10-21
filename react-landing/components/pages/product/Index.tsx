"use client";

import { AnimatePresence } from "framer-motion";

import useProductQuery from "@/helpers/queries/Products/useProductQuery";

import Heading from "@/components/shared/Typography/Heading";
import MotionOpacitySpan from "@/components/shared/MotionOpacitySpan/Index";
import ProductOveriew from "./components/ProductOveriew/Index";
import ProductDetails from "./components/ProductDetails/Index";
import RelatedProducts from "./components/RelatedProducts/Index";

const Product = ({ productId }: { productId: number }) => {
  const { data, isPending, isError, error } = useProductQuery(productId);

  return (
    <main>
      <AnimatePresence>
        {isPending && (
          <Heading variant="primary">
            <MotionOpacitySpan>Loading product...</MotionOpacitySpan>
          </Heading>
        )}

        {isError && (
          <Heading variant="primary">
            <MotionOpacitySpan>
              Error occured! {error.message}
            </MotionOpacitySpan>
          </Heading>
        )}

        {data && (
          <>
            <ProductOveriew data={data} />
            <ProductDetails data={data} />
            <RelatedProducts />
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Product;
