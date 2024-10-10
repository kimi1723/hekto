import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { queryClient } from "@/providers/queryProvider";
import Image from "next/image";
import { motion } from "framer-motion";

import useCartMutation from "@/helpers/hooks/useCartMutation";
import useFavoriteMutation from "@/helpers/hooks/useFavoriteMutation";

import Modal from "../modal/Index";
import ShadowedProduct from "./components/ShadowedProduct";

import { fetchUserData } from "@/server/utils/fetch-data";
import { CART_KEY, FAVORITES_KEY } from "@/helpers/constants/query-keys";
import type ProductProps from "@/helpers/types/product";
import { type User } from "@/server/utils/data-types";

const Product = ({
  type = "shadowed",
  id,
  img: { src, alt, height, width },
  ...props
}: ProductProps) => {
  const { data } = useQuery({
    queryKey: [FAVORITES_KEY, CART_KEY],
    queryFn: () => fetchUserData("all"),
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isInitialInCart, setIsInitialInCart] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);

  const cartMutation = useCartMutation({
    id,
    isInCart,
    setIsInCart,
    ...props,
    img: { src, alt },
  });
  const favMutation = useFavoriteMutation({
    id,
    isFavorite,
    setIsFavorite,
    ...props,
    img: { src, alt },
  });

  const userData = data as User;

  useEffect(() => {
    if (!userData) return;

    const favorites = userData.favorites || [];
    const cart = userData.cart || [];

    queryClient.setQueryData([FAVORITES_KEY], favorites);
    queryClient.setQueryData([CART_KEY], cart);

    const isFavorite = favorites.some((item) => item.id === id);
    const isAlreadyInCart = cart.some((item) => item.id === id);

    setIsFavorite(isFavorite);
    setIsInCart(isAlreadyInCart);

    if (isAlreadyInCart) setIsInitialInCart(false);
  }, [id, userData]);

  const handleAddToCart = () => cartMutation.mutate();

  const handleToggleFavorite = () => favMutation.mutate();

  const handleToggleZoom = () => setIsZoomed(true);

  const handleCloseZoom = () => setIsZoomed(false);

  if (isInCart && isInitialInCart)
    setTimeout(() => setIsInitialInCart(false), 1200);

  let ProductEl;

  switch (type) {
    default:
      ProductEl = ShadowedProduct;
  }

  return (
    <>
      <ProductEl
        href={`products/${id}`}
        id={id}
        img={{ src, alt, height, width }}
        {...props}
        {...{
          isFavorite,
          isInCart,
          isInitialInCart,
          handleAddToCart,
          handleToggleFavorite,
          handleToggleZoom,
        }}
      />
      {createPortal(
        <Modal
          isOpen={isZoomed}
          onClose={handleCloseZoom}
          className="bg-[transparent]"
        >
          <motion.div
            layoutId={id.toString()}
            transition={{ duration: 0.75, type: "spring", bounce: 0 }}
          >
            <Image alt={alt} src={src} width={width * 2} height={height * 2} />
          </motion.div>
        </Modal>,
        document.getElementById("app") as HTMLBodyElement
      )}
    </>
  );
};

export default Product;

//TODO: skeleton loader
