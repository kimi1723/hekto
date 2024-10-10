import { AnimatePresence, motion } from "framer-motion";

import Subtitle from "@/components/shared/typography/Subtitle";

const ProductCount = ({ count }: { count: number }) => (
  <AnimatePresence>
    {count > 0 && (
      <motion.span
        key={count}
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="absolute bottom-0 left-full aspect-square p-1 min-w-5 flex items-center justify-center text-white text-body-sm rounded-full bg-primary group-hover:bg-primary-dark group-focus:bg-primary-dark transition-colors"
      >
        <Subtitle variant="quinary" el="span">
          {count}
        </Subtitle>
      </motion.span>
    )}
  </AnimatePresence>
);

const variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    translate: "-50% 75%",
  },
  visible: {
    opacity: 1,
    scale: 1,
    translate: "-50% 75%",
  },
};

export default ProductCount;
