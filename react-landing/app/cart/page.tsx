import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import Cart from "@/components/pages/cart/Index";

import { User } from "@/helpers/constants/query-keys";
import { fetchCart } from "@/server/helpers/utils/fetch-data/fetch-user";

const CartPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [User.Cart],
    queryFn: () => fetchCart(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Cart />
    </HydrationBoundary>
  );
};

export default CartPage;
