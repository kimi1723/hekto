import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

import { Products } from "@/helpers/constants/query-keys";
import fetchProducts, {
  fetchProduct,
} from "@/server/helpers/utils/fetch-data/fetch-products";
import {
  ProductsVariants,
  type Product,
} from "@/server/helpers/types/data-types";

const useProductsQuery = (variant: ProductsVariants = "all") =>
  useQuery({
    queryKey: [variant],
    queryFn: () => fetchProducts(variant),
  });

type UseProductQueryOptions = Omit<
  UseQueryOptions<Product | undefined, Error>,
  "queryKey"
>;

export const useProductQuery = (id: number, options?: UseProductQueryOptions) =>
  useQuery({
    queryKey: [Products.Individual(id)],
    queryFn: () => fetchProduct(id),
    ...options,
  });

export default useProductsQuery;
