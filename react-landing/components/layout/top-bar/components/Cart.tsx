import { useQuery } from "@tanstack/react-query";

import Link from "@/components/shared/inline-link/Index";
import Icon from "@/components/shared/get-svg/Index";
import ProductCount from "./ProductCount";

import { fetchCart } from "@/server/utils/fetch-data";
import { Product } from "@/server/utils/data-types";
import { cart } from "@/helpers/constants/icons";
import { CART_KEY } from "@/helpers/constants/query-keys";

const Cart = () => {
  const {
    data: cartProducts,
    isError,
    error,
  } = useQuery({
    queryKey: [CART_KEY],
    queryFn: () => fetchCart(),
  });

  if (isError) console.error(error);

  const cartCount =
    (cartProducts as Product[])?.reduce(
      (acc, { quantity }) => acc + quantity,
      0
    ) || 0;

  return (
    <li>
      <Link
        href="/cart"
        aria-label="Cart"
        variant="primaryLight"
        className="min-h-5 group"
      >
        <Icon id={cart} />
        <ProductCount count={cartCount} />
      </Link>
    </li>
  );
};

export default Cart;
