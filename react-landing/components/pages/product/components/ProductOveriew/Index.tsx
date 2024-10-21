import { MotionConfig, motion } from "framer-motion";

import ProductImages from "./components/ProductImages";
import ProductDescription from "./components/ProductDescription";
import Section from "@/components/shared/Section/Index";

import { type Product } from "@/server/helpers/types/data-types";

const ProductOveriew = ({ data }: { data: Product }) => (
  <MotionConfig transition={{ type: "spring", bounce: 0, duration: 1 }}>
    <Section el="div">
      <motion.article className="flex gap-36 items-center py-[100px]">
        <ProductImages imgViews={data.imgViews} />

        <ProductDescription data={data} />
      </motion.article>
    </Section>
  </MotionConfig>
);

export default ProductOveriew;
