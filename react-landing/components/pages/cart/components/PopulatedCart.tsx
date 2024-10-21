import { AnimatePresence, motion } from "framer-motion";

import { useClearCartMutation } from "@/helpers/queries/Cart/useCartMutation";

import Label from "@/components/shared/Typography/Label";
import InlineButton from "@/components/shared/InlineButton/Index";
import ButtonLink from "@/components/shared/ButtonLink/Index";
import CartProduct from "./CartProduct";
import MotionOpacitySpan from "@/components/shared/MotionOpacitySpan/Index";

import { type Product } from "@/server/helpers/types/data-types";

const SHIPPING_PRICE = 100;

const PopulatedCart = ({ data }: { data: Product[] }) => {
  const clearCartMutation = useClearCartMutation();

  const subTotal = data.reduce((acc, { total }) => acc + total, 0);

  const clearCart = () => clearCartMutation.mutate();

  return (
    <div className="flex gap-[145px] my-[104px] mx-[415px]">
      <h1 className="sr-only">Cart</h1>

      <motion.section layout className="flex flex-col gap-6">
        <AnimatePresence>
          {data.map((product) => (
            <CartProduct key={product.id} {...product} />
          ))}
        </AnimatePresence>
      </motion.section>

      <motion.section layout className="relative">
        <div className="sticky top-52">
          <div className="relative p-6 bg-grey-1 ">
            <dl className="grid grid-cols-2 gap-y-8 gap-x-[124px] mb-8 rounded-lg">
              <dt className="text-body-bold after:content-[''] after:absolute after:top-[60px] after:left-4 after:h-[1px] after:w-[272px] after:bg-grey-2">
                Subtotal:
              </dt>
              <Label el="dd" variant="bold" className="text-right">
                <MotionOpacitySpan key={subTotal}>
                  ${subTotal.toFixed(2)}
                </MotionOpacitySpan>
              </Label>

              <dt className="text-body-bold after:content-[''] after:absolute after:top-[114px] after:left-4 after:h-[1px] after:w-[272px] after:bg-grey-2">
                Total:
              </dt>
              <Label el="dd" variant="bold" className="text-right">
                <MotionOpacitySpan key={subTotal}>
                  ${(subTotal + SHIPPING_PRICE).toFixed(2)}
                </MotionOpacitySpan>
              </Label>

              <dt className="text-grey-3">Shipping:</dt>
              <Label el="dd" variant="sm" className="text-grey-3 text-right">
                ${SHIPPING_PRICE.toFixed(2)}
              </Label>
            </dl>

            <ButtonLink href="#" className="block w-full text-center">
              Procced to checkout
            </ButtonLink>
          </div>
          <div>
            <InlineButton
              variant="primaryLight"
              className="mt-8 mx-auto text-primary text-center"
              onClick={clearCart}
            >
              Clear cart
            </InlineButton>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PopulatedCart;
