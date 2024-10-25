import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import ProductsPageComponent from "@/components/pages/products/Index";

import fetchProducts from "@/server/helpers/utils/fetch-data/fetch-products";
import { type ProductSortBy } from "@/server/helpers/types/data-types";
import { Products } from "@/helpers/constants/query-keys";

interface ProductsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    sortBy?: ProductSortBy;
    price?: string;
  };
}

const ProductsPage = async ({ searchParams }: ProductsPageProps) => {
  const queryClient = new QueryClient();

  const page = Number(searchParams.page || 1);
  const limit = Number(searchParams.limit || 10);
  const sortBy = searchParams.sortBy || "high-to-low";
  const price = searchParams.price;

  await queryClient.prefetchQuery({
    queryKey: [Products.All, page, limit, sortBy],
    queryFn: () => fetchProducts("all", page, limit, sortBy),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPageComponent {...{ page, limit, sortBy, price }} />
    </HydrationBoundary>
  );
};

export default ProductsPage;
