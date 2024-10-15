import { queryClient } from "@/providers/queryProvider";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion } from "framer-motion";

import useUserQuery from "@/helpers/queries/User/useUserQuery";
import useCartMutation from "@/helpers/queries/Cart/useCartMutation";
import useFavoriteMutation from "@/helpers/queries/Favorites/useFavoritesMutation";

import Modal from "../Modal/Index";
import ShadowedProduct from "./components/ShadowedProduct";
import SimpleProduct from "./components/SimpleProduct";

import { FAVORITES_KEY, CART_KEY } from "@/helpers/constants/query-keys";
import type ProductProps from "@/helpers/types/product";

const Product = ({
  id,
  motionId,
  img: { src, alt, height, width },
  type = "shadowed",
  ...props
}: ProductProps) => {
  const { data, isPending, isError, error } = useUserQuery();
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [isInitialInCart, setIsInitialInCart] = useState(true);

  const cartMutation = useCartMutation({
    id,
    isInCart,
    setIsInCart,
    img: { src, alt },
    ...props,
  });
  const favMutation = useFavoriteMutation({
    id,
    isFavorite,
    setIsFavorite,
    img: { src, alt },
    ...props,
  });

  useEffect(() => {
    if (!data) return;

    const favorites = data.favorites;
    const cart = data.cart;
    queryClient.setQueryData([FAVORITES_KEY], favorites);
    queryClient.setQueryData([CART_KEY], cart);

    const isFavorite = favorites.some((product) => product.id === id);
    const isAlreadyInCart = cart.some((product) => product.id === id);

    setIsFavorite(isFavorite);
    setIsInCart(isAlreadyInCart);

    if (isAlreadyInCart) setIsInitialInCart(false);
  }, [id, data]);

  if (isPending) return <p>Loading {props.name}....</p>;

  if (isError) return <p>An error occured! {error.message}</p>;

  const isActive = isHovered || isFocused;

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => setIsHovered(false);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => setIsFocused(false);

  const handleAddToCart = () => cartMutation.mutate();

  const handleToggleFavorite = () => favMutation.mutate();

  const handleZoom = () => setIsZoomed(true);

  const handleCloseZoom = () => setIsZoomed(false);

  if (isInCart && isInitialInCart)
    setTimeout(() => setIsInitialInCart(false), 1200);

  let ProductEl;

  switch (type) {
    case "simple":
      ProductEl = SimpleProduct;
      break;
    default:
      ProductEl = ShadowedProduct;
  }

  return (
    <>
      <ProductEl
        href={`products/${id}`}
        motionId={motionId}
        img={{ src, alt, height, width }}
        {...props}
        {...{
          isActive,
          isFavorite,
          isInCart,
          isInitialInCart,
          handleMouseEnter,
          handleMouseLeave,
          handleFocus,
          handleBlur,
          handleAddToCart,
          handleToggleFavorite,
          handleZoom,
        }}
      />
      {createPortal(
        <Modal
          isOpen={isZoomed}
          onClose={handleCloseZoom}
          className="bg-[transparent]"
        >
          <motion.div
            layoutId={motionId}
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