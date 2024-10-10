import { AnimatePresence, motion } from "framer-motion";

import Icon from "@/components/shared/get-svg/Index";
import { heart, heartActive } from "@/helpers/constants/icons";

const HeartIcon = ({ isFavorite }: { isFavorite: boolean }) => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.span
      key={isFavorite ? "heart-active" : "heart"}
      variants={variants}
      initial="inactive"
      animate="active"
      exit="inactive"
    >
      <Icon id={isFavorite ? heartActive : heart} />
    </motion.span>
  </AnimatePresence>
);

const variants = {
  active: {
    opacity: 1,
    scale: 1,
  },
  inactive: {
    opacity: 0,
    scale: 0,
  },
};

export default HeartIcon;
