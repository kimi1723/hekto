import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/providers/queryProvider";
import { type Dispatch, type SetStateAction } from "react";

import { sendData } from "@/server/utils/send-data";
import { FAVORITES_KEY } from "../constants/query-keys";

import { type Product } from "@/server/utils/data-types";

interface UseFavoriteMutationProps extends Product {
  isFavorite: boolean;
  setIsFavorite: Dispatch<SetStateAction<boolean>>;
}

const useFavoriteMutation = ({
  id,
  isFavorite,
  setIsFavorite,
  ...props
}: UseFavoriteMutationProps) =>
  useMutation({
    mutationFn: () => sendData(FAVORITES_KEY, id),
    onMutate: () => {
      const prevFavorites =
        queryClient.getQueryData<Product[]>([FAVORITES_KEY]) || [];
      const prevFavoriteIndex = prevFavorites.findIndex(
        (item) => item.id === id
      );
      const updatedFavorites = [...prevFavorites];

      if (prevFavoriteIndex === -1) {
        updatedFavorites.push({ id, ...props });
        setIsFavorite(true);
      } else {
        updatedFavorites.splice(prevFavoriteIndex, 1);
        setIsFavorite(false);
      }

      queryClient.setQueryData([FAVORITES_KEY], updatedFavorites);

      return { prevIsFavorite: isFavorite, prevFavorites };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prevIsFavorite) setIsFavorite(ctx.prevIsFavorite);

      if (ctx?.prevFavorites)
        queryClient.setQueryData([FAVORITES_KEY], ctx.prevFavorites);
    },
  });

export default useFavoriteMutation;
