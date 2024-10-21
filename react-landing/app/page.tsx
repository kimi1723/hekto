import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import Header from "@/components/pages/home/Header/Index";
import FeaturedProducts from "@/components/pages/home/FeaturedProducts/Index";
import LatestProducts from "@/components/pages/home/LatestProducts/Index";
import UniqueFeatures from "@/components/pages/home/Unique-Features/Index";
import TrendingProducts from "@/components/pages/home/TrendingProducts/Index";
import DiscountItem from "@/components/pages/home/DiscountItem/Index";
import TopCategories from "@/components/pages/home/TopCategories/Index";
import Newsletter from "@/components/pages/home/Newsletter/Index";
import LatestBlog from "@/components/pages/home/LatestBlog/Index";

import { fetchHomePage } from "@/server/helpers/utils/fetch-data/fetch-page";
import { Home as HomeKeys } from "@/helpers/constants/query-keys";

const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [HomeKeys.HeaderViews],
    queryFn: () => fetchHomePage("headerViews"),
  });

  await queryClient.prefetchQuery({
    queryKey: [HomeKeys.UniqueProduct],
    queryFn: () => fetchHomePage("uniqueProduct"),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Header />
        <FeaturedProducts />
        <LatestProducts />
        <UniqueFeatures />
        <TrendingProducts />
        <DiscountItem />
        <TopCategories />
        <Newsletter />
        <LatestBlog />
      </HydrationBoundary>
    </>
  );
};

export default Home;
