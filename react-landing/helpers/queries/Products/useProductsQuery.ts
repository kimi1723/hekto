import {
  useQuery,
  keepPreviousData,
  type UseQueryOptions,
} from "@tanstack/react-query";

import { Products } from "@/helpers/constants/query-keys";
import fetchProducts, {
  fetchProduct,
} from "@/server/helpers/utils/fetch-data/fetch-products";
import {
  ProductsVariants,
  type Product,
} from "@/server/helpers/types/data-types";

const useProductsQuery = (
  variant: ProductsVariants = "all",
  page?: number,
  limit?: number,
  sortBy?: string,
  filterPrice?: string
) =>
  useQuery({
    queryKey: [variant, page, limit, sortBy, filterPrice],
    queryFn: () => fetchProducts(variant, page, limit, sortBy, filterPrice),
    placeholderData:
      page && limit ? keepPreviousData : { data: [], totalPages: 0 },
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
