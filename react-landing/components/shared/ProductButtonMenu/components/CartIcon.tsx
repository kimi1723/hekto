import { AnimatePresence, motion } from "framer-motion";

import Icon from "@/components/shared/GetSvg/Index";
import { cart, check, plus } from "@/helpers/constants/icons";

interface CartState {
  isInCart: boolean;
  isInitialInCart: boolean;
}

const CartIcon = (cartState: CartState) => {
  const { cartKey, iconId } = getCartKeyAndIcon(cartState);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={cartKey}
        variants={variants}
        initial="inactive"
        animate="active"
        exit="inactive"
      >
        <Icon id={iconId} />
      </motion.span>
    </AnimatePresence>
  );
};

export const getCartKeyAndIcon = ({ isInCart, isInitialInCart }: CartState) => {
  const isFirstTimeInCart = isInCart && isInitialInCart;
  const isAlreadyInCart = !isInitialInCart && isInCart;

  const cartKey = isFirstTimeInCart
    ? "initial-in-cart"
    : isAlreadyInCart
    ? "in-cart"
    : "not-in-cart";

  const iconId = isFirstTimeInCart ? check : isAlreadyInCart ? plus : cart;

  return { cartKey, iconId };
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
