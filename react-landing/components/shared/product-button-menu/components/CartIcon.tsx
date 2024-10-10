import { AnimatePresence, motion } from "framer-motion";

import Icon from "@/components/shared/get-svg/Index";
import { cart, check, plus } from "@/helpers/constants/icons";

const CartIcon = ({
  isInCart,
  isInitialInCart,
}: {
  isInCart: boolean;
  isInitialInCart: boolean;
}) => {
  const isFirstTimeInCart = isInCart && isInitialInCart;
  const isAlreadyInCart = !isInitialInCart && isInCart;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={
          isFirstTimeInCart
            ? "initial-in-cart"
            : isAlreadyInCart
            ? "in-cart"
            : "not-in-cart"
        }
        variants={variants}
        initial="inactive"
        animate="active"
        exit="inactive"
      >
        <Icon id={isFirstTimeInCart ? check : isAlreadyInCart ? plus : cart} />
      </motion.span>
    </AnimatePresence>
  );
};

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

export default CartIcon;
