"use client";

import { motion, AnimatePresence } from "framer-motion";

import useFavoritesQuery from "@/helpers/queries/Favorites/useFavoritesQuery";

import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";
import PopulatedWishlist from "./components/PopulatedWishlist";
import EmptyWishlist from "./components/EmptyWishlist";

const Wishlist = () => {
  const { data, isPending, isError, error } = useFavoritesQuery();
  const isPopulated = data && data.length !== 0;

  return (
    <Section
      el="main"
      className={`py-[100px] min-h-[60svh] ${
        !isPopulated ? "flex items-center justify-center" : ""
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 1 }}
          key={String(isPopulated)}
        >
          {isPending && (
            <Heading variant="primary" className="text-center">
              Fetching favorites....
            </Heading>
          )}

          {isError && (
            <Heading variant="primary" className="text-center">
              An error occured! {error.message}
            </Heading>
          )}

          {!isPopulated && <EmptyWishlist />}

          {isPopulated && <PopulatedWishlist data={data} />}
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};

export default Wishlist;
