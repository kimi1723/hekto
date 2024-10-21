import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { Products } from "@/helpers/constants/query-keys";
import { fetchProduct } from "@/server/helpers/utils/fetch-data/fetch-products";
import Product from "@/components/pages/product/Index";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const productId = +params.productId;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [Products.Individual(productId)],
    queryFn: () => fetchProduct(productId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Product productId={productId} />
    </HydrationBoundary>
  );
};

export default ProductPage;
