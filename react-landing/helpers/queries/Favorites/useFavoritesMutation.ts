import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/providers/queryProvider";
import { type Dispatch, type SetStateAction } from "react";

import sendData from "@/server/helpers/utils/send-data";
import { User } from "@/helpers/constants/query-keys";

import { type Product } from "@/server/helpers/types/data-types";

interface UseFavoriteMutationProps extends Product {
  isFavorite: boolean;
  setIsFavorite: Dispatch<SetStateAction<boolean>>;
}

const useFavoritesMutation = ({
  id,
  isFavorite,
  setIsFavorite,
  ...props
}: UseFavoriteMutationProps) =>
  useMutation({
    mutationFn: () => sendData({ variant: User.Favorites, productId: id }),
    onMutate: () => {
      const prevFavorites =
        queryClient.getQueryData<Product[]>([User.Favorites]) || [];
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

      queryClient.setQueryData([User.Favorites], updatedFavorites);

      return { prevIsFavorite: isFavorite, prevFavorites };
    },
    onError: (_, __, ctx) => {
      if (ctx?.prevIsFavorite) setIsFavorite(ctx.prevIsFavorite);

      if (ctx?.prevFavorites)
        queryClient.setQueryData([User.Favorites], ctx.prevFavorites);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: User.All });
    },
  });

export default useFavoritesMutation;
