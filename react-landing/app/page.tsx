import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import Header from "@/components/pages/home/Header/Index";
import FeaturedProducts from "@/components/pages/home/FeaturedProducts/Index";
import LatestProducts from "@/components/pages/home/LatestProducts/Index";

import { fetchHomePage } from "@/server/helpers/utils/fetch-data/fetch-page";
import { Home as HomeKeys } from "@/helpers/constants/query-keys";

const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [HomeKeys.HeaderViews],
    queryFn: () => fetchHomePage("headerViews"),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header />
      </HydrationBoundary>
      <FeaturedProducts />
      <LatestProducts />
    </>
  );
};

export default Home;
