import { AnimatePresence, motion } from "framer-motion";

import Icon from "@/components/shared/GetSvg/Index";
import HeartIcon from "./components/HeartIcon";
import CartIcon from "./components/CartIcon";

import { zoom } from "@/helpers/constants/icons";

import { ButtonMenuProps } from "@/helpers/types/product";

interface ProductButtonMenuProps extends ButtonMenuProps {
  name: string;
  isActive: boolean;
  className?: string;
}

const classes =
  "p-2 text-tertiary rounded-full hocus:bg-grey-2 focus:outline-none transition-colors";

const ProductButtonMenu = ({
  name,
  isActive,
  isFavorite,
  isInCart,
  isInitialInCart,
  handleAddToCart,
  handleToggleFavorite,
  handleZoom,
  className = "",
}: ProductButtonMenuProps) => (
  <AnimatePresence>
    {isActive && (
      <motion.menu
        className={`flex gap-2 ${className}`}
        variants={menuVariants}
        initial="inactive"
        animate="active"
        exit="inactive"
        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      >
        <li>
          <button
            className={classes}
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
          >
            <CartIcon isInCart={isInCart} isInitialInCart={isInitialInCart} />
          </button>
        </li>
        <li>
          <button
            className={classes}
            onClick={handleToggleFavorite}
            aria-label={`Add ${name} to favorites`}
          >
            <HeartIcon isFavorite={isFavorite} />
          </button>
        </li>
        <li>
          <button
            className={classes}
            onClick={handleZoom}
            aria-label={`Open ${name} in full resolution`}
          >
            <Icon id={zoom} />
          </button>
        </li>
      </motion.menu>
    )}
  </AnimatePresence>
);

export default ProductButtonMenu;

const menuVariants = {
  active: {
    opacity: 1,
    scale: 1,
    filter: "blur(0)",
  },
  inactive: {
    opacity: 0,
    scale: 0,
    filter: "blur(3px)",
  },
};
