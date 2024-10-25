"use client";

import { AnimatePresence, motion } from "framer-motion";

import useCartQuery from "@/helpers/queries/Cart/useCartQuery";

import EmptyCart from "./components/EmptyCard";
import PopulatedCart from "./components/PopulatedCart";
import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";

const Cart = () => {
  const { data, isPending, isError, error } = useCartQuery();
  const isPopulated = data && data.length !== 0;

  return (
    <Section el="main" px={false}>
      <AnimatePresence mode="wait">
        <motion.div
          className="my-[104px] min-h-[606.61px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 1 }}
          key={String(isPopulated)}
        >
          {isPending && (
            <Heading
              variant="primary"
              className="text-center my-[104px] min-h-[606.61px]"
            >
              Fetching cart....
            </Heading>
          )}

          {isError && (
            <Heading
              variant="primary"
              className="text-center my-[104px] min-h-[606.61px]"
            >
              An error occured! {error.message}
            </Heading>
          )}

          {!isPopulated && <EmptyCart />}

          {isPopulated && <PopulatedCart data={data} />}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default Cart;
