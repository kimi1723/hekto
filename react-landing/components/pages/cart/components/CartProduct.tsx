import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import useCartMutation from "@/helpers/queries/Cart/useCartMutation";

import Label from "@/components/shared/Typography/Label";
import Subtitle from "@/components/shared/Typography/Subtitle";
import MotionOpacitySpan from "@/components/shared/MotionOpacitySpan/Index";

import { type Product } from "@/server/helpers/types/data-types";

const CartProduct = (data: Product) => {
  const [isError, setIsError] = useState(false);
  const cartMutation = useCartMutation(data);

  const {
    img: { src, alt },
    name,
    originalPrice,
    discountedPrice,
    quantity,
    total,
  } = data;

  const price = originalPrice.toFixed(2);

  const handleCartChange = (newValue: number) => {
    if (newValue > MAX_VALUE) {
      setIsError(true);
      clearTimeout(cartChangeTimeout);
      cartChangeTimeout = setTimeout(() => setIsError(false), 3000);

      return;
    }

    setIsError(false);
    cartMutation.mutate(newValue);
  };

  return (
    <motion.article
      className="relative grid grid-cols-[max-content_223px] items-center justify-between min-w-[640px]"
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      layout
    >
      <div className="flex items-center gap-6">
        <Image
          src={src}
          alt={alt}
          height={104}
          width={149}
          className="rounded-md"
        />

        <div>
          <Subtitle el="p" variant="secondary" className="mb-2">
            {name}
          </Subtitle>

          {!discountedPrice && <Label el="p">${price}</Label>}

          {discountedPrice && (
            <>
              <Label el="p">${discountedPrice.toFixed(2)}</Label>
              <Label variant="sm" el="p" className="line-through text-danger">
                ${price}
              </Label>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <form className=" p-0.5 text-body-sm border border-grey-2 rounded-lg">
          <button
            type="button"
            onClick={() => handleCartChange(quantity - 1)}
            className="aspect-square h-9"
          >
            -
          </button>
          <input
            type="number"
            max={MAX_VALUE}
            value={quantity}
            onChange={({ target: { value } }) => handleCartChange(+value)}
            className="w-11 text-center"
          />
          <button
            type="button"
            onClick={() => handleCartChange(quantity + 1)}
            className="aspect-square h-9"
          >
            +
          </button>

          <AnimatePresence>
            {isError && (
              <Label
                el="p"
                variant="bold"
                className="absolute b-0 translate-y-1/2 text-danger"
              >
                <MotionOpacitySpan>
                  Max {MAX_VALUE} of product in cart!
                </MotionOpacitySpan>
              </Label>
            )}
          </AnimatePresence>
        </form>

        <Label el="p">
          <MotionOpacitySpan key={total}>${total.toFixed(2)}</MotionOpacitySpan>
        </Label>
      </div>
    </motion.article>
  );
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MAX_VALUE = 10;
let cartChangeTimeout: ReturnType<typeof setTimeout>;

export default CartProduct;
