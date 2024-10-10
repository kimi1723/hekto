import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/providers/queryProvider";
import { type Dispatch, type SetStateAction } from "react";

import { sendData } from "@/server/utils/send-data";
import { CART_KEY } from "../constants/query-keys";

import { type Product } from "@/server/utils/data-types";

interface UseCartMutationProps extends Product {
  isInCart: boolean;
  setIsInCart: Dispatch<SetStateAction<boolean>>;
}

const useCartMutation = ({
  id,
  isInCart,
  setIsInCart,
  ...props
}: UseCartMutationProps) =>
  useMutation({
    mutationFn: () => sendData(CART_KEY, id),
    onMutate: () => {
      setIsInCart(true);

      const prevCart = queryClient.getQueryData<Product[]>([CART_KEY]) || [];
      const prevItemIndex = prevCart.findIndex((item) => item.id === id);
      const updatedCart = [...prevCart];

      if (prevItemIndex === -1) {
        updatedCart.push({
          ...props,
          id,
          quantity: 1,
        });
      } else {
        const updatedItem = { ...updatedCart[prevItemIndex] };

        updatedItem.quantity += 1;
        updatedCart[prevItemIndex] = updatedItem;
      }

      queryClient.setQueryData([CART_KEY], updatedCart);

      return { prevIsInCart: isInCart, prevCart };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prevIsInCart) setIsInCart(ctx.prevIsInCart);

      if (ctx?.prevCart) queryClient.setQueryData([CART_KEY], ctx.prevCart);
    },
  });

export default useCartMutation;
