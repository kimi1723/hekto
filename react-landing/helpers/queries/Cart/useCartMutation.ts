import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/providers/queryProvider";
import { type Dispatch, type SetStateAction } from "react";

import sendData from "@/server/helpers/utils/send-data";
import { User } from "@/helpers/constants/query-keys";

import { type Product } from "@/server/helpers/types/data-types";
import { calcIndividualTotal } from "@/helpers/utils/utils";

interface UseCartMutationProps extends Product {
  isInCart?: boolean;
  setIsInCart?: Dispatch<SetStateAction<boolean>>;
}

const useCartMutation = ({
  id,
  isInCart,
  setIsInCart,
  ...props
}: UseCartMutationProps) =>
  useMutation({
    mutationFn: (newValue?: number) =>
      sendData({ variant: User.Cart, productId: id, newValue }),
    onMutate: (newValue?: number) => {
      const validValue = newValue === undefined || newValue > 0;

      if (setIsInCart && validValue) setIsInCart(true);
      else if (setIsInCart) setIsInCart(false);

      const prevCart = queryClient.getQueryData<Product[]>([User.Cart]) || [];
      const prevItemIndex = prevCart.findIndex((item) => item.id === id);
      const updatedCart = [...prevCart];
      const itemExists = prevItemIndex !== -1;

      if (!itemExists) {
        const newQuantity = newValue || 1;
        const newTotal = calcIndividualTotal({ ...props, newQuantity });

        updatedCart.push({
          ...props,
          id,
          quantity: newQuantity,
          total: newTotal,
        });
      }

      if (itemExists) {
        const updatedItem = { ...updatedCart[prevItemIndex] };

        if (!validValue) updatedCart.splice(prevItemIndex, 1);

        if (validValue) {
          const newQuantity = newValue
            ? newValue
            : updatedItem.quantity + 1 || 1;
          const newTotal = calcIndividualTotal({ ...props, newQuantity });

          updatedItem.quantity = newQuantity;
          updatedItem.total = newTotal;
          updatedCart[prevItemIndex] = updatedItem;
        }
      }

      queryClient.setQueryData([User.Cart], updatedCart);

      return { prevIsInCart: isInCart, prevCart };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prevIsInCart && setIsInCart) setIsInCart(ctx.prevIsInCart);

      if (ctx?.prevCart) queryClient.setQueryData([User.Cart], ctx.prevCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: User.All });
    },
  });

export const useClearCartMutation = () =>
  useMutation({
    mutationFn: () => sendData({ variant: User.Cart, clearCart: true }),
    onMutate: () => {
      const prevCart = queryClient.getQueryData<Product[]>([User.Cart]) || [];

      queryClient.setQueryData([User.Cart], []);

      return { prevCart };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prevCart) queryClient.setQueryData([User.Cart], ctx.prevCart);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: User.All });
    },
  });
export default useCartMutation;
