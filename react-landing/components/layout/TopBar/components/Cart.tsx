import useCartQuery from "@/helpers/queries/Cart/useCartQuery";

import Link from "@/components/shared/InlineLink/Index";
import Icon from "@/components/shared/GetSvg/Index";
import ProductCount from "./ProductCount";

import { cart } from "@/helpers/constants/icons";

const Cart = () => {
  const { data, isError, error } = useCartQuery();

  if (isError) console.error(error);

  const cartCount = data?.reduce((acc, { quantity }) => acc + quantity, 0) || 0;

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
