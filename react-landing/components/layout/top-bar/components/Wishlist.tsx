import { useQuery } from "@tanstack/react-query";

import Link from "@/components/shared/inline-link/Index";
import Icon from "@/components/shared/get-svg/Index";
import ProductCount from "./ProductCount";

import { fetchFavorites } from "@/server/utils/fetch-data";
import { Product } from "@/server/utils/data-types";
import { heart } from "@/helpers/constants/icons";
import { FAVORITES_KEY } from "@/helpers/constants/query-keys";

const Wishlist = () => {
  const {
    data: favoriteProducts,
    isError,
    error,
  } = useQuery({
    queryKey: [FAVORITES_KEY],
    queryFn: () => fetchFavorites(),
  });

  if (isError) console.error(error);

  const favoritesCount = (favoriteProducts as Product[])?.length || 0;

  return (
    <li>
      <Link href="/wishlist" className="gap-1 group" variant="primaryLight">
        Wishlist <Icon id={heart} />
        <ProductCount count={favoritesCount} />
      </Link>
    </li>
  );
};

export default Wishlist;
