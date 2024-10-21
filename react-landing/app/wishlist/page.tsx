import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import Wishlist from "@/components/pages/wishlist/Index";

import { User } from "@/helpers/constants/query-keys";
import { fetchFavorites } from "@/server/helpers/utils/fetch-data/fetch-user";

const WishlistPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [User.Favorites],
    queryFn: () => fetchFavorites(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Wishlist />
    </HydrationBoundary>
  );
};

export default WishlistPage;
