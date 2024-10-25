import { useEffect, useState } from "react";
import { queryClient } from "@/providers/queryProvider";

import useCartMutation from "@/helpers/queries/Cart/useCartMutation";
import useFavoritesMutation from "@/helpers/queries/Favorites/useFavoritesMutation";
import useFavoritesQuery from "@/helpers/queries/Favorites/useFavoritesQuery";

import Heading from "@/components/shared/Typography/Heading";
import Label from "@/components/shared/Typography/Label";
import Stars from "@/components/shared/Stars/Index";
import Button from "@/components/shared/Button/Index";
import HeartIcon from "@/components/shared/ProductButtonMenu/components/HeartIcon";

import { User } from "@/helpers/constants/query-keys";
import { MAX_STARS } from "@/helpers/constants/constants";

import { type Product } from "@/server/helpers/types/data-types";

const ProductDescription = ({ data }: { data: Product }) => {
  const { data: favorites } = useFavoritesQuery();
  const [isFavorite, setIsFavorite] = useState(false);
  const cartMutation = useCartMutation(data);
  const favMutation = useFavoritesMutation({
    isFavorite,
    setIsFavorite,
    ...data,
  });

  useEffect(() => {
    if (!favorites) return;

    queryClient.setQueryData([User.Favorites], favorites);

    const isFavorite = favorites.some((product) => product.id === data.id);

    setIsFavorite(isFavorite);
  }, [favorites, data.id]);

  const {
    name,
    rating,
    discountedPrice,
    originalPrice,
    description: { short: description },
  } = data;

  const price = originalPrice.toFixed(2);

  const handleAddToCart = () => cartMutation.mutate(undefined);

  const handleToggleFavorite = () => favMutation.mutate();

  return (
    <section>
      <Heading variant="tertiary" el="h1">
        {name}
      </Heading>

      <div className="flex flex-col gap-6">
        <div className="flex gap-2">
          <Stars count={rating} />

          <Stars count={MAX_STARS - rating} name="empty-star" active={false} />
        </div>

        <p className="flex gap-4 items-center">
          {discountedPrice && (
            <>
              <Label el="span">${discountedPrice.toFixed(2)}</Label>
              <Label
                el="span"
                variant="sm"
                className="line-through text-primary"
              >
                ${price}
              </Label>
            </>
          )}

          {!discountedPrice && <Label el="span">${price}</Label>}
        </p>

        <p className="text-[#A9ACC6] text-balance">{description}</p>
      </div>

      <div className="flex gap-8 items-center mt-16">
        <Button onClick={handleAddToCart}>Add To Cart</Button>
        <button
          onClick={handleToggleFavorite}
          className="p-2 -m-2 text-tertiary hocus:bg-grey-2 focus:outline-none transition-colors rounded-full"
        >
          <HeartIcon isFavorite={isFavorite} />
        </button>
      </div>
    </section>
  );
};

export default ProductDescription;
