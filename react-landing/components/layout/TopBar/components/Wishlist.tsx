import useFavoritesQuery from "@/helpers/queries/Favorites/useFavoritesQuery";

import Link from "@/components/shared/InlineLink/Index";
import Icon from "@/components/shared/GetSvg/Index";
import ProductCount from "./ProductCount";

import { heart } from "@/helpers/constants/icons";

const Wishlist = () => {
  const { data, isError, error } = useFavoritesQuery();

  if (isError) console.error(error);

  const favoritesCount = data?.length || 0;

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
